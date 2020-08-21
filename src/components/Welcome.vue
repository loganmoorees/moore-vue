<template>
  <div class="menu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>Home</el-breadcrumb-item>
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
</style>
