<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <i class="iconfont icon-caidan toggle-caidan" @click="toggleIcon"></i>
      <span class="user-info">
        <i class="iconfont icon-remind remind"></i>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img src="../assets/images/user.jpg" alt="" class="user-photo" />
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="user-detail">
            <el-dropdown-item class="clearfix">
              个人信息
              <!-- <el-badge class="mark" :value="12" /> -->
            </el-dropdown-item>
            <el-dropdown-item class="clearfix" @click.native="loginOut">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '4%':'12%'" :class="asidePosition">
        <!-- 一级菜单 -->
        <el-menu
          default-active="activePath"
          class="el-menu-vertical-demo"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-submenu :index="item.id + ''" v-for="(item,arr) in menuList" :key="item.id">
            <template slot="title">
              <i :class="iclassOne(arr)"></i>
              <span>{{item.menuName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="subItem.menuPath + ''"
              v-for="(subItem,arr) in item.childMenus"
              :key="subItem.menuId"
              is-active="true"
              @click="saveNavState(subItem.menuPath)"
            >
              <template slot="title">
                <i :class="iclassTwo(arr)"></i>
                <span>{{subItem.menuName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <div>
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      iconOne: ["iconfont icon-xitong iconSystem"],
      // 二级菜单
      iconTwo: [
        "iconfont icon-user iconUser",
        "iconfont icon-caidan1 iconMenu"
      ],
      // 是否折叠
      isCollapse: true,
      activePath: "",
      // 左侧折叠位置
      asidePosition: ""
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
      } else {
        this.isCollapse = !this.isCollapse;
        this.asidePosition = "aside-left";
      }
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    loginOut() {
      console.log("退出")
      window.sessionStorage.removeItem("token");
      this.$router.push('/login')
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
  .el-menu {
    border-right: none;
    float: right;
  }
}
.el-main {
  background-color: #e1e4e8;
  padding: 0;
}

.el-menu-item.is-active {
  color: #3883fa;
}

.iconfont {
  margin-right: 10px;
}

span {
  font-weight: 700;
  // color: black;
}
.el-menu-item.is-active {
  color: #fff;
  background-color: #333;
}
.iconUser {
  color: seagreen;
}
.iconMenu {
  color: gold;
}
.iconSystem {
  color: darkslategray;
}
.button-fold {
  margin-left: 2%;
  color: #24292e;
}
.toggle-caidan {
  font-size: 20px;
  line-height: 55px;
  color: aliceblue;
}
.aside-left {
  .el-menu {
    border-right: none;
    float: unset;
  }
}
.aside-right {
  .el-menu {
    border-right: none;
    float: right;
  }
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #333;
  color: #fff;
}
.remind {
  color: #fff;
  font-size: 18px;
  line-height: 55px;
  margin-right: 40px;
  font-weight: 400;
}
.remind:hover {
  color: #8a8a8a;
  font-size: 18px;
}
.user-photo {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin: 0 auto;
  // display: inline-block;
  vertical-align: middle;
  background-position-x: right;
  margin-top: -5px;
  margin-right: 10px;
  font-weight: 400;
}
.user-info {
  float: right;
}
.el-popper[x-placement^=bottom] {
    margin-top: 19px;
}
</style>
