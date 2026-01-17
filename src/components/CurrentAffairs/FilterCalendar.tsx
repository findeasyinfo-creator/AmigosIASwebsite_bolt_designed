"use client"
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './FilterCalendar.module.css'

type Mode = 'date' | 'week' | 'month'

type Props = {
  mode: Mode
  value?: string
  onChange: (v?: string) => void
  title?: string
  open?: boolean
  onClose?: () => void
  triggerElement?: HTMLElement | null
}

function formatMonthLabel(d: Date){
  return d.toLocaleString(undefined,{month:'long', year:'numeric'})
}

function getMonthDays(year:number, month:number){
  const first = new Date(year, month, 1)
  const last = new Date(year, month+1, 0)
  const days: Date[] = []
  for(let i=1;i<=last.getDate();i++) days.push(new Date(year, month, i))
  return {first, last, days}
}

function getISOWeekRange(isoWeek: string){
  // isoWeek: YYYY-Www
  const [y, wRaw] = isoWeek.split('-W')
  const year = parseInt(y,10)
  const w = parseInt(wRaw,10)
  const simple = new Date(year,0,1+(w-1)*7)
  const dow = simple.getDay()
  const start = new Date(simple)
  start.setDate(simple.getDate() + (dow===0?-6:1-dow))
  start.setHours(0,0,0,0)
  const end = new Date(start)
  end.setDate(start.getDate()+6)
  end.setHours(23,59,59,999)
  return {start,end}
}

