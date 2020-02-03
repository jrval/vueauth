<template>
    <div class="card shadow mb-4">
        <div class="card-body">
            <div class="alert alert-danger" role="alert" v-if="errors">
                <p v-for="err in errors">
                    {{err[0] || err}}
                </p>
            </div>
            <form v-on:submit.prevent="addRole">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" placeholder="Role name" v-model="role.name">
                </div>
                <div class="form-group">
                    <label>Select Permission</label>
                    <select class="form-control" multiple="" size="10%" v-model="role.permissions" >
                        <option :value="permission.name" v-for="permission in permissions.data" :key="permission.id">{{permission.name}}</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-danger" @click="$router.go(-1)">Back</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Create",
        data(){
            return {
                role:{
                    'name':'',
                    'permissions':[],
                },
                permissions:[],
                errors:null
            }
        },
        created() {
            this.getPermissions();
        },
        methods:{
            addRole(){
                console.log(this.role);
                axios.post('/api/roles', this.role)
                    .then((response) => {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'New Role created',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.$router.push({name:'role-table'});
                    }).catch((error) => {
                    this.role.name  = '';
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                        console.log(this.errors)
                    }
                });
            },
            getPermissions(){

                axios.get('/api/permissions?sortby=name&sortdir=asc')
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
