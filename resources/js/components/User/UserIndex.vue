<script>
import {mapActions} from "vuex";

const UserTable = () => import('./UserTable');
const MainNav = () => import('../MainNav');
const PageTitle = () => import('../PageTitle');
const Search = () => import('../Search');

export default {
    name: "UserIndex",
    components: {
        UserTable,
        MainNav,
        PageTitle,
        Search
    },
    data() {
        return {
            search: null,
        }
    },
    methods: {
        ...mapActions({
            searchUsers: 'users/searchUsers',
        }),
    }
}
</script>

<template>
    <el-container>
        <main-nav/>

        <el-main>
            <page-title/>

            <el-card class="box-card mt-10">
                <el-row>
                    <search @search="searchUsers" />
                </el-row>
            </el-card>

            <user-table/>
        </el-main>
    </el-container>
</template>
