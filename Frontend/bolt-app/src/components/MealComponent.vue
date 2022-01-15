<template>
    <div class="col mb-5 meal">
        <div class="card h-100" > 
            <div class="row">
                <!-- Store name-->
                <h5 class="fw-bolder">{{meal.name}}</h5> 
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
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
   name: "StoreInfoComponent",
   props:{
       meal:{
           required: true,
           type: Object,
       }
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