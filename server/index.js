const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());


app.get('/', (req, res) =>{
     

        return res.status(200).json({ message: 'Backend API' });
      

})

app.post('/contact', (req, res) =>{
  
  const data = req.body.description
  console.log(data);
  res.json('message received' + data);
})

app.listen(5000, () => console.log('App listening on port 5000!'));