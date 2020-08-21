<template>
  <div class="menu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{  path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="card">
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  },
  created() {
  }
};
</script>

<style lang="less" scoped>
.menu {
  // padding: 10px;
  padding-top: 20px;
}
.card {
  position: fixed;
  margin-top: 20px;
  height: 100%;
  margin-bottom: -200px;
  overflow: auto;
  width: 100%;
}
::-webkit-scrollbar {
  display: none;
}
</style>
