import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/pages/Homepage'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import PageNotFound from '@/pages/PageNotFound'
import Basket from '@/pages/Basket'
import Search from '@/pages/Search'
import Store from '@/pages/Store'
import Customer from '@/pages/Customer'
import Deliverer from '@/pages/Deliverer'
import StoreMenu from '@/pages/StoreMenu'

Vue.use(Router)

const router = new Router({
    routes:[
        {
            path:'/',
            name: 'Homepage',
            component: Homepage
            // beforeEnter(to, from, next){
            //     let tip = Vue.$cookies.get("tip")
            //     if(tip === 'A'){
            //         next({name: 'AdminHomePage'});
            //     }
            //     else if(tip === 'M'){
            //         next({name: 'MusterijaHomePage'})
            //     }
            //     else if(tip === 'R'){
            //         next({name: 'RadnikHomePage'})
            //     }
            //     else{
            //         next();
            //     }
            // }
        },
        {
            path:'/Login',
            name: 'Login',
            component: Login
            // beforeEnter(to, from, next){
            //     let tip = Vue.$cookies.get("tip")
            //     if(tip === 'A'){
            //         next({name: 'AdminHomePage'});
            //     }
            //     else if(tip === 'M'){
            //         next({name: 'MusterijaHomePage'})
            //     }
            //     else if(tip === 'R'){
            //         next({name: 'RadnikHomePage'})
            //     }
            //     else{
            //         next();
            //     }
            // }
        },
        {
            path:'/Register',
            name: 'Register',
            component: Register
            // beforeEnter(to, from, next){
            //     let tip = Vue.$cookies.get("tip")
            //     if(tip === 'A'){
            //         next({name: 'AdminHomePage'});
            //     }
            //     else if(tip === 'M'){
            //         next({name: 'MusterijaHomePage'})
            //     }
            //     else if(tip === 'R'){
            //         next({name: 'RadnikHomePage'})
            //     }
            //     else{
            //         next();
            //     }
            // }
        },
        {
            path:'/Basket',
            name: 'Basket',
            component: Basket
        },
        {
            path:'/Search',
            name: 'Search',
            component: Search
        },
        {
            path:'/Store',
            name: 'Store',
            component: Store
        },
        {
            path:'/Customer',
            name: 'Customer',
            component: Customer
        },
        {
            path:'/Deliverer',
            name: 'Deliverer',
            component: Deliverer
        },
        {
            path:'/StoreMenu',
            name: 'StoreMenu',
            component: StoreMenu
        },
        // {
        //     path: '/401',
        //     name: 'PageNotAuthenticated',
        //     component: PageNotAuthenticated
        // },
        {
            path: '*',
            name: 'PageNotFound',
            component: PageNotFound
        }
    ],
    mode: 'history'
})

export default router