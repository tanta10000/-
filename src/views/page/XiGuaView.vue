<template>
    <div class="xigua">
        <div class="xigua-nav"> <!-- 导航-->
            <div class="xigua-div" ref="xiguanav">
                <ul class="nav-ul" ref="navul">
                    <li class="nav-item"
                        :class="{active:numberOption===index}"
                        v-for="(item,index) in optionArray"
                        :key="item.id"
                        @click="choiceOption(index,item.tag)">{{item.name}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="xigua-main" ref="xiguamain"> <!-- 内容 -->
            <div ref="maindiv"> <!--用于包含内容形成滚动 -->
                <div class="main-content" v-for="(item,index) in contentArr" :key="item.video_id">
                    <div class="main-content-box">
                        <div class="box-video">
                            <div class="video-box">
                                <span class="title">{{item.title}}</span>
                                <img class="display_icon" @click="pay_show(index)" src="../../../public/image/video/ben.png" alt="">
                                <span class="play-num">{{item.repin_count}}播放量</span>
                                <span class="play-time">{{ item.video_duration |changeTime }}</span>
                            </div>
                            <div v-show="chang_id===index?show=true:show=false" class="xigua-video">
                             <!--<video  controls width="375" height="210">
                                 <source  :src="urlArray[index]" type="video/mp4">
                             </video>-->
                               <iframe width="375" height="210" :src="urlArray[index]"></iframe>
                            </div>
                            <img class="video-img" :src="item.large_image_url" alt="">
                        </div>
                        <div class="box-person">
                            <div class="box-person-l">
                                <div class="person-l-box">
                                    <img class="portrait" :src="item.media_info.avatar_url">
                                    <img v-if="item.user_verified" class="verified"
                                         src="../../../public/image/video/alu.png" alt="">
                                </div>
                                <span class="media_name">{{item.media_info.name}}</span>
                                <span class="follow">关注</span>
                            </div>
                            <div class="box-person-r">
                                <span class="comment"></span>
                                <span class="num">{{item.digg_count}}</span>
                                <span class="more"></span>
                            </div>
                        </div>
                    </div>
                    <Division></Division>
                </div>
            </div>
        </div>
        <div class="cover">
        </div>
    </div>
</template>

<script>
    import Division from '../../components/Division/Division'
    import BScroll from 'better-scroll'
    import {getTemplateDate} from '../../js/tool'
    import  honey from  '../../js/algorithm/toutiao'

    export default {
        name: "XiGuaView",
        props: {
            //name:String
        },
        data() {
            return {
                show: false,
                content: null,
                contentArr: [],
                urlArray: [],
                chang_id: 0,
                numberOption: 0,
                optionArray: [
                    {name: '推荐', path: '/', id: 0,tag:'subv_broaden_view'},
                    {name: '音乐', path: '/', id: 1,tag:'subv_voice'},
                    {name: '搞笑', path: '/', id: 2,tag:'subv_funny'},
                    {name: '社会', path: '/', id: 3,tag:'subv_society'},
                    {name: '小品', path: '/', id: 4,tag:'subv_comedy'},
                    {name: '生活', path: '/', id: 5,tag:'subv_life'},
                    {name: '影视', path: '/', id: 6,tag:'subv_movie'},
                    {name: '娱乐', path: '/', id: 7,tag:'subv_entertainment'},
                    {name: '呆萌', path: '/', id: 8,tag:'subv_cute'},
                    {name: '游戏', path: '/', id: 9,tag:'subv_game'},
                    {name: '原创', path: '/', id: 10,tag:'subv_boutique'},
                    {name: '开眼', path: '/', id: 11,tag:'subv_broaden_view'}
                ]
            }
        },
        watch: { //计算属性
            contentArr(newValue) {
                //  window.btoa("test")；//"dGVzdA=="  //base64 转码
                // window.atob("dGVzdA==");//"test"   //base64 解码
                newValue.forEach((item, index) => {
                    let {video_id} = item
                    let str = 'video/urls/1/toutiao/mp4/' + video_id
                    this.$http.get('/videoApi/' + str).then(data => {
                        let base64 = data.data.data.video_list.video_1.main_url;
                        let url = window.atob(base64);
                       // console.log(url);
                        this.$set(this.urlArray, index, url)
                    })
                })
            }
        },
        filters: {
            changeTime(num) {
                let time = getTemplateDate(num);
                return time;
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.getVideoApi();
                this.optionScroll();
            })
        },
        beforeUpdate(){
          //  this.getXiguaMainScroll();
        },
        beforeDestroy() {
            this.xiGuaNav.destroy();
            this.xiGuaNav = null;
            this.xiguaMainScroll.destroy();
            this.xiguaMainScroll = null;
        },
        methods: { //function 事件监听
            pay_show(index){
                this.chang_id=index;
            },
           async choiceOption(index,tag) {
                this.numberOption = index;
                let as=honey.getHoney().as;
                let cp=honey.getHoney().cp;
                let urlStr='/xiGuaApi/list/?tag='+tag+'&ac=wap&count=20&format=json_raw&as='+as+'&cp='+cp+'min_behot_time=0&_signature=TqbCUgAAE8qLw5rf8gSOE06mwk&i='
                let res = await this.$http.get(urlStr);
                if(res.data.data){
                    this.contentArr = res.data.data
                }else {
                    this.contentArr=null;
                }

            },
           async homeWrapperScroll({y}){
                let bottomY=Math.abs(parseInt(y));
                let top= this.$refs.maindiv.offsetHeight;
                let height=top-bottomY-667;
                if(height<0||bottomY==0){
                    let as=honey.getHoney().as;
                    let cp=honey.getHoney().cp;
                    let urlStr='/xiGuaApi/list/?tag=subv_broaden_view&ac=wap&count=20&format=json_raw&as='+as+'&cp='+cp+'min_behot_time=0&_signature=TqbCUgAAE8qLw5rf8gSOE06mwk&i='
                    let res = await this.$http.get(urlStr);
                    if(res.data.data){
                        this.contentArr = [...res.data.data];
                    }else {
                        this.contentArr=null;
                    }
                }
            },
            optionScroll() {
                let offsetWidth = this.optionArray.length * 52
                this.$refs.navul.style.width = offsetWidth + 'px'
                if (!this.xiGuaNav) {
                    this.xiGuaNav = new BScroll(this.$refs.xiguanav, {
                        click: true,
                        scrollX: true
                    })
                } else {
                    this.xiGuaNav.refresh();
                }
            },
            async getVideoApi() {
                let as=honey.getHoney().as;
                let cp=honey.getHoney().cp;
                let urlStr='/xiGuaApi/list/?tag=subv_broaden_view&ac=wap&count=20&format=json_raw&as='+as+'&cp='+cp+'min_behot_time=0&_signature=TqbCUgAAE8qLw5rf8gSOE06mwk&i='
                let res = await this.$http.get(urlStr);
                console.log(res.data);
                if (res.data.data) {
                    this.contentArr = res.data.data
                } else {
                    this.contentArr = null;
                }
                this.getXiguaMainScroll();

            },
            getXiguaMainScroll(){
                if (this.contentArr.length) {
                    let offsetHeight = this.contentArr.length * 270;
                    this.$refs.maindiv.style.height = offsetHeight + 'px';
                    if (!this.xiguaMainScroll) {
                        this.xiguaMainScroll = new BScroll(this.$refs.xiguamain, {
                            click: true
                        })
                        this.xiguaMainScroll.on('scrollEnd', this.homeWrapperScroll);
                    } else {
                        this.xiguaMainScroll.refresh();
                    }
                }

            }



        },
        components: {  //组件
            Division
        }
    }
