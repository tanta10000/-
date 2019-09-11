<template>
    <div class="personal" ref="person">
       <div>
           <div class="personal-login">
               <div class="personal-login-logo">登录</div>
           </div>
           <Division></Division>
           <div class="personal-main">
               <div class="main-top">
                   <span class="main-top-name">常用</span>
                   <span class="main-top-all">查看全部 ></span>
               </div>
               <div class="main-content">
                   <ul class="main-ul" v-for="(item,index) in oftenArray" :key="index">
                       <li class="main-content-item" v-for="(it,id) in oftenArray[index]" :key="id">
                            <router-link :to="it.to" tag="div" class="content-item">
                           <img class="content-item-img" :src="it.src" alt="it.alt">
                           <span class="item-name">{{it.name}}</span>
                            </router-link>
                       </li>
                   </ul>
               </div>
           </div>
           <Division></Division>
           <div class="personal-find">
               <div class="find-top">
                   <span class="find-name">发现</span>
                   <span class="find-all">查看全部 ></span>
               </div>
               <div class="find-content" >
                   <ul class="find-ul" v-for="(item,index) in findArray" :key="index">
                       <li class="find-content-item" v-for="(it,id) in findArray[index]" :key="id">
                           <img class="content-img" :src="it.src" alt="it.alt">
                           <span class="name">{{it.name}} </span>
                       </li>
                   </ul>
               </div>
           </div>
       </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import  Division from  '../../components/Division/Division'
    import  BScroll from 'better-scroll'
    export default {
        name: "PersonalView",
        props: {
            //name:String
        },
        data() {
            return {
                oftenArray:[
                    [
                        {name:'我的关注',src: require('../../../public/image/often/ba6.png'),alt:'图片',to:'/meFollow'},
                        {name:'消息通知',src: require('../../../public/image/often/bae.png'),alt:'图片',to:'/meNews'},
                        {name:'我的收藏',src: require('../../../public/image/often/ba8.png'),alt:'图片',to:'/meCollection'},
                        {name:'阅读历史',src: require('../../../public/image/often/ba_.png'),alt:'图片',to:'/readingHistory'}
                    ],
                    [
                        {name:'我的钱包',src: require('../../../public/image/often/bah.png'),alt:'图片',to:''},
                        {name:'用户反馈',src: require('../../../public/image/often/ba9.png'),alt:'图片',to:''},
                        {name:'免流量服务',src: require('../../../public/image/often/baf.png'),alt:'图片',to:''},
                        {name:'系统设置',src: require('../../../public/image/often/bag.png'),alt:'图片',to:''}
                    ]
                ],
                findArray:[
                    [
                        {name:'射击王者3D',src: require('../../../public/image/find/01.png'),alt:'图片',to:''},
                        {name:'成语升官记',src: require('../../../public/image/find/02.png'),alt:'图片',to:''},
                        {name:'艾萨公主',src: require('../../../public/image/find/03.png'),alt:'图片',to:''},
                        {name:'穷游网',src: require('../../../public/image/find/04.png'),alt:'图片',to:''}
                    ],
                    [
                        {name:'全民漂移3D',src: require('../../../public/image/find/05.png'),alt:'图片',to:''},
                        {name:'懂车帝',src: require('../../../public/image/find/06.png'),alt:'图片',to:''},
                        {name:'暖暖的衣柜',src: require('../../../public/image/find/07.png'),alt:'图片',to:''},
                        {name:'消灭病毒',src: require('../../../public/image/find/08.png'),alt:'图片',to:''}
                    ]
                ],
            }
        },
        computed: { //计算属性
        },
        methods: {
            //function 事件监听
            personalScroll(){
                if(! this.personScroll){
                    this.personScroll = new BScroll(this.$refs.person,{
                        click:true,
                    })
                }else {
                    this.personScroll.refresh();
                }
            }
        },
        mounted(){
          this.$nextTick(() => {
              this.personalScroll();
          })
        },
        beforeDestroy(){
            this.personScroll.destroy();
            this.personScroll=null;
        },
        components: {  //组件
            //someComponent
            Division
        }
    }
</script>

<style lang="scss" scoped>
    .personal{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        z-index: 20;
        background: $t-white;
    }

    .personal-login{
        padding: 50px;
        width: 100%;
        height: 33%;
        .personal-login-logo{
            margin: 0 auto;
            width: 95px;
            height: 95px;
            line-height: 95px;
            text-align: center;
            vertical-align: center;
            background-image: url("../../../public/image/often/aue.png");
            background-size: 95px;
            background-repeat: no-repeat;
        }
    }
    .personal-main{
        padding: 0 18px;
        width: 100%;
        .main-top{
            position: relative;
            width: 100%;
            height: 50px;
            line-height: 50px;
            .main-top-name{
                position: absolute;
                top: 0;
                left: 0;
                font-size: 14px;
                font-weight: 700;
            }
            .main-top-all{
                position: absolute;
                top: 0;
                right: 0;
                letter-spacing:1px;
                font-size: 12px;
                color: #d8d8d8;
            }
        }
    }
    .main-content{
        .main-ul{
            display: flex;
            padding: 16px 0px;
            width: 100%;
            height: 80px;
            border-top: 2px solid rgba(245,245,245,0.8);
            .main-content-item{
                flex: 1;
                display: flex;
                flex-direction: column;
                margin: 0px 2px;
                text-align: center;
                .content-item{
                    display: flex;
                    flex-direction: column;
                    .content-item-img{
                        width: 24px;
                        height: 24px;
                        margin: 0 auto;
                    }
                    .item-name{
                        margin-top: 5px;
                        letter-spacing:2px;
                        font-size: 10px;
                        font-weight: 700;
                        color: black;
                    }
                }
            }
        }
    }
    .personal-find{
        padding: 0px 18px;
        width: 100%;
        .find-top{
            position: relative;
            width: 100%;
            height: 50px;
            line-height: 50px;
            .find-name{
                position: absolute;
                top: 0;
                left: 0;
                font-size: 14px;
                font-weight: 700;
            }
            .find-all{
                position: absolute;
                top: 0;
                right: 0;
                letter-spacing:1px;
                font-size: 12px;
                color: #d8d8d8;

            }

        }
    }

    .find-content{
        .find-ul{
            display: flex;
            padding: 16px 0px;
            width: 100%;
            height: 80px;
            border-top: 2px solid rgba(245,245,245,0.8);
            .find-content-item{
                flex: 1;
                display: flex;
                flex-direction: column;
                margin: 0px 2px;
                text-align: center;
                .content-img{
                    width: 32px;
                    height: 32px;
                    margin: 0 auto;
                }
                .name{
                    margin-top: 5px;
                    letter-spacing:2px;
                    font-size: 10px;
                    font-weight: 700;
                    color: black;

                }


            }

        }

    }



</style>
