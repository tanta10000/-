<template>
    <div class="need">
        <div class="need-img">
            <img @click="closeNeed" class="icon-img" src="../../../public/image/iconpng/akx.png"
                                   alt="close"></div>
        <div ref="needList">
            <div>
                <div class="need-channel-add" ref="add">
                    <div class="row">
                        <span class="need-title">我的频道</span>
                        <span class="need-tag">点击进入频道</span>
                        <span class="need-edit" @click="changMinus">{{edit}}</span>
                    </div>
                    <div class="need-list">
                        <ul class="need-list-ul">
                            <li class="need-list-item"
                                v-for="(item ,index) in routerArr"
                                :key="index"
                                @click="delectNeed(item.minus,item.name,index)">
                                <router-link :to="item.path" tag="span"><i v-show="item.minus" class="fa fa-minus"></i>
                                    {{item.name}}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="need-channel-reduce" ref="reduce">
                    <div class="row">
                        <span class="need-title">推荐频道</span>
                        <span class="need-tag">点击添加频道</span>
                    </div>
                    <div class="need-list">
                        <ul class="need-list-ul">
                            <li class="need-list-item"
                                v-for="(item ,index) in needArray"
                                :key="index"
                            @click="addNedd(item.minus,item.name,index)">
                                <router-link :to="item.path" tag="span"><i class="fa fa-plus"></i> {{item.name}}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: "NeedOpenWindow",
        props: {
            //name:String
            need: {
                type: Boolean,
            },
            routerArr: {
                type: Array,
            }
        },
        data() {
            return {
                minus: false,
                edit: '编辑',
                needArray: [
                    {name: '菜谱', path: '/', minus: false},
                    {name: '三农', path: '/news_follow', minus: false},
                    {name: '收藏', path: '/news_video', minus: false},
                    {name: '读书', path: '/news_tech', minus: false},
                    {name: '音频', path: '/news_car', minus: false},
                    {name: '小说', path: '/news_sports', minus: false},
                    {name: '国风', path: '/news_finance', minus: false},
                    {name: '摄影', path: '/news_military', minus: false},
                    {name: '直播', path: '/news_follow', minus: false},
                    {name: '互联网', path: '/news_video', minus: false},
                    {name: '国际', path: '/news_tech', minus: false},
                    {name: '影视', path: '/news_car', minus: false},
                    {name: '宠物', path: '/news_sports', minus: false},
                    {name: '家居', path: '/news_finance', minus: false},
                    {name: '射击', path: '/news_military', minus: false},
                    {name: '平板', path: '/news_video', minus: false},
                    {name: '图片', path: '/news_tech', minus: false},
                    {name: '科普', path: '/news_car', minus: false},
                    {name: '房产', path: '/news_sports', minus: false},
                    {name: '时尚', path: '/news_finance', minus: false},
                    {name: '健康', path: '/news_military', minus: false},
                ]
            }
        },
        computed: { //计算属性

        },
        mounted() {
            this.$nextTick(() => {
                this.needScroll();
            })
        },
        beforeDestroy() {
            this.needListScrollRef.destroy();
            this.needListScrollRef = null;
        },
        methods: {
            //function 事件监听
            needScroll() {
                this.$refs.needList.style.height = 608 + 'px';
                if (!this.needListScrollRef) {
                    this.needListScrollRef = new BScroll(this.$refs.needList, {
                        click: true
                    })
                } else {
                    this.needListScrollRef.refresh();
                }
            },
            closeNeed() {
                this.$emit('need');
            },
            changMinus() {
                this.minus = !this.minus;
                if (this.minus) {
                    this.$emit('minus', this.minus);
                    this.edit = '完成'
                } else {
                    this.$emit('minus', this.minus);
                    this.edit = '编辑'
                }
            },
            delectNeed(minus,name,index) {
                if(minus){
                    let arr=   this.routerArr.filter( item => item.name===name);
                    this.routerArr.splice(index,1);
                    this.needArray=[...this.needArray,...arr];
                }else {
                    return
                }
            },
            addNedd(minus,name,index){
                let arr=   this.needArray.filter( item => item.name===name);
                console.log(arr);
                this.needArray.splice(index,1);
                this.$emit('addNeed',arr);
            }
        },
        components: {  //组件
            //someComponent
        }
    }
</script>

<style lang="scss" scoped>

    .need {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        button: 0;
        padding: 16px 12px 0px 12px;
        width: 100%;
        height: 100%;
        background: $t-white;
        z-index: 25;

        .need-img {
            position: fixed;
            top: 0px;
            left: 0px;
            right: 0;
            margin-bottom: 10px;
            padding: 18px 0px 10px 18px;
            width: 100%;
            height: 50px;
            background: $t-white;
            z-index: 26;

            .icon-img {
                width: 24px;
                height: 24px;
            }
        }

        .need-channel-add {
            margin-top: 24px;

        }

        .need-channel-add, .need-channel-reduce {
            .row {
                position: relative;
                margin-bottom: 8px;
                width: 100%;
                height: 37px;
                line-height: 37px;

                .need-title {
                    padding-right: 6px;
                    font-size: 14px;
                    font-weight: 700;
                }

                .need-tag {
                    font-size: 10px;
                    font-weight: 200;
                    color: #bbb;
                }

                .need-edit {
                    position: absolute;
                    top: 10px;
                    right: 6px;
                    padding: 3px 8px;
                    font-size: 12px;
                    font-weight: 700;
                    border: 1px solid $t-red8;
                    border-radius: 10px;
                    color: $t-red8;
                    line-height: 14px;
                }
            }

            .need-list-ul {

                .need-list-item {
                    display: inline-block;
                    padding: 10px 0px;
                    margin: 4px;
                    width: 22.5%;
                    font-size: 14px;
                    text-align: center;
                    vertical-align: middle;
                    background-color: #f8f8f8;
                    border-radius: 4px;
                }

            }


        }


    }


</style>
