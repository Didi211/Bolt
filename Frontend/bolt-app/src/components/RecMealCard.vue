<template>
    <div class="col mb-5">
        <router-link :to="{name:'StoreMenu',params:{id:rec.store.uuid}}">
            <div class="card h-100" @click="open" v-bind:id="rec.store.uuid">
                <!-- Store name-->
                <h2><span class="badge badge-danger">{{rec.store.name}}</span></h2> 
                <!-- Meal details-->
                <div class="card-body pb-3 pr-4 pl-4">
                    <div class="text-center">
                        <h3>{{rec.meal.name}}</h3>
                        <h5>cena: {{rec.meal.price}}</h5>
                        <!-- Store location-->
                       <p>Adresa:</p>
                        <h4 class="fw-bolder"><span class=" mt-2 badge badge-secondary">{{rec.store.location}}</span></h4>
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
            this.$store.dispatch('postaviPickedStore', this.rec.store.uuid)
       }
    },
    async created(){
        console.log(this.rec)
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
