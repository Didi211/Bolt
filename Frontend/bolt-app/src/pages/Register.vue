<template>
    <div class="container-fluid">
        <div class="row">
            <Header />
        </div>
        <div v-if="!isDataLoaded">
        <AppSpinner />
        </div>
        <div v-else>
            <div class="wrapper RegistracijaRow">
                <div class="col-lg-8">
                    <form class="form-signin" @submit.prevent>
                        <h2 class="form-signin-heading text-center ml-2 mr-2">Registracija</h2>
                        <input v-model="form.ime" type="text" class="form-control" name="name" placeholder="Ime" required="" autofocus="">
                        <input v-model="form.prezime" type="text" class="form-control" name="surname" placeholder="Prezime" required="" autofocus="">
                        <input v-model="form.username" type="text" class="form-control" name="username" placeholder="Username" required="" autofocus="">
                        <input v-model="form.adresa" type="text" class="form-control" name="address" placeholder="Adresa" required="" autofocus="">
                        <input v-model="form.sifra" type="password" class="form-control" name="password" placeholder="Šifra" required="" /> 
                        <input v-model="form.potvrdiSifru" type="password" class="form-control" name="confirm" placeholder="Potvrdi šifru" required="" /> 
                        <button @click.prevent="register" class="btn btn-lg btn-primary dugme ">Registruj se</button>
                    </form>
                    <div class="row imanalog">
                        <router-link :to="{name:'Login'}"><a>Već imate nalog?</a></router-link>
                    </div>
                </div>
            </div>
            <div class="row wrap">
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
    components:{
        Header,
        Footer
    },
    data () {
      return {
        isDataLoaded:true,
        form: {
          ime: "",
          prezime: "",
          username: "",
          adresa: "",
          sifra: "",
          potvrdiSifru: ""
        }
      }
    },
    methods:{
      async register(){
        if(this.form.ime==""){
           this.$toasted.show("Polje za ime mora biti popunjeno!", { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
        }
        else if(this.form.prezime==""){
           this.$toasted.show("Polje za prezime mora biti popunjeno!", { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
        }
        else if(this.form.username==""){
           this.$toasted.show("Polje za username mora biti popunjeno!", { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
        }
        else if(this.form.adresa==""){
           this.$toasted.show("Polje za adresu mora biti popunjeno!", { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
        }
        else if(this.form.sifra==""){
           this.$toasted.show("Polje za šifru mora biti popunjeno!", { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
        }
        else if(this.form.potvrdiSifru==""){
           this.$toasted.show("Morate potvrditi šifru!", { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
        }
        else if(this.form.potvrdiSifru!=this.form.sifra){
           this.$toasted.show("Šifre se ne poklapaju, probajte ponovo!", { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
        }
        else{
            this.$toasted.show("Ovde treba register funkcionalnost", { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 2000
                   })
        //   this.isDataLoaded = false
        //   await this.$store.dispatch('registerKorisnik', this.form).then(()=>{
        //     this.isDataLoaded = true
        //   })
        }
      }
    }
})
</script>

<style scoped>
.RegistracijaRow{
  display: flex;
  justify-content: center;
  padding-top:1.5rem;
}

.form-control{
    margin-top:1.2rem;
    margin-bottom: 1.2rem;
}

.dugme, .imanalog{
    margin: top 0.8rem;
    margin-bottom: 0.8rem;
}


</style>
