'use client';

import React, { useState } from 'react';

export default function AdmissionsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    course: '',
    batchTime: '',
    educationLevel: '',
    previousAttempts: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 3;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Valid email is required';
      }
      if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Valid 10-digit phone number is required';
      }
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    } else if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = 'Valid 6-digit pincode is required';
      }
    } else if (step === 3) {
      if (!formData.course) newErrors.course = 'Please select a course';
      if (!formData.batchTime) newErrors.batchTime = 'Please select a batch timing';
      if (!formData.educationLevel) newErrors.educationLevel = 'Education level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log('Form submitted:', formData);
      alert('Application submitted successfully! An advisor will contact you shortly.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Admissions</h1>
          <p className="text-xl text-gray-200">
            Begin your UPSC journey with Amigos IAS Academy
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 card p-6">
          <h2 className="text-2xl font-bold text-primary-navy mb-6">Admission Process</h2>
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      currentStep >= step
                        ? 'bg-primary-navy text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step}
                  </div>
                  <span className="text-sm mt-2 text-gray-600">
                    {step === 1 && 'Personal'}
                    {step === 2 && 'Address'}
                    {step === 3 && 'Course'}
                  </span>
                </div>
                {index < 2 && (
                  <div className="flex-1 h-1 mx-4 bg-gray-200 relative">
                    <div
                      className={`absolute top-0 left-0 h-full bg-primary-navy transition-all duration-300 ${
                        currentStep > step ? 'w-full' : 'w-0'
                      }`}
                    ></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary-navy mb-4">
                Personal Details
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`input-field ${errors.fullName ? 'invalid' : formData.fullName ? 'valid' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`input-field ${errors.email ? 'invalid' : formData.email ? 'valid' : ''}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`input-field ${errors.phone ? 'invalid' : formData.phone ? 'valid' : ''}`}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`input-field ${errors.dateOfBirth ? 'invalid' : formData.dateOfBirth ? 'valid' : ''}`}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary-navy mb-4">
                Address Details
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`input-field ${errors.address ? 'invalid' : formData.address ? 'valid' : ''}`}
                  placeholder="House/Flat No., Street Name"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`input-field ${errors.city ? 'invalid' : formData.city ? 'valid' : ''}`}
                    placeholder="City"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`input-field ${errors.state ? 'invalid' : formData.state ? 'valid' : ''}`}
                  >
                    <option value="">Select State</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={`input-field ${errors.pincode ? 'invalid' : formData.pincode ? 'valid' : ''}`}
                    placeholder="6-digit pincode"
                    maxLength={6}
                  />
                  {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary-navy mb-4">
                Course Selection
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Course <span className="text-red-500">*</span>
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className={`input-field ${errors.course ? 'invalid' : formData.course ? 'valid' : ''}`}
                >
                  <option value="">Select a course</option>
                  <option value="foundation">UPSC Prep+ Foundation Course</option>
                  <option value="prelims">Prelims Intensive Program</option>
                  <option value="mains">Mains Answer Writing Program</option>
                  <option value="interview">Interview Guidance Program</option>
                  <option value="optional">Optional Subject Course</option>
                  <option value="weekend">Weekend Batch</option>
                </select>
                {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Batch Timing <span className="text-red-500">*</span>
                </label>
                <select
                  name="batchTime"
                  value={formData.batchTime}
                  onChange={handleInputChange}
                  className={`input-field ${errors.batchTime ? 'invalid' : formData.batchTime ? 'valid' : ''}`}
                >
                  <option value="">Select timing</option>
                  <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                  <option value="afternoon">Afternoon (2:00 PM - 6:00 PM)</option>
                  <option value="evening">Evening (6:00 PM - 9:00 PM)</option>
                  <option value="weekend">Weekend Only</option>
                </select>
                {errors.batchTime && <p className="text-red-500 text-sm mt-1">{errors.batchTime}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Highest Education Level <span className="text-red-500">*</span>
                </label>
                <select
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleInputChange}
                  className={`input-field ${errors.educationLevel ? 'invalid' : formData.educationLevel ? 'valid' : ''}`}
                >
                  <option value="">Select education level</option>
                  <option value="graduate">Graduate</option>
                  <option value="postgraduate">Post Graduate</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
                {errors.educationLevel && <p className="text-red-500 text-sm mt-1">{errors.educationLevel}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous UPSC Attempts
                </label>
                <select
                  name="previousAttempts"
                  value={formData.previousAttempts}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="">Select</option>
                  <option value="0">First Attempt</option>
                  <option value="1">1 Attempt</option>
                  <option value="2">2 Attempts</option>
                  <option value="3+">3+ Attempts</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="btn-primary"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>

        <div className="mt-8 card p-6 bg-blue-50 border-l-4 border-primary-navy">
          <h3 className="font-semibold text-primary-navy mb-2">Need Help?</h3>
          <p className="text-gray-600 text-sm mb-3">
            Have questions about the admission process? Our team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:+911234567890" className="btn-secondary text-sm">
              Call Us: +91 123 456 7890
            </a>
            <a href="https://wa.me/911234567890" className="btn-outline text-sm">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
