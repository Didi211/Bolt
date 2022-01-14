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
      await this.$store.dispatch("postaviTip", this.korisnik.tip)
      await this.$store.dispatch("postaviToken", this.korisnik.token)
      
      await this.$store.dispatch("postaviOsobaID", this.korisnik.id)
      await this.$store.dispatch("getUserByID", this.korisnik.id)
    }
    if(this.korisnik.tip == 'Customer'){
      //otvori web socket za njegov port
      const ws = new WebSocket("ws://localhost:3000/");
      ws.onmessage = (event) => {
        let message = event.data
        console.log(message.customerID)
        // await this.$store.dispatch("postaviWebSocket", ws)
      }

      
    }
    else if(this.korisnik.tip == 'Deliverer'){
      //otvori web socket za njegov port
      const ws = new WebSocket("ws://localhost:3001/");
      await this.$store.dispatch("postaviWebSocket", ws)

    }
    else if(this.korisnik.tip == 'Store'){
      //otvori web socket za njegov port
      const ws = new WebSocket("ws://localhost:3002/");
      await this.$store.dispatch("postaviWebSocket", ws)

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

}
</style>
