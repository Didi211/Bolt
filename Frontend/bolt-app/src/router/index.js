import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/pages/Homepage'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import PageNotFound from '@/pages/PageNotFound'
import SearchPage from '@/pages/SearchPage'
import Store from '@/pages/Store'
import Customer from '@/pages/Customer'
import Deliverer from '@/pages/Deliverer'
import StoreMenu from '@/pages/StoreMenu'
import PageNotAuthenticated from '@/pages/PageNotAuthenticated'
import OrderHistory from '@/pages/OrderHistory'
import StoreChangeMenus from '@/pages/StoreChangeMenus'
import RecommendationPage from '@/pages/RecommendationPage'

Vue.use(Router)


const router = new Router({
    routes:[
        {
            path:'/',
            name: 'Homepage',
            component: Homepage,
            beforeEnter(to, from, next){
                let tip = Vue.$cookies.get("tip")
                if(tip === 'Customer'){
                    next({name: 'Customer'});
                }
                else if(tip === 'Store'){
                    next({name: 'Store'})
                }
                else if(tip === 'Deliverer'){
                    next({name: 'Deliverer'})
                }
                else{
                    next();
                }
            }
        },
        {
            path:'/Login',
            name: 'Login',
            component: Login,
            beforeEnter(to, from, next){
                let tip = Vue.$cookies.get("tip")
                if(tip === 'Customer'){
                    next({name: 'Customer'});
                }
                else if(tip === 'Store'){
                    next({name: 'Store'})
                }
                else if(tip === 'Deliverer'){
                    next({name: 'Deliverer'})
                }
                else{
                    next();
                }
            }
        },
        {
            path:'/Register',
            name: 'Register',
            component: Register,
            beforeEnter(to, from, next){
                let tip = Vue.$cookies.get("tip")
                if(tip === 'Customer'){
                    next({name: 'Customer'});
                }
                else if(tip === 'Store'){
                    next({name: 'Store'})
                }
                else if(tip === 'Deliverer'){
                    next({name: 'Deliverer'})
                }
                else{
                    next();
                }
            }
        },
        {
            path:'/SearchPage',
            name: 'SearchPage',
            component: SearchPage,
            beforeEnter(to, from, next){
                let tip = Vue.$cookies.get("tip")
                if(tip == 'Customer'){
                    next();
                }
                else{
                    next({name: 'PageNotAuthenticated'})
                }
            }
        },
        {
            path:'/RecommendationPage',
            name: 'RecommendationPage',
            component: RecommendationPage,
            beforeEnter(to, from, next){
                let tip = Vue.$cookies.get("tip")
                if(tip == 'Customer'){
                    next();
                }
                else{
                    next({name: 'PageNotAuthenticated'})
                }
            }
        },
        {
            path:'/Store',
            name: 'Store',
            component: Store,
            beforeEnter(to, from, next){
                let tip = Vue.$cookies.get("tip")
                if(tip == 'Store'){
                    next();
                }
                else{
                    next({name: 'PageNotAuthenticated'})
                }
            }
        },
        {
            path:'/StoreChangeMenus',
            name: 'StoreChangeMenus',
            component: StoreChangeMenus,
            beforeEnter(to, from, next){
                let tip = Vue.$cookies.get("tip")
                if(tip == 'Store'){
                    next();
                }
                else{
                    next({name: 'PageNotAuthenticated'})
                }
            }
        },
        {
            path:'/Customer',
            name: 'Customer',
            component: Customer,
            beforeEnter(to, from, next){
                let tip = Vue.$cookies.get("tip")
                if(tip == 'Customer'){
                    next();
                }
                else{
                    next({name: 'PageNotAuthenticated'})
                }
            }
        },
        {
            path:'/OrderHistory',
            name: 'OrderHistory',
            component: OrderHistory,
            beforeEnter(to, from, next){
                let tip = Vue.$cookies.get("tip")
                if(tip == 'Customer'){
                    next();
                }
                else{
                    next({name: 'PageNotAuthenticated'})
                }
            }
        },
        {
            path:'/Deliverer',
            name: 'Deliverer',
            component: Deliverer,
            beforeEnter(to, from, next){
                let tip = Vue.$cookies.get("tip")
                if(tip == 'Deliverer'){
                    next();
                }
                else{
                    next({name: 'PageNotAuthenticated'})
                }
            }
        },
        {
            path:'/StoreMenu/:id',
            name: 'StoreMenu',
            component: StoreMenu,
            props: true,
            beforeEnter(to, from, next){
                let tip = Vue.$cookies.get("tip")
                if(tip == 'Customer'){
                    next();
                }
                else{
                    next({name: 'PageNotAuthenticated'})
                }
            }
        },
        {
            path: '/401',
            name: 'PageNotAuthenticated',
            component: PageNotAuthenticated
        },
        {
            path: '*',
            name: 'PageNotFound',
            component: PageNotFound
        }
    ],
    mode: 'history'
})

export default router