<template>
    <div class="container-fluid">
        <div class="row">
            <HeaderStore />
        </div>
        <div v-if="isDataLoaded">
            <div class="row justify-content-center mt-3">
                <h4>Dodajte novo jelo:</h4>
                <div class="col-xl-8 mt-3 mb-3">
                    <form id="forma" action="/action_page.php" @submit.prevent>
                        <div class="form-group">
                            <label class="labele" for="name">Naziv jela:</label>
                            <input
                                v-model="novoJelo.name"
                                type="text"
                                class="form-control"
                                id="name"
                                placeholder="Upišite ime jela"
                                name="name"/>
                        </div>
                        <div class="form-group">
                            <label class="labele" for="price">Cena:</label>
                            <input
                                v-model="novoJelo.price"
                                type="text"
                                class="form-control"
                                id="price"
                                placeholder="Upišite cenu jela"
                                name="price"/>
                        </div>
                        <div class="form-group">
                            <label class="labele" for="odeljak">Odeljak:</label>
                            <input
                                v-model="novoJelo.category"
                                type="text"
                                class="form-control"
                                id="odeljak"
                                placeholder="Upišite odeljak kome pripada jelo"
                                name="odeljak"/>
                        </div>
                        <div class="form-group">
                            <label class="labele" for="servingSize">Gramaza:</label>
                            <input
                                v-model="novoJelo.servingSize"
                                type="text"
                                class="form-control"
                                id="servingSize"
                                placeholder="Upišite gramazu jela"
                                name="servingSize"/>
                        </div>
                        <div class="form-group">
                            <label class="labele" for="ingredients">Sastojci:</label>
                            <input
                                v-model="novoJelo.ingredients"
                                type="text"
                                class="form-control"
                                id="ingredients"
                                placeholder="Upišite sve sastojke"
                                name="ingredients"/>
                        </div>

                        <button @click="dodajNovoJelo" type="submit" class="btn btn-primary marstil">Dodaj novo jelo</button>
                    </form>
                </div>
            </div>
            <div class="row mt-3 justify-content-center">
                <div class="col-xl-8">
                    <div class="row justify-content-center">
                       <h4 class="mb-3">Postojece kategorije hrane:</h4>
                        <div class="col-xl-2 mr-2 alert alert-primary"  v-for="k in kategorije" :key="k.id">
                            {{k.name}}
                        </div>
                    </div>
                </div>
                <div class="col-xl-8">
                    <h5 class="mb-3 text-muted">Nudite jelo koje ne pripada nijednoj ponudjenoj kategoriji? Napravite novu kategoriju!</h5>
                    <form id="forma2" action="/action_page.php" @submit.prevent>
                        <div class="form-group">
                                <label class="labele" for="imeKat">Naziv nove kategorije:</label>
                                <input
                                    v-model="novaKat.name"
                                    type="text"
                                    class="form-control"
                                    id="imeKat"
                                    placeholder="Upišite ime nove kategorije"
                                    name="imeKat"/>
                            </div>
                        <button @click="dodajNovuKategoriju" type="submit" class="btn btn-primary marstil">Dodaj kategoriju</button>
                    </form>
                </div> 
            </div>
            <div class="row mt-3 justify-content-center">
                <h4 class="mb-3">Trenutna jela u restoranu</h4>
                <div class="col-xl-8">
                    <div v-for="ob in svaJela" :key="ob.meals.mealID">
                        <h5 class="mb-3 text-muted">Odeljak: {{ob.section}}</h5>
                        <Meal v-for="meal in ob.meals" 
                                :key="meal.mealID" 
                                :meal="meal" 
                                />
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
import  HeaderStore  from '@/components/HeaderStore.vue'
import  Footer  from '@/components/Footer.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import Vue from 'vue'
import Meal from '@/components/MealStoreComponent.vue'
//import StoreCard from '@/components/StoreCardComponent.vue'

export default defineComponent({
    name: "StoreChangeMenus",
    components: {
        HeaderStore,
        Footer,
        AppSpinner,
        Meal
    },
    data(){
        return{
            novoJelo:{
                name:"",
                price:"",
                category:"",
                servingSize:null,
                ingredients:"",
                storeID:null
            },
            novaKat:{
                name:""
            },
            isDataLoaded:true
        }
    },
    methods:{
        async dodajNovoJelo(){
            this.novoJelo.storeID = Vue.$cookies.get("id")
            console.log(this.novoJelo)
            if(this.novoJelo.name=="" || this.novoJelo.price=="" || this.novoJelo.category=="" || this.novoJelo.servingSize==null || this.novoJelo.ingredients==""){
                this.$toasted.show("Morate da popunite sve podatke za novo jelo!", { 
                                        theme: "bubble", 
                                        position: "top-center", 
                                        duration : 2000
                                })
            }
            else{
                await this.$store.dispatch('makeNewMeal', this.novoJelo).then(()=>{
                    window.location.reload()
                    this.$toasted.show("Dodato novo jelo!", { 
                                        theme: "bubble", 
                                        position: "top-center", 
                                        duration : 2000
                                })
                })
            }
        },
        async dodajNovuKategoriju(){
            if(this.novaKat.name==""){
                this.$toasted.show("Morate da upisete ime nove kategorije!", { 
                                        theme: "bubble", 
                                        position: "top-center", 
                                        duration : 2000
                                })
            }
            else{
                await this.$store.dispatch('addNewCategory', this.novaKat)
            }
        }
    },
    computed:{
        kategorije(){
            return this.$store.getters['getAllCategories']
        },
        svaJela(){
            return this.$store.getters['getAllMealsFromStore']
        }
    },
    async created(){
        this.isDataLoaded = false
        Promise.all([await this.$store.dispatch('getAllCategories'), await this.$store.dispatch('getMealsFromStore', Vue.$cookies.get("id"))]).then(()=>{
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
  padding-top:1.5rem;
}
.margine{
    margin-top: 1.2rem;
    margin-bottom:1.2rem;
}
</style>
