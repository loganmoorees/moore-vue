<template>
  <div class="menu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="card">
        aaa
    </el-card>
  </div>
</template>

<script>
export default {};
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
