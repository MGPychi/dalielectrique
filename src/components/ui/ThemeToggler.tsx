"use client";
import { useTheme } from 'next-themes'
import { Button } from './button'
import { MoonIcon, SunIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const ThemeToggler = ({className}:{className?:string}) => {
  const {setTheme,theme} = useTheme()
  return (
        <Button aria-label='dark light  mode toggle button' variant="ghost" className='rounded-full w-12 h-12' size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? <SunIcon className={cn("w-5 h-5 ",className)} /> : <MoonIcon className={cn("w-5 h-5 ",className)} />}
    </Button>

  )
}

export default ThemeToggler
