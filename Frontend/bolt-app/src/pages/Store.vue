<template>
    <div class="container-fluid">
        <div class="row">
            <HeaderStore />
        </div>

        <div class="row">
            <Footer />
        </div>
        
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import  HeaderStore  from '@/components/HeaderSAndD.vue'
import  Footer  from '@/components/Footer.vue'
//import StoreCard from '@/components/StoreCardComponent.vue'

export default defineComponent({
    name: "Homepage",
    components: {
        HeaderStore,
        Footer,
        //StoreInfo
    },
    // computed:{
    //     information(){
    //         return this.$store.getters['getStoreCard']
    //     }
    // },
    // async created(){
    //     await this.$store.dispatch('getStoreCard').then(()=>{
    //     })
    // }
})
</script>

<style scoped>
.visina{
    height: 100px;
}
</style>
