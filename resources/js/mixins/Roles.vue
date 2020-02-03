

<script>
    export default {
        data() {
            return {
                user_roles: [],
                allow:false
            }
        },
        methods: {
            $is(currentUser) {
                if (this.user_roles.length) {
                    return this.user_roles.includes(currentUser);
                }
                this.$store.dispatch('getUserAuth');
                this.user_roles = this.$store.getters.authRoles
                return this.user_roles.includes(currentUser);
            },
        },
    };
</script>

