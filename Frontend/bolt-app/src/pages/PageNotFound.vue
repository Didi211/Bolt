<template>
  <div class="container">
    <div class="row">
      <Header />
    </div>
    <div class="container">
      <div class="row SrednjiRow">
        <div class="col-xl-12">
          <h1>Ups, stranica koju tražite ne postoji!</h1>
          <button @click="vratiRutu" type="submit" class="btn btn-primary marstil">&nbsp;&nbsp;Vrati se na početnu stranicu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "PageNotFound",
  components: {
    Header
  },
  methods:{
      vratiRutu(){
          this.$router.push('/')
      }
  }

};
</script>

<style scoped>
.SrednjiRow {
  padding-top: 6rem;
  justify-content: space-between;
}
</style>