<template>
  <div class="menu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{  path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="card">
      <!-- 导航菜单 -->
      <div>
        <!-- 底层菜单 -->
        <template>
          <div style="float: left;width: 400px;margin-left:15%;">
            <a-input-search
              v-model="searchStr"
              placeholder="输入搜选项"
              style="width:300px;"
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
      </div>
      <div style="float:left;margin-bottom: 200px;">
        <div>
          <template>
        <div style="margin: 20px;position:fixed;"></div>
        <el-form label-position="right" label-width="120px" :model="formLabelAlign">
          <el-form-item label="编号">
            <el-input v-model="formLabelAlign.name" ></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="物料类别">
            <el-select v-model="value6" placeholder="请选择">
            <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left;color: #8492a6; font-size: 13px;">{{ item.label }}</span>
              <span style="float: right">{{ item.value }}</span>
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="物料期限">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="采购周期">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="采购入库科目">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
        </el-form>
        </template>
        </div>
      </div>
      <!-- 结束 -->
    </el-card>
  </div>
</template>

<script>
const treeData = [];
export default {
  data() {
    return {
      treeList: [],
      replaceFields: { title: "name", children: "childMenu" },
      expandedKeys: [],
      backupsExpandedKeys: [],
      autoExpandParent: false,
      checkedKeys: [],
      selectedKeys: [],
      searchValue: "",
      treeData,
      searchStr: "",
      formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
      cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
        value6: '',
      dateline: ['前期物料', '中期物料', '尾期物料'],
      options3: [{
          label: '热门城市',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        }],
        value7: ''
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
        const candidateKeysList = vm.getkeyList(
          vm.searchValue,
          vm.treeList,
          []
        );
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
      // this.selectedKeys = selectedKeys;
      console.log(selectedKeys)
      if (info.selectedNodes[0].data.key === '新增节点') {
        this.formLabelAlign.name = ''
        this.formLabelAlign.type = ''
        this.formLabelAlign.region = ''
      } else {
        console.log(info.selectedNodes[0].data)
        this.formLabelAlign.name = '1'
        this.formLabelAlign.type = '上衣'
        this.formLabelAlign.region = info.selectedNodes[0].data.key
      }
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
.ant-tree {
  margin-bottom: 200px;
}
</style>
