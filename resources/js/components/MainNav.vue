<script>
export default {
    name: "MainNav",
}
</script>

<template>
    <el-aside class="bg-abc-dark text-white h-screen p-6 sidenav">
        <router-link :to="{ name : 'customers' }"> <i class="el-icon-service"></i> Customers </router-link>
        <router-link :to="{ name: 'users' }"> <i class="el-icon-user-solid"></i> Users </router-link>
    </el-aside>
</template>

<style scoped>
.el-aside {
    width: 200px !important;
}

.sidenav a {
    height: 30px;
    margin-top: 10px;
    text-decoration: none;
    text-align: left;
    color: #9197C5;
    display: block;
}

.sidenav a:hover {
    color: #fff;
}
</style>
