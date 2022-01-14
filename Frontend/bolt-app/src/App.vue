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
      ws.onmessage = async (event) => {
        let message = JSON.parse(event.data)
        console.log(message)
        if(message.customerID == this.korisnik.id){
            await this.$store.dispatch("primiObavestenjeMusteriji", message)
        }
      }

      
    }
    else if(this.korisnik.tip == 'Deliverer'){
      //otvori web socket za njegov port
      const ws = new WebSocket("ws://localhost:3001/");
      ws.onmessage = async (event) => {
        let message = JSON.parse(event.data)
        console.log(message)
        // await this.$store.dispatch("primiObavestenjeDeliverer", message)
        await this.$store.dispatch('getUnselectedOrdersDeliverer')
        
      }

    }
    else if(this.korisnik.tip == 'Store'){
      //otvori web socket za njegov port
      const ws = new WebSocket("ws://localhost:3002/");
      //primaju se nove porudzbine
      ws.onmessage = async (event) => {
        let message = JSON.parse(event.data)
        console.log(message)
        if(message.storeID == this.korisnik.id){
            await this.$store.dispatch("getPendingOrdersStore").then(()=>{
              // window.location.reload()
            })
        }
      }
      // await this.$store.dispatch("postaviWebSocket", ws)
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
