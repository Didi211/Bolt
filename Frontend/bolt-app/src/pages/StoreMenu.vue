<template>
<div class="container-fluid">
    <div class="row">
            <Header />
    </div>
    <div class="row">
        <div class="row">
            <header class="bg-dark ">
                <div class="container naziv px-4 px-lg-5 my-5">
                    <div class="text-center text-white">
                        <div class="row text">
                        <h5 class="display-4 fw-bolder">Store name</h5>
                        </div>
                        <div class="row">
                            <div class="col-md-6"> 
                                <p class="lead fw-normal text-white-50 mb-0">Vreme pripreme</p>
                            </div>
                            <div class="col-md-6"> 
                                <p class="lead fw-normal text-white-50 mb-0">Lokacija</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
        <div class="row">
            <div class="col-md-3"> 
                <p class="lead fw-normal text-black-50 mb-0">Odeljak</p>
                <p>Pice</p>
                <p>Paste</p>
                <p>Pancerote</p>
                <p>Salate</p>
            </div>
            <div class="col-md-6"> 
                <p class="lead fw-normal text-black-50 mb-0">Llista hrane</p>
            </div>
            <div class="col-md-3 basket"> 
                <p class="lead fw-normal text-black-50 mb-0">KOrpa</p>
            </div>
            <!-- <h1>STORE NAME</h1> -->
        </div>
    </div>
    <div class="row">
            <Footer />
    </div>
</div>
<!-- heder sa korpom -->
<!-- Naziv restorana -->
<!-- lokacija -->
<!-- vreme spremanja -->
    <!-- <h1>STORE MENU</h1> -->

</template>
<script>
import { defineComponent } from '@vue/composition-api'
import  Header  from '@/components/Header.vue'
import  Footer  from '@/components/Footer.vue'

export default defineComponent({
    name: "StoreMenu",
    components: {
        Header,
        Footer,
    },
    setup() {
        
    },
})
</script>

<style scoped>
/* .bg-dark{
    padding: 0;
    padding-bottom: 0%;
    padding-top: 0%;
    height: 50%;
} */
.naziv{
    
    width: 100%;
}
.row{
    padding:0;
    margin: 0;
}
.basket{
    position: relative;
}

</style>
