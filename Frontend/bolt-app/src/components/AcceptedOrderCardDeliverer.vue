<template>
  <div class="col-xl-4 Usluga">
    <!-- <h4>Narudzbina</h4>
    <h5>Restoran: {{ order.store.name }}</h5>
    <h5>Adresa restorana: {{ order.store.location }} </h5>
    <h5>Cena: {{ order.order.price }} dinara</h5>
    <h5>Adresa musterije: {{ order.order.onAddress }} </h5>
    <h5>Note: {{order.order.note}}</h5>
    <button @click="acceptOrder" type="button" class="btn btn-primary dugme"> Prihvati </button> -->
    <!-- <div class="row">
      <div class="col-xl-6">
      </div>
      <div class="col-xl-6">
        <button type="button" class="btn btn-danger dugme" @click="izbrisiUslugu">Izbrisi uslugu</button>
      </div>
    </div> -->
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
    }
  },
  methods:{
    // acceptOrder(){
    //   this.$store.dispatch('aktivirajUsluguAdmin', this.usluga.id);
    // }
  }
};
</script>

<style scoped>
.Usluga {
  background-color: rgba(255, 255, 255, 0.7);
  /* background-color: rgba(242, 175, 88,0.5); */
  border-radius: 25px;
  /* border: 4px solid rgb(242, 175, 88); */
  border: 4px solid rgb(255, 255, 255);

  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 47px; /*ovo bi trebalo na lepsi nacin da se resi*/

  padding-bottom: 15px;
  padding-top: 15px;
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