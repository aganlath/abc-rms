<script>
import {mapActions} from "vuex";

const CustomerTable = () => import('./CustomerTable');
const CustomerForm = () => import('./CustomerForm');
const MainNav = () => import('../MainNav');
const PageTitle = () => import('../PageTitle');
const Search = () => import('../Search');

export default {
    name: "CustomerIndex",
    components: {
        CustomerTable,
        CustomerForm,
        MainNav,
        PageTitle,
        Search
    },
    data() {
        return {
            search: null,
            customerFormVisible: false
        }
    },
    methods: {
        ...mapActions({
            addCustomer: 'customers/addCustomer',
            searchCustomers: 'customers/searchCustomers',
        }),
        async saveCustomer(customer) {
            await this.addCustomer(customer)
                .then(() => {
                    this.customerFormVisible = false;

                    this.$message({
                        type: 'success',
                        message: 'Customer saved successfully'
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'error',
                        message: 'Customer was not saved'
                    });
                })
        }
    }
}
</script>

<template>
    <el-container>
        <main-nav/>

        <el-main>
            <page-title />

            <el-card class="box-card mt-10">
                <el-row>
                    <search @search="searchCustomers" />

                    <el-col :span="2" :offset="18" class="flex justify-end">
                        <el-button type="primary" size="mini" @click="customerFormVisible = true">Add Customer</el-button>
                    </el-col>
                </el-row>
            </el-card>

            <customer-table />
        </el-main>

        <customer-form
            :customer-form-visible="customerFormVisible"
            @close-customer-form="customerFormVisible = false"
            @save="saveCustomer"/>
    </el-container>
</template>
