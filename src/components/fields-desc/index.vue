<template>
  <a-descriptions :label-style="{ width: '11%', justifyContent: 'flex-end' }" v-bind="$attrs">
    <template #title>
      <slot name="title"></slot>
    </template>
    <a-descriptions-item
      v-for="field in fields"
      :key="field.name"
      :label="field.name"
      :span="field.span ? field.span : 3"
    >
      <!--   是字符串、数值、undefined类型   -->
      <span v-if="typeof field.value === 'string' || typeof field.value === 'number' || field.value === undefined">
        {{ field.value ? field.value : '-' }}
      </span>
      <component v-else :is="field.value" />
    </a-descriptions-item>
  </a-descriptions>
</template>

<script setup name="FieldsDesc">
defineProps({
  fields: { type: Array },
});
</script>

<style lang="less" scoped>
:deep(.ant-descriptions-item) {
  padding-bottom: 18px;

  .ant-descriptions-item-label {
    font-size: 14px;
    font-weight: 400;
    color: #85898f;
  }

  .ant-descriptions-item-content {
    width: 100%;
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    color: #343c4c;
  }
}
</style>
