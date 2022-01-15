<template>
    <div class="col mb-5">
            <div class="card h-100" @click="open" v-bind:id="store.uuid">
                <!-- Store name-->
                <h2><span class="badge badge-danger">{{store.name}}</span></h2> 
                <!-- Store details-->
                <div class="card-body pb-3 pr-4 pl-4">
                    <div class="text-center">
                        <!-- Store location-->
                        <p>Adresa:</p>
                        <h5 class=" mt-1 fw-bolder">{{store.location}}</h5>
                        <p>Vreme pripreme:</p>
                        <h4><span class=" mt-2 badge badge-secondary">{{store.preptime}}min</span></h4>
                        <!-- Vreme isporuke-->
                        <p></p>
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
    margin: 0;
}
</style>
