<template>
  <div class="menu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="card">
      <!-- 导航菜单 -->
      <div style="width: 20%">
        <!-- <template>
          <a-directory-tree multiple default-expand-all @select="onSelect" @expand="onExpand">
            <a-tree-node v-for="(item,arr) in treeList" :key="arr" :title="item.name">
              <a-tree-node v-for="(itemSub,itemArr) in item.childMenu" :key="itemArr" :title="itemSub.name" is-leaf />
            </a-tree-node>
          </a-directory-tree>
        </template> -->
        <template>
      <template>
  <a-tree show-line :default-expanded-keys="['0-0-0']" @select="onSelect">
    <a-icon slot="switcherIcon" type="down" />
    <a-tree-node key="0-0" title="parent 1">
      <a-tree-node key="0-0-0" title="parent 1-0">
        <a-tree-node key="0-0-0-0" title="leaf" />
        <a-tree-node key="0-0-0-1" title="leaf" />
        <a-tree-node key="0-0-0-2" title="leaf" />
      </a-tree-node>
      <a-tree-node key="0-0-1" title="parent 1-1">
        <a-tree-node key="0-0-1-0" title="leaf" />
      </a-tree-node>
      <a-tree-node key="0-0-2" title="parent 1-2">
        <a-tree-node key="0-0-2-0" title="leaf" />
        <a-tree-node key="0-0-2-1" title="leaf" />
      </a-tree-node>
    </a-tree-node>
  </a-tree>
</template>
</template>
      </div>
      <!-- 结束 -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeList: [],
      treeData: [
        {
          title: 'parent 1',
          key: '0-0',
          slots: {
            icon: 'smile'
          },
          children: [
            { title: 'leaf', key: '0-0-0', slots: { icon: 'iconfont icon-caidan' } },
            { title: 'leaf', key: '0-0-1', scopedSlots: { icon: 'custom' } }
          ]
        }
      ]
    }
  },
  methods: {
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info);
    },
    onCheck(checkedKeys, info) {
      console.log('onCheck', checkedKeys, info);
    },
    async getProductType() {
      const { data: res } = await this.$http.get("product/type");
      if (res.code !== 200) {
        return this.$message.error("货品分类获取失败");
      }
      console.log(res.data)
      // this.treeList = res.data
    }
  },
  created() {
    this.getProductType();
  }
};
</script>

<style lang="less" scoped>
.menu {
  padding: 10px;
  padding-top: 20px;
}
.card {
  margin-top: 20px;
}
</style>
