<template>
    <div class="card shadow mb-4">
        <div class="card-body">
            <div class="alert alert-danger" role="alert" v-if="errors">
                <p v-for="err in errors">
                    {{err[0] || err}}
                </p>
            </div>
            <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <form v-on:submit.prevent="handleSubmit(addPermission)">
                <PermissionForm :permission="permission" ></PermissionForm>
                <ButtonsElement :submit=true :back=true></ButtonsElement>
            </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
    import PermissionForm from './_Form';
    import ButtonsElement from "../elements/Buttons";
    export default {
        components: {
            ButtonsElement,
            PermissionForm,
        },
        name: "Create",
        data(){
            return {
                permission:{
                    'name':'',
                },
                errors:null
            }
        },
        methods:{
            addPermission(){
                axios.post('/api/permissions', this.permission)
                    .then((response) => {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'New Permission created',
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
            }
        }
    }
</script>

<style scoped>

</style>
