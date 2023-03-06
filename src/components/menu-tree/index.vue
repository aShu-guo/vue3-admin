<template>
  <a-tree
    class="menu-tree"
    v-if="treeData.length > 0"
    :height="height"
    v-bind="$attrs"
    v-model:checkedKeys="checkedKeys"
    checkable
    show-icon
    auto-expand-parent
    default-expand-all
    :field-names="{ children: 'childList', title: 'menuName', key: 'menuId' }"
    :tree-data="treeData"
  />
</template>

<script setup name="MenuTree">
// 菜单树🌲
import { onMounted, ref, watch } from 'vue';
import MenuAPI from '@/apis/menu';
import RoleAPI from '@/apis/roles';
import { get } from '@/common/http';
const emit = defineEmits(['check']);
const props = defineProps({
  roleId: { type: Number, required: true },
  height: { type: Number, default: 462 },
});
const checkedKeys = ref([]);
const treeData = ref([]);
watch(checkedKeys, (newVal) => {
  emit('check', newVal);
});

onMounted(async () => {
  const [res1, res2] = await Promise.all([get(MenuAPI.getMenuList), get(RoleAPI.getRoleMenuList + props.roleId)]);
  treeData.value = res1.records;
  checkedKeys.value = res2.roleMenuIds || [];
  emit('check', checkedKeys.value);
});
</script>

<style lang="less">
.menu-tree {
  .ant-tree-treenode {
    padding-bottom: 20px;

    .ant-tree-checkbox {
      &-inner {
        border-radius: 2px;
      }
    }

    .ant-tree-indent {
      &-unit {
        width: 30px;
      }
    }
  }
}
</style>
