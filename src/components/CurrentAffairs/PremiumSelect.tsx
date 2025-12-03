"use client"
import React, { useEffect, useRef, useState } from 'react'
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
  const ref = useRef<HTMLDivElement|null>(null)
  const selected = options.find(o=>o.value===value)

  useEffect(()=>{
    const handler = (e: MouseEvent) => {
      if(!ref.current) return
      if(!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return ()=> document.removeEventListener('mousedown', handler)
  },[])

  const onSelect = (v:string)=>{ onChange(v); setTimeout(()=> setOpen(false),0) }

  return (
    <div className={styles.selectWrapper} ref={ref}>
      {label && <div className={styles.labelTitle}>{label}</div>}
      <button type="button" className={styles.trigger} onClick={()=> setOpen(v=>!v)} aria-haspopup="listbox" aria-expanded={open}>
        <span>{selected?.label ?? 'Select'}</span>
        <svg className={styles.triggerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </button>
      {open && (
        <div role="listbox" className={styles.panel} aria-label={label || 'Options'}>
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
      )}
    </div>
  )
}
