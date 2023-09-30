
import {onSubmit} from '../utils/SubmitForm'

export default function ContactForm() {
    
   
    return (
      <form onSubmit={onSubmit}>
        

             <h2>Contact me here!</h2>
                
            <label for="name">Name</label>
            <br/>
            <input  type="text" name="name" id="name" required="" />
            <br/>
            <label for="email">Email address</label>
            <br/>
            <input  type="text" name="email" id="email" required=""/>
            <br/>
            <label for="message">Message</label>
            <br/>
            <textarea  name="message" rows="6" id="message" required="" value="Type message here" cols="25"></textarea>


               


        <button type="submit">Submit</button>
      </form>
    )
  }