<template>
    <div class="container-fluid">
        <div class="row">
            <Header />
        </div>
        <div class="row">
            <header class="bg-dark py-5">
                <div class="container px-4 px-lg-5 my-5">
                    <div class="text-center text-white">
                        <h1 class="display-4 fw-bolder">BOLT</h1>
                        <p class="lead fw-normal text-white-50 mb-0"><b>Niš</b>Ta ne spremaj naručujemo klopu</p>
                    </div>
                </div>
            </header>
        <!-- Section-->
        <div class="row">
            <div class="col-xl-12 justify-content-center margine">
                <h3>Krenite da naručujete hranu iz <b>najboljih restorana</b>!</h3>
                <div class="row justify-content-center">
                        <div class="col-xl-1">
                        <router-link :to="{name:'Login'}" class="crnistil">Prijavite se!</router-link>

                        </div>
                        <div class="col-xl-1">
                        <router-link :to="{name:'Register'}" class="crnistil">Registrujte se!</router-link>

                        </div>
                </div>

            </div>
        </div>
            <section class="">
                <div class="container px-4 px-lg-5 mt-5">
                    <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center">
                        
                        <StoreCard v-for="store in top5" 
                                    :key="store.id" 
                                    :store="store"/>
                    </div>
                </div>
            </section>
        </div>
        <div class="row">
            <Footer />
        </div>
        
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import  Header  from '@/components/Header.vue'
import  Footer  from '@/components/Footer.vue'
import StoreCard from '@/components/StoreCardUnregComponent.vue'

export default defineComponent({
    name: "Homepage",
    components: {
        Header,
        Footer,
        StoreCard
    },
    data(){
        return{
            isDataLoaded:true
        }
    },
    computed:{
        top5(){
            return this.$store.getters['getTop5Rest']
        }
    },
    async created(){
        this.isDataLoaded = false
        await this.$store.dispatch('getTop5Rest').then(()=>{
            this.isDataLoaded = true;
        })
    }
})
</script>

<style scoped>
.visina{
    height: 100px;
}
.margine{
    margin-top:1.2rem;
}
.crnistil{
    color:black;
}
</style>
