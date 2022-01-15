<template>
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-light bg-light heder1">
                <img class="img-responsive" src="../assets/logo-removebg-preview.png" alt="">
            <div class="container px-4 px-lg-5 heder">
                <a class="navbar-brand disabled" href="/" disabled="disabled">Dobrodošli u Bolt!</a>
                <div >
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                         <router-link :to="{name: 'Homepage'}"><li class="nav-item"><a class="nav-link active" aria-current="page" href="#!">Početna</a></li></router-link>
                        <router-link :to="{name: 'Login'}"><li class="nav-item"><a class="nav-link" href="#!">Prijava</a></li></router-link>
                        <router-link :to="{name: 'Register'}"><li class="nav-item"><a class="nav-link" href="#!">Registracija</a></li></router-link>
                    </ul>
                   
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },
})
</script>

<style scoped>
a.disabled {
  pointer-events: none;
  cursor: default;
}
.heder{
    margin: 0;
    padding: 0;
}
.heder1{
    display: flex;
    justify-content: center;
}
</style>
