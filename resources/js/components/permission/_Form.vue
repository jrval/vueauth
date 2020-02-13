<template>
    <div class="form-group">
        <label>Name</label>
        <ValidationProvider name="name" rules="required" v-slot="{ errors }">
            <input type="text" class="form-control" name="name" placeholder="Permission name"
                   v-model="permission.name" :class="{'is-invalid':errors[0]}">
            <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
    </div>
</template>

<script>
    export default {
        name: "PermissionForm",
        props: {
            permission: {}
        },
    }
</script>

<style scoped>

</style>