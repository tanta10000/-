<template>
    <div class="nav">
        <div class="nav-bar" ref="navBar">
            <ul class="nav-ul" ref="navUl">
                <li v-for="(item,index) in routerArr"
                    ref="navList" class="nav-list"
                    :class="{active:channelFigure === index}"
                    :key="index"
                    @click="changChannelFigure(index)"
                ><router-link :to="item.path" tag="span">{{item.name}}</router-link></li>
            </ul>
        </div>
        <span class="cross" @click="changNeed"> <i class="fa fa-th-list"></i> </span>

    </div>
</template>

<script>
    import BScroll from 'better-scroll'
   //

    export default {
        name: "Nav",
        props:['minus','arr'],
        data() {
            return {
                channelFigure:0,
               routerArr:[
                   {name:'推荐',path:'/',minus:false},
                   {name:'关注',path:'/newsFollow',minus:false},
                   {name:'视频',path:'/xiGua' ,minus:false},
                   {name:'科技',path:'/news_tech' ,minus:false},
                   {name:'汽车',path:'/news_car' ,minus:false},
                   {name:'体育',path:'/news_sports',minus:false},
                   {name:'财经',path:'/news_finance',minus:false},
                   {name:'军事',path:'/news_military',minus:false},
                   {name:'文人',path:'/news_follow',minus:false},
                   {name:'蹦迪',path:'/news_video' ,minus:false},
                   {name:'科学',path:'/news_tech' ,minus:false},
                   {name:'社会',path:'/news_car' ,minus:false},
                   {name:'英语',path:'/news_sports',minus:false},
                   {name:'留学',path:'/news_finance',minus:false},
                   {name:'天文学',path:'/news_military',minus:false},
               ]
            }
        },
        watch:{
            minus(){
                for(var i=0;i<this.routerArr.length;i++){
                        this.routerArr[i].minus=this.minus;
                }
                this.$emit('monitor',this.routerArr);
            },
            arr(){
                this.routerArr=this.arr;
            }

        },
        computed: { //计算属性

        },
        methods: {
            //function 事件监听
            changNeed(){
                this.$emit('need',this.routerArr);
            },
            changChannelFigure(index){
                this.channelFigure=index;
            },
            navListScroll(){
                let offsetWidth=(this.routerArr.length*52); //展示允许可滑动的个数
                this.$refs.navUl.style.width= offsetWidth+'px';

                if(! this.navBarScroll){
                     this.navBarScroll = new BScroll(this.$refs.navBar,{
                         click:true,
                         scrollX:true
                     })
                }else {
                    this.navBarScroll.refresh();
                }
            }
        },
        mounted(){
           if(this.routerArr.length){
               this.$nextTick(()=>{
                   this.navListScroll();
               })
           }
        },
        beforeDestroy(){
            this.navBarScroll.destroy();
            this.navBarScroll=null;
        },
        components: {  //组件

        }
    }
</script>

<style lang="scss" scoped>
    .nav{
        position: relative;
        display: flex;
        padding: 10px 18px;
        width: 100%;
        height: 37px;
        @include  border-bottom(elebluck(.1));

        .nav-bar{
            flex: 1;
            overflow: hidden;
            .nav-ul{
                display: flex;

                .nav-list{
                    flex: 0 0 52px;
                    width: 52px;

                    &.active{
                        color: $t-red8;
                    }
                }
            }
        }
        .cross{
            flex: 1;
            display: inline-block;
            position: absolute;
            top: 0;
            right: 0;
            width: 37px;
            height: 37px;
            margin-right: 6px;
            background: $t-white;
            line-height: 37px;
            text-align: center;
            font-size: 20px;

            .fa-th-list{
                color: #f85959;
            }
        }
    }




</style>
