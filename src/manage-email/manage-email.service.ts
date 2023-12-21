import { egplCasemgmtActivity } from '@/cisco-ece-entities/egpl-casemgmt-activity.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { GetListDto } from './dto/get-list.dto';
import { ADDRESS_FLAG } from '@/constants';

@Injectable()
export class ManageEmailService {
  constructor(
    @InjectRepository(egplCasemgmtActivity)
    private egplCasemgmtActivityRepository: Repository<egplCasemgmtActivity>,
  ) { }

  async getListEmail(getListDto: GetListDto) {
    const { page, pageSize, searchMulti } = getListDto;
    let _query = {};
    if (searchMulti && searchMulti !== '') {
      _query = [
        {
          activityId: Number(searchMulti),
          email: {
            emailAddressTo: { addressFlag: ADDRESS_FLAG.TO }
          }
        },
        {
          caseId: Number(searchMulti),
          email: {
            emailAddressTo: { addressFlag: ADDRESS_FLAG.TO }
          }
        },
        {
          subject: Like('%' + searchMulti + '%'),
          email: {
            emailAddressTo: { addressFlag: ADDRESS_FLAG.TO }
          }
        },
      ];
    } else {
      _query = {
        email: {
          emailAddressTo: { addressFlag: ADDRESS_FLAG.TO }
        }
      };
    }
    const [listData, totalData] = await this.egplCasemgmtActivityRepository.findAndCount({
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
          userName: true
        },
        queue: {
          queueId: true,
          queueName: true
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
      relations: ['email', 'user', 'queue', 'email.emailAddressTo'],
    });
    return { listData, totalData };
  }

