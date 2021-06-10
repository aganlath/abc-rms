<script>
import {mapActions, mapState} from "vuex";
import {createCommaSeparatedList} from "../../config/helpers";

const CustomerForm = () => import('./CustomerForm');

export default {
    name: "CustomerTable",
    components: {
        CustomerForm
    },
    data() {
        return {
            customer: {},
            customerFormVisible: false,
        }
    },
    computed: {
        ...mapState({
            customers: state => state.customers.customers,
            nextPage: state => state.customers.nextPage,
            lastPage: state => state.customers.lastPage,
            searchKey: state => state.customers.searchKey,
        }),
        isSearchActive() {
            return !!this.searchKey;
        }
    },
    methods: {
        ...mapActions({
            deleteCustomer: 'customers/deleteCustomer',
            editCustomer: 'customers/editCustomer',
            fetchCustomers: 'customers/fetchCustomers',
        }),
        formatNumbers(row, column, cellValue) {
            return createCommaSeparatedList(cellValue, 'phone_number');
        },
        async loadCustomers($state) {
            await this.fetchCustomers()
                .then(() => {
                    if (this.nextPage > this.lastPage) {
                        $state.complete();
                    } else {
                        $state.loaded();
                    }
                })
                .catch(() => $state.complete());
        },
        edit(customer) {
            this.customer = _.cloneDeep(customer);
            this.customer.phone_numbers = customer.phone_numbers
                ? createCommaSeparatedList(customer.phone_numbers, 'phone_number')
                : '';

            this.customerFormVisible = true
        },
        async removeCustomer(customerId) {
            this.$confirm('Are you sure you want to delete the customer', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.deleteCustomer(customerId)
                    .then(() => this.$showSuccessMessage('customer.delete.success'))
                    .catch(() => this.$showErrorMessage('customer.delete.error'))
            }).catch(() => {
                //skip
            });
        },
        async updateCustomer(customer) {
            await this.editCustomer(customer)
                .then(() => {
                    this.customerFormVisible = false;
                    this.$showSuccessMessage('customer.update.success');
                })
                .catch(() => this.$showErrorMessage('customer.update.error'));
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
            :data="customers"
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
            <el-table-column
                fixed="right"
                label=""
                width="120">
                <template slot-scope="scope">
                    <el-button
                        class="border-0"
                        type="text"
                        size="medium"
                        icon="el-icon-edit"
                        @click.native.prevent="edit(scope.row)">
                    </el-button>
                    <el-button
                        class="border-0"
                        type="text"
                        size="medium"
                        icon="el-icon-delete"
                        @click.native.prevent="removeCustomer(scope.row.id)">
                    </el-button>
                </template>
            </el-table-column>

            <infinite-loading
                slot="append"
                @infinite="loadCustomers"
                :identifier="isSearchActive"
                spinner="circles"
                force-use-infinite-wrapper=".el-table__body-wrapper">
                <div slot="no-more"></div>
                <div slot="no-results"></div>
            </infinite-loading>
        </el-table>

        <customer-form
            :customer="customer"
            :customer-form-visible="customerFormVisible"
            @close-customer-form="customerFormVisible = false"
            @save="updateCustomer"/>
    </el-card>
</template>
