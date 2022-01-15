<template>
    <div class="container-fluid">
        <div class="row">
            <HeaderDeliverer />
        </div>
        <div v-if="isDataLoaded">
            <div class="row mt-3 vozilo">
                <h4 v-if="deliverer.vehicle=='Bike'">Vaše trenutno prevozno sredstvo je: <b>Bicikla</b> </h4>
                <h4 v-if="deliverer.vehicle=='Car'">Vaše trenutno prevozno sredstvo je: <b>Automobil</b> </h4>
                <h4 v-if="deliverer.vehicle=='Scooter'">Vaše trenutno prevozno sredstvo je: <b>Skuter</b> </h4>
            <div class="col-xl-4">
                    <h5 class="form-signin text-center">Izaberite novo prevozno sredstvo:</h5>
                </div>
                <div class="col-xl-4">
                    <select class="vehicle" name="vehicle" id="vehicle">
                        <option value="Bike">Bicikla</option>
                        <option value="Car">Automobil</option>
                        <option value="Scooter">Skuter</option>
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
                    <div v-if="notifikacija != ''" class="hide" id="hide">
                        <div class=" mr-2 alert alert-primary">
                        Porudzbina sa id: {{notifikacija}} je spremna da se pokupi!
                            <button type="button" class="btn btn-primary btn-sm dugme" @click="hide">x</button>
                        </div>
                    </div>
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

export default defineComponent({
    name: "Homepage",
    components: {
        HeaderDeliverer,
        Footer,
        PendingOrderCard,
        AcceptedOrderCard,
        AppSpinner
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
        },
        notifikacija(){
            return this.$store.getters['getObPickUp']
        },
    },
    methods:{
        promeniVozilo(){
            var select = document.getElementById('vehicle');
            var voz = select.options[select.selectedIndex].value;
            var vozilo={
                vehicle:  voz
            }
            

            this.$store.dispatch('changeVehicle', vozilo).then(()=>{
                
            })
        },
        hide(){
            document.getElementById("hide").style.display="none"
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
.hide{
    display: block;
}
</style>
