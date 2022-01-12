module.exports = {
    
    RecordsToJSON : (records) =>{
        let item= []    
        records.forEach(element => {       
            
            item.push(element._fields[0].properties)
        })
        return item
    },

    NodeTOString : (node) =>{
       return JSON.stringify(Object.fromEntries(node._properties));
    },
    NodeToJson : (node) => { 
        return Object.fromEntries(node._properties);
    }
    
}