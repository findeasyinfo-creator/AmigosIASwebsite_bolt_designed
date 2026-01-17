'use client'
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load theme from localStorage or use system preference
    if (typeof window !== 'undefined') {
      let savedTheme: Theme | null = null
      try {
        savedTheme = localStorage.getItem('theme') as Theme
      } catch (e) {}
      
      if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
        setTheme(savedTheme)
        document.documentElement.setAttribute('data-theme', savedTheme)
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      } else {
        const initialTheme: Theme = 'light'
        setTheme(initialTheme)
        document.documentElement.setAttribute('data-theme', initialTheme)
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  const toggleTheme = () => {
    if (typeof window === 'undefined') return
    
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    
    try {
      localStorage.setItem('theme', newTheme)
    } catch (e) {}
    
    document.documentElement.setAttribute('data-theme', newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
