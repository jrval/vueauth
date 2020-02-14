<template>
    <div class="card shadow mb-4">
        <div class="card-body">
            <div class="alert alert-danger" role="alert" v-if="errors">
                <p v-for="err in errors">
                    {{err[0] || err}}
                </p>
            </div>
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                <form v-on:submit.prevent="handleSubmit(addRole)">
                    <RoleForm :role="role" :permissions="permissions"></RoleForm>
                    <ButtonsElement :submit=true :back=true></ButtonsElement>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
    import RoleForm from "./_Form";
    import ButtonsElement from "../elements/Buttons";
    export default {
        name: "Create",
        components: {
            ButtonsElement,
            RoleForm,
        },
        data() {
            return {
                role: {
                    'name': '',
                    'permissions': [],
                },
                permissions: [],
                errors: null
            }
        },
        created() {
            this.getPermissions();
        },
        methods: {
            addRole() {
                axios.post('/api/roles', this.role)
                    .then((response) => {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'New Role created',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.$router.push({name: 'role-table'});
                    }).catch((error) => {
                    this.role.name = '';
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
            },
            getPermissions() {
                axios.get('/api/permissions?showAll=true')
                    .then((response) => {
                        this.permissions = response.data;
                    }).catch((error) => {

                });
            }
        }
    }
</script>

<style scoped>

</style>
