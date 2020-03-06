<template>
  <div id="id">
    <h1>主页</h1>
    <router-link to="/login">登录</router-link>
    <router-link to="/">首页</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
}
</script>

<style lang="less" scoped>
h1 {
  color: green;
}
</style>