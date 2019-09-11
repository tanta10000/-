<template>
    <div>
        {{msg}}
    </div>

</template>

<script>

    export default {
        name: "ReleaseView",
        props: {
            //name:String
        },
        data() {
            return {
                msg: "ReleaseView"
            }
        },
        computed: { //计算属性
        },
        methods: {
            //function 事件监听
        },
        components: {  //组件
            //someComponent
        }
    }
</script>

<style scoped>

</style>
