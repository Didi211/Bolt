<template>
    <div class="container-fluid">
        <div class="row">
            <HeaderStore />
        </div>
        <div v-if="isDataLoaded" class="row">
            <div class="col-xl-6">
                <p>deo za dodavanje novog jela</p>
            </div>
            <div class="col-xl-6">
                
            </div>
        </div>
        <!-- <div class="row">
            <div class="wrapper PrijavaRow">
                <div class="col-lg-8 center">
                    <form class="form-signin" @submit.prevent>
                        <div class="row margine">
                            <div class="col-xl-6">
                                <h5 class="form-signin text-center">Promeni prosecno vreme obrade porudzbine:</h5>
                            </div>
                            <div class="col-xl-3">
                                <input type="number" class="form-control" v-model="novoVreme" name="novoVreme" step="5" placeholder="Novo vreme porudzbine..." autofocus="">           
                            </div>
                        </div>
                        <button class="btn btn-lg btn-primary dugme" @click="promeniVreme">Promeni</button>
                    </form>
                </div>
            </div>
        </div> -->
        <div v-else>
            <AppSpinner/>
        </div>
        <div class="row">
            <Footer />
        </div>
        
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import  HeaderStore  from '@/components/HeaderStore.vue'
import  Footer  from '@/components/Footer.vue'
import AppSpinner from '@/components/AppSpinner.vue'
//import StoreCard from '@/components/StoreCardComponent.vue'

export default defineComponent({
    name: "Homepage",
    components: {
        HeaderStore,
        Footer,
        AppSpinner
    },
    data(){
        return{
            novoVreme:0,
            isDataLoaded:true
        }
    },
    methods:{
        async promeniVreme(){
            await this.$store.dispatch('changeTime', this.novoVreme)
        }
    },
    computed:{
        kategorije(){
            return this.$store.getters['getAllCategories']
        }
    },
    async created(){
        this.isDataLoaded = false
        await this.$store.dispatch('getAllCategories').then(()=>{
            this.isDataLoaded = true
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
  padding-top:1.5rem;
}
.margine{
    margin-top: 1.2rem;
    margin-bottom:1.2rem;
}
</style>
