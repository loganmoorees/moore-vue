<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <i class="iconfont icon-caidan toggle-caidan" @click="toggleIcon"></i>
      <span class="user-info">
        <i class="iconfont icon-remind remind"></i>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img src="../assets/images/user.jpg" alt class="user-photo" />
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="user-detail">
            <el-dropdown-item class="clearfix">
              个人信息
              <!-- <el-badge class="mark" :value="12" /> -->
            </el-dropdown-item>
            <el-dropdown-item class="clearfix" @click.native="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </el-header>
    <template>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '60px':'200px'" :class="asidePosition" style="position: fixed;margin-top:60px;margin-bottom:-60px;">
        <!-- 一级菜单 -->
        <el-menu
          default-active="activePath"
          class="el-menu-vertical-demo"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :index="item.id + ''"
          v-for="(item,arr) in menuList"
          :key="item.id"
        >
          <el-submenu v-if="item.childMenus != null" :index="item.id + ''">
            <template slot="title">
              <i :class="iclassOne(arr)"></i>
              <span slot="title">{{item.menuName}}</span>
            </template>
            <!-- 二级菜单 -->
              <div v-for="(subItem) in item.childMenus" :key="subItem.menuId">
                <el-submenu
                  :index="subItem.menuPath + ''"
                  v-if="subItem.childMenus != null"
                  is-active="true"
                  unique-opened
                  class="el-menu-vertical-demo"
                  @click="saveNavState(subItem.menuPath)"
                >
                  <template slot="title">
                    <!-- <i :class="iclassTwo(subArr)"></i> -->
                    <span slot="title">{{subItem.menuName}}</span>
                  </template>
                  <!-- <el-menu-item v-if="subItem.childMenus == null">
                    <template slot="title">
                    <i :class="iclassTwo(subArr)"></i>
                    <span>{{subItem.menuName}}</span>
                  </template>
                  </el-menu-item> -->
                  <!-- 三级菜单 -->
                  <el-menu-item
                    v-for="(child,menuArr) in subItem.childMenus"
                    :key="child.menuId"
                    :index="menuArr + ''"
                    is-active="true"
                  >
                    <template>
                      <span slot="title">{{child.menuName}}</span>
                    </template>
                  </el-menu-item>
                  <!-- 三级菜单结束 -->
                </el-submenu>
                <el-menu-item v-if="subItem.childMenus == null" :index="subItem.menuPath">
                  <template>
                    <!-- <i :class="iclassTwo(subArr)"></i> -->
                    <span slot="title">{{subItem.menuName}}</span>
                  </template>
                </el-menu-item>
              </div>
            <!-- 二级菜单结束 -->
          </el-submenu>
          <el-menu-item v-if="item.childMenus == null" :index="item.menuPath + ''">
              <i :class="iclassOne(arr)"></i>
              <span>{{item.menuName}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main :style="mainStyle">
        <div>
          <router-view></router-view>
        </div>
      </el-main>
    </template>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      iconOne: [
        "iconfont icon-data iconSystem",
        "iconfont icon-xitong iconXitong",
        "iconfont icon-kccx iconKccx",
        "iconfont icon-caigoudingdan iconCaigou",
        "iconfont icon-feiyongduoweifenxi iconFeiyong"
      ],
      // 二级菜单
      iconTwo: [
        "iconfont icon-rili",
        "iconfont icon-rili1",
        "iconfont icon-rili3",
        "iconfont icon-rili2",
        "iconfont icon-rili4",
        "iconfont icon-rili11",
        "iconfont icon-rili5",
        "iconfont icon-rili6",
        "iconfont icon-rili8",
        "iconfont icon-rili10"
      ],
      // 是否折叠
      isCollapse: true,
      activePath: "",
      // 左侧折叠位置
      asidePosition: "",
      openends: ["1"],
      mainStyle: 'padding-left: 80px'
    };
  },

  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    async getMenuList() {
      const { data: res } = await this.$http.get("menu");
      if (res.code !== 200) {
        return this.$message.error("菜单获取失败");
      }
      this.menuList = res.data;
      console.log(this.menuList);
    },
    iclassOne(index) {
      return this.iconOne[index];
    },
    iclassTwo(index) {
      return this.iconTwo[index];
    },
    toggleIcon() {
      if (!this.isCollapse) {
        this.isCollapse = !this.isCollapse;
        this.asidePosition = "aside-right";
        this.mainStyle = 'padding-left: 80px';
      } else {
        this.mainStyle = '';
        this.isCollapse = !this.isCollapse;
        this.mainStyle = " padding-left: 220px";
      }
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    loginOut() {
      console.log("退出");
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped src="../assets/css/home.css">
.mainOpen {
  padding-left: 120px
}
.mainClose {
  padding-left: 50px
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
