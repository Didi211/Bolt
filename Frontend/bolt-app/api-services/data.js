import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/api-services/DBConnection.js'
import router from "@/router"
import cookies from 'vue-cookies'
import { faWindows } from '@fortawesome/free-brands-svg-icons'


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        storeCards:[]
    },
    getters:{
        getStoreCard(state){
            return state.storeCards
        }
    },
    actions:{
        
    },
    mutations:{
        setStoreCards(state, cards){
            state.storeCards = cards
        }
    }
})