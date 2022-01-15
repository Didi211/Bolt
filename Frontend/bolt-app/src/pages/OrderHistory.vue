<template>
    <div class="container-fluid">
        <div class="row">
            <HeaderCustomer />
        </div>
        <div v-if="isDataLoaded" class="row justify-content-center border rounded">
            <div v-if="narudzbine.length==0">
                <h4>Do sada niste naručili nijednom!</h4>
            </div>
            <div v-else class="row justify-content-center">
                <OrderHistoryComponent
                    v-for="narudzbina in narudzbine"
                    :key="narudzbina.order.orderID"
                    :narudzbina="narudzbina"
                />
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
import  HeaderCustomer  from '@/components/HeaderCustomer.vue'
import  Footer  from '@/components/Footer.vue'
import OrderHistoryComponent from '@/components/HistoryOrderComponent.vue'
import AppSpinner from '@/components/AppSpinner.vue'

export default defineComponent({
    name: "Homepage",
    components: {
        HeaderCustomer,
        Footer,
        OrderHistoryComponent,
        AppSpinner
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
