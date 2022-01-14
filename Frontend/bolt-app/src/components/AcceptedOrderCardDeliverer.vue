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
    <div v-if="obDeliverer.status=='Ready'">
      <button type="button" class="btn  btn-dark dugme" @click="pickedUp">Pokupljeno</button>
    </div>
    <div v-else>
      <button type="button" class="btn  btn-dark dugme" @click="finished"> Dostavljeno</button>
    </div>
    
  </div>
</template>

<script>
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
      orderid:{
        orderID: ""
      }
    }
  },
  computed:{
    obDeliverer(){
      return this.$store.getters['getObDeliverer']
    }
  },
  methods:{
    pickedUp(){
      this.orderid.orderID=this.$props.order.orderID
      this.$store.dispatch('pickedUpOrderDeliverer', this.orderid)

    }
  }
};
</script>

<style scoped>
.Usluga {
  background-color: rgba(255, 255, 255, 0.7);
  /* background-color: rgba(242, 175, 88,0.5); */
  border-radius: 25px;
  /* border: 4px solid rgb(242, 175, 88); */
  border: 2px solid gray;
  padding: 0%;

  /* margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 47px; /*ovo bi trebalo na lepsi nacin da se resi*/

  /* padding-bottom: 15px;
  padding-top: 15px; */
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