<template>
    <div class="container-fluid">
        <div class="row">
            <HeaderStore />
        </div>
        <div v-if="isDataLoaded">
            <div class="row mt-3">
                <h4>Vase trenutno prosečno vreme dostave je: {{store.preptime}} minuta</h4>
            </div>
            <div class="row">
                <div class="wrapper PrijavaRow">
                    <div class="col-lg-8 center">
                        <form class="form-signin" @submit.prevent>
                            <div class="row margine">
                                <div class="col-xl-6">
                                    <h5 class="form-signin text-center">Postavi prosečno vreme obrade porudzbine:</h5>
                                </div>
                                <div class="col-xl-3">
                                    <input type="text" class="form-control" v-model="novoVreme.preptime" name="novoVreme" placeholder="Novo vreme porudzbine..." autofocus="">           
                                </div>
                            </div>
                            <button class="btn btn-lg btn-dark dugme" @click="promeniVreme">Promeni</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center mt-3">
                <div class="col-xl-8">
                    <h3>Neobradjene porudzbine:</h3>
                    <Order v-for="order in pendingOrders" 
                                    :key="order.id" 
                                    :order="order"/>
                </div>
            </div>
            <div class="row justify-content-center mt-3">
                <div class="col-xl-8">
                    <h3>Prihvaćene porudzbine:</h3>
                    <Order v-for="order in acceptedOrders" 
                                    :key="order.id" 
                                    :order="order"/>
                </div>
            </div>
            <div class="row justify-content-center mt-3">
                <div class="col-xl-8">
                    <h3>Porudzbine spremne za dostavu:</h3>
                    <Order v-for="order in readyOrders" 
                                    :key="order.id" 
                                    :order="order"/>
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
import Vue from 'vue'
import { defineComponent } from '@vue/composition-api'
import  HeaderStore  from '@/components/HeaderStore.vue'
import  Footer  from '@/components/Footer.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import Order from '@/components/OrderStore.vue'

export default defineComponent({
    name: "Homepage",
    components: {
        HeaderStore,
        Footer,
        AppSpinner,
        Order
    },
    data(){
        return{
            novoVreme:{
                preptime:""
            },
            isDataLoaded:true
        }
    },
    computed:{
        store(){
            return this.$store.getters['getStore']
        },
        pendingOrders(){
            return this.$store.getters['getPendingOrdersStore']
        },
        acceptedOrders(){
            return this.$store.getters['getAcceptedOrdersStore']
        },
        readyOrders(){
            return this.$store.getters['getReadyOrdersStore']
        },
    },
    methods:{
        async promeniVreme(){
            await this.$store.dispatch('changeTime', this.novoVreme).then(()=>{
            })
        }
    },
    async created(){
        this.isDataLoaded = false
        Promise.all([await this.$store.dispatch('getStoreById', Vue.$cookies.get("id")), await this.$store.dispatch('getPendingOrdersStore') ,
        await this.$store.dispatch('getAcceptedOrdersStore'),await this.$store.dispatch('getReadyOrdersStore')]).then(()=>{
            console.log("zavrseno")
            this.isDataLoaded = true;
        })
    }
})
</script>

<style scoped>
.visina{
    height: 100px;
}

.PrijavaRow{
  display: flex;
  justify-content: center;
}
.margine{
    margin-top: 1.2rem;
    margin-bottom:1.2rem;
}
</style>
