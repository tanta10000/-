<template>
    <div>
        {{msg}}
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    //import someComponent from './someComponent'
    export default {
        name: "FollowView",
        props: {
            //name:String
        },
        data() {
            return {
                msg: "FollowView"
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
