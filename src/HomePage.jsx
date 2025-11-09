import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, FileText, AlertCircle, CheckCircle, ArrowRight, Calendar, Scale, BookOpen, Users, TrendingUp, Award, ChevronDown, ChevronUp, Download, Sparkles, CreditCard, Zap, Clock, DollarSign, Star, AlertTriangle, ExternalLink, FileCheck, Timer, BadgeCheck } from 'lucide-react';
import { trackEvent, trackPageView } from './Analytics';
import Navigation from './Navigation';

const HomePage = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const observerRefs = useRef([]);

  // Track homepage view
  useEffect(() => {
    trackPageView('Home Page - DBE Narrative Pro');
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

  const handleStartNarrative = () => {
    trackEvent('start_narrative_clicked', {
      location: 'homepage_hero'
    });
    navigate('/narrative');
  };

  const handleFederalRegisterClick = () => {
    trackEvent('federal_register_clicked', {
      location: 'homepage'
    });
    window.open('https://www.federalregister.gov/documents/2025/10/03/2025-19460/disadvantaged-business-enterprise-program-and-disadvantaged-business-enterprise-in-airport', '_blank');
  };

  const handleUCADownload = () => {
    trackEvent('uca_download_clicked', {
      location: 'homepage'
    });
    window.open('https://www.transportation.gov/sites/dot.gov/files/2025-02/UCA%204.09.2024%20%281%29.pdf', '_blank');
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
      answer: "The DOT eliminated race and gender-based presumptions of disadvantage. All applicants must now provide individualized proof of social and economic disadvantage through detailed personal narratives and supporting documentation."
    },
    {
      question: "Do currently certified DBEs need to recertify?",
      answer: "Yes. Under 49 CFR § 26.111, all 41,000+ currently certified DBE firms must undergo reevaluation under the new standards. UCPs are working through this process now. Firms that don't submit adequate narratives will be decertified."
    },
    {
      question: "What exactly is a 'Personal Narrative'?",
      answer: "A Personal Narrative is a detailed 4-6 page document where you must prove social and economic disadvantage through specific incidents of economic hardship, systemic barriers, and denied opportunities. It must demonstrate how these impediments caused economic harm and show you are disadvantaged relative to similarly situated individuals."
    },
    {
      question: "Why do I need professional help with my narrative?",
      answer: "These narratives have never been required before. There are no clear standards on what's sufficient. Even UCPs are confused about evaluation criteria. A poorly written narrative could mean losing your DBE certification and business opportunities. Our AI-powered service helps you create professional, comprehensive narratives that maximize your chances of approval."
    },
    {
      question: "How much does DBE Narrative Pro cost compared to consultants?",
      answer: "DBE consultants typically charge $1,500-$3,000 for narrative services. Our AI-powered service costs just $149 - a fraction of the cost while delivering professional-quality documents. Plus, you get both the Personal Narrative AND Statement of Economic Disadvantage."
    },
    {
      question: "What documents do I receive?",
      answer: "You receive two professionally formatted Microsoft Word documents: (1) Personal Narrative (4-6 pages) detailing specific incidents of social disadvantage, and (2) Statement of Economic Disadvantage documenting financial barriers and their impacts. Both are fully editable and ready to submit with your UCA application."
    }
  ];

  const stats = [
    { number: "41,000+", label: "DBEs Must Recertify", icon: AlertTriangle },
    { number: "$149", label: "vs $1,500-3,000 Consultants", icon: DollarSign },
    { number: "4-6", label: "Pages of Documentation", icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Navigation */}
      <Navigation />

      {/* Emergency Alert Banner - ENHANCED */}
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-3 px-4 shadow-2xl border-b-4 border-red-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-center gap-3 flex-wrap text-center">
            <AlertTriangle size={24} className="animate-pulse flex-shrink-0 drop-shadow-lg" />
            <p className="font-bold text-sm md:text-lg">
              URGENT: All 41,000+ certified DBEs must submit Personal Narratives to maintain certification
            </p>
            <button
              onClick={scrollToRuling}
              className="bg-white text-red-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-all transform hover:scale-110 shadow-2xl hover:shadow-3xl"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section - SUPER ENHANCED */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16 md:py-20 overflow-hidden">
        {/* Enhanced animated mesh gradient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Enhanced animated grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 animate-fade-in-up">
            {/* Crisis Badge - ENHANCED */}
            <div className="inline-block mb-6">
              <div className="relative bg-gradient-to-r from-red-500 to-orange-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl border-2 border-red-400/30">
                <span className="relative z-10 flex items-center gap-2">
                  <AlertTriangle size={20} className="animate-pulse" />
                  CONSTITUTIONAL RULING: New Requirements Effective October 2025
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
              </div>
            </div>
            
            {/* Main Headline - SUPER ENHANCED */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
              <span className="inline-block animate-gradient bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent bg-[length:200%_auto]">
                Don't Lose Your DBE Certification
              </span>
              <br />
              <span className="text-white inline-block mt-3 drop-shadow-xl">Get Your Personal Narrative Done Right</span>
            </h1>
            
            {/* Subheadline - ENHANCED */}
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
              The DOT eliminated race and gender presumptions. Now <span className="text-red-300 font-bold text-xl md:text-2xl">every DBE</span> must prove disadvantage through detailed personal narratives.
            </p>

            {/* Quick Value Proposition Grid - ENHANCED WITH LARGER TEXT */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
              <div className="bg-white/15 backdrop-blur-md rounded-xl p-5 border border-white/30 transform hover:scale-105 transition-all duration-300 hover:bg-white/20 shadow-2xl hover:shadow-3xl">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="text-green-400" size={32} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-1">15 min</div>
                <div className="text-base text-blue-100 font-semibold">not weeks</div>
              </div>
              
              <div className="bg-white/15 backdrop-blur-md rounded-xl p-5 border border-white/30 transform hover:scale-105 transition-all duration-300 hover:bg-white/20 shadow-2xl hover:shadow-3xl">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="text-yellow-400" size={32} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-1">$149</div>
                <div className="text-base text-blue-100 font-semibold">not $3,000</div>
              </div>
              
              <div className="bg-white/15 backdrop-blur-md rounded-xl p-5 border border-white/30 transform hover:scale-105 transition-all duration-300 hover:bg-white/20 shadow-2xl hover:shadow-3xl">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="text-purple-400" size={32} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1">AI</div>
                <div className="text-base text-blue-100 font-semibold">Powered</div>
              </div>
              
              <div className="bg-white/15 backdrop-blur-md rounded-xl p-5 border border-white/30 transform hover:scale-105 transition-all duration-300 hover:bg-white/20 shadow-2xl hover:shadow-3xl">
                <div className="flex items-center justify-center mb-2">
                  <BadgeCheck className="text-blue-400" size={32} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-1">Pro</div>
                <div className="text-base text-blue-100 font-semibold">Quality</div>
              </div>
            </div>

            {/* CTA Buttons - SUPER ENHANCED */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <button
                onClick={handleStartNarrative}
                className="group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-2 border-green-400/30 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles size={24} className="animate-bounce-subtle" />
                  Create My Narrative - $149
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </button>

              <button
                onClick={handleUCADownload}
                className="group relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-5 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-2 border-blue-400/30 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Download size={22} className="group-hover:animate-bounce" />
                  Download UCA Form (PDF)
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* NEW FAQ BUTTON - PROMINENT */}
            <div className="mt-6">
              <button
                onClick={() => navigate('/faq')}
                className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-2 border-purple-400/30 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <BookOpen size={22} className="group-hover:rotate-12 transition-transform" />
                  View All FAQs & Get Answers
                  <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </button>
            </div>

            {/* Trust Indicators - ENHANCED */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200 mt-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                <CheckCircle size={18} className="text-green-400" />
                <span className="font-semibold">Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                <CheckCircle size={18} className="text-green-400" />
                <span className="font-semibold">Professional Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                <CheckCircle size={18} className="text-green-400" />
                <span className="font-semibold">Editable Word Docs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - ENHANCED */}
      <div className="py-12 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-blue-100 hover:border-blue-300 transition-all transform hover:scale-105 hover:shadow-3xl"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-xl">
                    <stat.icon className="text-white" size={36} />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-700 font-semibold text-lg">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Constitutional Ruling Section - ENHANCED */}
      <div 
        id="ruling-section" 
        className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-16 border-y-4 border-red-200 relative overflow-hidden"
        ref={(el) => (observerRefs.current[0] = el)}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-2xl border-2 border-red-400/30 animate-bounce-subtle">
              <Scale size={20} className="inline mr-2" />
              OCTOBER 2025 REGULATORY CHANGES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything Changed in <span className="text-red-600">October 2025</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Following a constitutional ruling, the DOT was required to eliminate race and gender presumptions. 
              All DBE firms must now submit individualized proof of disadvantage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Before Card - ENHANCED */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-gray-200 transform hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gray-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                  BEFORE OCT 2025
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Race/Gender Presumptions</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-gray-400 flex-shrink-0 mt-1" size={24} />
                  <span className="text-gray-700 text-lg">Automatic presumption of social disadvantage for certain groups</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-gray-400 flex-shrink-0 mt-1" size={24} />
                  <span className="text-gray-700 text-lg">Limited documentation required</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-gray-400 flex-shrink-0 mt-1" size={24} />
                  <span className="text-gray-700 text-lg">Streamlined certification process</span>
                </li>
              </ul>
            </div>

            {/* After Card - ENHANCED */}
            <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl shadow-2xl p-8 border-4 border-red-400 text-white transform hover:scale-105 transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white text-red-600 px-4 py-2 rounded-xl text-sm font-bold shadow-lg animate-pulse">
                    NOW (OCT 2025+)
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-6">Individualized Proof Required</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <AlertCircle className="text-yellow-300 flex-shrink-0 mt-1 animate-pulse" size={24} />
                    <span className="text-lg font-semibold">Personal Narrative (4-6 pages) describing specific incidents of disadvantage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="text-yellow-300 flex-shrink-0 mt-1 animate-pulse" size={24} />
                    <span className="text-lg font-semibold">Statement of Economic Disadvantage with detailed financial impacts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="text-yellow-300 flex-shrink-0 mt-1 animate-pulse" size={24} />
                    <span className="text-lg font-semibold">Supporting documentation and evidence</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Box - SUPER ENHANCED */}
          <div className="bg-white rounded-2xl shadow-2xl p-10 border-4 border-red-200 transform hover:scale-105 transition-all">
            <div className="text-center">
              <AlertTriangle className="text-red-600 mx-auto mb-6 animate-bounce-subtle" size={60} />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                All 41,000+ Currently Certified DBEs Must Submit Narratives
              </h3>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                UCPs are reevaluating all existing certifications under the new standards. 
                Firms that fail to submit adequate narratives <span className="text-red-600 font-bold">will be decertified</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleFederalRegisterClick}
                  className="group bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all border-2 border-blue-400/30"
                >
                  <span className="flex items-center gap-3">
                    <ExternalLink size={22} />
                    Read the October 2025 IFR
                    <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
                <button
                  onClick={handleUCADownload}
                  className="group bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all border-2 border-green-400/30"
                >
                  <span className="flex items-center gap-3">
                    <Download size={22} className="group-hover:animate-bounce" />
                    Download UCA Form
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Professional Help Section - ENHANCED */}
      <div className="py-16 bg-gradient-to-br from-white via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why You Need <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Professional Help</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              These narratives have never been required before. The standards are unclear. Don't risk your certification.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 - ENHANCED */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-red-200 hover:border-red-400 transition-all transform hover:scale-105">
              <div className="bg-gradient-to-br from-red-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                <AlertTriangle className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Clear Standards</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                The new requirements are ambiguous. Even UCPs are uncertain about evaluation criteria. 
                A weak narrative = lost certification.
              </p>
            </div>

            {/* Card 2 - ENHANCED */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-yellow-200 hover:border-yellow-400 transition-all transform hover:scale-105">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                <FileText className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Complex Requirements</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                Your narrative must document specific incidents, demonstrate economic impact, 
                and prove disadvantage relative to similarly situated individuals.
              </p>
            </div>

            {/* Card 3 - ENHANCED */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-green-200 hover:border-green-400 transition-all transform hover:scale-105">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Solution</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                Our advanced AI creates comprehensive, professional narratives in minutes 
                for a fraction of consultant costs - just $149.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section - SUPER ENHANCED */}
      <div className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get Your Narrative in <span className="text-green-400">3 Simple Steps</span>
            </h2>
            <p className="text-xl text-blue-100">
              Professional-quality documents in 15 minutes, not weeks
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 - ENHANCED */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 hover:bg-white/15 transition-all transform hover:scale-105 shadow-2xl">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl">
                <span className="text-4xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Answer Questions</h3>
              <p className="text-blue-100 leading-relaxed text-center text-lg">
                Our AI guides you through a simple questionnaire about your background 
                and experiences (15 minutes)
              </p>
            </div>

            {/* Step 2 - ENHANCED */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 hover:bg-white/15 transition-all transform hover:scale-105 shadow-2xl">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl">
                <span className="text-4xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">AI Creates Documents</h3>
              <p className="text-blue-100 leading-relaxed text-center text-lg">
                Advanced AI generates your complete Personal Narrative and Economic 
                Disadvantage Statement
              </p>
            </div>

            {/* Step 3 - ENHANCED */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 hover:bg-white/15 transition-all transform hover:scale-105 shadow-2xl">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl">
                <span className="text-4xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Download & Submit</h3>
              <p className="text-blue-100 leading-relaxed text-center text-lg">
                Receive professional Word documents instantly. Edit if needed and 
                submit with your UCA application
              </p>
            </div>
          </div>

          {/* CTA - ENHANCED */}
          <div className="text-center">
            <button
              onClick={handleStartNarrative}
              className="group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-6 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-2 border-green-400/30 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles size={28} className="animate-bounce-subtle" />
                Start Your Narrative Now - $149
                <ArrowRight size={28} className="group-hover:translate-x-3 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            </button>
          </div>
        </div>
      </div>

      {/* What You Get Section - ENHANCED */}
      <div className="py-16 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What You'll <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Receive</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Two professionally formatted documents ready to submit with your UCA application
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Document 1 - ENHANCED */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-blue-200 hover:border-blue-400 transition-all transform hover:scale-105">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
                <FileText className="text-white" size={36} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Personal Narrative</h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                4-6 pages documenting specific incidents of social disadvantage, barriers faced, 
                and how these experiences impacted your business opportunities.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                  <span className="text-gray-700 text-lg">Detailed incident documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                  <span className="text-gray-700 text-lg">Demonstrates systemic barriers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                  <span className="text-gray-700 text-lg">Professional formatting</span>
                </li>
              </ul>
            </div>

            {/* Document 2 - ENHANCED */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-purple-200 hover:border-purple-400 transition-all transform hover:scale-105">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
                <DollarSign className="text-white" size={36} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Statement of Economic Disadvantage</h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Comprehensive documentation of financial barriers, limited access to capital, 
                and economic impacts of disadvantage.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                  <span className="text-gray-700 text-lg">Financial impact analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                  <span className="text-gray-700 text-lg">Capital access documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                  <span className="text-gray-700 text-lg">Editable Microsoft Word</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Comparison Section - ENHANCED */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-10 text-white border-4 border-green-400">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Why Choose DBE Narrative Pro?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <CheckCircle size={24} />
                    </div>
                    <span className="text-xl font-semibold">15 minutes vs weeks of work</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <CheckCircle size={24} />
                    </div>
                    <span className="text-xl font-semibold">$149 vs $1,500-$3,000 consultants</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <CheckCircle size={24} />
                    </div>
                    <span className="text-xl font-semibold">Instant delivery & editable format</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/30">
                  <div className="text-6xl font-bold mb-2">$149</div>
                  <div className="text-2xl mb-6">Complete Package</div>
                  <button
                    onClick={handleStartNarrative}
                    className="group bg-white text-green-600 px-8 py-4 rounded-xl text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all"
                  >
                    <span className="flex items-center gap-3">
                      Get Started Now
                      <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section - ENHANCED */}
      <div className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-blue-400">Questions</span>
            </h2>
            <p className="text-xl text-blue-100">
              Everything you need to know about the new requirements
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl border-2 border-white/20 overflow-hidden hover:bg-white/15 transition-all shadow-xl"
              >
                <button
                  onClick={() => handleFaqClick(faq.question, index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/5 transition-all"
                >
                  <span className="font-bold text-lg">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="flex-shrink-0 text-blue-400" size={28} />
                  ) : (
                    <ChevronDown className="flex-shrink-0 text-blue-400" size={28} />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6 text-blue-100 leading-relaxed text-lg border-t border-white/10 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Link to Full FAQ Page - ENHANCED */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/faq')}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all border-2 border-purple-400/30"
            >
              <span className="flex items-center gap-3">
                <BookOpen size={24} className="group-hover:rotate-12 transition-transform" />
                View All FAQs & Get More Answers
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Final CTA Section - SUPER ENHANCED */}
      <div className="py-16 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-bold mb-6 border-2 border-white/30 animate-bounce-subtle">
              <AlertTriangle size={24} className="inline mr-2" />
              Don't Wait Until It's Too Late
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
              Protect Your DBE Certification Today
            </h2>
            <p className="text-xl md:text-2xl mb-10 leading-relaxed">
              Get professional Personal Narrative documents in 15 minutes for just $149
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button
              onClick={handleStartNarrative}
              className="group relative bg-white text-green-600 px-12 py-6 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles size={28} className="animate-bounce-subtle" />
                Create My Narrative - $149
                <ArrowRight size={28} className="group-hover:translate-x-3 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Trust badges - ENHANCED */}
          <div className="flex flex-wrap justify-center gap-6 text-base">
            <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm border-2 border-white/20">
              <CheckCircle size={22} />
              <span className="font-semibold">Instant Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm border-2 border-white/20">
              <CheckCircle size={22} />
              <span className="font-semibold">Professional Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - ENHANCED */}
      <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-xl">
                  <Shield className="text-white" size={24} />
                </div>
                <span className="text-white font-bold text-lg">DBE Narrative Pro</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">
                Professional DBE certification narratives powered by AI. Helping firms maintain certification under the new October 2025 requirements.
              </p>
            </div>

<div>
  <h4 className="text-white font-bold mb-4 text-base">Support</h4>
  <ul className="space-y-3 text-sm">
    <li className="cursor-pointer hover:text-white transition-colors hover:translate-x-1 transform duration-200" onClick={() => navigate('/contact')}>
      Contact Us
    </li>
  </ul>
</div>    
            <div>
              <h4 className="text-white font-bold mb-4 text-base">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li className="cursor-pointer hover:text-white transition-colors hover:translate-x-1 transform duration-200" onClick={handleFederalRegisterClick}>
                  October 2025 IFR Ruling
                </li>
                <li className="cursor-pointer hover:text-white transition-colors hover:translate-x-1 transform duration-200" onClick={handleUCADownload}>
                  Download UCA Form (PDF)
                </li>
                <li className="cursor-pointer hover:text-white transition-colors hover:translate-x-1 transform duration-200" onClick={() => navigate('/faq')}>
                  Common Questions
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

      {/* Custom animations CSS - ENHANCED */}
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
            transform: translateY(-8px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
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

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;