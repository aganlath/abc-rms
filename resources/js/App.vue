<script>
const MainHeader = () => import('./components/MainHeader');

export default {
    name: "App",
    components: {
        MainHeader
    }
}
</script>

<template>
    <el-container class="bg-abc-body h-screen w-screen font-sans">
        <el-header class="bg-white w-full h-100 p-4 align-middle shadow-sm">
            <main-header></main-header>
        </el-header>

        <router-view></router-view>
    </el-container>
</template>
