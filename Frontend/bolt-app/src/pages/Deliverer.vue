<template>
    <div class="container-fluid">
        <div class="row">
            <HeaderDeliverer />
        </div>
        <div class="row">
            <h4>Izaberite porudzbinu koju zelite da dostavite:</h4>
        </div>
        <div class="row">
            <OrderCard v-for="order in unselectedOrders" 
                                    :key="order.id" 
                                    :order="order"/>
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
        unselectedOrders(){
            return this.$store.getters['getUnselectedOrders']
        }
    },
    async created(){
        await this.$store.dispatch('getUnselectedOrders').then(()=>{
        })
    }
})
</script>

<style scoped>
.visina{
    height: 100px;
}
</style>
