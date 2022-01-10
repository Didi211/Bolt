<template>
  <div class="col-xl-4 Usluga">
    <!-- <h4>{{ order.naziv }}</h4>
    <h5>Cena: {{ usluga.cenaUsluge }} dinara</h5>
    <h5>Kapacitet: {{ usluga.kapacitet }} </h5>
    <button @click="aktivirajUslugu" type="button" class="btn btn-primary dugme"> <font-awesome-icon :icon="['fas', 'lock-open']" />&nbsp;&nbsp; Aktiviraj uslugu</button> -->
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
    // aktivirajUslugu(){
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