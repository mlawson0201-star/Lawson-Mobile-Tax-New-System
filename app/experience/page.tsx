'use client';

import React from 'react';

export default function ExperiencePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Client Experience Hub
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Deliver exceptional, personalized experiences that make every client feel valued, 
          educated, and empowered throughout their tax journey.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Personalized Dashboard</h3>
          <p className="text-gray-600">
            Customized client portals with tailored content and recommendations.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">White-Glove Onboarding</h3>
          <p className="text-gray-600">
            Guided onboarding process that adapts to each client's needs and preferences.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Smart Notifications</h3>
          <p className="text-gray-600">
            Intelligent notification system that keeps clients informed and engaged.
          </p>
        </div>
      </div>
    </div>
  );
}
