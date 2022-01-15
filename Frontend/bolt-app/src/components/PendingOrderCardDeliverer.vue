<template>
  <div class=" Usluga">
    <h4><b>Narudzbina: {{order.orderID}}</b></h4>
    <div v-for="r in order.restaraunt" :key="r.uuid">
    <h5><b>Restoran:</b> {{ r.name }}</h5>
    <h5><b>Adresa restorana:</b> {{ r.location }} </h5>

    </div>
    <h5><b>Cena:</b> {{ order.price }} dinara</h5>
    <h5><b>Adresa musterije:</b> {{ order.onAddress }} </h5>
    <h5><b>Note:</b> {{order.note}}</h5>
    <h5><b>Status:</b> {{order.status}}</h5>
    <button type="button" class="btn btn-dark dugme" @click="acceptOrder"> Prihvati </button>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: "OrderCardDeliverer",
  props: {
    order: {
      required: true,
      type: Object,
    }
  },
  data(){
    return{
      accept:{
        orderID:"",
        delivererID:""
      }
    }
  },
  methods:{
    acceptOrder(){
      this.accept.orderID=this.$props.order.orderID
      this.accept.delivererID= Vue.$cookies.get("id")
      this.$store.dispatch('acceptOrderDeliverer', this.accept);
    }
  }
};
</script>

<style scoped>
.Usluga {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 25px;
  border: 2px solid gray;
  padding: 0%;
  justify-self: center;
}
.dugme{
  margin-top:5px;
  margin-bottom:5px;
}
.btn:focus {
  outline: 0;
  box-shadow: 0;
}
</style>