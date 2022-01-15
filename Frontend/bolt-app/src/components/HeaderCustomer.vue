<template>
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-light bg-light heder1">
                <img class="img-responsive" src="../assets/logo-removebg-preview.png" alt="">
            <div class="container px-4 px-lg-5 heder">
                <a class="navbar-brand disabled" href="#!" disabled="disabled">Dobrodosli, {{username}}!</a>
                <div v-show="statusObavestenja.status=='Accepted'" id="a" class="hide">
                    <div class=" mr-2 alert alert-primary">
                        Vasa porudzbina je prihvacena!
                    <button type="button" class="btn btn-primary btn-sm dugme" @click="hide">x</button>
                    </div>
                </div>
                <div v-show="statusObavestenja.status=='Declined'" id="d" class="hide">
                    <div class=" mr-2 alert alert-primary">
                        Vasa porudzbina je odbijena!
                    <button type="button" class="btn btn-primary btn-sm dugme" @click="hide">x</button>
                    </div>
                </div>
                <div v-show="statusObavestenja.status=='Has a deliverer'" id="h" class="hide">
                    <div class=" mr-2 alert alert-primary">
                        Vasa porudzbina se sprema! Stize za {{statusObavestenja.timeWaiting}}min
                    <button type="button" class="btn btn-primary btn-sm dugme" @click="hide">x</button>
                    </div>
                </div>
                <div v-show="statusObavestenja.status=='Picked up'" id="p" class="hide align-items-center">
                    <div class=" mr-2 alert alert-primary" >
                        Vasu porudzbinu je pokupio dostavljac!
                    <button type="button" class="btn btn-primary btn-sm dugme" @click="hide">x</button>
                    </div>
                </div>
                <div v-show="statusObavestenja.status=='Finished'" id="f" class="hide" >
                    <div class=" mr-2 alert alert-primary">
                        Vasa porudzbina je dostavljena. Uzivajte!
                    <button type="button" class="btn btn-primary btn-sm dugme" @click="hide">x</button>
                    </div>
                </div>
                <div >
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <router-link :to="{name: 'Homepage'}"><li class="nav-item"><a class="nav-link active" aria-current="page" href="#!">Početna</a></li></router-link>
                        <router-link :to="{name: 'SearchPage'}"><li class="nav-item"><a class="nav-link" href="#!">Pretraga</a></li></router-link>
                        <router-link :to="{name: 'OrderHistory'}"><li class="nav-item"><a class="nav-link" href="#!">Istorija naručivanja</a></li></router-link>
                        <router-link :to="{name: 'RecommendationPage'}"><li class="nav-item"><a class="nav-link" href="#!">Preporuke</a></li></router-link>
                        <router-link :to="{name: 'Homepage'}"><li class="nav-item"><a class="nav-link" href="#!" @click="logoutKorisnik">Odjavi se</a></li></router-link>
                    </ul>
                    
                </div>

            </div>
            
        </nav>
        
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Vue from 'vue'

export default defineComponent({
    setup() {
        
    },
    data(){
        return{
            username:""
        }
    },
    computed:{
        statusObavestenja(){
            return this.$store.getters["getObCustomer"];
        }

    },
    methods:{
        logoutKorisnik(){
            this.$store.dispatch("logoutKorisnik")
        },
        hide(){
            if(this.statusObavestenja.status=="Accepted"){
                document.getElementById("a").style.display = "none";
            }
            if(this.statusObavestenja.status=="Declined"){
                document.getElementById("d").style.display = "none";
            }
            if(this.statusObavestenja.status=="Has a deliverer"){
                document.getElementById("h").style.display = "none";
            }
            if(this.statusObavestenja.status=="Picked up"){
                document.getElementById("p").style.display = "none";
            }
            if(this.statusObavestenja.status=="Finished"){
                document.getElementById("f").style.display = "none";
            }
            //mozda ovde treba da se obrise state obCustomer
            this.$store.dispatch('resetObCustomer')

        }
    },
    created(){
        this.username=Vue.$cookies.get("username")
    }
})
</script>

<style scoped>
a.disabled {
  pointer-events: none;
  cursor: default;
}
.hide{
    display: block;
}
.dugme{
    background-color: transparent;
    border: none;
    color: blue;
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
    text-align: center;
}
.heder{
    margin: 0;
    padding: 0;
}
.heder1{
    display: flex;
    justify-content: center;
}
</style>
