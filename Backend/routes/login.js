const express = require('express')
const router = express.Router()
const neo4j = require('../config/neo4j_config')
const token = require('../config/token')
const bcrypt = require('bcrypt')
const { GetCustomerByUsername } = require('../controllers/customerController')

router.post('/customer', async (req,res)=>{
    try{
    let customer = await neo4j.first('Customer', {username : req.body.username})

    if(customer == false)
        res.status(404).send('User not found!')
    
    console.log({username : req.body.username});
    bcrypt.compare(req.body.password, customer._properties.get("password"), (err, result)  => {
        if(result){
            let user = {
                username : customer._properties.get("username"),
                uuid :customer._properties.get("uuid"),
                role :customer._properties.get("role")
            }
            var webtoken = token.generateAccessToken(user)
            res.send({user,webtoken});
            return;
        }else{
            res.status(401).send({
                error: "Incorrect password"})
        }
    })  
   }
    catch(e)
    
    {throw e}
  
})

router.post('/store',(req,res)=>{
    let customer = GetCustomerByUsername(req) // u store
    if(customer == 'ERROR!')
        res.send('User not found!').status(404)
      
    bcrypt.compare(customer._properties.get("password"), user.password, (err, result)  => {
        if(result){
            var currentToken = token.generateAccessToken(user)
            res.send({user: user, token: currentToken});
            return;
        }else{
            res.status(401).send({
                error: "Incorrect password"})
        }
    })     
  
})
router.post('/deliverer',(req,res)=>{
    let customer = GetCustomerByUsername(req) // u deliverer
    if(customer == 'ERROR!')
        res.send('User not found!').status(404)
      
    bcrypt.compare(customer._properties.get("password"), user.password, (err, result)  => {
        if(result){
            var currentToken = token.generateAccessToken(user)
            res.send({user: user, token: currentToken});
            return;
        }else{
            res.status(401).send({
                error: "Incorrect password"})
        }
    })     
  
})


module.exports = router