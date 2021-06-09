<script>
const MainNav = () => import('./MainNav');
const PageTitle = () => import('./PageTitle');

export default {
    name: "UserIndex",
    components: {
        MainNav,
        PageTitle
    }
}
</script>

<template>
    <el-container>
        <main-nav></main-nav>

        <el-main>
            <page-title></page-title>
        </el-main>
    </el-container>
</template>
