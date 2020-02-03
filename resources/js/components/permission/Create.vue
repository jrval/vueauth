<template>
    <div class="card shadow mb-4">
        <div class="card-body">
            <div class="alert alert-danger" role="alert" v-if="errors">
                <p v-for="err in errors">
                    {{err[0] || err}}
                </p>
            </div>



            <form v-on:submit.prevent="addPermission">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" placeholder="Permission name" v-model="permission.name">
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
