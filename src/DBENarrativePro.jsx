import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Download, FileText, AlertCircle, CheckCircle, Building2, DollarSign, Users, Shield, Eye, CreditCard, Trash2, Save, Home, ArrowUp, Sparkles, GraduationCap, Briefcase, AlertTriangle } from 'lucide-react';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { Helmet } from 'react-helmet-async';
import Navigation from './Navigation';

// Form component definitions (moved outside to prevent re-creation on each render)
const FormInput = ({ label, field, formData, updateFormData, errors, type = "text", required = false, placeholder = "", rows = 3 }) => (
  <div className="mb-6">
    <label className="block text-sm font-bold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "textarea" ? (
      <textarea
        value={formData[field] || ''}
        onChange={(e) => updateFormData(field, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
          errors[field] ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-blue-300'
        }`}
      />
    ) : (
      <input
        type={type}
        value={formData[field] || ''}
        onChange={(e) => updateFormData(field, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
          errors[field] ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-blue-300'
        }`}
      />
    )}
    {errors[field] && <p className="text-red-500 text-sm mt-1 font-semibold">{errors[field]}</p>}
  </div>
);

const FormSelect = ({ label, field, formData, updateFormData, errors, options, required = false }) => (
  <div className="mb-6">
    <label className="block text-sm font-bold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={formData[field] || ''}
      onChange={(e) => updateFormData(field, e.target.value)}
      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
        errors[field] ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-blue-300'
      }`}
    >
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>{opt}</option>
      ))}
    </select>
    {errors[field] && <p className="text-red-500 text-sm mt-1 font-semibold">{errors[field]}</p>}
  </div>
);

const DBENarrativePro = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    ownerName: '',
    industry: '',
    yearsInBusiness: '',
    annualRevenue: '',
    location: '',
    ucpSelection: '',
    customUCP: '',
    // NEW: Early life and education fields
    familyBackground: '',
    educationalBarriers: '',
    employmentBarriers: '',
    // Existing social disadvantage
    socialIncidents: [{ date: '', description: '', impact: '' }],
    // Economic disadvantage
    financingBarriers: '',
    bondingChallenges: '',
    insuranceChallenges: '',
    contractLosses: '',
    marketDisadvantages: '',
    specificExamples: '',
    documentation: ''
  });
  
  const [generatedDocs, setGeneratedDocs] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [lsReady, setLsReady] = useState(false);
  const [autoDownloadAttempted, setAutoDownloadAttempted] = useState(false);
  
  // Streaming preview states
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedContent, setStreamedContent] = useState('');
  const [streamProgress, setStreamProgress] = useState(0);
  const [streamStatus, setStreamStatus] = useState('');
  
  // Validation and error states
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [generationProgress, setGenerationProgress] = useState('');
  const [savedDraftAvailable, setSavedDraftAvailable] = useState(false);

  // Ref for scrolling to download section after payment
  const downloadSectionRef = useRef(null);
  
  // Ref to store payment success handler (prevents stale closure in Lemon Squeezy callback)
  const paymentSuccessHandlerRef = useRef(null);

  // ============================================
  // TODO: REPLACE THESE WITH YOUR REAL VALUES
  // ============================================
  const LEMON_SQUEEZY_CHECKOUT_URL = "https://dbenarrativepro.lemonsqueezy.com/buy/9795b6fb-7f3c-42c0-b417-a8cc6f075aa1?embed=1";
  const GA4_MEASUREMENT_ID = "G-TSQ6RSD1T4";
  // ============================================

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==========================================
  // GOOGLE ANALYTICS 4 HELPER FUNCTIONS
  // ==========================================
  
  // Initialize GA4
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, {
      page_title: 'DBE Narrative Pro',
      page_location: window.location.href
    });

    console.log('✅ Google Analytics 4 initialized');

    return () => {
      if (script1.parentNode) {
        script1.parentNode.removeChild(script1);
      }
    };
  }, []);

  // GA4 Event Tracking Helper
  const trackEvent = (eventName, eventParams = {}) => {
    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
      console.log('📊 GA4 Event:', eventName, eventParams);
    }
  };

  // Track Step Navigation
  const trackStepChange = (newStep, stepName) => {
    trackEvent('step_view', {
      step_number: newStep + 1,
      step_name: stepName,
      total_steps: 6 // Updated from 5 to 6 steps
    });
  };

  // Track Form Field Completion
  const trackFieldCompletion = (fieldName, fieldValue) => {
    if (fieldValue && fieldValue.toString().trim().length > 0) {
      trackEvent('form_field_complete', {
        field_name: fieldName,
        field_length: fieldValue.toString().length,
        step_number: step + 1
      });
    }
  };

  // Track Draft Operations
  const trackDraftSave = () => {
    trackEvent('draft_saved', {
      step_number: step + 1,
      fields_completed: Object.keys(formData).filter(k => formData[k] && formData[k].toString().trim().length > 0).length
    });
  };

  const trackDraftLoad = () => {
    trackEvent('draft_loaded', {
      fields_loaded: Object.keys(formData).filter(k => formData[k] && formData[k].toString().trim().length > 0).length
    });
  };

  const trackDraftClear = () => {
    trackEvent('draft_cleared', {
      step_number: step + 1
    });
  };

  // Track Generation Events
  const trackGenerationStart = () => {
    trackEvent('generation_started', {
      fields_completed: Object.keys(formData).filter(k => formData[k] && formData[k].toString().trim().length > 0).length,
      social_incidents: formData.socialIncidents.filter(i => i.description).length
    });
  };

  const trackGenerationComplete = () => {
    trackEvent('generation_completed', {
      success: true
    });
  };

  const trackGenerationError = (errorMessage) => {
    trackEvent('generation_error', {
      error: errorMessage
    });
  };

  // Track Payment Events
  const trackPaymentInitiated = () => {
    trackEvent('begin_checkout', {
      currency: 'USD',
      value: 149.00,
      items: [{
        item_id: 'dbe_narrative_pro',
        item_name: 'DBE Narrative Pro Package',
        price: 149.00,
        quantity: 1
      }]
    });
  };

  const trackPaymentSuccess = () => {
    trackEvent('purchase', {
      transaction_id: `txn_${Date.now()}`,
      currency: 'USD',
      value: 149.00,
      items: [{
        item_id: 'dbe_narrative_pro',
        item_name: 'DBE Narrative Pro Package',
        price: 149.00,
        quantity: 1
      }]
    });
  };

  // Track Download Events
  const trackDownload = (documentType) => {
    trackEvent('file_download', {
      file_type: documentType,
      file_format: 'docx'
    });
  };

  // ==========================================
  // LEMON SQUEEZY INTEGRATION
  // ==========================================
  
  // Keep payment handler ref updated with current functions
  useEffect(() => {
    paymentSuccessHandlerRef.current = () => {
      console.log('✅ Payment success detected!');
      
      // Update state to trigger re-render and show download buttons
      setIsPaid(true);
      localStorage.setItem('dbeNarrativePaid', 'true');
      console.log('💳 Payment status saved to localStorage');
      trackPaymentSuccess();
      
      // Show success message
      alert('✅ Payment successful! Your documents are now available for download.');
    };
  }, [trackPaymentSuccess]); // Updates when trackPaymentSuccess changes
  
  useEffect(() => {
    const loadLemonSqueezy = () => {
      const script = document.createElement('script');
      script.src = 'https://app.lemonsqueezy.com/js/lemon.js';
      script.async = true;
      script.onload = () => {
        if (window.createLemonSqueezy) {
          window.createLemonSqueezy();
          
          // Setup event handler for payment success
          if (window.LemonSqueezy) {
            window.LemonSqueezy.Setup({
              eventHandler: (event) => {
                console.log('🍋 Lemon Squeezy event:', event);
                
                if (event.event === 'Checkout.Success') {
                  // Call the current payment handler via ref (avoids stale closure)
                  if (paymentSuccessHandlerRef.current) {
                    paymentSuccessHandlerRef.current();
                  }
                }
              }
            });
          }
          
          setLsReady(true);
          console.log('✅ Lemon Squeezy loaded and ready');
        }
      };
      document.body.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    };

    const cleanup = loadLemonSqueezy();
    return cleanup;
  }, []); // Only run once on mount

  // Auto-download and scroll when payment is completed
  useEffect(() => {
    if (isPaid && generatedDocs && !autoDownloadAttempted) {
      console.log('💳 Payment confirmed, triggering auto-download and scroll...');
      
      // Scroll to download section
      setTimeout(() => {
        if (downloadSectionRef.current) {
          downloadSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          console.log('📜 Scrolled to download section');
        }
      }, 300);
      
      // Auto-download all documents
      setTimeout(() => {
        try {
          setAutoDownloadAttempted(true);
          console.log('📥 Starting auto-download of all documents...');
          downloadAllDocuments();
          console.log('✅ Auto-download completed successfully');
        } catch (error) {
          console.error('❌ Auto-download failed:', error);
        }
      }, 800);
    }
  }, [isPaid, generatedDocs, autoDownloadAttempted]);

  // Monitor isPaid state changes for debugging
  useEffect(() => {
    console.log('🔄 isPaid state changed to:', isPaid);
    console.log('📦 generatedDocs exists:', !!generatedDocs);
  }, [isPaid, generatedDocs]);

  const handlePayment = () => {
    if (!lsReady) {
      alert('Payment system is still loading. Please wait a moment and try again.');
      return;
    }

    trackPaymentInitiated();
    
    if (window.LemonSqueezy) {
      window.LemonSqueezy.Url.Open(LEMON_SQUEEZY_CHECKOUT_URL);
      console.log('📦 Opening Lemon Squeezy checkout...');
    } else {
      console.error('❌ LemonSqueezy not loaded');
      alert('Payment system not ready. Please refresh the page and try again.');
    }
  };

  // ==========================================
  // FORM STATE MANAGEMENT
  // ==========================================

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
    trackFieldCompletion(field, value);
  };

  const addIncident = () => {
    setFormData(prev => ({
      ...prev,
      socialIncidents: [...prev.socialIncidents, { date: '', description: '', impact: '' }]
    }));
    trackEvent('incident_added', {
      total_incidents: formData.socialIncidents.length + 1
    });
  };

  const updateIncident = (index, field, value) => {
    const newIncidents = [...formData.socialIncidents];
    newIncidents[index][field] = value;
    setFormData(prev => ({ ...prev, socialIncidents: newIncidents }));
    trackFieldCompletion(`incident_${index}_${field}`, value);
  };

  const removeIncident = (index) => {
    if (formData.socialIncidents.length > 1) {
      setFormData(prev => ({
        ...prev,
        socialIncidents: prev.socialIncidents.filter((_, i) => i !== index)
      }));
      trackEvent('incident_removed', {
        remaining_incidents: formData.socialIncidents.length - 1
      });
    }
  };

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.companyName?.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.ownerName?.trim()) newErrors.ownerName = 'Owner name is required';
      if (!formData.industry?.trim()) newErrors.industry = 'Industry is required';
      if (!formData.yearsInBusiness?.trim()) newErrors.yearsInBusiness = 'Years in business is required';
      if (!formData.annualRevenue?.trim()) newErrors.annualRevenue = 'Annual revenue is required';
      if (!formData.location?.trim()) newErrors.location = 'Location is required';
      if (!formData.ucpSelection || formData.ucpSelection === 'Select your UCP...') {
        newErrors.ucpSelection = 'Please select your UCP';
      }
    }

    // NEW: Validation for Step 2 (Early Life & Education)
    if (currentStep === 2) {
      if (!formData.familyBackground?.trim()) {
        newErrors.familyBackground = 'Family economic background is required - this shows your historical economic disadvantage';
      }
      if (!formData.educationalBarriers?.trim()) {
        newErrors.educationalBarriers = 'Educational barriers are required - describe obstacles in your education';
      }
      if (!formData.employmentBarriers?.trim()) {
        newErrors.employmentBarriers = 'Employment barriers are required - describe career obstacles you faced';
      }
    }

    if (currentStep === 3) {
      const hasValidIncident = formData.socialIncidents.some(
        incident => incident.description?.trim()
      );
      if (!hasValidIncident) {
        newErrors.socialIncidents = 'At least one incident with description is required';
      }
    }

    if (currentStep === 4) {
      let hasAnyEconomicInfo = false;
      if (formData.financingBarriers?.trim()) hasAnyEconomicInfo = true;
      if (formData.bondingChallenges?.trim()) hasAnyEconomicInfo = true;
      if (formData.insuranceChallenges?.trim()) hasAnyEconomicInfo = true;
      if (formData.contractLosses?.trim()) hasAnyEconomicInfo = true;
      if (formData.marketDisadvantages?.trim()) hasAnyEconomicInfo = true;
      
      if (!hasAnyEconomicInfo) {
        newErrors.economic = 'Please provide information for at least one economic disadvantage category';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // LOCAL STORAGE DRAFT MANAGEMENT
  // ==========================================

  // Check for existing draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('dbeNarrativeDraft');
    if (savedDraft) {
      setSavedDraftAvailable(true);
    }
    
    // Load payment status from localStorage
    const savedPaymentStatus = localStorage.getItem('dbeNarrativePaid');
    if (savedPaymentStatus === 'true') {
      setIsPaid(true);
      console.log('💳 Payment status loaded from localStorage');
    }
    
    // Load generated documents from localStorage
    const savedDocs = localStorage.getItem('dbeNarrativeGeneratedDocs');
    if (savedDocs) {
      try {
        setGeneratedDocs(JSON.parse(savedDocs));
        console.log('📄 Generated documents loaded from localStorage');
      } catch (e) {
        console.error('Error loading saved documents:', e);
      }
    }
  }, []);

  // AUTO-SAVE: Save draft whenever formData changes (and user has started the form)
  useEffect(() => {
    if (step > 0) {
      localStorage.setItem('dbeNarrativeDraft', JSON.stringify(formData));
      console.log('💾 Draft auto-saved to localStorage');
      trackDraftSave();
    }
  }, [formData, step]);

  const loadDraft = () => {
    const savedDraft = localStorage.getItem('dbeNarrativeDraft');
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
      trackDraftLoad();
      alert('✅ Draft loaded successfully!');
    }
  };

  const clearDraft = () => {
    localStorage.removeItem('dbeNarrativeDraft');
    localStorage.removeItem('dbeNarrativePaid');
    localStorage.removeItem('dbeNarrativeGeneratedDocs');
    setSavedDraftAvailable(false);
    setIsPaid(false);
    setGeneratedDocs(null);
    trackDraftClear();
    console.log('🧹 All data cleared from localStorage');
  };

  // ==========================================
  // DOCUMENT GENERATION
  // ==========================================

  const generateDocuments = async () => {
    setIsGenerating(true);
    setIsStreaming(true);
    setError(null);
    setStreamedContent('');
    setStreamProgress(0);
    setStreamStatus('Initializing...');
    trackGenerationStart();
    
    // Fake progress interval for the long wait after 90%
    let fakeProgressInterval = null;
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, stream: true })
      });

      if (!response.ok) {
        throw new Error('Generation failed');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'content') {
                // Streaming narrative content
                setStreamedContent(prev => prev + data.chunk);
                setStreamProgress(prev => Math.min(prev + 0.5, 90));
                setStreamStatus('Writing your narrative...');
              } else if (data.type === 'preview_complete') {
                // Preview sections complete - now the long wait begins
                setStreamStatus('✅ Preview complete! Continuing with full narrative...');
                setStreamProgress(90);
                
                // Start fake progress to show activity during long backend process
                let fakeProgress = 90;
                const statusMessages = [
                  '📝 Completing remaining narrative sections...',
                  '🔍 Adding detailed analysis and evidence...',
                  '✍️ Finalizing narrative structure...',
                  '📋 Preparing cover letter...'
                ];
                let messageIndex = 0;
                
                fakeProgressInterval = setInterval(() => {
                  fakeProgress = Math.min(fakeProgress + 0.5, 94.5); // Slowly increment to 94.5%
                  setStreamProgress(fakeProgress);
                  
                  // Change status message every 3 seconds
                  if (Math.random() > 0.7 && messageIndex < statusMessages.length - 1) {
                    messageIndex++;
                    setStreamStatus(statusMessages[messageIndex]);
                  }
                }, 1000); // Update every second
                
              } else if (data.type === 'generating_other_docs') {
                // Clear fake progress interval
                if (fakeProgressInterval) {
                  clearInterval(fakeProgressInterval);
                  fakeProgressInterval = null;
                }
                
                // Generating other documents
                setStreamStatus('📄 Generating cover letter, checklist, and review summary...');
                setStreamProgress(95);
              } else if (data.type === 'complete') {
                // Clear fake progress interval
                if (fakeProgressInterval) {
                  clearInterval(fakeProgressInterval);
                  fakeProgressInterval = null;
                }
                
                // All documents complete
                setIsStreaming(false);
                setStreamProgress(100);
                setStreamStatus('✅ All documents generated successfully!');
                setGeneratedDocs(data.documents);
                localStorage.setItem('dbeNarrativeGeneratedDocs', JSON.stringify(data.documents));
                console.log('📄 Documents saved to localStorage');
                trackGenerationComplete();
                setTimeout(() => setStreamStatus(''), 2000);
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
      
      // Cleanup interval on completion
      if (fakeProgressInterval) {
        clearInterval(fakeProgressInterval);
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.message);
      trackGenerationError(err.message);
      setIsStreaming(false);
      
      // Cleanup interval on error
      if (fakeProgressInterval) {
        clearInterval(fakeProgressInterval);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // ==========================================
  // WORD DOCUMENT EXPORT
  // ==========================================

  const createWordDocument = (content, filename) => {
    const paragraphs = content.split('\n').map(line => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('════')) {
        return new Paragraph({
          text: trimmed,
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 200 }
        });
      }
      
      if (trimmed.match(/^[IVX]+\./)) {
        return new Paragraph({
          text: trimmed,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 200 }
        });
      }
      
      if (trimmed.match(/^[A-Z]\./)) {
        return new Paragraph({
          text: trimmed,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 }
        });
      }
      
      return new Paragraph({
        text: trimmed,
        spacing: { before: 100, after: 100 }
      });
    });

    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440
            }
          }
        },
        children: paragraphs
      }]
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, filename);
      trackDownload(filename);
    });
  };

  const downloadDocument = (type) => {
    if (!generatedDocs) return;
    
    const contentMap = {
      cover: { content: generatedDocs.coverLetter, filename: `${formData.companyName}_CoverLetter.docx` },
      narrative: { content: generatedDocs.narrative, filename: `${formData.companyName}_Narrative.docx` },
      checklist: { content: generatedDocs.checklist, filename: `${formData.companyName}_Checklist.docx` },
      review: { content: generatedDocs.reviewSummary, filename: `${formData.companyName}_ReviewSummary.docx` }
    };

    const { content, filename } = contentMap[type];
    createWordDocument(content, filename);
  };

  const downloadAllDocuments = () => {
    ['cover', 'narrative', 'checklist', 'review'].forEach((type, index) => {
      setTimeout(() => downloadDocument(type), index * 500);
    });
    trackEvent('download_all_documents', {
      company: formData.companyName
    });
  };

  // ==========================================
  // STEP DEFINITIONS - UPDATED WITH NEW STEP
  // ==========================================

  const steps = [
    {
      title: 'Welcome',
      subtitle: 'Important 2025 Updates',
      icon: FileText,
      content: (
        <div className="space-y-6">
          {/* CRITICAL 2025 IFR NOTICE */}
          <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-red-900 mb-3">
                  🚨 CRITICAL: 2025 Interim Final Rule Changes
                </h3>
                <div className="text-sm text-red-900 space-y-2">
                  <p className="font-bold">
                    The DBE certification process changed dramatically on October 3, 2025:
                  </p>
                  <ul className="list-disc ml-5 space-y-1">
                    <li><strong>NO race/sex/ethnicity presumptions</strong> - Everyone must prove disadvantage individually</li>
                    <li><strong>Personal narratives required</strong> - Detailed documentation of barriers across your ENTIRE life</li>
                    <li><strong>Cannot mention race, sex, or ethnicity</strong> - You must describe discrimination without referencing protected characteristics</li>
                    <li><strong>All current DBEs must be recertified</strong> - No automatic renewals</li>
                    <li><strong>Personal Net Worth statement required</strong> - Must be under $1.32 million</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Net Worth Requirement */}
          <div className="bg-amber-50 border-2 border-amber-400 p-6 rounded-xl">
            <h4 className="font-bold text-amber-900 mb-3 text-lg flex items-center gap-2">
              <DollarSign className="text-amber-600" />
              Required Financial Documentation
            </h4>
            <p className="text-gray-700 mb-3">
              In addition to this narrative, you MUST submit a current <strong>Personal Net Worth (PNW) statement</strong> 
              showing assets and liabilities. The PNW cap is <strong>$1.32 million</strong> (excluding primary residence and retirement accounts).
            </p>
            <p className="text-sm text-gray-600 italic">
              This app creates your narrative. You'll need to prepare your PNW statement separately using your UCP's form.
            </p>
          </div>

          {/* Timeline Expectations */}
          <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-xl">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <AlertCircle className="text-blue-600" />
              ⏱️ Expected Timeline
            </h4>
            <p className="text-sm text-gray-700 mb-3">
              Recertification may take <strong>6-12 months</strong> depending on your UCP. 
              There is currently <strong>no deadline</strong> for submission, and DBE goals are 
              suspended until recertification is complete. <strong>Focus on quality over speed.</strong>
            </p>
            <p className="text-sm text-gray-600 italic">
              Some UCPs report backlogs of thousands of applications. Don't rush - a thorough, well-documented 
              narrative is more important than being first.
            </p>
          </div>

          {/* What This Tool Does */}
          <div className="bg-white border-2 border-gray-300 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What This Tool Creates</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-bold">Professional Cover Letter</p>
                  <p className="text-gray-600">Formal submission letter</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-bold">Personal Narrative Statement</p>
                  <p className="text-gray-600">Your life story of disadvantage</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-bold">Evidence Checklist</p>
                  <p className="text-gray-600">Documents you need to gather</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-bold">Review Summary</p>
                  <p className="text-gray-600">Final checklist before submission</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-gray-100 border-2 border-gray-300 p-4 rounded-xl text-xs text-gray-600">
            <p className="font-bold mb-2">⚖️ Legal Disclaimer:</p>
            <p>
              This AI-generated document is a STARTING POINT for your narrative. You are responsible for:
              (1) Verifying all information is accurate and truthful;
              (2) Ensuring compliance with your specific UCP requirements;
              (3) Gathering all required supporting documentation;
              (4) Reviewing with an attorney if desired.
              This service does not constitute legal advice. <strong>Making false statements in a DBE application 
              can result in criminal prosecution under 18 U.S.C. § 1001.</strong>
            </p>
          </div>

          {/* Saved Draft Notice - Shows if user has previously saved work */}
          {savedDraftAvailable && (
            <div className="bg-green-50 border-2 border-green-300 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Save className="text-green-600" size={20} />
                  <p className="text-sm font-semibold text-green-900">
                    You have a saved draft available
                  </p>
                </div>
                <button
                  onClick={loadDraft}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                >
                  Load Draft
                </button>
              </div>
            </div>
          )}

          {/* Auto-save notice */}
          <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-xl">
            <div className="flex items-center gap-2">
              <Shield className="text-blue-600" size={20} />
              <p className="text-sm text-blue-900">
                <strong>Auto-save enabled:</strong> Your progress is automatically saved to your device as you type. 
                All data stays private on your computer.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <p className="text-gray-600 text-sm">
              <strong>Estimated completion time:</strong> 45-90 minutes
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Business Profile',
      subtitle: 'Basic company information',
      icon: Building2,
      content: (
        <div className="space-y-6">
          <FormInput 
            label="Company Name" 
            field="companyName"
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            required
            placeholder="ABC Construction LLC"
          />
          
          <FormInput 
            label="Your Name (Owner)" 
            field="ownerName"
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            required
            placeholder="John Smith"
          />

          <FormInput 
            label="Industry/Trade" 
            field="industry"
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            required
            placeholder="General Contracting, Electrical, Plumbing, etc."
          />

          <FormInput 
            label="Years in Business" 
            field="yearsInBusiness"
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            required
            type="number"
            placeholder="10"
          />

          <FormSelect 
            label="Annual Revenue Range" 
            field="annualRevenue"
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            required
            options={[
              'Select revenue range...',
              'Under $500,000',
              '$500,000 - $1 million',
              '$1 million - $5 million',
              '$5 million - $10 million',
              'Over $10 million'
            ]}
          />

          <FormInput 
            label="Business Location (City, State)" 
            field="location"
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            required
            placeholder="Sacramento, CA"
          />

          <FormSelect 
            label="Your Unified Certification Program (UCP)" 
            field="ucpSelection"
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            required
            options={[
              'Select your UCP...',
              'California UCP',
              'New York UCP',
              'Texas UCP',
              'Florida UCP',
              'Illinois UCP',
              'Pennsylvania UCP',
              'Other (specify below)'
            ]}
          />

          {formData.ucpSelection === 'Other (specify below)' && (
            <FormInput 
              label="Specify Your UCP" 
              field="customUCP"
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
              placeholder="Enter your UCP name"
            />
          )}
        </div>
      )
    },
    {
      title: 'Early Life & Education',
      subtitle: 'Historical disadvantage documentation',
      icon: GraduationCap,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-sm text-blue-900 font-semibold mb-2">
                  📚 Why This Section Matters
                </p>
                <p className="text-sm text-gray-700">
                  The 2025 rules require you to document disadvantage across your <strong>entire life</strong>, 
                  not just in business. This section helps establish the historical context of barriers you've 
                  faced from childhood through early career.
                </p>
              </div>
            </div>
          </div>

          <FormInput 
            label="Family Economic Background" 
            field="familyBackground"
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            type="textarea"
            rows={6}
            required
            placeholder="Describe your family's economic situation growing up. Examples: low-income household, single-parent family, reliance on government assistance, lack of family wealth or business connections, working multiple jobs to support family, etc."
          />

          <FormInput 
            label="Educational Barriers" 
            field="educationalBarriers"
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            type="textarea"
            rows={6}
            required
            placeholder="Describe obstacles in your education. Examples: attended underfunded schools, lacked access to advanced courses or college prep, worked through school to support family, first-generation college student, limited access to mentors or guidance counselors, financial barriers to higher education, etc."
          />

          <FormInput 
            label="Early Employment Barriers" 
            field="employmentBarriers"
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            type="textarea"
            rows={6}
            required
            placeholder="Describe career obstacles you faced early on. Examples: limited professional network, difficulty finding mentors, passed over for promotions, denied opportunities, faced discrimination in hiring or advancement (describe WITHOUT mentioning protected characteristics), lower starting wages, etc."
          />

          <div className="bg-amber-50 border-2 border-amber-400 p-4 rounded-xl text-sm">
            <p className="font-bold text-amber-900 mb-2">💡 Writing Tips:</p>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              <li>Be specific with examples and details</li>
              <li>Focus on economic and social barriers, not protected characteristics</li>
              <li>Explain how each barrier impacted your opportunities</li>
              <li>Connect historical disadvantages to your current business challenges</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Social Disadvantage',
      subtitle: 'Document discrimination and barriers',
      icon: Users,
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-sm text-red-900 font-semibold mb-2">
                  ⚠️ CRITICAL: How to Describe Discrimination
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  You CANNOT mention race, sex, ethnicity, or other protected characteristics. Instead, describe:
                </p>
                <ul className="list-disc ml-5 text-xs space-y-1 text-gray-700">
                  <li><strong>What happened</strong>: The specific discriminatory action or barrier</li>
                  <li><strong>The context</strong>: Where, when, and circumstances</li>
                  <li><strong>The impact</strong>: How it affected you professionally or financially</li>
                  <li><strong>The pattern</strong>: If this was part of ongoing discrimination</li>
                </ul>
              </div>
            </div>
          </div>

          {formData.socialIncidents.map((incident, index) => (
            <div key={index} className="bg-gray-50 border-2 border-gray-300 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Incident #{index + 1}</h3>
                {formData.socialIncidents.length > 1 && (
                  <button
                    onClick={() => removeIncident(index)}
                    className="text-red-600 hover:text-red-700 text-sm font-bold flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <FormInput 
                  label="Date (approximate)" 
                  field="date"
                  formData={{ date: incident.date }}
                  updateFormData={(field, value) => updateIncident(index, field, value)}
                  errors={{}}
                  placeholder="Example: Summer 2020, January 2022"
                />

                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={incident.description}
                    onChange={(e) => updateIncident(index, 'description', e.target.value)}
                    placeholder="Describe what happened WITHOUT mentioning race, sex, or ethnicity. Example: 'I was repeatedly excluded from networking events where contracts were discussed. When I inquired, I was told I wouldn't fit in with their group.'"
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-all"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Impact on Business
                  </label>
                  <textarea
                    value={incident.impact}
                    onChange={(e) => updateIncident(index, 'impact', e.target.value)}
                    placeholder="How did this affect you professionally or financially? Example: 'Lost access to $500K in potential contracts. Forced me to bid on smaller projects with lower margins.'"
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-all"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addIncident}
            className="w-full bg-white hover:bg-gray-50 border-2 border-blue-500 text-blue-600 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            <FileText size={20} />
            Add Another Incident
          </button>

          {errors.socialIncidents && (
            <p className="text-red-500 text-sm font-semibold">{errors.socialIncidents}</p>
          )}

          <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-xl text-sm">
            <p className="font-bold text-blue-900 mb-2">💡 Examples of Social Disadvantage:</p>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              <li>Denied business loans or credit despite meeting qualifications</li>
              <li>Excluded from industry associations or networking opportunities</li>
              <li>Difficulty finding mentors or business advisors</li>
              <li>Treated differently by suppliers or potential clients</li>
              <li>Faced assumptions about competence or credibility</li>
              <li>Excluded from informal business relationships where deals are made</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Economic Disadvantage',
      subtitle: 'Financial barriers and challenges',
      icon: DollarSign,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-sm text-blue-900 font-semibold mb-2">
                  💰 Economic Disadvantage Requirements
                </p>
                <p className="text-sm text-gray-700">
                  Describe financial barriers that have limited your business growth. Be specific about:
                  dollar amounts, interest rates, contract values lost, and measurable impacts.
                </p>
              </div>
            </div>
          </div>

          <FormInput 
            label="Financing Barriers" 
            field="financingBarriers"
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            type="textarea"
            rows={5}
            placeholder="Example: Denied business loan despite 700+ credit score and 5 years profitability. Forced to use personal credit cards at 24% APR. Limited to $50K credit line vs. $500K competitors received."
          />

          <FormInput 
            label="Bonding Challenges" 
            field="bondingChallenges"
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            type="textarea"
            rows={5}
            placeholder="Example: Unable to secure performance bonds over $250K. Required 100% collateral vs. 10% for established firms. Lost $2M in contract opportunities due to bonding limits."
          />

          <FormInput 
            label="Insurance Challenges" 
            field="insuranceChallenges"
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            type="textarea"
            rows={5}
            placeholder="Example: Quoted 3x higher premiums than competitors for same coverage. Required to purchase excess liability insurance upfront. Spent 12% of revenue on insurance vs. industry average of 4%."
          />

          <FormInput 
            label="Contract Losses / Payment Issues" 
            field="contractLosses"
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            type="textarea"
            rows={5}
            placeholder="Example: Lost $500K contract after being low bidder - client chose 'more established' firm at 15% higher price. Experienced 90-day payment delays while primes paid their preferred subs in 30 days."
          />

          <FormInput 
            label="Market Disadvantages" 
            field="marketDisadvantages"
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            type="textarea"
            rows={5}
            placeholder="Example: Excluded from pre-bid meetings where project details are shared. No access to project plans before public release. Faced higher material costs due to lack of supplier relationships."
          />

          <FormInput 
            label="Specific Examples & Dollar Impacts" 
            field="specificExamples"
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            type="textarea"
            rows={6}
            placeholder="Provide 2-3 concrete examples with numbers: dates, dollar amounts, contract values, interest rates, fees paid, opportunities lost, etc."
          />

          {errors.economic && (
            <div className="bg-red-50 border-2 border-red-500 p-4 rounded-xl">
              <p className="text-red-700 text-sm font-bold">{errors.economic}</p>
            </div>
          )}

          <div className="bg-amber-50 border-2 border-amber-400 p-4 rounded-xl text-sm">
            <p className="font-bold text-amber-900 mb-2">📊 What Makes Strong Evidence:</p>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              <li><strong>Specific numbers</strong>: Dollar amounts, percentages, interest rates</li>
              <li><strong>Comparisons</strong>: How your situation differs from competitors</li>
              <li><strong>Timeline</strong>: When these barriers occurred</li>
              <li><strong>Impact</strong>: How it limited your growth or profitability</li>
              <li><strong>Documentation</strong>: Mention if you have supporting docs (loan denials, quotes, contracts)</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Generate & Download',
      subtitle: 'Create your professional DBE narrative',
      icon: Sparkles,
      content: (
        <div className="space-y-6">
          {!generatedDocs ? (
            <>
              {/* Streaming Preview */}
              {isStreaming && streamedContent && (
                <div className="bg-white border-2 border-blue-300 rounded-xl p-6 mb-6 shadow-lg">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-blue-900">
                        📝 Your Narrative Preview
                      </h3>
                      <span className="text-sm font-semibold text-blue-600">
                        {Math.round(streamProgress)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div 
                        className={`bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-300 ${
                          streamProgress >= 90 && streamProgress < 95 ? 'animate-pulse' : ''
                        }`}
                        style={{ width: `${streamProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      {streamProgress >= 90 && streamProgress < 95 && (
                        <span className="inline-block">
                          <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </span>
                      )}
                      {streamStatus}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 max-h-96 overflow-y-auto">
                    <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {streamedContent}
                      {isStreaming && <span className="inline-block w-2 h-5 bg-blue-600 animate-pulse ml-1">▊</span>}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Showing preview of first section • Full document available after purchase
                  </p>
                </div>
              )}

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-8 rounded-xl text-center">
                <Sparkles className="mx-auto mb-4 text-blue-600" size={48} />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Ready to Generate Your Documents
                </h3>
                <p className="text-gray-700 mb-6">
                  Your AI-powered DBE narrative package will include:
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-6">
                  <div className="flex items-start gap-3 bg-white p-4 rounded-lg">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-bold text-sm">Cover Letter</p>
                      <p className="text-xs text-gray-600">Professional submission letter</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white p-4 rounded-lg">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-bold text-sm">Personal Narrative</p>
                      <p className="text-xs text-gray-600">2025 compliant disadvantage statement</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white p-4 rounded-lg">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-bold text-sm">Evidence Checklist</p>
                      <p className="text-xs text-gray-600">Required supporting documents</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white p-4 rounded-lg">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-bold text-sm">Review Summary</p>
                      <p className="text-xs text-gray-600">Final submission checklist</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={generateDocuments}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl text-lg flex items-center gap-3 mx-auto transition-all transform hover:scale-105 disabled:scale-100 shadow-xl"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={24} />
                      Generate Documents
                    </>
                  )}
                </button>

                {generationProgress && !isStreaming && (
                  <p className="text-blue-700 font-semibold mt-4">{generationProgress}</p>
                )}

                {error && (
                  <div className="bg-red-50 border-2 border-red-500 p-4 rounded-xl mt-4">
                    <p className="text-red-700 font-bold">Error: {error}</p>
                  </div>
                )}
              </div>

              <div className="bg-amber-50 border-2 border-amber-400 p-6 rounded-xl text-sm">
                <p className="font-bold text-amber-900 mb-2">⏱️ Generation typically takes 30-60 seconds</p>
                <p className="text-gray-700">
                  Our AI will analyze your responses and create professional, compliant documents 
                  based on the 2025 Interim Final Rule requirements. All documents will be fully 
                  editable Word files.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-green-50 border-2 border-green-500 p-8 rounded-xl text-center">
                <CheckCircle className="mx-auto mb-4 text-green-600" size={48} />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  ✅ Documents Generated Successfully!
                </h3>
                <p className="text-gray-700 mb-6">
                  Your complete DBE narrative package has been generated.
                </p>
              </div>

              {/* Narrative Preview */}
              {generatedDocs && generatedDocs.narrative && (
                <div className="bg-white border-2 border-gray-300 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText size={24} className="text-blue-600" />
                    Personal Narrative Preview
                  </h4>
                  <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 max-h-96 overflow-y-auto">
                    <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans text-gray-900">
                      {generatedDocs.preview || generatedDocs.narrative.substring(0, 750)}...
                      <p className="text-gray-500 italic mt-4">[Complete narrative available after payment]</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-xl mb-6" ref={downloadSectionRef}>
                {!isPaid ? (
                  <div className="bg-blue-50 border-2 border-blue-400 p-6 rounded-xl mb-6">
                    <h4 className="text-xl font-bold text-blue-900 mb-3">
                      🔒 Unlock Your Documents - $149
                    </h4>
                    <p className="text-sm text-gray-700 mb-4">
                      Your documents have been generated and are ready to download. 
                      Complete your one-time payment to unlock all files.
                    </p>
                    <button
                      onClick={handlePayment}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl text-lg flex items-center gap-3 mx-auto transition-all transform hover:scale-105 shadow-xl"
                    >
                      <CreditCard size={24} />
                      Pay $149 & Download
                    </button>
                    <p className="text-xs text-gray-600 mt-3">
                      Secure payment via Lemon Squeezy • Instant access after payment
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={() => downloadDocument('cover')}
                      className="bg-white hover:bg-gray-50 border-2 border-blue-500 text-blue-700 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all hover:shadow-lg"
                    >
                      <Download size={20} />
                      Cover Letter
                    </button>
                    <button
                      onClick={() => downloadDocument('narrative')}
                      className="bg-white hover:bg-gray-50 border-2 border-indigo-500 text-indigo-700 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all hover:shadow-lg"
                    >
                      <Download size={20} />
                      Personal Narrative
                    </button>
                    <button
                      onClick={() => downloadDocument('checklist')}
                      className="bg-white hover:bg-gray-50 border-2 border-purple-500 text-purple-700 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all hover:shadow-lg"
                    >
                      <Download size={20} />
                      Evidence Checklist
                    </button>
                    <button
                      onClick={() => downloadDocument('review')}
                      className="bg-white hover:bg-gray-50 border-2 border-pink-500 text-pink-700 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all hover:shadow-lg"
                    >
                      <Download size={20} />
                      Review Summary
                    </button>
                  </div>
                )}

                {isPaid && (
                  <>
                    <button
                      onClick={() => {
                        console.log('📥 Manual download triggered');
                        console.log('📦 generatedDocs:', !!generatedDocs);
                        downloadAllDocuments();
                      }}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg flex items-center gap-3 mx-auto transition-all transform hover:scale-105 shadow-xl mb-6"
                    >
                      <Download size={24} />
                      Download All Documents
                    </button>
                    {!autoDownloadAttempted && (
                      <p className="text-amber-600 text-sm font-semibold mb-4">
                        ⚠️ If downloads didn't start automatically, click the button above.
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-xl">
                <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <Eye className="text-blue-600" size={20} />
                  Next Steps After Download
                </h4>
                <ol className="list-decimal ml-5 space-y-2 text-sm text-gray-700">
                  <li><strong>Review & Edit:</strong> Open documents in Microsoft Word and customize as needed</li>
                  <li><strong>Gather Evidence:</strong> Use the checklist to collect supporting documentation</li>
                  <li><strong>Prepare PNW:</strong> Complete your Personal Net Worth statement (separate requirement)</li>
                  <li><strong>Legal Review:</strong> Consider having an attorney review before submission (optional but recommended)</li>
                  <li><strong>Submit to UCP:</strong> Follow your UCP's specific submission process</li>
                </ol>
              </div>

              <div className="bg-gray-100 border-2 border-gray-300 p-4 rounded-xl text-xs text-gray-600">
                <p className="font-bold mb-2">⚠️ Important Reminder:</p>
                <p>
                  These AI-generated documents are a professional starting point. You are responsible for 
                  verifying accuracy, ensuring compliance with your UCP's requirements, and providing truthful 
                  information. False statements can result in criminal prosecution under 18 U.S.C. § 1001.
                </p>
              </div>
            </>
          )}
        </div>
      )
    }
  ];

  const currentStep = steps[step];
  const StepIcon = currentStep.icon;
  const progress = ((step) / (steps.length - 1)) * 100;

  return (
    <>
      <Helmet>
        <title>DBE Narrative Pro - 2025 Compliant Certification Narratives</title>
        <meta name="description" content="Generate professional DBE certification narratives compliant with the October 2025 Interim Final Rule. AI-powered, attorney-informed guidance." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        {/* Navigation - Single component, no duplicate */}
        <Navigation />

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Enhanced Progress Bar */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-gray-100">
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span className="font-semibold">Your Progress</span>
                <span className="font-bold text-blue-600 text-lg">{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between">
              {steps.map((s, idx) => {
                const Icon = s.icon;
                const isActive = idx === step;
                const isComplete = idx < step;
                
                return (
                  <div key={idx} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center justify-center w-14 h-14 rounded-xl font-bold transition-all ${
                        isActive
                          ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white scale-110 shadow-lg shadow-blue-500/50' 
                          : isComplete
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {isComplete ? <CheckCircle size={26} /> : <Icon size={26} />}
                      </div>
                      <p className={`text-xs mt-2 font-bold hidden md:block text-center ${
                        isActive ? 'text-blue-600' : isComplete ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {s.title}
                      </p>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`flex-1 h-2 mx-2 rounded-full transition-all ${
                        isComplete ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Clear Draft Button - only shows during steps 1-4 */}
            {step > 0 && step < 5 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    if (window.confirm('Clear saved draft? Your progress will be lost.')) {
                      clearDraft();
                      window.location.reload();
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold inline-flex items-center gap-2 text-sm transition-all shadow-lg"
                  title="Clear saved draft"
                >
                  <Trash2 size={16} />
                  Clear Draft
                </button>
              </div>
            )}
          </div>

          {/* Main Content Card - Enhanced */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border-2 border-gray-100">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-gray-100">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-xl shadow-lg">
                <StepIcon className="text-white" size={40} />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {currentStep.title}
                </h2>
                <p className="text-gray-600 text-lg">{currentStep.subtitle}</p>
              </div>
            </div>
            
            {currentStep.content}
          </div>

          {/* Navigation Buttons - Enhanced */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => {
                setStep(Math.max(0, step - 1));
                scrollToTop();
              }}
              disabled={step === 0}
              className="group bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 px-8 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg border-2 border-gray-200 transition-all hover:shadow-xl disabled:hover:shadow-lg"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Previous
            </button>
            
            {step < steps.length - 1 && (
              <button
                onClick={() => {
                  if (validateStep(step)) {
                    const newStep = Math.min(steps.length - 1, step + 1);
                    setStep(newStep);
                    trackStepChange(newStep, steps[newStep].title);
                    scrollToTop();
                  } else {
                    alert('Please fill in all required fields before continuing.');
                  }
                }}
                className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl flex items-center gap-2 shadow-lg transition-all transform hover:scale-105 hover:shadow-xl"
              >
                Continue
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

          {/* Feature Cards - Enhanced */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border-2 border-gray-200 p-6 rounded-xl text-center hover:shadow-xl transition-all hover:border-blue-300">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="text-white" size={28} />
              </div>
              <p className="font-bold text-gray-900 mb-1">Secure & Private</p>
              <p className="text-sm text-gray-600">Auto-saved locally on your device</p>
            </div>
            <div className="bg-white border-2 border-gray-200 p-6 rounded-xl text-center hover:shadow-xl transition-all hover:border-green-300">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Sparkles className="text-white" size={28} />
              </div>
              <p className="font-bold text-gray-900 mb-1">AI-Powered</p>
              <p className="text-sm text-gray-600">Professional quality documents</p>
            </div>
            <div className="bg-white border-2 border-gray-200 p-6 rounded-xl text-center hover:shadow-xl transition-all hover:border-amber-300">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FileText className="text-white" size={28} />
              </div>
              <p className="font-bold text-gray-900 mb-1">Word Documents</p>
              <p className="text-sm text-gray-600">Fully editable downloads</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 DBE Narrative Pro • AI-Enhanced DBE Certification Documents</p>
            <p className="mt-1 text-xs">Compliant with 49 CFR Part 26 (Interim Final Rule - October 2025)</p>
          </div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 z-50 animate-bounce"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </button>
        )}
      </div>
    </>
  );
};

export default DBENarrativePro;