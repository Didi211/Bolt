<template>
    <div class="col mb-5">
        <router-link :to="{name:'StoreMenu',params:{id:store.uuid}}">
            <div class="card h-100" @click="open" v-bind:id="store.uuid">
                <!-- Store name-->
                <h2><span class="badge badge-danger">{{store.name}}</span></h2> 
                <!-- <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." /> -->
                <!-- Store details-->
                <div class="card-body pb-3 pr-4 pl-4">
                    <div class="text-center">
                        <!-- Store location-->
                       <p>Adresa:</p>
                        <h5 class=" mt-1 fw-bolder">{{store.location}}</h5>
                        <p>Vreme pripreme:</p>
                        <h4><span class=" mt-2 badge badge-secondary">{{store.preptime}}min</span></h4>
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
   name: "StoreInfoComponent",
   props:{
       store:{
           required: true,
           type: Object,
       },
    },
    methods:{
     open(){
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
