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
                    <label class="btn btn-secondary lepodugme" for="customer">Mušterija</label>

                    <input type="radio" class="btn-check" name="options" id="restaurant" autocomplete="off" @click="toggleTip('R')">
                    <label class="btn btn-secondary lepodugme" for="restaurant">Restoran</label>

                    <input type="radio" class="btn-check " name="options" id="deliverer" autocomplete="off" @click="toggleTip('D')">
                    <label class="btn btn-secondary lepodugme" for="deliverer">Dostavljač</label>
                </div>
            </div>
            <div class="wrapper RegistracijaRow">
                <div class="col-lg-8">
                    <div v-if="customerSel">
                        <form class="form-signin" @submit.prevent>
                            <h2 class="form-signin-heading text-center ml-2 mr-2">Registracija mušterije</h2>
                                <input v-model="formC.name" type="text" class="form-control" name="name" placeholder="Ime" required="" autofocus="">
                                <input v-model="formC.surname" type="text" class="form-control" name="surname" placeholder="Prezime" required="" autofocus="">
                                <input v-model="formC.username" type="text" class="form-control" name="username" placeholder="Username" required="" autofocus="">
                                <input v-model="formC.location" type="text" class="form-control" name="address" placeholder="Adresa" required="" autofocus="">
                                <input v-model="formC.password" type="password" class="form-control" name="password" placeholder="Šifra" required="" /> 
                                <button @click.prevent="registerCustomer" class="btn btn-lg btn-dark dugme ">Registruj se</button>
                        </form>
                    </div>
                    <div v-if="restaurantSel">
                        <form class="form-signin" @submit.prevent>
                            <h2 class="form-signin-heading text-center ml-2 mr-2">Registracija restorana</h2>
                                <input v-model="formR.name" type="text" class="form-control" name="name" placeholder="Naziv" required="" autofocus="">
                                <input v-model="formR.username" type="text" class="form-control" name="username" placeholder="Username" required="" autofocus="">
                                <input v-model="formR.location" type="text" class="form-control" name="address" placeholder="Adresa" required="" autofocus="">
                                <input v-model="formR.password" type="password" class="form-control" name="password" placeholder="Šifra" required="" /> 
                                <button @click.prevent="registerRestaurant" class="btn btn-lg btn-dark dugme ">Registruj se</button>
                        </form>
                    </div>
                    <div v-if="delivererSel">
                        <form class="form-signin" @submit.prevent>
                            <h2 class="form-signin-heading text-center ml-2 mr-2">Registracija dostavljača</h2>
                                <input v-model="formD.name" type="text" class="form-control" name="name" placeholder="Ime" required="" autofocus="">
                                <input v-model="formD.surname" type="text" class="form-control" name="surname" placeholder="Prezime" required="" autofocus="">
                                <input v-model="formD.username" type="text" class="form-control" name="username" placeholder="Username" required="" autofocus="">
                                <input v-model="formD.password" type="password" class="form-control" name="password" placeholder="Šifra" required="" /> 
                                <div class="row">
                                    <div class="col-xl-12">
                                        <input type="radio" class="btn-check" name="options" id="car" autocomplete="off" @click="toggleVehicle('Car')">
                                        <label class="btn btn-secondary dugmezaprevoz" for="car">Automobil</label>

                                        <input type="radio" class="btn-check" name="options" id="scooter" autocomplete="off" @click="toggleVehicle('Scooter')">
                                        <label class="btn btn-secondary dugmezaprevoz" for="scooter">Skuter</label>

                                        <input type="radio" class="btn-check " name="options" id="bike" autocomplete="off" @click="toggleVehicle('Bike')">
                                        <label class="btn btn-secondary dugmezaprevoz" for="bike">Bicikla</label>
                                    </div>
                                </div>
                                <button @click.prevent="registerDeliverer" class="btn btn-lg btn-dark dugme ">Registruj se</button>
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
          name: "",
          surname: "",
          password: "",
          location: "",
          username: ""
        },
        formR: {
          name: "",
          username: "",
          location: "",
          password: ""
        },
        formD: {
          name: "",
          surname: "",
          username: "",
          password: "",
          vehicle: "",
          avgTime:0
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
        toggleVehicle(tip){
            this.formD.vehicle=tip
        },
        async registerCustomer(){
            if(this.formC.name==""){
            this.$toasted.show("Polje za ime mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formC.surname==""){
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
            else if(this.formC.location==""){
            this.$toasted.show("Polje za adresu mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formC.password==""){
            this.$toasted.show("Polje za šifru mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else{
              this.isDataLoaded = false
              await this.$store.dispatch('registerCustomer', this.formC).then(()=>{
                this.isDataLoaded = true
              })
            }
        },
           async registerRestaurant(){
            if(this.formR.name==""){
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
            else if(this.formR.location==""){
            this.$toasted.show("Polje za adresu mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formR.password==""){
            this.$toasted.show("Polje za šifru mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else{
              this.isDataLoaded = false
              await this.$store.dispatch('registerStore', this.formR).then(()=>{
                this.isDataLoaded = true
              })
            }
        },
           async registerDeliverer(){
            if(this.formD.name==""){
            this.$toasted.show("Polje za ime mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formD.surname==""){
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
            else if(this.formD.password==""){
            this.$toasted.show("Polje za šifru mora biti popunjeno!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else if(this.formD.vehicle==""){
            this.$toasted.show("Morate izabrati prevozno sredstvo!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            else{
              this.isDataLoaded = false
              await this.$store.dispatch('registerDeliverer', this.formD).then(()=>{
                this.isDataLoaded = true
              })
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
.dugmezaprevoz{
    margin-right:0.5rem;
}
</style>