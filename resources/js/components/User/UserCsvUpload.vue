<script>
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

        }
    },
    computed: {

    },
    methods: {

    }
}
</script>

<template>
    <el-dialog
        title="Upload users"
        :visible.sync="userUploadVisible"
        width="30%"
        append-to-body
        @close="$emit('close-user-upload')">

        <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            <div class="el-upload__tip" slot="tip">csv files with a size less than</div>
        </el-upload>

    </el-dialog>
</template>
