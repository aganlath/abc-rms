<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "MainHeader",
    computed: {
        ...mapState({
            authUser: state => state.auth.user,
        }),
        isLoggedIn() {
            return !_.isEmpty(this.authUser);
        }
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout',
        })
    }
}
</script>

<template>
    <el-row :gutter="20">
        <el-col class="text-abc-dark font-semibold text-md" :span="6">
            ABC - Relationship Management System
        </el-col>
        <el-col :span="6" :offset="12" class="text-sm">
            <el-row v-if="isLoggedIn">
                <el-col :span="4" :offset="16">{{ authUser.user.first_name }}</el-col>
                <el-col :span="4"><a class="cursor-pointer" @click="logout">Logout</a> </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<style>
.el-header {
    padding-top: 18px !important;
}
</style>
