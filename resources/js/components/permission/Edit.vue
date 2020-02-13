<template>
    <div class="card shadow mb-4" v-if="permission">
        <div class="card-body">
            <div class="alert alert-danger" role="alert" v-if="errors">
                <p v-for="err in errors">
                    {{err[0] || err}}
                </p>
            </div>
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <form v-on:submit.prevent="handleSubmit(updatePermission)">
                <PermissionForm :permission="permission" ></PermissionForm>
                <ButtonsElement :submit=true :back=true></ButtonsElement>
            </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
    import PermissionForm from "./_Form";
    import ButtonsElement from "../elements/Buttons";
    export default {
        name: "Edit",
        components: {ButtonsElement, PermissionForm},
        data(){
            return {
                permission:null,
                errors:null
            }
        },
        created() {
            this.getPermission();
        },
        methods:{
            getPermission(){
                axios.get(`/api/permissions/${this.$route.params.id}/edit`)
                    .then((response) => {
                        console.log(response);
                        this.permission = response.data.data;
                    });
            },
            updatePermission(){
                axios.patch(`/api/permissions/${this.$route.params.id}`, this.permission)
                    .then((response) => {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Permission updated',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.$router.push({name:'permission-table'});
                    }).catch((error) => {
                    this.permission.name  = '';
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
