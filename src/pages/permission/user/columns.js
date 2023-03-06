import { unref } from 'vue';
import { defineUI } from '@/common/table';
import { getValueEnum } from '@/common/utils';
export const StatusEnum = {
  Inactive: { value: '0', name: '停用' },
  Locked: { value: '1', name: '锁定' },
  Normal: { value: '2', name: '正常' },
};
export const IndustryEnum = {
  UAV: { name: '无人机', value: '1' },
  UGV: { name: '无人车', value: '2' },
  Both: { name: '无人机/无人车', value: '1,2' },
};

export const IdTypeEnum = {
  IdCard: { name: '身份证', value: '1' },
  UnifiedSocialCode: { name: '统一社会信用代码', value: '2' },
};

export const OrgEnum = {
  Other: { value: '0', name: '其他' },
  Personal: { value: '1', name: '个人' },
  Enterprise: { value: '2', name: '企业' },
  Scientific: { value: '3', name: '科研机构' },
  Association: { value: '4', name: '行业联盟、协会' },
  Authority: { value: '5', name: '检测、认证机构' },
};
export const initColumns = (pageSize, pageNo) => {
  return defineUI(
    [
      {
        title: '序号',
        width: 100,
        dataIndex: 'index',
        valueType: 'index',
      },
      { title: '注册账号', dataIndex: 'username' },
      { title: '所属行业', dataIndex: 'industryType', valueEnum: getValueEnum(IndustryEnum) },
      { title: '账号角色', dataIndex: 'roleName' },
      { title: '机构类型', dataIndex: 'orgType', valueEnum: getValueEnum(OrgEnum) },
      { title: '注册时间', dataIndex: 'createdTime', valueType: 'dateTime' },
      {
        title: '状态',
        dataIndex: 'userStatus',
        key: 'userStatus',
        align: 'center',
        width: 100,
        valueEnum: getValueEnum(StatusEnum),
      },
      {
        title: '操作',
        key: 'operations',
        valueType: 'operations',
        width: 200,
        align: 'center',
      },
    ],
    {
      pageSize,
      pageNo,
    },
  );
};
export const initData = async (params, data) => {
  const { rows, total } = await Promise.resolve({
    total: 3,
    rows: [
      {
        userId: '65a896b470c1',
        username: 'Wang123',
        industryType: '1,2',
        roleName: '用户',
        orgType: '1',
        createdTime: '2023-03-03T11:51:09',
        userStatus: '2',
      },
      {
        userId: 'e429d21d24b0',
        username: 'admin4',
        industryType: null,
        roleName: '管理员',
        orgType: null,
        createdTime: '2023-03-01T17:17:03',
        userStatus: '2',
      },
      {
        userId: '7a6eb92f8250',
        username: '浙江科尚有限公司',
        industryType: '1,2',
        roleName: '用户',
        orgType: '5',
        createdTime: '2023-03-01T16:06:11',
        userStatus: '2',
      },
    ],
  });
  unref(data).rows = rows;
  unref(data).total = total;
};