export default function FilterCalendar({mode, value, onChange, title, open = true, onClose, triggerElement}: Props){
  const ref = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })
  const [customDate, setCustomDate] = useState('')
  const [customWeek, setCustomWeek] = useState('')
  const [customMonth, setCustomMonth] = useState('')
  const [customYear, setCustomYear] = useState('')
  const now = new Date()
  const [cursor, setCursor] = React.useState<Date>(()=>{
    if(mode==='month' && value){
      const [y,m] = value.split('-').map(Number)
      return new Date(y, m-1, 1)
    }
    if(mode==='week' && value){
      const {start} = getISOWeekRange(value)
      return new Date(start.getFullYear(), start.getMonth(), 1)
    }
    if(mode==='date' && value){
      const d = new Date(value)
      return new Date(d.getFullYear(), d.getMonth(), 1)
    }
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const {first, days} = getMonthDays(year, month)
  const startWeekday = (first.getDay()+6)%7 // Mon=0

  console.log('FilterCalendar render:', { 
    open, 
    mode, 
    year, 
    month, 
    daysLength: days.length, 
    startWeekday,
    firstDay: days[0]?.toISOString(),
    mounted,
    triggerElement: !!triggerElement
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (open && triggerElement && typeof window !== 'undefined') {
      const rect = triggerElement.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      // Get navbar height (assuming it's sticky at top)
      const navbarHeight = 80 // approximate navbar height, adjust if needed
      
      // Calculate position
      let top = rect.bottom + window.scrollY + 8
      let left = rect.left + window.scrollX
      
      // Ensure calendar appears below navbar
      const minTop = window.scrollY + navbarHeight + 8
      if (top < minTop) {
        top = minTop
      }
      
      // For mobile, center the calendar and adjust positioning
      if (viewportWidth <= 640) {
        left = Math.max(16, Math.min(left, viewportWidth - 316)) // 300px width + 16px margin
        
        // Check if calendar would overflow bottom
        const calendarHeight = 400 // approximate height
        if (rect.bottom + calendarHeight > viewportHeight) {
          // Position above if not enough space below
          top = Math.max(minTop, rect.top + window.scrollY - calendarHeight - 8)
        }
      } else {
        // Desktop: ensure calendar doesn't overflow viewport
        const calendarWidth = 280
        if (left + calendarWidth > viewportWidth - 16) {
          left = viewportWidth - calendarWidth - 16
        }
      }
      
      setPosition({
        top,
        left,
        width: viewportWidth <= 640 ? 300 : Math.max(rect.width, 280)
      })
    }
  }, [open, triggerElement])

  // click outside to close
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) {
        onClose?.()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onClose])

  const selectAndClose = (v?: string) => {
    onChange(v)
    setTimeout(() => onClose?.(), 0)
  }

  const handleCustomDate = () => {
    const monthToUse = customMonth || String(cursor.getMonth() + 1)
    const yearToUse = customYear || String(cursor.getFullYear())
    
    if (monthToUse && yearToUse && /^\d{1,2}$/.test(monthToUse) && /^\d{4}$/.test(yearToUse)) {
      const m = parseInt(monthToUse, 10)
      const y = parseInt(yearToUse, 10)
      if (m >= 1 && m <= 12 && y >= 2000 && y <= 2100) {
        setCursor(new Date(y, m - 1, 1))
        setCustomMonth('')
        setCustomYear('')
      }
    }
  }

  const handleCustomWeek = () => {
    const monthToUse = customMonth || String(cursor.getMonth() + 1)
    const yearToUse = customYear || String(cursor.getFullYear())
    
    if (monthToUse && yearToUse && /^\d{1,2}$/.test(monthToUse) && /^\d{4}$/.test(yearToUse)) {
      const m = parseInt(monthToUse, 10)
      const y = parseInt(yearToUse, 10)
      if (m >= 1 && m <= 12 && y >= 2000 && y <= 2100) {
        setCursor(new Date(y, m - 1, 1))
        setCustomMonth('')
        setCustomYear('')
      }
    }
  }

  const handleCustomMonth = () => {
    if (customMonth && customYear && /^\d{1,2}$/.test(customMonth) && /^\d{4}$/.test(customYear)) {
      const monthNum = parseInt(customMonth, 10)
      if (monthNum >= 1 && monthNum <= 12) {
        const val = `${customYear}-${String(monthNum).padStart(2, '0')}`
        selectAndClose(val)
        setCustomMonth('')
        setCustomYear('')
      }
    }
  }

  if (!open) return null

  const calendar = (
    <div 
      ref={ref} 
      className={styles.calendarCard}
      style={triggerElement ? {
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        maxWidth: 'calc(100vw - 32px)',
        zIndex: 99999
      } : undefined}
    >
      <div className={styles.header}>
        <div className={styles.title}>{title || (mode==='date'?'Select Date': mode==='week'?'Select Week':'Select Month')}</div>
        <div className={styles.controls}>
          <button className={styles.btn} onClick={()=> setCursor(new Date(year, month-1, 1))}>Prev</button>
          <div className={styles.weekBadge}>{formatMonthLabel(cursor)}</div>
          <button className={styles.btn} onClick={()=> setCursor(new Date(year, month+1, 1))}>Next</button>
        </div>
      </div>

      {mode==='date' && (
        <>
          <div className={styles.customDateInput}>
            <input 
              type="number" 
              value={customMonth || String(cursor.getMonth()+1)}
              onChange={(e) => setCustomMonth(e.target.value)}
              className={styles.dateInput}
              placeholder="Month (1-12)"
              min="1"
              max="12"
              style={{flex: '1 1 0'}}
            />
            <input 
              type="number" 
              value={customYear || String(cursor.getFullYear())}
              onChange={(e) => setCustomYear(e.target.value)}
              className={styles.dateInput}
              placeholder="Year"
              min="2000"
              max="2100"
              style={{flex: '1 1 0'}}
            />
            <button 
              className={styles.addBtn} 
              onClick={handleCustomDate}
            >
              Go
            </button>
          </div>
          <div className={styles.weekdayHeader}>
            {[...'MonTueWedThuFriSatSun'.match(/.{1,3}/g)!].map((d,i)=> (
              <div key={i} className={styles.weekdayLabel}>{d}</div>
            ))}
          </div>
          <div className={styles.grid}>
            {Array.from({length:startWeekday}).map((_,i)=> <div key={`empty-${i}`} className={styles.emptyCell} />)}
            {days.map((d)=>{
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              const isToday = today.toDateString() === d.toDateString()
              const isSelected = value && new Date(value).toDateString() === d.toDateString()
              const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
              return (
                <button
                  key={d.toISOString()}
                  className={`${styles.cell} ${isSelected ? styles.cellActive : ''} ${isToday ? styles.cellToday : ''}`}
                  onClick={()=> selectAndClose(dateStr)}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    selectAndClose(dateStr);
                  }}
                  type="button"
                >{d.getDate()}</button>
              )
            })}
          </div>
        </>
      )}

      {mode==='week' && (
        <>
          <div className={styles.customDateInput}>
            <input 
              type="number" 
              value={customMonth || String(cursor.getMonth()+1)}
              onChange={(e) => setCustomMonth(e.target.value)}
              className={styles.dateInput}
              placeholder="Month (1-12)"
              min="1"
              max="12"
              style={{flex: '1 1 0'}}
            />
            <input 
              type="number" 
              value={customYear || String(cursor.getFullYear())}
              onChange={(e) => setCustomYear(e.target.value)}
              className={styles.dateInput}
              placeholder="Year"
              min="2000"
              max="2100"
              style={{flex: '1 1 0'}}
            />
            <button 
              className={styles.addBtn} 
              onClick={handleCustomWeek}
            >
              Go
            </button>
          </div>
          <div className={styles.weekdayHeader}>
            {[...'MonTueWedThuFriSatSun'.match(/.{1,3}/g)!].map((d,i)=> (
              <div key={i} className={styles.weekdayLabel}>{d}</div>
            ))}
          </div>
          <div className={styles.grid}>
            {Array.from({length:startWeekday}).map((_,i)=> <div key={`empty-${i}`} className={styles.emptyCell} />)}
            {days.map((d)=>{
              const ms = new Date(d)
              const dow = ms.getDay()
              const monday = new Date(ms)
              monday.setDate(ms.getDate() + (dow===0?-6:1-dow))
              const weekNum = Math.ceil((((ms.getTime() - new Date(ms.getFullYear(),0,1).getTime())/86400000) + new Date(ms.getFullYear(),0,1).getDay()+1)/7)
              const isoStr = `${monday.getFullYear()}-W${String(weekNum).padStart(2,'0')}`
              const selected = value===isoStr
              return (
                <button
                  key={d.toISOString()+"w"}
                  className={`${styles.cell} ${selected?styles.cellActive:''}`}
                  onClick={()=> selectAndClose(isoStr)}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    selectAndClose(isoStr);
                  }}
                  type="button"
                >{d.getDate()}</button>
              )
            })}
          </div>
        </>
      )}

      {mode==='month' && (
        <>
          <div className={styles.customDateInput}>
            <input 
              type="number" 
              value={customMonth}
              onChange={(e) => setCustomMonth(e.target.value)}
              className={styles.dateInput}
              placeholder="Month (1-12)"
              min="1"
              max="12"
              style={{flex: '1 1 0'}}
            />
            <input 
              type="number" 
              value={customYear}
              onChange={(e) => setCustomYear(e.target.value)}
              className={styles.dateInput}
              placeholder="Year"
              min="2000"
              max="2100"
              style={{flex: '1 1 0'}}
            />
            <button 
              className={styles.addBtn} 
              onClick={handleCustomMonth}
              disabled={!customMonth || !customYear || !/^\d{1,2}$/.test(customMonth) || !/^\d{4}$/.test(customYear)}
            >
              Add
            </button>
          </div>
          <div className={styles.monthGrid}>
          {Array.from({length:12}).map((_,i)=>{
            const label = new Date(year,i,1).toLocaleString(undefined,{month:'long'})
            const val = `${year}-${String(i+1).padStart(2,'0')}`
            const selected = value===val
            return (
              <button 
                key={val} 
                className={`${styles.monthCell} ${selected?styles.monthActive:''}`} 
                onClick={()=> selectAndClose(val)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  selectAndClose(val);
                }}
                type="button"
              >
                {label}
              </button>
            )
          })}
        </div>
        </>
      )}

    </div>
  )

  if (!mounted || typeof window === 'undefined') return null
  
  return triggerElement ? createPortal(calendar, document.body) : calendar
}
