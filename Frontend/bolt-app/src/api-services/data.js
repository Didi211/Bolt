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
        webSocket:"",
        allStores:[],
        pickedStore: null, //id izabranog restorana
        mealsFromStore: [],
        store: null,
        kategorije:[],
        customer:null,
        deliverer:null,
        unselectedOrdersDeliverer:[],
        acceptedOrdersDeliverer:[],
        top5Rest:[],
        storesByCategory:[],
        catForOneMeal:[],
        pendingOrdersStore:[],
        acceptedOrdersStore:[],
        readyOrdersStore:[],
        obCustomer: "",
        obDeliverer: "",
        changeDisabledOrderID:"",
        obPickUp:"",
        recMeals:[],
        top5Meals:[]
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
        getUnselectedOrdersDeliverer(state){
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
        },
        getPendingOrdersStore(state){
            return state.pendingOrdersStore
        },
        getAcceptedOrdersStore(state){
            return state.acceptedOrdersStore
        },
        getReadyOrdersStore(state){
            return state.readyOrdersStore
        },
        getDeliverer(state){
            return state.deliverer
        },
        getObCustomer(state){
            return state.obCustomer
        },
        getObDeliverer(state){
            return state.obDeliverer
        },
        getAcceptedOrdersByDeliverer(state){
            return state.acceptedOrdersDeliverer
        },
        getChangeDisabledOrderID(state){
            console.log("usao u getter")
            return state.changeDisabledOrderID
        },
        getObPickUp(state){
            return state.obPickUp
        },
        getRecMeals(state){
            return state.recMeals
        },
        getTop5Meals(state){
            return state.top5Meals
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
                window.location.reload()
            }).catch(()=>{
                Vue.toasted.show("Već postoji korisnik sa tim username-om!", { 
                    theme: "bubble", 
                    position: "top-center", 
                    duration : 2000
               })
            })
        },
        async registerCustomer({commit}, registerInfo){

            return await Api().post('/api/register/customer', registerInfo).then((res)=>{
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
                window.location.reload()
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
                const trenKorisnik = res.data.user
                const trenToken = res.data.webtoken
                commit('setKorisnik', trenKorisnik)
                commit('setToken', trenToken)
                Vue.$cookies.set("id",this.state.trenutniKorisnik.uuid,"1h");
                Vue.$cookies.set("token",this.state.token,"1h");
                Vue.$cookies.set("tip",this.state.trenutniKorisnik.role,"1h");
                Vue.$cookies.set("username",this.state.trenutniKorisnik.username,"1h");
                commit('setTip', Vue.$cookies.get("tip"))
                commit('setOsobaID', Vue.$cookies.get("id"))
                router.push("/Store")
                window.location.reload()
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
                const trenKorisnik = res.data.user
                const trenToken = res.data.webtoken
                commit('setKorisnik', trenKorisnik)
                commit('setToken', trenToken)
                Vue.$cookies.set("id",this.state.trenutniKorisnik.uuid,"1h");
                Vue.$cookies.set("token",this.state.token,"1h");
                Vue.$cookies.set("tip",this.state.trenutniKorisnik.role,"1h");
                Vue.$cookies.set("username",this.state.trenutniKorisnik.username,"1h");
                commit('setTip', Vue.$cookies.get("tip"))
                commit('setOsobaID', Vue.$cookies.get("id"))
                if(this.state.trenutniKorisnik.role == "Customer")
                {
                    router.push("/Customer")
                    window.location.reload()
                }
                else if(this.state.trenutniKorisnik.role == "Store")
                {
                    router.push("/Store")
                    window.location.reload()
                }
                else if(this.state.trenutniKorisnik.role == "Deliverer")
                {
                    router.push("/Deliverer")
                    window.location.reload()
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

            return await Api().post('/api/store/category/get', category).then(res=>{

                const stores = res.data
                commit('setStoresByCategory', stores)
            })  
        }, 
        async getCustomerById({commit}){

            const customerId= Vue.$cookies.get("id")
            return await Api().get('/api/customer/get/'+ customerId).then(res=>{
                const customer = res.data
                commit('setCustomer', customer)
            })
        },
        async getDelivererById({commit}){
            const customerId= Vue.$cookies.get("id")
            return await Api().get('/api/deliverer/get/'+ customerId).then(res=>{
                const deliverer = res.data
                commit('setDeliverer', deliverer)
            })
        },
        async changeCustomerLocation({commit},location){
            return await Api().put('/api/customer/changeLocation/'+this.state.osobaID, location).then(()=>{
                commit('setToken', Vue.$cookies.get("token") )
            }).catch(err=>{
                console.log(err)
            })
        },
        async orderMeal({commit},order){
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
        async makeNewMeal({dispatch},newMeal){
            return await Api().post('/api/meal/create', newMeal).then(()=>{
                dispatch('getMealsFromStore', Vue.$cookies.get("id"))
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
        async changeTime({dispatch},novoVreme){
            return await Api().put('/api/store/preptime/change/'+ Vue.$cookies.get("id"), novoVreme).then(()=>{
                dispatch('getStoreById', Vue.$cookies.get("id"))
            }).catch(err=>{
                console.log(err)
            })
        },
        async changeVehicle({dispatch}, vozilo){
            return await Api().put('/api/deliverer/vehicle/change/'+ Vue.$cookies.get("id"), vozilo).then(()=>{
                dispatch('getDelivererById', Vue.$cookies.get("id"))
            }).catch(err=>{
                console.log(err)
            })
        },
        async getUnselectedOrdersDeliverer({commit}){
            return await Api().get('/api/order/pendingDeliverer/').then(res=>{
                console.log(res.data)
                commit('setUnselectedOrdersDeliverer',res.data)
            }).catch(err=>{
                console.log(err)
            })

        },
        async getAcceptedOrdersByDeliverer({commit}){
            return await Api().get('/api/order/acceptedDeliverer/' + Vue.$cookies.get("id")).then(res=>{
                commit('setAcceptedOrdersByDeliverer', res.data)
            })
        },
        async acceptOrderDeliverer({dispatch}, accept){
            console.log(accept)
            return await Api().post('/api/order/acceptDeliverer/', accept).then(()=>{
                dispatch('getUnselectedOrdersDeliverer')
                dispatch('getAcceptedOrdersByDeliverer')
            })
        },
        async pickedUpOrderDeliverer({commit}, order){
            return await Api().post('api/order/pickedUp',order).then(()=>{
                commit('setNista')
            })
        },
        async orderFinishedDeliverer({commit, dispatch}, order){
            console.log('uso u data.js')
            console.log(order)
            return await Api().post('/api/order/finished', order).then(()=>{
                console.log('zavrsen api orderFinished')
                dispatch('getAcceptedOrdersByDeliverer')
                commit('setNista')
            }).catch(err=>{
                console.log(err)
            })
        },
        async getPendingOrdersStore({commit}){
            return await Api().get('/api/order/pending/'+Vue.$cookies.get("id")).then(res=>{
                const pendingOrders = res.data
                commit('setPendingOrdersStore', pendingOrders)
            })  
        },
        async getAcceptedOrdersStore({commit}){
            return await Api().get('/api/order/acceptedStore/'+Vue.$cookies.get("id")).then(res=>{
                const accOrders = res.data
                commit('setAcceptedOrdersStore', accOrders)
            })  
        },
        async getReadyOrdersStore({commit}){
            return await Api().get('/api/order/readyOrders/'+Vue.$cookies.get("id")).then(res=>{
                const readyOrders = res.data
                commit('setReadyOrdersStore', readyOrders)
            })  
        },
        async acceptOrderStore({dispatch}, orderInfo){
            return await Api().post('/api/order/acceptStore', orderInfo).then(()=>{
                dispatch('getAcceptedOrdersStore', Vue.$cookies.get("id"))
                dispatch('getPendingOrdersStore', Vue.$cookies.get("id"))
            })  
        },
        async readyOrderStore({dispatch}, orderInfo){
            console.log(orderInfo)
            return await Api().post('/api/order/ready', orderInfo).then(()=>{
                console.log("izvrsena promena u ready")
                dispatch('getAcceptedOrdersStore', Vue.$cookies.get("id"))
                dispatch('getReadyOrdersStore', Vue.$cookies.get("id"))
            })  
        },
        async declineOrderStore({dispatch}, orderInfo){
            return await Api().post('/api/order/decline', orderInfo).then(()=>{
                dispatch('getPendingOrdersStore', Vue.$cookies.get("id"))
            })    
        },
        async addNewCategory({dispatch}, cat){
            return await Api().post('/api/category/add', cat).then(()=>{
                dispatch('getAllCategories')
            })    
        },
        async deleteMeal({dispatch}, mealID){
            return await Api().delete('/api/meal/delete/'+mealID).then(()=>{
                dispatch('getMealsFromStore', Vue.$cookies.get("id"))
            })    
        },
        async getRecMeals({commit}){
            return await Api().get('/api/customer/recommendedMeals/'+Vue.$cookies.get("id")).then((res)=>{
                const topMeals = res.data
                commit('setRecMeals', topMeals)
            })    
        },
        async getTop5Meals({commit}){
            return await Api().get('/api/meal/top5').then((res)=>{
                const topMeals = res.data
                commit('setTop5Meals', topMeals)
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
        },
        postaviWebSocket({commit}, ws){
            commit('setWebSocket', ws)
        },
        primiObavestenjeMusteriji({commit}, message){
            commit("postaviObavestenjeMusteriji", message)
        },
        primiObavestenjeDeliverer({commit}, message){
            commit("primiObavestenjeDeliverer", message)
        },
        changeDisabledOrderID({commit, dispatch},orderID){
            console.log("usao u dispatch")
            commit('setChangeDisabledOrderID', orderID)
            dispatch('getAcceptedOrdersStore')
        },
        obPickUpOrderID({commit}, orderID){
            commit('setObPickUp', orderID)
        },
        resetObCustomer({commit}){
            commit('postaviObavestenjeMusteriji', "")
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
        },
        setPendingOrdersStore(state,orders){
            state.pendingOrdersStore = orders
        },
        setAcceptedOrdersStore(state,orders){
            state.acceptedOrdersStore = orders
        },
        setReadyOrdersStore(state,orders){
            state.readyOrdersStore = orders
        },
        setDeliverer(state, deliverer){
            state.deliverer=deliverer
        },
        setUnselectedOrdersDeliverer(state, orders){
            state.unselectedOrdersDeliverer=orders
        },
        setWebSocket(state,ws){
            state.webSocket=ws
        },
        postaviObavestenjeMusteriji(state, message){
            state.obCustomer = message
        },
        primiObavestenjeDeliverer(state,message){
            state.obDeliverer = message
        },
        setAcceptedOrdersByDeliverer(state, orders){
            state.acceptedOrdersDeliverer=orders
        },
        setChangeDisabledOrderID(state, orderID){
            console.log("usao u setter")
            state.changeDisabledOrderID = orderID
        },
        setObPickUp(state, ob){
            state.obPickUp=ob
        },
        setRecMeals(state, meals){
            state.recMeals = meals
        },
        setTop5Meals(state, meals){
            state.top5Meals = meals
        }
    }
})