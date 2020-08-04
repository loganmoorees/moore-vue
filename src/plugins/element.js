import Vue from 'vue'
import {
    Button, Form, FormItem, Input, Message,
    Container, Header, Aside, Main, Row, Col, Menu, Submenu,
    MenuItemGroup, MenuItem, Breadcrumb, BreadcrumbItem,
    Card, DropdownMenu, DropdownItem, Dropdown, Badge, Select,
    Option, OptionGroup, Cascader
} from 'element-ui'
// 引入Ant Design Vue组件
import Antd from 'ant-design-vue'
// 引入Ant Design Vue样式
import 'ant-design-vue/dist/antd.css'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Badge)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Cascader)
Vue.prototype.$message = Message
// ant-design导入区域
Vue.use(Antd)
