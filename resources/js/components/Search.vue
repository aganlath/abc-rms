<script>
export default {
    name: "Search",
    data() {
        return {
            search: null
        }
    }
}
</script>

<template>
    <el-col :span="4">
        <el-input v-model="search" size="mini" @input="$emit('search', search)">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
    </el-col>
</template>
