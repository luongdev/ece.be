import { egplCasemgmtActivity } from '@/cisco-ece-entities/egpl-casemgmt-activity.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { GetListDto } from './dto/get-list.dto';

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
        { activityId: Number(searchMulti) },
        { caseId: Number(searchMulti) },
        { subject: Like('%' + searchMulti + '%') }
      ];
    }
    const [listData, totalData] = await this.egplCasemgmtActivityRepository.findAndCount({
      where: _query,
      take: pageSize,
      skip: (page - 1) * pageSize,
      select: {
        email: {
          activityId: true,
          fromEmailAddress: true,
          recvEmailAddress: true
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
        activityMode: true
      }, relations: ['email']
    });
    return { listData, totalData };
  }

  async getActivityDetail(activityId) {
    return {
      key: '0',
      mailSend: 'chamsockhachang@gmail.com',
      to: 'nguyenvana@gmail.com',
      re: 'V/V:Hỗ trợ app Vpbank[#12345]',
      queueName: 'ECE_EMAIL-2020',
      contentActivity: 'Tôi muốn mua số đuôi 2000-- <br><div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><font style="background-color:rgb(255,255,255)" color="#e06666">Nguyễn Thị Nguyệt/Ms.</font><div><font color="#6fa8dc">Tester, METECH JSC </font><div><div><font color="#e06666">M</font>: 0963570165 </div><div><font color="#e06666">E</font>: <a href="mailto:nguyetnt@metechvn.com" target="_blank">nguyetnt@metechvn.com</a><br></div></div></div></div></div>\n',
      files: [
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
        {
          id: '3564',
          contentType: 'image/png',
          name: 'image001.jpg',
          size: '76 KB',
        },
      ],
      activityInfo: [
        {
          name: 'Activity ID',
          content: '102134',
        },
        {
          name: 'Priority',
          content: '5',
        },
        {
          key: 'caseId',
          name: 'CaseId',
          content: '102134',
        },
        {
          name: 'Assigned to',
          content: 'linhpt@vpbank.com.vn(linhpt)',
        },
        {
          name: 'Contact point',
          content: 'ngoc@gmail.com',
        },
        {
          name: 'Department name',
          content: 'Service',
        },
        {
          name: 'Due on',
          content: '12/11/2023',
        },
        {
          name: 'Due at',
          content: '05:00 PM',
        },
        {
          name: 'Classifications',
          content: '',
        },
      ],
      activityNote: [
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
      interactionHistory: [
        {
          time: '11/03/2023 10:12 AM',
          nameInfo: 'system',
          action: 'New case created',
        },
        {
          time: '11/03/2023 10:12 AM',
          nameInfo: 'system',
          action: 'New case created',
        },
        {
          time: '11/03/2023 10:12 AM',
          nameInfo: 'system',
          action: 'New case created',
        },
        {
          time: '11/03/2023 10:12 AM',
          nameInfo: 'system',
          action: 'New case created',
        },
      ],
    };
  }

  async getCaseDetail(caseId) {
    return {
      key: '0',
      mailSend: 'chamsockhachang@gmail.com',
      to: 'nguyenvana@gmail.com',
      re: 'V/V:Hỗ trợ app Vpbank[#12345]',
      queueName: 'ECE_EMAIL-2020',
      // eslint-disable-next-line max-len
      contentActivity: 'Tôi muốn mua số đuôi 2000-- <br><div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><font style="background-color:rgb(255,255,255)" color="#e06666">Nguyễn Thị Nguyệt/Ms.</font><div><font color="#6fa8dc">Tester, METECH JSC </font><div><div><font color="#e06666">M</font>: 0963570165 </div><div><font color="#e06666">E</font>: <a href="mailto:nguyetnt@metechvn.com" target="_blank">nguyetnt@metechvn.com</a><br></div></div></div></div></div>\n',
      file: [
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
        {
          id: '3564',
          contentType: 'image/png',
          name: 'image001.jpg',
          size: '76 KB',
        },
      ],
      activityInfo: [
        {
          name: 'Activity ID',
          content: '102134',
        },
        {
          name: 'Priority',
          content: '5',
        },
        {
          name: 'CaseId',
          content: '102134',
        },
        {
          name: 'Assigned to',
          content: 'linhpt@vpbank.com.vn(linhpt)',
        },
        {
          name: 'Contact point',
          content: 'ngoc@gmail.com',
        },
        {
          name: 'Department name',
          content: 'Service',
        },
        {
          name: 'Due on',
          content: '12/11/2023',
        },
        {
          name: 'Due at',
          content: '05:00 PM',
        },
        {
          name: 'Classifications',
          content: '',
        },
      ],
      activityNote: [
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
      interactionHistory: [
        {
          time: '11/03/2023 10:12 AM',
          nameInfo: 'system',
          action: 'New case created',
        },
        {
          time: '11/03/2023 10:12 AM',
          nameInfo: 'system',
          action: 'New case created',
        },
        {
          time: '11/03/2023 10:12 AM',
          nameInfo: 'system',
          action: 'New case created',
        },
        {
          time: '11/03/2023 10:12 AM',
          nameInfo: 'system',
          action: 'New case created',
        },
      ],
    };
  }
}