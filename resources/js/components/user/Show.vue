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
                <button type="button" class="btn btn-danger" @click="$router.go(-1)">Back</button>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Show",
        created() {
            this.getUser();
        },
        data() {
            return {
                user: null
            };
        },
        methods:{
            getUser(){
                axios.get(`/api/users/${this.$route.params.id}`)
                    .then((response) => {
                        console.log(response);
                       this.user = response.data.data
                    });
            }
        }

    }
</script>

<style scoped>

</style>
