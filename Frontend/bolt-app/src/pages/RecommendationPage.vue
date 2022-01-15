<template>
    <div class="container-fluid">
        <div class="row">
            <HeaderCustomer />
        </div>
        <div v-if="isDataLoaded">
            <div class="row margine">
                <div class="row">
                    <h2>Top 5 jela</h2>
                    <div  class="row row-cols-xl-4 justify-content-center">
                        <MealCard v-for="m in top5Meals" 
                                    :key="m.meal.mealID" 
                                    :rec="m"/>
                    </div>
                </div>
                <div class="row">
                    <h2>Preporuka jela na osnovu vaših porudzbina</h2>
                    <div  class="row row-cols-xl-4 justify-content-center">
                        <MealCard v-for="m in recMeals" 
                                    :key="m.meal.mealID" 
                                    :rec="m"/>
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
import MealCard from '@/components/RecMealCard.vue'
import AppSpinner from '@/components/AppSpinner.vue'

export default defineComponent({
    name: "RecommendationPage",
    components: {
        HeaderCustomer,
        Footer,
        MealCard,
        AppSpinner
    },
    data(){
        return{
            isDataLoaded:true
        }
    },
    methods:{

    },
    computed:{
        recMeals(){
            return this.$store.getters['getRecMeals']
        },
        top5Meals(){
            return this.$store.getters['getTop5Meals']
        }
    },
    async created(){
        this.isDataLoaded=false
        await this.$store.dispatch('getTop5Meals').then(async ()=>{
            console.log("izvrsen api za top5 meals")
            await this.$store.dispatch('getRecMeals').then(()=>{
                this.isDataLoaded=true
            })
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
