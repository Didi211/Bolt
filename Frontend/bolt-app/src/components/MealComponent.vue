<template>
    <div class="col mb-5 meal">
        <div class="card h-100" > 
            <div class="row">
                <!-- v-bind:id="store.uuid" -->
                <!-- Store name-->
                <h5 class="fw-bolder">{{meal.name}}</h5> 
                <!-- <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." /> -->
                <!-- Store details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5>Porcija: {{meal.servingSize}}</h5>
                        <h5>Sastojci: {{meal.ingredients}}</h5>
                        <h5>Cena: {{meal.price}}</h5>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="card-body p-4">
                    <div class="text-center">
                        <button class="btn btn-dark m-1" @click="pushDataYes">+</button>
                         <button class="btn btn-dark m-1"  @click="pushDataNo">-</button>
                        <!-- <div class="col-md-4 cena"> -->
                        <!-- </div> -->
                        <!-- <div class="col-md-4 cena"> -->
                        
                        <!-- </div> -->
                        
                        <!-- ovde ide dugme + za dodavanje meal-a u order -->
                    </div>
                </div>
            </div>

            <!-- Product actions
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
// import Vue from 'vue'

export default defineComponent({
   name: "StoreInfoComponent",
   props:{
       meal:{
           required: true,
           type: Object,
       }
       //ovde treba da ide lista meals-a koja ce da se salje u state
    },
    data(){
        return{
            obj:{
                mealID:null,
                name:"",
                price:null
            }
        }
    },
    methods:{
        pushDataYes(){
            this.obj.mealID=this.meal.mealID
            this.obj.name=this.meal.name
            this.obj.price=this.meal.price
            this.$emit('childToParentYes', this.obj)
        },
        pushDataNo(){
            this.obj.mealID=this.meal.mealID
            this.obj.name=this.meal.name
            this.obj.price=this.meal.price
            this.$emit('childToParentNo', this.obj)
        }
        //lista meals-a treba da se postave u state sa postaviMeals funkcijom
    },
    async created(){
        
    },
})
</script>

<style scoped>
.h-100{
    padding: 24px;
}
.meal{
    border: solid black 1px;
    border-radius: 10px;
}
.cena{
    padding: 0;
}
</style>