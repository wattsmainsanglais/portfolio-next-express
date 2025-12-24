'use client'

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Text, DropdownMenu, Button } from "@radix-ui/themes";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export default function LanguageSwitcher({locale}){

    const pathname = usePathname()
    const currentRoute = pathname.slice(3)

    const getFlag = (lang) => {
        return lang === 'en' ? '🇬🇧' : '🇫🇷'
    }

    return (
        <>
        <DropdownMenu.Root modal={false}  >
            <DropdownMenu.Trigger >
                <Button  variant="ghost" size='4' ml='3'>
                    <Text style={{color:'white'}}>{getFlag(locale)} {locale}</Text><ChevronDownIcon/>
                </Button>
            </DropdownMenu.Trigger>

                <DropdownMenu.Content size='2' side='bottom'>

                        <Link href={'/en'+currentRoute}><DropdownMenu.Item ><Text size="4">🇬🇧 en</Text></DropdownMenu.Item></Link>
                        <Link href={'/fr'+currentRoute}><DropdownMenu.Item ><Text size="4">🇫🇷 fr</Text></DropdownMenu.Item></Link>


                </DropdownMenu.Content>
        </DropdownMenu.Root>

        </>


    )
}