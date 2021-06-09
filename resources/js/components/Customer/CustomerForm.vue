<script>
export default {
    name: "CustomerForm",
    props: {
        customerFormVisible: {
            required: true,
            type: Boolean
        },
        customer: {
            type: Object,
        }
    },
    data() {
        return {
            customerForm: {
                first_name: '',
                last_name: '',
                email: '',
                phone_numbers: ''
            },
            rules: {
                first_name: [
                    { required: true, message: 'Please input first name', trigger: 'blur' },
                ],
                last_name: [
                    { required: true, message: 'Please input last name', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: 'Please input email address', trigger: 'blur' },
                    { type: 'email', message: 'Please input valid email address', trigger: ['blur'] }
                ],
            }
        }
    },
    computed: {
        title() {
            return this.customer ? 'Edit Customer' : 'Add Customer'
        },
        buttonText() {
            return this.customer ? 'Update' : 'Save'
        }
    },
    methods: {
        assignDefaultValues() {
            if (_.isEmpty(this.customer)) {
                return;
            }

            this.customerForm = this.customer;
        },
        cancelSave(formName) {
            this.$refs[formName].resetFields();
            this.$emit('close-customer-form');
        },
        saveCustomer(formName) {
            const CUSTOMER_FORM  = this.customerForm;
            const CUSTOMER = {
                id: CUSTOMER_FORM.id ? CUSTOMER_FORM.id : null,
                first_name : CUSTOMER_FORM.first_name,
                last_name : CUSTOMER_FORM.last_name,
                email : CUSTOMER_FORM.email,
                phone_numbers: CUSTOMER_FORM.phone_numbers ? CUSTOMER_FORM.phone_numbers.split(',') : ''
            }

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('save', CUSTOMER);

                    this.$refs[formName].resetFields();
                }
            });
        }
    }
}
</script>

<template>
    <el-dialog
        :title="title"
        :visible.sync="customerFormVisible"
        width="30%"
        append-to-body
        @open="assignDefaultValues"
        @close="$emit('close-customer-form')">

        <el-form class="pt-5" label-position="left" label-width="150px" size="mini" ref="customerForm" :model="customerForm" :rules="rules">
            <el-form-item label="First name" prop="first_name">
                <el-input required type="text" v-model="customerForm.first_name"></el-input>
            </el-form-item>
            <el-form-item label="Last name" prop="last_name">
                <el-input required type="text" v-model="customerForm.last_name"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input required type="text" v-model="customerForm.email"></el-input>
            </el-form-item>
            <el-form-item label="Phone Numbers" prop="phone_numbers">
                <el-input required v-model="customerForm.phone_numbers"></el-input>
            </el-form-item>
            <el-form-item class="flex justify-end">
                <el-button @click="cancelSave('customerForm')">Cancel</el-button>
                <el-button type="primary" @click="saveCustomer('customerForm')"> {{ buttonText }} </el-button>
            </el-form-item>
        </el-form>

    </el-dialog>
</template>
