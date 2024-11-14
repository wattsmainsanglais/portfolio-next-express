import { CheckIcon } from "@radix-ui/react-icons"
import { FaLaptop } from "react-icons/fa";

import { Flex, Tabs, Box, Text, Heading, Strong } from "@radix-ui/themes"



const devServices = [
'100% Customisable Site, built to specification',
'Multiple hosting Options to fit the size of your business',
'SEO optimized site, right out of the box',
'Shopping sites with choices of payment options',
'Custom Reservation Systems to Save you time',
'Multi Language Sites',
'Integrate your Social Media',
'Interested in Web3? I can discuss options',
'New Sites from €495'


]

const supportServices = [
  'Advice, Handholding or Clearing up technical jargon',
  'Hands on approach to bring your existng project upto date',
  'Experienced with modern Web design techniques',
  'I can work with third party software such as Shopify',
  'Offer In person (Location Dependant) or Virtual Support',
  'Hourly Rates or Support Packages',
  'Open Communication Lines',
  "Don't pay 000's to SEO experts, speak to me first",
  'Extended support, i work with design and marketing experts'



]

export default function Services(){
 
    return (
      <Flex justify='center' align='center' style={{backgroundColor: '#41394bab'}} direction='column' pb='5'>
        <Flex direction='column' justify='center' align='center' width='100%'>
          <Flex width='100%' justify='start' pl='3'>
            <Heading weight='light' size='9'>
              Services
            </Heading>
          </Flex>  
          <Flex justify='center' align='center' width='80%'>
            <Flex width='50%' >
              <Flex direction='column' >
                <Text align='center'>-New business looking to sell your products online? </Text>
                  <br />
                <Text align='center'> -Online booking system to save time?</Text>
                <br />
                <Text align='center'>-Need a more customised site than what 3rd party web builders can offer you?</Text>
                <br />
              
                <Text><Strong><FaLaptop /> My Web Development Services can meet your needs</Strong></Text>
              </Flex>
            </Flex>
            <Flex width='50%'>
              <Flex direction='column' pt='5' >
                <Text align='center'>-Building your own site but need some guidance? </Text>
                <br />
                 <Text align='center'>-Need advice choosing a domain and hosting provider? Confused by SEO?</Text>
                <br />
                <Text align='center'> <Strong>I offer technical support to guide you through your online journey</Strong></Text> 
              </Flex>
            </Flex>

          </Flex>
        
        
        </Flex>
        <Tabs.Root defaultValue="dev" >
          <Flex justify='center'>
            <Tabs.List size='2'>
                      
                  <Tabs.Trigger value="dev"><Text size='6' style={{color: 'white'}}>Web Development</Text></Tabs.Trigger>
                  <Tabs.Trigger value="support"><Text size='6' style={{color: 'white'}} >Web Support</Text></Tabs.Trigger>
              </Tabs.List>

            
          </Flex>
        
          <Flex pt="3" width='75vw' justify='center'>
          

              <Tabs.Content  value='dev'>
                {devServices.map((d, index) => (
                  <Flex align='center' key={index}><CheckIcon color="#907ff3"  /><Text size="5" >{d}</Text></Flex>
                  ))}
              </Tabs.Content>
              <Tabs.Content value='support'>
                  {supportServices.map((d, index) => (
                  <Flex align='center' key={index}><CheckIcon color="#907ff3"  /><Text size="5" >{d}</Text></Flex>
                  ))}
              </Tabs.Content>
           


          </Flex>
        </Tabs.Root>

      </Flex>
  
    )
}