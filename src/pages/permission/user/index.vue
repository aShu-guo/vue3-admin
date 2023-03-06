<template>
  <PageContainer>
    <TableContainer layout="left-right">
      <template #params>
        <a-form layout="inline" :model="formState" ref="form">
          <a-row :gutter="24" style="width: 80%">
            <a-col :span="8">
              <a-form-item label="注册账号" name="username">
                <a-input v-model:value="formState.username" placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="所属行业" name="industryType">
                <a-select v-model:value="formState.industryType" placeholder="请输入">
                  <a-select-option value="" key="不限">不限</a-select-option>
                  <a-select-option v-for="item in getListByEnum(IndustryEnum)" :key="item.name" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="角色" name="roleId">
                <a-select v-model:value="formState.roleId" placeholder="请输入">
                  <a-select-option value="" key="不限">不限</a-select-option>
                  <a-select-option v-for="item in roleList" :key="item.roleId" :value="item.roleId">
                    {{ item.roleName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </template>

      <template #operations>
        <div class="opt-list">
          <a-space :size="24">
            <a-button shape="round" type="primary" size="large" class="ph-38" @click="initData(toRaw(formState), data)">
              查询
            </a-button>
            <a-button shape="round" size="large" class="ph-38" @click="reset">重置</a-button>
          </a-space>
        </div>
      </template>

      <template #table>
        <a-table
          @change="handleTableChange"
          :columns="columns"
          :data-source="data.rows"
          :row-class-name="(_record, index) => (index % 2 === 0 ? 'table-striped' : '')"
          :pagination="{
            showSizeChanger: true,
            showQuickJumper: true,
            total: data.total,
            showTotal: (total, range) => `共${total}条记录 第${Math.ceil(range[1] / 10)}/${Math.ceil(total / 10)}页`,
          }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'userStatus'">
              <div
                class="account-normal"
                :class="record.userStatus === StatusEnum.Normal.value ? 'account-active' : 'account-inactive'"
              >
                {{ record.userStatus === StatusEnum.Normal.value ? '启用' : '停用' }}
              </div>
            </template>
            <template v-if="column.key === 'operations'">
              <a-popconfirm
                overlayClassName="popconfirm-normal"
                :title="`确定${record.userStatus !== StatusEnum.Normal.value ? '启用' : '停用'}该账号？`"
                placement="topRight"
                ok-text="确定"
                cancel-text="取消"
                @confirm="toggleAccount(record)"
              >
                <a href="javascript:void(0)">{{ record.userStatus !== StatusEnum.Normal.value ? '启用' : '停用' }}</a>
              </a-popconfirm>
              <a-divider type="vertical" />
              <a-popconfirm
                overlayClassName="popconfirm-normal"
                title="确定对该账号进行密码重置？"
                placement="topRight"
                ok-text="确定"
                cancel-text="取消"
                @confirm="resetPwd(record)"
              >
                <a href="javascript:void(0)">重置密码</a>
              </a-popconfirm>
              <a-divider type="vertical" />
            </template>
          </template>
        </a-table>
      </template>
    </TableContainer>

    <a-modal
      v-model:visible="visible"
      title="新增账号"
      style="width: 600px"
      wrap-class-name="inner-modal"
      :footer="null"
      :destroy-on-close="true"
    >
      <span>新增账号</span>
    </a-modal>
  </PageContainer>
</template>

<script setup name="MsgCenterPending">
import { onMounted, reactive, ref, toRaw } from 'vue';
import { IndustryEnum, initColumns, initData, StatusEnum } from './columns';
import { PageContainer } from '@ant-design-vue/pro-layout';
import { getListByEnum } from '@/common/utils';
import { message } from 'ant-design-vue';

const formState = reactive({
  username: '',
  industryType: '',
  roleId: '',
  pageNo: 1,
  pageSize: 10,
});
const form = ref(null);
const roleList = ref([]);
const data = ref({});
const columns = initColumns(formState.pageSize, formState.pageNo);

const visible = ref(false);

onMounted(() => {
  initData(toRaw(formState), data);
});
const toggleAccount = async (record) => {
  // 传当前状态
  if (record.userStatus !== StatusEnum.Normal.value) {
    record.userStatus = StatusEnum.Normal.value;
  } else {
    record.userStatus = StatusEnum.Inactive.value;
  }
  message.success(record.userStatus !== StatusEnum.Normal.value ? '停用成功' : '启用成功');
};

const resetPwd = async (_record) => {
  message.success('重置成功');
};

const handleTableChange = (pagination) => {
  formState.pageNo = pagination.current;
  formState.pageSize = pagination.pageSize;
  initData(toRaw(formState), data);
};

const reset = () => {
  form.value.resetFields();
  initData(toRaw(formState), data);
};
</script>

<style lang="less" scoped></style>
