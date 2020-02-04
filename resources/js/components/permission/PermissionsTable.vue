<template>
    <div class="card shadow mb-4">

        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Table</h6>
        </div>


        <div class="card-body">

                <p class="mb-4"  >
                    <router-link :to="{ name: 'permission-create' }" class="btn btn-success" v-if="$can('permission_create')">Create Permission</router-link>
                </p>


            <hr>
            <div class="row form-group">
                <div class="col-md-1">
                    <label>Per Page</label>
                    <select class="form-control" v-model="currentPage"  @change="selectPageNumber(currentPage)">
                        <option v-for="perPage in perPage" :value="perPage"  :selected="currentPage===perPage">{{ perPage }}</option>
                    </select>
                </div>
                <div class="col-md-8">

                </div>
                <div class="col-md-3" >
                    <label>Search</label>
                    <input class="form-control" v-model="search" placeholder="search" @keyup="index" @click="isSearch = true">
                </div>

            </div>
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                    <tr>
                        <th @click="sort('name')">
                            <div class="inline-block">
                                <div class="filter-asc" :class="{'active-filter-asc':sortClassActive.activeAsc}" ></div>
                                <div class="filter-desc" :class="{'active-filter-desc':sortClassActive.activeDesc}"></div>
                            </div>
                            Name
                        </th>
                        <th @click="sort('created_at')" >
                            <div class="inline-block">
                                <div class="filter-asc" :class="{'active-filter-asc':sortClassActive.activeAsc}" ></div>
                                <div class="filter-desc" :class="{'active-filter-desc':sortClassActive.activeDesc}"></div>
                            </div>
                            Created at</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(permission,index) in permissions.data" :key="permission.id" :index="index">
                        <td>{{ permission.name }}</td>
                        <td>{{ permission.created_at | moment("MM/DD/YYYY") }}</td>
                        <td>
<!--                            <router-link class="btn btn-info btn-sm" :to="`/permissions/${permission.id}`">View</router-link>-->
                            <router-link class="btn btn-success btn-sm" :to="`/permissions/${permission.id}/edit`"  v-if="$can('permission_edit')" >Edit</router-link>
                            <button class="btn btn-danger btn-sm"  @click="remove(permission.id,index)" v-if="$can('permission_delete')">Delete</button>
                        </td>
                    </tr>
                    <tr v-if="permissions.data && permissions.data.length === 0">
                        <td colspan="3">No Data</td>
                    </tr>
                    </tbody>
                </table>
                <p class="float-left">Showing {{meta.from}} to {{meta.to}} of {{meta.total}} entries</p>
                <pagination class="float-right" :data="permissions" @pagination-change-page="index" :limit="5"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PermissionsTable",
        data() {
            return {
                permissions: {},
                currentSort:'name',
                currentSortDir:'asc',
                search: '',
                isSearch: false,
                perPage: ['10', '50', '100'],
                currentPage:'10',
                page: {},
                sortClassActive:{
                    'activeDesc':false,
                    'activeAsc':true
                },
                meta:{}
            }
        },

        created() {

            this.index();
        },
        methods: {
            index(page) {
                if (typeof page === 'undefined') {
                    this.page = 1;
                }
                if(this.isSearch){

                    let uri = process.env.MIX_APP_URL+'/api/permissions?page='+page+'&search='+this.search+'&sortby='+this.currentSort+'&sortdir='+this.currentSortDir+'&currentpage='+this.currentPage;
                    this.uri= uri;
                    this.page = page;
                    axios.get(uri)
                        .then(response => {
                            this.permissions = response.data;
                            this.meta.total = response.data.meta.total;
                            this.meta.from = response.data.meta.from;
                            this.meta.to = response.data.meta.to;
                        });

                }else{
                    let uri =  process.env.MIX_APP_URL+'/api/permissions?page=' + page+'&search='+this.search+'&sortby='+this.currentSort+'&sortdir='+this.currentSortDir+'&currentpage='+this.currentPage;
                    this.uri = uri;
                    this.page = page;
                    axios.get(uri)
                        .then(response => {
                            this.permissions = response.data;
                            this.meta.total = response.data.meta.total;
                            this.meta.from = response.data.meta.from;
                            this.meta.to = response.data.meta.to;
                        });
                }
            },
            sort(s) {
                console.log(s);
                if(s === this.currentSort) {
                    this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
                    if(this.currentSortDir ==='asc'){
                        this.sortClassActive.activeAsc = true;
                        this.sortClassActive.activeDesc = false;
                    }else{
                        this.sortClassActive.activeAsc = false;
                        this.sortClassActive.activeDesc = true;
                    }
                }
                this.currentSort = s;
                this.index();
            },
            selectPageNumber(selected){
                this.currentPage = selected;
                this.index();
            },
            remove(e,index) {
                this.$swal.fire({
                    title: 'Are you sure to delete this permission?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        let uri = `/api/permissions/${e}`;
                        axios.delete(uri).then(response => {
                            this.$swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            );
                            this.permissions.data.splice(index, 1);
                        });
                    }
                })
            },

        }
    }
</script>

<style scoped>
    .filter-asc {
        border-bottom: 5px solid #ccc;
        margin-bottom: 1px
    }

    .filter-asc, .filter-desc {
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent
    }

    .filter-desc {
        border-top: 5px solid #ccc;
        margin-top: 1px
    }

    .active-filter-asc {
        border-bottom: 5px solid #a3a3a3
    }

    .active-filter-desc {
        border-top: 5px solid #a3a3a3
    }

    .inline-block {
        display: inline-block
    }
</style>
