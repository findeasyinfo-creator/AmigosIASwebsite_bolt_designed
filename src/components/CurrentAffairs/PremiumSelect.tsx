"use client"
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './PremiumSelect.module.css'

type Option = { label: string; value: string }

type Props = {
  label?: string
  value: string
  options: Option[]
  onChange: (v: string) => void
}

export default function PremiumSelect({ label, value, options, onChange }: Props){
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement|null>(null)
  const triggerRef = useRef<HTMLButtonElement|null>(null)
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })
  const selected = options.find(o=>o.value===value)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width
      })
    }
  }, [open])

  useEffect(()=>{
    const handler = (e: MouseEvent) => {
      if(!ref.current) return
      if(!ref.current.contains(e.target as Node) && !triggerRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return ()=> document.removeEventListener('mousedown', handler)
  },[])

  const onSelect = (v:string)=>{ onChange(v); setTimeout(()=> setOpen(false),0) }

  const panel = open && mounted ? (
    <div 
      ref={ref}
      role="listbox" 
      className={styles.panelPortal} 
      aria-label={label || 'Options'}
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        zIndex: 999999
      }}
    >
      <div className={styles.scroll}>
        {options.map(o=>{
          const active = o.value===value
          return (
            <button
              key={o.value}
              role="option"
              aria-selected={active}
              className={`${styles.option} ${active?styles.optionActive:''}`}
              onClick={()=> onSelect(o.value)}
            >
              <span>{o.label}</span>
              {active && <span className={styles.check}>✓</span>}
            </button>
          )
        })}
      </div>
    </div>
  ) : null

  return (
    <div className={styles.selectWrapper}>
      {label && <div className={styles.labelTitle}>{label}</div>}
      <button 
        type="button" 
        ref={triggerRef}
        className={styles.trigger} 
        onClick={()=> setOpen(v=>!v)} 
        aria-haspopup="listbox" 
        aria-expanded={open}
      >
        <span>{selected?.label ?? 'Select'}</span>
        <svg className={styles.triggerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </button>
      {mounted && typeof window !== 'undefined' && createPortal(panel, document.body)}
    </div>
  )
}
