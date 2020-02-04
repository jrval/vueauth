<template>
    <div>
        <h1 class="h3 mb-2 text-gray-800">{{title || 'Roles Data'}}</h1>
        <vue-page-transition name="fade-in-right">
            <router-view></router-view>
        </vue-page-transition>


    </div>
</template>

<script>
    export default {
        name: "Role",
        computed: {
            title() {
                return this.$route.meta.title.toUpperCase();
            }
        },
    }
</script>

<style scoped>

</style>
