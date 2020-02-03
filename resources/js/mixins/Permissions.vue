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
                axios.get('/api/auth-user')
                    .then((response) => {
                        this.user_permissions = JSON.stringify(response.data.permissions);
                    });
                 return this.user_permissions.includes(currentUser);
            },
        },
    };
</script>



