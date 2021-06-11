<script>
import {mapActions} from "vuex";
import {uploadCsv} from "../../store/users/actions";

export default {
    name: "UserCsvUpload",
    props: {
        userUploadVisible: {
            required: true,
            type: Boolean
        }
    },
    data() {
        return {
            fileList: []
        }
    },
    methods: {
        ...mapActions({
            uploadCsv: 'users/uploadCsv',
        }),
        async uploadFile() {
            await this.uploadCsv(this.$refs.csv_file.files[0])
                .then(() => this.$showSuccessMessage('user.upload.success'))
                .catch(error => this.$showError(error.data.message));

            this.$emit('close-user-upload');
        }
    }
}
</script>

<template>
    <el-dialog
        title="Upload users"
        :visible.sync="userUploadVisible"
        width="21%"
        append-to-body
        @close="$emit('close-user-upload')">
        <input type="file" ref="csv_file" name="file" @change="uploadFile"/>
    </el-dialog>
</template>
