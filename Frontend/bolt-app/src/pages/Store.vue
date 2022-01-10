<template>
    <div class="container-fluid">
        <div class="row">
            <HeaderStore />
        </div>
        <div v-if="isDataLoaded">
            <div class="row mt-3">
                <h4>Vase trenutno prosecno vreme dostave je: {{store.preptime}} minuta</h4>
            </div>
            <div class="row">
                <div class="wrapper PrijavaRow">
                    <div class="col-lg-8 center">
                        <form class="form-signin" @submit.prevent>
                            <div class="row margine">
                                <div class="col-xl-6">
                                    <h5 class="form-signin text-center">Postavi prosecno vreme obrade porudzbine:</h5>
                                </div>
                                <div class="col-xl-3">
                                    <input type="text" class="form-control" v-model="novoVreme.preptime" name="novoVreme" placeholder="Novo vreme porudzbine..." autofocus="">           
                                </div>
                            </div>
                            <button class="btn btn-lg btn-primary dugme" @click="promeniVreme">Promeni</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="row">
                ovo je row gde ce da se prikazuju pristigle ali ne accepted narudzbine
            </div>
            <div class="row">
                ovo je row gde ce da se prikazuju porudzbine u obradi
            </div>
            <div class="row">
                ovo je row gde ce da se prikazuju porudzbine koje su obradjene ali nisu pokupljene od strane dostavljaca
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
//import StoreCard from '@/components/StoreCardComponent.vue'

export default defineComponent({
    name: "Homepage",
    components: {
        HeaderStore,
        Footer,
        AppSpinner
        //StoreInfo
    },
    data(){
        return{
            novoVreme:{
                preptime:null
            },
            isDataLoaded:true
        }
    },
    computed:{
        store(){
            return this.$store.getters['getStore']
        }
    },
    methods:{
        async promeniVreme(){
            await this.$store.dispatch('changeTime', this.novoVreme).then(()=>{
                window.location.reload()
            })
        }
    },
    async created(){
        this.isDataLoaded = false
        await this.$store.dispatch('getStoreById', Vue.$cookies.get("id")).then(()=>{
            this.isDataLoaded=true
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
