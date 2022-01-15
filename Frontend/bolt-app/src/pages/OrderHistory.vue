<template>
    <div class="container-fluid">
        <div class="row">
            <HeaderCustomer />
        </div>
        <div class="row justify-content-center border rounded">
            <div v-if="narudzbine.length==0">
                <h4>Do sada niste narucili nijednom!</h4>
            </div>
            <div v-else class="row justify-content-center">
                <OrderHistoryComponent
                    v-for="narudzbina in narudzbine"
                    :key="narudzbina.order.orderID"
                    :narudzbina="narudzbina"
                />
            </div>
            
        </div>
        <div class="row futer">
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
            isDataLoaded:true,
        };
    },
    computed: {
        narudzbine() {
        return this.$store.getters["getOrderHistory"];
        }
    },
    async created(){
        this.isDataLoaded=false
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
