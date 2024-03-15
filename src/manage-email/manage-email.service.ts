import { egplCasemgmtActivityEntity } from "../cisco-ece-entities/egpl-casemgmt-activity.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, In, Like, MoreThan, Repository } from "typeorm";
import { GetListDto } from "./dto/get-list.dto";
import {
  ADDRESS_FLAG,
  CONDITION_VALUE,
  ACTIVITY_SUB_STATUS,
  ACTIVITY_MODE,
  TYPE_SYSTEM,
} from "@/constants";
import { egplNotesEntity } from "@/cisco-ece-entities/egpl-notes.entity";

@Injectable()
export class ManageEmailService {
  constructor(
    @InjectRepository(egplCasemgmtActivityEntity, "db_new")
    private egplCasemgmtActivityNewRepository: Repository<egplCasemgmtActivityEntity>,
    @InjectRepository(egplNotesEntity, "db_new")
    private egplNotesNewRepository: Repository<egplNotesEntity>,
    @InjectRepository(egplCasemgmtActivityEntity, "db_old")
    private egplCasemgmtActivityOldRepository: Repository<egplCasemgmtActivityEntity>,
    @InjectRepository(egplNotesEntity, "db_old")
    private egplNotesOldRepository: Repository<egplNotesEntity>
  ) { }

  async getListEmail(getListDto: GetListDto) {
    const { page, pageSize, searchMulti, system } = getListDto;

    let _query = {};
    if (searchMulti && searchMulti !== "") {
      _query = this.buildQueryMulti(searchMulti);
    } else {
      _query = this.buildQueryAdvance(getListDto);
    }
    const objectQuery = {
      where: _query,
      take: pageSize,
      skip: (page - 1) * pageSize,
      select: {
        email: {
          activityId: true,
          fromEmailAddress: true,
          recvEmailAddress: true,
        },
        user: {
          userId: true,
          userName: true,
        },
        queue: {
          queueId: true,
          queueName: true,
        },
        activityId: true,
        subject: true,
        assignedTo: true,
        createdOn: true,
        activitySubStatus: true,
        caseId: true,
        queueId: true,
        numAttachments: true,
        activityPriority: true,
        activityType: true,
        activityMode: true,
      },
      relations: ["email", "user", "queue", "email.emailAddressTo"],
    };

    if (system == TYPE_SYSTEM.NEW) {
      const [listData, totalData] =
        await this.egplCasemgmtActivityNewRepository.findAndCount(objectQuery);
      return { listData, totalData };
    } else {
      const [listData, totalData] =
        await this.egplCasemgmtActivityOldRepository.findAndCount(objectQuery);
      return { listData, totalData };
    }
  }

  async getActivityDetail(activityId, system) {
    const objectQuery: any = {
      where: {
        activityId: activityId,
        email: {
          emailAddressTo: { addressFlag: ADDRESS_FLAG.TO },
        },
      },
      select: {
        activityId: true,
        caseId: true,
        subject: true,
        createdOn: true,
        activityPriority: true,
        historyActivity: {
          eventId: true,
          eventDate: true,
          objectOperation: true,
          user: {
            lastName: true,
            firstName: true,
            userName: true,
          },
        },
        user: {
          userName: true,
          lastName: true,
          firstName: true,
          emailAddressPrimary: true,
          emailAddressSecondary: true,
        },
        notes: {
          noteId: true,
          whenCreated: true,
          noteData: true,
          user: {
            userName: true,
            lastName: true,
            firstName: true,
            emailAddressPrimary: true,
            emailAddressSecondary: true,
          },
        },
        contactPoint: {
          contactPointId: true,
          emailAddress: true,
        },
        department: {
          departmentId: true,
          departmentName: true,
        },
        emailData: {
          content: true,
          header: true,
        },
        dueDate: true,
        email: {
          activityId: true,
          fromEmailAddress: true,
          recvEmailAddress: true,
          emailAttachmentLink: {
            emailId: true,
            emailAttachmentId: true,
            attachment: {
              id: true,
              fileName: true,
              attachmentSize: true,
            },
          },
        },
        customer: {
          customerId: true,
          classification: true,
        },
        queue: {
          queueId: true,
          queueName: true,
        },
      },
      relations: [
        "email",
        "queue",
        "email.emailAddressTo",
        "email.emailAttachmentLink",
        "email.emailAttachmentLink.attachment",
        "emailDataAlt",
        "historyActivity",
        "historyActivity.user",
        "customer",
        "user",
        "notes",
        "notes.user",
        "department",
        "contactPoint",
        "emailData",
      ],
      order: {
        historyActivity: {
          eventDate: "ASC",
        },
      },
    };
    let activityDetail;
    if (system == TYPE_SYSTEM.NEW) {
      activityDetail =
        await this.egplCasemgmtActivityNewRepository.findOne(objectQuery);
    } else {
      activityDetail =
        await this.egplCasemgmtActivityNewRepository.findOne(objectQuery);
    }
    return activityDetail;
  }

