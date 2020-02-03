<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoleCollection;
use App\Http\Resources\RoleResource;
use App\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return RoleCollection
     */
    public function index(Request $request)
    {
        $searchValue = $request->search;
        $orderBy = $request->sortby;
        $orderByDir = $request->sortdir;
        $perPage = $request->currentpage;

        $query = Role::with('permissions')->where('name', 'LIKE', "%$searchValue%")
            ->orderBy($orderBy, $orderByDir)->paginate($perPage);


        return new RoleCollection($query);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:roles,name|regex:/(^[A-Za-z0-9-_]+$)+/',
            'permissions'=>'required'
        ]);
        $role = \Spatie\Permission\Models\Role::create($request->except('permissions'));
        $permissions = $request->input('permissions') ? $request->input('permissions') : [];
        $role->givePermissionTo($permissions);
        if($role){
            return  response()->json([
                'status'=>'success',
                'message'=>'Role Successfully Added'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return RoleResource
     */
    public function show($id)
    {
        return new RoleResource(Role::with('permissions')->find($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return RoleResource
     */
    public function edit($id)
    {
        return new RoleResource(Role::with('permissions')->find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|unique:roles,name,'.$request->role.'|regex:/(^[A-Za-z0-9-_]+$)+/',
            'permissions'=>'required'
        ]);

        $role = Role::findOrFail($id);
        $role->update($request->except('permissions'));
        $permissions = $request->input('permissions') ? $request->input('permissions') : [];
        $role->syncPermissions($permissions);

        if($role){
            return  response()->json([
                'status'=>'success',
                'message'=>'Role Successfully Updated'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $role = \Spatie\Permission\Models\Role::findOrFail($id);
        $role->delete();

        if($role){
            return  response()->json([
                'status'=>'success',
                'message'=>'Role Successfully Deleted',
            ]);
        }
    }
}
