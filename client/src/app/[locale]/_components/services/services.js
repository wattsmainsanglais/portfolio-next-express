

import { Flex, Tabs, Box, Text, Heading } from "@radix-ui/themes"


export default function Services(){
 
    return (
      <Flex justify='center' align='center' style={{backgroundColor: '#41394bab'}} direction='column'>
        <Flex direction='column' justify='center' align='center'>
          <Heading>
            Services
          </Heading>
          <Text>
            I provide 2 main channels of service. Development of new sites or Technical support to clients in need.
          </Text>
        </Flex>
        <Tabs.Root defaultValue="dev" >
          <Tabs.List size='2'>
            
            <Tabs.Trigger value="dev"><Text size='6' style={{color: 'white'}}>Web Development</Text></Tabs.Trigger>
            <Tabs.Trigger value="support"><Text size='6' style={{color: 'white'}} >Web Support</Text></Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content value="dev">
              <Text size="2">dev</Text>
            </Tabs.Content>

            <Tabs.Content value="support">
              <Text size="2">support section.</Text>
            </Tabs.Content>

          </Box>
        </Tabs.Root>

      </Flex>
  
    )
}