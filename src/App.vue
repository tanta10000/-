<template>
  <div id="app">
    <Search></Search>
    <Nav @need="getNeed" @monitor="monitor" :minus="minus" :arr="routerArr"></Nav>
    <transition name="open-need">
      <NeedOpenWindow v-show="need" @need="closeNeed" @minus="updateMinus" @addNeed="addNeed" :routerArr="routerArr"></NeedOpenWindow>
    </transition>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
  import Search from "./components/Search/Search";
  import Nav from "./components/Nav/Nav";
  import NeedOpenWindow from "./views/needopenwindow/NeedOpenWindow";
  import Footer from "./components/Footer/Footer";

  export  default {
    name:'App',
    data:()=>({
      arr:[],
      minus:false,
      need:false,
      routerArr:[]
    }),
    methods:{
      closeNeed(){
        this.need=! this.need;
      },
      addNeed(arr){
        this.arr=arr;
        this.routerArr=[...this.routerArr,...this.arr];
      },
      monitor(routerArr){
        this.routerArr=routerArr;
      },
      getNeed(routerArr){
        this.need=! this.need;
        this.routerArr=routerArr;
      },
      updateMinus(minus){
        this.minus=minus;
      }
    },
    components:{
      Footer,
      Nav,
      Search,
      NeedOpenWindow

    }
  }

</script>

<style lang="scss">

  #app{

    .open-need-enter,.open-need-leave-to{
      transform: translateX(375px);
    }
    .open-need-enter-active,.open-need-leave-active{
      transition: all .3s linear;
    }
    .open-need-enter-to,.open-need-leave{
      transform: translateX(0px);
    }

  }

</style>
