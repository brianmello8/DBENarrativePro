import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, FileText, AlertCircle, CheckCircle, ArrowRight, Calendar, Scale, BookOpen, Users, TrendingUp, Award, ChevronDown, ChevronUp, Download, Sparkles, CreditCard, Zap, Clock, DollarSign } from 'lucide-react';
import { trackEvent, trackPageView } from './Analytics';
import Navigation from './Navigation';

const HomePage = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Track homepage view
  useEffect(() => {
    trackPageView('Home Page - Both Tools');
  }, []);

  const scrollToRuling = () => {
    trackEvent('learn_about_changes_clicked');
    const rulingSection = document.getElementById('ruling-section');
    if (rulingSection) {
      rulingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStartFreeForm = () => {
    trackEvent('start_free_form_clicked', {
      location: 'homepage_hero'
    });
    navigate('/uca-form');
  };

  const handleStartNarrative = () => {
    trackEvent('start_narrative_clicked', {
      location: 'homepage_hero'
    });
    navigate('/narrative');
  };

  const handleFaqClick = (question, index) => {
    trackEvent('faq_clicked', {
      question: question.substring(0, 50),
      faq_index: index
    });
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "When did the Interim Final Rule (IFR) become effective?",
      answer: "The IFR was published in the Federal Register on October 3, 2025 and became effective that day. This represents the most significant change to DBE certification requirements in decades."
    },
    {
      question: "What changed in the October 2025 DBE regulations?",
      answer: "The DOT eliminated race and gender-based presumptions of disadvantage. All applicants must now provide individualized proof of social and economic disadvantage through detailed narratives and supporting documentation."
    },
    {
      question: "Do currently certified DBEs need to recertify?",
      answer: "Yes. Under 49 CFR § 26.111, UCPs are required to reevaluate all DBE certifications under the new standards. The UCP in your jurisdiction will contact you about the reevaluation process, which should be completed as quickly as practicable."
    },
    {
      question: "Can UCPs continue to accept new DBE applications?",
      answer: "Yes. UCPs may continue to accept and process new DBE certification applications under the standards set forth in the IFR. All new applications must meet the individualized showing requirements."
    },
    {
      question: "What's the difference between the UCA form and narrative statement?",
      answer: "The UCA (Uniform Certification Application) is the official 17-page form required for all DBE applications. The narrative statement is a separate 4-6 page document where you detail specific incidents of disadvantage. Both are required for certification."
    },
    {
      question: "Is the UCA form filler really free?",
      answer: "Yes! 100% free, no payment required, no credit card needed. We believe every business deserves access to the basic application form. The paid narrative tool ($149) is optional and provides AI-enhanced professional documents."
    },
    {
      question: "How does DBE Narrative Pro help with the new requirements?",
      answer: "Our free UCA form filler helps you complete the official application. Our AI-powered Narrative Pro ($149) helps you create the detailed narrative statement required under the new regulations, including specific incidents and economic barriers documentation—all for a fraction of consultant costs ($1,500-3,000)."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section - Enhanced with gradients and floating elements */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            {/* Urgent badge with animation */}
            <div className="inline-block relative mb-6">
              <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
              <div className="relative bg-red-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl">
                ⚠️ URGENT: New Requirements Effective October 2025
              </div>
            </div>
            
            {/* Gradient headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                Complete Your DBE Certification
              </span>
              <br />
              <span className="text-white">With Professional Tools</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-4xl mx-auto">
              Start with our <span className="text-green-400 font-bold">FREE</span> Uniform Certification Application form filler. 
              Upgrade to AI-enhanced narrative services when you're ready. Everything you need for 2025 compliance.
            </p>
          </div>

          {/* Two Tool Cards - Enhanced with glows and animations */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Free UCA Form Card - Enhanced */}
            <div className="group relative bg-white rounded-2xl p-8 text-gray-900 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-green-500/20">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/5 to-green-400/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/50 group-hover:shadow-green-500/70 transition-shadow">
                  <Download className="text-white" size={32} />
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold inline-block mb-4 shadow-lg">
                  100% FREE
                </div>
                
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  DBE Uniform Certification Application
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Fill out the official DOT UCA form online. Download as PDF ready for submission.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                    <span className="text-sm font-medium">Official 17-page DOT form</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                    <span className="text-sm font-medium">Auto-saves progress</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                    <span className="text-sm font-medium">Takes 15-30 minutes</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                    <span className="text-sm font-medium">No payment required</span>
                  </div>
                </div>

                <button
                  onClick={handleStartFreeForm}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all transform hover:scale-105"
                >
                  <FileText size={24} />
                  Start FREE Form Filler
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Paid Narrative Tool Card - Enhanced */}
            <div className="group relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-purple-500/30">
              {/* Animated glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Sparkles className="text-white" size={32} />
                </div>
                
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold inline-block mb-4 shadow-lg">
                  <Zap className="inline-block mr-1" size={14} />
                  AI-POWERED
                </div>
                
                <h3 className="text-3xl font-bold mb-4">
                  DBE Narrative Pro
                </h3>
                
                <p className="text-blue-50 mb-6 leading-relaxed">
                  AI-enhanced narrative statement with professional cover letter and complete submission package.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <CheckCircle className="text-green-300 flex-shrink-0" size={20} />
                    <span className="text-sm font-medium text-blue-50">AI-enhanced narrative (4-6 pages)</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <CheckCircle className="text-green-300 flex-shrink-0" size={20} />
                    <span className="text-sm font-medium text-blue-50">Professional cover letter</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <CheckCircle className="text-green-300 flex-shrink-0" size={20} />
                    <span className="text-sm font-medium text-blue-50">Documentation checklist</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <CheckCircle className="text-green-300 flex-shrink-0" size={20} />
                    <span className="text-sm font-medium text-blue-50">Editable Word documents</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-4xl font-bold">$149</p>
                      <p className="text-sm text-blue-100">One-time payment</p>
                      <p className="text-xs text-blue-200 mt-1">vs. $1,500-3,000 consultants</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-green-300">Save</p>
                      <p className="text-2xl font-bold text-green-300">$2,650</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleStartNarrative}
                  className="w-full bg-white text-blue-600 hover:bg-gray-50 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <Sparkles size={24} />
                  Generate My Narrative
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={scrollToRuling}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-xl border-2 border-white/30 transition-all inline-flex items-center gap-2 hover:scale-105 transform"
            >
              Learn About the 2025 Changes
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Trust Stats Bar - Enhanced */}
      <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all transform hover:scale-105">
                <Users className="mx-auto mb-3 text-blue-300" size={32} />
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">850+</div>
                <div className="text-blue-100 font-medium">Applications in Progress</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all transform hover:scale-105">
                <Clock className="mx-auto mb-3 text-green-300" size={32} />
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">20 Min</div>
                <div className="text-blue-100 font-medium">Average Form Completion</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all transform hover:scale-105">
                <DollarSign className="mx-auto mb-3 text-amber-300" size={32} />
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">$2,650</div>
                <div className="text-blue-100 font-medium">Average Savings vs Consultants</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all transform hover:scale-105">
                <Shield className="mx-auto mb-3 text-purple-300" size={32} />
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Oct 3</div>
                <div className="text-blue-100 font-medium">Built for 2025 IFR</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof / Testimonials Section - Enhanced */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              TRUSTED NATIONWIDE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Businesses Preparing for 2025 Requirements
            </h2>
            <p className="text-xl text-gray-600">
              See how businesses are using our tools to navigate the new regulations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-amber-400 text-2xl">★★★★★</span>
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "The free UCA form filler saved me hours of frustration. I tried filling out the PDF manually and kept making mistakes. This tool made it so easy - finished in 30 minutes and downloaded a perfect copy."
              </p>
              <div className="border-t pt-4">
                <p className="font-bold text-gray-900">Maria Rodriguez</p>
                <p className="text-sm text-gray-600">Rodriguez Construction LLC</p>
                <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                  <CheckCircle size={12} />
                  California • Preparing Application
                </p>
              </div>
            </div>

            {/* Testimonial 2 - Highlighted */}
            <div className="group bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-blue-400">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-amber-300 text-2xl">★★★★★</span>
              </div>
              <p className="text-blue-50 mb-6 italic leading-relaxed">
                "I was quoted $2,800 by a consultant just for the narrative. The AI tool helped me organize my thoughts and gave me a professional starting point for $149. Worth every penny - I can edit and customize it myself."
              </p>
              <div className="border-t border-white/20 pt-4">
                <p className="font-bold text-white">James Chen</p>
                <p className="text-sm text-blue-100">Chen Engineering Services</p>
                <p className="text-xs text-blue-200 mt-1 flex items-center gap-1">
                  <CheckCircle size={12} />
                  Texas • Working on Narrative
                </p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-amber-400 text-2xl">★★★★★</span>
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "As a current DBE facing recertification, I was overwhelmed by the new narrative requirements. This tool walked me through documenting specific incidents I never would have thought to include. Game changer."
              </p>
              <div className="border-t pt-4">
                <p className="font-bold text-gray-900">Patricia Williams</p>
                <p className="text-sm text-gray-600">Williams Transportation</p>
                <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                  <CheckCircle size={12} />
                  Florida • Preparing Recertification
                </p>
              </div>
            </div>
          </div>

          {/* Additional credibility elements - Enhanced */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-8 bg-white rounded-2xl px-8 py-8 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 group hover:scale-105 transition-transform">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                  <Shield className="text-white" size={32} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">2025 DOT Compliant</p>
                  <p className="text-sm text-gray-600">49 CFR Part 26</p>
                </div>
              </div>
              <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
              <div className="flex items-center gap-3 group hover:scale-105 transition-transform">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                  <CheckCircle className="text-white" size={32} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">Official UCA Form</p>
                  <p className="text-sm text-gray-600">FHWA Approved Format</p>
                </div>
              </div>
              <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
              <div className="flex items-center gap-3 group hover:scale-105 transition-transform">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl shadow-lg">
                  <FileText className="text-white" size={32} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">Updated Oct 2025</p>
                  <p className="text-sm text-gray-600">Latest Requirements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New 2025 Regulations Section - Enhanced */}
      <div id="ruling-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
              ⚠️ IMPORTANT CHANGES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              What Changed in October 2025?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the new DBE certification requirements under 49 CFR Part 26
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500 rounded-r-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="bg-red-500 p-2 rounded-lg">
                  <AlertCircle className="text-white" size={28} />
                </div>
                What's No Longer Accepted
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <span className="text-red-500 font-bold mt-1 text-xl">✕</span>
                  <span className="text-gray-700">Race-based presumptions of disadvantage</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <span className="text-red-500 font-bold mt-1 text-xl">✕</span>
                  <span className="text-gray-700">Gender-based presumptions</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <span className="text-red-500 font-bold mt-1 text-xl">✕</span>
                  <span className="text-gray-700">Generic disadvantage statements</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <span className="text-red-500 font-bold mt-1 text-xl">✕</span>
                  <span className="text-gray-700">Automatic certification based on demographics</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-r-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="bg-green-500 p-2 rounded-lg">
                  <CheckCircle className="text-white" size={28} />
                </div>
                What's Now Required
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Individualized proof of social disadvantage</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Specific incidents with dates and details</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Documented economic barriers and impacts</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Comprehensive narrative statement (4-6 pages)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-blue-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                  <Scale className="text-blue-600" size={24} />
                  Key Regulation Details
                </h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
                    <Scale className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-sm"><strong>Effective Date:</strong> October 16, 2025</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
                    <Scale className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-sm"><strong>Regulation:</strong> 49 CFR Part 26 (Amended)</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
                    <Scale className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-sm"><strong>Applies To:</strong> All new and recertifying DBE applicants</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
                    <Scale className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-sm"><strong>Timeline:</strong> Current certifications must recertify within 12-18 months</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                  <Calendar className="text-blue-600" size={24} />
                  Recent Updates
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3 p-3 bg-white rounded-lg">
                    <Calendar className="text-blue-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Oct 16, 2025</p>
                      <p className="text-gray-600 text-sm">New requirements officially take effect nationwide</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 bg-white rounded-lg">
                    <Calendar className="text-blue-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Oct 1, 2025</p>
                      <p className="text-gray-600 text-sm">UCPs begin accepting applications under new standards</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 bg-white rounded-lg">
                    <Calendar className="text-blue-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Sept 2025</p>
                      <p className="text-gray-600 text-sm">Final guidance documents published by DOT</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits/Features Section - Enhanced */}
      <div className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Why Choose Our Tools?
            </h2>
            <p className="text-xl text-blue-100">
              Professional quality, affordable pricing, instant results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:-translate-y-2 border border-white/20">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
                <FileText className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Start Free</h3>
              <p className="text-blue-100 text-center leading-relaxed">
                No payment required to use our UCA form filler. Complete the entire application and download your PDF at no cost.
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:-translate-y-2 border border-white/20">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/50">
                <TrendingUp className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Save $1,000s</h3>
              <p className="text-blue-100 text-center leading-relaxed">
                Consultants charge $1,500-3,000 for narrative preparation. Our AI-powered tool delivers the same quality for just $149.
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:-translate-y-2 border border-white/20">
              <div className="bg-gradient-to-br from-blue-400 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/50">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">2025 Compliant</h3>
              <p className="text-blue-100 text-center leading-relaxed">
                Both tools are updated for the latest DOT regulations. Your documents meet all current requirements under 49 CFR Part 26.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section - Enhanced */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              GOT QUESTIONS?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our tools and the new requirements
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
                <button
                  onClick={() => handleFaqClick(faq.question, idx)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-colors"
                >
                  <span className="font-bold text-left text-gray-900 pr-4">{faq.question}</span>
                  {expandedFaq === idx ? (
                    <ChevronUp className="text-blue-600 flex-shrink-0" size={24} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                  )}
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-5 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* View All FAQs Button - Enhanced */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/faq')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 mx-auto transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <BookOpen size={24} />
              View All FAQs & Regulation Details
              <ArrowRight size={20} />
            </button>
            <p className="mt-4 text-gray-600">
              Get comprehensive answers about the 2025 regulation changes, certification process, and more
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA - Enhanced */}
      <div className="relative py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Begin with our free UCA form filler, then upgrade to the complete narrative package when you're ready.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={handleStartFreeForm}
              className="group bg-white text-blue-600 hover:bg-gray-50 font-bold py-5 px-10 rounded-xl text-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-2xl"
            >
              <Download size={28} className="group-hover:animate-bounce" />
              Start FREE Form Filler
            </button>
            
            <button
              onClick={handleStartNarrative}
              className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-5 px-10 rounded-xl text-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-2xl"
            >
              <Sparkles size={28} className="group-hover:rotate-12 transition-transform" />
              Generate Narrative ($149)
            </button>
          </div>
          
          <p className="text-blue-200 text-lg">
            No credit card required for form filler • Instant download • 100% satisfaction guarantee
          </p>
        </div>
      </div>

      {/* Footer - Enhanced */}
      <div className="bg-gradient-to-br from-slate-900 to-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
                  <Shield className="text-white" size={24} />
                </div>
                <span className="text-white font-bold">DBE Narrative Pro</span>
              </div>
              <p className="text-sm leading-relaxed">
                Professional DBE certification tools powered by AI. Free form filler + paid narrative services.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Tools</h4>
              <ul className="space-y-2 text-sm">
                <li className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/uca-form')}>Free UCA Form Filler</li>
                <li className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/narrative')}>Narrative Pro ($149)</li>
                <li className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/home')}>Compare Tools</li>
                <li className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/faq')}>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li className="cursor-pointer hover:text-white transition-colors" onClick={() => navigate('/faq')}>FAQ - Common Questions</li>
                <li className="hover:text-white transition-colors cursor-pointer">About the 2025 Changes</li>
                <li className="hover:text-white transition-colors cursor-pointer">Documentation Guide</li>
                <li className="hover:text-white transition-colors cursor-pointer">UCP Directory</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <p className="text-xs leading-relaxed">
                This service provides document generation assistance. It does not constitute legal advice. 
                Consult with qualified professionals for specific guidance.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2025 DBE Narrative Pro. All rights reserved.</p>
            <p className="mt-2 text-xs text-gray-500">
              Compliant with 49 CFR Part 26 (Updated October 2025)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;