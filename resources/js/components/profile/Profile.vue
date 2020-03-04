<template>
    <div>
        <h1 class="h3 mb-2 text-gray-800">{{title || 'Users Data'}}</h1>
        <div class="card shadow mb-4" v-if="user">
            <div class="card-body">
                <div class="alert alert-danger" role="alert" v-if="errors">
                    <p v-for="err in errors">
                        {{err[0] || err}}
                    </p>
                </div>

                <form v-on:submit.prevent="updateAuthUser">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" placeholder="Enter name" v-model="user.name" disabled>
                    </div>
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" class="form-control" name="username" placeholder="Enter username" disabled
                               v-model="user.username">
                    </div>
                    <div class="form-group">
                        <label>Email address</label>
                        <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email"
                               v-model="user.email" disabled>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                            else.
                        </small>
                    </div>
                    <div class="form-group">

                        <template v-if="$is('administrator')">
                            <label>Select Role</label>
                            <select class="form-control" multiple="" size="10%" v-model="user.roles">
                                <option :value="role.name" v-for="role in roles.data" :key="role.id"
                                        :selected=" user.roles ===role.name">{{role.name}}
                                </option>
                            </select>
                        </template>
                        <template v-else>
                            <label>Role:</label>
                            <span class="badge badge-primary" v-for="role in user.roles">
                               {{role}}
                            </span>
                        </template>

                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" placeholder="Password" v-model="user.password">
                        <small class="form-text text-muted">Leave blank if you don't want to change password</small>
                    </div>
                    <div class="form-group">
                        <label>Retype Password</label>
                        <input type="password" class="form-control" placeholder="Re-type Password"
                               v-model="user.password_confirmation">
                    </div>

                    <button type="submit" class="btn btn-primary">Update</button>
                    <button type="button" class="btn btn-danger" @click="$router.go(-1)">Back</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Profile",
        data() {
            return {
                user: null,
                roles: [],
                errors: null
            }
        },
        created() {
            this.getAuthUser();
            this.getRoles();
        },
        computed: {
            title() {
                return this.$route.meta.title.toUpperCase();
            }
        },
        methods: {
            getAuthUser() {
                axios.get(`/api/auth-user`,)
                    .then((response) => {
                        this.user = response.data.user;
                        let role = [];
                        this.user.roles.forEach(obj => {
                            role.push(obj.name);
                        });
                        this.user.roles = role;
                    });
            },
            updateAuthUser() {
                axios.patch(`/api/auth-user/update`, this.user)
                    .then((response) => {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'User updated',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.$router.push({name: 'profile'});
                    }).catch((error) => {
                    this.user.password = '';
                    this.user.password_confirmation = '';
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
            },
            getRoles() {
                if (this.$can('role_view')) {
                    axios.get('/api/roles?sortby=name&sortdir=asc')
                        .then((response) => {
                            this.roles = response.data;
                        }).catch((error) => {
                    });
                }

            },
        }
    }
</script>

<style scoped>

</style>
