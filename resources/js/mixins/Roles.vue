

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
                axios.get('/api/auth-user')
                    .then((response) => {
                        this.user_roles = JSON.stringify(response.data.roles);
                    });

                return this.user_roles.includes(currentUser);
            },
        },
    };
</script>

