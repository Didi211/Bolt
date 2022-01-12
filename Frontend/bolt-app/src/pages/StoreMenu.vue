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
                                <p class="lead fw-normal text-white-50 mb-0">Vreme pripreme:{{store.preptime}}</p>
                            </div>
                            <div class="col-md-6"> 
                                <p class="lead fw-normal text-white-50 mb-0">{{store.location}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
        <div class="row">
            <!-- <div class="col-md-3"> 
                <p class="lead fw-normal text-black-50 mb-0">Odeljak</p>
                <p>Pice</p>
                <p>Paste</p>
                <p>Pancerote</p>
                <p>Salate</p>
            </div> -->
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
                    <li v-for="j in jela" :key="j.mealID"> {{j.name}} {{j.price}}din</li>
                    <p>Adresa:</p>
                    <input type="text" v-model="customer.location" id="location">
                    <button @click="change" class="btn btn-dark">Izmeni</button>
                    <input type="textarea" placeholder="note" id="note" class="note">
                    <button @click="order"  class="btn btn-dark order">Naruči</button>


                </div>
            </div>
            <!-- <h1>STORE NAME</h1> -->
        </div>
    </div>
    <div v-else>
        <AppSpinner/>
    </div>
    <div class="row">
            <Footer />
    </div>
</div>
<!-- heder sa korpom -->
<!-- Naziv restorana -->
<!-- lokacija -->
<!-- vreme spremanja -->
    <!-- <h1>STORE MENU</h1> -->

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
            loc: {
                location: ""
            },
            orderMeal:{
                onAddress: "",
                note: "",
                meals: [],
                uuid: ""
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
        },
        // userObj: function(){
        //      return  this.$store.getters['getTrenutniKorisnik']
        //     //  return this.user
        // }
        // async meals(){
        //     return await this.$store.dispatch('getMealsFromStore')
        // }
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
            this.$store.dispatch('changeCustomerLocation', this.loc)
        },
        order(){
            this.orderMeal.onAddress=document.getElementById("location").value
            this.orderMeal.note=document.getElementById("note").value
            this.orderMeal.meals=this.jelaId
            this.orderMeal.uuid=this.customer.uuid
            console.log("ovo je iz order u store menu")
            console.log(this.orderMeal)
            this.jela=[]
            this.jelaId=[]
            document.getElementById("note").value=""
            this.$store.dispatch('orderMeal', this.orderMeal)
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
        // , await this.$store.dispatch('getCustomerById')
        // , await this.$store.dispatch('getCustomerByUsername', this.user.username)]
        // await this.$store.dispatch('getStoreById',storeID).then(()=>{
        //     this.isDataLoaded = true;
        // })
        // await this.$store.dispatch('getMealsFromStore', storeID)
        // .then(res=>{
        //     this.$store.dispatch('postaviPickedStore', res.data.uuid)
        // })
    }
})
</script>

<style scoped>
/* .bg-dark{
    padding: 0;
    padding-bottom: 0%;
    padding-top: 0%;
    height: 50%;
} */
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

</style>
