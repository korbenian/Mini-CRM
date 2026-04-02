'use client';
import styles from './ThemeButton.module.scss'
import {
Moon,SunDim
} from 'lucide-react'
import React, { useState, useEffect } from 'react'
const ThemeButton = () => {
const [isDark, setIsDark] = useState(false
)
const [mounted,setMounted]=useState(false)

useEffect(()=>{
  const savedTheme = localStorage.getItem('theme');
if (savedTheme !==null){
  setIsDark(savedTheme==='dark')
}
setMounted(true)
},[])


useEffect(()=>{
  if (mounted){ document.body.className = isDark ? 'dark-mode' : 'light-mode'
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  } [isDark,mounted]})



  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  return (
    <button onClick={toggleTheme} className={styles.themeToggleButton}>
{isDark ? <Moon />:<SunDim />}
    </button>
  )
}

export default ThemeButton
