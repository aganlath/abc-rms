<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "UserTable",
    computed: {
        ...mapState({
            users: state => state.users.users,
            currentPage: state => state.users.page,
            lastPage: state => state.users.lastPage,
        })
    },
    methods: {
        ...mapActions({
            fetchUsers: 'users/fetchUsers',
        }),
        formatValue(value) {
            return (_.map(value, 'phone_number')).join(', ');
        },
        formatNumbers(row, column, cellValue) {
            return this.formatValue(cellValue);
        },
        async loadCustomers($state) {
            await this.fetchUsers()
                .then(() => {
                    if (this.currentPage > this.lastPage) {
                        $state.complete();
                    } else {
                        $state.loaded();
                    }
                })
                .catch(() => $state.complete());
        }
    }
}
</script>

<template>
    <el-card class="box-card mt-10">
        <el-table
            empty-text="No customers"
            size="mini"
            :stripe="true"
            :data="users"
            height="500">
            <el-table-column
                fixed
                prop="first_name"
                label="First name">
            </el-table-column>
            <el-table-column
                prop="last_name"
                label="Last name">
            </el-table-column>
            <el-table-column
                prop="email"
                label="Email">
            </el-table-column>
            <el-table-column
                prop="phone_numbers"
                :formatter="formatNumbers"
                label="Phone numbers">
            </el-table-column>

            <infinite-loading
                slot="append"
                @infinite="loadCustomers"
                force-use-infinite-wrapper=".el-table__body-wrapper">
            </infinite-loading>
        </el-table>
    </el-card>
</template>
