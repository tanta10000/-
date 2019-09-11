<template>
    <div>
        {{msg}}
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    //import someComponent from './someComponent'
    export default {
        name: "RecommendView",
        props: {
            //name:String
        },
        data() {
            return {
                msg: "RecommendView"
            }
        },
        computed: { //计算属性
            fullName: {  //方法一
                // getter
                get: function () {
                    return '';
                },
                // setter
                set: function (newValue) {

                }
            }
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
