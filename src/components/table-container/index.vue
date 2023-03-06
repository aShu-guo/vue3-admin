<template>
  <div class="mix-content-box">
    <!--  搜索框布局  -->
    <div class="page-params-box" :class="props.layout">
      <div class="params-box">
        <slot name="params"></slot>
      </div>
      <div class="btn-box">
        <slot name="operations"></slot>
      </div>
    </div>
    <!--  table布局  -->
    <div class="table-box">
      <slot name="table"></slot>
    </div>
  </div>
</template>

<script setup name="PageParams">
/**
 * 搜索框与table布局组件
 */
const props = defineProps({
  layout: {
    type: String,
    default: 'left-right',
    validator: (value) => ['left-right', 'top-bottom'].indexOf(value) >= 0,
  },
});
</script>

<style lang="less" scoped>
.mix-content-box {
  display: flex;
  flex-flow: column;

  .page-params-box {
    display: flex;
    background: #ffffff;
    border-radius: 4px;
    padding: 31px 36px 31px 28px;

    .params-box {
      flex: 1;

      :deep(.ant-form) {
        width: 100%;
      }
    }
  }

  :deep(.table-box) {
    padding: 36px 36px 0;
    margin-top: 20px;
    background: #ffffff;
    border-radius: 4px;
    flex: 1;

    .ant-table-body {
      padding-bottom: 350px;
    }
  }
}

.left-right {
  justify-content: space-between;

  .page-params-box {
    align-items: center;
  }
}

.top-bottom {
  flex-flow: column;
}
</style>
