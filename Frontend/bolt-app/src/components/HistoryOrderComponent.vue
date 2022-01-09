<template>
        <div class="col-xl-4">
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Store location-->
                    <h5 class="fw-bolder">{{narudzbina}}</h5>
                    <!-- Vreme isporuke-->
                    <button type="button" class="btn btn-dark" @click="naruciPonovo">Naruci ponovo</button>
                </div>
            </div>
        </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },
    props: {
        narudzbina:{
            required: true,
            type: String, //da se promeni u Object posle
        }
  },
  methods:{
      naruciPonovo(){
          console.log('mozda da se napravi redirekcija ka storemenu za izabrani restoran za koji je bila porudzbina')
      }
  }
})
</script>

<style scoped>

</style>
