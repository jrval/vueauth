/*auth*/
import Home from './components/Home'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'

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

export const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: 'Home',
            requiresAuth: true
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
        path: '/users',
        component: Users,
        meta: {
            title: 'Users',
            requiresAuth: true
        },children: [
            {
                path: '/',
                component: UsersTable,
                name: 'users-table',
                meta: {
                    title: 'Users',
                }
            },
            {
                path: 'create',
                component: UserCreate,
                name: 'users-create',
                meta: {
                    title: 'Create User',
                }
            },
            {
                path: ':id',
                component: UserView,
                name: 'users-view',
                meta: {
                    title: 'View User',
                }
            },
            {
                path: ':id/edit',
                component: UserEdit,
                name: 'users-edit',
                meta: {
                    title: 'Edit User',
                }
            }
        ]
    },
    {
        path: '/permissions',
        component: Permission,
        meta: {
            title: 'Permissions',
            requiresAuth: true
        },children: [
            {
                path: '/',
                component: PermissionsTable,
                name: 'permission-table',
                meta: {
                    title: 'Permissions',
                }
            },
            {
                path: 'create',
                component: PermissionCreate,
                name: 'permission-create',
                meta: {
                    title: 'Create Permission',
                }
            },
            {
                path: ':id',
                component: PermissionView,
                name: 'permission-view',
                meta: {
                    title: 'View Permission',
                }
            },
            {
                path: ':id/edit',
                component: PermissionEdit,
                name: 'permission-edit',
                meta: {
                    title: 'Edit Permission',
                }
            }
        ]
    },
    {
        path: '/roles',
        component: Role,
        meta: {
            title: 'Roles',
            requiresAuth: true
        },children: [
            {
                path: '/',
                component: RolesTable,
                name: 'role-table',
                meta: {
                    title: 'Roles',
                }
            },
            {
                path: 'create',
                component: RoleCreate,
                name: 'role-create',
                meta: {
                    title: 'Create Role',
                }
            },
            {
                path: ':id',
                component: RoleView,
                name: 'role-view',
                meta: {
                    title: 'View Role',
                }
            },
            {
                path: ':id/edit',
                component: RoleEdit,
                name: 'role-edit',
                meta: {
                    title: 'Edit Role',
                }
            }
        ]
    },
];
