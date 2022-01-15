<template>
    <div class="col mb-2 meal">
        <div v-if="isDataLoaded" class="" >
            <div class="row">
                <h5 class="fw-bolder mt-3">{{meal.name}}</h5> 
            </div>
            <div class="row">
                <div class="col-xl-8 card-body">
                    <div class="text-center">
                        <h5>Porcija: {{meal.servingSize}}</h5>
                        <h5>Sastojci: {{meal.ingredients}}</h5>
                        <h5>Cena: {{meal.price}}</h5>
                        <p class="mb-0">Kategorije kojima pripada ovo jelo:</p>
                        <li v-for="c in katZaJednu"  v-bind:value="c.name" :key="c.name">{{c.name}}</li>
                    </div>
                </div>
                <div class="col-xl-4 pr-5 justify-content-center">
                    <div class="row">
                        <div class="col-xl-12">
                            <select v-model="novaKategorija.categoryName" id="novaKat" name="novaKat" class="form-control form-select form-select-sm" aria-label=".form-select-sm example">
                                <option v-for="kat in moguceKat" v-bind:value="kat.name" :key="kat.name">
                                    {{ kat.name }}
                                </option>
                            </select>
                        </div>

                    </div>
                    <div class="card-body">
                        <div class="text-center">
                            <button @click="dodajKategoriju" type="submit" class="btn btn-dark marstil">Dodaj kategoriju jelu</button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="text-center">
                            <button @click="izbrisiJelo" type="submit" class="btn btn-dark marstil">Izbrisi jelo iz menija</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <AppSpinner />
        </div>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
// import Vue from 'vue'
import AppSpinner from '@/components/AppSpinner.vue'

export default defineComponent({
   name: "MealStoreComponent",
   components:{
       AppSpinner
   },
   props:{
       meal:{
           required: true,
           type: Object,
       }
    },
    data(){
        return{
            novaKategorija:{
                categoryName:"",
                mealID:null
            },
            moguceKat:[],
            katZaJednu:[],
            isDataLoaded:true
        }
    },
    methods:{
        async dodajKategoriju(){
            this.novaKategorija.mealID=this.meal.mealID
            console.log(this.meal)
            if(this.novaKategorija.categoryName!=""){
                await this.$store.dispatch('addMealToCategory', this.novaKategorija).then(async ()=>{
                     await this.$store.dispatch('getAllCategoriesForMeal', this.meal.mealID).then(()=>{
                         this.katZaJednu=this.catForMeal
                         this.moguceKat=[]
                         this.allCat.forEach((el)=>{
                        if(this.katZaJednu.some(item => item.name === el.name)==false){
                             this.moguceKat.push(el)
                        }
            })
                     })
                        this.$toasted.show("Uspesno ste dodali jelo u kategoriju!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
                    // window.location.reload()
                })
            }
            else{
                this.$toasted.show("Prvo izaberite kategoriju!", { 
                            theme: "bubble", 
                            position: "top-center", 
                            duration : 2000
                    })
            }
            
        },
        async izbrisiJelo(){
            console.log(this.meal.mealID)
            await this.$store.dispatch('deleteMeal', this.meal.mealID).then(()=>{
                console.log("izbrisano jelo")
            })
        }
    },
    computed:{
        allCat(){
            return this.$store.getters["getAllCategories"];
        },
        catForMeal() {
            return this.$store.getters["getCategoriesForOneMeal"];
        }
    },
    async created(){
        this.isDataLoaded=false
        Promise.all([await this.$store.dispatch('getAllCategories'), await this.$store.dispatch('getAllCategoriesForMeal', this.meal.mealID)]).then(()=>{
            // console.log("sve kat")
            // console.log(this.allCat)
            this.katZaJednu=this.catForMeal
            console.log("vec stavljene kat")
            console.log(this.catForMeal)
            console.log(this.meal.mealID)
            this.allCat.forEach((el)=>{
                if(this.catForMeal.some(item => item.name === el.name)==false){
                    this.moguceKat.push(el)
                }
            })
            this.isDataLoaded=true
            // console.log("kat za biranje")
            // console.log(this.moguceKat)
        })
    }
})
</script>

<style scoped>
.meal{
    border: solid rgb(175, 174, 174) 1px;
    border-radius: 10px;
}
.cena{
    padding: 0;
}
</style>