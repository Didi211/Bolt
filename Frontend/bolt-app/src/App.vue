<template>
  <div id="app">
    <router-view/>    
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'App',
  components: {
  },
  data()
  {
    return{
      korisnik:
      {
        id: -1,
        token: "",
        tip: "",
      }
    }
  },
  async created(){
    this.korisnik.id = Vue.$cookies.get("id");
    this.korisnik.token = Vue.$cookies.get("token");
    this.korisnik.tip = Vue.$cookies.get("tip");
    
    if(this.korisnik != null && this.korisnik.id != null)
    {
      console.log(this.korisnik)
      await this.$store.dispatch("postaviTip", this.korisnik.tip)
      await this.$store.dispatch("postaviToken", this.korisnik.token)
      
      await this.$store.dispatch("postaviOsobaID", this.korisnik.id)
      await this.$store.dispatch("getUserByID", this.korisnik.id)
    }

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
