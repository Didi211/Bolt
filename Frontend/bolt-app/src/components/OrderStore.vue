<template>
    <div class="col mb-2 meal">
        <div class="" >
            <div class="row">
                
            </div>
            <div class="row">
                <div class="col-xl-8 card-body">
                    <div class="text-center">
                        <h5 class="fw-bolder mt-3">ID narudzbine: {{order.orderID}}</h5> 
                        <h5>Napomena: {{order.note}}</h5>
                    </div>
                    <li class="list-group-item border" v-for="m in order.meals" :key="m.mealID"> {{m.name}}</li>
                </div>
                <div class="col-xl-4  justify-content-center  align-items-center d-flex">
                    <div v-if="order.status === 'Pending'" class="row card-body">
                        <div class="col-xl-12">
                            <div class="text-center m-3">
                                <button @click="prihvatiPorudzbinu" type="submit" class="btn btn-primary marstil">Prihvati porudzbinu</button>
                            </div>
                            <div class="text-center m-3">
                                <button @click="odbijPorudzbinu" type="submit" class="btn btn-primary marstil">Odbij porudzbinu</button>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="order.status === 'Accepted'" class="row card-body">
                        
                    </div>
                    <div v-else-if="order.status === 'Ready'" class="row card-body">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Vue from 'vue'

export default defineComponent({
   name: "OrderStore",
   props:{
       order:{
           required: true,
           type: Object,
       }
    },
    data(){
        return{

        }
    },
    methods:{
        async prihvatiPorudzbinu(){
            let orderInfo = {
                orderID:this.order.orderID,
                storeID:Vue.$cookies.get("id")
            }
            console.log(orderInfo)
            await this.$store.dispatch('acceptOrderStore', orderInfo).then(()=>{
                console.log("sve izvrseno")
            })

        },
        async odbijPorudzbinu(){
            let orderInfo = {
                orderID:this.order.orderID,
                storeID:Vue.$cookies.get("id")
            }

            await this.$store.dispatch('declineOrderStore', orderInfo).then(()=>{
            })
        }
    },
    computed:{

    },
    async created(){
        console.log(this.order)
    }
})
</script>

<style scoped>
.meal{
    border: solid rgb(175, 174, 174) 1px;
    border-radius: 10px;
}
.cena{
    padding: 0;
}
</style>