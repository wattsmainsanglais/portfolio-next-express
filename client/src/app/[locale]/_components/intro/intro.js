import { Heading, Flex, Text } from '@radix-ui/themes'

import { useTranslations } from 'next-intl'

export default function Intro(){

    const t = useTranslations("Intro")

    return(
        <Flex height='65vh' direction='column' justify='center' align='center' mt='5' mb='9' pb='5'>
                <Flex direction='column'>
                    <Heading mb='4' weight='light' size='9' align='center'>{t("heading1")}</Heading>
                    <Heading align='center' weight='light' size='7'>{t("heading2")}</Heading>
                
                </Flex>
                
                 
        </Flex>
        
    )
}