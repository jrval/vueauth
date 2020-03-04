<template>
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" v-if="currentUser">

        <!-- Sidebar - Brand -->
        <router-link :to="{ name: 'home' }" class="sidebar-brand d-flex align-items-center justify-content-center">
            <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
            </div>
            <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
        </router-link>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->

        <router-link tag="li" :to="{ name: 'home' }" class="nav-item" exact v-if="currentUser">
            <a class="nav-link">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span></a>
        </router-link>

        <!-- Divider -->
        <hr class="sidebar-divider">


        <template v-if="$is('administrator')">
            <!-- Heading -->
            <div class="sidebar-heading">
                Admin
            </div>


            <router-link tag="li" :to="{ name: 'permission-table' }" class="nav-item" v-if="currentUser">
                <a class="nav-link">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Permissions</span></a>
            </router-link>
            <router-link tag="li" :to="{ name: 'role-table' }" class="nav-item" v-if="currentUser">
                <a class="nav-link">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Roles</span></a>
            </router-link>
            <router-link tag="li" :to="{ name: 'users-table' }" class="nav-item" v-if="currentUser">
                <a class="nav-link">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Users</span></a>
            </router-link>
        </template>
        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle" @click="toggleSideBar"></button>
        </div>

    </ul>
</template>

<script>
    // import $ from 'jquery';
    export default {
        name: "Sidebar",
        methods: {
            toggleSideBar() {
                $("body").toggleClass("sidebar-toggled");
                $("#accordionSidebar").toggleClass("toggled");
            },
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser
            }
        },
    }
</script>

<style scoped>

</style>
