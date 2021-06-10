<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "UserTable",
    computed: {
        ...mapState({
            users: state => state.users.users,
            nextPage: state => state.users.nextPage,
            lastPage: state => state.users.lastPage,
            searchKey: state => state.users.searchKey,
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
        async loadUsers($state) {
            await this.fetchUsers()
                .then(() => {
                    if (this.nextPage > this.lastPage) {
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
            empty-text="No users"
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
                @infinite="loadUsers"
                :identifier="searchKey"
                spinner="circles"
                force-use-infinite-wrapper=".el-table__body-wrapper">
                <div slot="no-more"></div>
                <div slot="no-results"></div>
            </infinite-loading>
        </el-table>
    </el-card>
</template>
