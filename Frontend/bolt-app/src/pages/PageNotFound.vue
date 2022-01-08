<template>
  <div class="container">
    <div class="row">
      <Header />
    </div>
    <div class="container">
      <div class="row SrednjiRow">
        <div class="col-xl-12">
          <h1>Ups, stranica koju tražite ne postoji!</h1>
          <!-- <router-link :to="{ name: 'PosetilacHomePage'}"><button type="submit" class="btn btn-primary marstil">Vrati se na početnu stranicu</button></router-link> -->
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
//   computed:{
//     tipKorisnika(){
//       return this.$cookies.get("tip")
//     }
//   },
  methods:{
      vratiRutu(){
          this.$router.push('/')
        //   if(this.tipKorisnika == "A"){
        //       this.$router.push('/AdminHomePage')
        //   }
        //   else if(this.tipKorisnika == "R"){
        //       this.$router.push('/RadnikHomePage')
        //   }
        //   else if(this.tipKorisnika == "M"){
        //       this.$router.push('/MusterijaHomePage')
        //   }
        //   else if(this.tipKorisnika == null){
        //       this.$router.push('/')
        //   }
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