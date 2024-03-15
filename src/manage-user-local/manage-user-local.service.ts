import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateManageUserLocalDto } from "./dto/create-manage-user-local.dto";
import { UpdateManageUserLocalDto } from "./dto/update-manage-user-local.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Like, Repository } from "typeorm";
import { UsersLocalEntity } from "./entities/manage-user-local.entity";
import { TYPE } from "./constant";
import { DeleteManyUserDto } from "./dto/delete-many-user.dto";
import { GetListDto } from "./dto/get-list.dto";
import { PASSWORD_INVALID } from "@/constants/errors";
const crypto = require("crypto");

@Injectable()
export class ManageUserLocalService {
  constructor(
    @InjectRepository(UsersLocalEntity, "db_new")
    private usersLocalRepository: Repository<UsersLocalEntity>
  ) { }
  async create(createManageUserLocalDto: CreateManageUserLocalDto, userInfo) {
    const { username, password, type } = createManageUserLocalDto;
    const checkExistUsername = await this.usersLocalRepository.findOne({
      where: { username },
    });
    if (checkExistUsername) {
      throw new BadRequestException("Username existed !");
    }
    if (!this.validatePassword(password, type)) {
      throw new BadRequestException(PASSWORD_INVALID);
    }
    if (password) {
      createManageUserLocalDto.password = await crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
    }
    createManageUserLocalDto.createdBy = userInfo.id;
    return this.usersLocalRepository.insert(createManageUserLocalDto);
  }

  public createMany(data: CreateManageUserLocalDto[]) {
    return this.usersLocalRepository.insert(data);
  }

  async findAll(getListDto: GetListDto) {
    const { page = 1, pageSize = 10, search } = getListDto;
    let _query = {};
    if (search && search !== "") {
      _query = {
        username: Like("%" + search + "%"),
      };
    }
    const [listUserLocal, totalData] =
      await this.usersLocalRepository.findAndCount({
        where: _query,
        take: pageSize,
        skip: (page - 1) * pageSize,
        relations: ["createdByInfo", "updatedByInfo"],
      });
    return [listUserLocal, totalData];
  }

  async findOne(id: string) {
    return this.usersLocalRepository.findOne({ where: { id }, relations: ["createdByInfo", "updatedByInfo"] });
  }

  async update(id: string, updateManageUserLocalDto: UpdateManageUserLocalDto, userInfo) {
    const { password, type } = updateManageUserLocalDto;
    const checkExist = await this.usersLocalRepository.findOne({
      where: { id },
    });
    if (password && checkExist.password != password) {
      if (!this.validatePassword(password, type)) {
        throw new BadRequestException(PASSWORD_INVALID);
      }
      updateManageUserLocalDto.password = await crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
    }
    if (!checkExist) {
      throw new BadRequestException("User not found !");
    }
    updateManageUserLocalDto.updatedBy = userInfo.id;
    return this.usersLocalRepository.update({ id }, updateManageUserLocalDto);
  }

  async remove(id: string) {
    const checkExist = await this.usersLocalRepository.findOne({
      where: { id },
    });
    if (!checkExist) {
      throw new BadRequestException("User not found !");
    }
    return this.usersLocalRepository.delete({ id });
  }

  deleteMany(deleteManyUserDto: DeleteManyUserDto) {
    const { ids } = deleteManyUserDto;
    return this.usersLocalRepository.delete({ id: In(ids) });
  }

  public validatePassword(password, type) {
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const isValidPassword = passwordRegex.test(password);
    if (!isValidPassword && type == TYPE.LOCAL) {
      return false;
    }
    return true;
  }

  public async checkUsernameAndPassword(username, password) {
    const hashPassword = await crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
    const check = await this.usersLocalRepository.findOne({
      where: { username, password: hashPassword },
    });
    if (!check) {
      return false;
    } else {
      return {
        id: check.id,
        username: check.username,
      };
    }
  }
}
