<template>
    <div>
       <div class="search-content">
          <div class="header">
              <img class="go-back" @click="goBack" src="../../../public/image/search/aio.png" alt="">
              <div class="content-top">
                  <img class="search-icon" @click="clickLinkSearch(inputText)" src="//sf3-ttcdn-tos.pstatp.com/obj/card-system/HeadBar/dist_browser//images/search-icon-3x.3d8b4860.png" alt="">
                  <input type="text" v-focus class="search-inp" v-model.trim="inputText" @input="getSearch(inputText)" @keydown.enter="clickLinkSearch(inputText)" placeholder="请输入内容...按回车键">
                  <span class="search-cancel" v-show="getItemSearchIsShow" @click=" clickLinkSearch(inputText)">搜索</span>
                  <span class="search-cancel" v-show="getContainerIsShow" @click="cancelSearch">取消</span>
              </div>
          </div>
           <div class="search-item" v-show="getItemSearchIsShow">
                <div class="item-box">
                    <ul class="item-ul">
                        <li class="item-list" v-for="(item,index) in getKeyWordText" :key="index">
                            <img class="item-img-l" src="//sf3-ttcdn-tos.pstatp.com/obj/card-system/HeadBar/dist_browser//images/search-icon-3x.3d8b4860.png" alt="">
                            <a class="item-link" href="javascript:;" @click="clickLinkSearch(item.keyword)">{{item.keyword}}</a>
                            <img class="item-img-r" src="//sf3-ttcdn-tos.pstatp.com/obj/card-system/HeadBar/dist_browser//images/search-item-tip-3x.70e201f2.png" alt="">
                        </li>
                    </ul>
                </div>
           </div>
          <div class="container" v-show="getContainerIsShow">
              <div class="content-main">
                  <div class="main-record">
                      <a href="javascript:;" class="name">历史记录</a>
                      <a href="javascript:;" class="record-img" @click="clearHistoricalRecords">
                          <img src="//sf3-ttcdn-tos.pstatp.com/obj/card-system/HeadBar/dist_browser//images/delete-icon-3x.7e647b34.png" alt="">
                      </a>
                  </div>
                  <div class="main-content">
                      <ul class="record-ul">
                          <li class="record-list" v-for="(item,index) in getRecordList" :key="index">
                              <a href="javascript:;" @click="clickLinkSearch(item)">
                                  <!--<div v-html="getGuessTextList"></div>-->
                                  {{item}}
                              </a>
                          </li>
                      </ul>
                  </div>
              </div>
              <div class="content-footer">
                  <div class="footer-title">猜你想搜</div>
                  <section class="footer-box">
                      <a href="javascript:;" @click="clickLinkSearch(item.word,item.id,item.or)" class="item-list" v-for="(item,index) in getGuessTextList" :key="index">{{item.word}}</a>
                  </section>
              </div>
          </div>
       </div>
        <SearchContentSpread v-if="getIsShowContent" :getContentText="getContentText"></SearchContentSpread>
    </div>
</template>

<script>
        import  SearchContentSpread from '../../components/Search/SearchContentSpread'
        import localStore  from '../../js/localstorage/searchlocalltorage'
    export default {
        name: "SearchView",
        props: {

        },
        data() {
            return {
                isShowContent:false,
                isShow:true,
                contentText:'',
                inputText:'',
                guessTextList:[],//猜猜向搜list
                keyWordText:[],
                historicalRecordsKeyWord:'', //搜索的历史记录
                recordList:[]
            }
        },
        directives: { //定义自动获取焦点修饰符
            focus: {
                // 指令的定义
                inserted: function (el) {
                    el.focus()
                }
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.getSearchApi();
            })
        },
        watch:{
            inputText(){
                return this.inputText;
            },
            historicalRecordsKeyWord(newWord,oldWord){
                console.log("新的值："+newWord,'旧的值'+oldWord);
                if(newWord!=''||newWord!=null){
                    localStore.save(this.historicalRecordsKeyWord);
                }
            }
        },
        computed: { //计算属性
            getIsShowContent(){
                return this.isShowContent;

            },
            getGuessTextList(){ //获取推荐的项
                return this.guessTextList;
            },
            getContentText(){ //获取关键字搜索到的文本信息
                return this.contentText;
            },
            getItemSearchIsShow(){//打开关键字列表项
                return !this.isShow;
            },
            getContainerIsShow(){ //关闭猜猜想搜索
                return this.isShow;
            },
            getKeyWordText(){ //返回获取到的关键字列表
                return this.keyWordText;
            },
            getRecordList(){
                return this.recordList;
            }
        },
        methods: {  //function 事件监听
            goBack(){  //路由返回
                this.$router.go(-1);
            },
            cancelSearch(){
                this.inputText='';
                this.isShow=true;
            },
            clearHistoricalRecords(){ //情况本地存储 及清除浏览历史记录
                const ls = window.localStorage
                ls.clear();
                this.recordList=[];
            },
            getSearch(inputText){ //获取搜索的结果
                console.log(inputText);
               if(this.inputText==''||this.inputText==null){
                   this.isShow=true;
                   return
               }else {
                   this.isShow=false;
                    this.getKeyWordApi(inputText);
               }
            },
            getKeyWordApi(word){ //获取实时搜索的关键字并显示展出
              //  console.log(word);
                let api='/api/2/article/search_sug/?keyword='+word;
                let dataRes=this.$http.get(api);
                dataRes.then((data)=>{
                    this.keyWordText=data.data.data;
                   //  console.log(this.keyWordText);
                })
            },
            getSearchApi(){  //获取搜索关键字列表 展示猜你想搜
                let api='/api/search/suggest/initial_page/'
                let dataRes=this.$http.get(api);
                dataRes.then((data)=>{
                    this.guessTextList=data.data.data.suggest_word_list;
                })
                this.recordList=localStore.fetch();
               // console.log(this.recordList);
            },
            clickLinkSearch(word){
                this.historicalRecordsKeyWord=word;
                let api='/api/search/?keyword='+word+'&pd=synthesis&source=input&traffic_source=&original_source=&in_tfs=&in_ogs=';
                let dataRes=this.$http.get(api);
                dataRes.then((data)=>{
                    this.contentText=data.data;
                    this.isShowContent=true;
                   console.log(this.contentText);
                })
                this.recordList=localStore.fetch();
            }
        },
        components: {  //组件
            SearchContentSpread
        }
    }
