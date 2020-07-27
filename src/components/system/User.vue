<template>
  <div class="menu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{  path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="card">
      <!-- 导航菜单 -->
      <div>
        <template>
          <a-tabs default-active-key="2" v-for="topItem in treeList" :key="topItem.treeId">
            <a-tab-pane v-for="subItem in topItem.childMenu" :key="subItem.treeId">
              <span slot="tab">
                <a-icon type="apple" />
                {{subItem.name}}
              </span>
              <!-- 底层菜单 -->
              <template>
                <div>
                  <a-input-search
                    v-model="searchStr"
                    placeholder="输入搜选项"
                    style="width:200px;"
                    @search="onSearch"
                  ></a-input-search>
                  <!-- selectedKeys是选中项key的集合，expandedKeys是展开项key的集合 -->
                  <a-tree
                    v-model="checkedKeys"
                    :treeData="treeList"
                    :selectedKeys="selectedKeys"
                    :expandedKeys="expandedKeys"
                    @expand="onExpand"
                    :autoExpandParent="autoExpandParent"
                    :replaceFields="replaceFields"
                    @select="onSelect"
                  >
                    <template slot="title" slot-scope="{name}">
                      <span
                        v-html="name.replace(new RegExp(searchValue,'g'),'<span style=color:#f50>'+ searchValue +'</span>')"
                      ></span>
                    </template>
                  </a-tree>
                </div>
              </template>
              <!-- 底层菜单 -->
            </a-tab-pane>
          </a-tabs>
        </template>
      </div>
      <!-- 结束 -->
    </el-card>
  </div>
</template>

<script>
const treeData = [
  // {
  //   name: "Hello",
  //   key: "0-0",
  //   scopedSlots: { title: "title" },
  //   children: [
  //     {
  //       name: "0-0-0",
  //       key: "0-0-0",
  //       scopedSlots: { title: "title" },
  //       children: [
  //         { name: "0-0-0-1", key: "0-0-0-1", scopedSlots: { title: "title" } },
  //         { name: "0-0-0-2", key: "0-0-0-2", scopedSlots: { title: "title" } }
  //       ]
  //     },
  //     {
  //       name: "0-0-1",
  //       key: "0-0-1",
  //       scopedSlots: { title: "title" },
  //       children: [
  //         { name: "0-0-1-0", key: "0-0-1-0", scopedSlots: { title: "title" } },
  //         { name: "0-0-1-1", key: "0-0-1-1", scopedSlots: { title: "title" } },
  //         { name: "0-0-1-2", key: "0-0-1-2", scopedSlots: { title: "title" } }
  //       ]
  //     },
  //     {
  //       name: "0-0-2",
  //       key: "0-0-2",
  //       scopedSlots: { title: "title" }
  //     }
  //   ]
  // },
  // {
  //   name: "0-1",
  //   scopedSlots: { title: "title" },
  //   key: "0-1",
  //   children: [
  //     { name: "0-1-0-0", key: "0-1-0-0", scopedSlots: { title: "title" } },
  //     { name: "0-1-0-1", key: "0-1-0-1", scopedSlots: { title: "title" } },
  //     { name: "0-1-0-2", key: "0-1-0-2", scopedSlots: { title: "title" } }
  //   ]
  // },
  // {
  //   name: "0-2",
  //   key: "0-2",
  //   scopedSlots: { title: "title" }
  // }
];
export default {
  data() {
    return {
      treeList: [],
      replaceFields: { title: "name", key: "treeId", children: 'childMenu' },
      expandedKeys: [],
      backupsExpandedKeys: [],
      autoExpandParent: false,
      checkedKeys: [],
      selectedKeys: [],
      searchValue: "",
      treeData,
      searchStr: ""
    };
  },
  methods: {
    onSearch() {
      var vm = this;
      //  添加这行代码是为了只点击搜索才触发
      vm.searchValue = vm.searchStr;
      //  如果搜索值为空，则不展开任何项，expandedKeys置为空
      //  如果搜索值不位空，则expandedKeys的值要为搜索值的父亲及其所有祖先
      if (vm.searchValue === "") {
        vm.expandedKeys = [];
      } else {
        //  首先将展开项与展开项副本置为空
        vm.expandedKeys = [];
        vm.backupsExpandedKeys = [];
        //  获取所有存在searchValue的节点
        const candidateKeysList = vm.getkeyList(vm.searchValue, vm.treeList, []);
        //  遍历满足条件的所有节点
        candidateKeysList.map((item) => {
          //  获取每个节点的母亲节点
          var key = vm.getParentKey(item, vm.treeList);
          //  当item是最高一级，父key为undefined，将不放入到数组中
          //  如果母亲已存在于数组中，也不放入到数组中
          if (key && !vm.backupsExpandedKeys.some((item) => item === key));
            vm.backupsExpandedKeys.push(key);
        });
        const length = this.backupsExpandedKeys.length;
        for (let i = 0; i < length; i++) {
          vm.getAllParentKey(vm.backupsExpandedKeys[i], vm.treeList);
        }
        vm.expandedKeys = vm.backupsExpandedKeys.slice();
      }
    },
    getkeyList(value, tree, keyList) {
      //  遍历所有同一级的树
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        //  如果该节点存在value值则push
        if (node.name.indexOf(value) > -1) {
          keyList.push(node.key);
        }
        //  如果拥有孩子继续遍历
        if (node.childMenu) {
          this.getkeyList(value, node.childMenu, keyList);
        }
      }
      //  因为是引用类型，所有每次递归操作的都是同一个数组
      return keyList;
    },
    //  该递归主要用于获取key的父亲节点的key值
    getParentKey(key, tree) {
      let parentKey, temp;
      //  遍历同级节点
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.childMenu) {
          //  如果该节点的孩子中存在该key值，则该节点就是我们要找的父亲节点
          //  如果不存在，继续遍历其子节点
          if (node.childMenu.some((item) => item.key === key)) {
            parentKey = node.key;
          } else if ((temp = this.getParentKey(key, node.childMenu))) {
            //  parentKey = this.getParentKey(key,node.children)
            //  改进，避免二次遍历
            parentKey = temp;
          }
        }
      }
      return parentKey;
    },
    //  获取该节点的所有祖先节点
    getAllParentKey(key, tree) {
      var parentKey;
      if (key) {
        // 获得父亲节点
        parentKey = this.getParentKey(key, tree);
        if (parentKey) {
          // 如果父亲节点存在，判断是否已经存在于展开列表里，不存在就进行push
          if (!this.backupsExpandedKeys.some((item) => item === parentKey)) {
            this.backupsExpandedKeys.push(parentKey);
          }
          // 继续向上查找祖先节点
          this.getAllParentKey(parentKey, tree);
        }
      }
    },
    onExpand(expandedKeys) {
      // 用户点击展开时，取消自动展开效果
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      console.log("onCheck", checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
    },
    async getProductType() {
      const { data: res } = await this.$http.get("product/type");
      if (res.code !== 200) {
        return this.$message.error("货品分类获取失败");
      }
      console.log(res.data);
      this.treeList = res.data;
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
::-webkit-scrollbar {
  display: none;
}
</style>
