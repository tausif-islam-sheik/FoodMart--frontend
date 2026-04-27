"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    const currentTheme = resolvedTheme || theme
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  return (
    <Button 
      variant="outline" 
      size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-lg border-2 border-border bg-background hover:bg-accent transition-all"
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: resolvedTheme === "dark" ? 180 : 0,
          scale: 1 
        }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <Sun className="h-5 w-5 text-amber-600 transition-all dark:hidden" />
        <Moon className="h-5 w-5 text-indigo-500 hidden transition-all dark:block" />
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
