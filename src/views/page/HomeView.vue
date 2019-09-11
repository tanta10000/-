<template>
        <div class="home" ref="homeRef">

           <div class="home-main" ref="mainRef">
                <div class="main-content"  v-for="(item,index) in  getContentArr" :key="index">
                    <div class="content-text">
                       <div class="text-box">
                           <div class="text-title">
                               <p>
                                   <a @click="showPage(item.display_url)">
                                       {{item.title}}
                                   </a>
                               </p>
                           </div>
                           <div v-if="item.middle_image" class="text-picture">
                               <img class="picture-img" :src="item.middle_image.url">
                           </div>
                       </div>
                        <div class="text-comments">
                            <div>
                                <!-- item.user_info.avatar_url -->
                                 <img class="user_avatar" :src="getAvatarUrlArr[index]">
                            <span class="verified" v-if="getUserVerified[index]"></span>
                            </div>
                            <span class="istop" v-if="item.label=='置顶'">{{item.label}}</span>
                            <span class="name">{{item.media_name}}</span>
                            <span class="num">{{item.comment_count}}评论</span>
                            <span class="isNew">{{item.publish_time|getPublishTime}}</span>
                        </div>
                    </div>
                </div>
           </div>
            <transition name="trans-form">
                <ContentPage v-if="isPage" @closePage="closePage" :userId="userId" :getContentArr="getContentArr"> </ContentPage>
            </transition>
        </div>
</template>

<script>
    import {publishTime} from '../../js/tool'
    import  BScroll from 'better-scroll'
    import  ContentPage from '../../components/contentpage/ContentPage'
   // import Loading from "../../components/Loading/Loading";
    export default {
        name: "HomeView",
        props: {

        },
        data() {
            return {
                isPage:false,
                userId:0,
                contentArr: [],
                showLoading: true, // 显示loading
                url:'http://www.86y.org/images/loading.gif',
                avatarUrlArr:[],
                userVerified:[],
                userInfoArr:[]
            }
        },
        computed: { //计算属性
            getContentArr(){
               // console.log(this.contentArr);
                return this.contentArr;
            },
            getAvatarUrlArr(){
                return this.avatarUrlArr;
            },
            getUserVerified(){
                return this.userVerified;
            }
        },
        filters:{
            getPublishTime(time){
              let date=  publishTime(time);
              return date;
            }
        },
        methods: { //function 事件监听
            closePage(isPage){
                this.isPage=isPage;
            },
            showPage(id){
                this.userId=id;
                this.isPage= !this.isPage;
            },
            getTuoTiaoApi() {
                let dataRes = this.$http.get('/touApi/?count=20&min_behot_time=1504621638&bd_latitude=4.9E-324&bd_longitude=4.9E-324&bd_loc_time=1504622133&loc_mode=5&loc_time=1504564532&latitude=35.00125&longitude=113.56358166666665&city=%E7%84%A6%E4%BD%9C&lac=34197&cid=23201&iid=14534335953&device_id=38818211465&ac=wifi&channel=baidu&aid=13&app_name=news_article&version_code=460&device_platform=android&device_type=SM-E7000&os_api=19&os_version=4.4.2&uuid=357698010742401&openudid=74f06d2f9d8c9664');
                if (dataRes) {
                    dataRes.then((data) => {
                        let dataContent=data.data.data;
                           // console.log(dataContent);
                        this.contentArr= dataContent.filter((item)=>item.abstract!="")
                       // console.log(dataContent);
                        this.getImageloading(this.contentArr);
                    })
                }
            },
            homeWrapperScroll({y}){
                let bottomY=Math.abs(parseInt(y));
               let top= this.$refs.mainRef.offsetHeight;
               let height=top-bottomY-667;
                if(height<0||bottomY==0){
                    let max_behot_time=1478073762;
                    let last_refresh_sub_entrance_interval=Date.parse(new Date());
                   let dataRes= this.$http.get('/touApi/?count=20&min_behot_time='+max_behot_time+'&last_refresh_sub_entrance_interval='+last_refresh_sub_entrance_interval);
                    if (dataRes) {
                        dataRes.then((data) => {
                            this.contentArr = [...data.data.data];
                            this.getImageloading(this.contentArr);
                            // console.log(this.contentArr);
                        })
                    }
                }
            },
            getHomeScroll(){
                if(!this.homeScroll){
                    this.homeScroll=new BScroll(this.$refs.homeRef,{
                        click:true,
                        probeType: 2,
                    })
                   // this.box=this.$refs.homeRef;
                    this.homeScroll.on('scrollEnd', this.homeWrapperScroll);
                }else {
                    this.homeScroll.refresh();
                }
            },
            getImageloading(data){
                if(data.length>0||data!=null){
                    for(let i=0;i<data.length;i++){
                        this.avatarUrlArr[i]=this.url;
                        if((data[i].user_info==undefined)&&(data[i].user=undefined)){
                                    break;
                        }else {
                            if(data[i].user_info||data[i].user){
                                let {avatar_url,user_verified}=data[i].user_info||data[i].user; //解构赋值
                                // console.log(avatar_url,user_verified)
                                this.userVerified[i]=user_verified;
                                let newImg = new Image();
                                if(avatar_url){
                                    newImg.src = avatar_url;
                                    newImg.onerror = () => { // 图片加载错误时的替换图片
                                        newImg.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489486509807&di=22213343ba71ad6436b561b5df999ff7&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F77%2F31%2F20300542906611142174319458811.jpg'
                                    }
                                    newImg.onload = () => { // 图片加载成功后把地址给原来的img
                                        this.avatarUrlArr[i]= newImg.src
                                        this.avatarUrlArr=[...this.avatarUrlArr];
                                    }
                                }
                            }else {
                                break;
                            }
                        }
                    }
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                //console.log('我是home页面的mounted')
                this.getTuoTiaoApi();
                this.getHomeScroll();
            })
        },
        beforeDestroy(){
            this.homeScroll.destroy();
            this.homeScroll=null;
        },
        beforeRouteEnter (to, from, next) {
            console.log('在路由渲染前');
            next();
        },
        beforeRouteUpdate (to, from, next) {
            console.log('在当前路由改变，但是该组件被复用时调用');
            next();
        },

        beforeRouteLeave (to, from, next){
        console.log('导航离开该组件的对应路由时调用');
        next();
        },
        components: { //组件
           // Loading,
            ContentPage
        }
    }
