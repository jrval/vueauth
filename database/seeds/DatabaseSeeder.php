<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);

//        app()['cache']->forget('spatie.permission.cache');
//
//        Permission::create(['name' => 'permission_create']);
//        Permission::create(['name' => 'permission_delete']);
//        Permission::create(['name' => 'permission_edit']);
//        Permission::create(['name' => 'role_create']);
//        Permission::create(['name' => 'role_delete']);
//        Permission::create(['name' => 'role_edit']);
//        Permission::create(['name' => 'user_create']);
//        Permission::create(['name' => 'user_delete']);
//        Permission::create(['name' => 'user_edit']);
//        Permission::create(['name' => 'user_view']);
//
//        $role = Role::create(['name' => 'administrator']);
//        $role->givePermissionTo([
//            'permission_create',
//            'permission_delete',
//            'permission_edit',
//            'role_create',
//            'role_delete',
//            'role_edit',
//            'user_create',
//            'user_delete',
//            'user_edit',
//            'user_view',
//        ]);

        //Create Super admin
        $user = User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => 'password',
        ]);

        $user->assignRole('administrator');
    }
}
