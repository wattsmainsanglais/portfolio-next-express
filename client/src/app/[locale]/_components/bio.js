import { Flex, Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
 
import profilePic from '../../../../public/images/AWattsBrand-46-s.jpg'

import styles from './bio.module.css'
import { useTranslations } from 'next-intl'

export default function Bio(){

    const t = useTranslations("About")
    return(
     
               <Flex direction='column' mt='9' mb='9' p='5' className={styles.bio} >
                    <Flex justify={{initial: 'center', md: 'center'}} pb='3'>
                        <Heading  weight='light' size='9'>{t("heading")}</Heading>
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
                           {t("para")}
                        </Text>
                        </Flex>
                        
                    </Flex>
                  
                
                
                </Flex>
                
                 
        
    )
}