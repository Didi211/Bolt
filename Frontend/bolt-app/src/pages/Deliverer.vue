<template>
    <div class="container-fluid">
        <div class="row">
            <HeaderDeliverer />
        </div>
        <div v-if="isDataLoaded">
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
                    <button class="btn btn-dark dugme" @click="promeniVozilo" >Promeni</button>     
                </div>
            </div>
                <hr>
            <div class="row orders">
                <div class="col-md-5">
                <h5 class="red">Neprihvacene narudzbine</h5>
            
                <PendingOrderCard v-for="order in unselectedOrders" 
                                        :key="order.id" 
                                        :order="order"/>
                </div>
                <div class="col-md-5">
                <h5 class="red">Prihvacene narudzbine</h5>
                <AcceptedOrderCard v-for="order in acceptedOrders" 
                                        :key="order.id" 
                                        :order="order"/>
                </div>
                <div class="col-md-2">
                <h5 class="red">Notifikacije</h5>

                </div>
            </div>
        </div>
        <div v-else>
            <AppSpinner />
        </div>
        <div class="row">
            <Footer />
        </div>
        
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import  HeaderDeliverer  from '@/components/HeaderSAndD.vue'
import  Footer  from '@/components/Footer.vue'
import PendingOrderCard from '@/components/PendingOrderCardDeliverer.vue'
import AcceptedOrderCard from '@/components/AcceptedOrderCardDeliverer.vue'
import AppSpinner from '@/components/AppSpinner.vue'

//import StoreCard from '@/components/StoreCardComponent.vue'

export default defineComponent({
    name: "Homepage",
    components: {
        HeaderDeliverer,
        Footer,
        PendingOrderCard,
        AcceptedOrderCard,
        AppSpinner
        //StoreInfo
    },
    data(){
        return{
            isDataLoaded:true
        }
    },
    computed:{
        unselectedOrders(){
            return this.$store.getters['getUnselectedOrdersDeliverer']
        },
        acceptedOrders(){
            return this.$store.getters['getAcceptedOrdersByDeliverer']
        },
        deliverer(){
            return this.$store.getters['getDeliverer']
        }
    },
    methods:{
        promeniVozilo(){
            var select = document.getElementById('vehicle');
            var voz = select.options[select.selectedIndex].value;
            var vozilo={
                vehicle:  voz
            }
            // var vozilo= JSON.stringify(voz)
            // console.log(vozilo)

            this.$store.dispatch('changeVehicle', vozilo).then(()=>{
                
            })
        }
    },
    async created(){
        this.isDataLoaded = false
        Promise.all([await this.$store.dispatch('getUnselectedOrdersDeliverer'),
        await this.$store.dispatch('getAcceptedOrdersByDeliverer'),
        await this.$store.dispatch('getDelivererById')]).then(()=>{
            this.isDataLoaded = true;
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
.red{
    color: brown;
}
.orders{
    display:flex;
    justify-content: center;
}
</style>
