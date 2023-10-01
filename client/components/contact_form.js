

const onSubmitForm = async () => {


    const response = await fetch('http://localhost:5000/api/express/contact', {
      method: 'POST',
      body: 'this is a post request',
    })
  
    // Handle response if necessary
    const data = await response.json()
    console.log(data)
    // ...
  }





export default function ContactForm() {

  
   
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitForm();
        }}
      >

             <h2>Contact me here!</h2>
                
            <label >Name</label>
            <br/>
            <input  type="text" name="name"  required="" />
            <br/>
            <label >Email address</label>
            <br/>
            <input  type="text" name="email"  required=""/>
            <br/>
            <label>Message</label>
            <br/>
            <textarea  name="message" rows="6"  cols="25"></textarea>


               


        <button type="submit">Submit</button>
      </form>
    )
  }