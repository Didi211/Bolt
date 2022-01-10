<template>
    <div class="container-fluid">
        <div class="row">
            <HeaderCustomer />
        </div>
        <div class="row">
            <OrderHistoryComponent
                v-for="narudzbina in narudzbine"
                :key="narudzbina.order.orderID"
                :narudzbina="narudzbina"
            />
        </div>
        <div class="row">
            <Footer />
        </div>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import  HeaderCustomer  from '@/components/HeaderCustomer.vue'
import  Footer  from '@/components/Footer.vue'
import OrderHistoryComponent from '@/components/HistoryOrderComponent.vue'

export default defineComponent({
    name: "Homepage",
    components: {
        HeaderCustomer,
        Footer,
        OrderHistoryComponent
    },
    data() {
        return {
           // narudzbine:["prva", "druga", "treca","cetvrta"],
            isDataLoaded:false,
        };
    },//OVO SVE TREBA OTKOMENTARISATI
    computed: {
        narudzbine() {
        return this.$store.getters["getOrderHistory"];
        }
    },
    async created(){
        await this.$store.dispatch("getOrderHistory").then(()=>{
            this.isDataLoaded=true;
        })
    }
})
</script>

<style scoped>
.visina{
    height: 100px;
}
</style>
