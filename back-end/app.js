const { count } = require('console');
const { json } = require('express');
const express = require('express')
const app = express()
const port = 3001

let _data = []


const fs = require("fs");

fs.readFile("./a.json", "utf8", (err, json_data) => {
  if (err) {
    return;
  }
  _data = JSON.parse(json_data);


});




app.get('/all', (req, res) => {
    let a = 0
    let filtered = []
    _data.map((index)=>{  
        if ( a != 200){
          index['key'] = a
          filtered.push(index)
            a=a+1;
        }
    })

  res.send(filtered)
})

app.get('/key',(req,res)=>{
  let aa = Object.keys(_data[0])
  
  res.send(aa)


})


app.get('/Search', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
   console.log(req.query)
  res.send(allsearchf(req.query))
})

app.get('/country', (req, res) => {
  res.send(getCountry())
})


app.get('/multifilter',(req,res)=>{

 res.send(selectBylot(req.query))

})



app.listen(port, () => {
  console.log("STARTED BACKEND")
})






function allsearchf(query) {
  


  let keyy = Object.keys(query)


  if( keyy == 'REGION'){
    keyy = 'region_1'
    query[keyy] = query['REGION']
  } else if( keyy == 'Taster'){
    keyy =  'taster_name'
    query[keyy] = query['Taster']
  }

  let filtered = _data.filter(
    function(item) {
      
      if (item[keyy]) {
        return item[keyy].includes(query[keyy])
      } else {
        return false
      }

    }
  )
  
  let a = 0
  let filtered1 = []
  filtered.map((index)=>{  
    if ( a != 200){
      index['key'] = a
      filtered1.push(index)
        a=a+1;
    }
})

  return filtered1.length >0 ? filtered1 : []
}


 function selectBylot(params){
 
   let filtered = _data.filter((item) =>{
     return Object.keys(params).every( key=>{
     item[key].includes(String(params[key]))
     })
   })
   console.log(filtered)
   return filtered;
 }


 function getCountry() {
   let countrys = []
  
   _data.map(index => {

     if (!countrys.includes(index['country'])) {
       countrys.push(index['country'])
     }

   })


   return countrys;

 }



