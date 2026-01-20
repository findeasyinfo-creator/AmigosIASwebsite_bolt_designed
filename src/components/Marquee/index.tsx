'use client'
import { useEffect, useState } from 'react'
import styles from './Marquee.module.css'

export default function Marquee() {
  const [marqueeData, setMarqueeData] = useState({
    text: '📢 Formulating Offers | Free Demo Classes Invitation This Week 🎉',
    active: true
  })
  const [loading, setLoading] = useState(true)

  // Fetch marquee settings from API
  useEffect(() => {
    async function fetchMarqueeSettings() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
        const response = await fetch(`${API_URL}/settings`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setMarqueeData({
              text: data.data.marqueeText || '📢 Formulating Offers | Free Demo Classes Invitation This Week 🎉',
              active: data.data.marqueeActive ?? true
            });
          }
        }
      } catch (error) {
        console.warn('Failed to fetch marquee settings, using default:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMarqueeSettings();
  }, []);

  // Don't render if not active or still loading
  if (loading || !marqueeData.active) {
    return null;
  }

  return (
    <div className={styles.marqueeSection}>
      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeContent}>
          <span>{marqueeData.text}</span>
          <span>{marqueeData.text}</span>
          <span>{marqueeData.text}</span>
          <span>{marqueeData.text}</span>
        </div>
      </div>
    </div>
  )
}
