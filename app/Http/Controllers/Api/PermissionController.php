<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PermissionCollection;
use App\Http\Resources\PermissionResource;
use Illuminate\Http\Request;
use App\Permission;
use Illuminate\Support\Facades\Gate;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return PermissionCollection
     */
    public function index(Request $request)
    {
        if (! Gate::allows('permission_view')) {
            return abort(403);
        }
        $searchValue = $request->search;
        $orderBy = $request->sortby;
        $orderByDir = $request->sortdir;
        $perPage = $request->currentpage;

        $query = Permission::where('name', 'LIKE', "%$searchValue%")
            ->orderBy($orderBy, $orderByDir)->paginate($perPage);


        return new PermissionCollection($query);
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
        if (! Gate::allows('permission_create')) {
            return abort(403);
        }

        $request->validate([
            'name' => 'required|unique:permissions,name|regex:/(^[A-Za-z0-9-_]+$)+/',
        ]);
        $permission = Permission::create($request->all());
        if($permission){
            return  response()->json([
                'status'=>'success',
                'message'=>'Permission Successfully Added'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return PermissionResource
     */
    public function show($id)
    {
        if (! Gate::allows('permission_view')) {
            return abort(403);
        }

        return new PermissionResource(Permission::find($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return PermissionResource
     */
    public function edit($id)
    {
        if (! Gate::allows('permission_edit')) {
            return abort(403);
        }
        return new PermissionResource(Permission::find($id));
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
        if (! Gate::allows('permission_edit')) {
            return abort(403);
        }
        $request->validate([
            'name' => 'required|unique:permissions,name,'.$request->permission.'|regex:/(^[A-Za-z0-9-_]+$)+/',
        ]);
        $permission = Permission::find($id);
        $permission->name = $request->name;
        $permission->save();

        if($permission){
            return  response()->json([
                'status'=>'success',
                'message'=>'Permission Successfully Updated',
                'name'=>$request->name
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

        if (! Gate::allows('permission_delete')) {
            return abort(403);
        }
        $permission = Permission::findOrFail($id);
        $permission->delete();

        if($permission){
            return  response()->json([
                'status'=>'success',
                'message'=>'Permission Successfully Deleted',
            ]);
        }
    }
}
