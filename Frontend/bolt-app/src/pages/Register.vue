<template>
    <div class="container-fluid">
        <div class="row">
            <Header />
        </div>
        <div v-if="!isDataLoaded">
        <AppSpinner />
        </div>
        <div v-else>
            <div class="row dugmiciRow">
                <div class="col-xl-6">
                    <input type="radio" class="btn-check" name="options" id="customer" autocomplete="off" checked @click="toggleTip('C')">
                    <label class="btn btn-secondary lepodugme" for="customer">Musterija</label>

                    <input type="radio" class="btn-check" name="options" id="restaurant" autocomplete="off" @click="toggleTip('R')">
                    <label class="btn btn-secondary lepodugme" for="restaurant">Restoran</label>

                    <input type="radio" class="btn-check " name="options" id="deliverer" autocomplete="off" @click="toggleTip('D')">
                    <label class="btn btn-secondary lepodugme" for="deliverer">Dostavljac</label>
                </div>
            </div>
            <div class="wrapper RegistracijaRow">
                <div class="col-lg-8">
                    <div v-if="customerSel">
                        <form class="form-signin" @submit.prevent>
                            <h2 class="form-signin-heading text-center ml-2 mr-2">Registracija musterije</h2>
                                <input v-model="formC.ime" type="text" class="form-control" name="name" placeholder="Ime" required="" autofocus="">
                                <input v-model="formC.prezime" type="text" class="form-control" name="surname" placeholder="Prezime" required="" autofocus="">
                                <input v-model="formC.username" type="text" class="form-control" name="username" placeholder="Username" required="" autofocus="">
                                <input v-model="formC.adresa" type="text" class="form-control" name="address" placeholder="Adresa" required="" autofocus="">
                                <input v-model="formC.sifra" type="password" class="form-control" name="password" placeholder="Šifra" required="" /> 
                                <input v-model="formC.potvrdiSifru" type="password" class="form-control" name="confirm" placeholder="Potvrdi šifru" required="" /> 
                                <button @click.prevent="registerCustomer" class="btn btn-lg btn-primary dugme ">Registruj se</button>
                        </form>
                    </div>
                    <div v-if="restaurantSel">
                        <form class="form-signin" @submit.prevent>
                            <h2 class="form-signin-heading text-center ml-2 mr-2">Registracija restorana</h2>
                                <input v-model="formR.naziv" type="text" class="form-control" name="name" placeholder="Naziv" required="" autofocus="">
                                <input v-model="formR.username" type="text" class="form-control" name="username" placeholder="Username" required="" autofocus="">
                                <input v-model="formR.adresa" type="text" class="form-control" name="address" placeholder="Adresa" required="" autofocus="">
                                <input v-model="formR.sifra" type="password" class="form-control" name="password" placeholder="Šifra" required="" /> 
                                <input v-model="formR.potvrdiSifru" type="password" class="form-control" name="confirm" placeholder="Potvrdi šifru" required="" /> 
                                <button @click.prevent="registerRestaurant" class="btn btn-lg btn-primary dugme ">Registruj se</button>
                        </form>
                    </div>
                    <div v-if="delivererSel">
                        <form class="form-signin" @submit.prevent>
                            <h2 class="form-signin-heading text-center ml-2 mr-2">Registracija dostavljaca</h2>
                                <input v-model="formD.ime" type="text" class="form-control" name="name" placeholder="Ime" required="" autofocus="">
                                <input v-model="formD.prezime" type="text" class="form-control" name="surname" placeholder="Prezime" required="" autofocus="">
                                <input v-model="formD.username" type="text" class="form-control" name="username" placeholder="Username" required="" autofocus="">
                                
                                <input v-model="formD.sifra" type="password" class="form-control" name="password" placeholder="Šifra" required="" /> 
                                <input v-model="formD.potvrdiSifru" type="password" class="form-control" name="confirm" placeholder="Potvrdi šifru" required="" /> 
                                <button @click.prevent="registerDeliverer" class="btn btn-lg btn-primary dugme ">Registruj se</button>
                        </form>
                    </div>
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
        customerSel:true,
        restaurantSel:false,
        delivererSel:false,
        isDataLoaded:true,
        formC: {
          ime: "",
          prezime: "",
          username: "",
          adresa: "",
          sifra: "",
          potvrdiSifru: ""
        },
        formR: {
          naziv: "",
          username: "",
          adresa: "",
          sifra: "",
          potvrdiSifru: ""
        },
        formD: {
          ime: "",
          prezime: "",
          username: "",
          sifra: "",
          potvrdiSifru: ""
        }
      }
    },
    methods:{
        toggleTip(tipKorisnika){
            if(tipKorisnika=='C'){
                this.customerSel=true
                this.restaurantSel=false
                this.delivererSel=false
            }
            else if(tipKorisnika=='R'){
                this.customerSel=false
                this.restaurantSel=true
                this.delivererSel=false
            }
            else if(tipKorisnika=='D'){
                this.customerSel=false
                this.restaurantSel=false
                this.delivererSel=true
            }
        },
        async registerCustomer(){
            if(this.formC.ime==""){
            this.$toasted.show("Polje za ime mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formC.prezime==""){
            this.$toasted.show("Polje za prezime mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formC.username==""){
            this.$toasted.show("Polje za username mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formC.adresa==""){
            this.$toasted.show("Polje za adresu mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formC.sifra==""){
            this.$toasted.show("Polje za šifru mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formC.potvrdiSifru==""){
            this.$toasted.show("Morate potvrditi šifru!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formC.potvrdiSifru!=this.formC.sifra){
            this.$toasted.show("Šifre se ne poklapaju, probajte ponovo!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else{
                this.$toasted.show("Ovde treba register customer funkcionalnost", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            //   this.isDataLoaded = false
            //   await this.$store.dispatch('registerKorisnik', this.form).then(()=>{
            //     this.isDataLoaded = true
            //   })
            }
        },
           async registerRestaurant(){
            if(this.formR.naziv==""){
            this.$toasted.show("Polje za ime mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formR.username==""){
            this.$toasted.show("Polje za username mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formR.adresa==""){
            this.$toasted.show("Polje za adresu mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formR.sifra==""){
            this.$toasted.show("Polje za šifru mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formR.potvrdiSifru==""){
            this.$toasted.show("Morate potvrditi šifru!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formR.potvrdiSifru!=this.formR.sifra){
            this.$toasted.show("Šifre se ne poklapaju, probajte ponovo!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else{
                this.$toasted.show("Ovde treba register restaurant funkcionalnost", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            //   this.isDataLoaded = false
            //   await this.$store.dispatch('registerKorisnik', this.form).then(()=>{
            //     this.isDataLoaded = true
            //   })
            }
        },
           async registerDeliverer(){
            if(this.formD.ime==""){
            this.$toasted.show("Polje za ime mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formD.prezime==""){
            this.$toasted.show("Polje za prezime mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formD.username==""){
            this.$toasted.show("Polje za username mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formD.sifra==""){
            this.$toasted.show("Polje za šifru mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formD.potvrdiSifru==""){
            this.$toasted.show("Morate potvrditi šifru!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formD.potvrdiSifru!=this.formD.sifra){
            this.$toasted.show("Šifre se ne poklapaju, probajte ponovo!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else{
                this.$toasted.show("Ovde treba register deliverer funkcionalnost", { 
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
.dugmiciRow{
    /* width:200px; */
    display: flex;
    justify-content: center;
}
.lepodugme{
    margin-right:0.5rem;
    margin-top:1.1rem;
}
</style>