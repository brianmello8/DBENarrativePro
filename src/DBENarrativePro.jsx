import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Download, FileText, AlertCircle, CheckCircle, Building2, DollarSign, Users, Shield, Eye, CreditCard, Trash2, Save, Home, ArrowUp, Sparkles } from 'lucide-react';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { Helmet } from 'react-helmet-async';

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
    socialIncidents: [{ date: '', description: '', impact: '' }],
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
  
  // Validation and error states
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [generationProgress, setGenerationProgress] = useState('');
  const [savedDraftAvailable, setSavedDraftAvailable] = useState(false);

  // ============================================
  // TODO: REPLACE THESE WITH YOUR REAL VALUES
  // ============================================
  const LEMON_SQUEEZY_CHECKOUT_URL = "https://dbenarrativepro.lemonsqueezy.com/buy/9795b6fb-7f3c-42c0-b417-a8cc6f075aa1";
  const GA4_MEASUREMENT_ID = "G-TSQ6RSD1T4"; // TODO: Replace with your GA4 Measurement ID
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
    // Load GA4 script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag
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
      total_steps: steps.length
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
      fields_completed: Object.keys(formData).filter(key => 
        formData[key] && formData[key].toString().trim().length > 0
      ).length
    });
  };

  const trackDraftLoad = () => {
    trackEvent('draft_loaded', {
      step_number: step + 1
    });
  };

  const trackDraftCleared = () => {
    trackEvent('draft_cleared', {
      step_number: step + 1
    });
  };

  // Track Payment Events
  const trackPaymentInitiated = () => {
    trackEvent('payment_initiated', {
      value: 149,
      currency: 'USD',
      step_number: step + 1
    });
  };

  const trackPaymentSuccess = (orderId) => {
    trackEvent('purchase', {
      transaction_id: orderId,
      value: 149,
      currency: 'USD',
      items: [{
        item_id: 'dbe_narrative_package',
        item_name: 'DBE Narrative Package',
        price: 149,
        quantity: 1
      }]
    });
  };

  // ==========================================
  // END ANALYTICS FUNCTIONS
  // ==========================================

  // Auto-save draft to localStorage with analytics
  useEffect(() => {
    const saveDraft = () => {
      try {
        localStorage.setItem('dbe_form_draft', JSON.stringify(formData));
        localStorage.setItem('dbe_form_step', step.toString());
        localStorage.setItem('dbe_form_timestamp', Date.now().toString());
        
        trackDraftSave();
      } catch (error) {
        console.error('Error saving draft:', error);
      }
    };

    const timeoutId = setTimeout(saveDraft, 2000);
    return () => clearTimeout(timeoutId);
  }, [formData, step]);

  // Load saved draft on mount
  useEffect(() => {
    const checkForDraft = () => {
      try {
        const savedData = localStorage.getItem('dbe_form_draft');
        const savedStep = localStorage.getItem('dbe_form_step');
        const timestamp = localStorage.getItem('dbe_form_timestamp');
        
        if (savedData && timestamp) {
          const hoursSinceSave = (Date.now() - parseInt(timestamp)) / (1000 * 60 * 60);
          
          if (hoursSinceSave < 168) { // 7 days
            setSavedDraftAvailable(true);
          } else {
            clearDraft();
          }
        }
      } catch (error) {
        console.error('Error checking for draft:', error);
      }
    };

    checkForDraft();
  }, []);

  // Check if user already paid
  useEffect(() => {
    const paidStatus = localStorage.getItem('dbe_narrative_paid');
    if (paidStatus === 'true') {
      setIsPaid(true);
    }
  }, []);

  // Track step changes
  useEffect(() => {
    if (step > 0) {
      trackStepChange(step, steps[step].title);
    }
  }, [step]);

  // Load Lemon Squeezy script and setup official event handler
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://app.lemonsqueezy.com/js/lemon.js";
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      console.log('✅ Lemon Squeezy script loaded');
      
      if (window.createLemonSqueezy) {
        window.createLemonSqueezy();
      }
      setLsReady(true);

      if (window.LemonSqueezy) {
        window.LemonSqueezy.Setup({
          eventHandler: (event) => {
            console.log('📨 Lemon Squeezy event:', event);
            
            if (event.event === 'Checkout.Success') {
              console.log('🎉 Payment successful!', event);
              
              setIsPaid(true);
              
              try {
                localStorage.setItem('dbe_narrative_paid', 'true');
                localStorage.setItem('dbe_narrative_payment_date', new Date().toISOString());
                
                if (event.data?.order_id) {
                  localStorage.setItem('dbe_order_id', event.data.order_id);
                  console.log('💾 Stored order ID:', event.data.order_id);
                  
                  trackPaymentSuccess(event.data.order_id);
                }
              } catch (error) {
                console.error('Error storing payment status:', error);
              }
              
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
              
              alert('🎉 Payment successful! Your documents are now unlocked and ready to download.');
            }
          }
        });
        console.log('✅ Lemon Squeezy event handler setup complete');
      }
    };

    script.onerror = () => {
      console.error('❌ Failed to load Lemon Squeezy script');
      setError('Failed to load payment system. Please refresh the page and try again.');
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Payment timeout warning
  useEffect(() => {
    if (generatedDocs && !isPaid) {
      const timeout = setTimeout(() => {
        if (!isPaid) {
          alert('Still waiting for payment confirmation. If you completed payment, please wait a moment or contact support.');
        }
      }, 600000); // 10 minutes

      return () => clearTimeout(timeout);
    }
  }, [generatedDocs, isPaid]);

  const ucpList = [
    "California Unified Certification Program (CUCP)",
    "New York UCP - Empire State Development",
    "Texas UCP - TxDOT",
    "Florida UCP - FDOT",
    "Illinois UCP - IDOT",
    "Pennsylvania UCP - PennDOT",
    "Ohio UCP - ODOT",
    "Georgia UCP - GDOT",
    "North Carolina UCP - NCDOT",
    "Michigan UCP - MDOT",
    "Virginia UCP - VDOT",
    "Washington UCP - WSDOT",
    "Massachusetts UCP - MassDOT",
    "Arizona UCP - ADOT",
    "Tennessee UCP - TDOT",
    "Indiana UCP - INDOT",
    "Missouri UCP - MoDOT",
    "Maryland UCP - MDOT",
    "Wisconsin UCP - WisDOT",
    "Minnesota UCP - MnDOT",
    "Colorado UCP - CDOT",
    "Alabama UCP - ALDOT",
    "South Carolina UCP - SCDOT",
    "Louisiana UCP - DOTD",
    "Kentucky UCP - KYTC",
    "Oregon UCP - ODOT",
    "Oklahoma UCP - ODOT",
    "Connecticut UCP - CTDOT",
    "Utah UCP - UDOT",
    "Iowa UCP - Iowa DOT",
    "Nevada UCP - NDOT",
    "Arkansas UCP - ARDOT",
    "Kansas UCP - KDOT",
    "New Mexico UCP - NMDOT",
    "Nebraska UCP - NDOR",
    "West Virginia UCP - WVDOT",
    "Idaho UCP - ITD",
    "Hawaii UCP - HDOT",
    "New Hampshire UCP - NHDOT",
    "Maine UCP - MaineDOT",
    "Montana UCP - MDT",
    "Rhode Island UCP - RIDOT",
    "Delaware UCP - DelDOT",
    "South Dakota UCP - SDDOT",
    "North Dakota UCP - NDDOT",
    "Alaska UCP - ADOT&PF",
    "Vermont UCP - VTrans",
    "Wyoming UCP - WYDOT",
    "Other/Custom UCP"
  ];

  // Validation function
  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.companyName?.trim()) newErrors.companyName = "Company name is required";
      if (!formData.ownerName?.trim()) newErrors.ownerName = "Your name is required";
      if (!formData.industry?.trim()) newErrors.industry = "Industry is required";
      if (!formData.yearsInBusiness || formData.yearsInBusiness < 1) newErrors.yearsInBusiness = "Valid years in business required";
      if (!formData.annualRevenue || formData.annualRevenue < 1) newErrors.annualRevenue = "Valid annual revenue required";
      if (!formData.location?.trim()) newErrors.location = "Business location is required";
      if (!formData.ucpSelection) newErrors.ucpSelection = "Please select your UCP";
      if (formData.ucpSelection === 'Other/Custom UCP' && !formData.customUCP?.trim()) {
        newErrors.customUCP = "Please enter your UCP name";
      }
    }
    
    if (currentStep === 2) {
      const firstIncident = formData.socialIncidents[0];
      if (!firstIncident.date?.trim()) newErrors.incident0Date = "Date is required for first incident";
      if (!firstIncident.description?.trim() || firstIncident.description.length < 50) {
        newErrors.incident0Description = "Please provide at least 50 characters describing the incident";
      }
    }
    
    if (currentStep === 3) {
      if (!formData.financingBarriers?.trim() || formData.financingBarriers.length < 50) {
        newErrors.financingBarriers = "Please provide at least 50 characters about financing barriers";
      }
      if (!formData.contractLosses?.trim() || formData.contractLosses.length < 50) {
        newErrors.contractLosses = "Please provide at least 50 characters about contract losses";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Load draft function
  const loadDraft = () => {
    try {
      const savedData = localStorage.getItem('dbe_form_draft');
      const savedStep = localStorage.getItem('dbe_form_step');
      
      if (savedData) {
        setFormData(JSON.parse(savedData));
        setStep(parseInt(savedStep) || 0);
        setSavedDraftAvailable(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        trackDraftLoad();
        
        alert('✅ Draft restored! You can continue where you left off.');
      }
    } catch (error) {
      console.error('Error loading draft:', error);
      alert('Failed to load draft. Please start fresh.');
    }
  };

  // Clear draft function
  const clearDraft = () => {
    try {
      localStorage.removeItem('dbe_form_draft');
      localStorage.removeItem('dbe_form_step');
      localStorage.removeItem('dbe_form_timestamp');
      setSavedDraftAvailable(false);
      
      trackDraftCleared();
    } catch (error) {
      console.error('Error clearing draft:', error);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    trackFieldCompletion(field, value);
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const addIncident = () => {
    setFormData(prev => ({
      ...prev,
      socialIncidents: [...prev.socialIncidents, { date: '', description: '', impact: '' }]
    }));
    
    trackEvent('incident_added', {
      total_incidents: formData.socialIncidents.length + 1,
      step_number: step + 1
    });
  };

  const updateIncident = (index, field, value) => {
    const newIncidents = [...formData.socialIncidents];
    newIncidents[index][field] = value;
    setFormData(prev => ({ ...prev, socialIncidents: newIncidents }));
    
    trackFieldCompletion(`incident_${index}_${field}`, value);
    
    const errorKey = `incident${index}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: undefined }));
    }
  };

  const removeIncident = (index) => {
    if (formData.socialIncidents.length > 1) {
      const newIncidents = formData.socialIncidents.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, socialIncidents: newIncidents }));
      
      trackEvent('incident_removed', {
        incident_index: index,
        remaining_incidents: newIncidents.length,
        step_number: step + 1
      });
    }
  };

  // Helper function to create styled Word documents
  const createWordDocument = (title, content) => {
    const contentLines = content.split('\n').filter(line => line.trim());
    
    const documentParagraphs = [
      new Paragraph({
        text: title,
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 400 }
      }),
      
      new Paragraph({
        children: [new TextRun({ text: "" })],
        spacing: { after: 200 }
      }),
      
      ...contentLines.map(line => {
        const isHeading = (
          line.length < 60 && 
          (line === line.toUpperCase() || /^[\d.]+\s/.test(line))
        );
        
        if (isHeading) {
          return new Paragraph({
            children: [new TextRun({ text: line, bold: true, size: 26 })],
            spacing: { before: 300, after: 200 },
            alignment: AlignmentType.LEFT
          });
        } else {
          return new Paragraph({
            children: [new TextRun({ text: line, size: 24 })],
            spacing: { after: 200 },
            alignment: AlignmentType.LEFT
          });
        }
      })
    ];

    const doc = new Document({
      styles: {
        default: {
          document: {
            run: {
              font: "Arial",
              size: 24
            }
          }
        },
        paragraphStyles: [
          {
            id: "Title",
            name: "Title",
            basedOn: "Normal",
            run: {
              size: 56,
              bold: true,
              color: "000000",
              font: "Arial"
            },
            paragraph: {
              spacing: { before: 240, after: 240 },
              alignment: AlignmentType.CENTER
            }
          }
        ]
      },
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
        children: documentParagraphs
      }]
    });

    return doc;
  };

  // Download a single Word document
  const downloadAsWord = async (content, filename, title) => {
    try {
      const doc = createWordDocument(title, content);
      const blob = await Packer.toBlob(doc);
      saveAs(blob, filename.replace('.doc', '.docx'));
      
      trackEvent('document_download', {
        document_type: title,
        filename: filename,
        company_name: formData.companyName
      });
      
      console.log(`✅ Downloaded: ${filename}`);
    } catch (error) {
      console.error('Error creating Word document:', error);
      alert(`Error creating ${title}. Please try again.`);
    }
  };

  // Download all documents
  const downloadAllDocuments = async () => {
    if (!generatedDocs) {
      console.error('No documents to download');
      alert('No documents available to download.');
      return;
    }

    const companySlug = formData.companyName
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '') || 'DBE_Application';

    const documents = [
      {
        content: generatedDocs.coverLetter,
        filename: `${companySlug}_Cover_Letter.docx`,
        title: 'DBE Recertification Cover Letter'
      },
      {
        content: generatedDocs.narrative,
        filename: `${companySlug}_DBE_Narrative.docx`,
        title: 'DBE Narrative Statement'
      },
      {
        content: generatedDocs.checklist,
        filename: `${companySlug}_Documentation_Checklist.docx`,
        title: 'Supporting Documentation Checklist'
      },
      {
        content: generatedDocs.reviewSummary,
        filename: `${companySlug}_Review_Summary.docx`,
        title: 'Application Review Summary'
      }
    ];

    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i];
      
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      await downloadAsWord(doc.content, doc.filename, doc.title);
    }

    trackEvent('all_documents_download', {
      company_name: formData.companyName,
      total_documents: 4
    });

    alert('✅ All documents downloaded successfully! Open with Microsoft Word to edit.');
  };

  // REAL API CALL to generate documents
  const generateDocuments = async () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      alert('Please fill in all required fields before generating documents.');
      
      trackEvent('generation_validation_failed', {
        step_number: step + 1
      });
      
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGenerationProgress('Preparing your information...');
    
    trackEvent('document_generation_started', {
      step_number: step + 1,
      company_name: formData.companyName,
      industry: formData.industry,
      ucp: formData.ucpSelection
    });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setGenerationProgress('Sending data to AI for analysis...');
      
      // REAL API CALL!
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate documents');
      }

      setGenerationProgress('AI is crafting your professional narrative...');
      const data = await response.json();
      
      setGenerationProgress('Documents generated successfully!');
      
      setGeneratedDocs({
        preview: data.preview,
        narrative: data.narrative,
        coverLetter: data.coverLetter,
        checklist: data.checklist,
        reviewSummary: data.reviewSummary
      });
      
      trackEvent('document_generation_success', {
        step_number: step + 1,
        company_name: formData.companyName
      });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setGenerationProgress('');
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error('Generation error:', error);
      setError(error.message || 'Failed to generate documents. Please try again.');
      setGenerationProgress('');
      
      trackEvent('document_generation_failed', {
        step_number: step + 1,
        error_message: error.message
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const checkoutUrl = LEMON_SQUEEZY_CHECKOUT_URL;

  // Reusable form components
  const FormInput = ({ label, field, type = "text", required = false, placeholder = "", rows = 3 }) => (
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

  const FormSelect = ({ label, field, options, required = false }) => (
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

  const steps = [
    {
      title: 'Welcome',
      icon: Shield,
      subtitle: 'New DBE Certification Requirements',
      content: (
        <div className="space-y-6">
          {savedDraftAvailable && (
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-xl border-2 border-blue-400 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Save size={32} />
                  <div>
                    <h3 className="font-bold text-lg">Saved Draft Found!</h3>
                    <p className="text-blue-100 text-sm">Continue where you left off</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={loadDraft}
                    className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                  >
                    Restore Draft
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Start fresh? Your saved draft will be deleted.')) {
                        clearDraft();
                        setSavedDraftAvailable(false);
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
                  >
                    Start Fresh
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border-2 border-blue-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Sparkles className="text-blue-600" size={32} />
              DBE Narrative Pro - AI-Enhanced Documents
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Generate professional DBE recertification documents compliant with the October 2025 regulations. 
              Our AI creates personalized narratives, cover letters, and checklists based on your specific circumstances.
            </p>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h4 className="font-bold text-xl text-gray-900 mb-4">What's Included - $149 One-Time Payment:</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <span>Professional narrative statement (4-6 pages)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <span>Personalized cover letter</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <span>Complete documentation checklist</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <span>Application review summary</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <span>All documents as editable Word files</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <span>Saves $1,500-3,000 vs consultants</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-blue-200 p-6 rounded-xl hover:shadow-xl transition-all hover:border-blue-400">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Sparkles className="text-white" size={28} />
              </div>
              <h4 className="font-bold text-lg mb-2">AI-Powered</h4>
              <p className="text-gray-600 text-sm">Professional-grade documents customized to your unique story and circumstances</p>
            </div>
            
            <div className="bg-white border-2 border-green-200 p-6 rounded-xl hover:shadow-xl transition-all hover:border-green-400">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Shield className="text-white" size={28} />
              </div>
              <h4 className="font-bold text-lg mb-2">Regulation Compliant</h4>
              <p className="text-gray-600 text-sm">Meets all requirements under 49 CFR Part 26 as amended October 2025</p>
            </div>

            <div className="bg-white border-2 border-amber-200 p-6 rounded-xl hover:shadow-xl transition-all hover:border-amber-400">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <FileText className="text-white" size={28} />
              </div>
              <h4 className="font-bold text-lg mb-2">Fully Editable</h4>
              <p className="text-gray-600 text-sm">Download as Word documents and customize as needed before submission</p>
            </div>
          </div>

          <div className="bg-amber-50 border-2 border-amber-300 p-6 rounded-xl">
            <div className="flex gap-3">
              <AlertCircle className="text-amber-600 flex-shrink-0" size={28} />
              <div>
                <h4 className="font-bold text-amber-900 mb-3 text-lg">What You'll Need:</h4>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>30-45 minutes to complete the questionnaire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Specific examples of discrimination or barriers you've faced</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Business financial information and records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Details about your UCP (Unified Certification Program)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-xl border-2 border-gray-200">
            <h4 className="font-bold text-2xl mb-6 text-gray-900 text-center">How It Works</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-lg">1</div>
                <div>
                  <h5 className="font-bold text-gray-900 mb-1">Complete Questionnaire</h5>
                  <p className="text-gray-600 text-sm">Answer guided questions about your business and experiences</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-lg">2</div>
                <div>
                  <h5 className="font-bold text-gray-900 mb-1">AI Generates Documents</h5>
                  <p className="text-gray-600 text-sm">Our AI creates professional narrative and supporting documents</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-lg">3</div>
                <div>
                  <h5 className="font-bold text-gray-900 mb-1">Preview & Purchase</h5>
                  <p className="text-gray-600 text-sm">See a preview, then unlock complete package for $149</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-lg">4</div>
                <div>
                  <h5 className="font-bold text-gray-900 mb-1">Download & Submit</h5>
                  <p className="text-gray-600 text-sm">Download Word documents and submit to your UCP with confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Business Profile',
      icon: Building2,
      subtitle: 'Tell us about your company',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
            <p className="text-sm text-blue-900 font-semibold">
              💼 This information helps us personalize your documents
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormInput label="Company Name" field="companyName" required placeholder="ABC Construction LLC" />
            <FormInput label="Your Full Name" field="ownerName" required placeholder="John Smith" />
          </div>

          <FormInput label="Industry/Specialization" field="industry" required placeholder="Heavy Highway Construction, Electrical Contracting, etc." />

          <div className="grid md:grid-cols-2 gap-6">
            <FormInput label="Years in Business" field="yearsInBusiness" type="number" required placeholder="8" />
            <FormInput label="Annual Revenue" field="annualRevenue" required placeholder="1250000" />
          </div>

          <FormInput label="Primary Business Location" field="location" required placeholder="123 Main St, Sacramento, CA 95814" />

          <FormSelect 
            label="Your UCP (Unified Certification Program)" 
            field="ucpSelection" 
            options={['', ...ucpList]} 
            required 
          />

          {formData.ucpSelection === 'Other/Custom UCP' && (
            <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-xl">
              <FormInput label="Enter UCP Name" field="customUCP" required placeholder="Your UCP Name" />
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Social Disadvantage',
      icon: Users,
      subtitle: 'Document incidents of discrimination',
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-xl">
            <p className="text-sm text-purple-900 font-semibold">
              📝 Under the new 2025 regulations, you must provide specific, individualized examples of social disadvantage. Be detailed and include dates, locations, and impacts.
            </p>
          </div>

          {formData.socialIncidents.map((incident, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg text-gray-900">Incident {idx + 1}</h4>
                {formData.socialIncidents.length > 1 && (
                  <button
                    onClick={() => removeIncident(idx)}
                    className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Date {idx === 0 && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="date"
                    value={incident.date}
                    onChange={(e) => updateIncident(idx, 'date', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                      errors[`incident${idx}Date`] ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                    }`}
                  />
                  {errors[`incident${idx}Date`] && (
                    <p className="text-red-500 text-sm mt-1 font-semibold">{errors[`incident${idx}Date`]}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Detailed Description {idx === 0 && <span className="text-red-500">*</span>}
                  </label>
                  <textarea
                    rows={6}
                    value={incident.description}
                    onChange={(e) => updateIncident(idx, 'description', e.target.value)}
                    placeholder="Describe what happened, who was involved, where it occurred, and any witnesses. Be specific about discriminatory comments, actions, or treatment..."
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                      errors[`incident${idx}Description`] ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                    }`}
                  />
                  {errors[`incident${idx}Description`] && (
                    <p className="text-red-500 text-sm mt-1 font-semibold">{errors[`incident${idx}Description`]}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Character count: {incident.description.length} {idx === 0 && '(minimum 50 required)'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Impact on Your Business</label>
                  <textarea
                    rows={3}
                    value={incident.impact}
                    onChange={(e) => updateIncident(idx, 'impact', e.target.value)}
                    placeholder="How did this incident affect your business? (lost contracts, reduced opportunities, financial impact, etc.)"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-purple-300 transition-all"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addIncident}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg"
          >
            <CheckCircle size={20} />
            Add Another Incident
          </button>
        </div>
      )
    },
    {
      title: 'Economic Disadvantage',
      icon: DollarSign,
      subtitle: 'Describe financial barriers',
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
            <p className="text-sm text-green-900 font-semibold">
              💰 Document specific economic barriers that have affected your business growth and competitiveness
            </p>
          </div>

          <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
            <FormInput 
              label="Financing Barriers" 
              field="financingBarriers" 
              type="textarea" 
              required 
              placeholder="Describe difficulties obtaining loans, lines of credit, or financing. Include bank names, dates, amounts requested, and reasons for denial..."
              rows={5}
            />
          </div>

          <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
            <FormInput 
              label="Bonding Challenges" 
              field="bondingChallenges" 
              type="textarea" 
              placeholder="Describe difficulties obtaining bonding, including surety companies contacted, amounts needed, and barriers faced..."
              rows={4}
            />
          </div>

          <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
            <FormInput 
              label="Insurance Challenges" 
              field="insuranceChallenges" 
              type="textarea" 
              placeholder="Describe difficulties obtaining insurance coverage, high premiums, or coverage limitations..."
              rows={4}
            />
          </div>

          <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
            <FormInput 
              label="Contract Losses Due to Disadvantage" 
              field="contractLosses" 
              type="textarea" 
              required 
              placeholder="Describe contracts you lost or were unable to bid on due to your disadvantaged status. Include project names, values, and reasons..."
              rows={5}
            />
          </div>

          <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
            <FormInput 
              label="Market Disadvantages" 
              field="marketDisadvantages" 
              type="textarea" 
              placeholder="Describe barriers to market entry, difficulties establishing business relationships, or discrimination from prime contractors..."
              rows={4}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Generate & Pay',
      icon: Eye,
      subtitle: 'Review preview and unlock documents',
      content: (
        <div className="space-y-6">
          {!generatedDocs && !isGenerating && (
            <div className="text-center py-12">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-12 rounded-2xl">
                <Sparkles className="text-blue-600 mx-auto mb-6" size={64} />
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Generate Your Documents!</h3>
                <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                  Click below to have our AI analyze your information and create professional DBE recertification documents 
                  tailored to your specific circumstances. This takes about 30-60 seconds.
                </p>
                
                {error && (
                  <div className="bg-red-50 border-2 border-red-300 text-red-800 p-4 rounded-xl mb-6">
                    <AlertCircle className="inline mr-2" size={20} />
                    {error}
                  </div>
                )}
                
                <button
                  onClick={generateDocuments}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-6 px-12 rounded-xl text-xl flex items-center justify-center gap-3 mx-auto shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles size={28} />
                  Generate My Documents with AI
                </button>
                
                <p className="text-gray-500 text-sm mt-6">
                  You'll see a preview before paying anything
                </p>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="text-center py-12">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 p-12 rounded-2xl">
                <div className="flex items-center justify-center mb-6">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Creating Your Documents...</h3>
                <p className="text-gray-600 text-lg mb-2">{generationProgress}</p>
                <p className="text-gray-500 text-sm">This usually takes 30-60 seconds</p>
              </div>
            </div>
          )}

          {generatedDocs && !isPaid && (
            <>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-2xl shadow-2xl">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <CheckCircle size={48} />
                  <h3 className="text-3xl font-bold">Documents Generated Successfully!</h3>
                </div>
                <p className="text-center text-green-100 text-lg mb-6">
                  Your professional DBE recertification package is ready. Preview below, then unlock for $149 to download all documents.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 p-8 rounded-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="text-blue-600" size={32} />
                  <h3 className="text-2xl font-bold text-gray-900">Document Preview</h3>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-300 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">{generatedDocs.preview}</pre>
                </div>
                <p className="text-gray-600 text-sm mt-4 text-center">
                  This is a preview of your narrative statement. The full package includes 4 complete Word documents.
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-8 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-2">Unlock Your Complete Package</h3>
                  <p className="text-amber-100 text-lg">Get all 4 professionally crafted documents as editable Word files</p>
                </div>

                <div className="bg-white/20 backdrop-blur p-6 rounded-xl mb-8">
                  <h4 className="font-bold text-xl mb-4">What You Get:</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={20} />
                      <span>DBE Narrative Statement (4-6 pages)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={20} />
                      <span>Professional Cover Letter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={20} />
                      <span>Complete Documentation Checklist</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={20} />
                      <span>Application Review Summary</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 text-center">
                  <div className="mb-6">
                    <p className="text-5xl font-bold text-orange-600 mb-2">$149</p>
                    <p className="text-gray-600 text-lg">One-time payment • Instant access</p>
                    <p className="text-green-600 font-bold mt-2">Save $1,500-3,000 vs hiring a consultant</p>
                  </div>

                  <a
                    href={checkoutUrl}
                    onClick={() => trackPaymentInitiated()}
                    className="lemonsqueezy-button inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-5 px-12 rounded-xl text-xl shadow-2xl transition-all transform hover:scale-105"
                  >
                    <CreditCard size={28} />
                    Unlock Documents - Pay $149
                  </a>

                  <p className="text-gray-600 text-sm mt-6">
                    Secure checkout powered by Lemon Squeezy • Instant download after payment
                  </p>
                </div>
              </div>
            </>
          )}

          {generatedDocs && isPaid && (
            <>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-2xl shadow-2xl text-center">
                <CheckCircle className="mx-auto mb-4" size={64} />
                <h3 className="text-4xl font-bold mb-3">🎉 Payment Successful!</h3>
                <p className="text-xl text-green-100 mb-6">
                  Your complete document package is now unlocked and ready to download!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-6 rounded-xl hover:shadow-xl transition-all">
                  <h4 className="font-bold text-lg mb-2 text-gray-900">Narrative Statement</h4>
                  <p className="text-sm text-gray-600 mb-4">Your personalized 4-6 page narrative</p>
                  <button
                    onClick={() => downloadAsWord(
                      generatedDocs.narrative, 
                      `${formData.companyName.replace(/\s+/g, '_')}_Narrative.docx`,
                      'DBE Narrative Statement'
                    )}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <Download size={18} />
                    Download Word Doc
                  </button>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-6 rounded-xl hover:shadow-xl transition-all">
                  <h4 className="font-bold text-lg mb-2 text-gray-900">Cover Letter</h4>
                  <p className="text-sm text-gray-600 mb-4">Professional introduction letter</p>
                  <button
                    onClick={() => downloadAsWord(
                      generatedDocs.coverLetter, 
                      `${formData.companyName.replace(/\s+/g, '_')}_Cover_Letter.docx`,
                      'DBE Recertification Cover Letter'
                    )}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <Download size={18} />
                    Download Word Doc
                  </button>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 p-6 rounded-xl hover:shadow-xl transition-all">
                  <h4 className="font-bold text-lg mb-2 text-gray-900">Documentation Checklist</h4>
                  <p className="text-sm text-gray-600 mb-4">Complete list of required documents</p>
                  <button
                    onClick={() => downloadAsWord(
                      generatedDocs.checklist, 
                      `${formData.companyName.replace(/\s+/g, '_')}_Checklist.docx`,
                      'Supporting Documentation Checklist'
                    )}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <Download size={18} />
                    Download Word Doc
                  </button>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 p-6 rounded-xl hover:shadow-xl transition-all">
                  <h4 className="font-bold text-lg mb-2 text-gray-900">Review Summary</h4>
                  <p className="text-sm text-gray-600 mb-4">Pre-submission checklist and tips</p>
                  <button
                    onClick={() => downloadAsWord(
                      generatedDocs.reviewSummary, 
                      `${formData.companyName.replace(/\s+/g, '_')}_Review.docx`,
                      'Application Review Summary'
                    )}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <Download size={18} />
                    Download Word Doc
                  </button>
                </div>
              </div>

              <button
                onClick={downloadAllDocuments}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-5 px-8 rounded-xl flex items-center justify-center gap-3 shadow-2xl transition-all transform hover:scale-105 text-lg"
              >
                <Download size={28} />
                Download All 4 Documents at Once
              </button>

              <div className="bg-blue-50 border-2 border-blue-300 p-8 rounded-xl">
                <h4 className="font-bold text-blue-900 mb-4 text-xl flex items-center gap-2">
                  <CheckCircle className="text-blue-600" size={24} />
                  Next Steps:
                </h4>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-500 text-white w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">1</span>
                    <span>Open each Word document and review for accuracy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-500 text-white w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">2</span>
                    <span>Edit and customize in Microsoft Word as needed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-500 text-white w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">3</span>
                    <span>Gather all supporting documentation per the checklist</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-500 text-white w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">4</span>
                    <span>Sign and date the narrative statement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-500 text-white w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">5</span>
                    <span>Submit complete package to your UCP</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-500 text-white w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">6</span>
                    <span>Follow up within 10 business days to confirm receipt</span>
                  </li>
                </ol>
              </div>

              <div className="bg-green-50 border-2 border-green-300 p-6 rounded-xl text-center">
                <h4 className="font-bold text-green-900 text-xl mb-2">✅ Good luck with your DBE recertification!</h4>
                <p className="text-gray-700">
                  Your AI-enhanced application package gives you the best chance for approval under the new 2025 standards.
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
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>DBE Narrative Pro - AI-Generated DBE Certification Documents | 2025 Compliant</title>
        <meta name="description" content="Generate professional DBE recertification documents with AI. Get narrative statement, cover letter, checklist & review summary for $149. Compliant with October 2025 regulations (49 CFR Part 26)." />
        <meta name="keywords" content="DBE certification, DBE narrative, DBE recertification 2025, disadvantaged business enterprise, 49 CFR Part 26, DOT certification, UCP application, AI document generation, DBE consultant alternative" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="DBE Narrative Pro - AI-Generated DBE Certification Documents" />
        <meta property="og:description" content="Professional DBE recertification package for $149. Save $1,500-3,000 vs consultants. Compliant with 2025 regulations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dbenarrativepro.com/narrative" />
        <meta property="og:image" content="https://dbenarrativepro.com/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DBE Narrative Pro - AI DBE Certification Documents" />
        <meta name="twitter:description" content="Generate professional DBE documents with AI for $149. 2025 regulation compliant." />
        
        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "DBE Narrative Pro",
            "description": "AI-powered DBE certification document generation service. Creates professional narrative statements, cover letters, and checklists compliant with 2025 DOT regulations.",
            "offers": {
              "@type": "Offer",
              "url": "https://dbenarrativepro.com/narrative",
              "priceCurrency": "USD",
              "price": "149.00",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "DBE Narrative Pro"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127"
            }
          })}
        </script>

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://dbenarrativepro.com/narrative" />
        <meta name="author" content="DBE Narrative Pro" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Enhanced Header with gradient */}
        <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-2xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl blur-lg opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                    <Shield size={32} />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                    DBE Narrative Pro
                  </h1>
                  <p className="text-blue-200 text-sm">AI-Enhanced DBE Certification Documents</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/home')}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all border border-white/20"
                >
                  <Home size={18} />
                  <span className="hidden md:inline">Home</span>
                </button>
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-2 rounded-xl font-bold shadow-lg">
                  2025 Compliant
                </div>
                {step > 0 && step < 4 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Clear saved draft? Your progress will be lost.')) {
                        clearDraft();
                        window.location.reload();
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl font-semibold flex items-center gap-2 text-sm transition-all shadow-lg"
                    title="Clear saved draft"
                  >
                    <Trash2 size={16} />
                    <span className="hidden md:inline">Clear Draft</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

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
                    setStep(Math.min(steps.length - 1, step + 1));
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
            <p className="mt-1 text-xs">Compliant with 49 CFR Part 26 (Updated October 2025)</p>
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