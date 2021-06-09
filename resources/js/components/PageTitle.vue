<script>
export default {
    name: "PageTitle",
    computed: {
        pageTitle() {
            return (this.$route.name).toUpperCase();
        }
    }
}
</script>

<template>
    <div class="w-full text-xl text-abc-purple1 border-b-2 py-3">
        {{ pageTitle }}
    </div>
</template>
