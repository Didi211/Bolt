<template>
    <div class="container-fluid">
        <div class="row">
            <HeaderCustomer />
        </div>
        <div class="row">
            <header class="bg-dark py-5">
                <div class="container px-4 px-lg-5 my-5">
                    <div class="text-center text-white">
                        <h1 class="display-4 fw-bolder">BOLT</h1>
                        <p class="lead fw-normal text-white-50 mb-0"><b>Niš</b>Ta ne spremaj naručujemo klopu</p>
                    </div>
                </div>
            </header>
        <!-- Section-->
            <section class="py-5">
                <div class="container px-4 px-lg-5 mt-5">
                    <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                      <StoreCard v-for="store in allStores" 
                                    :key="store.id" 
                                    :store="store"/>
                    </div>
                </div>
            </section>
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
import StoreCard from '@/components/StoreCardComponent.vue'

export default defineComponent({
    name: "Homepage",
    components: {
        HeaderCustomer,
        Footer,
        StoreCard
    },
    computed:{
        allStores(){
            return this.$store.getters['getAllStores']
        }
    },
    async created(){
        this.isDataLoaded = false
        await this.$store.dispatch('getAllStores').then(()=>{
            this.isDataLoaded = true;
        })
    }
    
})
</script>

<style scoped>
.visina{
    height: 100px;
}
</style>
