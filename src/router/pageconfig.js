//import  from '../views/page/PersonalView'
import HomeView from '../views/page/HomeView'

export  default [
    {path:'/',name:'home',component:HomeView},
    {path:'/xiGua',name:'xiGua',component:()=> import('../views/page/XiGuaView')},
    {path:'/smallView',name:'smallView',component:()=> import('../views/page/SmallVideoView')},
    {path:'/personal',name:'personal',component:()=> import('../views/page/PersonalView')},
    {path:'/search',name:'search',component:()=> import('../views/search/SearchView')},

]