<template>
    <div class="container-fluid">
        <div class="row">
            <Header />
        </div>
        <div class="row">
            <div class="col-xl-12">
                login stranica
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Header from '@/components/Header.vue'

export default defineComponent({
    setup() {
        
    },
    components:{
        Header
    }
})
</script>

<style scoped>

</style>
