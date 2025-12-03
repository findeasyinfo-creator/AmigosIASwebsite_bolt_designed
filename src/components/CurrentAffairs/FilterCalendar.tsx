"use client"
import React, { useEffect, useRef } from 'react'
import styles from './FilterCalendar.module.css'

type Mode = 'date' | 'week' | 'month'

type Props = {
  mode: Mode
  value?: string
  onChange: (v?: string) => void
  title?: string
  open?: boolean
  onClose?: () => void
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

export default function FilterCalendar({mode, value, onChange, title, open = true, onClose}: Props){
  const ref = useRef<HTMLDivElement | null>(null)
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

  if (!open) return null

  return (
    <div ref={ref} className={`${styles.calendarCard} dark`}>
      <div className={styles.header}>
        <div className={styles.title}>{title || (mode==='date'?'Select Date': mode==='week'?'Select Week':'Select Month')}</div>
        <div className={styles.controls}>
          <button className={styles.btn} onClick={()=> setCursor(new Date(year, month-1, 1))}>Prev</button>
          <div className={styles.weekBadge}>{formatMonthLabel(cursor)}</div>
          <button className={styles.btn} onClick={()=> setCursor(new Date(year, month+1, 1))}>Next</button>
        </div>
      </div>

      {mode==='date' && (
        <div className={styles.grid}>
          {[...'MonTueWedThuFriSatSun'.match(/.{1,3}/g)!].map((d,i)=> (
            <div key={i} className={styles.weekBadge} style={{textAlign:'center'}}>{d}</div>
          ))}
          {Array.from({length:startWeekday}).map((_,i)=> <div key={`empty-${i}`} />)}
          {days.map((d)=>{
            const selected = value && new Date(value).toDateString()===d.toDateString()
            return (
              <button
                key={d.toISOString()}
                className={`${styles.cell} ${selected?styles.cellActive:''}`}
                onClick={()=> selectAndClose(d.toISOString().slice(0,10))}
              >{d.getDate()}</button>
            )
          })}
        </div>
      )}

      {mode==='week' && (
        <div>
          <div className={styles.grid}>
            {[...'MonTueWedThuFriSatSun'.match(/.{1,3}/g)!].map((d,i)=> (
              <div key={i} className={styles.weekBadge} style={{textAlign:'center'}}>{d}</div>
            ))}
            {Array.from({length:startWeekday}).map((_,i)=> <div key={`empty-${i}`} />)}
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
                >{d.getDate()}</button>
              )
            })}
          </div>
        </div>
      )}

      {mode==='month' && (
        <div className={styles.monthGrid}>
          {Array.from({length:12}).map((_,i)=>{
            const label = new Date(year,i,1).toLocaleString(undefined,{month:'long'})
            const val = `${year}-${String(i+1).padStart(2,'0')}`
            const selected = value===val
            return (
              <button key={val} className={`${styles.monthCell} ${selected?styles.monthActive:''}`} onClick={()=> selectAndClose(val)}>
                {label}
              </button>
            )
          })}
        </div>
      )}

    </div>
  )
}
