<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return UserCollection
     */
    public function index(Request $request)
    {

        if (! Gate::allows('user_view')) {
            return abort(403);
        }

        if($request->showAll) {
            $query = User::with('roles')->orderBy('name','asc')->get();
        }else{
            $searchValue = $request->search;
            $orderBy = $request->sortby;
            $orderByDir = $request->sortdir;
            $perPage = $request->currentpage;

            $query = User::with('roles')->where('name', 'LIKE', "%$searchValue%")
                ->orwhere('email', 'LIKE', "%$searchValue%")
                ->orwhereDate('created_at', 'LIKE', "%$searchValue%")
                ->orderBy($orderBy, $orderByDir)->paginate($perPage);
        }

        return new UserCollection($query);
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        if (! Gate::allows('user_create')) {
            return abort(403);
        }

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255','unique:users','regex:/(^[A-Za-z0-9-_]+$)+/'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'roles' => ['required'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
        $user = User::create($request->all());
        $roles = $request->input('roles') ? $request->input('roles') : [];
        $user->assignRole($roles);

        if ($user) {
            return response()->json([
                'status' => 'success',
                'message' => 'User successfully created'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return UserResource
     */
    public function show($id)
    {
        if (! Gate::allows('user_view')) {
            return abort(403);
        }
        return new UserResource(User::with('roles')->find($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return UserResource
     */
    public function edit($id)
    {
        if (! Gate::allows('user_edit')) {
            return abort(403);
        }
        return new UserResource(User::with('roles')->find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {

        if (! Gate::allows('user_edit')) {
            return abort(403);
        }
        $request->validate([
            'name' => 'required',
            'username' => 'required|string|max:25|unique:users,username,'.$id.'|regex:/(^[A-Za-z0-9-_]+$)+/',
            'email' => 'required|email|max:255|unique:users,email,' . $id,
            'password' => 'sometimes',
            'password_confirmation' => 'sometimes|same:password',
            'roles' => 'required',
        ]);

        $user = User::findOrFail($id);
        $user->update($request->except('roles', 'password_confirmation'));
        $roles = $request->input('roles') ? $request->input('roles') : [];
        $user->syncRoles($roles);
        if ($user) {
            return response()->json([
                'status' => 'success',
                'message' => 'User Successfully Updated'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        if (! Gate::allows('user_delete')) {
            return abort(403);
        }

        $user = User::findorfail($id);
        $user->delete();


        return response()->json([
            'status' => 'success']);
    }
}
