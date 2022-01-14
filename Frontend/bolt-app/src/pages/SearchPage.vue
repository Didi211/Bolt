<template>
    <div class="container-fluid">
        <div class="row">
            <HeaderCustomer />
        </div>
        <div class="row justify-content-center margine">
            <div class="col-xl-6 " style="padding-right:0px">
                <input type="search" v-model="cat.category" id="src" class="form-control rounded" placeholder="Pretrazi" aria-label="Pretrazi"
                    aria-describedby="search-addon" @keyup.enter="pretrazi"/>          
            </div>
        </div>
        <div class="row">
            <div v-if="!pretraga">
                <button type="submit" class="btn btn-dark marstil" @click="pretrazi">
                        <span>Pretraži</span>
                      </button>
            </div>
            <div v-else>
                <button type="submit" class="btn btn-dark marstil" @click="otkazi">
                        <span>Otkaži pretragu</span>
                </button>
            </div>
        </div>
        <div v-if="isDataLoaded">
            <div class="row margine">
                <div v-if="!pretraga" class="row row-cols-xl-4 justify-content-center">
                    <StoreCard v-for="store in allStores" 
                                :key="store.id" 
                                :store="store"/>
                </div>
                <div v-else>
                    <div v-if="this.noStores">
                        <h3>Nema restorana koji zadovoljavaju vasu pretragu!</h3>
                    </div>
                    <div v-else class="row row-cols-xl-4 justify-content-center">
                        <StoreCard v-for="store in filteredStores" 
                                :key="store.id" 
                                :store="store"/>
                    </div>
                </div>

            </div>
        </div>
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
import  HeaderCustomer  from '@/components/HeaderCustomer.vue'
import  Footer  from '@/components/Footer.vue'
import StoreCard from '@/components/StoreCardComponent.vue'
import AppSpinner from '@/components/AppSpinner.vue'

export default defineComponent({
    name: "Homepage",
    components: {
        HeaderCustomer,
        Footer,
        StoreCard,
        AppSpinner
    },
    data(){
        return{
            cat:{
                category:""
            },
            pretraga:false,
            isDataLoaded:true,
            filteredStores:[],
            noStores:false
        }
    },
    methods:{
        pretrazi(){
            if(this.cat.category==""){
                this.$toasted.show("Prvo upisite filter za pretragu!", { 
                                        theme: "bubble", 
                                        position: "top-center", 
                                        duration : 2000
                                })
            }
            else{
                this.pretraga=true
                console.log(this.cat)
                this.isDataLoaded=false
                this.$store.dispatch('getStoresByCategory', this.cat).then(()=>{
                    this.filteredStores = this.$store.getters['getStoresByCategory']
                    if(this.filteredStores.length == 0){
                        this.noStores = true
                    }
                    else{
                        this.noStores=false
                    }
                    this.isDataLoaded=true
                })
            }
            
        },
        otkazi(){
            this.pretraga=false
            this.cat.category=""
        }
    },
    computed:{
        allStores(){
            return this.$store.getters['getAllStores']
        }
    },
    async created(){
        this.isDataLoaded=false
        await this.$store.dispatch('getAllStores').then(()=>{
            this.isDataLoaded=true
        })
    }
})
</script>

<style scoped>
.visina{
    height: 100px;
}
.margine{
    margin-top:1.2rem;
    margin-bottom:1.2rem;
}
</style>
