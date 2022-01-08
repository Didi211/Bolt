<template>
    <div class="container-fluid">
        <div class="row">
            <Header />
        </div>
        <div v-if="!isDataLoaded">
            <AppSpinner />
        </div>
        <div v-else>
            <div class="wrapper PrijavaRow">
                <div class="col-lg-8">
                    <form class="form-signin" @submit.prevent>
                        <h2 class="form-signin-heading text-center">Prijava</h2>
                        <input type="text" class="form-control" v-model="loginInfo.username" name="username" placeholder="Username" autofocus="">           
                        <input type="password" class="form-control" v-model="loginInfo.sifra" name="sifra" placeholder="password"/>
                        <button class="btn btn-lg btn-primary dugme" @click="login">Prijavi se</button>
                    </form>
                    <div class="row nemanalog">
                        <router-link :to="{name:'Register'}"><a class="nav-link" href="#!">Nemate nalog?</a></router-link>
                    </div>
                </div>
            </div>
            <div class="row">
                <Footer />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default defineComponent({
    setup() {
        
    },
    data(){
      return{
        isDataLoaded:true,
        loginInfo: {
          username: "",
          sifra: ""
        }
      }
    },
    components:{
        Header,
        Footer
    },
    methods:{
        async login(){
            if(this.loginInfo.username==""){
           this.$toasted.show("Polje za username mora biti popunjeno!", { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
        }
        else if(this.loginInfo.sifra==""){
           this.$toasted.show("Polje za šifru mora biti popunjeno!", { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
        }
        else{
            this.$toasted.show("Ovde treba login funkcionalnost", { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
          this.isDataLoaded = false
          await this.$store.dispatch('loginKorisnik', this.loginInfo).then(()=>
          {
            this.isDataLoaded=true
          })
        }
        }
    }
})
</script>

<style scoped>
.PrijavaRow{
  display: flex;
  justify-content: center;
  padding-top:1.5rem;
}

.form-control{
    margin-top:1.2rem;
    margin-bottom: 1.2rem;
}

.dugme, .nemanalog{
    margin: top 0.8rem;
    margin-bottom: 0.8rem;
}

</style>
