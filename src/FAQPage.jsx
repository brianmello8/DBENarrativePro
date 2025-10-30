import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, ArrowLeft, Search, ChevronDown, ChevronUp, 
  Info, FileSignature, RefreshCw, Target, FilePlus, Truck,
  Scale, FileText, HelpCircle, Lock, BookOpen, CheckCircle, Sparkles, Zap,
  AlertTriangle, Clock, DollarSign, BadgeCheck
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
      gradient: 'from-purple-500 to-pink-600',
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
      gradient: 'from-green-500 to-emerald-600',
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
          answer: "Yes. The prompt payment requirements in 49 CFR § 26.29 continue to apply during the reevaluation period."
        }
      ]
    },
    {
      id: 'recertification',
      name: 'Recertification & Reevaluation',
      icon: RefreshCw,
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
      faqs: [
        {
          question: "Do currently certified DBEs need to recertify?",
          answer: "Under 49 CFR § 26.111, UCPs must reevaluate currently certified DBEs to determine whether they meet the eligibility standards established by the IFR. UCPs may complete the reevaluation process either through recertification or requalification, defined in 49 CFR § 26.83(k). The recertification or requalification (both constitute reevaluation for purposes of the rule) process should be substantially similar to an initial certification, with the same documentation requirements applicable to initial certification."
        },
        {
          question: "When do UCPs have to begin the reevaluation of currently certified DBEs?",
          answer: "UCPs must begin reevaluating firms as soon as practicable and complete the reevaluation process within two years of the IFR's effective date. Alternatively, a UCP may choose to begin the reevaluation process with initial certifications and determine eligibility on a rolling basis beginning with certifications that are set to expire soon. A rolling approach to the reevaluation process will necessarily take longer to complete the reevaluation of all DBEs."
        },
        {
          question: "Are currently certified DBEs allowed to remain certified while they are being reevaluated?",
          answer: "Firms certified before October 3, 2025, retain their certification during the reevaluation process provided that: they submit complete documentation by the deadline set by the UCP, they continue to meet the net worth requirements of 49 CFR § 26.67, the firm continues to be more than fifty percent owned and controlled by socially and economically disadvantaged individuals as defined in the IFR, and the firm is not subject to denial or removal of eligibility as described in 49 CFR § 26.87. Per 49 CFR § 26.111, after the UCP completes the reevaluation process, new certifications must be conducted in accordance with the IFR's new standards. If a UCP determines during the reevaluation process that a firm does not meet the eligibility standards of the IFR, that firm must be decertified."
        },
        {
          question: "Can the UCP waive any documentation requirements for currently certified DBEs?",
          answer: "No. The IFR did not change 49 CFR § 26.85, which lists all required documentation. UCPs may not waive any of the documentation requirements listed in that section."
        },
        {
          question: "What happens to my firm if I do not submit information to be reevaluated?",
          answer: "If a currently certified DBE fails to submit the information requested by the UCP within the deadline set by the UCP, that firm's certification expires. See 49 CFR § 26.111(b)(2)."
        },
        {
          question: "Can my firm remain DBE certified during the reevaluation process even though my UCP is taking a very long time to complete the reevaluation?",
          answer: "If you submitted complete information for recertification or requalification by the deadline set by your UCP, your firm may remain certified until the reevaluation process is complete, provided that you continue to meet the other requirements for remaining certified (e.g., net worth, more than fifty percent ownership and control by socially and economically disadvantaged individuals). After a UCP completes the reevaluation process, all new certifications are pursuant to the IFR, and no firm can remain certified under the previous rules. If the UCP determines during the reevaluation process that your firm does not meet the eligibility standards of the IFR, your firm must be decertified."
        }
      ]
    },
    {
      id: 'goal-setting',
      name: 'Goal Setting & Methodology',
      icon: Target,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-600',
      faqs: [
        {
          question: "When will DOT implement new DBE goals?",
          answer: "After the UCPs in a recipient's jurisdiction complete the reevaluation process and determine which firms are eligible under the IFR, the recipient must submit a new overall DBE goal to the relevant DOT operating administration (e.g., Federal Highway Administration, Federal Transit Administration, Federal Aviation Administration) in accordance with 49 CFR § 26.45."
        },
        {
          question: "How can a recipient set a goal if it does not yet know how many DBEs will be certified?",
          answer: "The DOT cannot answer at this time. The Departments anticipate issuing further guidance on overall goal-setting once there is a better understanding of how the composition of the DBE community changes through the reevaluation process."
        },
        {
          question: "Can a recipient zero out its overall goal during the reevaluation period?",
          answer: "Yes. In accordance with 49 CFR § 26.111, DOT DBE goals for all recipients and any DBE contract goals are zeroed out during the reevaluation of currently certified DBEs. Once the relevant UCP or UCPs in a recipient's jurisdiction complete the reevaluation, the recipient must set and submit a new overall goal to the Department in accordance with 49 CFR § 26.45."
        },
        {
          question: "Are DBE goal achievements still necessary during the reevaluation period?",
          answer: "No. Goal achievement reporting is not necessary or feasible during the reevaluation period. Recipients should continue to report DBE participation in accordance with 49 CFR § 26.11."
        },
        {
          question: "Are DBE race-conscious contract goals still permitted under the IFR?",
          answer: "No. The IFR eliminated the use of race-conscious measures, including race-conscious contract goals. Per 49 CFR § 26.111, overall goals and contract goals are zeroed out during the reevaluation period. Once a recipient's UCP or UCPs complete the reevaluation process, the recipient must set a new overall goal in accordance with the race-neutral methodology established by 49 CFR § 26.45 as revised by the IFR."
        }
      ]
    },
    {
      id: 'disadvantage-status',
      name: 'Disadvantage Status & Documentation',
      icon: FilePlus,
      color: 'red',
      gradient: 'from-red-500 to-pink-600',
      faqs: [
        {
          question: "What does 'disadvantaged status' mean now under the IFR?",
          answer: "Under 49 CFR § 26.63 as revised by the IFR, all individuals must establish both social and economic disadvantage through documented evidence showing the individual is disadvantaged when compared to similarly situated individuals who are not socially and economically disadvantaged. This is a highly fact-specific determination that considers an individual's entire life history. UCPs must receive and evaluate each application on a case-by-case basis consistent with the documentation requirements in 49 CFR § 26.85."
        },
        {
          question: "Can individuals still apply as socially disadvantaged if they previously qualified based on a rebuttable presumption?",
          answer: "Yes. Although the IFR eliminated rebuttable presumptions based on membership in designated groups, all individuals may apply and be certified as socially and economically disadvantaged if they meet the revised standards in 49 CFR § 26.63 and 26.67."
        },
        {
          question: "How detailed must the personal narrative be?",
          answer: "The personal narrative must be highly detailed, covering your entire life history. It should document specific incidents of discrimination and barriers you faced, explain how these incidents constitute disadvantage relative to others not socially and economically disadvantaged, and demonstrate measurable economic harm. The narrative typically runs 4-6 pages and requires supporting documentation."
        },
        {
          question: "What type of supporting documentation is required?",
          answer: "You must provide documentation that corroborates your narrative, such as: denial letters from banks or lenders, correspondence showing discriminatory treatment, business records showing economic impact, educational records, employment records, sworn affidavits from witnesses, and any other evidence supporting your claimed disadvantages."
        },
        {
          question: "Can I mention my race, gender, or ethnicity in my narrative?",
          answer: "The regulations do not explicitly prohibit mentioning protected characteristics, but they cannot form the basis of your disadvantage claim. Your narrative must focus on specific acts of discrimination and barriers you faced, explained in terms of social and economic impacts rather than group membership. Many experts recommend describing the discriminatory acts and their effects without explicitly stating protected characteristics."
        }
      ]
    },
    {
      id: 'dbe-participation',
      name: 'DBE Participation & Counting',
      icon: Truck,
      color: 'teal',
      gradient: 'from-teal-500 to-cyan-600',
      faqs: [
        {
          question: "Can DBEs still be counted on DOT-assisted contracts during the reevaluation period?",
          answer: "Once a UCP begins the reevaluation process, the counting of DBE participation must cease until the UCP completes the reevaluation process. See 49 CFR § 26.111(f). When a UCP completes the reevaluation process, the counting of DBE participation will resume, subject to overall goals as set by recipients pursuant to 49 CFR § 26.45 as revised by the IFR."
        },
        {
          question: "Can DBEs continue performing work during the reevaluation period even though they're not being counted?",
          answer: "Yes. DBEs can continue performing work on existing and new contracts. However, their participation cannot be counted toward contract goals or overall goals until the UCP completes the reevaluation process and the firm is recertified under the new standards."
        },
        {
          question: "What if a DBE is decertified during reevaluation but is currently working on a contract?",
          answer: "A firm that loses DBE certification during reevaluation may continue to perform work on existing contracts, but that work can no longer be counted toward DBE goals. Prime contractors should be aware that decertification constitutes good cause for termination under 49 CFR § 26.53(f)(3)(iii)."
        }
      ]
    },
    {
      id: 'legal-compliance',
      name: 'Legal & Compliance',
      icon: Scale,
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-600',
      faqs: [
        {
          question: "Why did DOT make these changes to the DBE program?",
          answer: "The changes were made in response to constitutional concerns raised by the Supreme Court's decision in Students for Fair Admissions, Inc. v. President and Fellows of Harvard College (SFFA). The IFR aims to ensure the DBE program operates in a constitutionally compliant manner while still addressing the effects of discrimination in DOT-assisted contracting."
        },
        {
          question: "Are there any pending legal challenges to the IFR?",
          answer: "Legal challenges may exist or arise. However, the IFR represents DOT's current regulatory framework and is in effect. Firms should comply with the IFR's requirements while monitoring for any legal developments through their UCPs and industry associations."
        },
        {
          question: "What if my state or local government has conflicting requirements?",
          answer: "Federal requirements under 49 CFR Part 26 supersede conflicting state or local requirements for DOT-assisted contracts. However, some state or local programs may have additional requirements that don't conflict with federal law. Consult with your UCP and legal counsel about specific situations."
        }
      ]
    }
  ];

  // Filter FAQs based on search and category
  const getFilteredFaqs = () => {
    if (selectedCategory === 'all') {
      if (!searchTerm) return faqCategories;
      
      return faqCategories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.faqs.length > 0);
    }
    
    const category = faqCategories.find(cat => cat.id === selectedCategory);
    if (!category) return [];
    
    if (!searchTerm) return [category];
    
    const filteredCategory = {
      ...category,
      faqs: category.faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    };
    
    return filteredCategory.faqs.length > 0 ? [filteredCategory] : [];
  };

  const filteredCategories = getFilteredFaqs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-blue-400/30 shadow-2xl">
                <span className="flex items-center gap-2 text-blue-200 font-semibold">
                  <BookOpen size={20} />
                  Comprehensive FAQ Resource
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about the October 2025 DBE Interim Final Rule changes
            </p>

            {/* Search Bar - Enhanced */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-lg text-white placeholder-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:border-blue-400 transition-all text-lg shadow-2xl"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">7</div>
                <div className="text-sm text-blue-200">Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-blue-200">Questions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">2025</div>
                <div className="text-sm text-blue-200">Updated Rules</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-blue-200">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter - Enhanced */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`group relative overflow-hidden rounded-2xl p-6 text-center transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-2xl scale-105'
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200'
              }`}
            >
              <div className="relative z-10">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                  selectedCategory === 'all' 
                    ? 'bg-white/20' 
                    : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                }`}>
                  <FileText className={selectedCategory === 'all' ? 'text-white' : 'text-white'} size={24} />
                </div>
                <div className="font-bold text-sm">All Questions</div>
              </div>
            </button>

            {faqCategories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`group relative overflow-hidden rounded-2xl p-6 text-center transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl ${
                    isSelected
                      ? `bg-gradient-to-br ${category.gradient} text-white shadow-2xl scale-105`
                      : 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200'
                  }`}
                >
                  <div className="relative z-10">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                      isSelected 
                        ? 'bg-white/20' 
                        : `bg-gradient-to-br ${category.gradient}`
                    }`}>
                      <Icon className={isSelected ? 'text-white' : 'text-white'} size={24} />
                    </div>
                    <div className="font-bold text-sm leading-tight">{category.name}</div>
                    <div className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                      {category.faqs.length} questions
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Sections */}
        {filteredCategories.length > 0 ? (
          <div className="space-y-12">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              
              return (
                <div key={category.id} className="animate-fade-in">
                  {/* Category Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`bg-gradient-to-br ${category.gradient} p-4 rounded-2xl shadow-xl`}>
                        <Icon className="text-white" size={32} />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">{category.name}</h2>
                        <p className="text-gray-600">{category.faqs.length} questions in this category</p>
                      </div>
                    </div>
                  </div>

                  {/* FAQ Items */}
                  <div className="space-y-4">
                    {category.faqs.map((faq, idx) => {
                      const faqId = `${category.id}-${idx}`;
                      const isExpanded = expandedFaq === faqId;
                      
                      return (
                        <div
                          key={idx}
                          className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden transition-all hover:shadow-2xl hover:border-blue-200"
                        >
                          <button
                            onClick={() => handleFaqClick(faq.question, category.id, idx)}
                            className="w-full px-8 py-6 flex items-start justify-between text-left hover:bg-gray-50 transition-colors group"
                          >
                            <div className="flex items-start gap-4 flex-1">
                              <div className={`bg-gradient-to-br ${category.gradient} p-2 rounded-lg mt-1 shadow-lg`}>
                                <HelpCircle className="text-white" size={20} />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                                  {faq.question}
                                </h3>
                              </div>
                            </div>
                            <div className={`ml-4 flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                              <ChevronDown className="text-gray-400 group-hover:text-blue-600" size={24} />
                            </div>
                          </button>
                          
                          {isExpanded && (
                            <div className="px-8 pb-6 pt-2 bg-gradient-to-br from-gray-50 to-blue-50/30 border-t-2 border-gray-100 animate-fade-in">
                              <div className="flex items-start gap-4">
                                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-xl p-12 border-2 border-gray-100 max-w-2xl mx-auto">
              <Search className="mx-auto mb-4 text-gray-400" size={64} />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any questions matching your search. Try different keywords or browse all categories.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                Reset Search
              </button>
            </div>
          </div>
        )}

        {/* CTA Section - Enhanced */}
        {filteredCategories.length > 0 && (
          <div className="mt-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            
            <div className="relative p-12 text-white text-center">
              <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Sparkles size={48} className="text-white" />
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">Ready to Get Started?</h3>
              
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Don't let the new requirements overwhelm you. Our AI-powered tool makes creating your DBE narrative simple and stress-free.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={handleStartApp}
                  className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-5 px-10 rounded-xl text-lg transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center gap-3"
                >
                  <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
                  Start Your Narrative - $149
                </button>
                
                <button
                  onClick={handleGoHome}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-5 px-10 rounded-xl border-2 border-white/30 transition-all hover:scale-105 shadow-xl flex items-center gap-3 text-lg"
                >
                  <ArrowLeft size={20} />
                  Back to Home
                </button>
              </div>

              {/* Value Props */}
              <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Clock className="mx-auto mb-3 text-white" size={32} />
                  <div className="font-bold text-white mb-1">30-45 Minutes</div>
                  <div className="text-sm text-blue-100">Quick & Easy Process</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <DollarSign className="mx-auto mb-3 text-white" size={32} />
                  <div className="font-bold text-white mb-1">$149 One-Time</div>
                  <div className="text-sm text-blue-100">vs $1,500+ Consultants</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <BadgeCheck className="mx-auto mb-3 text-white" size={32} />
                  <div className="font-bold text-white mb-1">2025 Compliant</div>
                  <div className="text-sm text-blue-100">Latest IFR Requirements</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats Section */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105 border border-white/20">
                <DollarSign className="mx-auto mb-4 text-white" size={40} />
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">$149</div>
                <div className="text-blue-100 font-medium">One-Time Payment</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105 border border-white/20">
                <Clock className="mx-auto mb-4 text-white" size={40} />
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">30-45</div>
                <div className="text-blue-100 font-medium">Minutes to Complete</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105 border border-white/20">
                <FileText className="mx-auto mb-4 text-white" size={40} />
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">4 Docs</div>
                <div className="text-blue-100 font-medium">Professional Package</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105 border border-white/20">
                <Zap className="mx-auto mb-4 text-white" size={40} />
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">AI</div>
                <div className="text-blue-100 font-medium">Powered Generation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-br from-slate-900 to-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-xl">
                <Shield className="text-white" size={28} />
              </div>
              <span className="text-white font-bold text-xl">DBE Narrative Pro</span>
            </div>
            
            <p className="text-sm mb-8 max-w-2xl mx-auto leading-relaxed">
              Professional DBE certification narratives powered by AI. Helping firms maintain certification under the October 2025 requirements.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm mb-8">
              <button onClick={handleGoHome} className="hover:text-white transition-colors hover:scale-105 transform">
                Home
              </button>
              <span>•</span>
              <button onClick={() => navigate('/narrative')} className="hover:text-white transition-colors hover:scale-105 transform">
                Narrative Pro ($149)
              </button>
              <span>•</span>
              <button onClick={() => navigate('/faq')} className="hover:text-white transition-colors hover:scale-105 transform">
                FAQ
              </button>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors hover:scale-105 transform">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors hover:scale-105 transform">Terms</a>
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>© 2025 DBE Narrative Pro. All rights reserved.</p>
              <p className="mt-2">Compliant with 49 CFR Part 26 (Updated October 2025)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FAQPage;