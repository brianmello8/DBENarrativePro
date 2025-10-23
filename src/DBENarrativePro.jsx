import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Download, FileText, AlertCircle, CheckCircle, Building2, DollarSign, Users, Shield, Eye, CreditCard, Trash2, Save } from 'lucide-react';

const DBENarrativePro = () => {
  const [step, setStep] = useState(0);
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
  
  // Validation and error states
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [generationProgress, setGenerationProgress] = useState('');
  const [savedDraftAvailable, setSavedDraftAvailable] = useState(false);

  // ============================================
  // TODO: REPLACE THESE WITH YOUR REAL VALUES
  // ============================================
  const LEMON_SQUEEZY_VARIANT_ID = "1052337";
  const LEMON_SQUEEZY_PRODUCT_ID = "669645";
  const GA4_MEASUREMENT_ID = "G-TSQ6RSD1T4; // TODO: Replace with your GA4 Measurement ID"
  // ============================================

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
    // Only track when field has meaningful content
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
        
        // Track draft save
        trackDraftSave();
      } catch (error) {
        console.error('Error saving draft:', error);
      }
    };

    // Debounce save - only save after 2 seconds of no changes
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
          
          // Only offer to restore if less than 7 days old
          if (hoursSinceSave < 168) {
            setSavedDraftAvailable(true);
          } else {
            // Clear old drafts
            clearDraft();
          }
        }
      } catch (error) {
        console.error('Error checking for draft:', error);
      }
    };

    checkForDraft();
  }, []);

  // Check if user already paid (restore from localStorage)
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
    // Load Lemon Squeezy script
    const script = document.createElement('script');
    <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      console.log('✅ Lemon Squeezy script loaded');
      
      // Initialize Lemon Squeezy
      if (window.createLemonSqueezy) {
        window.createLemonSqueezy();
      }

      // Setup official event handler
      if (window.LemonSqueezy) {
        window.LemonSqueezy.Setup({
          eventHandler: (event) => {
            console.log('📨 Lemon Squeezy event:', event);
            
            // Payment successful!
            if (event.event === 'Checkout.Success') {
              console.log('🎉 Payment successful!', event);
              
              // Mark as paid
              setIsPaid(true);
              
              // Store in localStorage
              try {
                localStorage.setItem('dbe_narrative_paid', 'true');
                localStorage.setItem('dbe_narrative_payment_date', new Date().toISOString());
                
                // Store order ID if available
                if (event.data?.order_id) {
                  localStorage.setItem('dbe_order_id', event.data.order_id);
                  console.log('💾 Stored order ID:', event.data.order_id);
                  
                  // Track payment success in GA4
                  trackPaymentSuccess(event.data.order_id);
                }
              } catch (error) {
                console.error('Error storing payment status:', error);
              }
              
              // Scroll to top
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
              
              // Show success message
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
    
    if (currentStep === 1) { // Business Profile
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
    
    if (currentStep === 2) { // Social Disadvantage
      const firstIncident = formData.socialIncidents[0];
      if (!firstIncident.date?.trim()) newErrors.incident0Date = "Date is required for first incident";
      if (!firstIncident.description?.trim() || firstIncident.description.length < 50) {
        newErrors.incident0Description = "Please provide at least 50 characters describing the incident";
      }
    }
    
    if (currentStep === 3) { // Economic Disadvantage
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

  // Load draft function with analytics
  const loadDraft = () => {
    try {
      const savedData = localStorage.getItem('dbe_form_draft');
      const savedStep = localStorage.getItem('dbe_form_step');
      
      if (savedData) {
        setFormData(JSON.parse(savedData));
        setStep(parseInt(savedStep) || 0);
        setSavedDraftAvailable(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Track draft load
        trackDraftLoad();
        
        alert('✅ Draft restored! You can continue where you left off.');
      }
    } catch (error) {
      console.error('Error loading draft:', error);
      alert('Failed to load draft. Please start fresh.');
    }
  };

  // Clear draft function with analytics
  const clearDraft = () => {
    try {
      localStorage.removeItem('dbe_form_draft');
      localStorage.removeItem('dbe_form_step');
      localStorage.removeItem('dbe_form_timestamp');
      setSavedDraftAvailable(false);
      
      // Track draft clear
      trackDraftCleared();
    } catch (error) {
      console.error('Error clearing draft:', error);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Track field completion in GA4
    trackFieldCompletion(field, value);
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const addIncident = () => {
    setFormData(prev => ({
      ...prev,
      socialIncidents: [...prev.socialIncidents, { date: '', description: '', impact: '' }]
    }));
    
    // Track incident addition
    trackEvent('incident_added', {
      total_incidents: formData.socialIncidents.length + 1,
      step_number: step + 1
    });
  };

  const updateIncident = (index, field, value) => {
    const newIncidents = [...formData.socialIncidents];
    newIncidents[index][field] = value;
    setFormData(prev => ({ ...prev, socialIncidents: newIncidents }));
    
    // Track incident field completion
    trackFieldCompletion(`incident_${index}_${field}`, value);
    
    // Clear error for this incident field
    const errorKey = `incident${index}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: undefined }));
    }
  };

  const removeIncident = (index) => {
    if (formData.socialIncidents.length > 1) {
      const newIncidents = formData.socialIncidents.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, socialIncidents: newIncidents }));
      
      // Track incident removal
      trackEvent('incident_removed', {
        incident_index: index,
        remaining_incidents: newIncidents.length,
        step_number: step + 1
      });
    }
  };

  // Convert text to RTF format (Word-compatible)
  const textToRTF = (title, content) => {
    const escapeRTF = (text) => {
      return text
        .replace(/\\/g, '\\\\')
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/\n/g, '\\par\n');
    };

    const rtfContent = escapeRTF(content);
    const rtfTitle = escapeRTF(title);

    return `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\fnil\\fcharset0 Calibri;}{\\f1\\fnil\\fcharset0 Arial;}}
{\\colortbl;\\red0\\green0\\blue0;\\red0\\green0\\blue255;}
\\viewkind4\\uc1\\pard\\sa200\\sl276\\slmult1\\f0\\fs22

{\\pard\\qc\\b\\fs32 ${rtfTitle}\\par}
\\par
${rtfContent}
}`;
  };

  // REAL API CALL to generate documents with analytics
  const generateDocuments = async () => {
    // Validate all required fields before generating
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      alert('Please fill in all required fields before generating documents.');
      
      // Track validation failure
      trackEvent('generation_validation_failed', {
        step_number: step + 1
      });
      
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGenerationProgress('Preparing your information...');
    
    // Track generation start
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
      
      // Track successful generation
      trackEvent('document_generation_success', {
        step_number: step + 1,
        company_name: formData.companyName
      });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setGenerationProgress('');
      
      // Scroll to top to see the preview
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error('Generation error:', error);
      setError(error.message || 'Failed to generate documents. Please try again.');
      setGenerationProgress('');
      
      // Track generation failure
      trackEvent('document_generation_failed', {
        step_number: step + 1,
        error_message: error.message
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Download as Word-compatible RTF file with analytics
  const downloadAsWord = (content, filename, title) => {
    const rtfContent = textToRTF(title, content);
    const blob = new Blob([rtfContent], { type: 'application/rtf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.replace('.txt', '.doc');
    a.click();
    URL.revokeObjectURL(url);
    
    // Track individual document download
    trackEvent('document_download', {
      document_type: title,
      filename: filename,
      company_name: formData.companyName
    });
  };

  const downloadAllDocuments = () => {
    const companySlug = formData.companyName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '') || 'DBE_Application';
    
    downloadAsWord(generatedDocs.coverLetter, `${companySlug}_Cover_Letter.doc`, 'DBE Recertification Cover Letter');
    downloadAsWord(generatedDocs.narrative, `${companySlug}_DBE_Narrative.doc`, 'DBE Narrative Statement');
    downloadAsWord(generatedDocs.checklist, `${companySlug}_Documentation_Checklist.doc`, 'Supporting Documentation Checklist');
    downloadAsWord(generatedDocs.reviewSummary, `${companySlug}_Review_Summary.doc`, 'Application Review Summary');
    
    // Track download all
    trackEvent('all_documents_download', {
      company_name: formData.companyName,
      total_documents: 4
    });
    
    alert('All documents downloaded successfully! Open with Microsoft Word to edit.');
  };

  // TODO: Replace with your actual subdomain and variant ID
  const checkoutUrl = `https://dbenarrativepro.lemonsqueezy.com/checkout/buy/${LEMON_SQUEEZY_PRODUCT_ID}?variant=${LEMON_SQUEEZY_VARIANT_ID}&embed=1`

  const steps = [
    {
      title: 'Welcome',
      icon: Shield,
      subtitle: 'New DBE Certification Requirements',
      content: (
        <div className="space-y-6">
          {savedDraftAvailable && (
            <div className="bg-blue-50 border-2 border-blue-300 p-6 rounded-xl">
              <div className="flex items-start gap-3">
                <Save className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                <div className="flex-1">
                  <h4 className="font-bold text-blue-900 mb-2">Saved Draft Found!</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    We found a saved draft from a previous session. Would you like to continue where you left off?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={loadDraft}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      Continue Draft
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete saved draft and start fresh?')) {
                          clearDraft();
                        }
                      }}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg"
                    >
                      Start Fresh
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Important Regulatory Update - October 2025</h2>
            <p className="text-blue-50 leading-relaxed">
              The DOT has eliminated race and gender-based presumptions of disadvantage. All DBE applicants 
              must now provide <strong>individualized proof</strong> of social and economic disadvantage through 
              detailed narratives and supporting documentation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-blue-100 p-6 rounded-lg hover:border-blue-300 transition-colors">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FileText className="text-blue-600" size={24} />
              </div>
              <h4 className="font-bold text-lg mb-2">Professional Documents</h4>
              <p className="text-gray-600 text-sm">Generate compliant narratives, cover letters, and checklists formatted for UCP submission</p>
            </div>
            
            <div className="bg-white border-2 border-amber-100 p-6 rounded-lg hover:border-amber-300 transition-colors">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-amber-600" size={24} />
              </div>
              <h4 className="font-bold text-lg mb-2">AI-Enhanced</h4>
              <p className="text-gray-600 text-sm">Advanced AI transforms your experiences into compelling, legally-sound narratives</p>
            </div>
            
            <div className="bg-white border-2 border-green-100 p-6 rounded-lg hover:border-green-300 transition-colors">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-green-600" size={24} />
              </div>
              <h4 className="font-bold text-lg mb-2">Regulation Compliant</h4>
              <p className="text-gray-600 text-sm">Meets all new requirements under 49 CFR Part 26 as amended October 2025</p>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
            <div className="flex gap-3">
              <AlertCircle className="text-amber-600 flex-shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-amber-900 mb-2">What You'll Need</h4>
                <ul className="text-sm text-amber-900 space-y-1">
                  <li>• 30-45 minutes to complete the process</li>
                  <li>• Specific examples of discrimination or barriers faced</li>
                  <li>• Business financial information and records</li>
                  <li>• Details about your UCP (Unified Certification Program)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h4 className="font-semibold mb-3 text-gray-900">How DBE Narrative Pro Works:</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                <p className="text-sm text-gray-700">Complete guided questionnaire with your business information and experiences</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                <p className="text-sm text-gray-700">AI generates professional narrative statement and supporting documents</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                <p className="text-sm text-gray-700">Preview your documents, then unlock complete package for $149</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
                <p className="text-sm text-gray-700">Download Word documents and submit to your UCP with confidence</p>
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
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Company Name *</label>
              <input
                type="text"
                className={`w-full border-2 rounded-lg p-3 focus:outline-none transition-colors ${
                  errors.companyName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="ABC Construction LLC"
                value={formData.companyName}
                onChange={(e) => updateFormData('companyName', e.target.value)}
              />
              {errors.companyName && (
                <p className="text-red-600 text-sm mt-1">{errors.companyName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Your Full Name *</label>
              <input
                type="text"
                className={`w-full border-2 rounded-lg p-3 focus:outline-none transition-colors ${
                  errors.ownerName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="John Smith"
                value={formData.ownerName}
                onChange={(e) => updateFormData('ownerName', e.target.value)}
              />
              {errors.ownerName && (
                <p className="text-red-600 text-sm mt-1">{errors.ownerName}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">As business owner</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Industry/Specialization *</label>
            <input
              type="text"
              className={`w-full border-2 rounded-lg p-3 focus:outline-none transition-colors ${
                errors.industry ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Heavy Highway Construction, Electrical Contracting, etc."
              value={formData.industry}
              onChange={(e) => updateFormData('industry', e.target.value)}
            />
            {errors.industry && (
              <p className="text-red-600 text-sm mt-1">{errors.industry}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Years in Business *</label>
              <input
                type="number"
                className={`w-full border-2 rounded-lg p-3 focus:outline-none transition-colors ${
                  errors.yearsInBusiness ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="8"
                value={formData.yearsInBusiness}
                onChange={(e) => updateFormData('yearsInBusiness', e.target.value)}
              />
              {errors.yearsInBusiness && (
                <p className="text-red-600 text-sm mt-1">{errors.yearsInBusiness}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Annual Revenue *</label>
              <input
                type="text"
                className={`w-full border-2 rounded-lg p-3 focus:outline-none transition-colors ${
                  errors.annualRevenue ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="1250000"
                value={formData.annualRevenue}
                onChange={(e) => updateFormData('annualRevenue', e.target.value)}
              />
              {errors.annualRevenue && (
                <p className="text-red-600 text-sm mt-1">{errors.annualRevenue}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Enter without $ or commas</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Primary Business Location *</label>
            <input
              type="text"
              className={`w-full border-2 rounded-lg p-3 focus:outline-none transition-colors ${
                errors.location ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="123 Main St, Sacramento, CA 95814"
              value={formData.location}
              onChange={(e) => updateFormData('location', e.target.value)}
            />
            {errors.location && (
              <p className="text-red-600 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Your UCP (Unified Certification Program) *</label>
            <select
              className={`w-full border-2 rounded-lg p-3 focus:outline-none transition-colors ${
                errors.ucpSelection ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              value={formData.ucpSelection}
              onChange={(e) => updateFormData('ucpSelection', e.target.value)}
            >
              <option value="">Select your UCP...</option>
              {ucpList.map((ucp, idx) => (
                <option key={idx} value={ucp}>{ucp}</option>
              ))}
            </select>
            {errors.ucpSelection && (
              <p className="text-red-600 text-sm mt-1">{errors.ucpSelection}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">The certification program where you will submit this application</p>
          </div>

          {formData.ucpSelection === 'Other/Custom UCP' && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <label className="block text-sm font-bold mb-2 text-gray-700">Enter UCP Name *</label>
              <input
                type="text"
                className={`w-full border-2 rounded-lg p-3 focus:outline-none transition-colors ${
                  errors.customUCP ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Full name of your certification program"
                value={formData.customUCP}
                onChange={(e) => updateFormData('customUCP', e.target.value)}
              />
              {errors.customUCP && (
                <p className="text-red-600 text-sm mt-1">{errors.customUCP}</p>
              )}
            </div>
          )}

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> This information will be used to properly address your application and generate accurate submission documents. Your progress is automatically saved.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Social Disadvantage',
      icon: Users,
      subtitle: 'Document specific incidents and experiences',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-amber-900 mb-2">Critical Guidance</h4>
            <p className="text-sm text-amber-900 mb-3">
              Document <strong>specific incidents</strong> where you experienced discrimination or bias. 
              The new standards require concrete examples, not general statements.
            </p>
            <ul className="text-sm text-amber-900 space-y-1">
              <li>✓ Include dates, locations, and names (where appropriate)</li>
              <li>✓ Describe what happened and why it was discriminatory</li>
              <li>✓ Explain the business impact (lost revenue, missed opportunities)</li>
              <li>✓ Be specific: "$52,000 higher bid" not "much higher"</li>
            </ul>
          </div>

          {formData.socialIncidents.map((incident, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-lg text-gray-900">Incident {index + 1}</h4>
                {formData.socialIncidents.length > 1 && (
                  <button
                    onClick={() => removeIncident(index)}
                    className="text-red-600 hover:text-red-700 text-sm font-semibold"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">
                    Date or Time Period {index === 0 && '*'}
                  </label>
                  <input
                    type="text"
                    className={`w-full border-2 rounded-lg p-3 focus:outline-none transition-colors ${
                      errors[`incident${index}Date`] ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="March 2023"
                    value={incident.date}
                    onChange={(e) => updateIncident(index, 'date', e.target.value)}
                  />
                  {errors[`incident${index}Date`] && (
                    <p className="text-red-600 text-sm mt-1">{errors[`incident${index}Date`]}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">
                    Describe the Incident {index === 0 && '*'}
                  </label>
                  <textarea
                    className={`w-full border-2 rounded-lg p-3 focus:outline-none transition-colors ${
                      errors[`incident${index}Description`] ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    rows={5}
                    placeholder="Example: In March 2023, I submitted the lowest qualified bid ($487,000) for State Highway Project SR-125. Despite being properly bonded and meeting all technical requirements, the contract was awarded to a firm with a bid $52,000 higher..."
                    value={incident.description}
                    onChange={(e) => updateIncident(index, 'description', e.target.value)}
                  />
                  {errors[`incident${index}Description`] && (
                    <p className="text-red-600 text-sm mt-1">{errors[`incident${index}Description`]}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {incident.description.length} characters {incident.description.length < 50 && '(minimum 50)'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">
                    Impact on Your Business
                  </label>
                  <textarea
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                    rows={3}
                    placeholder="Example: This loss of a $487,000 contract directly cost my business approximately $73,000 in potential profit..."
                    value={incident.impact}
                    onChange={(e) => updateIncident(index, 'impact', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addIncident}
            className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-4 px-6 rounded-lg border-2 border-blue-200 transition-colors flex items-center justify-center gap-2"
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
      subtitle: 'Demonstrate financial barriers and impacts',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-2">Economic Disadvantage Requirements</h4>
            <p className="text-sm text-blue-900">
              Describe the <strong>economic barriers</strong> you've faced. Focus on measurable impacts: 
              higher costs, denied financing, lost contracts, or limited growth.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Access to Capital and Financing *
            </label>
            <textarea
              className={`w-full border-2 rounded-lg p-3 focus:outline-none transition-colors ${
                errors.financingBarriers ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              rows={5}
              placeholder="Example: In 2024, I applied for a $500,000 line of credit at three regional banks. Despite maintaining 18 consecutive months of positive cash flow, I was offered interest rates ranging from 12-14%. Industry colleagues with comparable financials reported securing similar financing at 7-9% rates..."
              value={formData.financingBarriers}
              onChange={(e) => updateFormData('financingBarriers', e.target.value)}
            />
            {errors.financingBarriers && (
              <p className="text-red-600 text-sm mt-1">{errors.financingBarriers}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {formData.financingBarriers.length} characters {formData.financingBarriers.length < 50 && '(minimum 50)'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Bonding Challenges
            </label>
            <textarea
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              rows={4}
              placeholder="Example: To secure bonding for projects exceeding $1M, I pay premium rates 30-40% above industry averages..."
              value={formData.bondingChallenges}
              onChange={(e) => updateFormData('bondingChallenges', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Insurance Costs and Availability
            </label>
            <textarea
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              rows={4}
              placeholder="Example: Commercial general liability insurance for my operations costs approximately $18,000 annually. Competitors in my market with similar revenue report annual premiums of $11,000-13,000..."
              value={formData.insuranceChallenges}
              onChange={(e) => updateFormData('insuranceChallenges', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Contract Losses and Bid Disparities *
            </label>
            <textarea
              className={`w-full border-2 rounded-lg p-3 focus:outline-none transition-colors ${
                errors.contractLosses ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              rows={5}
              placeholder="Example: Over the past 24 months, I have submitted 47 competitive bids on federally-funded transportation projects. Despite being the low bidder on 12 occasions, I was awarded only 2 contracts..."
              value={formData.contractLosses}
              onChange={(e) => updateFormData('contractLosses', e.target.value)}
            />
            {errors.contractLosses && (
              <p className="text-red-600 text-sm mt-1">{errors.contractLosses}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {formData.contractLosses.length} characters {formData.contractLosses.length < 50 && '(minimum 50)'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Market Position and Revenue Impact
            </label>
            <textarea
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              rows={5}
              placeholder="Example: Based on my firm's technical capabilities, equipment inventory, and 8 years of experience, we should reasonably expect annual revenue in the $3-4M range. However, due to systematic barriers, our revenue has been constrained to approximately $1.2M annually..."
              value={formData.marketDisadvantages}
              onChange={(e) => updateFormData('marketDisadvantages', e.target.value)}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Additional Details',
      icon: FileText,
      subtitle: 'Supporting context and documentation',
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
            <h4 className="font-bold text-green-900 mb-2">Almost Done!</h4>
            <p className="text-sm text-green-900">
              These final details will strengthen your narrative and help prepare your complete submission package.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Additional Context or Examples
            </label>
            <textarea
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              rows={5}
              placeholder="Include any additional information that supports your disadvantage claim: industry-specific challenges, regional market conditions, relationships with prime contractors..."
              value={formData.specificExamples}
              onChange={(e) => updateFormData('specificExamples', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Supporting Documentation You Have Available
            </label>
            <textarea
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              rows={5}
              placeholder="List the evidence you can provide: loan denial letters, bid tabulations, financial statements, bonding quotes, correspondence with contracting officers..."
              value={formData.documentation}
              onChange={(e) => updateFormData('documentation', e.target.value)}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-3">What Happens Next:</h4>
            <div className="space-y-2 text-sm text-blue-900">
              <p>✓ We'll generate your complete application package using AI</p>
              <p>✓ You'll receive a professional narrative statement</p>
              <p>✓ Plus a formal cover letter addressed to your UCP</p>
              <p>✓ Plus a comprehensive evidence checklist</p>
              <p>✓ Plus a review summary to check before submitting</p>
              <p>✓ All documents downloadable as Word files for editing</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Generate Documents',
      icon: Download,
      subtitle: 'Create your DBE application package',
      content: (
        <div className="space-y-6">
          {!generatedDocs ? (
            <>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-3">Ready to Generate Your Application</h3>
                <p className="text-green-50 mb-4 leading-relaxed">
                  You've completed all required sections. Our AI will now transform your responses into a professional, 
                  compliant DBE recertification application package.
                </p>
                <div className="bg-white/20 backdrop-blur p-4 rounded-lg">
                  <p className="text-sm text-white font-semibold mb-2">Your package will include:</p>
                  <ul className="text-sm text-green-50 space-y-1">
                    <li>✓ Professional cover letter addressed to your UCP</li>
                    <li>✓ Complete AI-enhanced narrative statement of disadvantage</li>
                    <li>✓ Supporting documentation checklist</li>
                    <li>✓ Pre-submission review summary</li>
                    <li>✓ All as Word documents for easy editing</li>
                  </ul>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-300 p-6 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
                    <div className="flex-1">
                      <h4 className="font-bold text-red-900 mb-2">Generation Failed</h4>
                      <p className="text-sm text-red-800 mb-3">{error}</p>
                      <button
                        onClick={generateDocuments}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={generateDocuments}
                disabled={isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-8 rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg shadow-lg transition-all transform hover:scale-105"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Generating Your Documents...
                  </>
                ) : (
                  <>
                    <FileText size={24} />
                    Generate My DBE Application Package
                  </>
                )}
              </button>

              {isGenerating && (
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <p className="text-sm text-blue-900 font-semibold">{generationProgress}</p>
                  </div>
                  <p className="text-xs text-blue-700">
                    Our AI is analyzing your responses and crafting compelling narratives that meet 
                    regulatory requirements. This typically takes 30-60 seconds...
                  </p>
                </div>
              )}
            </>
          ) : !isPaid ? (
            <>
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={28} />
                  <div>
                    <h3 className="font-bold text-lg text-green-900 mb-2">Documents Generated Successfully!</h3>
                    <p className="text-sm text-green-800">
                      Your professional DBE application package has been created by AI. Review the preview below, 
                      then complete payment to unlock downloads.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg text-gray-900">Document Preview</h4>
                  <Eye className="text-blue-600" size={24} />
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                    {generatedDocs.preview}
                  </pre>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-8 rounded-xl shadow-xl">
                <div className="flex items-start gap-4">
                  <CreditCard className="flex-shrink-0" size={32} />
                  <div className="flex-1">
                    <h4 className="font-bold text-2xl mb-2">Unlock Complete Package</h4>
                    <p className="text-amber-50 mb-4">
                      Complete your purchase to download all 4 AI-enhanced professional documents totaling 8-12 pages.
                    </p>
                    <div className="bg-white/20 backdrop-blur p-4 rounded-lg mb-6">
                      <p className="font-bold mb-2">Complete Package Includes:</p>
                      <ul className="text-sm space-y-1">
                        <li>✓ Full AI-enhanced narrative statement (4-6 pages)</li>
                        <li>✓ Professional cover letter</li>
                        <li>✓ Complete documentation checklist</li>
                        <li>✓ Pre-submission review summary</li>
                        <li>✓ Downloadable Word documents (.doc)</li>
                        <li>✓ Fully editable in Microsoft Word</li>
                      </ul>
                    </div>

                    <div className="flex items-center justify-between bg-white/10 backdrop-blur rounded-lg p-4 mb-4">
                      <div>
                        <p className="text-3xl font-bold">$149</p>
                        <p className="text-sm text-amber-100">One-time payment • Instant access</p>
                      </div>
                      <a
                        href={checkoutUrl}
                        onClick={() => trackPaymentInitiated()}
                        className="lemonsqueezy-button bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 no-underline"
                      >
                        Complete Purchase →
                      </a>
                    </div>
                    
                    <p className="text-xs text-amber-100 text-center">
                      🔒 Secure checkout powered by Lemon Squeezy • Documents unlock automatically
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>💰 Compare:</strong> Professional consultant fees: $1,500-3,000
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm text-green-900">
                    <strong>✓ Included:</strong> Full editing in Microsoft Word
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center gap-4">
                  <CheckCircle size={48} />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
                    <p className="text-green-50">
                      Your complete AI-enhanced DBE application package is ready for download as Word documents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-green-200 p-6 rounded-lg">
                  <FileText className="text-green-600 mb-3" size={32} />
                  <h4 className="font-bold mb-2">Narrative Statement</h4>
                  <p className="text-sm text-gray-600 mb-4">AI-enhanced statement (4-6 pages)</p>
                  <button
                    onClick={() => downloadAsWord(
                      generatedDocs.narrative, 
                      `${formData.companyName.replace(/\s+/g, '_')}_DBE_Narrative.doc`,
                      'DBE Narrative Statement'
                    )}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Download Word Doc
                  </button>
                </div>

                <div className="bg-white border-2 border-blue-200 p-6 rounded-lg">
                  <FileText className="text-blue-600 mb-3" size={32} />
                  <h4 className="font-bold mb-2">Cover Letter</h4>
                  <p className="text-sm text-gray-600 mb-4">Professional letter to your UCP</p>
                  <button
                    onClick={() => downloadAsWord(
                      generatedDocs.coverLetter, 
                      `${formData.companyName.replace(/\s+/g, '_')}_Cover_Letter.doc`,
                      'DBE Recertification Cover Letter'
                    )}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Download Word Doc
                  </button>
                </div>

                <div className="bg-white border-2 border-amber-200 p-6 rounded-lg">
                  <FileText className="text-amber-600 mb-3" size={32} />
                  <h4 className="font-bold mb-2">Documentation Checklist</h4>
                  <p className="text-sm text-gray-600 mb-4">Complete evidence checklist</p>
                  <button
                    onClick={() => downloadAsWord(
                      generatedDocs.checklist, 
                      `${formData.companyName.replace(/\s+/g, '_')}_Checklist.doc`,
                      'Supporting Documentation Checklist'
                    )}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Download Word Doc
                  </button>
                </div>

                <div className="bg-white border-2 border-purple-200 p-6 rounded-lg">
                  <FileText className="text-purple-600 mb-3" size={32} />
                  <h4 className="font-bold mb-2">Review Summary</h4>
                  <p className="text-sm text-gray-600 mb-4">Pre-submission checklist</p>
                  <button
                    onClick={() => downloadAsWord(
                      generatedDocs.reviewSummary, 
                      `${formData.companyName.replace(/\s+/g, '_')}_Review.doc`,
                      'Application Review Summary'
                    )}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Download Word Doc
                  </button>
                </div>
              </div>

              <button
                onClick={downloadAllDocuments}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all transform hover:scale-105"
              >
                <Download size={24} />
                Download All Word Documents
              </button>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h4 className="font-bold text-blue-900 mb-3">Next Steps:</h4>
                <ol className="text-sm text-blue-900 space-y-2">
                  <li>1. Open each Word document and review for accuracy</li>
                  <li>2. Edit and customize in Microsoft Word as needed</li>
                  <li>3. Gather all supporting documentation per the checklist</li>
                  <li>4. Sign and date the narrative statement</li>
                  <li>5. Submit complete package to your UCP</li>
                  <li>6. Follow up within 10 business days to confirm receipt</li>
                </ol>
              </div>

              <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
                <h4 className="font-bold text-green-900 mb-2">Good luck with your DBE recertification!</h4>
                <p className="text-sm text-green-800">
                  Your AI-enhanced application gives you the best chance for approval under the new standards.
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">DBE Narrative Pro</h1>
              <p className="text-blue-200 text-sm">AI-Enhanced DBE Recertification Documents</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-amber-500 text-amber-900 px-4 py-2 rounded-lg font-bold">
                Compliant 2025
              </div>
              {step > 0 && step < 5 && (
                <button
                  onClick={() => {
                    if (window.confirm('Clear saved draft? Your progress will be lost.')) {
                      clearDraft();
                      window.location.reload();
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm"
                  title="Clear saved draft"
                >
                  <Trash2 size={16} />
                  Clear Draft
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span className="font-bold text-blue-600">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all ${
                      idx === step 
                        ? 'bg-blue-600 text-white scale-110 shadow-lg' 
                        : idx < step 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {idx < step ? <CheckCircle size={24} /> : <Icon size={24} />}
                    </div>
                    <p className={`text-xs mt-2 font-semibold hidden md:block ${
                      idx === step ? 'text-blue-600' : idx < step ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {s.title}
                    </p>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${idx < step ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-gray-100">
            <div className="bg-blue-100 p-3 rounded-lg">
              <StepIcon className="text-blue-600" size={36} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentStep.title}</h2>
              <p className="text-gray-600">{currentStep.subtitle}</p>
            </div>
          </div>
          
          {currentStep.content}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              setStep(Math.max(0, step - 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={step === 0}
            className="bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg border-2 border-gray-200 transition-all"
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          
          {step < steps.length - 1 && (
            <button
              onClick={() => {
                if (validateStep(step)) {
                  setStep(Math.min(steps.length - 1, step + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  alert('Please fill in all required fields before continuing.');
                }
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 shadow-lg transition-all transform hover:scale-105"
            >
              Continue
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 p-4 rounded-lg text-center">
            <Shield className="text-blue-600 mx-auto mb-2" size={24} />
            <p className="text-xs font-semibold text-gray-700">Secure & Private</p>
            <p className="text-xs text-gray-500">Auto-saved locally</p>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg text-center">
            <CheckCircle className="text-green-600 mx-auto mb-2" size={24} />
            <p className="text-xs font-semibold text-gray-700">AI-Powered</p>
            <p className="text-xs text-gray-500">Professional quality</p>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg text-center">
            <FileText className="text-amber-600 mx-auto mb-2" size={24} />
            <p className="text-xs font-semibold text-gray-700">Word Documents</p>
            <p className="text-xs text-gray-500">Fully editable</p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 DBE Narrative Pro • AI-Enhanced DBE Certification Documents</p>
        </div>
      </div>
    </div>
  );
};

export default DBENarrativePro;