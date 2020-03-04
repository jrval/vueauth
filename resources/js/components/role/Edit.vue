<template>
    <div class="card shadow mb-4" v-if="role">
        <div class="card-body">
            <div class="alert alert-danger" role="alert" v-if="errors">
                <p v-for="err in errors">
                    {{err[0] || err}}
                </p>
            </div>
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                <form v-on:submit.prevent="updateRole">
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
        name: "Edit",
        components: {ButtonsElement, RoleForm},
        data() {
            return {
                role: null,
                permissions: [],
                errors: null
            }
        },
        created() {
            this.getRole();
            this.getPermissions();
        },
        methods: {
            getRole() {
                axios.get(`/api/roles/${this.$route.params.id}/edit`)
                    .then((response) => {

                        this.role = response.data.data;
                        let permission = [];
                        this.role.permissions.forEach(obj => {
                            permission.push(obj.name);
                        });
                        this.role.permissions = permission;
                    });
            },
            updateRole() {
                axios.put(`/api/roles/${this.$route.params.id}`, this.role)
                    .then((response) => {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Role updated',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.$router.push({name: 'role-table'});
                    }).catch((error) => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
            },
            getPermissions() {
                axios.get('/api/permissions?showAll=true')
                    .then((response) => {
                        this.permissions = response.data;
                    })
            },
        }
    }
</script>

<style scoped>

</style>
