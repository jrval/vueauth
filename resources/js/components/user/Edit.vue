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
                <div class="form-group">
                    <label>Name</label>
                    <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                        <input type="text" class="form-control" name="name" placeholder="Enter name"
                               v-model="user.name" :class="{'is-invalid':errors[0]}">
                        <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>

                </div>
                <div class="form-group">
                    <label>Email address</label>
                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                        <input type="email" class="form-control" name="email" aria-describedby="emailHelp"
                               placeholder="Enter email"
                               v-model="user.email" :class="{'is-invalid':errors[0]}">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                            else.
                        </small>
                        <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div class="form-group">
                    <label>Select Role</label>
                    <ValidationProvider name="roles" rules="required" v-slot="{ errors }">
                    <select class="form-control" multiple="" size="10%" v-model="user.roles"   :class="{'is-invalid':errors[0]}">
                        <option :value="role.name" v-for="role in roles.data" :key="role.id"  :selected=" user.roles ===role.name">{{role.name}}</option>
                    </select>
                        <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <ValidationProvider name="password" rules="confirmed:password_confirmation" v-slot="{ errors }">
                    <input type="password"  class="form-control"  placeholder="Password" v-model="user.password" :class="{'is-invalid':errors[0]}" >
                        <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div class="form-group">
                    <label>Retype Password</label>
                    <ValidationProvider name="password_confirmation" v-slot="{ errors }"  vid="password_confirmation">
                    <input type="password" class="form-control" placeholder="Re-type Password" v-model="user.password_confirmation" :class="{'is-invalid':errors[0]}" >
                        <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-danger" @click="$router.go(-1)">Back</button>
            </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Edit",
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
