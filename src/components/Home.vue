<template>
  <el-container>
    <!-- 头部 -->
    <el-header>Header</el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside>
        <!-- 一级菜单 -->
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="item.menuIcon"></i>
              <span>{{item.menuName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="subItem.menuId + ''"
              v-for="subItem in item.childMenus"
              :key="subItem.menuId"
            >
              <template slot="title">
                <i :class="subItem.menuIcon"></i>
                <span>{{subItem.menuName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menuList: []
    };
  },

  created() {
    this.getMenuList();
  },
  methods: {
    async getMenuList() {
      const { data: res } = await this.$http.get("menu");
      if (res.code !== 200) {
        return this.$message.error("菜单获取失败");
      }
      this.menuList = res.data;
      console.log(this.menuList);
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #24292e;
}

.el-aside {
  background-color: #fff;
  height: 100%;
  border-right: 1px solid #e1e4e8 !important;
}
.el-main {
  background-color: #e1e4e8;
}

.el-menu-item.is-active {
  color: #3883fa;
}

i {
  font-size: 18px;
}
</style>
