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
    },
    getters:{

    },
    actions:{
        async registerDeliverer({commit}, registerInfo){
            return await Api().post('/', registerInfo).then((res)=>{
                const trenutniKorisnik = res.data
                commit('setKorisnik', trenutniKorisnik)
                Vue.$cookies.set("id",this.state.trenutniKorisnik.uuid,"1h");
                Vue.$cookies.set("token",this.state.trenutniKorisnik.token,"1h");
                Vue.$cookies.set("tip",this.state.trenutniKorisnik.role,"1h");
                commit('setToken', Vue.$cookies.get("token"))
                commit('setTip', Vue.$cookies.get("tip"))
                router.push("/HomepageDeliverer")
            }).catch(()=>{
                Vue.toasted.show("Već postoji korisnik sa tim username-om!", { 
                    theme: "bubble", 
                    position: "top-center", 
                    duration : 2000
               })
            })
        },
        async registerCustomer({commit}, registerInfo){
            return await Api().post('/', registerInfo).then((res)=>{
                const trenutniKorisnik = res.data
                commit('setKorisnik', trenutniKorisnik)
                Vue.$cookies.set("id",this.state.trenutniKorisnik.uuid,"1h");
                Vue.$cookies.set("token",this.state.trenutniKorisnik.token,"1h");
                Vue.$cookies.set("tip",this.state.trenutniKorisnik.role,"1h");
                commit('setToken', Vue.$cookies.get("token"))
                commit('setTip', Vue.$cookies.get("tip"))
                router.push("/HomepageCustomer")
            }).catch(()=>{
                Vue.toasted.show("Već postoji korisnik sa tim username-om!", { 
                    theme: "bubble", 
                    position: "top-center", 
                    duration : 2000
               })
            })
        },
        async registerStore({commit}, registerInfo){
            return await Api().post('/', registerInfo).then((res)=>{
                const trenutniKorisnik = res.data
                commit('setKorisnik', trenutniKorisnik)
                Vue.$cookies.set("id",this.state.trenutniKorisnik.uuid,"1h");
                Vue.$cookies.set("token",this.state.trenutniKorisnik.token,"1h");
                Vue.$cookies.set("tip",this.state.trenutniKorisnik.role,"1h");
                commit('setToken', Vue.$cookies.get("token"))
                commit('setTip', Vue.$cookies.get("tip"))
                router.push("/HomepageStore")
            }).catch(()=>{
                Vue.toasted.show("Već postoji korisnik sa tim username-om!", { 
                    theme: "bubble", 
                    position: "top-center", 
                    duration : 2000
               })
            })
        },
        async loginKorisnik({commit},loginInfo){
            await Api().post('/', loginInfo).then(res=>{
                const trenutniKorisnik = res.data
                commit('setKorisnik', trenutniKorisnik)
                Vue.$cookies.set("id",this.state.trenutniKorisnik.uuid,"1h");
                Vue.$cookies.set("token",this.state.trenutniKorisnik.token,"1h");
                Vue.$cookies.set("tip",this.state.trenutniKorisnik.role,"1h");
                commit('setToken', Vue.$cookies.get("token"))
                commit('setTip', Vue.$cookies.get("tip"))
                // commit('setOsobaID',this.state.trenutniKorisnik.userID)
                if(this.state.trenutniKorisnik.tip == "C")
                {
                    router.push("/HomepageCustomer")
                }
                else if(this.state.trenutniKorisnik.tip == "S")
                {
                    router.push("/HomepageStore")
                }
                else if(this.state.trenutniKorisnik.tip == "D")
                {
                    router.push("/HomepageDeliverer")
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
                commit('setToken', null);
                commit('setTip', null)
                Vue.$cookies.remove("id");
                Vue.$cookies.remove("token");
                Vue.$cookies.remove("tip");
                // commit('setToken', null);
                // commit('setTip', null)
            //commit('LOGOUT_KORISNIK')
        },

        postaviToken({commit}, tok){
            commit('setToken', tok)
        },
        postaviTip({commit}, tip){
            commit('setTip', tip)
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
    }
})