<template>
    <div class="content-page">
        <div class="header">
            <span class="go-back" @click="closeContent"></span>
            <span class="title">即时看新闻</span>
            <router-link to="/search" tag="div" class="search-div">
                <span class="search">
                </span>
            </router-link>
            <span class="move" @click="showShare"></span>
        </div>
        <div ref="conRef" class="content-main">
            <div>
                <div class="main">
                    <div class="m-title">
                        <p>{{textContentArrList.title}}</p>
                    </div>
                    <div class="user-info">
                        <div class="user-portrait"> <!-- textContentArrList.media_user.avatar_url -->
                         <img class="price" :src="av_url" alt="">
                            <span class="icon"></span>
                        </div>
                        <div class="user-source">
                            <div class="source-name">{{textContentArrList.detail_source}}</div>
                            <div class="source-article">
                                <span class="is-original">原创</span>
                                <span class="time">{{textContentArrList.publish_time|getPublishTime}}</span>
                            </div>
                        </div>
                        <div class="user-remarks">
                            <p v-if="textContentArrList.media_user">

                           {{textContentArrList.media_user.user_auth_info===""?'':textContentArrList.media_user.user_auth_info.auth_info}}
                            </p>
                        </div>
                        <div class="user-follow">
                            <span class="follow" :class="{active:getFollowWord}" @click="getFollow(textContentArrList.media_user.id)">{{getFollowWord ?'已关注':'关注'}}</span>
                        </div>
                    </div>
                    <div class="text-content">
                        {{textContentArrList.content}}
                    </div>
                </div>
                <div class="footer">
                    <span class="read-num">{{textContentArrList.impression_count|getReadNumber}} </span>
                    <div class="footer-comment-content">
                        <div class="comment-content" v-for="(item,index) in textCommentList" :key="index">
                            <div class="comment-left">
                                <img class="portrait-url" :src="getAvatarUrlArr[index]" >
                                <span class="verified"></span>
                            </div>
                            <div class="comment-right">
                                <div class="user-id">
                                  <span class="u-id">{{getUserVerified[index]}}</span>
                                    <span class="u-count"> <i class="fa fa-thumbs-o-up fa-lg"></i> {{item.digg_count}} </span>
                                </div>
                                <div class="comm-text">
                                    <p>{{item.text}}</p>
                                </div>
                                <div class="comm-time">
                                    <span class="time">{{item.create_time|getCommentTime}}</span>
                                    <span class="reply">回复</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="send-message">
            <div class="send-left">
               <div class="left">
                   <span class="l-icon"></span>
                   <input class="left-icon" type="text" placeholder="写评论...">
               </div>
            </div>
            <div class="send-right">
                <span class="r-icon r-1"></span>
                <span class="icon">{{textContentArrList.comment_count}}</span>
                <span class="r-icon r-2"></span>
                <span class="r-icon r-3"></span>
                <span class="r-icon r-4" @click="showShare"></span>
            </div>
        </div>
        <transition name="share">
        <Share v-if="isShare"></Share>
        </transition>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {publishTime, readNumber, commentTime} from '../../js/tool'
    import  Share from '../Share/Share'
    import  {mapGetters,mapState} from  'vuex'
    import {UPDATE_IS_SHARE} from  '@/store/mutation-type'
    import  followLoad from '../../js/localstorage/followlocalding'
    export default {
        name: "ContentPage",
        props: {
            userId: String,
            getContentArr:Array
        },
        data() {
            return {
                isPage: false,
                textContentArr: {},
                textComment: {},
                url:'http://www.86y.org/images/loading.gif',
                avatarUrlArr:[],
                userVerified:[],
                av_url:'http://www.86y.org/images/loading.gif',
                followWord:false
            }
        },
        computed: { //计算属性
            ...mapState(['isShare']),
            ...mapGetters(['getIsShare']),
            textContentArrList() {
                return this.textContentArr;
            },
            textCommentList() {
                return this.textComment;
            },
            getAvatarUrlArr(){
                return this.avatarUrlArr;
            },
            getUserVerified(){
                return this.userVerified;
            },
            getFollowWord() {
                return this.followWord;
            }
        },
        filters: {
            getPublishTime(time) {
                let date = publishTime(time);
                return date;
            },
            getReadNumber(num) {
                return readNumber(num);
            },
            getCommentTime(time) {
                return commentTime(time)
            }

        },
        methods: {  //function 事件监听
            showShare(){
                this.$store.commit(UPDATE_IS_SHARE);
            },
            closeContent() {
                this.$emit('closePage', this.isPage);
            },
            getFollow(data){
                this.followWord=!this.followWord;
                console.log(this.followWord);
                if(this.followWord){
                    if(this.getContentArr!=null||this.getContentArr.length>0){
                        for(var i=0;i<this.getContentArr.length;i++){
                            let item=this.getContentArr[i];
                            if(item.user_info!==undefined){
                                if(item.user_info.user_id===parseInt(data)){  //判断 点击关注的用户是不是当前的这名用户 是则添加
                                    //添加前在判断本地存储里是否已经添加过该用户了 如果已添加 过该用户  则不再往里添加  否则在往里添加
                                    //1、先取出本地数据 用于判断是否已存在
                                    let list=followLoad.fetchFollow();
                                    console.log(list)  //如果是第一次关注则直接添加到本地存储
                                    if(list.length==0){
                                        followLoad.saveFollow({...item.user_info,fans:20000 ,isFollow:true});

                                    }else {
                                        let result=list.filter((i)=>{(i.user_id||i.id)===item.user_info.user_id})
                                        console.log(result);
                                        if(result.length!=0){ //没有就往里添加新的对象
                                            followLoad.saveFollow({...item.user_info,fans:20000 ,isFollow:true});
                                            console.log(followLoad.fetchFollow())
                                        }else { //存在就更新对象

                                            followLoad.saveFollow(list);
                                            console.log(followLoad.fetchFollow())
                                        }
                                    }
                                }
                            }
                            if(item.user!==undefined){
                                if(item.user.id===parseInt(data)){
                                    let list=followLoad.fetchFollow();
                                    if(list.length==0){
                                        followLoad.saveFollow({...item.user,fans:20000 ,isFollow:true});
                                    }else {
                                        let result=list.filter((i)=>{(i.user_id||i.id)===item.user.id})
                                        console.log(result);
                                        if(result.length==0){
                                            followLoad.saveFollow({...item.user,fans:20000 ,isFollow:true});
                                        }else {
                                            followLoad.saveFollow(list);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }else {
                   let arr= followLoad.fetchFollow();
                      console.log(arr);
                      let num= parseInt(data);
                      console.log(num);
                      arr=  arr.filter((item)=>( item.user_id||item.id)!==num); //判断将要删除的项是不是相等的如果相等则删除掉
                      if(arr.length==0){ //表明第一次添加并且第一次就删除
                          followLoad.saveFollow(arr);
                          console.log(followLoad.fetchFollow());
                      }else {
                          followLoad.saveFollow(arr);
                          console.log(followLoad.fetchFollow());
                      }
                }
            },
            getContentApi() {
                let reg = /[1-9][0-9]*/g;
                let num = this.userId.match(reg)[0];
                let dataRes = this.$http.get('/api/i' + num + '/info/?_signature=EiiK2RAZT0XXTdJUii1yXxIois&i=' + num + '');
                dataRes.then((data) => {
                    let contentData  = data.data.data;
                    let strRep=  contentData.content.replace(/<([a-zA-Z]+)\s*[^><]*>/g,"<$1>");
                    let text=strRep.replace(/<\/?[a-zA-Z]+[^><]*>/g,"");
                    this.$set(contentData,'content',text);
                    if(typeof contentData.media_user.user_auth_info!=="object"){
                            this.$set(contentData.media_user,'user_auth_info',"");
                    }
                    //未认证的个人或企业是不存在 user_auth_info的 user_auth_info 等于null
                   // console.log(this.textContentArr.media_user.user_auth_info.auth_info);
                    let newImg = new Image();
                    let avatar_url=contentData.media_user.avatar_url;
                    if(avatar_url){
                        newImg.src = avatar_url;
                        newImg.onerror = () => { // 图片加载错误时的替换图片
                            newImg.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489486509807&di=22213343ba71ad6436b561b5df999ff7&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F77%2F31%2F20300542906611142174319458811.jpg'
                        }
                        newImg.onload = () => { // 图片加载成功后把地址给原来的img
                            this.av_url= newImg.src
                            // console.log(contentData);
                            this.textContentArr=contentData;
                        }
                    }
                })
                let dataHttp = this.$http.get('/tuoTiao/list/?group_id=' + num + '&item_id=' + num + '&offset=5&count=10');
                dataHttp.then((data) => {
                    this.textComment = data.data.data.comments;
                    //console.log(this.textComment);
                    this.getImageloading(this.textComment);
                   // console.log(this.textComment);
                })
            },
            getImageloading(data){
                if(data.length>0||data!=null){
                    data.forEach((item,index)=>{
                        this.avatarUrlArr[index]=this.url;
                        let {avatar_url,name}=item.user; //解构赋值
                        this.userVerified[index]=name;
                        let newImg = new Image();
                        if(avatar_url){
                            newImg.src = avatar_url;
                            newImg.onerror = () => { // 图片加载错误时的替换图片
                                newImg.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489486509807&di=22213343ba71ad6436b561b5df999ff7&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F77%2F31%2F20300542906611142174319458811.jpg'
                            }
                            newImg.onload = () => { // 图片加载成功后把地址给原来的img
                                this.avatarUrlArr[index]= newImg.src;
                                this.avatarUrlArr=[...this.avatarUrlArr];
                            }
                        }
                    })
                }
            },
            getContentScroll() {
                if (!this.contentRefScroll) {
                   // console.log(this.$refs.conRef);
                    this.contentRefScroll=new BScroll(this.$refs.conRef,{
                        click:true,
                        probeType: 2,
                        stopPropagation: true

                    })
                } else {
                    this.contentRefScroll.refresh();
                }
            }
        },
        mounted() {
            /* 多用于初次数据加载请求时使用
            原来，mounted阶段，DOM结构准备就绪，但是这里的准备就绪需要特别说明一下：
              DOM结构已经出来了，但是如果在DOM结构中的某个DOM节点使用了v-if、v-show或者v-for
            （即根据获得的后台数据来动态操作DOM，即响应式），那么这些DOM是不会再mounted阶段找到的。
            */
            this.$nextTick(() => {
                this.getContentApi();
            })
        },
        updated(){
            this.$nextTick(()=>{
                this.getContentScroll();
            })
        },
        beforeDestroy() {
            this.contentRefScroll.destroy();
            this.contentRefScroll = null;
        },
        components: {  //组件
            Share
        }
    }
</script>

<style lang="scss" scoped>

    .content-page {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 30px 14px 12px 14px;
        background: $t-white;
        z-index: 29;
        overflow: auto;
    }
    .share-enter,.share-leave-to{
       // transform: scale(.5);
       // transform: translateY(0px);
       //  opacity: 0;
    }
    .share-enter-active,.share-leave-active{
        transition: all .1s linear;
    }
    .share-enter-to,.share-leave{
       // transform: scale(1);
      //  transform: translateY(700px);
       //  opacity: 1;
    }

    .header {
        display: flex;
        width: 100%;
        height: 37px;
        line-height: 37px;
        vertical-align: middle;
        @include border-bottom(elebluck(.1));

        .go-back {
            flex: 0 0 50px;
            background-image: url("../../../public/image/page/aip.png");
            background-size: 20px;
            background-repeat: no-repeat;
            background-position: 5px 8px;
        }

        .title {
            flex: 0 0 180px;
            margin: 0px 5px;
            text-align: center;
            font-size: 16px;
            font-weight: 700;
            vertical-align: top;
            letter-spacing: 2px;
        }
        .search-div{
            flex: 0 0 70px;
            width: 70px;
            height: 37px;
            .search {
                display: inline-block;
                width: 70px;
                height: 37px;
                background-image: url("../../../public/image/page/a94.png");
                background-size: 38px;
                background-repeat: no-repeat;
                background-position: 20px 0px;
            }

        }
        .move {
            flex: 0 0 30px;
            background-image: url("../../../public/image/page/bb2.png");
            background-size: 20px;
            background-repeat: no-repeat;
            background-position: 5px 15px;
        }
    }

    .content-main {
        width: 100%;
        height: 550px;
        overflow: auto;
    }

    .main {
        margin-top: 18px;
        .m-title {
            margin-bottom: 18px;
            p {
               // margin: 18px 0px;
                font-size: 17pt;
                font-weight: 700;
                letter-spacing: 2px;
                line-height: 30px;
            }
        }

        .user-info {
            display: flex;
            margin-bottom: 20px;

            .user-portrait {
                flex: 0 0 40px;
                position: relative;
                margin-right: 10px;

                .price {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }

                .icon {
                    position: absolute;
                    right: -4px;
                    bottom: 2px;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    @include background-image(16px, 0px 0px);
                }
            }

            .user-source {
                flex: auto;
                display: flex;
                flex-direction: column;

                .source-name {
                    flex: 1;
                    margin-bottom: 5px;
                    font-size: 14px;
                    line-height: 20px;
                    font-weight: 700;
                    letter-spacing: 1px;
                }

                .source-article {
                    flex: 1;

                    .is-original {
                        margin-right: 5px;
                        padding: 0px 2px;
                        font-size: 9px;
                        font-weight: 200;
                        letter-spacing: 1px;
                        border-radius: 4px;
                        color: #adaaaa;
                        border: 1px solid elebluck(.5);
                    }

                    .time {
                        margin-right: 5px;
                        padding: 0px 2px;
                        font-size: 11px;
                        font-weight: 200;
                        letter-spacing: 1px;
                        border-radius: 4px;
                        color: #adaaaa;
                    }
                }
            }

            .user-remarks {
                flex: auto;
                position: relative;
                width: 80px;
                overflow: hidden;
                p {
                    width: 80px;
                    position: absolute;
                    left: 0px;
                    bottom: 0px;
                    flex: auto;
                    font-size: 12px;
                    font-weight: 200;
                    color: #adaaaa;
                    vertical-align: text-bottom;
                    text-align: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }

            .user-follow {
                flex: 0 0 100px;
                text-align: center;
                line-height: 40px;

                .follow {
                    padding: 4px 12px;
                    font-size: 14px;
                    letter-spacing: 1px;
                    border-radius: 4px;
                    color: $t-white;
                    background: #f85959;
                    &.active{
                        color: elebluck(.4);
                        border: 1px solid elebluck(.1);
                        background:$t-white;
                    }

                }
            }
        }

        .text-content {
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 1px;
            line-height: 25px;
        }
    }

    .footer {
        margin-top: 10px;

        .read-num {
            display: inline-block;
            margin-bottom: 20px;
            font-size: 12px;
            font-weight: 200;
            color: #a5a4a4;
        }

        .footer-comment-content {
            padding: 12px 0px;

            .comment-content {
                display: flex;
                margin: 8px 0px;
            }
        }

        .comment-left {
            position: relative;
            flex: 0 0 50px;
            width: 50px;

            .portrait-url {
                width: 36px;
                height: 36px;
                border-radius: 50%;
            }

            .verified {
                position: absolute;
                top: 22px;
                right: -2px;
                display: inline-block;
                width: 24px;
                height: 24px;
                @include background-image(14px, 0px 0px);
            }
        }

        .comment-right {
            flex: 1;

            .user-id {
                position: relative;
                margin-bottom: 6px;
                height: 16px;
                font-size: 13px;
                line-height: 16px;

                .u-id {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    font-weight: 700;
                    font-family: "幼圆";
                    color: blue;

                }
                .u-count {
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    font-weight: 600;
                    color: #1b1b1b;
                    .fa{
                        color: #bbbaba;
                    }
                }
            }

            .comm-text {
                margin-bottom: 8px;
                p{
                    font-size: 14px;
                    line-height: 20px;
                    letter-spacing: 1px;
                }
            }
            .comm-time {
                font-size: 12px;
                height: 20px;
                line-height: 16px;

            }
        }
    }

    .send-message{
        position: fixed;
        left: 0px;
        right: 0px;
        bottom: 0px;
        display: flex;
        width: 100%;
        height: 45px;
        background: $t-white;
        .send-left{
            flex: 0 0 150px;
            width: 100px;
            padding: 5px 10px;
            .left{
                display: flex;
                border-radius: 25px;
                padding-right: 5px;
                .l-icon{
                    flex: 0 0 40px;
                    border-top-left-radius:25px ;
                    border-bottom-left-radius: 25px;
                    background: #d4d4d4a8;
                    @include  background-img('/image/page/b72.png',20px,10px 3px);
                }
                .left-icon{
                    display: inline-block;
                    width: 80px;
                    height: 30px;
                    border: 0px;
                    border-top-right-radius:25px ;
                    border-bottom-right-radius: 25px;
                    background: #d4d4d4a8;
                    outline:none;

                }
            }
        }
        .send-right{
            position: relative;
            flex: 1;
            justify-content: flex-end;
            display: flex;
            .icon{
                position: absolute;
                left: 35px;
                top: 8px;
                padding: 1px 3px;
                border-radius: 5px;
                font-size: 7pt;
                font-weight: 200;
                color: $t-white;
                background: red;
            }
            .r-icon{
                flex: 0 0 50px;
                margin-left:8px;
                width: 50px;
                height: 100%;
                &.r-1{
                    @include  background-img('/image/page/w1.png',22px,15px 10px);
                }
                &.r-2{
                    @include  background-img('/image/page/aq7.png',24px,15px 10px);
                }
                &.r-3{
                    @include  background-img('/image/page/aoz.png',22px,15px 10px);
                }
                &.r-4{
                    @include  background-img('/image/page/aox.png',24px,12px 10px);
                }
            }
        }
    }


</style>
