'use client'
import { useState } from "react";
import { Heading, Text } from "@radix-ui/themes";
import {RxPaperPlane} from "react-icons/rx"


export default function ContactForm() {

  const [data, setData] = useState({name: '', tel: '', email: '', message: ''});
  
const onSubmitForm = async () => {

  console.log(data)
  const response = await fetch('https://server-production-7c47.up.railway.app/api/express/contact', {
    method: 'POST',
    body: JSON.stringify(data),
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    
    
  })

  // Handle response if necessary
  const returndata = await response.json();
  console.log(returndata);
  window.alert(returndata);
  // ...

 
}

const clearData = () => {
  document.getElementById('name').value = '';
  document.getElementById('tel').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';
  
}
   
    return (
      <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitForm();
        clearData();
      }}
      className=""
      >

        <Heading>Contact me here!</Heading>
            
        <label >Name</label>
        <br/>
        <input id='name' type="text" name="name"  required="" onChange={(e) => setData( prevData => ({ ...prevData, name: e.target.value }))} />
        <br/>
        <label >Tel</label>
        <br/>
        <input id='tel' type="text" name="tel"  required="" onChange={(e) => setData( prevData => ({ ...prevData, tel: e.target.value }))} />
        <br/>
        <label >Mail</label>
        <br/>
        <input  id='email' type="text" name="email" onChange={(e) => setData(prevData => ({ ...prevData, email: e.target.value }))}  required=""/>
        <br/>
        <label>Message</label>
        <br/>
        <textarea id='message'  name="message" rows="6"  cols="25" onChange={(e) => setData( prevData => ({ ...prevData, message: e.target.value }))}></textarea>


          <br /> 


        <button style={{backgroundColor: '#907ff3', borderRadius: '2px', display:'flex', justifyContent:'center'}} type="submit"><Text align='center'><RxPaperPlane /></Text></button>
      </form>
     
    )
  }
