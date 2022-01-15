<template>
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-light bg-light heder1">
                <img class="img-responsive" src="../assets/logo-removebg-preview.png" alt="">
            <div class="container px-4 px-lg-5 heder">
                <a class="navbar-brand disabled" href="#!" disabled="disabled">Dobrodošli, {{username}}!</a>
                <div >
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <router-link :to="{name: 'Homepage'}"><li class="nav-item"><a class="nav-link active" aria-current="page" href="#!">Početna</a></li></router-link>
                        <router-link :to="{name: 'StoreChangeMenus'}"><li class="nav-item"><a class="nav-link active" aria-current="page" href="#!">Jelovnik restorana</a></li></router-link>
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
.heder{
    margin: 0;
    padding: 0;
}
.heder1{
    display: flex;
    justify-content: center;
}
</style>
