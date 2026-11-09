'use client'

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Text, DropdownMenu, Button } from "@radix-ui/themes";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { switchLocalePath } from "@/lib/routes";

// textClassName overrides the default white text (for light backgrounds)
export default function LanguageSwitcher({locale, textClassName}){

    // Localized slugs differ per language (/fr/creation-site-internet <-> /en/websites)
    const pathname = usePathname()

    const getFlag = (lang) => {
        return lang === 'en' ? '🇬🇧' : '🇫🇷'
    }

    return (
        <>
        <DropdownMenu.Root modal={false}  >
            <DropdownMenu.Trigger >
                <Button  variant="ghost" size='4' ml='3'>
                    <Text className={textClassName} style={textClassName ? undefined : {color:'white'}}>{getFlag(locale)} {locale}</Text><ChevronDownIcon/>
                </Button>
            </DropdownMenu.Trigger>

                <DropdownMenu.Content size='2' side='bottom' style={{ zIndex: 60 }}>

                        <Link href={switchLocalePath(pathname, 'en')}><DropdownMenu.Item ><Text size="4">🇬🇧 en</Text></DropdownMenu.Item></Link>
                        <Link href={switchLocalePath(pathname, 'fr')}><DropdownMenu.Item ><Text size="4">🇫🇷 fr</Text></DropdownMenu.Item></Link>


                </DropdownMenu.Content>
        </DropdownMenu.Root>

        </>


    )
}