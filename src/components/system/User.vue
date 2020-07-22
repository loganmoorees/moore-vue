<template>
  <div class="menu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="card">
      <!-- 导航菜单 -->
      <div>
        <template>
          <a-tree-select
            v-model="value"
            show-search
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="Please select"
            allow-clear
            tree-default-expand-all
          >
            <a-tree-select-node key="0-1" value="parent 1" title="parent 1">
              <a-tree-select-node key="0-1-1" value="parent 1-0" title="parent 1-0">
                <a-tree-select-node key="random" :selectable="false" value="leaf1" title="my leaf" />
                <a-tree-select-node key="random1" value="leaf2" title="your leaf" />
              </a-tree-select-node>
              <a-tree-select-node key="random2" value="parent 1-1" title="parent 1-1">
                <a-tree-select-node key="random3" value="sss">
                  <b slot="title" style="color: #08c">sss</b>
                </a-tree-select-node>
              </a-tree-select-node>
            </a-tree-select-node>
          </a-tree-select>
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
      treeExpandedKeys: [],
      value: undefined
    }
  }
}
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
