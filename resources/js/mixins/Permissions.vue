<script>

    export default {
        data() {
            return {
                user_permissions: [],
                allow: false
            }
        },
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
        // watch: {
        //
        // },
    };
</script>



