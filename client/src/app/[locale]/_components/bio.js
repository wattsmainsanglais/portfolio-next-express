import { Flex, Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
 
import profilePic from '../../../../public/images/AWattsBrand-46-s.jpg'

import styles from './bio.module.css'

export default function Bio(){
    return(
     
               <Flex direction='column' mt='9' mb='9' p='5' className={styles.bio} >
                    <Flex justify={{initial: 'center', md: 'center'}} pb='3'>
                        <Heading  weight='light' size='9'>About</Heading>
                    </Flex>
                    
                    <Flex direction={{initial: 'column', xs: 'column', small: 'column', md: 'row' }}>
                        <Flex justify='center'>
                            <Image
                                width={200}

                                src={profilePic}
                                alt='Picture of Andrew Watts (awattsdev)'
                            />
                        </Flex>
                        <Flex p='5' width='80vw'>

                        <Text>
                            Hi i'm Andrew, an English & French speaking web developer based in South West France. If you're looking for web design, site modernization, shopping sites, servers and databases, you've come to the right place. 
                            I'm proficient in full stack development and can get your project off the ground from front-end to back. Please contact me using the below contact form or through my social media outlets - links in the header
                        </Text>
                        </Flex>
                        
                    </Flex>
                  
                
                
                </Flex>
                
                 
        
    )
}