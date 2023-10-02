const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(bodyParser.text());
app.use(cors())



/*app.get('/', (req, res) =>{
     

        return res.status(200).json({ message: 'Backend API' });
      

})*/

app.post('/api/express/contact', (req, res) =>{
  
  const data = JSON.parse(req.body)

  
  console.log(data);
  res.json('Message received. Thank you ' + data.name + ' , I will be in contact soon');
})

app.listen(5000, () => console.log('App listening on port 5000!'));