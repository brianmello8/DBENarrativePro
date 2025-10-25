import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Download, FileText, CheckCircle, Building2, Users, DollarSign, Shield, Save, Trash2, Home, Sparkles, ArrowUp, ArrowRight } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

const UCAFormFiller = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    // Section 1: Certification Information
    applicationType: 'DBE',
    contactName: '',
    contactTitle: '',
    legalName: '',
    phone: '',
    otherPhone: '',
    fax: '',
    email: '',
    website: '',
    streetAddress: '',
    city: '',
    county: '',
    state: '',
    zip: '',
    mailingAddress: '',
    mailingCity: '',
    mailingState: '',
    mailingZip: '',
    priorDenial: 'No',
    priorDenialExplanation: '',
    
    // Section 2: Business Profile
    businessDescription: '',
    naicsCodes: '',
    establishedDate: '',
    forProfit: 'Yes',
    federalTaxId: '',
    businessStructure: '',
    fullTimeEmployees: '',
    partTimeEmployees: '',
    seasonalEmployees: '',
    grossReceipts: {
      year1: '',
      year2: '',
      year3: '',
      year4: '',
      year5: ''
    },
    
    // Section 2B: Relationships
    colocated: 'No',
    colocationExplanation: '',
    otherOwnership: 'No',
    otherOwnershipExplanation: '',
    
    // Section 3: Majority Owner Information
    ownerFullName: '',
    ownerTitle: '',
    ownerHomePhone: '',
    ownerStreetAddress: '',
    ownerCity: '',
    ownerState: '',
    ownerZip: '',
    ownerSex: '',
    ownerEthnicity: [],
    ownerResidency: 'US Citizen',
    yearsAsOwner: '',
    percentageOwned: '',
    classOfStock: '',
    dateAcquired: '',
    cashInvestment: '',
    realEstateInvestment: '',
    equipmentInvestment: '',
    otherInvestment: '',
    acquisitionMethod: '',
    familialRelationships: '',
    ownerOtherBusiness: 'No',
    ownerOtherBusinessDetails: '',
    personalNetWorth: '',
    
    // Section 4: Control
    bankName: '',
    bankCity: '',
    bankState: '',
    checkSigners: '',
    bondingAggregate: '',
    bondingProject: '',
    
    // Largest Contracts
    contracts: [
      { contractor: '', project: '', work: '', value: '' }
    ]
  });
  
  const [errors, setErrors] = useState({});
  const [savedDraftAvailable, setSavedDraftAvailable] = useState(false);

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

  // Auto-save draft to localStorage
  useEffect(() => {
    const saveDraft = () => {
      try {
        localStorage.setItem('uca_form_draft', JSON.stringify(formData));
        localStorage.setItem('uca_form_step', step.toString());
        localStorage.setItem('uca_form_timestamp', Date.now().toString());
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
        const savedData = localStorage.getItem('uca_form_draft');
        const savedStep = localStorage.getItem('uca_form_step');
        const timestamp = localStorage.getItem('uca_form_timestamp');
        
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

  const loadDraft = () => {
    try {
      const savedData = localStorage.getItem('uca_form_draft');
      const savedStep = localStorage.getItem('uca_form_step');
      
      if (savedData) {
        setFormData(JSON.parse(savedData));
        setStep(parseInt(savedStep) || 0);
        setSavedDraftAvailable(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        alert('✅ Draft restored! Continue where you left off.');
      }
    } catch (error) {
      console.error('Error loading draft:', error);
      alert('Failed to load draft. Please start fresh.');
    }
  };

  const clearDraft = () => {
    try {
      localStorage.removeItem('uca_form_draft');
      localStorage.removeItem('uca_form_step');
      localStorage.removeItem('uca_form_timestamp');
      setSavedDraftAvailable(false);
    } catch (error) {
      console.error('Error clearing draft:', error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const updateGrossReceipts = (year, value) => {
    setFormData(prev => ({
      ...prev,
      grossReceipts: { ...prev.grossReceipts, [year]: value }
    }));
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) { // Contact Info
      if (!formData.contactName?.trim()) newErrors.contactName = "Contact name is required";
      if (!formData.legalName?.trim()) newErrors.legalName = "Legal name is required";
      if (!formData.email?.trim()) newErrors.email = "Email is required";
      if (!formData.phone?.trim()) newErrors.phone = "Phone is required";
    }
    
    if (currentStep === 2) { // Business Profile
      if (!formData.businessDescription?.trim()) newErrors.businessDescription = "Business description is required";
      if (!formData.establishedDate?.trim()) newErrors.establishedDate = "Established date is required";
      if (!formData.federalTaxId?.trim()) newErrors.federalTaxId = "Federal Tax ID is required";
    }
    
    if (currentStep === 3) { // Owner Info
      if (!formData.ownerFullName?.trim()) newErrors.ownerFullName = "Owner name is required";
      if (!formData.percentageOwned?.trim()) newErrors.percentageOwned = "Ownership percentage is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate and download filled PDF
  const generatePDF = async () => {
    try {
      const formUrl = '/UCA_Form.pdf';
      const existingPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();

      // Fill all form fields
      const setFieldValue = (fieldName, value) => {
        try {
          const field = form.getTextField(fieldName);
          if (field && value) {
            field.setText(String(value));
          }
        } catch (e) {
          console.warn(`Could not set field ${fieldName}:`, e);
        }
      };

      // Section 1: Certification Information
      setFieldValue('contactName', formData.contactName);
      setFieldValue('contactTitle', formData.contactTitle);
      setFieldValue('legalName', formData.legalName);
      setFieldValue('phone', formData.phone);
      setFieldValue('otherPhone', formData.otherPhone);
      setFieldValue('fax', formData.fax);
      setFieldValue('email', formData.email);
      setFieldValue('website', formData.website);
      setFieldValue('streetAddress', formData.streetAddress);
      setFieldValue('city', formData.city);
      setFieldValue('county', formData.county);
      setFieldValue('state', formData.state);
      setFieldValue('zip', formData.zip);
      setFieldValue('mailingAddress', formData.mailingAddress);
      setFieldValue('mailingCity', formData.mailingCity);
      setFieldValue('mailingState', formData.mailingState);
      setFieldValue('mailingZip', formData.mailingZip);

      // Section 2: Business Profile
      setFieldValue('businessDescription', formData.businessDescription);
      setFieldValue('naicsCodes', formData.naicsCodes);
      setFieldValue('establishedDate', formData.establishedDate);
      setFieldValue('federalTaxId', formData.federalTaxId);
      setFieldValue('businessStructure', formData.businessStructure);
      setFieldValue('fullTimeEmployees', formData.fullTimeEmployees);
      setFieldValue('partTimeEmployees', formData.partTimeEmployees);
      setFieldValue('seasonalEmployees', formData.seasonalEmployees);
      
      setFieldValue('grossReceipts_year1', formData.grossReceipts.year1);
      setFieldValue('grossReceipts_year2', formData.grossReceipts.year2);
      setFieldValue('grossReceipts_year3', formData.grossReceipts.year3);
      setFieldValue('grossReceipts_year4', formData.grossReceipts.year4);
      setFieldValue('grossReceipts_year5', formData.grossReceipts.year5);

      // Section 3: Owner Information
      setFieldValue('ownerFullName', formData.ownerFullName);
      setFieldValue('ownerTitle', formData.ownerTitle);
      setFieldValue('ownerHomePhone', formData.ownerHomePhone);
      setFieldValue('ownerStreetAddress', formData.ownerStreetAddress);
      setFieldValue('ownerCity', formData.ownerCity);
      setFieldValue('ownerState', formData.ownerState);
      setFieldValue('ownerZip', formData.ownerZip);
      setFieldValue('yearsAsOwner', formData.yearsAsOwner);
      setFieldValue('percentageOwned', formData.percentageOwned);
      setFieldValue('classOfStock', formData.classOfStock);
      setFieldValue('dateAcquired', formData.dateAcquired);
      setFieldValue('cashInvestment', formData.cashInvestment);
      setFieldValue('realEstateInvestment', formData.realEstateInvestment);
      setFieldValue('equipmentInvestment', formData.equipmentInvestment);
      setFieldValue('otherInvestment', formData.otherInvestment);
      setFieldValue('acquisitionMethod', formData.acquisitionMethod);
      setFieldValue('personalNetWorth', formData.personalNetWorth);

      // Section 4: Control
      setFieldValue('bankName', formData.bankName);
      setFieldValue('bankCity', formData.bankCity);
      setFieldValue('bankState', formData.bankState);
      setFieldValue('checkSigners', formData.checkSigners);
      setFieldValue('bondingAggregate', formData.bondingAggregate);
      setFieldValue('bondingProject', formData.bondingProject);

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, 'DBE_UCA_Application_Completed.pdf');

      alert('✅ PDF generated successfully! Check your downloads.');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again or contact support.');
    }
  };

  const FormInput = ({ label, field, type = "text", required = false, placeholder = "", disabled = false }) => (
    <div className="mb-6">
      <label className="block text-sm font-bold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={formData[field] || ''}
        onChange={(e) => updateFormData(field, e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
          errors[field] ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-blue-300'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
      />
      {errors[field] && <p className="text-red-500 text-sm mt-1 font-semibold">{errors[field]}</p>}
    </div>
  );

  const FormTextarea = ({ label, field, required = false, placeholder = "", rows = 4 }) => (
    <div className="mb-6">
      <label className="block text-sm font-bold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        value={formData[field] || ''}
        onChange={(e) => updateFormData(field, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
          errors[field] ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-blue-300'
        }`}
      />
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
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {errors[field] && <p className="text-red-500 text-sm mt-1 font-semibold">{errors[field]}</p>}
    </div>
  );

  const steps = [
    {
      title: "Welcome",
      subtitle: "Get started with your DBE application",
      icon: Shield,
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
            <h3 className="text-3xl font-bold text-gray-900 mb-4">📋 DBE Uniform Certification Application</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              This tool helps you complete the official DOT UCA form (17 pages). Your information is saved locally 
              as you work, and you'll download a filled PDF at the end.
            </p>

            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
              <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} />
                What You'll Need:
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Business information (legal name, address, tax ID, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Owner information and percentage ownership</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Financial data (gross receipts for past 3-5 years)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Banking and bonding information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Information about your largest contracts</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border-2 border-amber-300 p-6 rounded-xl">
              <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                <Sparkles className="text-amber-600" size={20} />
                Important Notes:
              </h4>
              <ul className="text-sm text-amber-900 space-y-2">
                <li>✓ Your progress is automatically saved in your browser</li>
                <li>✓ All data stays on your device - nothing sent to servers</li>
                <li>✓ You can leave and return anytime within 7 days</li>
                <li>✓ The final PDF is ready to submit to your UCP</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-green-200 p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="bg-green-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="text-white" size={24} />
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">100% Free</h4>
              <p className="text-gray-600 text-sm">
                No payment required. Complete and download your UCA form at no cost.
              </p>
            </div>

            <div className="bg-white border-2 border-blue-200 p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Shield className="text-white" size={24} />
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Secure & Private</h4>
              <p className="text-gray-600 text-sm">
                All data is saved locally on your device. We never see your information.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Contact Information",
      subtitle: "Section 1: Your business contact details",
      icon: Building2,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
            <p className="text-sm text-blue-900 font-semibold">
              💡 Tip: This information will appear on official correspondence. Make sure it's accurate!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormInput label="Primary Contact Name" field="contactName" required placeholder="John Smith" />
            <FormInput label="Contact Title/Position" field="contactTitle" placeholder="Owner / CEO" />
          </div>

          <FormInput label="Legal Business Name" field="legalName" required placeholder="ABC Construction LLC" />

          <div className="grid md:grid-cols-3 gap-6">
            <FormInput label="Phone Number" field="phone" type="tel" required placeholder="(555) 123-4567" />
            <FormInput label="Additional Phone" field="otherPhone" type="tel" placeholder="(555) 987-6543" />
            <FormInput label="Fax Number" field="fax" type="tel" placeholder="(555) 111-2222" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormInput label="Email Address" field="email" type="email" required placeholder="contact@business.com" />
            <FormInput label="Website" field="website" type="url" placeholder="www.business.com" />
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
            <h4 className="font-bold text-lg text-gray-900 mb-4">Physical Business Address</h4>
            <FormInput label="Street Address" field="streetAddress" placeholder="123 Main Street" />
            <div className="grid md:grid-cols-3 gap-6">
              <FormInput label="City" field="city" placeholder="Los Angeles" />
              <FormInput label="County" field="county" placeholder="Los Angeles County" />
              <FormInput label="State" field="state" placeholder="CA" />
            </div>
            <FormInput label="ZIP Code" field="zip" placeholder="90001" />
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
            <h4 className="font-bold text-lg text-gray-900 mb-4">Mailing Address (if different)</h4>
            <FormInput label="Mailing Address" field="mailingAddress" placeholder="P.O. Box 123" />
            <div className="grid md:grid-cols-3 gap-6">
              <FormInput label="City" field="mailingCity" placeholder="Los Angeles" />
              <FormInput label="State" field="mailingState" placeholder="CA" />
              <FormInput label="ZIP Code" field="mailingZip" placeholder="90001" />
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-300 p-6 rounded-xl">
            <FormSelect 
              label="Has your firm been previously denied DBE certification?" 
              field="priorDenial" 
              options={['No', 'Yes']} 
            />
            {formData.priorDenial === 'Yes' && (
              <FormTextarea 
                label="Explain the denial and what has changed since then" 
                field="priorDenialExplanation" 
                placeholder="Provide details about the previous denial..."
                rows={4}
              />
            )}
          </div>
        </div>
      )
    },
    {
      title: "Business Profile",
      subtitle: "Section 2: Tell us about your business",
      icon: Building2,
      content: (
        <div className="space-y-6">
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-xl">
            <p className="text-sm text-indigo-900 font-semibold">
              📊 Be specific and detailed - this helps evaluators understand your business operations
            </p>
          </div>

          <FormTextarea 
            label="Detailed Business Description" 
            field="businessDescription" 
            required 
            placeholder="Describe your business services, markets served, typical projects, equipment, etc..."
            rows={6}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <FormInput 
              label="NAICS Codes" 
              field="naicsCodes" 
              placeholder="236220, 238210" 
            />
            <FormInput 
              label="Date Business Established" 
              field="establishedDate" 
              type="date" 
              required 
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormSelect 
              label="Is this a for-profit business?" 
              field="forProfit" 
              options={['Yes', 'No']} 
              required 
            />
            <FormInput 
              label="Federal Tax ID (EIN)" 
              field="federalTaxId" 
              required 
              placeholder="XX-XXXXXXX" 
            />
          </div>

          <FormSelect 
            label="Business Structure" 
            field="businessStructure" 
            options={['', 'Sole Proprietorship', 'Partnership', 'LLC', 'Corporation', 'S-Corporation', 'Other']} 
          />

          <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
            <h4 className="font-bold text-lg text-gray-900 mb-4">Employee Count</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <FormInput label="Full-Time Employees" field="fullTimeEmployees" type="number" placeholder="5" />
              <FormInput label="Part-Time Employees" field="partTimeEmployees" type="number" placeholder="2" />
              <FormInput label="Seasonal Employees" field="seasonalEmployees" type="number" placeholder="0" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
            <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="text-green-600" size={24} />
              Gross Annual Receipts (Last 5 Years)
            </h4>
            <p className="text-sm text-gray-600 mb-4">Enter your total gross receipts for each year:</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Year 1 (Most Recent)</label>
                <input
                  type="text"
                  value={formData.grossReceipts.year1}
                  onChange={(e) => updateGrossReceipts('year1', e.target.value)}
                  placeholder="$500,000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Year 2</label>
                <input
                  type="text"
                  value={formData.grossReceipts.year2}
                  onChange={(e) => updateGrossReceipts('year2', e.target.value)}
                  placeholder="$450,000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Year 3</label>
                <input
                  type="text"
                  value={formData.grossReceipts.year3}
                  onChange={(e) => updateGrossReceipts('year3', e.target.value)}
                  placeholder="$400,000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Year 4</label>
                <input
                  type="text"
                  value={formData.grossReceipts.year4}
                  onChange={(e) => updateGrossReceipts('year4', e.target.value)}
                  placeholder="$350,000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Year 5 (Oldest)</label>
                <input
                  type="text"
                  value={formData.grossReceipts.year5}
                  onChange={(e) => updateGrossReceipts('year5', e.target.value)}
                  placeholder="$300,000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-300 p-6 rounded-xl">
            <h4 className="font-bold text-lg text-gray-900 mb-4">Business Relationships</h4>
            
            <FormSelect 
              label="Is your business co-located with any other business?" 
              field="colocated" 
              options={['No', 'Yes']} 
            />
            {formData.colocated === 'Yes' && (
              <FormTextarea 
                label="Explain the co-location arrangement" 
                field="colocationExplanation" 
                placeholder="Describe the relationship, shared resources, etc..."
                rows={3}
              />
            )}

            <FormSelect 
              label="Do you have ownership interest in any other business?" 
              field="otherOwnership" 
              options={['No', 'Yes']} 
            />
            {formData.otherOwnership === 'Yes' && (
              <FormTextarea 
                label="Explain your other business ownership" 
                field="otherOwnershipExplanation" 
                placeholder="List other businesses and your ownership percentage..."
                rows={3}
              />
            )}
          </div>
        </div>
      )
    },
    {
      title: "Owner Information",
      subtitle: "Section 3: Majority owner details",
      icon: Users,
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-xl">
            <p className="text-sm text-purple-900 font-semibold">
              👤 Information about the individual who owns 51% or more of the business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormInput label="Owner Full Name" field="ownerFullName" required placeholder="Jane Doe" />
            <FormInput label="Owner Title/Position" field="ownerTitle" placeholder="President / Owner" />
          </div>

          <FormInput label="Owner Home Phone" field="ownerHomePhone" type="tel" placeholder="(555) 123-4567" />

          <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
            <h4 className="font-bold text-lg text-gray-900 mb-4">Owner's Home Address</h4>
            <FormInput label="Street Address" field="ownerStreetAddress" placeholder="456 Oak Avenue" />
            <div className="grid md:grid-cols-3 gap-6">
              <FormInput label="City" field="ownerCity" placeholder="Los Angeles" />
              <FormInput label="State" field="ownerState" placeholder="CA" />
              <FormInput label="ZIP Code" field="ownerZip" placeholder="90001" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormSelect 
              label="Owner Gender" 
              field="ownerSex" 
              options={['', 'Male', 'Female', 'Non-Binary', 'Prefer not to say']} 
            />
            <FormSelect 
              label="Owner Residency Status" 
              field="ownerResidency" 
              options={['US Citizen', 'Permanent Resident', 'Other']} 
            />
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
            <h4 className="font-bold text-xl text-gray-900 mb-4">Ownership Details</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput 
                label="Years as Owner" 
                field="yearsAsOwner" 
                type="number" 
                placeholder="5" 
              />
              <FormInput 
                label="Percentage Owned" 
                field="percentageOwned" 
                required 
                placeholder="51% or greater" 
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput label="Class of Stock (if applicable)" field="classOfStock" placeholder="Common" />
              <FormInput label="Date Ownership Acquired" field="dateAcquired" type="date" />
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
            <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="text-green-600" size={24} />
              Owner's Investment in Business
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput label="Cash Investment" field="cashInvestment" placeholder="$50,000" />
              <FormInput label="Real Estate Investment" field="realEstateInvestment" placeholder="$0" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput label="Equipment Investment" field="equipmentInvestment" placeholder="$25,000" />
              <FormInput label="Other Investment" field="otherInvestment" placeholder="$0" />
            </div>
            <FormTextarea 
              label="How was ownership acquired?" 
              field="acquisitionMethod" 
              placeholder="e.g., Started business from scratch, purchased from previous owner, inherited, etc..."
              rows={3}
            />
          </div>

          <FormTextarea 
            label="Familial Relationships with Other Business Owners" 
            field="familialRelationships" 
            placeholder="List any family members involved in this or related businesses..."
            rows={3}
          />

          <div className="bg-yellow-50 border-2 border-yellow-300 p-6 rounded-xl">
            <FormSelect 
              label="Does the owner have ownership in other businesses?" 
              field="ownerOtherBusiness" 
              options={['No', 'Yes']} 
            />
            {formData.ownerOtherBusiness === 'Yes' && (
              <FormTextarea 
                label="Provide details about other business ownership" 
                field="ownerOtherBusinessDetails" 
                placeholder="List business names, ownership percentages, and relationship to this business..."
                rows={4}
              />
            )}
          </div>

          <FormInput 
            label="Owner's Personal Net Worth" 
            field="personalNetWorth" 
            placeholder="$250,000" 
          />
        </div>
      )
    },
    {
      title: "Control & Banking",
      subtitle: "Section 4: Business control and financial information",
      icon: DollarSign,
      content: (
        <div className="space-y-6">
          <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-xl">
            <p className="text-sm text-cyan-900 font-semibold">
              🏦 Banking relationships and bonding capacity information
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
            <h4 className="font-bold text-lg text-gray-900 mb-4">Primary Banking Information</h4>
            <FormInput label="Bank Name" field="bankName" placeholder="First National Bank" />
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput label="Bank City" field="bankCity" placeholder="Los Angeles" />
              <FormInput label="Bank State" field="bankState" placeholder="CA" />
            </div>
          </div>

          <FormTextarea 
            label="Who has authority to sign checks?" 
            field="checkSigners" 
            placeholder="List all individuals authorized to sign checks for the business..."
            rows={3}
          />

          <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
            <h4 className="font-bold text-lg text-gray-900 mb-4">Bonding Capacity</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput 
                label="Aggregate Bonding Capacity" 
                field="bondingAggregate" 
                placeholder="$1,000,000" 
              />
              <FormInput 
                label="Single Project Bonding Capacity" 
                field="bondingProject" 
                placeholder="$500,000" 
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200">
            <h4 className="font-bold text-xl text-gray-900 mb-4">Largest Contracts (Last 3 Years)</h4>
            <p className="text-sm text-gray-600 mb-4">List your most significant projects:</p>
            
            {formData.contracts.map((contract, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl mb-4 border-2 border-gray-200">
                <h5 className="font-bold text-gray-900 mb-3">Contract {idx + 1}</h5>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={contract.contractor}
                    onChange={(e) => {
                      const newContracts = [...formData.contracts];
                      newContracts[idx].contractor = e.target.value;
                      updateFormData('contracts', newContracts);
                    }}
                    placeholder="Prime Contractor Name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={contract.project}
                    onChange={(e) => {
                      const newContracts = [...formData.contracts];
                      newContracts[idx].project = e.target.value;
                      updateFormData('contracts', newContracts);
                    }}
                    placeholder="Project Name/Location"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={contract.work}
                    onChange={(e) => {
                      const newContracts = [...formData.contracts];
                      newContracts[idx].work = e.target.value;
                      updateFormData('contracts', newContracts);
                    }}
                    placeholder="Type of Work Performed"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={contract.value}
                    onChange={(e) => {
                      const newContracts = [...formData.contracts];
                      newContracts[idx].value = e.target.value;
                      updateFormData('contracts', newContracts);
                    }}
                    placeholder="Contract Value ($)"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                updateFormData('contracts', [...formData.contracts, { contractor: '', project: '', work: '', value: '' }]);
              }}
              className="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold py-3 px-6 rounded-xl transition-all"
            >
              + Add Another Contract
            </button>
          </div>
        </div>
      )
    },
    {
      title: "Complete",
      subtitle: "Download your completed UCA form",
      icon: Download,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-2xl shadow-2xl text-center">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-500" size={48} />
            </div>
            <h3 className="text-4xl font-bold mb-3">🎉 Congratulations!</h3>
            <p className="text-xl text-green-100 mb-6">
              You've completed all sections of the UCA form!
            </p>
            <button
              onClick={generatePDF}
              className="bg-white text-green-600 hover:bg-green-50 font-bold py-5 px-10 rounded-xl text-xl flex items-center justify-center gap-3 mx-auto shadow-2xl transition-all transform hover:scale-105"
            >
              <Download size={32} />
              Download Your Completed PDF
            </button>
            <p className="text-green-100 text-sm mt-4">
              File will be named: DBE_UCA_Application_Completed.pdf
            </p>
          </div>

          <div className="bg-white border-2 border-blue-200 p-8 rounded-xl">
            <h4 className="font-bold text-2xl text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="text-blue-600" size={28} />
              Next Steps After Download
            </h4>
            <ol className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</span>
                <div>
                  <p className="font-bold">Review your completed form for accuracy</p>
                  <p className="text-sm text-gray-600">Double-check all information before submission</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</span>
                <div>
                  <p className="font-bold">Gather all required supporting documents</p>
                  <p className="text-sm text-gray-600">Tax returns, financial statements, ownership docs, etc.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</span>
                <div>
                  <p className="font-bold">Sign and date the Declaration of Eligibility page</p>
                  <p className="text-sm text-gray-600">Required signature on final page of UCA form</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</span>
                <div>
                  <p className="font-bold">Submit complete package to your state's UCP</p>
                  <p className="text-sm text-gray-600">Contact your local UCP for submission instructions</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">5</span>
                <div>
                  <p className="font-bold">Schedule your on-site interview</p>
                  <p className="text-sm text-gray-600">The UCP will contact you to arrange an interview</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-8 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur p-4 rounded-xl">
                <Sparkles className="text-white" size={32} />
              </div>
              <div>
                <h4 className="font-bold text-3xl mb-1">Need Help With Your Narrative?</h4>
                <p className="text-amber-100 text-lg">Take your application to the next level</p>
              </div>
            </div>
            
            <p className="text-amber-50 mb-6 text-lg leading-relaxed">
              The UCA form is just the beginning. Under the October 2025 regulations, you'll also need a 
              detailed narrative statement (4-6 pages) explaining specific incidents of disadvantage and economic barriers.
            </p>
            
            <div className="bg-white/20 backdrop-blur p-6 rounded-xl mb-6">
              <p className="font-bold mb-3 text-lg">DBE Narrative Pro includes:</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-300" size={20} />
                  <span>AI-enhanced narrative statement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-300" size={20} />
                  <span>Professional cover letter</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-300" size={20} />
                  <span>Complete documentation checklist</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-300" size={20} />
                  <span>Comprehensive review summary</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-300" size={20} />
                  <span>All as editable Word documents</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-300" size={20} />
                  <span>Save $1,500-3,000 vs consultants</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold text-orange-600 mb-1">$149</p>
                <p className="text-sm text-gray-600">One-time payment • Instant access</p>
              </div>
              <button
                onClick={() => navigate('/narrative')}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
              >
                Generate My Narrative
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-300 p-6 rounded-xl text-center">
            <h4 className="font-bold text-green-900 text-xl mb-2">✅ Good luck with your DBE certification!</h4>
            <p className="text-gray-700">
              This free tool helps you complete the UCA form quickly and accurately. For comprehensive 
              narrative assistance that meets the new 2025 requirements, check out DBE Narrative Pro.
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentStep = steps[step];
  const StepIcon = currentStep.icon;
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header with gradient */}
      <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-2xl overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                <Shield size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                  DBE Narrative Pro
                </h1>
                <p className="text-blue-200 text-sm">Free UCA Form Filler • Official DOT Application</p>
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
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-xl font-bold shadow-lg">
                100% FREE
              </div>
              {step > 0 && step < steps.length - 1 && (
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
              <CheckCircle className="text-white" size={28} />
            </div>
            <p className="font-bold text-gray-900 mb-1">100% Free</p>
            <p className="text-sm text-gray-600">No payment or credit card required</p>
          </div>
          <div className="bg-white border-2 border-gray-200 p-6 rounded-xl text-center hover:shadow-xl transition-all hover:border-amber-300">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FileText className="text-white" size={28} />
            </div>
            <p className="font-bold text-gray-900 mb-1">Official Form</p>
            <p className="text-sm text-gray-600">Ready to submit to your UCP</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2025 DBE Narrative Pro • Free UCA Form Filler & AI-Enhanced Narrative Services</p>
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
  );
};

export default UCAFormFiller;