<template>
        <div class="content-spread" ref="spreadRef">
            <div v-html="getContentText"></div>
        </div>
</template>

<script>
  import  BScroll from  'better-scroll'
    export default {
        name: "SearchContentSpread",
        props: ['getContentText'],
        data() {
            return {
                msg: "Hello Vue.js"
            }
        },
        computed: { //计算属性

        },
        mounted(){
            this.$nextTick(()=>{
                this.getSpreadRef();
            })

        },
        methods: {  //function 事件监听
        getSpreadRef(){
            if(!this.spreadRefScroll){
                this.spreadRefScroll=new BScroll(this.$refs.spreadRef,{
                    click:true
                })
            }else {
                this.spreadRefScroll.refresh();
            }

        }
        },
        components: {  //组件

        }
    }
</script>

<style lang="scss" scoped>
.content-spread{
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0;
    bottom: 0;
    color: black;
    background: $t-white;
    z-index: 32;
}
/*.header{
    display: flex;
    width: 100%;
    height: 40px;
    background: $t-white;
    z-index: 50;
    .header-img{
        flex: 0 0 40px;
        height: 30px;
        height: 30px;
    }

}*/


</style>
