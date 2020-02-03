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
                if (this.user_permissions.length) {
                    return this.user_permissions.includes(currentUser);
                }
                this.$store.dispatch('getUserAuth');
                this.user_permissions = this.$store.getters.authPermissions
                return this.user_permissions.includes(currentUser);
            },
        },
    };
</script>



