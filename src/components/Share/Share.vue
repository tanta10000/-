<template>
    <div class="cover-div">
        <div class="content-cover" @click="closeShare">
            <div class="cover-box">
                <div class="box-main">
                    <div class="better" ref="betterRef">
                        <ul class="better-ul" ref="ulRef">
                            <li class="better-share" v-for="(item,index) in getShareInfoArr" :key="index">
                                <img class="share-img" :src="item.path" alt="">
                                <span class="name">{{item.name}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="box-btn" @click.stop="closeShare">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
    import  {mapGetters} from  'vuex'
    import  BScroll from 'better-scroll'
    import {UPDATE_IS_SHARE} from  '@/store/mutation-type'

    export default {
        name: "Share",
        props: {
            //name:String
        },
        data() {
            return {
                msg: "Hello Vue.js"
            }
        },
        computed: { //计算属性
            ...mapGetters(['getShareInfoArr']),
        },
        mounted(){
          this.$nextTick(()=>{
              this.betterRefScroll();
          })
        },
        methods: {  //function 事件监听
            closeShare(){
                console.log('我是关闭分享');
                this.$store.commit(UPDATE_IS_SHARE);
            },
            betterRefScroll(){
               this.$refs.ulRef.style.width=this.$store.getters.getShareInfoArr.length*80+'px';
                if(!this.betterRef){
                this.betterRef=new BScroll(this.$refs.betterRef,{
                    click:true,
                    probeType:2,
                    scrollX:true
                    })
                }else {
                    this.betterRef.refresh();
                }
            }
        },
        beforeDestroy(){
            this.betterRef.destroy();
            this.betterRef=null;

        },
        components: {  //组件
            //someComponent
        }
    }
</script>

<style lang="scss" scoped>
    .content-cover{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #2e2c2cbd;
        z-index: 30;

        .cover-box{
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            height: 38%;
            padding: 20px 12px 16px 12px;

            .box-main{
                width: 100%;
                height: 120px;
                background: $t-white;
                margin-bottom: 10px;
                border-radius: 10px;

            }

            .box-btn{
                width: 100%;
                height: 45px;
                background: $t-white;
                margin-bottom: 10px;
                border-radius: 10px;
                text-align: center;
                font-size: 16px;
                line-height: 45px;
                font-weight: 700;

            }
        }
        .better{
            overflow: hidden;
            .better-ul{
                display: flex;
                flex-direction: row;
                padding:0px 10px ;

                .better-share{
                    display: flex;
                    flex-direction: column;
                    flex: 0 0 80px;
                    margin-top: 20px;
                    text-align: center;

                    .share-img{
                        margin: 10px auto;
                        width: 40px;
                        height: 40px;

                    }
                    .name{
                        font-size: 12px;

                    }

                }

            }


        }


    }
</style>