</script>

<style lang="scss" scoped>
    .home{
        padding: 0 18px;
        width: 100%;
        height: 505px;
        overflow: auto;
    }
    .trans-form-enter,.trans-form-leave-to{
        transform: translateX(375px);
    }
    .trans-form-enter-active,.trans-form-leave-active{
        transition: all .3s linear;
    }
    .trans-form-enter-to,.trans-form-leave{
        transform: translateX(0px);
    }

    .main-content{
        padding: 8px 0px;
        @include  border-bottom(elebluck(.1));

        .content-text{
            .text-box{
                display: flex;
                .text-title{
                    flex: auto;
                    line-height: 20px;
                    font-size: 14px;
                    font-weight: 700;
                    font-family: "微软雅黑";
                    letter-spacing: 1px;
                    margin-bottom: 8px;
                }
                .text-picture{
                    display: flex;
                    flex-direction: row;
                    .picture-img{
                        width: 120px;
                        height: 80px;
                        margin: 0px 4px;
                    }
                }
            }
            .text-comments{
                position: relative;
                display: flex;
                justify-items: auto;
                width: 100%;
                height: 24px;
                line-height: 24px;
                font-size: 12px;
                font-family: "幼圆";
                color: #999;

                .user_avatar{
                    flex: 0 0 20px;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    margin-right: 5px;
                }
                .verified{
                    position: absolute;
                    left: 13px;
                    top: 2px;
                    width: 18px;
                    height: 18px;
                    background-image: url("../../../public/image/video/alu.png");
                    background-size: 10px;
                    background-repeat: no-repeat;
                    background-position: 2px 9px;
                    border-radius: 50%;

                }
                .istop{
                    padding-left: 5px;
                    color: $t-red8;
                    margin-right: 8px;
                }
                .name{
                    padding-left: 8px;
                    margin-right: 8px;

                }
                .num{
                    padding-left: 8px;
                    margin-right: 8px;
                }
                .isNew{

                }

            }


        }

    }


</style>
