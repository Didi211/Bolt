<template>
        <div class="col-xl-4 order border m-2 rounded">
            <div class="card-body p-4 order">
                <div class="text-center">
                    <div class="row">
                        <h5>{{narudzbina.store[0].name}}</h5>
                        <li v-for="m in narudzbina.meals" :key="m.mealID"> {{m.name}} {{m.price}} din</li>
                        <div class="col-md-12">
                            <p>Adresa:</p>
                            <input class="m-3" type="text" v-model="narudzbina.order.onAddress" id="location">
                            <!-- <button @click="change" class="btn btn-dark" >Izmeni</button> -->
                        </div>
                    </div>
                    <div class="row">
                    <input type="textarea" v-model="narudzbina.order.note" id="note" class="m-3 note">
                    </div>                   
                    <button type="button" class="btn btn-dark" @click="orderMeals">Naruci ponovo</button>
                    <!-- @click="order" -->
                </div>
            </div>
        </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'


export default defineComponent({
    setup() {
        
    },
    props: {
        narudzbina:{
            required: true,
            type: Object, //da se promeni u Object posle
        }
  },
  data(){
      return{
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
      customer(){
            return this.$store.getters['getCustomer']
        },
  },
  methods:{
      naruciPonovo(){
          console.log('mozda da se napravi redirekcija ka storemenu za izabrani restoran za koji je bila porudzbina')
      },
    // change(){
    //     this.loc.location=document.getElementById("location").value
    //     console.log(this.loc.location)
    //     this.$store.dispatch('changeCustomerLocation', this.loc)
    // },
    orderMeals(){
        this.orderMeal.onAddress=this.$props.narudzbina.order.onAddress
        this.orderMeal.note=this.$props.narudzbina.order.note
        const jelaId =[]
        
        for (let i =0; i< this.$props.narudzbina.meals.length;i++){
            jelaId.push(this.$props.narudzbina.meals[i].mealID)
        }

        this.orderMeal.meals=jelaId
        this.orderMeal.uuid=this.customer.uuid
        this.orderMeal.storeID=this.$props.narudzbina.store[0].uuid
        console.log("ovo je iz order u store menu")
        console.log(this.orderMeal)
        this.$store.dispatch('orderMeal', this.orderMeal)
    }
  },
  async created(){
       await this.$store.dispatch('getCustomerById')
       console.log(this.narudzbina)
  }
})
</script>

<style scoped>
.order{
    display: flex;
    justify-content: center;
}
.note{
    width: 100%;
    display: flex;
    justify-self: center;
}
</style>