</script>

<style lang="scss" scoped>
    .search-content{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 18px 12px 0px;
        background: $t-white;
        z-index: 30;

    }
    .item-ul{
        .item-list{
            display: flex;
            position: relative;
            width: 100%;
            height: 37px;

            @include  border-bottom(elebluck(.1));
            .item-img-l{
                flex: 0 0 30px;
                width: 30px;
                height: 30px;
                margin-left: 5px;
                margin-top: 5px;
            }
            .item-link{
                flex: 1;
                line-height: 37px;
            }
            .item-img-r{
                flex: 0 0 30px;
                position: absolute;
                top: 0;
                right: 0;
                width: 30px;
                height: 30px;
                margin-left: 5px;
                margin-top: 5px;
            }
        }
    }


    .header{
        display: flex;
        margin-bottom: 18px;
    }
    .go-back{
        flex: 0 0  40px;
        margin-top: 4px;
        padding-top: 5px;
        padding-left: 5px;
        width: 30px;
        height: 30px;
    }
    .content-top{
        flex: 1;
        display: flex;
        width: 100%;
        height: 44px;
        border-radius: 5px;
        background: #f1f3f5;
        .search-icon{
            width: 30px;
            height: 30px;
            margin: 8px 0 0 4px;
            line-height: 44px;
        }
        .search-inp{
            flex: 1;
            margin: 0;
            padding: 0;
            border: none;
            font-size: 16px;
            line-height: normal;
            color: #222;
            background: none;
            outline: none;
            -webkit-appearance: none;
            user-select: text;
            caret-color: #ff373c;

        }
        .search-cancel{
            position: relative;
            width: 60px;
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 16px;
            color: #222;
            text-decoration: none;
            background-color: initial;
            -webkit-tap-highlight-color: transparent;
            &:after{
                content: "";
                pointer-events: none;
                position: absolute;
                top: 50%;
                left: 0;
                height: 14px;
                border-left: 1px solid #b5babd;
                -webkit-transform: scaleX(.5) translateY(-50%);
                transform: scaleX(.5) translateY(-50%);
            }
        }
    }
    .container{
        padding-top: 12px;

    }

    .content-main{
        padding-bottom: 12px;
        border-bottom: 1px solid #99999926;
        .main-record{
            position: relative;
            justify-content: space-between;
            height: 40px;
            color: #999;
            font-size: 14px;
            line-height: 20px;
            margin-top: 2px;
            .name{
                flex: 1;
                color: #999;
            }
            .record-img{
                position: absolute;
                top: 0;
                right: 0;
                display: inline-block;
                width: 16px;
                height: 16px;
                cursor: pointer;
                img{
                    width: 16px;
                    height: 16px;

                }
            }
        }
        .main-content{
            width: 100%;
            height: 100%;
            .record-ul{
                width: 100%;
                height: 100%;
            .record-list{
                display: inline-block;
                width: 50%;
                padding: 0px 5px;
                margin-bottom: 18px;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            }


        }


    }
    .content-footer{
        .footer-title{
            margin-bottom: 18px;
            color: #999;
        }
        .footer-box{
            width: 100%;
            height: 100%;
            .item-list{
                position: relative;
                display: inline-block;
                width: 43%;
                padding-right:  10px;
                margin-right: 20px;
                margin-bottom: 18px;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                &:after{
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    display: inline-block;
                    content: "";
                    width: 12px;
                    height: 12px;
                    @include background-img('//sf3-ttcdn-tos.pstatp.com/obj/card-system/HeadBar/dist_browser//images/tag_rec-3x.6824739a.png',12px,0px 0px);

                }
            }
        }


    }









</style>
