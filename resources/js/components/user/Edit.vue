<template>
    <div class="card shadow mb-4" v-if="user">
        <div class="card-body">
            <div class="alert alert-danger" role="alert" v-if="errors">
                <p v-for="err in errors">
                    {{err[0] || err}}
                </p>
            </div>
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(updateUser)">
                <UserForm :user="user" :roles="roles" :edit=true></UserForm>
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
        name: "Edit",
        components: {ButtonsElement, UserForm},
        data(){
            return {
                user:null,
                roles:[],
                errors:null
            }
        },
        created() {
            this.getUser();
            this.getRoles();
        },
        methods:{
            getUser(){
                axios.get(`/api/users/${this.$route.params.id}/edit`)
                    .then((response) => {
                        console.log(response);
                        this.user = response.data.data;
                        let role = [];
                        this.user.roles.forEach(obj => {
                            role.push(obj.name);
                        });
                        this.user.roles = role;
                    });
            },
            updateUser(){
                axios.patch(`/api/users/${this.$route.params.id}`, this.user)
                    .then((response) => {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'User updated',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        this.$router.push({name:'users-table'});
                    }).catch((error) => {
                    this.user.password  = '';
                    this.user.password_confirmation='';
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
            },
            getRoles(){

                axios.get('/api/roles?sortby=name&sortdir=asc')
                    .then((response) => {
                        this.roles = response.data;
                    }).catch((error) => {

                });
            },
        }
    }
</script>

<style scoped>

</style>
