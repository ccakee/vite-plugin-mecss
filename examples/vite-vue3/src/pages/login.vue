<template>
    <h2 absolute r="20" b="20"> 这里是登录页面  </h2>
    <br />
    <router-link to="/">点击跳转至   首页</router-link>
    <br /><br />
    <router-link to="/vueUse">点击跳转至   vueUse页面</router-link>
</template>
<script lang="ts">  
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'LoginPage'
    });
</script>
