<script>
import {mapActions, mapState} from "vuex";

const MainNav = () => import('./MainNav');
const PageTitle = () => import('./PageTitle');

export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                email: '',
                password: '',
            },
            rules: {
                email: [
                    { required: true, message: 'Please input email address', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'Please input password', trigger: 'blur' },
                ]
            }
        }
    },
    components: {
        MainNav,
        PageTitle
    },
    computed: {
        ...mapState({
            validationError: state => state.auth.validationError
        }),
    },
    methods: {
        ...mapActions({
            login: 'auth/login'
        }),
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login(this.loginForm)
                        .then(() => {
                           this.$router.push({ name: 'customers' });
                        })
                        .catch(() => {
                            //skip
                        });
                }
            });
        }
    }
}
</script>

<template>
    <el-container>
        <el-main>
            <el-row class="h-1/5 mt-60">
                <el-col :span="6" :offset="9">
                    <el-card class="h-3/4 p-0" :body-style="{padding: 0}">
                        <div class="w-full bg-abc-dark block h-16"></div>
                        <div class="p-5">
                            <el-alert v-show="validationError" :title="validationError" type="error" class="pb-10"></el-alert>

                            <el-form class="pt-5" label-position="left" label-width="100px" size="mini" ref="loginForm" :model="loginForm" :rules="rules">
                                <el-form-item label="Email" prop="email">
                                    <el-input required type="text" v-model="loginForm.email"></el-input>
                                </el-form-item>
                                <el-form-item label="Password" prop="password">
                                    <el-input required type="password" v-model="loginForm.password"></el-input>
                                </el-form-item>
                                <el-form-item class="flex justify-end">
                                    <el-button type="primary" @click="submitForm('loginForm')">Login</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>
