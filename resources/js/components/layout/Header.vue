<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="">
                    aw
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        <router-link tag="li" :to="{ name: 'home' }" class="nav-item" exact v-if="currentUser">
                            <a class="nav-link">Home</a>
                        </router-link>

                        <router-link tag="li" :to="{ name: 'users' }" class="nav-item" exact v-if="currentUser">
                            <a class="nav-link">Users</a>
                        </router-link>

                        <router-link tag="li" :to="{ name: 'login' }" class="nav-item" exact v-if="!currentUser">
                            <a class="nav-link">Login</a>
                        </router-link>
                        <router-link tag="li" :to="{ name: 'register' }" class="nav-item" exact v-if="!currentUser">
                            <a class="nav-link">Register</a>
                        </router-link>

                        <li class="nav-item dropdown" v-if="currentUser">

                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{currentUser.name}}
                                <span class="caret"></span>

                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" @click.prevent="logout">
                                    Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Header",
        computed: {
            currentUser() {
                return this.$store.getters.currentUser
            }
        },
        methods: {
            logout() {
                let uri = '/api/logout';
                axios.post(uri,{})
                    .then((response) => {
                        this.$store.commit('logout');
                        this.$router.push('/login');
                    })
            },

        },
    }
</script>

<style scoped>

</style>
