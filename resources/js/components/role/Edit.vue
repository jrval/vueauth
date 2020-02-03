<template>
    <div class="card shadow mb-4" v-if="role">
        <div class="card-body">
            <div class="alert alert-danger" role="alert" v-if="errors">
                <p v-for="err in errors">
                    {{err[0] || err}}
                </p>
            </div>

            <form v-on:submit.prevent="updateRole">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control"  placeholder="Enter name" v-model="role.name">

                </div>

                <div class="form-group">
                    <label>Select Permission</label>
                    <select class="form-control" multiple="" size="10%" v-model="role.permissions"  >
                        <option :value="permission.name" v-for="permission in permissions.data" :key="permission.id"  :selected=" role.permissions ===permission.name">{{permission.name}}</option>
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
        name: "Edit",
        data(){
            return {
                role:null,
                permissions:[],
                errors:null
            }
        },
        created() {
            this.getRole();
            this.getPermissions();
        },
        methods:{
            getRole(){
                axios.get(`/api/roles/${this.$route.params.id}/edit`)
                    .then((response) => {
                        console.log(response);
                        this.role = response.data.data;
                        let permission = [];
                        this.role.permissions.forEach(obj => {
                            permission.push(obj.name);
                        });
                        this.role.permissions = permission;
                    });
            },
            updateRole(){
                axios.put(`/api/roles/${this.$route.params.id}`, this.role)
                    .then((response) => {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Role updated',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.$router.push({name:'role-table'});
                    }).catch((error) => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
            },
            getPermissions(){
                axios.get('/api/permissions?sortby=name&sortdir=asc')
                    .then((response) => {
                        this.permissions = response.data;
                    })
            },
        }
    }
</script>

<style scoped>

</style>
