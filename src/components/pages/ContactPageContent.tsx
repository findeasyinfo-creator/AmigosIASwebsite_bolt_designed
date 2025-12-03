"use client"
import React, { useState } from "react"

export default function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    district: "",
    topic: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required"
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Valid 10-digit phone number is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      console.log("Form submitted:", formData)
      alert("Your request has been successfully submitted! We will contact you shortly.")
      setFormData({ name: "", email: "", phone: "", district: "", topic: "", message: "" })
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-full">
            <p className="text-sm font-semibold tracking-wider text-orange-600 uppercase">Get In Touch</p>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-[#0a1628] dark:text-white mb-4">
            Let's Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">IAS Journey</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Connect with Amigos IAS — your trusted partner for UPSC preparation. We're here to guide you every step of the way.
          </p>
        </div>
      </section>

      {/* Cards: left text, right form */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left info card */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white to-orange-50/30 dark:from-gray-800 dark:to-orange-900/10 rounded-3xl p-8 shadow-[0_20px_70px_rgba(0,0,0,0.1)] border border-orange-100/50 dark:border-orange-900/30 hover:shadow-[0_25px_80px_rgba(251,146,60,0.15)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-wider text-orange-600 uppercase">Quick Response</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Within 24 hours</p>
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-[#0a1628] dark:text-white mb-4">
                  We're here to help you <span className="text-orange-600">succeed</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-8">
                  Amigos IAS guides aspirants with structured courses, expert mentorship, and comprehensive resources for UPSC. Join thousands of successful candidates.
                </p>

                {/* Branch Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white dark:bg-gray-700/40 backdrop-blur-sm rounded-2xl p-5 border border-orange-100 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                      <p className="text-sm font-bold text-[#0a1628] dark:text-white">Head Office</p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">Bada Bazar Rd, Karol Bagh, New Delhi</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700/40 backdrop-blur-sm rounded-2xl p-5 border border-orange-100 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                      <p className="text-sm font-bold text-[#0a1628] dark:text-white">Hyderabad Center</p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">Near SR Nagar, Hyderabad</p>
                  </div>
                </div>

                {/* Contact Methods */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Visit Us</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Shop No.6, 3rd floor, Near Grover Mithaivala, Bada Bazar Rd, Delhi, 110060</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Email Us</p>
                      <a href="mailto:contact@amigosias.com" className="text-sm text-orange-600 hover:text-orange-700 dark:hover:text-orange-400 transition-colors font-medium">contact@amigosias.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Call Us</p>
                      <a href="tel:+919876543210" className="text-sm text-orange-600 hover:text-orange-700 dark:hover:text-orange-400 transition-colors font-medium">+91 98765 43210</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right form card */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-[0_20px_70px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-gray-700 hover:shadow-[0_25px_80px_rgba(251,146,60,0.15)] transition-all duration-300">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#0a1628] dark:text-white mb-2">Send us a message</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fill out the form below and we'll get back to you shortly.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      className={`w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border-2 ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200`} 
                      placeholder="John Doe" 
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1"><span>⚠</span> {errors.name}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className={`w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border-2 ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200`} 
                        placeholder="john@example.com" 
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1"><span>⚠</span> {errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone <span className="text-red-500">*</span></label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        maxLength={10} 
                        placeholder="98765 43210" 
                        className={`w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border-2 ${errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200`} 
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1"><span>⚠</span> {errors.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">District</label>
                    <input 
                      type="text" 
                      name="district" 
                      value={formData.district} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200" 
                      placeholder="Enter your district" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Topic</label>
                    <select 
                      name="topic" 
                      value={formData.topic} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 cursor-pointer"
                    >
                      <option value="">Select a topic</option>
                      <option value="admissions">Admissions Inquiry</option>
                      <option value="courses">Course Information</option>
                      <option value="support">Student Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      rows={5} 
                      placeholder="Tell us more about your inquiry..." 
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none transition-all duration-200" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Large Map at bottom */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1628] dark:text-white mb-3">Visit Our Campus</h2>
            <p className="text-gray-600 dark:text-gray-300">Find us on the map and plan your visit</p>
          </div>
          <div className="bg-gradient-to-br from-white to-orange-50/20 dark:from-gray-800 dark:to-orange-900/10 backdrop-blur-sm rounded-3xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.1)] border border-orange-100/50 dark:border-orange-900/30">
            <div className="w-full h-[28rem] sm:h-[35rem] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
              <div className="text-center text-gray-500 dark:text-gray-400 relative z-10">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-20 h-20 mx-auto text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Interactive Map</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Amigos IAS Academy Location</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <div className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow-md">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-300">📍 Delhi</p>
                  </div>
                  <div className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow-md">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-300">📍 Hyderabad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
