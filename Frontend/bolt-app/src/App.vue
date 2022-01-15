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
    console.log("uso u App.vue")
    this.korisnik.id = Vue.$cookies.get("id");
    this.korisnik.token = Vue.$cookies.get("token");
    this.korisnik.tip = Vue.$cookies.get("tip");
    
    if(this.korisnik != null && this.korisnik.id != null)
    {
      console.log("uso u prvi if u App.vue")
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
        if(message.messageType == "Refresh"){
          await this.$store.dispatch('getUnselectedOrdersDeliverer')
        }
        else if(message.messageType == 'OrderReady'){
          console.log(message)
          if(message.delivererID==this.korisnik.id){
            await this.$store.dispatch("primiObavestenjeDeliverer", message)
            await this.$store.dispatch('obPickUpOrderID', message.orderID)
            await this.$store.dispatch('getAcceptedOrdersByDeliverer')

          }
        }
        else if(message.messageType == 'newOrder'){
          await this.$store.dispatch('getUnselectedOrdersDeliverer')
        }        
      }
    }
    else if(this.korisnik.tip == 'Store'){
      //otvori web socket za njegov port
      const ws = new WebSocket("ws://localhost:3002/");
      ws.onmessage = async (event) => {
        let message = JSON.parse(event.data)
        console.log(message)
        if(message.storeID == this.korisnik.id){
          if(message.messageType=="NewOrder"){
              await this.$store.dispatch("getPendingOrdersStore")
          }
          else if(message.messageType=="HasDeliverer"){
            console.log("usao u else if za hasDeliverer")
            
              await this.$store.dispatch("changeDisabledOrderID", message.orderID)
          }
          else if(message.messageType=="PickedUp"){
            console.log("usao u else if za PickedUp")
              await this.$store.dispatch("getReadyOrdersStore")
          }
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
