import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, ArrowLeft, Search, ChevronDown, ChevronUp, 
  Info, FileSignature, RefreshCw, Target, FilePlus, Truck,
  Scale, FileText, HelpCircle, Lock, BookOpen, CheckCircle, Sparkles, Zap
} from 'lucide-react';
import Navigation from './Navigation';

const FAQPage = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Auto-scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleFaqClick = (question, category, idx) => {
    const faqId = `${category}-${idx}`;
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setExpandedFaq(null);
    setSearchTerm('');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setExpandedFaq(null);
  };

  const handleStartApp = () => {
    navigate('/narrative');
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  const faqCategories = [
    {
      id: 'general-ifr',
      name: 'General IFR Information',
      icon: Info,
      color: 'purple',
      faqs: [
        {
          question: "When did the Interim Final Rule (IFR) become effective?",
          answer: "The IFR was published in the Federal Register on October 3, 2025 and became effective that day. For complete details, you can review the official FHWA FAQ document at: https://www.transportation.gov/sites/dot.gov/files/DBE_IFR_FAQs.pdf"
        },
        {
          question: "By when must the recipients update their DBE program plans?",
          answer: "In accordance with § 26.21(b), significant changes to DBE plans must be submitted to DOT for approval. The Department believes the IFR significantly changes the way recipients must implement their DBE plans. Therefore, we expect that recipients will amend their plans as soon as practicable after the Unified Certification Program (UCP) in their jurisdiction completes the reevaluation process described in § 26.111 to reflect the changes in the IFR. Any portion of a DBE program plan that is dependent upon presumptions of disadvantage, DBE goals, or any aspect of the prior DBE rule that has changed based on the IFR is no longer valid."
        },
        {
          question: "Do these changes apply to the Airport Concession Disadvantaged Business Enterprise (ACDBE) Program?",
          answer: "Yes, the IFR made changes to the ACDBE regulations in 49 CFR part 23 in a substantially similar manner to those changes made in 49 CFR part 26. Accordingly, these FAQs apply to ACDBEs."
        }
      ]
    },
    {
      id: 'contracting-questions',
      name: 'Contracting Questions',
      icon: FileSignature,
      color: 'green',
      faqs: [
        {
          question: "How does the IFR affect projects that are currently authorized/advertised and projects/contracts already awarded that have DBE goals?",
          answer: "Recipients with DBE goals on contracts that have been advertised but not yet let (i.e., bids not yet opened) must issue amendments to the advertisements removing the DBE contract goals. For projects with DBE contract goals that have been let (i.e., bids opened) but contracts not yet awarded (i.e., executed), recipients must take appropriate action to zero out the DBE goal. Due to the program changes in the IFR, DOT will allow recipients to amend the contracts without readvertising the projects, but each recipient should make its own determination on whether the contract needs to be recompeted under State law. Contracts with a DBE goal that were let and executed prior to October 3, 2025 are not required to be modified, but DBE participation on such contracts cannot be counted toward the DBE contract goal or toward the recipient's overall DBE goal until the UCP in the recipient's jurisdiction completes the reevaluation process described at 49 CFR § 26.111."
        },
        {
          question: "Do recipients need to continue to perform commercially useful function (CUF) reviews of DBE work on existing contracts during the reevaluation process described in 49 CFR § 26.111?",
          answer: "No. Because the purpose of CUF reviews is to ensure that DBE participation on a project can be properly counted toward DBE goals (contract goals and overall DBE goals) and the counting of DBE participation is suspended during the reevaluation process, it is unnecessary for recipients to conduct CUF reviews during the reevaluation process. Recipients may determine whether any existing contracts should be modified with respect to ongoing CUF requirements."
        },
        {
          question: "Do the regulatory DBE termination provisions continue to apply during the reevaluation period described in 49 CFR § 26.111?",
          answer: "Yes. The termination provisions at 49 CFR § 26.53(f) continue to apply to existing contracts. A prime contractor cannot terminate a DBE or any portion of the DBE's work listed in response to the good faith efforts bidding requirements of 49 CFR § 26.53(b) without the recipient's prior written consent upon a showing of good cause, unless the recipient causes the termination or reduction. Good cause does not exist if the prime contractor seeks to terminate a DBE or any portion of its work that it relied upon to obtain the contract so that the prime contractor can self-perform the work for which the DBE contractor was engaged, or so that the prime contractor can substitute another DBE or non-DBE contractor after contract award. Good cause for termination exists if a DBE loses its DBE certification after the reevaluation process described in § 26.111 is completed because it is ineligible to receive DBE credit for the type of work required."
        },
        {
          question: "How does the IFR affect DBE open-ended performance plans for design-build projects?",
          answer: "In cases in which a design-build contractor has already signed contracts prior to October 3, 2025 with DBE subcontractors toward meeting an open-ended performance plan, the contractor should proceed with the contract. The DBE subcontractor may not be terminated or have its work reduced without the written consent of the recipient and only for good cause, including a change in eligibility. See 49 CFR 26.53 for additional grounds for good cause. Where a DBE goal has been established for a design-build contract or a separate phase of a design-build contract, but no DBEs have yet been awarded contracts, the recipient should take appropriate action to zero out the DBE goal. If, after the reevaluation process, every DBE performing work on a design-build contract is recertified under the new standards, then the recipient need not take any further action."
        },
        {
          question: "How does a recipient remove an advertised DBE contract goal prior to a letting?",
          answer: "Recipients should issue amendments to the project advertisements to remove the DBE goal."
        },
        {
          question: "Does Section II (Nondiscrimination), Part 10.a, of Federal Highway Administration (FHWA) Form 1273 incorporate by reference the DBE regulations as amended by the IFR?",
          answer: "Yes. For contracts awarded on or after October 3, 2025, the new DBE program regulations apply."
        },
        {
          question: "What changes should be made to DBE special provisions that recipients use for contract awards?",
          answer: "DBE special provisions based on the DBE regulations in effect before October 3, 2025, should not be included in contracts entered into on or after October 3, 2025. For any contracts entered into on or after October 3, 2025, recipients should review and update any such DBE special provisions to comply with the DBE regulations as amended by the IFR. To the extent that an operating administration approves DBE special provisions, updated DBE special provisions must be approved by that DOT operating administration. Recipients may use their revised and DOT-approved DBE special provisions (when required) on contracts entered into after the recipient's UCP has completed the reevaluation described in 49 CFR § 26.111 and adopted a new overall DBE goal in accordance with 49 CFR § 26.45."
        },
        {
          question: "Are DOT recipients required to include the contract clauses in 49 CFR §§ 23.9 and 26.13 in contracts awarded on or after October 3, 2025 during the UCP reevaluation period?",
          answer: "Yes, DOT recipients are required to include the contract clauses listed in 49 CFR §§ 23.9 and 26.13(a-b) in all contracts. The IFR did not make changes to this requirement."
        },
        {
          question: "Are DOT recipients required to comply with the prompt payment requirements in 49 CFR § 26.29 during the UCP reevaluation period?",
          answer: "Yes. DOT recipients are required to implement and document compliance with the prompt payment requirements in 49 CFR § 26.29, including: (1) ensuring prime contractors pay subcontractors for satisfactory performance of their contract no later than 30 days from receipt of each payment made to the prime contractor, and (2) prompt and full payment of retainage from the prime contractor to the subcontractor within 30 days after the subcontractors work is satisfactorily completed. The IFR did not make changes to this requirement."
        }
      ]
    },
    {
      id: 'certification-reevaluation',
      name: 'Certification Reevaluation',
      icon: RefreshCw,
      color: 'orange',
      faqs: [
        {
          question: "Does a UCP have to reevaluate all currently certified DBEs in its DBE directory or only those DBEs for which the UCP was the jurisdiction of original certification?",
          answer: "Under the certification reevaluation requirements at 49 CFR § 26.111, UCPs are required to reevaluate the certifications only of those DBEs for which the UCP is the jurisdiction of original certification. UCPs are not required to reevaluate the certifications of DBEs that obtained certification from the UCP through the interstate certification procedures at 49 CFR § 26.85. DBEs that received certification from UCPs through interstate certification will have their certifications reevaluated by the UCPs in their jurisdiction of original certification. If such DBEs are recertified by the UCP in their jurisdiction of original certification, they will be required to reapply for interstate certification with the UCPs for the jurisdictions in which they wish to be certified."
        },
        {
          question: "Is there a date by which a UCP must complete its certification reevaluation process?",
          answer: "No. The regulation at 49 CFR § 26.111 provides that UCPs should complete the reevaluation process 'as quickly as practicable.'"
        },
        {
          question: "What happens if a currently certified DBE does not respond to the UCP's request for information during the reevaluation process?",
          answer: "If a currently certified DBE does not respond to the UCP's request for information, the UCP may remove the DBE's certification under 49 CFR § 26.87(d)(1) after providing appropriate notice and an opportunity to be heard."
        },
        {
          question: "What information must a DBE provide to the UCP during the reevaluation process?",
          answer: "The DBE must submit any information required by the UCP to demonstrate eligibility under the new standards, including information about social and economic disadvantage as detailed in the revised regulations."
        },
        {
          question: "Can a DBE continue to participate in DOT-assisted contracts while undergoing reevaluation?",
          answer: "Yes, a DBE may continue to participate in DOT-assisted contracts during the reevaluation process. However, such participation cannot be counted toward DBE goals until the reevaluation is complete and the DBE is recertified."
        }
      ]
    },
    {
      id: 'goal-setting',
      name: 'Goal Setting',
      icon: Target,
      color: 'red',
      faqs: [
        {
          question: "When must recipients develop a new overall DBE goal under the IFR?",
          answer: "Recipients must develop a new overall DBE goal under 49 CFR § 26.45 after the UCP in their jurisdiction completes the reevaluation process described in § 26.111. The new overall DBE goal should be based on the number of DBEs that remain certified after reevaluation."
        },
        {
          question: "Can recipients set DBE contract goals after October 3, 2025 but before the UCP completes its reevaluation process?",
          answer: "No. Recipients cannot set DBE contract goals until after the UCP in their jurisdiction completes the reevaluation process and the recipient has adopted a new overall DBE goal based on the number of DBEs that remain certified after reevaluation."
        },
        {
          question: "What happens to a recipient's current overall DBE goal?",
          answer: "A recipient's current overall DBE goal is no longer valid after October 3, 2025. Recipients must develop a new overall DBE goal under 49 CFR § 26.45 after the UCP completes its reevaluation process."
        },
        {
          question: "How should recipients handle project selection for DBE participation during the reevaluation period?",
          answer: "During the reevaluation period, recipients should continue race-neutral measures such as outreach, technical assistance, and supportive services programs. However, they cannot use race-conscious measures such as contract goals until after completing the reevaluation process and establishing a new overall DBE goal."
        }
      ]
    },
    {
      id: 'new-applications',
      name: 'New Applications',
      icon: FilePlus,
      color: 'blue',
      faqs: [
        {
          question: "Can UCPs continue to accept new DBE certification applications after October 3, 2025?",
          answer: "Yes. UCPs may continue to accept and process new DBE certification applications under the standards set forth in the IFR."
        },
        {
          question: "What standards apply to new DBE certification applications submitted on or after October 3, 2025?",
          answer: "New applications must meet all requirements of the IFR, including the individualized showing of social and economic disadvantage as detailed in the revised 49 CFR Part 26."
        },
        {
          question: "Do new applicants need to provide a narrative statement of disadvantage?",
          answer: "Yes. Under the IFR, all applicants must provide detailed information about specific incidents of social disadvantage and evidence of economic disadvantage. A comprehensive narrative statement is typically required to meet these standards."
        },
        {
          question: "How long does the new certification process take?",
          answer: "Processing times vary by UCP, but applicants should expect the process to take 90-120 days from submission of a complete application. The new individualized review requirements may extend processing times compared to the previous standards."
        }
      ]
    },
    {
      id: 'transportation-modes',
      name: 'Transportation Modes',
      icon: Truck,
      color: 'indigo',
      faqs: [
        {
          question: "Does the IFR apply to all DOT operating administrations?",
          answer: "Yes. The IFR applies to the DBE programs administered by the Federal Highway Administration (FHWA), Federal Transit Administration (FTA), and Federal Aviation Administration (FAA)."
        },
        {
          question: "Are there different requirements for different transportation modes?",
          answer: "While the core requirements of the IFR apply across all modes, there may be mode-specific implementation details. Recipients should consult with their respective DOT operating administration for mode-specific guidance."
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: BookOpen },
    ...faqCategories.map(cat => ({ id: cat.id, name: cat.name, icon: cat.icon }))
  ];

  // Filter FAQs based on selected category and search term
  const allFaqs = faqCategories.flatMap(category => 
    category.faqs.map(faq => ({
      ...faq,
      category: category.id,
      categoryName: category.name,
      categoryColor: category.color
    }))
  );

  const categoryFilteredFaqs = selectedCategory === 'all' 
    ? allFaqs 
    : allFaqs.filter(faq => faq.category === selectedCategory);

  const searchFilteredFaqs = searchTerm
    ? categoryFilteredFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categoryFilteredFaqs;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Navigation */}
      <Navigation />

      {/* Header - Enhanced with gradients */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={handleGoHome}
            className="mb-6 text-blue-200 hover:text-white font-semibold flex items-center gap-2 transition-all hover:gap-3 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-5 rounded-2xl shadow-xl shadow-blue-500/50">
              <HelpCircle size={48} />
            </div>
            <div>
              <div className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold mb-3">
                <Zap className="inline-block mr-1" size={14} />
                COMPREHENSIVE GUIDE
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-3">
                <span className="bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </span>
              </h1>
              <p className="text-xl text-blue-100">
                Everything you need to know about the 2025 DBE regulation changes
              </p>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="mt-8 max-w-3xl">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
                <Search className="absolute left-6 text-gray-400 group-hover:text-blue-600 transition-colors" size={24} />
                <input
                  type="text"
                  placeholder="Search all FAQs..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-16 pr-6 py-5 text-gray-900 text-lg focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Categories */}
      <div className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={18} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ List - Enhanced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {searchTerm && (
          <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border-l-4 border-blue-500">
            <p className="text-gray-700 text-lg">
              Found <span className="font-bold text-blue-600 text-2xl">{searchFilteredFaqs.length}</span> result{searchFilteredFaqs.length !== 1 ? 's' : ''} 
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        )}

        <div className="space-y-4">
          {searchFilteredFaqs.map((faq, idx) => {
            const category = faqCategories.find(cat => cat.id === faq.category);
            const faqId = `${faq.category}-${idx}`;
            
            return (
              <div key={faqId} className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all transform hover:-translate-y-1">
                <button
                  onClick={() => handleFaqClick(faq.question, faq.category, idx)}
                  className="w-full px-8 py-6 flex items-start justify-between hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${
                        category.color === 'purple' ? 'from-purple-500 to-purple-600' :
                        category.color === 'green' ? 'from-green-500 to-emerald-600' :
                        category.color === 'orange' ? 'from-orange-500 to-amber-600' :
                        category.color === 'red' ? 'from-red-500 to-rose-600' :
                        category.color === 'blue' ? 'from-blue-500 to-indigo-600' :
                        'from-indigo-500 to-purple-600'
                      } text-white shadow-lg`}>
                        {faq.categoryName}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 pr-4 leading-relaxed">{faq.question}</h3>
                  </div>
                  {expandedFaq === faqId ? (
                    <ChevronUp className="text-blue-600 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" size={28} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0 mt-1 group-hover:text-blue-600 group-hover:scale-110 transition-all" size={28} />
                  )}
                </button>
                {expandedFaq === faqId && (
                  <div className="px-8 pb-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-t border-blue-100">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line pt-4 text-lg">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA - Enhanced */}
        {searchFilteredFaqs.length > 0 && (
          <div className="mt-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 text-white text-center shadow-2xl">
              <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <HelpCircle size={48} />
              </div>
              <h3 className="text-4xl font-bold mb-6">Still Have Questions?</h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Can't find what you're looking for? Our tools can help you prepare your application with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleStartApp}
                  className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-5 px-10 rounded-xl text-lg transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
                >
                  <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
                  Start Your Narrative - $149
                </button>
                <button
                  onClick={handleGoHome}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-5 px-10 rounded-xl border-2 border-white/30 transition-all hover:scale-105 flex items-center justify-center gap-3 text-lg"
                >
                  <ArrowLeft size={20} />
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats Section - Enhanced */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105">
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">$149</div>
                <div className="text-blue-100 font-medium">One-Time Payment</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105">
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">30 min</div>
                <div className="text-blue-100 font-medium">Average Completion</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105">
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">4 Docs</div>
                <div className="text-blue-100 font-medium">Professional Package</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105">
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">100%</div>
                <div className="text-blue-100 font-medium">Editable & Customizable</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Enhanced */}
      <div className="bg-gradient-to-br from-slate-900 to-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                <Shield className="text-white" size={28} />
              </div>
              <span className="text-white font-bold text-xl">DBE Narrative Pro</span>
            </div>
            <p className="text-sm mb-8 max-w-2xl mx-auto leading-relaxed">
              Professional DBE certification narratives powered by AI. Compliant with 49 CFR Part 26 (Updated October 2025).
            </p>
            <div className="flex justify-center gap-8 text-sm mb-8">
              <button onClick={handleGoHome} className="hover:text-white transition-colors hover:scale-105 transform">
                Home
              </button>
              <span>•</span>
              <button onClick={() => navigate('/uca-form')} className="hover:text-white transition-colors hover:scale-105 transform">
                Free UCA Form
              </button>
              <span>•</span>
              <button onClick={() => navigate('/narrative')} className="hover:text-white transition-colors hover:scale-105 transform">
                Narrative Pro
              </button>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors hover:scale-105 transform">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors hover:scale-105 transform">Terms</a>
            </div>
            <div className="text-xs text-gray-500">
              <p>© 2025 DBE Narrative Pro. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;