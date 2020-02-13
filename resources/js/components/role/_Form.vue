<template>
    <div>
        <div class="form-group">
            <label>Name</label>
            <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                <input type="text" class="form-control" placeholder="Role name" v-model="role.name" :class="{'is-invalid':errors[0]}">
                <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
        </div>
        <div class="form-group">
            <label>Select Permission</label>
            <ValidationProvider name="permissions" rules="required" v-slot="{ errors }">
                <select class="form-control" multiple="" size="10%" v-model="role.permissions" :class="{'is-invalid':errors[0]}">
                    <option :value="permission.name" v-for="permission in permissions.data"
                            :key="permission.id" :selected=" role.permissions ===permission.name">{{permission.name}}
                    </option>
                </select>
                <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RoleForm",
        props:{
            role:{},
            permissions:null,
        }
    }
</script>

<style scoped>

</style>