  async getActivityDetail(activityId) {
    const activityDetail = await this.egplCasemgmtActivityRepository.findOne({
      where: {
        activityId: activityId,
        email: {
          emailAddressTo: { addressFlag: ADDRESS_FLAG.TO }
        }
      },
      select: {
        activityId: true,
        caseId: true,
        subject: true,
        createdOn: true,
        activityPriority: true,
        contactPointId: true,
        departmentId: true,
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
              fileName: true
            }
          }
        },
      },
      relations: [
        'email',
        'email.emailAddressTo',
        'email.emailAttachmentLink',
        'email.emailAttachmentLink.attachment',
        'emailDataAlt',
        'user'
      ]
    });
    return activityDetail;
  }

  async getCaseDetail(caseId) {
    return {
      caseInfo: [
        {
          name: 'CaseId',
          content: '102134',
        },
        {
          name: 'Case status',
          content: '102134',
        },
        {
          name: 'Owner',
          content: 'thuha@gmail.com',
        },
        {
          name: 'Severity',
          content: 'Medium',
        },
        {
          name: 'Due on',
          content: '06/11/2023',
        },
        {
          name: 'Due at',
          content: '05:00 PM',
        },
        {
          name: 'Description',
          content: 'Khuyến cáo an toàn khi sử dụng thẻ tín dụng và tài khoản ngân hàng.' +
            'Khuyến cáo an toàn khi sử dụng thẻ tín dụng và tài khoản ngân hàng',
        },
        {
          name: 'Description of solution',
          content: 'abc',
        },
        {
          name: 'Related cases',
          content: '1027643,1027643',
        },
        {
          name: 'Classifications',
          content: 'abc',
        },

      ],
      caseActivity: [
        {
          key: '0',
          activityId: 1212321,
          direction: 'inbout',
          mailSend: 'chamsockhachang@gmail.com',
          to: 'nguyenvana@gmail.com',
          subject: 'V/V:Hỗ trợ app Vpbank[#12345]',
          queueName: 'ECE_EMAIL-2020',
          createOn: '06/11/2023 08:40 AM',
          files: [],
          // eslint-disable-next-line max-len
          content: 'Tôi muốn mua số đuôi 2000-- <br><div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><font style="background-color:rgb(255,255,255)" color="#e06666">Nguyễn Thị Nguyệt/Ms.</font><div><font color="#6fa8dc">Tester, METECH JSC </font><div><div><font color="#e06666">M</font>: 0963570165 </div><div><font color="#e06666">E</font>: <a href="mailto:nguyetnt@metechvn.com" target="_blank">nguyetnt@metechvn.com</a><br></div></div></div></div></div>\n',

        },
        {
          key: '1',
          activityId: 1212322,
          direction: 'outbout',
          mailSend: 'chamsockhachang@gmail.com',
          to: 'nguyenvana@gmail.com',
          subject: 'V/V:Hỗ trợ app Vpbank[#12345]',
          queueName: 'ECE_EMAIL-2020',
          createOn: '06/11/2023 08:40 AM',
          // eslint-disable-next-line max-len
          content: 'Tôi muốn mua số đuôi 2000-- <br><div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><font style="background-color:rgb(255,255,255)" color="#e06666">Nguyễn Thị Nguyệt/Ms.</font><div><font color="#6fa8dc">Tester, METECH JSC </font><div><div><font color="#e06666">M</font>: 0963570165 </div><div><font color="#e06666">E</font>: <a href="mailto:nguyetnt@metechvn.com" target="_blank">nguyetnt@metechvn.com</a><br></div></div></div></div></div>\n',
          files: [
            {
              id: '3564',
              contentType: 'image/png',
              name: 'image001.jpg',
              size: '76 KB',
            },
            {
              id: '29607',
              contentType: 'text/csv',
              name: 'pdf',
              size: '76 KB',
            },
            {
              id: '29605',
              contentType: 'image/png',
              name: 'image001.jpg',
              size: '76 KB',
            },
            {
              id: '3564',
              contentType: 'image/png',
              name: 'image001.jpg',
              size: '76 KB',
            },
            {
              id: '3564',
              contentType: 'image/png',
              name: 'image001.jpg',
              size: '76 KB',
            },
          ],
        },
        {
          key: '2',
          activityId: 1212322,
          direction: 'outbout',
          mailSend: 'chamsockhachang@gmail.com',
          to: 'nguyenvana@gmail.com',
          subject: 'V/V:Hỗ trợ app Vpbank[#12345]',
          queueName: 'ECE_EMAIL-2020',
          createOn: '06/11/2023 08:40 AM',
          files: [
            {
              id: '3564',
              contentType: 'image/png',
              name: 'image001.jpg',
              size: '76 KB',
            },
            {
              id: '29607',
              contentType: 'text/csv',
              name: 'pdf',
              size: '76 KB',
            },
            {
              id: '29605',
              contentType: 'image/png',
              name: 'image001.jpg',
              size: '76 KB',
            },
            {
              id: '3564',
              contentType: 'image/png',
              name: 'image001.jpg',
              size: '76 KB',
            },
            {
              id: '3564',
              contentType: 'image/png',
              name: 'image001.jpg',
              size: '76 KB',
            },
          ],
        },
        {
          key: '3',
          activityId: 1212322,
          direction: 'outbout',
          mailSend: 'chamsockhachang@gmail.com',
          to: 'nguyenvana@gmail.com',
          subject: 'V/V:Hỗ trợ app Vpbank[#12345]',
          queueName: 'ECE_EMAIL-2020',
          createOn: '06/11/2023 08:40 AM',
          files: [
            {
              id: '3564',
              contentType: 'image/png',
              name: 'image001.jpg',
              size: '76 KB',
            },
            {
              id: '29607',
              contentType: 'text/csv',
              name: 'pdf',
              size: '76 KB',
            },
            {
              id: '29605',
              contentType: 'image/png',
              name: 'image001.jpg',
              size: '76 KB',
            },
            {
              id: '3564',
              contentType: 'image/png',
              name: 'image001.jpg',
              size: '76 KB',
            },
            {
              id: '3564',
              contentType: 'image/png',
              name: 'image001.jpg',
              size: '76 KB',
            },
          ],
        },
        {
          key: '4',
          activityId: 1212322,
          direction: 'outbout',
          mailSend: 'chamsockhachang@gmail.com',
          to: 'nguyenvana@gmail.com',
          subject: 'V/V:Hỗ trợ app Vpbank[#12345]',
          queueName: 'ECE_EMAIL-2020',
          createOn: '06/11/2023 08:40 AM',
          files: [
            {
              id: '3564',
              contentType: 'image/png',
              name: 'image001.jpg',
              size: '76 KB',
            },
            {
              id: '29607',
              contentType: 'text/csv',
              name: 'pdf',
              size: '76 KB',
            },
            {
              id: '29605',
              contentType: 'image/png',
              name: 'image001.jpg',
              size: '76 KB',
            },
            {
              id: '3564',
              contentType: 'image/png',
              name: 'image001.jpg',
              size: '76 KB',
            },
            {
              id: '3564',
              contentType: 'image/png',
              name: 'image001.jpg',
              size: '76 KB',
            },
          ],
        },
      ],
      caseNote: [
        {
          time: '07/11/2023 11:43AM',
          email: 'haiyen@vpbank.com.vn(haiyen)',
          content: 'Khuyến cáo an toàn khi sử dụng thẻ tín dụng và tài khoản ngân hàng',
        },
        {
          time: '07/11/2023 11:43AM',
          email: 'haiyen@vpbank.com.vn(haiyen)',
          content: 'Khuyến cáo an toàn khi sử dụng thẻ tín dụng và tài khoản ngân hàng',
        },
        {
          time: '07/11/2023 11:43AM',
          email: 'haiyen@vpbank.com.vn(haiyen)',
          content: 'Khuyến cáo an toàn khi sử dụng thẻ tín dụng và tài khoản ngân hàng',
        },
      ],
    };
  }
}