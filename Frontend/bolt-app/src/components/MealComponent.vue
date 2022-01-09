<template>
    <div class="col mb-5 meal">
        <div class="card h-100" @click="open" > 
            <!-- v-bind:id="store.uuid" -->
            <!-- Store name-->
            <h5 class="fw-bolder">Ime jela</h5> 
            <!-- <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." /> -->
            <!-- Store details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Store location-->
                    <h5>Sastojci</h5>
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
</style>