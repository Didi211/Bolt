<template>
  <div class="container">
    <div class="row">
      <Header />
    </div>
    <div class="container">
      <div class="row SrednjiRow">
        <div class="col-xl-12">
          <h1>Ups, nemate odgovarajuće privilegije da pristupite ovoj stranici!</h1>
          <div class="col-xl-12 margine">
            <router-link :to="{ name: 'Homepage'}"><button type="submit" class="btn btn-primary marstil">&nbsp;&nbsp;Vrati se na početnu stranicu</button></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";


export default {
  name: "PageNotAuthenticated",
  components: {
    Header
  }

};
</script>

<style scoped>
.SrednjiRow {
  padding-top: 6rem;
  justify-content: space-between;
}
h1{
    margin:1.2rem;
}
.margine{
    margin-top:1.2rem;
    margin-bottom:1.2rem;
}
</style>