<template>
    <div>
        <div class="form-group">
            <label>Name</label>
            <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                <input type="text" class="form-control" name="name" placeholder="Enter name"
                       v-model="user.name" :class="{'is-invalid':errors[0]}">
                <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>

        </div>
        <div class="form-group">
            <label>Email address</label>
            <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                <input type="email" class="form-control" name="email" aria-describedby="emailHelp"
                       placeholder="Enter email"
                       v-model="user.email" :class="{'is-invalid':errors[0]}">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                    else.
                </small>
                <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
        </div>
        <div class="form-group">
            <label>Select Role</label>
            <ValidationProvider name="roles" rules="required" v-slot="{ errors }">
                <select class="form-control" multiple="" size="10%" v-model="user.roles"
                        :class="{'is-invalid':errors[0]}">
                    <option :value="role.name" v-for="role in roles.data" :key="role.id"
                            :selected=" user.roles ===role.name">{{role.name}}
                    </option>
                </select>
                <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
        </div>
        <div class="form-group">
            <label>Password</label>
            <ValidationProvider name="password" rules="confirmed:password_confirmation" v-slot="{ errors }" v-if="edit">
                <input type="password" name="password" class="form-control" placeholder="Password"
                       v-model="user.password" :class="{'is-invalid':errors[0]}">
                <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider name="password" rules="required|confirmed:password_confirmation" v-slot="{ errors }"
                                v-else>
                <input type="password" name="password" class="form-control" placeholder="Password"
                       v-model="user.password" :class="{'is-invalid':errors[0]}">
                <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
        </div>
        <div class="form-group">
            <label>Retype Password</label>
            <ValidationProvider name="password_confirmation" v-slot="{ errors }" vid="password_confirmation">
                <input type="password" class="form-control" name="password_confirmation" placeholder="Re-type Password"
                       v-model="user.password_confirmation" :class="{'is-invalid':errors[0]}">
                <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserForm",
        props: {
            edit: false,
            user: null,
            roles:null,
        }
    }
</script>

<style scoped>

</style>