'use client'

import react from "react"

import { motion, AnimatePresence, inView} from "framer-motion"
import {Box, Flex, Heading, Text} from '@radix-ui/themes'




import style from './linkAni.module.css'



export default function Page(){

    const [inview, setInview] = react.useState(true)
    const [display, setDisplay] = react.useState(false)

    function hiddenHandler(i, index){
        i.clicked = true
        setInview(!inview)
        setDisplay( !display)
        


    }

    function ToggleinView() {
      setInview(!inview)
      setDisplay( !display)
    }

    const testArray = [
      {
        name: 'one',
        color: 'cyan',
        width: '25vw',
        name2: 'onea',
        clicked: false,
        widtha: '35vw'
      },
      {
        name: 'two',
        color: 'blue',
        width: '30vw',
        name2: 'twoa',
        clicked: false,
        widtha: '30vw'
      },
      {
        name: 'three',
        color: 'indigo',
        width: '35vw',
        name2: 'threea',
        clicked: false,
        widtha: '25vw'
      }
    ]

    const [activeTab, setActiveTab] = react.useState(0);
    
    const handleTabClick = (index) => {
      setActiveTab(index);
    };

    const tabs = [
      {tag: 'Hello',
       color: '#9850e5'
      },
      {tag: 'Skills',
        color: '#7030b5'
      }, 
      {tag: 'Exp',
        color: '#726f75'
      }, 
      {tag: 'Education',
        color: '#36115e'
      }]



    return(
        <>  
        
            <Box height='100vh' style={{color: 'white'}}>
            <Flex width='99vw' height='100vh' justify='center' gap='3' style={{backgroundColor: 'black'}}>

              <Flex className="sideBar" width='20vw' style={{borderRight: '1px solid gray', zIndex:'2', backgroundColor: 'black'}} direction='column' justify='center' pl='4' pr='4'  >
                <Flex className="imageWrapper">

                </Flex>
                <Flex direction="column" gap="4" pb="2" justify='center' >
                    {tabs.map((tab, index) => (
                      <Text className={activeTab === index ? style.activeTab: style.inactiveTab} 
                      key={index} 
                      onClick={() => handleTabClick(index)} 
                      style={{color: activeTab === index? 'blue':'white', borderColor: tab.color  }}>
                        {tab.tag}
                        </Text>
                    ))}
                </Flex>
              

              </Flex>


              <Flex className="main" direction='column' width='75vw' justify='center' style={{zIndex:'1'}} >
                <Flex justify='center'>
                  {activeTab === 0 ? <Heading>
                    Andrew Watts - CV

                  </Heading> : null}
                  {activeTab === 1 ? <motion.div
                  initial={{x: -800, opacity: .5}}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 500, opacity: 0 }}
                  transition={{duration: 1}}
                  style={{borderRight: `2px solid ${tabs[1].color}`, width:'75vw', height:'80vh'}}
                  >
                  <Flex p='9'>
                  skills page

                 
                  </Flex>
                  </motion.div>
                  : null}
                   {activeTab === 2 ? <motion.div
                  initial={{x: -800, opacity: .5}}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 500, opacity: 0 }}
                  transition={{duration: 1}}
                  style={{borderRight: `2px solid ${tabs[2].color}`, width:'75vw', height:'80vh'}}
                  >
                  <Flex p='9'>
                  exp page

                 
                  </Flex>
                  </motion.div>
                  : null}
                </Flex>
              </Flex>
             

               


             
              


            </Flex>
            </Box>

             {/*testArray.map((i, index) => 

                            <AnimatePresence>
                              {inview && i.clicked==false ?
                              <Flex justify='between'>
                                <motion.div key={index}  
                                     whileInView={{ x: 0}}
            
              
                                     initial={{ x: -300, opacity: 0 }}
                                     animate={{ x: -300, opacity: 1 }}
                                     exit={{ x: -300, opacity: 0 }}
                                     transition={{duration: 1}}
                                  >
                                  <Box width={i.width} height='10vh' style={{backgroundColor: i.color}} onClick={() => hiddenHandler(i, index)}></Box>
                                </motion.div>
                                 
                                  <motion.div key={index}  
                                  whileInView={{ x: -150}}
        
          
                                  initial={{ x: 300, opacity: 0 }}
                                  animate={{ x: 300, opacity: 1 }}
                                  exit={{ x: 300, opacity: 0 }}
                                  transition={{duration: 1}}
                                >
                                  <Box width={i.widtha} height='10vh' style={{backgroundColor: i.color}}>{i.name2}</Box>
                                </motion.div>
                                </Flex> 
                                :
                                
                                <motion.div key={index} 
                                 whileInView={{ x: 400}}
        
          
                                 initial={{ x: 150, opacity: 0 }}
                                 animate={{ x: 150, opacity: 1 }}
                                 exit={{ x: 150, opacity: 0 }}
                                 transition={{duration: 1}}
                                >
                                <Box width={i.widtha} height='10vh' style={{backgroundColor: i.color}}>{i.name2}</Box>
                              </motion.div>
                               
                               


                              }
                            </AnimatePresence>  
                            
                )*/}
            
          
        </>
    )
}