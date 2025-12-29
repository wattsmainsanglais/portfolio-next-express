const express = require('express');
const bodyParser = require('body-parser');

const {handleContactForm} = require('./utils/handleContact')


const app = express();
const port = process.env.PORT || 5000;

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
      "default-src 'self'; font-src 'self' https://fonts.gstatic.com ; img-src 'self' 'unsafe-inline' ; script-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com  ; style-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; frame-src 'self'; connect-src http://localhost:5000  'https://server-production-7c47.up.railway.app/api/express/contact' ; worker-src blob:; child-src blob:"
  );
  res.setHeader('X-Content-Type-Options', 'nosniff');


  const allowedOrigins = ['https://server-production-7c47.up.railway.app/api/express/contact', 'https://portfolio-next-express-production.up.railway.app', 'http://localhost:5000', 'http://localhost:3000', 'https://www.awattsdev.eu'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

 
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(bodyParser.json());




app.get('/', (req, res) =>{
     

        return res.status(200).json({ message: 'Backend API' });
      

})

app.post('/api/express/contact', (req, res) =>{


  const {name, tel, email, message} = req.body
  console.log(name, tel, email, message);
  
  try{
    handleContactForm(name, tel, email, message, url = '', function(msg){
    res.status(201).json(msg);
    })
  } 
    catch(error) {
      console.log(error)
      res.status(201).json('Server issue, if the problem persists please contact me directly through Linkedin in or Git')
  }  
  
})


app.listen(port, '0.0.0.0', () => console.log('App listening on port 5000 i think!'));