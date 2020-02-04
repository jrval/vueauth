<template>
    <div>
        <h1 class="h3 mb-2 text-gray-800">{{title || 'Permissions Data'}}</h1>
            <PassportClient></PassportClient>
            <PassportAuthorizedClients></PassportAuthorizedClients>
            <PassportPersonalAccessTokens></PassportPersonalAccessTokens>

    </div>
</template>



<script>
    import PassportClient from "./Clients.vue";
    import PassportAuthorizedClients from "./AuthorizedClients.vue";
    import PassportPersonalAccessTokens from "./PersonalAccessTokens.vue";
    export default {
        name: "Passport",
        components:{
            PassportClient,
            PassportAuthorizedClients,
            PassportPersonalAccessTokens
        },
        computed: {
            title() {
                return this.$route.meta.title.toUpperCase();
            }
        },
    }
</script>

<style scoped>

</style>