  async getCaseDetail(caseId, system) {
    const objectActivityQuery = {
      where: {
        caseId: caseId,
        email: {
          emailAddressTo: { addressFlag: ADDRESS_FLAG.TO },
        },
      },
      select: {
        activityId: true,
        caseId: true,
        queueId: true,
        assignedTo: true,
        createdOn: true,
        activityMode: true,
        numAttachments: true,
        subject: true,
        email: {
          activityId: true,
          fromEmailAddress: true,
          recvEmailAddress: true,
          emailAttachmentLink: {
            emailId: true,
            emailAttachmentId: true,
            attachment: {
              id: true,
              fileName: true,
              attachmentSize: true,
            },
          },
        },
        queue: {
          queueId: true,
          queueName: true,
        },
        user: {
          userId: true,
          userName: true,
          lastName: true,
          firstName: true,
          emailAddressPrimary: true,
          emailAddressSecondary: true,
        },
        case: {
          caseId: true,
          caseStatus: true,
          originalSource: true,
          severity: true,
          dueDate: true,
          description: true,
          solutionDescription: true,
          owner: true,
          ownerDetail: {
            userId: true,
            userName: true,
          },
          caseAss: {
            caseGroupId: true,
          },
          customer: {
            customerId: true,
            classification: true,
          },
        },
      },
      relations: [
        "email",
        "email.emailAddressTo",
        "queue",
        "user",
        "case",
        "case.caseAss",
        "case.customer",
        "case.ownerDetail",
        "email.emailAttachmentLink",
        "email.emailAttachmentLink.attachment",
      ],
    };
    const objectNoteQuery = {
      where: { noteOfId: caseId },
      select: {
        noteId: true,
        whenCreated: true,
        noteData: true,
        user: {
          lastName: true,
          firstName: true,
          emailAddressPrimary: true,
          emailAddressSecondary: true,
        },
      },
      relations: ["user"],
    };

    if (system == TYPE_SYSTEM.NEW) {
      const caseDetail =
        await this.egplCasemgmtActivityNewRepository.find(objectActivityQuery);
      const findNotes = await this.egplNotesNewRepository.find(objectNoteQuery);
      const dataFinal = caseDetail.map((el) => {
        el["case"]["notes"] = findNotes;
        return el;
      });
      return dataFinal;
    } else {
      const caseDetail =
        await this.egplCasemgmtActivityOldRepository.find(objectActivityQuery);
      const findNotes = await this.egplNotesOldRepository.find(objectNoteQuery);
      const dataFinal = caseDetail.map((el) => {
        el["case"]["notes"] = findNotes;
        return el;
      });
      return dataFinal;
    }
  }

