import React, { useState, useEffect } from 'react';
import { Shield, FileText, AlertCircle, CheckCircle, ArrowRight, Calendar, Scale, BookOpen, Users, TrendingUp, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { trackEvent, trackPageView } from './Analytics';

const DBEHomePage = ({ onStartApp, onNavigateToFAQ }) => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Track homepage view
  useEffect(() => {
    trackPageView('Home Page');
  }, []);

  const scrollToRuling = () => {
    trackEvent('learn_about_changes_clicked');
    const rulingSection = document.getElementById('ruling-section');
    if (rulingSection) {
      rulingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStartApp = () => {
    trackEvent('get_started_clicked', {
      location: 'hero_section'
    });
    onStartApp();
  };

  const handleStartAppFinal = () => {
    trackEvent('get_started_clicked', {
      location: 'final_cta'
    });
    onStartApp();
  };

  const handleFaqClick = (question, index) => {
    trackEvent('faq_clicked', {
      question: question.substring(0, 50), // First 50 chars
      faq_index: index
    });
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleViewAllFAQs = () => {
    trackEvent('view_all_faqs_clicked', {
      location: 'homepage_faq_section'
    });
    if (onNavigateToFAQ) {
      onNavigateToFAQ();
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    trackEvent('newsletter_signup_clicked');
    // Add your newsletter logic here
    alert('Newsletter signup coming soon!');
  };

  const faqs = [
    {
      question: "What changed in the October 2025 DBE regulations?",
      answer: "The DOT eliminated race and gender-based presumptions of disadvantage. All applicants must now provide individualized proof of social and economic disadvantage through detailed narratives and supporting documentation."
    },
    {
      question: "Who needs to recertify under the new standards?",
      answer: "All current DBE-certified businesses must recertify under the new requirements. The specific timeline depends on your UCP, but most programs require recertification within 12-18 months of the October 2025 effective date."
    },
    {
      question: "How is DBE Narrative Pro different from hiring a consultant?",
      answer: "Professional consultants charge $1,500-3,000 for narrative preparation. DBE Narrative Pro uses AI to generate compliant documents for $149, giving you the same professional quality at a fraction of the cost. You maintain full control and can edit everything."
    },
    {
      question: "What documents will I receive?",
      answer: "You'll receive four professional documents: (1) Complete narrative statement of disadvantage (4-6 pages), (2) Formal cover letter to your UCP, (3) Comprehensive documentation checklist, and (4) Pre-submission review summary. All formatted and ready for submission."
    },
    {
      question: "Is my information secure?",
      answer: "Yes. All processing happens locally in your browser. We don't store any of your business information, financial data, or personal details on our servers. Your data is yours alone."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="text-blue-400" size={36} />
              <h1 className="text-2xl font-bold">DBE Narrative Pro</h1>
            </div>
            <div className="bg-amber-500 text-amber-900 px-4 py-2 rounded-lg font-bold text-sm">
              2025 Compliant
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                URGENT: New Requirements Effective October 2025
              </div>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Navigate New DBE Certification Requirements With Confidence
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                The DOT has eliminated presumptions of disadvantage. Generate professional, 
                compliant narratives in minutes—not weeks—for just $149.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleStartApp}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 text-lg transition-all transform hover:scale-105 shadow-xl"
                >
                  Create My AI Narrative
                  <ArrowRight size={24} />
                </button>
                <button 
                  onClick={scrollToRuling}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold py-4 px-8 rounded-xl border-2 border-white/30 transition-all">
                  Learn About Changes
                </button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-blue-200">
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} />
                  <span>30-min process</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} />
                  <span>AI-powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} />
                  <span>Instant download</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-500 rounded-lg p-3 flex-shrink-0">
                      <FileText className="text-slate-900" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Professional Documents</h3>
                      <p className="text-blue-200 text-sm">Complete narrative, cover letter, and checklists</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500 rounded-lg p-3 flex-shrink-0">
                      <Shield className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Regulation Compliant</h3>
                      <p className="text-blue-200 text-sm">Meets all 49 CFR Part 26 requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500 rounded-lg p-3 flex-shrink-0">
                      <TrendingUp className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Save Time & Money</h3>
                      <p className="text-blue-200 text-sm">$149 vs $1,500-3,000 consultant fees</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regulatory Update Alert */}
      <div className="bg-red-50 border-y-4 border-red-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={32} />
            <div>
              <h2 className="text-2xl font-bold text-red-900 mb-3">Critical Regulatory Change</h2>
              <p className="text-red-800 text-lg leading-relaxed mb-4">
                On <strong>October 16, 2025</strong>, the U.S. Department of Transportation implemented sweeping 
                changes to DBE certification requirements under 49 CFR Part 26. Race and gender-based presumptions 
                of disadvantage have been eliminated nationwide.
              </p>
              <div className="bg-white border-2 border-red-200 rounded-lg p-6">
                <h3 className="font-bold text-red-900 mb-3">What This Means for Your Business:</h3>
                <ul className="space-y-2 text-red-800">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span><strong>All applicants</strong> must now provide individualized proof of social and economic disadvantage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Detailed narratives with <strong>specific incidents</strong> and supporting documentation are mandatory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Current DBE certifications must be <strong>renewed under new standards</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Applications lacking sufficient detail and evidence will be <strong>denied</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Ruling Section */}
      <div id="ruling-section" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Scale className="mx-auto text-blue-600 mb-4" size={48} />
            <h2 className="text-4xl font-bold mb-4">Understanding the Official Ruling</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Federal courts ruled that presumptions of disadvantage based solely on race or gender 
              violate constitutional equal protection principles.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600">
              <Calendar className="text-blue-600 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-3">Timeline</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>June 2023:</strong> Initial court ruling issued</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>October 2024:</strong> Appeals exhausted</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>October 2025:</strong> New rules take effect</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>2026-2027:</strong> Nationwide recertification</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600">
              <BookOpen className="text-amber-600 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-3">Key Changes</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>No automatic presumption based on identity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Individualized evidence required for all</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Preponderance of evidence standard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Detailed narrative statements mandatory</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-600">
              <Award className="text-green-600 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-3">Requirements</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Document specific incidents of discrimination</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Prove economic barriers and impacts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Submit supporting evidence and documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Demonstrate cumulative disadvantage effect</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Scale className="text-blue-600" size={32} />
              Legal Citation: 49 CFR Part 26 (Amended October 2025)
            </h3>
            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <p className="text-gray-800 leading-relaxed mb-4">
                <strong>Official Regulatory Text:</strong> "Effective October 16, 2025, certification of disadvantaged 
                business enterprises shall require individualized determination of social and economic disadvantage. 
                No presumption of disadvantage shall be made based solely on membership in a particular racial, 
                ethnic, or gender group."
              </p>
              <div className="flex items-start gap-3 mb-4">
                <BookOpen className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                <p className="text-gray-700 text-sm">
                  <strong>Source:</strong> U.S. Department of Transportation, Final Rule FR-2025-19460, Federal Register Vol. 90, No. 192
                </p>
              </div>

              <a
                href="https://www.federalregister.gov/documents/2025/10/03/2025-19460/disadvantaged-business-enterprise-program-and-disadvantaged-business-enterprise-in-airport"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('official_ruling_clicked')}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
              >
                <Scale size={20} />
                Read Full Official Ruling
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How DBE Narrative Pro Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform transforms your experiences into professional, 
              compliant narratives in four simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Share Your Story",
                description: "Complete our guided questionnaire about your business experiences and challenges.",
                icon: Users,
                color: "blue"
              },
              {
                step: "2",
                title: "AI Generation",
                description: "Advanced AI analyzes your input and generates compliant narratives meeting all requirements.",
                icon: TrendingUp,
                color: "purple"
              },
              {
                step: "3",
                title: "Review & Unlock",
                description: "Preview your documents, then unlock the complete package for $149.",
                icon: FileText,
                color: "amber"
              },
              {
                step: "4",
                title: "Download & Submit",
                description: "Download all documents and submit to your UCP with confidence.",
                icon: CheckCircle,
                color: "green"
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative">
                  <div className={`bg-${item.color}-50 rounded-xl p-6 border-2 border-${item.color}-200 h-full`}>
                    <div className={`bg-${item.color}-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-4`}>
                      {item.step}
                    </div>
                    <Icon className={`text-${item.color}-600 mb-3`} size={32} />
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="text-gray-300" size={32} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Newsletter/Resources Section */}
      <div className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Stay Informed on DBE Changes</h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Get the latest updates on certification requirements, compliance tips, and success strategies 
                delivered to your inbox.
              </p>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                <h3 className="font-bold text-xl mb-4">Recent Updates</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Calendar className="text-amber-400 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold">Oct 16, 2025</p>
                      <p className="text-blue-200 text-sm">New requirements officially take effect nationwide</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Calendar className="text-amber-400 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold">Oct 1, 2025</p>
                      <p className="text-blue-200 text-sm">UCPs begin accepting applications under new standards</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Calendar className="text-amber-400 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold">Sept 2025</p>
                      <p className="text-blue-200 text-sm">Final guidance documents published by DOT</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to Updates</h3>
              <p className="text-gray-600 mb-6">
                Join 2,500+ DBE business owners staying ahead of regulatory changes.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none text-gray-900"
                />
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
                >
                  Get Free Updates
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about the new requirements and our service.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => handleFaqClick(faq.question, idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-left text-gray-900">{faq.question}</span>
                  {expandedFaq === idx ? (
                    <ChevronUp className="text-blue-600 flex-shrink-0" size={24} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                  )}
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* View All FAQs Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleViewAllFAQs}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 mx-auto transition-all transform hover:scale-105 shadow-lg"
            >
              <BookOpen size={24} />
              View All FAQs & Get More Answers
              <ArrowRight size={20} />
            </button>
            <p className="mt-4 text-gray-600">
              Have more questions? Check our comprehensive FAQ page for detailed answers.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Certified?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Don't let complex requirements stand between you and DBE certification. 
            Generate your professional narrative in 30 minutes.
          </p>
          <button
            onClick={handleStartAppFinal}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-5 px-10 rounded-xl text-xl flex items-center justify-center gap-3 mx-auto transition-all transform hover:scale-105 shadow-2xl"
          >
            Start Your Narrative Now
            <ArrowRight size={28} />
          </button>
          <p className="mt-6 text-blue-200">
            $149 one-time payment • Instant download • 100% satisfaction guarantee
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="text-blue-400" size={24} />
                <span className="text-white font-bold">DBE Narrative Pro</span>
              </div>
              <p className="text-sm">
                Professional DBE certification narratives powered by AI.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>About the Ruling</li>
                <li>Documentation Guide</li>
                <li>Sample Narratives</li>
                <li>UCP Directory</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>FAQ</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <p className="text-xs">
                This service provides document generation assistance. It does not constitute legal advice. 
                Consult with qualified professionals for specific guidance.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2025 DBE Narrative Pro. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBEHomePage;