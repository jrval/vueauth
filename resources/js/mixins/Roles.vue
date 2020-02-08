

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
                console.log(this.currentRole);
                console.log(currentUser);
                return JSON.stringify(this.currentRole).includes(currentUser);
            },
        },
        computed: {
            currentRole() {
                return this.$store.getters.authRoles
            }
        },

    };
</script>

