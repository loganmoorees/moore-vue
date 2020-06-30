<template>
    <div>
        <el-button type="info" @click="loginOut">
            退出
        </el-button>
    </div>
</template>

<script>
export default {
    methods: {
        loginOut () {
            window.sessionStorage.removeItem("token")
            console.log("1")
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less" scoped>
</style>
