import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/api-services/DBConnection.js'
import router from "@/router"
// import cookies from 'vue-cookies'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        trenutniKorisnik: null,
        osobaID: null,
        token: null,
        tip: null,
        orderHistory:[],
        allStores:[],
        pickedStore: null, //id izabranog restorana
        mealsFromStore: [],
        store: null,
    },
    getters:{
        getOrderHistory(state){
            return state.orderHistory
        },
        getAllStores(state){
            return state.allStores
        },
        getPickedStore(state){
            return state.pickedStore
        },
        getAllMealsFromStore(state){
            return state.meals
        },
        getStore(state){
            console.log(state.store)
            return state.store
        },
    },
    actions:{
        async registerDeliverer({commit}, registerInfo){
            return await Api().post('/api/register/deliverer', registerInfo).then((res)=>{
                const trenKorisnik = res.data.user
                const trenToken = res.data.webtoken
                commit('setKorisnik', trenKorisnik)
                commit('setToken', trenToken)
                Vue.$cookies.set("id",this.state.trenutniKorisnik.uuid,"1h");
                Vue.$cookies.set("token",this.state.token,"1h");
                Vue.$cookies.set("tip",this.state.trenutniKorisnik.role,"1h");
                // commit('setToken', Vue.$cookies.get("token"))
                commit('setTip', Vue.$cookies.get("tip"))
                commit('setOsobaID', Vue.$cookies.get("id"))
                router.push("/Deliverer")
            }).catch(()=>{
                Vue.toasted.show("Već postoji korisnik sa tim username-om!", { 
                    theme: "bubble", 
                    position: "top-center", 
                    duration : 2000
               })
            })
        },
        async registerCustomer({commit}, registerInfo){
            console.log(registerInfo)
            return await Api().post('/api/register/customer', registerInfo).then((res)=>{
                // const trenutniKorisnik = res.data
                // commit('setKorisnik', trenutniKorisnik)
                // Vue.$cookies.set("id",this.state.trenutniKorisnik.user.uuid,"1h");
                // Vue.$cookies.set("token",this.state.trenutniKorisnik.webtoken,"1h");
                // Vue.$cookies.set("tip",this.state.trenutniKorisnik.user.role,"1h");
                // commit('setToken', Vue.$cookies.get("token"))
                // commit('setTip', Vue.$cookies.get("tip"))
                // commit('setOsobaID', Vue.$cookies.get("id"))
                const trenKorisnik = res.data.user
                const trenToken = res.data.webtoken
                commit('setKorisnik', trenKorisnik)
                commit('setToken', trenToken)
                Vue.$cookies.set("id",this.state.trenutniKorisnik.uuid,"1h");
                Vue.$cookies.set("token",this.state.token,"1h");
                Vue.$cookies.set("tip",this.state.trenutniKorisnik.role,"1h");
                // commit('setToken', Vue.$cookies.get("token"))
                commit('setTip', Vue.$cookies.get("tip"))
                commit('setOsobaID', Vue.$cookies.get("id"))
                router.push("/Customer")
            }).catch(()=>{
                Vue.toasted.show("Već postoji korisnik sa tim username-om!", { 
                    theme: "bubble", 
                    position: "top-center", 
                    duration : 2000
               })
            })
        },
        async registerStore({commit}, registerInfo){
            return await Api().post('/api/register/store', registerInfo).then((res)=>{
                // const trenutniKorisnik = res.data
                // commit('setKorisnik', trenutniKorisnik)
                // Vue.$cookies.set("id",this.state.trenutniKorisnik.user.uuid,"1h");
                // Vue.$cookies.set("token",this.state.trenutniKorisnik.webtoken,"1h");
                // Vue.$cookies.set("tip",this.state.trenutniKorisnik.user.role,"1h");
                // commit('setToken', Vue.$cookies.get("token"))
                // commit('setTip', Vue.$cookies.get("tip"))
                // commit('setOsobaID', Vue.$cookies.get("id"))
                const trenKorisnik = res.data.user
                const trenToken = res.data.webtoken
                commit('setKorisnik', trenKorisnik)
                commit('setToken', trenToken)
                Vue.$cookies.set("id",this.state.trenutniKorisnik.uuid,"1h");
                Vue.$cookies.set("token",this.state.token,"1h");
                Vue.$cookies.set("tip",this.state.trenutniKorisnik.role,"1h");
                // commit('setToken', Vue.$cookies.get("token"))
                commit('setTip', Vue.$cookies.get("tip"))
                commit('setOsobaID', Vue.$cookies.get("id"))
                router.push("/Store")
            }).catch(()=>{
                Vue.toasted.show("Već postoji korisnik sa tim username-om!", { 
                    theme: "bubble", 
                    position: "top-center", 
                    duration : 2000
               })
            })
        },
        async loginKorisnik({commit},loginInfo){
            await Api().post('/api/login', loginInfo).then(res=>{
                // const trenutniKorisnik = res.data
                // commit('setKorisnik', trenutniKorisnik)
                // Vue.$cookies.set("id",this.state.trenutniKorisnik.user.uuid,"1h");
                // Vue.$cookies.set("token",this.state.trenutniKorisnik.webtoken,"1h");
                // Vue.$cookies.set("tip",this.state.trenutniKorisnik.user.role,"1h");
                // commit('setToken', Vue.$cookies.get("token"))
                // commit('setTip', Vue.$cookies.get("tip"))
                // commit('setOsobaID', Vue.$cookies.get("id"))
                const trenKorisnik = res.data.user
                const trenToken = res.data.webtoken
                commit('setKorisnik', trenKorisnik)
                commit('setToken', trenToken)
                Vue.$cookies.set("id",this.state.trenutniKorisnik.uuid,"1h");
                Vue.$cookies.set("token",this.state.token,"1h");
                Vue.$cookies.set("tip",this.state.trenutniKorisnik.role,"1h");
                // commit('setToken', Vue.$cookies.get("token"))
                commit('setTip', Vue.$cookies.get("tip"))
                commit('setOsobaID', Vue.$cookies.get("id"))
                // commit('setOsobaID',this.state.trenutniKorisnik.userID)
                if(this.state.trenutniKorisnik.role == "Customer")
                {
                    router.push("/Customer")
                }
                else if(this.state.trenutniKorisnik.role == "Store")
                {
                    router.push("/Store")
                }
                else if(this.state.trenutniKorisnik.role == "Deliverer")
                {
                    router.push("/Deliverer")
                }
            }).catch((err)=>{
                if(err.response.status==403){
                    Vue.toasted.show("Zabranjen vam je pristup!", { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
                }
                else{
                    Vue.toasted.show("Pogrešno uneseni podaci, pokušajte ponovo!", { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
                }
                
            })
        },
        logoutKorisnik({commit}){
                commit('setKorisnik', null)
                commit('setToken', null)
                commit('setTip', null)
                commit('setOsobaID', null)
                Vue.$cookies.remove("id");
                Vue.$cookies.remove("token");
                Vue.$cookies.remove("tip");
                // commit('setToken', null);
                // commit('setTip', null)
            //commit('LOGOUT_KORISNIK')
        },
        async getUserByID({commit}, id){
            return await Api().get('/api/user/'+id).then(res=>{
                const trenutniKorisnik = res.data
                commit('setKorisnik', trenutniKorisnik)
            })
        },
        async getOrderHistory({commit}){
            return await Api().get('/'+this.state.osobaID,{
                headers: {
                  'Authorization': `Basic ${this.state.token}`
                }
              }).then(res=>{
                const narudzbine = res.data
                commit('setOrderHistory', narudzbine)
            })
        },
        async getAllStores({commit}){
            return await Api().get('/api/store/all').then(res=>{
                const stores = res.data
                console.log(stores)
                commit('setAllStores', stores)
            })
        },
        async getMealsFromStore({commit}){
        //koristi id od pickedStore
            return await Api().get('/api/meal/get/restaurant/'+this.state.pickedStore).then(res=>{
                const meals = res.data
                console.log(meals)
                commit('setAllMealsFromStore', meals)
            })  
        },
        async getStoreById({commit}){
            //koristi id od pickedStore
            console.log(this.state.pickedStore)
            return await Api().get('/api/store/get/'+ this.state.pickedStore).then(res=>{
                const store = res.data
                console.log(store)
                commit('setStore', store)
            })  
        },

        postaviToken({commit}, tok){
            commit('setToken', tok)
        },
        postaviTip({commit}, tip){
            commit('setTip', tip)
        },
        postaviOsobaID({commit}, id){
            commit('setOsobaID', id)
        },
        postaviPickedStore({commit}, id){
             commit('setPickedStore', id)
        }
    },
    mutations:{
        setKorisnik(state, korisnik){
            state.trenutniKorisnik = korisnik;
        },
        setToken(state, token){
            state.token = token;
        },
        setTip(state, tip){
            state.tip = tip;
        },
        setOsobaID(state, osobaID){
            state.osobaID = osobaID;
        },
        setOrderHistory(state, narudz){
            state.orderHistory = narudz
        },
        setAllStores(state,stores){
            state.allStores = stores
        },
        setPickedStore(state, id){
            state.pickedStore=id
        },
        setAllMealsFromStore(state, meals){
            state.mealsFromStore=meals
        },
        setStore(state, store){
            state.store=store
        }
    }
})