  buildQueryMulti(searchMulti) {
    return [
      {
        activityId: Number(searchMulti),
        email: {
          emailAddressTo: { addressFlag: ADDRESS_FLAG.TO },
        },
      },
      {
        caseId: Number(searchMulti),
        email: {
          emailAddressTo: { addressFlag: ADDRESS_FLAG.TO },
        },
      },
      {
        subject: Like("%" + searchMulti + "%"),
        email: {
          emailAddressTo: { addressFlag: ADDRESS_FLAG.TO },
        },
      },
      {
        email: {
          fromEmailAddress: Like("%" + searchMulti + "%"),
          emailAddressTo: { addressFlag: ADDRESS_FLAG.TO },
        },
      },
      {
        email: {
          emailAddressTo: {
            emailAddress: Like("%" + searchMulti + "%"),
            addressFlag: ADDRESS_FLAG.TO,
          },
        },
      },
    ];
  }

  buildQueryAdvance(getListDto: GetListDto) {
    const {
      caseId,
      activityId,
      subject,
      from,
      to,
      caseIdCondition,
      activityIdCondition,
      subjectCondition,
      fromCondition,
      toCondition,
      assignedTo,
      createdOn,
      subStatus,
      queueName,
      file,
      direction,
      priority,
    } = getListDto;

    let _query = {
      email: {
        emailAddressTo: { addressFlag: ADDRESS_FLAG.TO },
      },
    };

    if (caseId && caseId != "") {
      this.generateQueryWithCondition(
        _query,
        caseIdCondition,
        "caseId",
        caseId
      );
    }

    if (activityId && activityId != "") {
      this.generateQueryWithCondition(
        _query,
        activityIdCondition,
        "activityId",
        activityId
      );
    }

    if (subject && subject != "") {
      this.generateQueryWithCondition(
        _query,
        subjectCondition,
        "subject",
        subject
      );
    }

    if (from && from != "") {
      if (fromCondition == CONDITION_VALUE.MATCH) {
        _query.email["fromEmailAddress"] = from;
      } else if (fromCondition == CONDITION_VALUE.INCLUDE) {
        _query.email["fromEmailAddress"] = Like("%" + from + "%");
      } else {
        _query = _query;
      }
    }

    if (to && to != "") {
      if (toCondition == CONDITION_VALUE.MATCH) {
        _query.email["emailAddressTo"]["emailAddress"] = to;
      } else if (toCondition == CONDITION_VALUE.INCLUDE) {
        _query.email["emailAddressTo"]["emailAddress"] = Like("%" + to + "%");
      } else {
        _query = _query;
      }
    }

    if (assignedTo && assignedTo.length) {
      _query["assignedTo"] = In(assignedTo);
    }

    if (createdOn && createdOn.length) {
      _query["createdOn"] = Between(createdOn[0], createdOn[1]);
    }

    if (subStatus && subStatus != "") {
      if (subStatus == "done") {
        _query["activityStatus"] = In(ACTIVITY_SUB_STATUS.DONE);
      }
    }

    if (queueName && queueName.length) {
      _query["queueId"] = In(queueName);
    }

    if (priority && priority.length) {
      _query["activityPriority"] = In(priority);
    }

    if (file && file != "") {
      if (file == "true") {
        _query["numAttachments"] = MoreThan(0);
      }
      if (file == "false") {
        _query["numAttachments"] = 0;
      }
    }

    if (direction && direction != "") {
      if (direction == "send") {
        _query["activityMode"] = Number(ACTIVITY_MODE.OUTBOUND);
      }
      if (direction == "received") {
        _query["activityMode"] = Number(ACTIVITY_MODE.INBOUND);
      }
    }

    _query = { ..._query };

    return _query;
  }

  generateQueryWithCondition(_query, condition, key, value) {
    if (condition == CONDITION_VALUE.MATCH) {
      _query[key] = key == "subject" ? value : Number(value);
    } else if (condition == CONDITION_VALUE.INCLUDE) {
      _query[key] = Like("%" + key == "subject" ? value : Number(value) + "%");
    } else {
      _query = _query;
    }
    return _query;
  }
}
