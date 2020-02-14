<template>
    <div class="card shadow mb-4">
        <div class="card-body">
            <div class="alert alert-danger" role="alert" v-if="errors">
                <p v-for="err in errors">
                    {{err[0] || err}}
                </p>
            </div>
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(addUser)">
                    <UserForm :user="user" :roles="roles"></UserForm>
                    <ButtonsElement :submit=true :back=true></ButtonsElement>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
    import UserForm from "./_Form";
    import ButtonsElement from "../elements/Buttons";
    export default {
        name: "Create.vue",
        components: {ButtonsElement, UserForm},
        data() {
            return {
                user: {
                    'name': '',
                    'email': '',
                    'roles': [],
                    'password': '',
                    'password_confirmation': ''
                },
                roles: [],
                errors: null
            }
        },
        created() {
            this.getRoles();
        },
        methods: {

            addUser() {
                axios.post('/api/users', this.user)
                    .then((response) => {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'New user created',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.$router.push({name: 'users-table'});
                    }).catch((error) => {
                    this.user.password = '';
                    this.user.password_confirmation = '';
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;

                    }
                });
            },
            getRoles() {
                axios.get('/api/roles?showAll=true')
                    .then((response) => {
                        this.roles = response.data;
                    }).catch((error) => {
                });
            }
        }
    }
</script>

<style scoped>

</style>
