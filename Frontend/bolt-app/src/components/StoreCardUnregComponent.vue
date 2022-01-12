<template>
    <div class="col mb-5">
            <div class="card h-100" @click="open" v-bind:id="store.uuid">
                <!-- Store name-->
                <h2>{{store.name}}</h2> 
                <!-- <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." /> -->
                <!-- Store details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Store location-->
                        <p>Adresa:</p>
                        <h5 class="fw-bolder">{{store.location}}</h5>
                        <p>Vreme pripreme:</p>
                        <h5 class="fw-bolder">{{store.preptime}}min</h5>
                        <!-- Vreme isporuke-->
                        <p></p>
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
       store:{
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
    margin: 0;
}
</style>
