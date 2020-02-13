<template>
    <div class="card shadow mb-4" v-if="user">
        <div class="card-body">
            <div class="form-group">
                <label>Name</label>
                <p><strong>{{user.name}}</strong></p>
            </div>
            <div class="form-group">
                <label>Email address</label>
                <p><strong>{{user.email}}</strong></p>
            </div>
            <div class="form-group">
                <label>Role</label>
                <span class="badge badge-primary" v-for="role in user.roles">
                               {{role.name}}
                            </span>
            </div>
            <ButtonsElement :back=true></ButtonsElement>
        </div>
    </div>
</template>

<script>
    import ButtonsElement from "../elements/Buttons";

    export default {
        name: "Show",
        components: {ButtonsElement},
        created() {
            this.getUser();
        },
        data() {
            return {
                user: null
            };
        },
        methods: {
            getUser() {
                axios.get(`/api/users/${this.$route.params.id}`)
                    .then((response) => {

                        this.user = response.data.data
                    });
            }
        }

    }
</script>

<style scoped>

</style>
