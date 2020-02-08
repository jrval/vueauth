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
                console.log(this.currentPermission);
                console.log(currentUser);
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



