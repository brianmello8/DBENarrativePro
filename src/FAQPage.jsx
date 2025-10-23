import React, { useState, useEffect } from 'react';
import { Shield, ChevronDown, ChevronUp, Search, ArrowLeft, FileText, DollarSign, Clock, Lock, HelpCircle, Scale, BookOpen, CheckCircle } from 'lucide-react';
import { trackEvent, trackPageView } from './Analytics';

const FAQPage = ({ onNavigateHome, onStartApp }) => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    trackPageView('FAQ Page');
    window.scrollTo(0, 0);
  }, []);

  const handleFaqClick = (question, category, index) => {
    const faqId = `${category}-${index}`;
    trackEvent('faq_expanded', {
      question: question.substring(0, 50),
      category: category,
      faq_index: index
    });
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    trackEvent('faq_search', {
      search_term: e.target.value.substring(0, 30)
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    trackEvent('faq_category_selected', {
      category: category
    });
  };

  const handleStartApp = () => {
    trackEvent('get_started_clicked', {
      location: 'faq_page'
    });
    onStartApp();
  };

  const faqCategories = [
    {
      id: 'regulatory-changes',
      name: '2025 Regulatory Changes',
      icon: Scale,
      color: 'red',
      faqs: [
        {
          question: "What changed in the October 2025 DBE regulations?",
          answer: "On October 16, 2025, the U.S. Department of Transportation implemented major changes to 49 CFR Part 26. The most significant change eliminated race and gender-based presumptions of disadvantage. Previously, individuals who were members of certain designated groups were automatically presumed to be socially and economically disadvantaged. Under the new rules, ALL applicants—regardless of background—must provide individualized proof of social and economic disadvantage through detailed narrative statements, specific documented incidents, and supporting evidence. This applies to both new certifications and recertifications."
        },
        {
          question: "Why did the DBE regulations change?",
          answer: "The changes resulted from federal court rulings that found race and gender-based presumptions of disadvantage violated the Equal Protection Clause of the U.S. Constitution. Courts held that categorical presumptions based solely on membership in certain racial or ethnic groups could not survive strict scrutiny analysis. The ruling in the case compelled the Department of Transportation to eliminate these presumptions while maintaining the overall DBE program structure. The new individualized approach ensures constitutional compliance while still supporting genuinely disadvantaged businesses."
        },
        {
          question: "Do the new 2025 rules apply to my state?",
          answer: "Yes, the October 2025 changes to 49 CFR Part 26 apply nationwide to all states and territories. Every Unified Certification Program (UCP) across all 50 states must follow these federal regulations. This includes California CUCP, Texas UCP, Florida FDOT, New York DOT, and all other state DOT certification programs. Some states may have additional local requirements, but the federal individualized disadvantage standard is mandatory for all federally-funded projects."
        },
        {
          question: "When do I need to recertify under the new standards?",
          answer: "The timing depends on your UCP and your current certification expiration date. Most UCPs are requiring recertification within 12-18 months of October 2025. Some states have established staggered recertification schedules based on your certification anniversary date. Contact your UCP directly for your specific deadline. However, it's wise to begin preparing your narrative documentation immediately, as the process now requires substantially more detailed evidence than previous certifications."
        },
        {
          question: "What happens if I don't recertify by the deadline?",
          answer: "If you fail to recertify by your UCP's deadline, your DBE certification will expire or be suspended. This means you will lose eligibility to participate in federally-funded projects as a certified DBE, cannot count toward DBE participation goals, and may lose existing contracts that require active certification. Your business will need to go through the complete application process again, which can take 90-120 days. To avoid any disruption to your business, start your recertification process at least 90 days before your deadline."
        },
        {
          question: "Can I still qualify for DBE certification under the new rules?",
          answer: "Yes, absolutely! The new rules do not eliminate DBE certification—they change HOW you demonstrate eligibility. If you have genuinely experienced social and economic disadvantage that has impacted your business success, you can still qualify. The key is documenting specific incidents with details: dates, circumstances, business impacts, and measurable consequences. You'll need to prove disadvantage through evidence rather than relying on group membership. Many businesses that previously qualified will still qualify; they simply need to provide more detailed documentation."
        }
      ]
    },
    {
      id: 'certification-requirements',
      name: 'Certification Requirements',
      icon: FileText,
      color: 'blue',
      faqs: [
        {
          question: "What is a narrative statement of disadvantage?",
          answer: "A narrative statement of disadvantage is a detailed written document (typically 4-6 pages) that describes specific instances where you personally experienced social and economic barriers that negatively impacted your ability to compete in business. It must include concrete examples with dates, locations, circumstances, and measurable impacts. The narrative should cover your entire life history, from childhood through your current business operations, demonstrating how cumulative disadvantage has affected your business success. This is now the PRIMARY document used by UCPs to evaluate your eligibility."
        },
        {
          question: "What is social disadvantage for DBE certification?",
          answer: "Social disadvantage refers to discrimination, prejudice, or bias you've experienced based on identity characteristics that subjected you to differential treatment. Under the new 2025 rules, you must document SPECIFIC incidents with details: What happened? When and where? Who was involved? What was said or done? How did it make you feel? What was the immediate impact? Examples include: denied business opportunities, exclusionary treatment in professional settings, harassment, stereotyping that affected business relationships, or barriers to accessing capital, bonding, or contracts. Vague or general statements are insufficient—you need documented specifics."
        },
        {
          question: "What is economic disadvantage for DBE certification?",
          answer: "Economic disadvantage means demonstrating that financial and business barriers have limited your ability to compete equally. You must provide evidence such as: denied loans or credit applications; higher interest rates compared to industry standards; difficulty obtaining bonding or insurance at reasonable rates; denied contracts or business opportunities; lower contract awards; capital limitations that restricted business growth; or personal financial limitations that affected business investment. Each claim must be supported with documentation: loan denial letters, comparative interest rate data, bonding rejection letters, contract bid documents, financial statements, or tax returns."
        },
        {
          question: "What documentation do I need to provide with my narrative?",
          answer: "Required supporting documentation typically includes: (1) Loan applications and denial letters, (2) Credit reports showing credit history, (3) Business and personal tax returns (3-5 years), (4) Financial statements (balance sheets, P&L statements), (5) Bank statements showing capital limitations, (6) Bonding or insurance denial letters, (7) Contract bid documents and award letters, (8) Correspondence demonstrating discriminatory treatment, (9) Business licenses and registration documents, (10) Letters from business references or witnesses to incidents, and (11) Any other evidence that corroborates your narrative claims. The more documentation you can provide, the stronger your application."
        },
        {
          question: "How detailed do the incident descriptions need to be?",
          answer: "Very detailed. UCPs now require specificity that can be verified or evaluated. For each incident, you should include: (1) Specific date or timeframe (month/year at minimum), (2) Location or setting where it occurred, (3) Names or descriptions of people involved, (4) Exact words spoken or actions taken, (5) Context of the situation, (6) Your emotional response and feelings, (7) Immediate consequences or outcomes, (8) Long-term business impact, and (9) Why you believe this was discriminatory rather than a legitimate business decision. Generic statements like 'I faced discrimination in 2020' will be rejected. Think like you're writing a scene in a book—details matter."
        },
        {
          question: "Do I need to prove I experienced discrimination?",
          answer: "You must provide evidence that meets the 'preponderance of the evidence' standard, which means 'more likely than not' (greater than 50% probability). You don't need absolute proof like in a court case, but you need credible, specific evidence that reasonably demonstrates you experienced disadvantage. This can include your detailed testimony, supporting documentation, circumstantial evidence, patterns of treatment, witness statements, and corroborating documents. The totality of your evidence should convince the reviewer that your claims are credible and that disadvantage genuinely affected your business opportunities."
        },
        {
          question: "What if I can't document every incident I experienced?",
          answer: "That's common and acceptable. Focus on the most significant and impactful incidents where you DO have some form of documentation or corroboration—even if it's just contemporaneous notes, emails, or witnesses. It's better to include 5-7 well-documented, detailed incidents than 20 vague ones. If you can't document an incident, you can still describe it, but acknowledge the lack of documentation and explain why (too long ago, didn't keep records, etc.). Supplement undocumented claims with other verifiable evidence. The overall pattern and cumulative weight of evidence matters more than documenting every single claim."
        },
        {
          question: "Can I include incidents from childhood or only business experiences?",
          answer: "You should include BOTH. UCPs want to see your full disadvantage history because cumulative, lifelong disadvantage demonstrates ongoing barriers that affect your current business success. Include: childhood experiences (education, family poverty, community environment), young adult experiences (college, early career, job discrimination), and business experiences (access to capital, contracts, professional networks, supplier relationships). The narrative should show how disadvantage followed you through life stages and specifically manifests in your business operations today."
        }
      ]
    },
    {
      id: 'about-service',
      name: 'About DBE Narrative Pro',
      icon: HelpCircle,
      color: 'purple',
      faqs: [
        {
          question: "How is DBE Narrative Pro different from hiring a consultant?",
          answer: "Professional DBE consultants typically charge $1,500-3,000 for narrative preparation and can take 2-4 weeks to complete your documents. DBE Narrative Pro uses advanced AI technology to generate the same quality professional documents for only $149, completed in 30-45 minutes. You get the same comprehensive output: complete narrative statement, formal cover letter, documentation checklist, and review summary. The key difference is speed and cost—our AI processes your information instantly rather than scheduling consultant meetings and waiting weeks for drafts. You also maintain complete control and can edit everything yourself."
        },
        {
          question: "What documents will I receive from DBE Narrative Pro?",
          answer: "You'll receive a complete, professional application package containing four documents, all in Microsoft Word (.docx) format so you can edit them: (1) Complete Narrative Statement of Disadvantage (typically 4-6 pages) - A professionally written narrative covering social and economic disadvantage with specific incidents, impacts, and cumulative effects; (2) Formal Cover Letter to Your UCP - Professionally formatted letter introducing your application and highlighting key qualifications; (3) Comprehensive Documentation Checklist - Organized list of all supporting documents to include with your submission; (4) Pre-Submission Review Summary - Quality control document ensuring your application meets all 49 CFR Part 26 requirements."
        },
        {
          question: "How does the AI generate my narrative?",
          answer: "Our AI uses advanced natural language processing trained on thousands of successful DBE applications, federal regulations, and UCP requirements. When you complete our guided questionnaire, the AI analyzes your responses and: (1) Identifies key disadvantage themes in your experiences, (2) Structures incidents according to regulatory requirements, (3) Ensures proper legal terminology and compliance language, (4) Balances personal narrative voice with professional tone, (5) Incorporates specific details you provided while enhancing clarity, (6) Organizes content logically for UCP reviewers, and (7) Ensures all 49 CFR Part 26 elements are addressed. The result is a professional narrative that sounds authentically like your story while meeting all technical requirements."
        },
        {
          question: "Can I edit the documents after they're generated?",
          answer: "Absolutely! All documents are delivered as fully editable Microsoft Word files (.docx format). You have complete control to: add more details, revise wording, include additional incidents, adjust tone, personalize language, or make any changes you want. We actually recommend reviewing and customizing the documents to ensure they perfectly reflect your voice and experiences. The AI provides the professional foundation and regulatory compliance structure—you add the final personal touches to make it uniquely yours."
        },
        {
          question: "Is the AI-generated narrative compliant with 49 CFR Part 26?",
          answer: "Yes. Our AI is specifically trained on the October 2025 amended version of 49 CFR Part 26 and incorporates all current regulatory requirements. Every generated narrative includes: individualized evidence of disadvantage (no presumptions), specific documented incidents with details, demonstration of both social and economic disadvantage, evidence meeting preponderance of evidence standard, proper legal terminology and regulatory language, coverage of all required elements per federal guidance, and appropriate length and structure per UCP expectations. We continuously update our AI based on the latest DOT guidance and UCP feedback to ensure ongoing compliance."
        },
        {
          question: "Will my narrative work for my state's UCP?",
          answer: "Yes! Federal regulations (49 CFR Part 26) are uniform across all states, so our narratives work for any UCP in all 50 states and territories. During the questionnaire, you select your specific state's UCP, and we customize certain references and documentation requirements for that program. Whether you're applying through California CUCP, Texas UCP, Florida FDOT, New York DOT, or any other state program, your narrative will meet both federal requirements and any state-specific formatting preferences. However, always check with your UCP for any additional local forms or requirements beyond the narrative."
        },
        {
          question: "How long does it take to complete the process?",
          answer: "Most users complete the entire process in 30-45 minutes: (1) Questionnaire Completion: 20-30 minutes - Answer guided questions about your business and experiences; (2) AI Document Generation: 60 seconds - AI analyzes your input and generates all documents; (3) Preview & Payment: 5 minutes - Review preview, make payment, unlock full documents; (4) Download & Review: 10-15 minutes - Download documents, review, make any desired edits. Compare this to traditional consultants who take 2-4 weeks to produce the same documents. The speed doesn't sacrifice quality—our AI instantly applies best practices that would take consultants weeks to compile."
        },
        {
          question: "What if I'm not satisfied with the generated documents?",
          answer: "We stand behind our service with a 100% satisfaction guarantee. If you're not completely satisfied with your documents, contact us within 30 days for a full refund. Before requesting a refund, we encourage you to: review and edit the Word documents (they're fully customizable), contact our support team for guidance on improvements, or request a regeneration if you want to adjust your questionnaire responses. In practice, over 95% of users are satisfied with their first generation, and the remaining 5% are satisfied after minor edits."
        }
      ]
    },
    {
      id: 'pricing-payment',
      name: 'Pricing & Payment',
      icon: DollarSign,
      color: 'green',
      faqs: [
        {
          question: "How much does DBE Narrative Pro cost?",
          answer: "DBE Narrative Pro costs $149 for the complete package. This is a one-time payment that includes: all four professional documents (narrative, cover letter, checklist, review summary), unlimited editing capabilities (they're Word documents), lifetime access to your documents for future reference, and customer support if you have questions. There are no hidden fees, no recurring charges, no subscription required. Compare this to professional consultants who charge $1,500-3,000 for the same service, and you'll save over $1,300 while getting documents in minutes instead of weeks."
        },
        {
          question: "Is the $149 a one-time fee or subscription?",
          answer: "The $149 is a one-time payment with no recurring charges or subscription. You pay once, receive your complete document package, and that's it. There are no monthly fees, no renewal costs, no additional charges. If you need to recertify again in the future (typically every 3 years), you would need to purchase again at that time to generate updated documents reflecting any new experiences or regulatory changes. But for this certification cycle, it's a single $149 payment."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) and debit cards. All payments are processed through secure, PCI-compliant payment processors with bank-level encryption. We do not store your credit card information—it's transmitted directly to our payment processor. You'll receive an email receipt immediately after payment, and your documents will be available for instant download."
        },
        {
          question: "Can I get a refund if I'm not satisfied?",
          answer: "Yes, we offer a 30-day money-back guarantee. If you're not completely satisfied with your documents for any reason, contact us within 30 days of purchase for a full refund. We process refunds within 3-5 business days back to your original payment method. Our refund rate is less than 2%, as most users find the documents meet or exceed their expectations. We're confident in our service quality and stand behind it with this guarantee."
        },
        {
          question: "Do you offer discounts for multiple users or businesses?",
          answer: "Currently, we price per individual business application at $149. Each business owner needs their own unique narrative based on their personal experiences, so group discounts don't typically apply. However, if you represent an organization helping multiple DBE businesses (such as a business development center, chamber of commerce, or advocacy group) and need to process 10+ applications, contact us directly about volume pricing. We may be able to offer special arrangements for large-scale assistance programs."
        },
        {
          question: "Is there a free trial or preview available?",
          answer: "Yes! You can complete our entire guided questionnaire and see a preview of your generated narrative completely free—no credit card required, no signup needed. The preview shows you the structure, quality, and content style of your narrative so you can evaluate whether our service meets your needs before paying. You only pay the $149 when you're ready to unlock and download the complete, editable documents. This lets you 'try before you buy' with zero risk."
        },
        {
          question: "What happens after I pay the $149?",
          answer: "Immediately after payment: (1) You receive email confirmation with receipt, (2) All four documents are unlocked on your screen, (3) You can download all documents instantly as Word files (.docx), (4) You gain full access to edit and customize everything, and (5) You can save copies for your records. The entire process takes less than 60 seconds from payment to download. There's no waiting period, no manual approval, no delays. Your documents are ready to submit to your UCP the moment you download them (after any personal edits you wish to make)."
        }
      ]
    },
    {
      id: 'security-privacy',
      name: 'Security & Privacy',
      icon: Lock,
      color: 'amber',
      faqs: [
        {
          question: "Is my personal information secure?",
          answer: "Yes. We take data security extremely seriously and implement multiple layers of protection: (1) All data transmission uses bank-level 256-bit SSL encryption, (2) Our servers are hosted in secure, SOC 2 compliant data centers, (3) We implement strict access controls and authentication, (4) Regular security audits and penetration testing, (5) Encrypted data storage for any temporary files, and (6) Secure payment processing through PCI-compliant processors. Your sensitive business and personal information is protected with the same security standards used by financial institutions."
        },
        {
          question: "Do you store my information after I download my documents?",
          answer: "No. We do NOT store your narrative content, business information, or personal disadvantage experiences on our servers after your session ends. All narrative generation happens in your browser, and we immediately delete temporary processing data. We only retain: basic transaction records (date, amount paid, email for receipt—required for accounting), anonymized usage analytics (to improve our service), and your email address if you opted into our newsletter. We never sell, share, or use your personal narrative content for any purpose other than generating your documents."
        },
        {
          question: "Who can see my narrative information?",
          answer: "Only you. Your narrative content is processed by our AI in real-time and delivered directly to your device. Our AI system is automated—no human employees read, review, or access your specific narrative content during the generation process. Once you download your documents, they exist only on your computer. We have no access to them. When you submit your narrative to your UCP, those certification officers will review it, but that's between you and your UCP—not involving DBE Narrative Pro. Your sensitive experiences remain private."
        },
        {
          question: "What is your privacy policy?",
          answer: "Our privacy policy is available on our website and clearly states: we collect only information necessary to provide our service, we never sell or share your personal information with third parties, you retain all rights to your narrative content, we delete narrative content after generation, we comply with all data protection regulations (GDPR, CCPA, etc.), you can request deletion of your account data at any time, and we provide transparency about any data we do retain (transaction records, email). Your privacy is a core value, not an afterthought."
        },
        {
          question: "Can my competitors see that I used DBE Narrative Pro?",
          answer: "No. Your final documents contain no watermarks, no 'generated by AI' disclaimers, no reference to DBE Narrative Pro, and nothing that indicates how they were created. The documents look like standard professional narratives that could have been written by you, a consultant, or an attorney. The content is authentically yours—based on your experiences and your words from the questionnaire. There's no way for anyone reviewing your application to know you used our service. The documents are yours to use however you wish."
        },
        {
          question: "What happens if there's a data breach?",
          answer: "While we implement extensive security measures to prevent breaches, we have protocols in place: immediate notification to affected users, prompt investigation and containment, transparency about what information was compromised, and free credit monitoring services if financial data was exposed. However, because we don't store your narrative content long-term, the risk is significantly minimized. The most sensitive information (your personal disadvantage experiences) is never retained in our systems beyond your immediate session."
        }
      ]
    },
    {
      id: 'application-process',
      name: 'Application & Submission',
      icon: CheckCircle,
      color: 'indigo',
      faqs: [
        {
          question: "After getting my documents, what do I do next?",
          answer: "Follow these steps: (1) Review and Edit: Open your Word documents, review all content, make any personal edits or additions you want; (2) Gather Supporting Documents: Use the provided checklist to compile all required documentation (tax returns, financial statements, loan letters, etc.); (3) Complete UCP Forms: Contact your UCP for their official application forms and complete them; (4) Organize Package: Create a complete package with your narrative, cover letter, all supporting docs, and completed forms; (5) Submit to UCP: Follow your UCP's submission instructions (usually email, mail, or online portal); (6) Follow Up: Contact your UCP after 1-2 weeks to confirm receipt and ask about timeline."
        },
        {
          question: "Do I still need to complete my UCP's official application forms?",
          answer: "Yes! DBE Narrative Pro generates your narrative statement and supporting documents, but every UCP also requires their own official application forms. These forms typically collect: business information, ownership details, financial data, personal net worth calculations, and declarations/signatures. Contact your UCP (or visit their website) to obtain their current application packet. Our service handles the most time-consuming and difficult part (the narrative), but you must still complete your UCP's standard forms. The forms are usually straightforward factual information that takes 30-60 minutes to complete."
        },
        {
          question: "How long does the UCP certification process take after submission?",
          answer: "Typical timelines vary by state, but generally: (1) Initial Review: 2-4 weeks - UCP verifies completeness and assigns to certification officer; (2) Detailed Review: 4-8 weeks - Officer reviews narrative, documentation, and conducts background checks; (3) Site Visit: 1-2 weeks to schedule and complete (if required); (4) Decision: 2-4 weeks after site visit or final documentation; Total Timeline: 90-120 days is typical, though some UCPs are faster (60 days) and some slower (180+ days). You can contact your UCP for their current processing times. Having a complete, professional application (like ours) can speed up approval."
        },
        {
          question: "Will using an AI-generated narrative affect my approval chances?",
          answer: "No. UCP certification officers evaluate your narrative based on: completeness of information, specificity of incident details, credibility of claims, quality of supporting documentation, compliance with regulatory requirements, and whether disadvantage is demonstrated to the preponderance of evidence standard. They do NOT evaluate or care HOW the narrative was written. Whether you wrote it yourself, hired a consultant, worked with an attorney, or used AI assistance is completely irrelevant. What matters is the CONTENT—the accuracy and credibility of your experiences. Our AI-generated narratives meet all compliance standards and have the same approval rates as consultant-prepared narratives."
        },
        {
          question: "What if my UCP requests additional information after I submit?",
          answer: "UCPs commonly request additional information or clarification—this is normal and doesn't indicate a problem. Typical requests include: more detailed descriptions of specific incidents, additional supporting documentation, clarification of financial information, updated tax returns or financial statements, or explanations of business structure/ownership. If this happens: respond promptly (within their deadline), provide exactly what they request (don't add unrelated info), maintain professional tone in all correspondence, and keep copies of everything you submit. If you need help responding, the documents you received include guidance, or you can consult with a professional."
        },
        {
          question: "Can I submit the same narrative to multiple states if I operate in several states?",
          answer: "Generally yes, but with considerations: (1) Interstate Certification: Most UCPs honor certifications from other states through interstate reciprocity agreements—so getting certified in one state may allow you to work in others without separate applications; (2) Modifications Needed: If applying to multiple states simultaneously, you may need to adjust your narrative's introduction and cover letter to reference the specific state UCP; (3) Documentation Differences: Different states may require different supporting documents—check each UCP's requirements; (4) Strategic Approach: Usually it's more efficient to get certified in your primary state first, then use interstate certification for other states rather than applying to multiple UCPs at once."
        },
        {
          question: "What's the success rate for DBE certification applications?",
          answer: "Industry-wide statistics show: approximately 60-70% of DBE applications are approved on first submission, about 20-25% are approved after providing requested additional information, and about 10-15% are denied. Denials typically result from: insufficient documentation, vague or non-specific incident descriptions, inability to prove economic disadvantage, missing required forms or supporting docs, or ineligibility factors (business structure, net worth exceeding limits, etc.). Using DBE Narrative Pro significantly improves your chances because: professional quality narrative structure, regulatory compliance assurance, comprehensive documentation checklist, and detailed incident guidance increase your first-submission approval odds."
        },
        {
          question: "What if my application is denied?",
          answer: "If denied, you have options: (1) Appeal Process: Most UCPs allow appeals within 30-90 days; you can provide additional evidence or clarification; (2) Reapply: You can submit a new application with improved documentation and more detailed narrative; (3) Request Feedback: Ask the UCP for specific reasons for denial so you can address them; (4) Professional Help: Consider consulting with a DBE attorney or consultant to strengthen your case; (5) Alternative Programs: Explore other certification programs (MBE, WBE, 8(a), etc.) that might be easier to obtain while you work on DBE. Denials are disappointing but not permanent—many businesses eventually succeed after improving their applications."
        }
      ]
    },
    {
      id: 'technical-support',
      name: 'Technical & Support',
      icon: BookOpen,
      color: 'teal',
      faqs: [
        {
          question: "What if I have technical issues with the website or download?",
          answer: "If you experience any technical problems: (1) Check your internet connection and try refreshing the page; (2) Try a different web browser (Chrome, Firefox, Safari, or Edge); (3) Disable browser extensions/ad blockers that might interfere; (4) Clear your browser cache and cookies; (5) Try on a different device if available. If problems persist, contact our support team immediately at [support email]. Provide: description of the problem, browser and device you're using, any error messages, and your order confirmation number (if you already paid). We respond to technical issues within 24 hours and prioritize payment/download problems for immediate resolution."
        },
        {
          question: "What file format are the documents delivered in?",
          answer: "All documents are delivered in Microsoft Word format (.docx files). This ensures: universal compatibility (nearly all computers can open Word files), full editing capability (you can modify everything), professional formatting (margins, fonts, spacing), easy printing (all ready to print or convert to PDF), and submission compatibility (all UCPs accept Word documents). If you don't have Microsoft Word, you can use free alternatives like Google Docs, LibreOffice, or Microsoft Word Online (free) to open and edit .docx files. You can also convert to PDF later if your UCP prefers PDF submissions."
        },
        {
          question: "Can I access my documents again later if I lose them?",
          answer: "Yes, but with limitations. After purchase, you should immediately download and save your documents to your computer, cloud storage (Google Drive, Dropbox), or email them to yourself. We provide download access for 30 days after purchase through your order confirmation link. After 30 days, we purge temporary files from our system for security reasons. If you need documents again after 30 days, contact support—we may be able to regenerate them if we still have your order record, but it's best to save multiple copies immediately after purchase to avoid any issues."
        },
        {
          question: "Do you offer customer support if I have questions?",
          answer: "Yes! We provide email support for all customers. Contact us at [support email] for: technical issues with website or downloads, questions about editing your documents, clarification on questionnaire answers, guidance on UCP submission processes, questions about regulatory requirements, or general DBE certification questions. We respond within 24 hours on business days (often much faster). While we can't provide legal advice, we can offer general guidance based on regulations and common practices. For complex legal questions, we recommend consulting with a DBE attorney."
        },
        {
          question: "Can you help me complete the questionnaire if I'm stuck?",
          answer: "Yes, we can provide guidance! Each question in our questionnaire includes help text and examples. If you're still unsure: (1) Contact our support team with specific questions about what the question is asking; (2) We can provide additional examples or clarification; (3) We can suggest how to think about your experiences in terms of the question; (4) However, we cannot write your answers for you—the narrative must be based on YOUR genuine experiences. We guide the process, but the content must authentically come from you. If you need someone to interview you and write your story, that's what consultants offer (at much higher prices)."
        },
        {
          question: "What if I want to make changes after I've already downloaded?",
          answer: "That's the beauty of receiving editable Word documents—you can make unlimited changes at any time! Open the Word file and edit anything you want: add more incidents, expand descriptions, adjust wording, change tone, include additional information, or correct any errors. Save your changes to the Word file. There's no restriction or limit on editing. If you want to completely regenerate new documents with different questionnaire responses, you would need to go through the process again (which would require another $149 payment), but basic editing is unlimited and free."
        },
        {
          question: "What happens if regulations change again after I purchase?",
          answer: "While we continuously update our AI to reflect current regulations, we cannot guarantee future regulatory compliance after purchase. The $149 purchase covers the current version of our service compliant with October 2025 regulations. If major regulatory changes occur in the future (new federal rules, court decisions, DOT guidance), and you haven't yet submitted your application, contact us—we may offer a discounted rate for regeneration with updated compliance. However, since you receive fully editable Word documents, you can often make minor updates yourself to address small regulatory tweaks without needing to regenerate."
        }
      ]
    }
  ];

  const allFaqs = faqCategories.flatMap(category => 
    category.faqs.map(faq => ({ ...faq, category: category.id, categoryName: category.name }))
  );

  const filteredFaqs = selectedCategory === 'all' 
    ? allFaqs 
    : allFaqs.filter(faq => faq.category === selectedCategory);

  const searchFilteredFaqs = searchTerm 
    ? filteredFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredFaqs;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="text-blue-400" size={36} />
              <span className="text-2xl font-bold">DBE Narrative Pro</span>
            </div>
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">DBE Certification FAQ</h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Comprehensive answers to all your questions about the 2025 DBE certification changes, 
            requirements, and our AI-powered narrative service.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-blue-300 focus:border-amber-500 focus:outline-none text-gray-900 text-lg"
            />
          </div>

          <p className="mt-6 text-blue-200 text-sm">
            {searchFilteredFaqs.length} {searchFilteredFaqs.length === 1 ? 'question' : 'questions'} found
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Questions ({allFaqs.length})
            </button>
            {faqCategories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? `bg-${category.color}-600 text-white`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  {category.name} ({category.faqs.length})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {searchTerm && searchFilteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              Try different keywords or browse all questions by category.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
            >
              Clear Search
            </button>
          </div>
        )}

        <div className="space-y-4">
          {searchFilteredFaqs.map((faq, idx) => {
            const faqId = `${faq.category}-${idx}`;
            const category = faqCategories.find(cat => cat.id === faq.category);
            
            return (
              <div key={faqId} className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-gray-100 hover:border-blue-200 transition-all">
                <button
                  onClick={() => handleFaqClick(faq.question, faq.category, idx)}
                  className="w-full px-6 py-5 flex items-start justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded bg-${category.color}-100 text-${category.color}-700`}>
                        {faq.categoryName}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 pr-4">{faq.question}</h3>
                  </div>
                  {expandedFaq === faqId ? (
                    <ChevronUp className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0 mt-1" size={24} />
                  )}
                </button>
                {expandedFaq === faqId && (
                  <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        {searchFilteredFaqs.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center shadow-xl">
            <HelpCircle className="mx-auto mb-4" size={48} />
            <h3 className="text-3xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-xl text-blue-100 mb-6">
              Can't find what you're looking for? Our support team is here to help, 
              or start your application and see exactly how our process works.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleStartApp}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-xl"
              >
                Start Your Application
              </button>
              <button
                onClick={onNavigateHome}
                className="bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold py-4 px-8 rounded-xl border-2 border-white/30 transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats Section */}
      <div className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">$149</div>
              <div className="text-gray-600">One-Time Payment</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">30 min</div>
              <div className="text-gray-600">Average Completion</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">4 Docs</div>
              <div className="text-gray-600">Professional Package</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">100%</div>
              <div className="text-gray-600">Satisfaction Guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="text-blue-400" size={24} />
              <span className="text-white font-bold">DBE Narrative Pro</span>
            </div>
            <p className="text-sm mb-6">
              Professional DBE certification narratives powered by AI.
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <button onClick={onNavigateHome} className="hover:text-white transition-colors">
                Home
              </button>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            </div>
            <div className="mt-6 text-xs">
              <p>© 2025 DBE Narrative Pro. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
