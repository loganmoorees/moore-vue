<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRule" label-width="0px" class="form_login">
        <!-- 用户名 -->
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" prefix-icon="iconfont icon-yonghu"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-mima" type="password"></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item class="button_login">
          <el-button type="primary" @click="login">登录</el-button>

          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        userName: "moore",
        password: "admin"
      },

      loginFormRule: {
        userName: [
          { required: true, message: " 请输入用户名", trigger: "blur" },
          { min: 4, max: 10, message: "用户名长度错误", trigger: "blur" }
        ],
        password: [
          { required: true, message: " 请输入密码", trigger: "blur" },
          { min: 5, max: 10, message: "密码长度错误", trigger: "blur" }
        ]
      }
    }
  },

  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },

    /**
     * 登录操作
     */
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        // 发送Post请求
        const { data: res } = await this.$http.post("login", this.loginForm)
        if (res.code === 200) {
          // 弹出成功提示
          this.$message.success("登录成功")
          // 设置token
          window.sessionStorage.setItem('token', res.data)
          // 跳转页面
          this.$router.push('/home')
        } else {
          this.$message.error("登录失败")
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    widows: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.button_login {
  display: flex;
  justify-content: flex-end;
}

.form_login {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
