<script>
import {mapActions} from "vuex";

const UserTable = () => import('./UserTable');
const MainNav = () => import('../MainNav');
const PageTitle = () => import('../PageTitle');
const Search = () => import('../Search');
const UserCsvUpload = () => import('./UserCsvUpload');

export default {
    name: "UserIndex",
    components: {
        UserCsvUpload,
        UserTable,
        MainNav,
        PageTitle,
        Search
    },
    data() {
        return {
            search: null,
            userUploadVisible: false
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

                    <el-col :span="2" :offset="18" class="flex justify-end">
                        <el-button type="primary" size="mini" @click="userUploadVisible = true">Upload users</el-button>
                    </el-col>
                </el-row>
            </el-card>

            <user-table/>
        </el-main>

        <user-csv-upload :user-upload-visible="userUploadVisible" @close-user-upload="userUploadVisible = false"/>
    </el-container>
</template>
