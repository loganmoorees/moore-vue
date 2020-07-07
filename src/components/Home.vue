<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <i class="iconfont icon-caidan toggle-caidan" @click="toggleIcon"></i>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '4%':'12%'" :class="asidePosition">
        <!-- 一级菜单 -->
        <el-menu
          default-active="2"
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
        <div class="main-header">
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
      asidePosition: ''
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
        this.asidePosition = 'aside-right'
      } else {
        this.isCollapse = !this.isCollapse;
        this.asidePosition = 'aside-left'
      }
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
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
.main-header {
  height: 50px;
  width: 100%;
  background-color: #fff;
  border: 0;
  margin: 5px;
  line-height: 50px;
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
  line-height: 50px;
  color: aliceblue;
}
.aside-left {
  .el-menu {
    border-right: none;
    float:unset;
  }
}
.aside-right {
  .el-menu {
    border-right: none;
    float:right;
  }
}
.el-menu-item:focus, .el-menu-item:hover {
  background-color: #333;
  color: #fff;
}
</style>
