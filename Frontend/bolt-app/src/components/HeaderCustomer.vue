<template>
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand disabled" href="#!" disabled="disabled">Dobrodosli, {{username}}!</a>
                <div v-if="statusObavestenja.status=='Accepted'" >
                    <div class=" mr-2 alert alert-primary">
                        Vasa porudzbina je prihvacena!
                    </div>
                </div>
                <div v-if="statusObavestenja.status=='Declined'" >
                    <div class=" mr-2 alert alert-primary">
                        Vasa porudzbina je odbijena!
                    </div>
                </div>
                <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button> -->
                <div >
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <router-link :to="{name: 'Homepage'}"><li class="nav-item"><a class="nav-link active" aria-current="page" href="#!">Pocetna</a></li></router-link>
                        <router-link :to="{name: 'SearchPage'}"><li class="nav-item"><a class="nav-link" href="#!">Pretraga</a></li></router-link>
                        <router-link :to="{name: 'OrderHistory'}"><li class="nav-item"><a class="nav-link" href="#!">Istorija narucivanja</a></li></router-link>
                        <router-link :to="{name: 'Homepage'}"><li class="nav-item"><a class="nav-link" href="#!" @click="logoutKorisnik">Odjavi se</a></li></router-link>
                        <!-- <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#!">Login</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#!">Register</a></li>
                                <li><a class="dropdown-item" href="#!">New Arrivals</a></li>
                            </ul>
                        </li> -->
                    </ul>
                     <!-- <form class="d-flex">
                        <button class="btn btn-outline-dark" type="submit">
                            <router-link :to="{name: 'Basket'}">
                            <i class="bi-cart-fill me-1"></i>
                            Korpa
                            <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
                        </router-link>
                        </button>
                    </form> -->
                </div>
                
            <!-- <div v-if="statusObavestenja=='Declined'">
                <div  data-autohide="false" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <strong class="mr-auto">Obavestenje</strong>
                        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="toast-body">
                        Vasa porudzbina je odbijena, pokusajte drugi restoran!
                    </div>
                </div>
            </div>
            <div v-if="statusObavestenja=='Has a deliverer'">
                <div data-autohide="false"  class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <strong class="mr-auto">Obavestenje</strong>
                        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="toast-body">
                        Vasa porudzbina je pokupljena!
                    </div>
                </div>
            </div> -->

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
</style>
