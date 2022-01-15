<template>
    <div class="col mb-5">
        <router-link :to="{name:'StoreMenu',params:{id:rec.store.uuid}}">
            <div class="card h-100" @click="open" v-bind:id="rec.store.uuid">
                <!-- Store name-->
                <h2><span class="badge badge-danger">{{rec.store.name}}</span></h2> 
                <!-- Meal details-->
                <div class="card-body pb-3 pr-4 pl-4">
                    <div class="text-center">
                        <p>{{rec.meal.name}}</p>
                        <p>{{rec.meal.price}}</p>
                        <!-- Store location-->
                       <p>Adresa:</p>
                        <h5 class=" mt-1 fw-bolder">{{rec.location}}</h5>
                        <p>Vreme pripreme:</p>
                        <h4><span class=" mt-2 badge badge-secondary">{{rec.store.preptime}}min</span></h4>
                        <!-- Vreme isporuke-->
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
// import Vue from 'vue'

export default defineComponent({
   name: "RecMealCard",
   props:{
       rec:{
           required: true,
           type: Object,
       },
    },
    methods:{
     open(){
            // this.$router.push({ path: 'StoreMenu' })
            this.$store.dispatch('postaviPickedStore', this.store.uuid)
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
p{
    margin: 0%;
}
</style>
