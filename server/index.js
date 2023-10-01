const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(bodyParser.json());


app.get('/', (req, res) =>{
     

        return res.status(200).json({ message: 'Backend API' });
      

})

app.post('/api/express/contact', (req, res) =>{
  
  
  console.log(req.body);
  res.json('message received');
})

app.listen(5000, () => console.log('App listening on port 5000!'));