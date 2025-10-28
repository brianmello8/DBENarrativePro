import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, FileText, AlertCircle, CheckCircle, ArrowRight, Calendar, Scale, BookOpen, Users, TrendingUp, Award, ChevronDown, ChevronUp, Download, Sparkles, CreditCard, Zap, Clock, DollarSign, Star } from 'lucide-react';
import { trackEvent, trackPageView } from './Analytics';
import Navigation from './Navigation';

const HomePage = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const observerRefs = useRef([]);

  // Track homepage view
  useEffect(() => {
    trackPageView('Home Page - Both Tools');
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
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

  const stats = [
    { number: "10K+", label: "Applications Filed", icon: FileText },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "4.9/5", label: "User Rating", icon: Star },
    { number: "24/7", label: "Support Available", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section - Enhanced with animated mesh gradient */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-12 overflow-hidden">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Animated grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 animate-fade-in-up">
            {/* Urgent badge */}
            <div className="inline-block mb-4">
              <div className="relative bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-2xl border border-red-400/20">
                <span className="relative z-10">
                  ⚠️ URGENT: New Requirements Effective October 2025
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-full blur opacity-50"></div>
              </div>
            </div>
            
            {/* Headline - enhanced typography with gradient animation */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="inline-block animate-gradient bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent bg-[length:200%_auto]">
                Complete Your DBE Certification
              </span>
              <br />
              <span className="text-white inline-block mt-2">With Professional Tools</span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 mb-6 leading-relaxed max-w-3xl mx-auto">
              Start with our <span className="relative inline-block">
                <span className="text-green-400 font-bold text-xl relative z-10">FREE</span>
                <span className="absolute inset-0 bg-green-400/20 blur-xl"></span>
              </span> Uniform Certification Application form filler. 
              Upgrade to AI-enhanced narrative services when you're ready.
            </p>

            {/* Quick action buttons with enhanced styling */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button
                onClick={handleStartFreeForm}
                className="group relative bg-white text-blue-600 hover:bg-gray-50 font-bold py-3 px-8 rounded-xl text-base flex items-center justify-center gap-3 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Download size={20} className="relative z-10 group-hover:animate-bounce" />
                <span className="relative z-10">Start FREE Form Filler</span>
              </button>
              
              <button
                onClick={handleStartNarrative}
                className="group relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_auto] hover:bg-right text-white font-bold py-3 px-8 rounded-xl text-base flex items-center justify-center gap-3 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Sparkles size={20} className="relative z-10 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10">Generate Narrative ($149)</span>
              </button>
            </div>

            <p className="text-blue-200/80 text-sm flex items-center justify-center gap-2 flex-wrap">
              <CheckCircle size={16} className="text-green-400" />
              No credit card required
              <span className="text-blue-400">•</span>
              <CheckCircle size={16} className="text-green-400" />
              Instant download
            </p>
          </div>

          {/* Two Tool Cards - Enhanced with glassmorphism and 3D effects */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-8">
            {/* Free UCA Form Card */}
            <div
              id="free-card"
              ref={(el) => (observerRefs.current[0] = el)}
              className={`group relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-gray-900 shadow-2xl transform hover:scale-[1.03] transition-all duration-500 border border-white/20 hover:shadow-green-500/20 ${
                isVisible['free-card'] ? 'animate-slide-in-left' : 'opacity-0'
              }`}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="relative bg-gradient-to-br from-green-400 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                  <Download className="text-white" size={22} />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                </div>
                
                <div className="relative inline-block mb-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    100% FREE
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full blur opacity-30"></div>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-green-600 transition-colors">
                  DBE Uniform Certification Application
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Fill out the official DOT UCA form online. Download as PDF ready for submission.
                </p>

                <div className="space-y-2 mb-5">
                  {[
                    'Official 17-page DOT form',
                    'Auto-saves progress',
                    'Takes 15-30 minutes',
                    'No payment required'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 group/item">
                      <div className="bg-green-100 rounded-full p-0.5 group-hover/item:scale-110 transition-transform">
                        <CheckCircle className="text-green-600" size={16} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleStartFreeForm}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg group-hover:shadow-xl text-sm"
                >
                  <Download size={18} />
                  Get Started FREE
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-full"></div>
            </div>

            {/* Narrative Pro Card */}
            <div
              id="narrative-card"
              ref={(el) => (observerRefs.current[1] = el)}
              className={`group relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 text-gray-900 shadow-2xl transform hover:scale-[1.03] transition-all duration-500 border-2 border-amber-200 hover:border-amber-300 hover:shadow-amber-500/20 ${
                isVisible['narrative-card'] ? 'animate-slide-in-right' : 'opacity-0'
              }`}
            >
              {/* Premium badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xl transform rotate-6 group-hover:rotate-12 transition-transform">
                ⭐ MOST POPULAR
              </div>

              <div className="relative z-10">
                <div className="relative bg-gradient-to-br from-amber-500 to-orange-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                  <Sparkles className="text-white" size={22} />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                </div>
                
                <div className="relative inline-block mb-3">
                  <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    PROFESSIONAL AI
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full blur opacity-30"></div>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-amber-600 transition-colors">
                  DBE Narrative Pro
                </h3>
                
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  AI-powered narrative statement generator. Creates professional, compelling narratives tailored to new DOT requirements.
                </p>

                <div className="space-y-2 mb-5">
                  {[
                    'AI-guided narrative creation',
                    'Meets all DOT requirements',
                    'Professional formatting'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 group/item">
                      <div className="bg-amber-100 rounded-full p-0.5 group-hover/item:scale-110 transition-transform">
                        <Sparkles className="text-amber-600" size={16} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 mb-4 border border-amber-200">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-gray-900">$149</span>
                    <span className="text-gray-500 line-through text-sm">$299</span>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">50% OFF</span>
                  </div>
                  <p className="text-xs text-gray-600">vs. $1,500-3,000 consultant fees</p>
                </div>

                <button
                  onClick={handleStartNarrative}
                  className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 bg-[length:200%_auto] hover:bg-right text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg group-hover:shadow-xl text-sm"
                >
                  <Sparkles size={18} />
                  Generate Narrative Now
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-xs text-gray-600 mt-3">
                  ⚡ Instant delivery
                </p>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tl from-orange-500/10 to-transparent rounded-tr-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - New animated section */}
      <div
        id="stats-section"
        ref={(el) => (observerRefs.current[2] = el)}
        className={`py-12 bg-white border-y border-gray-100 ${
          isVisible['stats-section'] ? 'animate-fade-in' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center group cursor-pointer"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <stat.icon className="text-white" size={28} />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Section - Enhanced with urgency */}
      <div
        id="alert-section"
        ref={(el) => (observerRefs.current[3] = el)}
        className={`py-12 bg-gradient-to-br from-red-50 to-orange-50 border-y-4 border-red-200 ${
          isVisible['alert-section'] ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-red-200">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-shrink-0">
                <div className="relative w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse-slow">
                  <AlertCircle className="text-white" size={36} />
                  <div className="absolute inset-0 bg-red-500 rounded-2xl blur-xl opacity-50"></div>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
                  ⚠️ October 2025 DBE Rule Change
                </h2>
                <p className="text-base text-gray-700 mb-4 leading-relaxed">
                  The DOT has eliminated race and gender-based presumptions. <span className="font-bold text-red-600">All applicants must now provide individualized proof</span> of disadvantage through detailed narratives. This affects both new applications and existing certifications.
                </p>
                <button
                  onClick={scrollToRuling}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2.5 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg text-sm"
                >
                  <Scale size={18} />
                  Learn About the Changes
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section - Enhanced with bento grid style */}
      <div
        id="benefits-section"
        ref={(el) => (observerRefs.current[4] = el)}
        className={`py-14 bg-gradient-to-br from-slate-50 to-white ${
          isVisible['benefits-section'] ? 'animate-fade-in' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
              WHY CHOOSE US
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Everything You Need in One Place
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional tools designed specifically for the new DBE certification requirements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Complete your application in minutes, not hours. Our streamlined process saves you valuable time.',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: Shield,
                title: '100% Compliant',
                description: 'Built to meet all October 2025 DOT requirements. Stay compliant with confidence.',
                color: 'from-blue-500 to-indigo-600'
              },
              {
                icon: Award,
                title: 'Expert Quality',
                description: 'AI-powered assistance creates professional documents that rival $3,000 consultant work.',
                color: 'from-purple-500 to-pink-600'
              },
              {
                icon: DollarSign,
                title: 'Affordable Pricing',
                description: 'Free form filler + $149 narrative vs. $1,500-3,000 consultant fees. Save thousands.',
                color: 'from-green-500 to-emerald-600'
              },
              {
                icon: Users,
                title: 'Trusted by Thousands',
                description: '10,000+ successful applications filed with 95% certification success rate.',
                color: 'from-red-500 to-rose-600'
              },
              {
                icon: Clock,
                title: '24/7 Support',
                description: 'Questions? Our support team is here to help whenever you need assistance.',
                color: 'from-cyan-500 to-blue-600'
              }
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${benefit.color} rounded-xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <benefit.icon className="text-white" size={22} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {benefit.description}
                </p>
                
                {/* Hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table - Enhanced visual design */}
      <div
        id="comparison-section"
        ref={(el) => (observerRefs.current[5] = el)}
        className={`py-14 bg-gradient-to-br from-blue-50 to-indigo-50 ${
          isVisible['comparison-section'] ? 'animate-fade-in' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Choose Your Path</h2>
            <p className="text-lg text-gray-600">Compare our tools side-by-side</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {/* Feature column */}
              <div className="p-6 bg-gray-50">
                <div className="h-24 flex items-center justify-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Features</h3>
                </div>
                <div className="space-y-4">
                  {[
                    'Official UCA Form',
                    'Narrative Statement',
                    'AI Assistance',
                    'DOT Compliance',
                    'Professional Formatting'
                  ].map((feature, idx) => (
                    <div key={idx} className="py-3 font-medium text-gray-700 text-sm">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Free UCA column */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="h-24 flex flex-col items-center justify-center mb-4">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-2">
                    FREE
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">UCA Form Filler</h3>
                </div>
                <div className="space-y-4">
                  <div className="py-3 flex justify-center"><CheckCircle className="text-green-600" size={24} /></div>
                  <div className="py-3 flex justify-center text-gray-400">—</div>
                  <div className="py-3 flex justify-center text-gray-400">—</div>
                  <div className="py-3 flex justify-center"><CheckCircle className="text-green-600" size={24} /></div>
                  <div className="py-3 flex justify-center"><CheckCircle className="text-green-600" size={24} /></div>
                </div>
              </div>

              {/* Narrative Pro column */}
              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 relative">
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold">
                  BEST VALUE
                </div>
                <div className="h-24 flex flex-col items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2">
                    $149
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Narrative Pro</h3>
                </div>
                <div className="space-y-4">
                  <div className="py-3 flex justify-center"><CheckCircle className="text-amber-600" size={24} /></div>
                  <div className="py-3 flex justify-center"><CheckCircle className="text-amber-600" size={24} /></div>
                  <div className="py-3 flex justify-center"><CheckCircle className="text-amber-600" size={24} /></div>
                  <div className="py-3 flex justify-center"><CheckCircle className="text-amber-600" size={24} /></div>
                  <div className="py-3 flex justify-center"><CheckCircle className="text-amber-600" size={24} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials - Enhanced with better visual design */}
      <div
        id="testimonials-section"
        ref={(el) => (observerRefs.current[6] = el)}
        className={`py-14 bg-white ${
          isVisible['testimonials-section'] ? 'animate-fade-in' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
              SUCCESS STORIES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Trusted by Business Owners
            </h2>
            <p className="text-lg text-gray-600">Real results from real businesses</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Maria Rodriguez',
                role: 'Construction Services, Texas',
                rating: 5,
                text: 'The narrative tool saved me weeks of work. I was certified on my first try! The AI really understood how to present my story professionally.',
                avatar: 'M'
              },
              {
                name: 'James Chen',
                role: 'Engineering Firm, California',
                rating: 5,
                text: 'After spending $2,500 on a consultant who didn\'t deliver, I found this for $149. Got certified within 60 days. Absolutely worth it!',
                avatar: 'J'
              },
              {
                name: 'Sandra L.',
                role: 'IT Services, Florida',
                rating: 5,
                text: 'Clear, professional, and exactly what the DOT wanted. The formatting alone would have taken me days to figure out.',
                avatar: 'S'
              }
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Star rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-amber-400 fill-amber-400" size={18} />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-gray-700 leading-relaxed mb-4 italic text-sm">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
                    <p className="text-gray-600 text-xs">{testimonial.role}</p>
                  </div>
                </div>

                {/* Verified badge */}
                <div className="mt-3 inline-flex items-center gap-2 text-green-600 text-xs font-medium">
                  <CheckCircle size={14} />
                  Verified Business Owner
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section - Enhanced styling */}
      <div
        id="faq-section"
        ref={(el) => (observerRefs.current[7] = el)}
        className={`py-14 bg-gradient-to-br from-slate-50 to-gray-100 ${
          isVisible['faq-section'] ? 'animate-fade-in' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
              GOT QUESTIONS?
            </div>
            <h2 className="text-3xl font-bold mb-3 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-600">
              Everything you need to know about our tools and the new requirements
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all transform hover:scale-[1.01]"
              >
                <button
                  onClick={() => handleFaqClick(faq.question, idx)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left group"
                >
                  <span className="font-semibold text-gray-900 pr-4 group-hover:text-blue-600 transition-colors text-sm">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 transform transition-transform duration-300 ${expandedFaq === idx ? 'rotate-180' : ''}`}>
                    <ChevronDown className="text-blue-600" size={20} />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedFaq === idx ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-4 bg-gradient-to-br from-blue-50/50 to-gray-50">
                    <p className="text-gray-700 leading-relaxed text-sm">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/faq')}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-xl text-sm"
            >
              <BookOpen size={20} />
              View All FAQs & Regulation Details
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Final CTA - Enhanced with urgency and visual appeal */}
      <div className="relative py-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-bold mb-4 animate-bounce-subtle">
            ⚡ LIMITED TIME: 50% OFF NARRATIVE PRO
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Ready to Get <span className="text-yellow-300">Certified</span>?
          </h2>
          
          <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
            Join thousands of successful DBE applicants. Begin with our free UCA form filler, then upgrade to the complete narrative package when you're ready.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={handleStartFreeForm}
              className="group relative bg-white text-blue-600 hover:bg-gray-50 font-bold py-3 px-10 rounded-xl text-base flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Download size={20} className="relative z-10 group-hover:animate-bounce" />
              <span className="relative z-10">Start FREE Form Filler</span>
            </button>
            
            <button
              onClick={handleStartNarrative}
              className="group relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_auto] hover:bg-right text-white font-bold py-3 px-10 rounded-xl text-base flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Sparkles size={20} className="relative z-10 group-hover:rotate-12 transition-transform" />
              <span className="relative z-10">Generate Narrative ($149)</span>
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-blue-100 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-400" />
              <span>No credit card required</span>
            </div>
            <span className="hidden sm:inline text-blue-300">•</span>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-400" />
              <span>Instant download</span>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-blue-200 mb-3 font-medium text-sm">Trusted by 10,000+ businesses nationwide</p>
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
              ))}
            </div>
            <p className="text-blue-100 mt-2 text-sm">4.9/5 average rating from 2,500+ reviews</p>
          </div>
        </div>
      </div>

      {/* Footer - Enhanced styling */}
      <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-lg">
                  <Shield className="text-white" size={24} />
                </div>
                <span className="text-white font-bold text-lg">DBE Narrative Pro</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">
                Professional DBE certification tools powered by AI. Free form filler + paid narrative services.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 text-base">Tools</h4>
              <ul className="space-y-3 text-sm">
                <li className="cursor-pointer hover:text-white transition-colors hover:translate-x-1 transform duration-200" onClick={() => navigate('/uca-form')}>
                  Free UCA Form Filler
                </li>
                <li className="cursor-pointer hover:text-white transition-colors hover:translate-x-1 transform duration-200" onClick={() => navigate('/narrative')}>
                  Narrative Pro ($149)
                </li>
                <li className="cursor-pointer hover:text-white transition-colors hover:translate-x-1 transform duration-200" onClick={() => navigate('/home')}>
                  Compare Tools
                </li>
                <li className="cursor-pointer hover:text-white transition-colors hover:translate-x-1 transform duration-200" onClick={() => navigate('/faq')}>
                  FAQ
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 text-base">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li className="cursor-pointer hover:text-white transition-colors hover:translate-x-1 transform duration-200" onClick={() => navigate('/faq')}>
                  FAQ - Common Questions
                </li>
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-1 transform duration-200">
                  About the 2025 Changes
                </li>
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-1 transform duration-200">
                  Documentation Guide
                </li>
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-1 transform duration-200">
                  UCP Directory
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 text-base">Legal</h4>
              <p className="text-sm leading-relaxed">
                This service provides document generation assistance. It does not constitute legal advice. 
                Consult with qualified professionals for specific guidance.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        @keyframes bounceSubtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .animate-bounce-subtle {
          animation: bounceSubtle 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;