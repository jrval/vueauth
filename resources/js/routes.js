/*auth*/
import Home from './components/Home'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import Profile from "./components/profile/Profile";

/*users*/
import Users from './components/user/Users'
import UsersTable from "./components/user/UsersTable";
import UserCreate from "./components/user/Create";
import UserView from "./components/user/Show";
import UserEdit from "./components/user/Edit";

/*permission*/
import Permission from "./components/permission/Permission";
import PermissionsTable from "./components/permission/PermissionsTable";
import PermissionCreate from "./components/permission/Create";
import PermissionView from "./components/permission/View";
import PermissionEdit from "./components/permission/Edit";

/*role*/
import Role from "./components/role/Role";
import RolesTable from "./components/role/RolesTable";
import RoleCreate from "./components/role/Create";
import RoleView from "./components/role/View";
import RoleEdit from "./components/role/Edit";


/*passport*/
import Passport from "./components/passport/Passport";

/*errors*/
import Error_404 from "./components/errors/404"


export const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: 'Home',
            requiresAuth: true,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: 'Login',

        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: 'Register',
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            title: 'Profile',
            requiresAuth: true,
        }
    },
    {
        path: '/users',
        component: Users,
        children: [
            {
                path: '/',
                component: UsersTable,
                name: 'users-table',
                meta: {
                    title: 'Users',
                    roles: ['administrator'],
                    requiresAuth: true,
                }
            },
            {
                path: 'create',
                component: UserCreate,
                name: 'users-create',
                meta: {
                    title: 'Create User',
                    roles: ['administrator'],
                    requiresAuth: true,
                }
            },
            {
                path: ':id',
                component: UserView,
                name: 'users-view',
                meta: {
                    title: 'View User',
                    roles: ['administrator'],
                    requiresAuth: true,
                }
            },
            {
                path: ':id/edit',
                component: UserEdit,
                name: 'users-edit',
                meta: {
                    title: 'Edit User',
                    roles: ['administrator'],
                    requiresAuth: true,
                }
            }
        ]
    },
    {
        path: '/permissions',
        component: Permission,
        children: [
            {
                path: '/',
                component: PermissionsTable,
                name: 'permission-table',
                meta: {
                    title: 'Permissions',
                    roles: ['administrator'],
                    requiresAuth: true,
                }
            },
            {
                path: 'create',
                component: PermissionCreate,
                name: 'permission-create',
                meta: {
                    title: 'Create Permission',
                    roles: ['administrator'],
                    requiresAuth: true,
                }
            },
            {
                path: ':id',
                component: PermissionView,
                name: 'permission-view',
                meta: {
                    title: 'View Permission',
                    roles: ['administrator'],
                    requiresAuth: true,
                }
            },
            {
                path: ':id/edit',
                component: PermissionEdit,
                name: 'permission-edit',
                meta: {
                    title: 'Edit Permission',
                    roles: ['administrator'],
                    requiresAuth: true,
                }
            }
        ]
    },
    {
        path: '/roles',
        component: Role,
        children: [
            {
                path: '/',
                component: RolesTable,
                name: 'role-table',
                meta: {
                    title: 'Roles',
                    roles: ['administrator'],
                    requiresAuth: true,
                }
            },
            {
                path: 'create',
                component: RoleCreate,
                name: 'role-create',
                meta: {
                    title: 'Create Role',
                    roles: ['administrator'],
                    requiresAuth: true,
                }
            },
            {
                path: ':id',
                component: RoleView,
                name: 'role-view',
                meta: {
                    title: 'View Role',
                    roles: ['administrator'],
                    requiresAuth: true,
                }
            },
            {
                path: ':id/edit',
                component: RoleEdit,
                name: 'role-edit',
                meta: {
                    title: 'Edit Role',
                    roles: ['administrator'],
                    requiresAuth: true,
                }
            }
        ]
    },
    {
        path: '/passport',
        component: Passport,
        meta: {
            title: 'Passport',
            requiresAuth: true,
            roles: ['administrator'],
        }
    },
    {
        path: '/404',
        name: 'error_404',
        component: Error_404,
        meta: {
            title: 'Error 404',
        }
    },
    {path: '*', redirect: '/404'},

];
