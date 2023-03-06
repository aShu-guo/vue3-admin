<template>
  <a-upload
    v-model:file-list="fileList"
    :custom-request="handleUpload"
    :before-upload="beforeUpload"
    @remove="handleRemove"
    v-bind="$attrs"
    :max-count="1"
  >
    <a-button class="cancel-btn br-4">
      <upload-outlined />
      上传文件
    </a-button>
  </a-upload>
</template>

<script setup>
import { ref } from 'vue';
import { Form, message } from 'ant-design-vue';
import FileAPI from '@/apis/file';
import axios from 'axios';
import { CacheKey } from '@/common/cache/key';
import { getAliveValue } from '@/common/cache';
const emit = defineEmits(['update:text']);
// 其他props参考：https://www.antdv.com/components/upload-cn
defineProps({
  text: { type: String, default: '', required: false },
  maxSize: { type: Number, default: 1024 * 1024 * 5 },
});

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_HOST });
const formItemContext = Form.useInjectFormItemContext();
const triggerChange = (changedValue) => {
  emit('update:text', changedValue);
  formItemContext.onFieldChange();
};
const fileList = ref([]);
const beforeUpload = (_e) => {
  /*if (e.size >= props.maxSize) {
    message.error('文件大小最大为' + props.maxSize / (1024 * 1024) + 'M');
    return Upload.LIST_IGNORE;
  }*/
  return true;
};
const handleUpload = async (params) => {
  // 暂时支持单个文件上传
  const { file } = params;
  const { status, data } = await axiosInstance.post(
    FileAPI.getFileText,
    { file },
    { headers: { 'Content-Type': 'multipart/form-data', Authorization: getAliveValue(CacheKey.ACCESS_TOKEN).value } },
  );
  const FILE = fileList.value.slice(-1)[0];

  if (status !== 200) {
    FILE.status = 'error';
    message.error('服务器错误');
  } else {
    FILE.status = 'done';
    triggerChange(data);
  }
};

const handleRemove = (file) => {
  fileList.value = fileList.value.filter((item) => item.uid !== file.uid);
  triggerChange('');
};
</script>

<style lang="less" scoped></style>
