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
        kategorije:[],
        customer:null,
        unselectedOrdersDeliverer:[],
        top5Rest:[],
        storesByCategory:[],
        catForOneMeal:[]
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
            console.log("ovo je iz gettera")
            console.log(state.mealsFromStore)
            return state.mealsFromStore
        },
        getStore(state){
            return state.store
        },
        getAllCategories(state){
            return state.kategorije
        },
        getCustomer(state){
            return state.customer
        },
        getTrenutniKorisnik(state){
            return state.trenKorisnik
        },
        getUnselectedOrders(state){
            return state.unselectedOrdersDeliverer
        },
        getTop5Rest(state){
            return state.top5Rest
        },
        getStoresByCategory(state){
            return state.storesByCategory
        },
        getCategoriesForOneMeal(state){
            return state.catForOneMeal
        }
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
                Vue.$cookies.set("username",this.state.trenutniKorisnik.username,"1h");
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
                Vue.$cookies.set("username",this.state.trenutniKorisnik.username,"1h");
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
                Vue.$cookies.set("username",this.state.trenutniKorisnik.username,"1h");
                // commit('setToken', Vue.$cookies.get("token"))
                commit('setTip', Vue.$cookies.get("tip"))
                commit('setOsobaID', Vue.$cookies.get("id"))
                router.push("/Store")
            }).catch(()=>{
                Vue.toasted.show("Greska!", { 
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
                Vue.$cookies.set("username",this.state.trenutniKorisnik.username,"1h");
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
                Vue.$cookies.remove("username")
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
            return await Api().get('/api/customer/previousOrders/'+Vue.$cookies.get("id")).then(res=>{
                const narudzbine = res.data
                console.log(res)
                commit('setOrderHistory', narudzbine)
            })
        },
        async getAllStores({commit}){
            return await Api().get('/api/store/all').then(res=>{
                const stores = res.data
                commit('setAllStores', stores)
            })
        },
        async getMealsFromStore({commit}, storeID){
        //koristi id od pickedStore
            return await Api().get('/api/meal/get/restaurant/'+storeID).then(res=>{
                const meals = res.data
                console.log(res.data)
                commit('setAllMealsFromStore', meals)
            })  
        },
        async getStoreById({commit}, storeID){
            return await Api().get('/api/store/get/'+ storeID).then(res=>{
                const store = res.data
                commit('setStore', store)
            })  
        },
        async getAllCategories({commit}){
            return await Api().get('/api/category/all').then(res=>{
                const kat = res.data
                commit('setCategories', kat)
            })  
        },
        async getAllCategoriesForMeal({commit}, mealID){
            return await Api().get('/api/meal/getCategories/'+ mealID).then(res=>{
                const kat = res.data
                console.log(kat)
                commit('setCategoriesForOneMeal', kat)
            })  
        },
        async getTop5Rest({commit}){
            return await Api().get('/api/store/mostPopular').then(res=>{
                const rest = res.data
                commit('setTop5Rest', rest)
            })  
        }, 
        async getStoresByCategory({commit}, category){
            console.log(category)
            return await Api().post('/api/store/category/get', category).then(res=>{
                console.log(res)
                const stores = res.data
                commit('setStoresByCategory', stores)
            })  
        }, 
        async getCustomerById({commit}){
            //console.log(this.trenKorisnik.uuid)
            const customerId= Vue.$cookies.get("id")
            return await Api().get('/api/customer/get/'+ customerId).then(res=>{
                const customer = res.data
                console.log(customer)
                commit('setCustomer', customer)
            })
        },
        async changeCustomerLocation({commit},location){
            console.log(location)
            return await Api().put('/api/customer/changeLocation/'+this.state.osobaID, location).then(()=>{
                commit('setToken', Vue.$cookies.get("token") )
            }).catch(err=>{
                console.log(err)
            })
        },
        async orderMeal({commit},order){
            console.log("narudzbina")
            console.log(order)
            return await Api().post('/api/order/', order).then(res=>{
                if(res.status == 200){
                    Vue.toasted.show("Vasa porudzbina je poslata!", { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
                }

                commit('setToken', Vue.$cookies.get("token") )
            }).catch(err=>{
                console.log(err)
            })
        },
        async makeNewMeal({commit},newMeal){
            return await Api().post('/api/meal/create', newMeal).then(()=>{
                commit('setNista')
            }).catch(err=>{
                console.log(err)
            })
        },
        async addMealToCategory({commit},novaKategorija){
            return await Api().post('/api/meal/addToCategory', novaKategorija).then(()=>{
                commit('setNista')
            }).catch(err=>{
                console.log(err)
            })
        },
        async changeTime({commit},novoVreme){
            return await Api().put('/api/store/preptime/change/'+ Vue.$cookies.get("id"), novoVreme).then(()=>{
                commit('setNista')
            }).catch(err=>{
                console.log(err)
            })
        },
        // async getUnselectedOrders({commit}){
        //     return await Api().get('/api/category/all').then(res=>{
        //         const kat = res.data
        //         commit('setCategories', kat)
        //     })  
        // }, 
        
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
            console.log("ovo je iz mutacija")
            console.log(meals)
            state.mealsFromStore=meals
        },
        setStore(state, store){
            state.store=store
        },
        setCategories(state, cat){
            state.kategorije=cat
        },
        setCustomer(state, customer){
            state.customer=customer
        },
        setTop5Rest(state, rest){
            state.top5Rest = rest
        },
        setStoresByCategory(state,stores){
            state.storesByCategory = stores
        },
        setNista(){

        },
        setCategoriesForOneMeal(state, kat){
            state.catForOneMeal=kat
        }
    }
})