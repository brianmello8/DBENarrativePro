import React, { useEffect } from 'react';
import { Mail, Heart, Shield, Users, ArrowRight } from 'lucide-react';
import { trackEvent, trackPageView } from './Analytics';
import Navigation from './Navigation';

const ContactPage = () => {
  // Track page view
  useEffect(() => {
    trackPageView('Contact Page - DBE Narrative Pro');
  }, []);

  const handleEmailClick = () => {
    trackEvent('contact_email_clicked', {
      email: 'support@dbenarrativepro.com'
    });
    window.location.href = 'mailto:support@dbenarrativepro.com';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 overflow-hidden">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Animated grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in-up">
            {/* Support Badge */}
            <div className="inline-block mb-6">
              <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl border-2 border-blue-400/30">
                <span className="relative z-10 flex items-center gap-2">
                  <Heart size={20} className="animate-pulse" />
                  We're Here to Help
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
              </div>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-2xl">
              <span className="inline-block animate-gradient bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent bg-[length:200%_auto]">
                Get in Touch
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed drop-shadow-lg">
              Questions about your narrative? We're here to support you every step of the way.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Support Message Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-12 animate-fade-in-up">
          <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Users size={32} />
              </div>
              <h2 className="text-3xl font-bold">Supporting Our DBE Community</h2>
            </div>
            <div className="h-1 w-24 bg-white/40 rounded-full"></div>
          </div>
          
          <div className="p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We understand these are unprecedented times for the DBE community. The October 2025 regulatory changes 
              have created new challenges that no one anticipated, and we know how critical maintaining your certification 
              is to your business and livelihood.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our mission is simple: <span className="font-bold text-indigo-600">help every DBE firm successfully navigate 
              the recertification process</span> during this transition. We built DBE Narrative Pro specifically to make 
              professional-quality narratives accessible and affordable for firms of all sizes.
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start gap-3">
                <Shield className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    Whether you're starting your narrative, have questions about the process, or need support with your 
                    documents, we're here to help you maintain your DBE certification and continue serving your community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 p-8 text-white text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm p-4 rounded-full mb-4">
              <Mail size={40} />
            </div>
            <h2 className="text-3xl font-bold mb-2">Contact Our Support Team</h2>
            <p className="text-blue-100">We typically respond within 24 hours</p>
          </div>
          
          <div className="p-12 text-center">
            <p className="text-gray-600 mb-8 text-lg">
              Have questions or need assistance? Reach out to our dedicated support team.
            </p>
            
            {/* Email Button */}
            <button
              onClick={handleEmailClick}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 hover:shadow-2xl shadow-xl"
            >
              <Mail size={24} />
              <span>support@dbenarrativepro.com</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity -z-10"></div>
            </button>
            
            <p className="text-sm text-gray-500 mt-6">
              Click to open your email client with our address pre-filled
            </p>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="text-blue-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Professional Support</h3>
            <p className="text-sm text-gray-600">
              Expert assistance with your DBE narrative and recertification process
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Heart className="text-green-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Dedicated Team</h3>
            <p className="text-sm text-gray-600">
              Committed to helping DBE firms succeed during this transition
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-purple-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Community Focused</h3>
            <p className="text-sm text-gray-600">
              Supporting 41,000+ DBE firms through unprecedented regulatory changes
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm">© 2025 DBE Narrative Pro. All rights reserved.</p>
            <p className="mt-2 text-gray-500 text-sm">
              Compliant with 49 CFR Part 26 (Updated October 2025)
            </p>
          </div>
        </div>
      </div>

      {/* Custom animations CSS */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;