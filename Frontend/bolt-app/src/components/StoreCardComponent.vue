<template>
    <div class="col mb-5">
        <div class="card h-100" @click="open">
            <!-- Store name-->
            <h2>info.name</h2> 
            <!-- <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." /> -->
            <!-- Store details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Store location-->
                    <h5 class="fw-bolder">info.location</h5>
                    <!-- Vreme isporuke-->
                    <p>info.time</p>
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
import Vue from 'vue'

export default defineComponent({
   name: "StoreInfoComponent",
   props:{
       info:{
           required: true,
           type: Object,
       },
   },
   methods:{
       open(){
           this.$router.push({ path: 'StoreMenu' })
       }
   }
})
</script>

<style scoped>
.h-100{
    padding: 24px;
}
</style>
