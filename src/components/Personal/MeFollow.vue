<template>
    <transition name="follow">
    <div class="follow">
       <div class="top">
           <img @click="followGoBack" class="top-og-back" src="../../../public/image/search/aio.png" alt="">
           <span class="top-name">我的关注</span>
           <img class="top-add" src="../../../public/image/often/alf.png" alt="">
       </div>
        <div class="content" ref="contentRef">
            <ul class="content-ul" ref="ulRef">
                <li class="list-item" v-for="(item,index) in getFollowContentListArr" :key="index">
                    <div class="portrait">
                        <img class="portrait-img" :src="item.avatar_url" alt="">
                        <img class="verified" src="../../../public/image/page/alu.png" v-if="item.user_verified">
                    </div>
                    <div class="introduce">
                        <span class="name">{{item.name}}</span>
                        <span class="autograph">
                            <span class="text">{{item.description}}</span>
                             <span class="is-follow" :class="{active:!item.isFollow}" @click="closeFollow(item.user_id||item.id,item.isFollow)">{{item.isFollow?'已关注':'关注'}}</span>
                        </span>
                        <span class="fans">粉丝数量： {{item.fans}}{{item.user_id||item.id}} </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    </transition>
</template>

<script>
    import  BScroll from 'better-scroll'
    import  followLoad from '../../js/localstorage/followlocalding'
    export default {
        name: "MeFollow",
        props: {

        },
        data() {
            return {
                msg: "MeFollow",
                followContentListArr:[]
            }
        },
        computed: { //计算属性

            getFollowContentListArr(){
                return this.followContentListArr;
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.setFollowContentListArr();
                this.getFollowScroll();
            })
        },
        beforeDestroy(){
            this.contentRefScroll.destroy();
            this.contentRefScroll=null;
        },
        methods: {  //function 事件监听
            closeFollow(id){
                let data=followLoad.fetchFollow();
              //  console.log(data);
                data=data.filter((item)=>{(item.user_id||item.id)!==id})
                followLoad.saveFollow(data);
                this.followContentListArr=followLoad.fetchFollow();

            },
            setFollowContentListArr(){
                console.log(followLoad.fetchFollow())
                this.followContentListArr=followLoad.fetchFollow();
            },
            followGoBack(){ //路由回退
                this.$router.go(-1);
            },
            getFollowScroll(){
                this.$refs.ulRef.style.height=this.getFollowContentListArr.length*80+'px'
                if(!this.contentRefScroll){
                    this.contentRefScroll=new BScroll(this.$refs.contentRef,{
                            click:true
                    })
                }else {
                    this.contentRefScroll.refresh();
                }
            }
        },
        components: {  //组件

        }
    }
</script>

<style lang="scss" scoped>
    .follow-enter,.follow-leave-to{
        transform: translateX(375px);
    }
    .follow-enter-active,.follow-leave-active{
        transition: all .3s linear;
    }
    .follow-enter-to,.follow-leave{
        transform: translateX(0px);
    }

    .follow{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 18px 12px 0px 12px;
        z-index: 33;
        background: $t-white;

    }
    .top{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 37px;
        line-height: 37px;
        @include  border-bottom(elebluck(.1));
        .top-og-back{
            flex: 0 0 24px;
            margin-top: 5px;
            width: 24px;
            height: 24px;
        }
        .top-name{
            flex: 1;
            text-align: center;
            height: 37px;
            line-height: 37px;
        }
        .top-add{
            flex: 0 0 30px;
            width: 30px;
            height: 30px;
        }
    }
    .content{
        margin-top: 12px;
        padding-top: 12px;
        width: 100%;
        height: 600px;
        overflow: hidden;
    }

    .content-ul{
        width: 100%;
        height: 100%;
        .list-item{
            display: flex;
            width: 100%;
            height: 80px;
            margin-top: 10px;
            //padding-bottom: 8px;
            @include  border-bottom(elebluck(0.1));
            .portrait{
                position: relative;
                margin-right: 12px;
                .portrait-img{
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                }
                .verified{
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    right: 0;
                    bottom: 15px;
                }

            }
            .introduce{
                width: 100%;
                display: flex;
                flex-direction: column;
                .name{
                    margin-bottom: 5px;
                }
                .autograph{
                    display: flex;
                    width: 100%;
                    height: 28px;
                    .text{
                        flex: 1;
                        width: 200px;
                        margin-right: 24px;
                        font-size: 14px;
                        line-height: 28px;
                        font-weight: 200;
                        text-align: left;
                        letter-spacing: normal;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        color: elebluck(.4);
                    }
                    .is-follow{
                        text-align: center;
                        line-height: 24px;
                        vertical-align: top;
                        padding: 0px 5px;
                        border: 1px solid elebluck(.1);
                        border-radius: 5px;
                        color: elebluck(.4);

                        &.active{
                            font-weight: 700;
                            color: $t-white;
                            background: #f85959;

                        }
                    }
                }
                .fans{
                    height: 16px;
                    line-height: 16px;
                    font-size: 14px;
                    color: elebluck(.4);
                }
            }
        }
    }






</style>
