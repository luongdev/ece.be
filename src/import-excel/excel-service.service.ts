import { Workbook } from "exceljs";
import { COMMENT } from "@/constants";
import { UsersLocalEntity } from "@/manage-user-local/entities/manage-user-local.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ROLE, TYPE } from "@/manage-user-local/constant";
import { ManageUserLocalService } from "@/manage-user-local/manage-user-local.service";
import { PASSWORD_INVALID } from "@/constants/errors";
const crypto = require("crypto");

const enumType = ["Local", "SSO"];
const enumRole = ["User", "Admin", "All"];

export class ExcelService {
    constructor(
        @InjectRepository(UsersLocalEntity, "db_new")
        private usersLocalRepository: Repository<UsersLocalEntity>,
        private readonly manageUserLocalService: ManageUserLocalService
    ) { }

    private readonly templateHeader = {
        columns: [
            {
                header: "Username",
                key: "username",
                width: 20,
                style: { font: { name: "Arial" } },
            },
            {
                header: "Password",
                key: "password",
                width: 30,
                style: {
                    font: { name: "Arial" },
                },
                comment: COMMENT.PASSWORD,
            },
            {
                header: "Account type",
                key: "type",
                width: 20,
                style: { font: { name: "Arial" } },
                comment: COMMENT.ACCOUNT_TYPE,
            },
            {
                header: "Role",
                key: "role",
                width: 20,
                style: { font: { name: "Arial" } },
                comment: COMMENT.ROLE,
            },
        ],
    };

    async exportTemplate() {
        const workbook = new Workbook();
        const headers = this.templateHeader.columns;
        const workSheet = workbook.addWorksheet("data");
        workSheet.columns = headers;

        for (const header of headers) {
            workSheet.getRow(1).getCell(header.key).font = { bold: true };
            workSheet.getRow(1).getCell(header.key).style = {
                alignment: { horizontal: "center" },
            };
            workSheet.getRow(1).getCell(header.key).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "ADD8E6" },
            };
            if (header.key != "username") {
                workSheet.getRow(1).getCell(header.key).note = header.comment;
            }
        }
        for (let i = 2; i < 50; i++) {
            workSheet.getRow(i).getCell('type').dataValidation = {
                type: 'list',
                allowBlank: true,
                formulae: [`"${enumType.join(',')}"`]
            };

            workSheet.getRow(i).getCell('role').dataValidation = {
                type: 'list',
                allowBlank: true,
                formulae: [`"${enumRole.join(',')}"`]
            };
        }
        return workbook.xlsx.writeBuffer();
    }

    async transform(file: Express.Multer.File, userInfo) {
        const imports = [];
        const errors = [];
        const usernameSet = new Set<string>();
        const workbook = new Workbook();
        await workbook.xlsx.load(file.buffer);
        const sheet = workbook.getWorksheet(1);
        sheet.eachRow((row, index) => {
            const values = row.values;

            if (index > 1) {
                const rowJson = this.rowToJSON(values);
                const validError = this.validate(rowJson, usernameSet);

                if (validError) {
                    rowJson["error"] = validError;
                    errors.push(rowJson);
                    return;
                }

                imports.push(rowJson);
            }
        });
        const { dataImports } = await this.checkExistData(imports, errors);
        return { imports: this.formatData(dataImports, userInfo), errors };
    }

    private formatData(data, userInfo) {
        const newData = data.map((el) => {
            //format data
            if (el.type === "Local") {
                el.type = TYPE.LOCAL;
            }
            if (el.type === "SSO") {
                el.type = TYPE.SSO;
            }
            if (el.role === "Admin") {
                el.role = ROLE.ADMIN;
            }
            if (el.role === "User") {
                el.role = ROLE.USER;
            }
            if (el.role === "All") {
                el.role = ROLE.ALL;
            }
            if (el.password) {
                el.password = crypto
                    .createHash("sha256")
                    .update(el.password)
                    .digest("hex");
            }
            el.createdBy = userInfo.id;
            return el;
        });
        return newData;
    }

    private validate(data, usernameSet: Set<string>) {
        const { username, type, role, password } = data;

        const isUsernameExists = usernameSet.has(username);
        if (username) usernameSet.add(username);
        if (isUsernameExists) return "Username duplicate in file !";

        if (!username) return "Username is required !";
        if (!type) return "Type is required !";
        if (!role) return "Role is required !";
        if (!enumType.includes(type)) return "Value type invalid !";
        if (!enumRole.includes(role)) return "Value role invalid !";
        if (type == "Local" && !password) return "Password is required";

        if (type == "Local") {
            const validatePassword = this.manageUserLocalService.validatePassword(
                password,
                TYPE.LOCAL
            );
            if (!validatePassword) return PASSWORD_INVALID;
        }
    }

    private rowToJSON(row: any) {
        const headers = this.templateHeader.columns;
        const data = new UsersLocalEntity();
        for (let i = 1; i < row.length; i++) {
            const field = headers[i - 1] ? headers[i - 1].key : undefined;
            if (!field) continue;
            data[field] =
                row[i] && row[i].result
                    ? row[i].result.toFixed(0)
                    : row[i] && row[i].text
                        ? row[i].text
                        : row[i]
                            ? row[i].toString()
                            : undefined;
        }
        return data;
    }

    private async checkExistData(imports: any, errors: any) {
        const dataImports = [];
        for (const data of imports) {
            const checkExist = await this.usersLocalRepository.findOne({
                where: { username: data.username },
            });

            if (checkExist) {
                data["error"] = "username existed !";
                errors.push(data);
                continue;
            }

            dataImports.push(data);
        }

        return { dataImports };
    }
}
