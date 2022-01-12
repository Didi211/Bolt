<template>
    <div class="container-fluid">
        <div class="row">
            <HeaderDeliverer />
        </div>
        <div class="row mt-3 vozilo">
            <h4>Vaše trenutno prevozno sredstvo je: <b>{{deliverer.vehicle}}</b> </h4>
            <!-- {{deliverer.vehicle}} -->
           <div class="col-xl-4">
                <h5 class="form-signin text-center">Izaberite novo prevozno sredstvo:</h5>
            </div>
            <div class="col-xl-4">
                <select class="vehicle" name="vehicle" id="vehicle">
                    <option value="Bike">Bike</option>
                    <option value="Car">Car</option>
                    <option value="Scooter">Scooter</option>
                </select>   
                <button class="btn btn-dark dugme" >Promeni</button>     
                <!-- @click="promeniVozilo"                  -->
            </div>
        </div>
        <!-- <div class="row">
            <OrderCard v-for="order in unselectedOrders" 
                                    :key="order.id" 
                                    :order="order"/>
        </div> -->
        <div class="row">
            <Footer />
        </div>
        
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import  HeaderDeliverer  from '@/components/HeaderSAndD.vue'
import  Footer  from '@/components/Footer.vue'
import OrderCard from '@/components/OrderCardDeliverer.vue'
//import StoreCard from '@/components/StoreCardComponent.vue'

export default defineComponent({
    name: "Homepage",
    components: {
        HeaderDeliverer,
        Footer,
        OrderCard
        //StoreInfo
    },
    computed:{
        // unselectedOrders(){
        //     return this.$store.getters['getUnselectedOrders']
        // },
        deliverer(){
            return this.$store.getters['getDeliverer']
        }
    },
    // methods:{
    //     promeniVozilo(){
    //         var select = document.getElementById('vehicle');
    //         var vozilo = select.options[select.selectedIndex].value;
    //         this.$store.dispatch('changeVehicle', vozilo).then(()=>{
                
    //         })
    //     }
    // },
    async created(){
        // await this.$store.dispatch('getUnselectedOrders').then(()=>{
        // })
        await this.$store.dispatch('getDelivererById').then(()=>{

        })
    }
})
</script>

<style scoped>
.visina{
    height: 100px;
}
.dugme{
    margin-left: 4%;
    margin-bottom: 0.5%;
}
.vozilo{
     display: flex;
  justify-content: center;
}
.vehicle{
    height: 85%;
}
</style>
