'use client'
import { useState } from 'react'
import { heroSlides as initialSlides, type HeroSlide } from '@/data/heroSlides'

export default function HeroAdminPage() {
  const [slides, setSlides] = useState<HeroSlide[]>(initialSlides)

  const updateSlide = (index: number, updates: Partial<HeroSlide>) => {
    setSlides(prev => prev.map((s, i) => (i === index ? { ...s, ...updates } : s)))
  }

  const updateFeature = (index: number, featureIndex: number, value: string) => {
    setSlides(prev => prev.map((s, i) => {
      if (i !== index) return s
      const features = [...(s.features || [])]
      features[featureIndex] = value
      return { ...s, features }
    }))
  }

  const addFeature = (index: number) => {
    setSlides(prev => prev.map((s, i) => (i === index ? { ...s, features: [...(s.features || []), ''] } : s)))
  }

  const removeFeature = (index: number, featureIndex: number) => {
    setSlides(prev => prev.map((s, i) => {
      if (i !== index) return s
      const features = (s.features || []).filter((_, fi) => fi !== featureIndex)
      return { ...s, features }
    }))
  }

  const addSlide = () => {
    setSlides(prev => [
      ...prev,
      { title: '', features: [''], image: '', cta: { label: '', href: '' } },
    ])
  }

  const removeSlide = (index: number) => {
    setSlides(prev => prev.filter((_, i) => i !== index))
  }

  const copyJson = async () => {
    const exportSlides = slides.map(s => ({
      title: s.title,
      features: s.features?.filter(Boolean) || [],
      image: s.image,
      cta: s.cta?.label || s.cta?.href ? { label: s.cta?.label || '', href: s.cta?.href || '' } : undefined,
    }))
    const code = `export type HeroSlide = {\n  title: string;\n  features: string[];\n  image: string;\n  cta?: { label: string; href: string };\n};\n\nexport const heroSlides: HeroSlide[] = ${JSON.stringify(exportSlides, null, 2)}\n`
    try {
      await navigator.clipboard.writeText(code)
      alert('Copied slides to clipboard. Paste into src/data/heroSlides.ts')
    } catch {
      // no-op
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Hero Slides Admin (Local Only)</h1>
      <p style={{ marginBottom: 24, color: '#555' }}>Edit slides below. Click Copy JSON and paste into <code>src/data/heroSlides.ts</code> to update the live site.</p>

      {slides.map((slide, i) => (
        <div key={i} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, marginBottom: 16, background: '#fff' }}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Slide {i + 1}</h2>
            <button onClick={() => removeSlide(i)} style={{ padding: '6px 10px' }}>Remove</button>
          </div>

          <label style={{ display: 'block', marginTop: 12 }}>Title</label>
          <input
            value={slide.title}
            onChange={e => updateSlide(i, { title: e.target.value })}
            placeholder="Slide title"
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />

          <label style={{ display: 'block', marginTop: 12 }}>Image URL</label>
          <input
            value={slide.image}
            onChange={e => updateSlide(i, { image: e.target.value })}
            placeholder="/assets/hero.jpg or https://..."
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />

          <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label>Features</label>
              <button onClick={() => addFeature(i)} style={{ padding: '4px 8px' }}>Add Feature</button>
            </div>
            {(slide.features || []).map((f, fi) => (
              <div key={fi} style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <input
                  value={f}
                  onChange={e => updateFeature(i, fi, e.target.value)}
                  placeholder={`Feature #${fi + 1}`}
                  style={{ flex: 1, padding: 8 }}
                />
                <button onClick={() => removeFeature(i, fi)} style={{ padding: '4px 8px' }}>Remove</button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ display: 'block' }}>CTA Label</label>
            <input
              value={slide.cta?.label || ''}
              onChange={e => updateSlide(i, { cta: { label: e.target.value, href: slide.cta?.href ?? '' } })}
              placeholder="Button text (optional)"
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />

            <label style={{ display: 'block', marginTop: 8 }}>CTA Href</label>
            <input
              value={slide.cta?.href || ''}
              onChange={e => updateSlide(i, { cta: { label: slide.cta?.label ?? '', href: e.target.value } })}
              placeholder="/contact or /courses (optional)"
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </div>
        </div>
      ))}

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={addSlide} style={{ padding: '8px 12px' }}>Add Slide</button>
        <button onClick={copyJson} style={{ padding: '8px 12px' }}>Copy JSON for heroSlides.ts</button>
      </div>
    </div>
  )
}
