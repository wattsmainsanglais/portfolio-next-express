const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const {handleContactForm} = require('./utils/handleContact')


const app = express();

app.use(bodyParser.text());
app.use(cors())



/*app.get('/', (req, res) =>{
     

        return res.status(200).json({ message: 'Backend API' });
      

})*/

app.post('/api/express/contact', (req, res) =>{
  
  
  const {name, tel, email, message} = JSON.parse(req.body)
  console.log(name, tel, email, message);
  
  try{
    handleContactForm(name, tel, email, message, function(msg){
    res.status(201).json(msg);
    })
  } 
    catch(error) {
      console.log(error)
      res.status(201).json('Server issue, if the problem persists please contact me directly through Linkedin in or Git')
  }  
  
})

app.listen(5000, () => console.log('App listening on port 5000!'));