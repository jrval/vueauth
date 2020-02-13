<template>
    <div>
        <button type="submit" class="btn btn-primary" v-if="submit">Submit</button>
        <button type="button" class="btn btn-danger" @click="$router.go(-1)" v-if="back">Back</button>
    </div>
</template>

<script>
    export default {
        props:{
          submit:false,
          back:false,
        },
        name: "ButtonsElement"
    }
</script>

<style scoped>

</style>