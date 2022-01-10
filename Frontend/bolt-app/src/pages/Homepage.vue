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
                <h3>Krenite da narucujete hranu iz <b>najboljih restorana</b>!</h3>
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
                       
                        <!-- <div class="col mb-5 ">
                            <div class="card h-100"> -->
                                <!-- Sale badge-->
                                <!-- <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div> -->
                                <!-- Product image-->
                                <!-- <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." /> -->
                                <!-- Product details-->
                                <!-- <div class="card-body p-4">
                                    <div class="text-center"> -->
                                        <!-- Product name-->
                                        <!-- <h5 class="fw-bolder">Special Item</h5> -->
                                        <!-- Product reviews-->
                                        <!-- <div class="d-flex justify-content-center small text-warning mb-2">
                                            <div class="bi-star-fill"></div>
                                            <div class="bi-star-fill"></div>
                                            <div class="bi-star-fill"></div>
                                            <div class="bi-star-fill"></div>
                                            <div class="bi-star-fill"></div>
                                        </div> -->
                                        <!-- Product price-->
                                        <!-- <span class="text-muted text-decoration-line-through">$20.00</span>
                                        $18.00
                                    </div>
                                </div> -->
                                <!-- Product actions-->
                                <!-- <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                                </div>
                            </div>
                        </div>-->
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
//import Vue from 'vue'
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
