<script>

    export default {
        methods: {
            $can(currentUser) {

                return JSON.stringify(this.currentPermission).includes(currentUser);
            },
        },
        computed: {
            currentPermission() {
                return this.$store.getters.authPermissions
            }
        },
    };
</script>