</script>

<style lang="scss" scoped>
    .xigua {
        position: fixed;
        top: 75px;
        left: 0;
        right: 0;
        bottom: 50px;
        background: $t-white;

        .xigua-nav {
            position: fixed;
            top: 75px;
            left: 0;
            right: 0;
            padding: 10px 18px;
            width: 100%;
            height: 37px;
            border-bottom: 1px solid elebluck(.1);

            .xigua-div {
                padding: 0px 0px;
                overflow: hidden;
            }
        }

        .nav-ul {
            display: flex;

            .nav-item {
                flex: 0 0 52px;
                width: 52px;

                &.active {
                    color: $t-red8;
                }
            }
        }

        .xigua-main {
            margin-top: 37px;
            height: 500px;
            overflow: hidden;
        }
    }

    .main-content {
        width: 100%;
        height: 270px;

        .main-content-box {
            display: flex;
            flex-direction: column;
        }


        .box-video {
            flex: 1;
            position: relative;

            .xigua-video {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 50px;
            }

            .video-box {
                display: flex;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                padding: 12px 18px;

                flex-direction: column;
                color: $t-white;
                background: #2e2c2c7a;


                .title {
                    flex: 1;
                    width: 100%;
                    font-size: 16px;
                    line-height: 20px;

                }

                .display_icon {
                    flex: 0 0 60px;
                    position: absolute;
                    margin: 0 auto;
                    transform: translateY(80px) translateX(157px);
                    width: 60px;
                    height: 60px;
                }

                .play-num {
                    flex: 1;
                    position: absolute;
                    left: 18px;
                    bottom: 12px;
                    font-size: 12px;
                    font-weight: 200;

                }

                .play-time {
                    flex: 1;
                    position: absolute;
                    right: 18px;
                    bottom: 12px;
                    padding: 5px 8px;
                    font-size: 12px;
                    font-weight: 200;
                    border-radius: 25px;
                    background: rgba(7, 17, 27, 0.5);

                }
            }

            .video-img {
                width: 375px;
                height: 210px;
            }
        }

        .box-person {
            flex: 1;
            display: flex;
            padding: 8px 18px;
            width: 100%;
            height: 50px;

            .box-person-l {
                flex: 0 0 70%;
                display: flex;
                line-height: 34px;

                .person-l-box {
                    position: relative;
                    flex: 0 0 34px;
                    width: 34px;
                    height: 34px;

                    .portrait {
                        width: 34px;
                        height: 34px;
                        border-radius: 50%;
                    }

                    .verified {
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        width: 14px;
                        height: 14px;
                    }
                }

                .media_name {
                    flex: 1;
                    margin-left: 5px;
                    font-size: 12px;
                    font-weight: 700;
                }

                .follow {
                    flex: 1;
                    padding-left: 10px;
                    font-size: 12px;
                    font-weight: 700;
                    color: $t-red8;
                }
            }

            .box-person-r {
                flex: 1;
                display: flex;
                line-height: 34px;

                .comment {
                    flex: 0 0 34px;
                    width: 34px;
                    height: 34px;
                    background-image: url("../../../public/image/video/bl_.png");
                    background-position: 5px 8px;
                    background-repeat: no-repeat;
                    background-size: 18px;
                }

                .num {
                    flex: 1;
                    padding-left: 10px;
                    font-size: 12px;

                }

                .more {
                    flex: 0 0 34px;
                    width: 34px;
                    height: 34px;
                    background-image: url("../../../public/image/video/bb2.png");
                    background-position: 10px 12px;
                    background-repeat: no-repeat;
                    background-size: 18px;


                }


            }

        }
    }

    .cover {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(12, 13, 13, 0.8);
        filter: blur(5px);
        z-index: 30;

    }


</style>
