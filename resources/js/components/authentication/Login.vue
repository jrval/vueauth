<template>
    <div class="container">

        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>

                                        <div class="alert alert-danger" role="alert" v-if="errors">
                                            <p v-for="err in errors">
                                                {{err[0] || err}}
                                            </p>
                                        </div>
                                    </div>


                                    <form class="user" v-on:submit.prevent="authenticate">
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." v-model="form.email">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password" v-model="form.password">
                                        </div>
                                        <div class="form-group">
                                            <div class="custom-control custom-checkbox small">
                                                <input type="checkbox" class="custom-control-input" id="customCheck">
                                                <label class="custom-control-label" for="customCheck">Remember Me</label>
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-primary btn-user btn-block">
                                            Login
                                        </button>

                                    </form>
                                    <hr>
                                    <div class="text-center">
                                        <a class="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>
                                    <div class="text-center">
                                        <a class="small" href="register.html">Create an Account!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>

</template>

<script>

   import {login} from  '../../helpers/auth'
    export default {
        name: "Login",
        data(){
            return{
                form:{
                    email:'',
                    password:'',
                },
                errors:null
            }
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser
            }
        },

        methods:{
            authenticate(){
                this.errors='';
                this.$store.dispatch('login');
                login(this.$data.form)
                .then((res)=>{
                    this.$store.commit('loginSuccess',res);
                    this.$router.push({name:'home'});
                }).catch((error)=>{
                    this.$store.commit('loginFailed',{error});
                    console.log(this.$store.state.auth_error.status);
                    if(this.$store.state.auth_error.status=== 422){
                        this.errors = this.$store.state.auth_error.data.errors;
                    }else if(this.$store.state.auth_error.status===400){
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Login error',
                            text: this.$store.state.auth_error.data,
                            reverseButtons: true,
                            confirmButtonText: 'Ok',
                            cancelButtonText: 'Cancel'
                        }).then((result) => {
                            if (result.value) {
                               this.form.password = '';
                            }
                        })
                    }
                })
            },

        }
    }
</script>

<style v-if="currentUser">
body {
    background-color: #4e73df;
    background-image: linear-gradient(180deg,#4e73df 10%,#224abe 100%);
    background-size: cover;
}
</style>
