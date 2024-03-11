import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository, In } from "typeorm";
import { manageUserLocalEntity } from "./entities/manage-user-local.entity";
import { UserFriendlyError } from "@/shared/error/user-friendly.error";

@Injectable()
export class ManageUserLocalService {
  constructor(
    @InjectRepository(manageUserLocalEntity, "db_new")
    private userRepository: Repository<manageUserLocalEntity>
  ) {}

  async getListuser(getUserDto: any) {
    const { page, pageSize, searchMulti } = getUserDto;
    let _query = {};
    if (searchMulti && searchMulti !== "") {
      _query = {
        name: Like("%" + searchMulti + "%"),
      };
    }
    const [listUserLocal, totalData] = await this.userRepository.findAndCount({
      where: _query,
      take: pageSize,
      skip: (page - 1) * pageSize,
      select: {},
    });
    return [listUserLocal, totalData];
  }

  async addUser(body: any) {
    const { data } = body;
    const users = await this.userRepository.find();
    if (data.length) {
      const listUser: manageUserLocalEntity[] = data;
      return this.userRepository.insert(listUser);
    }
    const { name, role, type, password, owner } = data;
    this.buildValidation(users, name, type, role, password);
    return this.userRepository.insert({ name, role, type, password, owner });
  }

  async deleteUser(id: string) {
    const userDelete = await this.userRepository.findOneBy({ id: id });
    return this.userRepository.remove(userDelete);
  }

  async deleteUsers(ids: string[]) {
    const userDeletes: manageUserLocalEntity[] = await this.userRepository.find(
      {
        where: {
          id: In(ids),
        },
      }
    );
    return this.userRepository.remove(userDeletes);
  }
  async getUserById(id: string) {
    return await this.userRepository.findOneBy({ id: id });
  }

  async updateUserById(id: string, data: any) {
    const users = (await this.userRepository.find()).filter(
      (user) => user.id !== id
    );
    const user = await this.userRepository.findOneBy({ id: id });
    user.name = data.nameEdit;
    user.type = data.typeEdit;
    user.password = data.passwordEdit;
    user.role = data.roleEdit;
    user.owner = data.owner;
    this.buildValidation(users, user.name, user.type, user.role, user.password);
    return await this.userRepository.update(id, user);
  }

  buildValidation(listUser, name, type, role, password) {
    if (name === undefined) {
      throw new UserFriendlyError("isCheckNullName", "Đây là trường bắt buộc!");
    } else if (type === "local" && password === undefined) {
      throw new UserFriendlyError(
        "isCheckNullPassword",
        "Đây là trường bắt buộc!"
      );
    } else if (role === undefined) {
      throw new UserFriendlyError("isCheckNullRole", "Đây là trường bắt buộc!");
    } else if (type === undefined) {
      throw new UserFriendlyError("isCheckNullType", "Đây là trường bắt buộc!");
    }
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const isValidPassword = passwordRegex.test(password);

    const isNameExsits = listUser.find((user) => user.name === name);
    if (isNameExsits) {
      throw new UserFriendlyError(
        "nameExists",
        "Tên đăng nhập đã có trên hệ thống"
      );
    } else if (!isValidPassword && type === "local") {
      throw new UserFriendlyError(
        "invalidPassword",
        "Mật khẩu cần chứa ít nhất 8 chữ số gồm chữ, số và ký tự đặc biệt"
      );
    }
  }
}
