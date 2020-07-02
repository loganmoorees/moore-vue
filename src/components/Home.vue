<template>
  <el-container>
    <!-- 头部 -->
    <el-header>Header</el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside>
        <!-- 一级菜单 -->
        <el-menu default-active="2" class="el-menu-vertical-demo" unique-opened:true>
          <el-submenu :index="item.id + ''" v-for="(item,arr) in menuList" :key="item.id">
            <template slot="title">
              <i :class="iclassOne(arr)"></i>
              <span>{{item.menuName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="subItem.menuId + ''"
              v-for="(subItem,arr) in item.childMenus"
              :key="subItem.menuId"
              is-active=true
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
          a
        </div>
        <div>
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
      iconTwo: ["iconfont icon-user iconUser",
      "iconfont icon-caidan1 iconMenu"]
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
        return this.iconOne[index]
    },
    iclassTwo(index) {
        console.log(index)
        return this.iconTwo[index]
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
.main-header{
  height: 65px;
  width: 100%;
  background-color: #fff;
  border: 0;
  margin: 5px;
  line-height:50px;
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
</style>
