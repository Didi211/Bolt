<template>
<div class="container-fluid">
    <div class="row">
            <Header />
    </div>
    <div class="row" v-if="isDataLoaded">
        <div class="row">
            <header class="bg-dark ">
                <div class="container naziv px-4 px-lg-5 my-5">
                    <div class="text-center text-white">
                        <div class="row text">
                        <h5 class="display-4 fw-bolder">{{store.name}}</h5>
                        </div>
                        <div class="row">
                            <div class="col-md-6"> 
                                <h4 class="lead fw-normal text-white-50 mb-0">Vreme pripreme: <span class=" mt-2 badge badge-secondary"> {{store.preptime}}min</span></h4>
                            </div>
                            <div class="col-md-6"> 
                                <h4 class="lead fw-normal text-white-50 mb-0">Adresa restorana: <span class=" mt-2 badge badge-secondary"> {{store.location}}</span></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
        <div class="row">
            <div class="col-md-9 lista"> 
                <div v-for="ob in obj" :key="ob.meals.mealID">
                    <h3>{{ob.section}}</h3>
                    <Meal v-for="meal in ob.meals" 
                            :key="meal.mealID" 
                            :meal="meal" 
                            @childToParentYes="onChildClickYes"
                             @childToParentNo="onChildClickNo"/>
                </div>
            </div>
            <div class="col-md-3"> 
                <h3>Korpa</h3>
                <div class="basket"> 
                    <li v-for="j in jela" :key="j.id"> {{j.name}} {{j.price}}din</li>
                    <p>Adresa:</p>
                    <input type="text" v-model="customer.location" id="location" class="m-1">
                    <button @click="change" class="btn btn-dark m-1">Izmeni</button>
                    <input type="textarea" placeholder="note" id="note" v-model="notes" class="note m-1">
                    <button @click="order"  class="btn btn-dark order">Naruči</button>


                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <AppSpinner/>
    </div>
    <div class="row futer">
            <Footer />
    </div>
</div>


</template>
<script>
import { defineComponent } from '@vue/composition-api'
import  Header  from '@/components/HeaderCustomer.vue'
import  Footer  from '@/components/Footer.vue'
import Meal from '@/components/MealComponent.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import Vue from 'vue'

export default defineComponent({
    name: "StoreMenu",
    components: {
        Header,
        Footer,
        Meal,
        AppSpinner
    },
    setup() {
        
    },
    data(){
        return{
            isDataLoaded:true,
            jela:[],
            jelaId:[],
            user: null,
            notes: "",
            loc: {
                location: ""
            },
            orderMeal:{
                onAddress: "",
                note: "",
                meals: [],
                uuid: "",
                storeID: null
            }
        }
    },
    computed:{
        store(){
            return  this.$store.getters['getStore']
        },
        obj(){
            return this.$store.getters['getAllMealsFromStore']
        },
        customer(){
            return this.$store.getters['getCustomer']
        }
    },
    methods:{
        onChildClickYes(value){
          this.jela.push(value)
          this.jelaId.push(value.mealID)
          console.log(this.jelaId)
        },
        onChildClickNo(value){
            let index=this.jela.indexOf(value)
            let id= this.jelaId.indexOf(value.mealID)
            if(index > -1){
              this.jela.splice(index,1)
              this.jelaId.splice(id,1)
                console.log(this.jelaId)
            }
        },
        change(){
            this.loc.location=document.getElementById("location").value
            console.log(this.loc)
            this.$store.dispatch('changeCustomerLocation', this.loc).then(()=>{
                this.$toasted.show("Promenjena je vasa adresa", { 
                        theme: "bubble", 
                        position: "top-center", 
                        duration : 5000
                   })
            })
        },
        order(){
            console.log(this.jelaId)
            console.log(this.customer.location)
            if(this.jelaId.length == 0 ){
                this.$toasted.show("Niste izabrali nijedno jelo!", { 
                    theme: "bubble", 
                    position: "top-center", 
                    duration : 5000
                })
            }
            else if (this.customer.location == ""){
                this.$toasted.show("Morate da unesete Vasu lokaciju!", { 
                    theme: "bubble", 
                    position: "top-center", 
                    duration : 5000
                })
            }
            else{
                this.orderMeal.onAddress=document.getElementById("location").value
                this.orderMeal.note=document.getElementById("note").value
                this.orderMeal.meals=this.jelaId
                this.orderMeal.uuid=this.customer.uuid
                this.orderMeal.storeID= this.$route.params.id
                console.log("ovo je iz order u store menu")
                console.log(this.orderMeal)
                this.jela=[]
                this.jelaId=[]
                document.getElementById("note").value=""
                this.$store.dispatch('orderMeal', this.orderMeal)
            }
        }
    },
    async created(){
        this.isDataLoaded = false
        const storeID = this.$route.params.id
        const customerID = Vue.$cookies.get("id");
        await this.$store.dispatch('getUserByID',customerID)
        //const user = this.$store.getters['getTrenutniKorisnik']
        Promise.all([await this.$store.dispatch('getStoreById',storeID), await this.$store.dispatch('getCustomerById') ,
        await this.$store.dispatch('getMealsFromStore', storeID)]).then(()=>{
            this.isDataLoaded = true;
        })
    }
})
</script>

<style scoped>

.naziv{
    
    width: 100%;
}
.row{
    padding:0;
    margin: 0;
}
.basket{
    position: absolute;
    border: solid black 1px;
    border-radius: 10px;
}
.lista{
    justify-content:left;
}
h3{
    color:brown;
}
p{
    padding: 0;
    margin: 0;
}
.note{
    resize: horizontal;
    overflow: auto;
}
.order{
    width: 100%;
}
.futer{
    margin-top: 10%;
}

</style>
