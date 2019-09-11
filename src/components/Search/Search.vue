<template>
    <div class="header">
        <!--<div class="header-search">-->
            <router-link to="/search" tag="div" class="header-search">
                 <span class="search-icon">
                    <i class="fa fa-search fa-lg"></i>
                </span>
            <input type="text" class="search-inp" placeholder="请输入需要搜索的文字">
            </router-link>
       <!-- </div>-->
        <span class="release-icon">
            <i class="fa fa-camera fa-2x"></i>
            发布
        </span>
    </div>
</template>

<script>
    export default {
        name: "Search",
        props: {
            //name:String
        },
        data() {
            return {
                msg: "Hello Vue.js"
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

<style lang="scss" scoped>
.header{
    display: flex;
    padding: 30px 18PX 5px 18PX;
    width: 100%;
    height: 75px;
    background: $t-bg;

    .header-search{
        flex: 0 0 300px;
        display: flex;
        padding: 5px;
        width: 300px;
        height: 40px;
        border-radius: 4px;
        background: white;

        .search-icon{
            flex: 0 0 30px;
            width: 30px;
            height: 30px;
            padding: 5px;
            font-size: 14px;
            color: rgba(7,17,27,0.5);

        }
        .search-inp{
            flex: 0 0 260px;
            padding-left:5px;
            width: 260px;
            height: 30px;
            border: 0;
            outline: none;
        }
    }
    .release-icon{
        display: inline-block;
        flex: 0 0 40px;
        margin-left: 12px;
        width: 40px;
        height: 40px;
        font-size: 12px;
        color: white;

        .fa-camera{
           padding: 2px 0;
        }
    }


}



</style>
