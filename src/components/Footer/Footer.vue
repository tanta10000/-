<template>
    <div class="footer">
        <ul class="footer-ul">
            <li class="footer-item" v-for="(item,index) in pageArr" :key="index">
                <router-link :to="item.path" tag="div" class="item-tag">
                    <img class="item-img" :src="item.src" :alt="item.tag">
                    <span class="item-name">{{item.name}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        name: "Footer",
        props: {
            //name:String
        },
        data() {
            return {
                pageArr:[
                    {name:'首页',path:'/',src: require('../../../public/image/footer/ans.png'),alt:'icon图片'},
                    {name:'西瓜视频',path:'/xiGua',src:require('../../../public/image/footer/ao4.png'),alt:'icon图片'},
                    {name:'小视频',path:'/smallView',src:require('../../../public/image/footer/biz.png'),alt:'icon图片'},
                    {name:'未登录',path:'/personal',src:require('../../../public/image/footer/anw.png'),alt:'icon图片'}
                ]
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
    .footer{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0px 18px 5px 18px;
        width: 100%;
        height: 50px;
        background: rgba(242, 242, 242);
        z-index: 22;
    }

    .footer-ul{
        display: flex;
        .footer-item{
            flex: 1;
            margin: 0 5px;
            .item-tag{
                display: flex;
                flex-direction:column;
                width: 100%;
                height: 100%;
                text-align: center;

                .item-img{
                    width: 32px;
                    height: 32px;
                    margin: 0 auto;
                    color: red;
                }
                .item-name{
                    font-size: 12px;

                }
            }
        }
    }



</style>
