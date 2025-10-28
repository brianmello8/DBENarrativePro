import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowUp, ChevronLeft, ChevronRight, CheckCircle, Plus, Trash2, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { fillAndDownloadPDF } from '@/utils/pdfFiller';

const UCAFormFiller = () => {
  const navigate = useNavigate();
  const topRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const [formData, setFormData] = useState({
    // Section 1: Certification Information
    certificationType: '', // 'DBE' or 'ACDBE'
    contactName: '',
    contactTitle: '',
    legalFirmName: '',
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
    mailingCounty: '',
    mailingState: '',
    mailingZip: '',
    
    // Prior Certifications
    deniedCertification: false,
    deniedCertificationExplanation: '',
    withdrawnOrDebarred: false,
    withdrawnOrDebarredExplanation: '',
    appealedToUSDOT: false,
    
    // Section 2: General Information
    businessDescription: '',
    naicsCodes: '',
    dateEstablished: '',
    isForProfit: '',
    federalTaxId: '',
    legalStructure: [],
    otherLegalStructure: '',
    
    // Employees
    fullTimeEmployees: '',
    partTimeEmployees: '',
    seasonalEmployees: '',
    
    // Gross Receipts (5 years)
    grossReceipts: [
      { year: '', applicantAmount: '', affiliateAmount: '' },
      { year: '', applicantAmount: '', affiliateAmount: '' },
      { year: '', applicantAmount: '', affiliateAmount: '' },
      { year: '', applicantAmount: '', affiliateAmount: '' },
      { year: '', applicantAmount: '', affiliateAmount: '' }
    ],
    
    // Relationships with Other Businesses
    sharedResources: false,
    sharedResourcesExplanation: '',
    otherOwnershipInterest: false,
    otherOwnershipInterestExplanation: '',
    
    // Business History
    differentOwnership: false,
    differentOwnershipExplanation: '',
    subsidiary: false,
    subsidiaryExplanation: '',
    partnershipWithFirms: false,
    partnershipWithFirmsExplanation: '',
    ownsOtherFirms: false,
    ownsOtherFirmsExplanation: '',
    hasSubsidiaries: false,
    hasSubsidiariesExplanation: '',
    majorSubcontractor: false,
    majorSubcontractorExplanation: '',
    
    // Section 3: Majority Owner Information (51%+)
    majorityOwner: {
      fullName: '',
      title: '',
      homePhone: '',
      homeAddress: '',
      homeCity: '',
      homeState: '',
      homeZip: '',
      sex: '',
      groupMembership: [],
      otherGroup: '',
      residencyStatus: '',
      yearsAsOwner: '',
      percentageOwned: '',
      classOfStock: '',
      dateAcquired: '',
      
      // Initial Investment
      cashInvestment: '',
      realEstateInvestment: '',
      equipmentInvestment: '',
      otherInvestment: '',
      acquisitionMethod: '',
      acquisitionDetails: '',
      
      // Additional Investments
      additionalInvestments: [
        { type: '', amount: '', date: '', description: '' }
      ],
      
      // Additional Information
      familialRelationships: '',
      managementForOtherBusiness: false,
      otherBusinessName: '',
      otherBusinessFunction: '',
      ownsOrWorksForRelatedFirm: false,
      relatedFirmDetails: '',
      otherActivities: '',
      personalNetWorth: '',
      trustCreated: false,
      
      // Family/Employee Business Associations
      familyBusinessAssociations: [
        { name: '', relationship: '', companyName: '', businessType: '', ownsOrManages: '' }
      ]
    },
    
    // Section 3: Additional Owners (<51%)
    additionalOwners: [
      {
        fullName: '',
        title: '',
        homePhone: '',
        homeAddress: '',
        homeCity: '',
        homeState: '',
        homeZip: '',
        sex: '',
        groupMembership: [],
        otherGroup: '',
        residencyStatus: '',
        yearsAsOwner: '',
        percentageOwned: '',
        classOfStock: '',
        dateAcquired: '',
        cashInvestment: '',
        realEstateInvestment: '',
        equipmentInvestment: '',
        otherInvestment: '',
        acquisitionMethod: '',
        acquisitionDetails: '',
        familialRelationships: '',
        managementForOtherBusiness: false,
        otherBusinessName: '',
        otherBusinessFunction: '',
        ownsOrWorksForRelatedFirm: false,
        relatedFirmDetails: '',
        otherActivities: '',
        personalNetWorth: '',
        trustCreated: false,
        familyBusinessAssociations: []
      }
    ],
    
    // Section 4: Control
    // Officers
    officers: [
      { name: '', title: '', dateAppointed: '', ethnicity: '', sex: '' }
    ],
    
    // Board of Directors
    directors: [
      { name: '', title: '', dateAppointed: '', ethnicity: '', sex: '' }
    ],
    
    officersManageOtherBusiness: false,
    officersManageOtherBusinessDetails: [
      { person: '', title: '', business: '', function: '' }
    ],
    
    officersOwnRelatedFirm: false,
    officersOwnRelatedFirmDetails: [
      { firmName: '', person: '', relationship: '' }
    ],
    
    // Duties of Key Personnel
    keyPersonnel: [
      {
        name: '',
        title: '',
        race: '',
        sex: '',
        percentOwnership: '',
        duties: {
          setsPolicy: 'never',
          biddingEstimating: 'never',
          majorPurchasing: 'never',
          marketingSales: 'never',
          supervisesField: 'never',
          attendsBidOpenings: 'never',
          officeManagement: 'never',
          hiresFiresManagement: 'never',
          hiresFiresField: 'never',
          designatesProfits: 'never',
          obligatesBusiness: 'never',
          purchasesEquipment: 'never',
          signsChecks: 'never'
        },
        managesOtherBusiness: false,
        otherBusinessDetails: '',
        ownsWorksRelatedFirm: false,
        relatedFirmDetails: ''
      }
    ],
    
    // Inventory
    equipment: [
      { makeModel: '', currentValue: '', ownedOrLeased: '', usedAsCollateral: '', whereStored: '' }
    ],
    
    officeSpace: [
      { address: '', city: '', state: '', zip: '', ownedOrLeased: '', currentValue: '' }
    ],
    
    storageSpace: [
      { address: '', city: '', state: '', zip: '', ownedOrLeased: '', currentValue: '' }
    ],
    
    reliesOnOtherFirmForManagement: false,
    reliesOnOtherFirmDetails: '',
    
    // Financial/Banking
    bankAccounts: [
      { bankName: '', cityState: '', authorizedSigners: '' }
    ],
    
    bondingAggregate: '',
    bondingProjectLimit: '',
    
    // Loans
    loans: [
      { sourceName: '', sourceAddress: '', guarantor: '', originalAmount: '', currentBalance: '', purpose: '' }
    ],
    
    // Asset Transfers
    assetTransfers: [
      { asset: '', dollarValue: '', fromWhom: '', toWhom: '', relationship: '', date: '' }
    ],
    
    // Licenses/Permits
    licenses: [
      { holderName: '', type: '', expirationDate: '', state: '' }
    ],
    
    // Contracts
    completedContracts: [
      { ownerContractor: '', projectNameLocation: '', workType: '', dollarValue: '' }
    ],
    
    activeContracts: [
      { primeContractor: '', projectNumber: '', location: '', workType: '', startDate: '', completionDate: '', dollarValue: '' }
    ],
    
    // Section 5: ACDBE
    acdbeOperatesConcession: false,
    acdbeSuppliesGoods: false,
    
    offAirportLocations: [
      { businessType: '', leaseTerm: '', leaseStartDate: '', address: '', annualReceipts: '' }
    ],
    
    airportConcessions: [
      { airportName: '', concessionType: '', numLeases: '', numLocations: '', annualReceipts: '', leaseType: '' }
    ],
    
    affiliateAirportConcessions: [
      { airportName: '', concessionType: '', numLeases: '', numLocations: '', annualReceipts: '', leaseType: '' }
    ],
    
    acdbeJointVentures: false,
    
    // Declaration & Signature
    declaration: {
      ownerName: '',
      ownerTitle: '',
      firmName: '',
      disadvantagedGroups: [],
      otherGroup: '',
      personalNetWorthConfirmation: false,
      signatureDate: '',
      signature: ''
    }
  });

  // Section definitions
  const sections = [
    { title: 'Section 1: Certification Information', fields: 'certification' },
    { title: 'Section 2: General Information', fields: 'general' },
    { title: 'Section 3: Majority Owner Information', fields: 'majorityOwner' },
    { title: 'Section 3: Additional Owners', fields: 'additionalOwners' },
    { title: 'Section 4: Control - Officers & Directors', fields: 'control' },
    { title: 'Section 4: Control - Key Personnel Duties', fields: 'keyPersonnel' },
    { title: 'Section 4: Control - Inventory', fields: 'inventory' },
    { title: 'Section 4: Control - Financial Information', fields: 'financial' },
    { title: 'Section 4: Control - Contracts', fields: 'contracts' },
    { title: 'Section 5: Airport Concession (ACDBE)', fields: 'acdbe' },
    { title: 'Declaration & Signature', fields: 'declaration' }
  ];

  // Auto-scroll to top when section changes
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentSection]);

  // Show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Navigation functions
  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  // Form data update functions
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedData = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const updateArrayItem = (arrayName, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateNestedArrayItem = (parent, arrayName, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [arrayName]: prev[parent][arrayName].map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const addArrayItem = (arrayName, template) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], { ...template }]
    }));
  };

  const addNestedArrayItem = (parent, arrayName, template) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [arrayName]: [...prev[parent][arrayName], { ...template }]
      }
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const removeNestedArrayItem = (parent, arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [arrayName]: prev[parent][arrayName].filter((_, i) => i !== index)
      }
    }));
  };

  // Checkbox array toggle helper
  const toggleArrayValue = (field, value) => {
    setFormData(prev => {
      const currentArray = prev[field] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const toggleNestedArrayValue = (parent, field, value) => {
    setFormData(prev => {
      const currentArray = prev[parent][field] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return {
        ...prev,
        [parent]: {
          ...prev[parent],
          [field]: newArray
        }
      };
    });
  };

  // Submit handler
  const handleSubmit = async () => {
    try {
      console.log('Submitting form data...', formData);
      
      // Generate and download PDF
      const result = await fillAndDownloadPDF(formData);
      
      if (result.success) {
        alert(`✓ PDF Generated Successfully!\n\nFilled ${result.filledCount} of ${result.totalFields} fields.\n\nYour DBE/ACDBE application has been downloaded.`);
      } else {
        throw new Error(result.error || 'Failed to generate PDF');
      }
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Error generating PDF: ' + error.message);
    }
  };

  // SECTION 1: CERTIFICATION INFORMATION
  const renderCertificationInfo = () => {
    return (
      <div className="space-y-8">
        {/* Certification Type */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200">
          <Label className="text-lg font-semibold text-gray-900 mb-4 block">
            Certification Type *
          </Label>
          <RadioGroup
            value={formData.certificationType}
            onValueChange={(value) => updateFormData('certificationType', value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors">
              <RadioGroupItem value="DBE" id="dbe" />
              <Label htmlFor="dbe" className="cursor-pointer text-base font-medium">
                DBE (Disadvantaged Business Enterprise)
              </Label>
            </div>
            <div className="flex items-center space-x-3 bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors">
              <RadioGroupItem value="ACDBE" id="acdbe" />
              <Label htmlFor="acdbe" className="cursor-pointer text-base font-medium">
                ACDBE (Airport Concession Disadvantaged Business Enterprise)
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="contactName" className="font-semibold text-gray-700">Contact Name *</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => updateFormData('contactName', e.target.value)}
                placeholder="Full name"
                className="mt-2 border-2"
              />
            </div>
            
            <div>
              <Label htmlFor="contactTitle" className="font-semibold text-gray-700">Title *</Label>
              <Input
                id="contactTitle"
                value={formData.contactTitle}
                onChange={(e) => updateFormData('contactTitle', e.target.value)}
                placeholder="Job title"
                className="mt-2 border-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="legalFirmName" className="font-semibold text-gray-700">Legal Firm Name *</Label>
            <Input
              id="legalFirmName"
              value={formData.legalFirmName}
              onChange={(e) => updateFormData('legalFirmName', e.target.value)}
              placeholder="Official business name"
              className="mt-2 border-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="phone" className="font-semibold text-gray-700">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="(555) 123-4567"
                className="mt-2 border-2"
              />
            </div>
            
            <div>
              <Label htmlFor="otherPhone" className="font-semibold text-gray-700">Other Phone</Label>
              <Input
                id="otherPhone"
                type="tel"
                value={formData.otherPhone}
                onChange={(e) => updateFormData('otherPhone', e.target.value)}
                placeholder="(555) 987-6543"
                className="mt-2 border-2"
              />
            </div>
            
            <div>
              <Label htmlFor="fax" className="font-semibold text-gray-700">Fax</Label>
              <Input
                id="fax"
                type="tel"
                value={formData.fax}
                onChange={(e) => updateFormData('fax', e.target.value)}
                placeholder="(555) 123-4568"
                className="mt-2 border-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="email" className="font-semibold text-gray-700">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="contact@business.com"
                className="mt-2 border-2"
              />
            </div>
            
            <div>
              <Label htmlFor="website" className="font-semibold text-gray-700">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => updateFormData('website', e.target.value)}
                placeholder="www.business.com"
                className="mt-2 border-2"
              />
            </div>
          </div>
        </div>

        {/* Business Address */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Business Address
          </h3>
          
          <div>
            <Label htmlFor="streetAddress" className="font-semibold text-gray-700">Street Address *</Label>
            <Input
              id="streetAddress"
              value={formData.streetAddress}
              onChange={(e) => updateFormData('streetAddress', e.target.value)}
              placeholder="123 Main Street"
              className="mt-2 border-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="city" className="font-semibold text-gray-700">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => updateFormData('city', e.target.value)}
                placeholder="City"
                className="mt-2 border-2"
              />
            </div>
            
            <div>
              <Label htmlFor="county" className="font-semibold text-gray-700">County *</Label>
              <Input
                id="county"
                value={formData.county}
                onChange={(e) => updateFormData('county', e.target.value)}
                placeholder="County"
                className="mt-2 border-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="state" className="font-semibold text-gray-700">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => updateFormData('state', e.target.value)}
                placeholder="CA"
                maxLength={2}
                className="mt-2 border-2"
              />
            </div>
            
            <div>
              <Label htmlFor="zip" className="font-semibold text-gray-700">ZIP Code *</Label>
              <Input
                id="zip"
                value={formData.zip}
                onChange={(e) => updateFormData('zip', e.target.value)}
                placeholder="12345"
                className="mt-2 border-2"
              />
            </div>
          </div>
        </div>

        {/* Mailing Address */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Mailing Address (if different)
          </h3>
          
          <div>
            <Label htmlFor="mailingAddress" className="font-semibold text-gray-700">Street Address</Label>
            <Input
              id="mailingAddress"
              value={formData.mailingAddress}
              onChange={(e) => updateFormData('mailingAddress', e.target.value)}
              placeholder="PO Box or Street Address"
              className="mt-2 border-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="mailingCity" className="font-semibold text-gray-700">City</Label>
              <Input
                id="mailingCity"
                value={formData.mailingCity}
                onChange={(e) => updateFormData('mailingCity', e.target.value)}
                placeholder="City"
                className="mt-2 border-2"
              />
            </div>
            
            <div>
              <Label htmlFor="mailingCounty" className="font-semibold text-gray-700">County</Label>
              <Input
                id="mailingCounty"
                value={formData.mailingCounty}
                onChange={(e) => updateFormData('mailingCounty', e.target.value)}
                placeholder="County"
                className="mt-2 border-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="mailingState" className="font-semibold text-gray-700">State</Label>
              <Input
                id="mailingState"
                value={formData.mailingState}
                onChange={(e) => updateFormData('mailingState', e.target.value)}
                placeholder="CA"
                maxLength={2}
                className="mt-2 border-2"
              />
            </div>
            
            <div>
              <Label htmlFor="mailingZip" className="font-semibold text-gray-700">ZIP Code</Label>
              <Input
                id="mailingZip"
                value={formData.mailingZip}
                onChange={(e) => updateFormData('mailingZip', e.target.value)}
                placeholder="12345"
                className="mt-2 border-2"
              />
            </div>
          </div>
        </div>

        {/* Prior Certifications */}
        <div className="space-y-6 bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-yellow-300 pb-2">
            Prior Certification History
          </h3>

          <Alert className="bg-blue-50 border-blue-300">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-blue-900">
              Answer the following questions about previous certification attempts or status changes.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3 bg-white p-4 rounded-lg border-2 border-gray-200">
              <Checkbox
                id="deniedCertification"
                checked={formData.deniedCertification}
                onCheckedChange={(checked) => updateFormData('deniedCertification', checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="deniedCertification" className="cursor-pointer font-semibold text-gray-800">
                  Has your firm ever been denied DBE/ACDBE certification?
                </Label>
              </div>
            </div>
            
            {formData.deniedCertification && (
              <div className="ml-8 animate-in slide-in-from-top">
                <Label htmlFor="deniedExplanation" className="font-semibold text-gray-700">
                  Please explain:
                </Label>
                <Textarea
                  id="deniedExplanation"
                  value={formData.deniedCertificationExplanation}
                  onChange={(e) => updateFormData('deniedCertificationExplanation', e.target.value)}
                  placeholder="Provide details about the denial..."
                  className="mt-2 border-2 min-h-[100px]"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 bg-white p-4 rounded-lg border-2 border-gray-200">
              <Checkbox
                id="withdrawnOrDebarred"
                checked={formData.withdrawnOrDebarred}
                onCheckedChange={(checked) => updateFormData('withdrawnOrDebarred', checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="withdrawnOrDebarred" className="cursor-pointer font-semibold text-gray-800">
                  Has your certification ever been withdrawn, suspended, or debarred?
                </Label>
              </div>
            </div>
            
            {formData.withdrawnOrDebarred && (
              <div className="ml-8 animate-in slide-in-from-top">
                <Label htmlFor="withdrawnExplanation" className="font-semibold text-gray-700">
                  Please explain:
                </Label>
                <Textarea
                  id="withdrawnExplanation"
                  value={formData.withdrawnOrDebarredExplanation}
                  onChange={(e) => updateFormData('withdrawnOrDebarredExplanation', e.target.value)}
                  placeholder="Provide details about the suspension/debarment..."
                  className="mt-2 border-2 min-h-[100px]"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 bg-white p-4 rounded-lg border-2 border-gray-200">
              <Checkbox
                id="appealedToUSDOT"
                checked={formData.appealedToUSDOT}
                onCheckedChange={(checked) => updateFormData('appealedToUSDOT', checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="appealedToUSDOT" className="cursor-pointer font-semibold text-gray-800">
                  Have you ever appealed a certification decision to USDOT?
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // SECTION 2: GENERAL INFORMATION
  const renderGeneralInfo = () => {
    return (
      <div className="space-y-8">
        {/* Business Description */}
        <div className="space-y-4">
          <Label htmlFor="businessDescription" className="text-lg font-semibold text-gray-900">
            Business Description *
          </Label>
          <Textarea
            id="businessDescription"
            value={formData.businessDescription}
            onChange={(e) => updateFormData('businessDescription', e.target.value)}
            placeholder="Describe your business activities, services, and products..."
            className="border-2 min-h-[120px]"
          />
        </div>

        {/* NAICS Codes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="naicsCodes" className="font-semibold text-gray-700">NAICS Codes *</Label>
            <Input
              id="naicsCodes"
              value={formData.naicsCodes}
              onChange={(e) => updateFormData('naicsCodes', e.target.value)}
              placeholder="e.g., 236220, 238210"
              className="mt-2 border-2"
            />
            <p className="text-sm text-gray-600 mt-1">Comma-separated list</p>
          </div>

          <div>
            <Label htmlFor="dateEstablished" className="font-semibold text-gray-700">Date Established *</Label>
            <Input
              id="dateEstablished"
              type="date"
              value={formData.dateEstablished}
              onChange={(e) => updateFormData('dateEstablished', e.target.value)}
              className="mt-2 border-2"
            />
          </div>
        </div>

        {/* Business Structure */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Business Structure
          </h3>

          <div>
            <Label className="font-semibold text-gray-700 mb-3 block">For-Profit Status *</Label>
            <RadioGroup
              value={formData.isForProfit}
              onValueChange={(value) => updateFormData('isForProfit', value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="yes" id="forProfit" />
                <Label htmlFor="forProfit" className="cursor-pointer">For-Profit</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="no" id="nonProfit" />
                <Label htmlFor="nonProfit" className="cursor-pointer">Non-Profit</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="federalTaxId" className="font-semibold text-gray-700">Federal Tax ID (EIN) *</Label>
            <Input
              id="federalTaxId"
              value={formData.federalTaxId}
              onChange={(e) => updateFormData('federalTaxId', e.target.value)}
              placeholder="XX-XXXXXXX"
              className="mt-2 border-2"
            />
          </div>

          <div>
            <Label className="font-semibold text-gray-700 mb-3 block">Legal Structure * (Check all that apply)</Label>
            <div className="space-y-3">
              {[
                { value: 'corporation', label: 'Corporation' },
                { value: 'llc', label: 'Limited Liability Company (LLC)' },
                { value: 'partnership', label: 'Partnership' },
                { value: 'soleProprietorship', label: 'Sole Proprietorship' },
                { value: 'other', label: 'Other' }
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                  <Checkbox
                    id={option.value}
                    checked={formData.legalStructure.includes(option.value)}
                    onCheckedChange={() => toggleArrayValue('legalStructure', option.value)}
                  />
                  <Label htmlFor={option.value} className="cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </div>
            
            {formData.legalStructure.includes('other') && (
              <div className="mt-4">
                <Label htmlFor="otherLegalStructure" className="font-semibold text-gray-700">
                  Please specify:
                </Label>
                <Input
                  id="otherLegalStructure"
                  value={formData.otherLegalStructure}
                  onChange={(e) => updateFormData('otherLegalStructure', e.target.value)}
                  placeholder="Describe other legal structure"
                  className="mt-2 border-2"
                />
              </div>
            )}
          </div>
        </div>

        {/* Employees */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Number of Employees
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="fullTimeEmployees" className="font-semibold text-gray-700">Full-Time</Label>
              <Input
                id="fullTimeEmployees"
                type="number"
                value={formData.fullTimeEmployees}
                onChange={(e) => updateFormData('fullTimeEmployees', e.target.value)}
                placeholder="0"
                className="mt-2 border-2"
              />
            </div>

            <div>
              <Label htmlFor="partTimeEmployees" className="font-semibold text-gray-700">Part-Time</Label>
              <Input
                id="partTimeEmployees"
                type="number"
                value={formData.partTimeEmployees}
                onChange={(e) => updateFormData('partTimeEmployees', e.target.value)}
                placeholder="0"
                className="mt-2 border-2"
              />
            </div>

            <div>
              <Label htmlFor="seasonalEmployees" className="font-semibold text-gray-700">Seasonal</Label>
              <Input
                id="seasonalEmployees"
                type="number"
                value={formData.seasonalEmployees}
                onChange={(e) => updateFormData('seasonalEmployees', e.target.value)}
                placeholder="0"
                className="mt-2 border-2"
              />
            </div>
          </div>
        </div>

        {/* Gross Receipts */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Gross Receipts (Last 5 Years)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
                <tr>
                  <th className="border-2 border-gray-300 p-3 text-left font-semibold">Year</th>
                  <th className="border-2 border-gray-300 p-3 text-left font-semibold">Applicant Firm Amount</th>
                  <th className="border-2 border-gray-300 p-3 text-left font-semibold">Affiliate Amount</th>
                </tr>
              </thead>
              <tbody>
                {formData.grossReceipts.map((receipt, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border-2 border-gray-300 p-2">
                      <Input
                        type="number"
                        value={receipt.year}
                        onChange={(e) => updateArrayItem('grossReceipts', index, 'year', e.target.value)}
                        placeholder={`${new Date().getFullYear() - index}`}
                        className="border-2"
                      />
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      <Input
                        type="number"
                        value={receipt.applicantAmount}
                        onChange={(e) => updateArrayItem('grossReceipts', index, 'applicantAmount', e.target.value)}
                        placeholder="$0"
                        className="border-2"
                      />
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      <Input
                        type="number"
                        value={receipt.affiliateAmount}
                        onChange={(e) => updateArrayItem('grossReceipts', index, 'affiliateAmount', e.target.value)}
                        placeholder="$0"
                        className="border-2"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Business Relationships */}
        <div className="space-y-6 bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-yellow-300 pb-2">
            Business Relationships
          </h3>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 bg-white p-4 rounded-lg border-2 border-gray-200">
                <Checkbox
                  id="sharedResources"
                  checked={formData.sharedResources}
                  onCheckedChange={(checked) => updateFormData('sharedResources', checked)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="sharedResources" className="cursor-pointer font-semibold text-gray-800">
                    Does your firm share equipment, facilities, or employees with other businesses?
                  </Label>
                </div>
              </div>
              
              {formData.sharedResources && (
                <div className="ml-8">
                  <Textarea
                    value={formData.sharedResourcesExplanation}
                    onChange={(e) => updateFormData('sharedResourcesExplanation', e.target.value)}
                    placeholder="Please explain..."
                    className="border-2 min-h-[80px]"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 bg-white p-4 rounded-lg border-2 border-gray-200">
                <Checkbox
                  id="otherOwnershipInterest"
                  checked={formData.otherOwnershipInterest}
                  onCheckedChange={(checked) => updateFormData('otherOwnershipInterest', checked)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="otherOwnershipInterest" className="cursor-pointer font-semibold text-gray-800">
                    Do any owners have ownership interests in other businesses?
                  </Label>
                </div>
              </div>
              
              {formData.otherOwnershipInterest && (
                <div className="ml-8">
                  <Textarea
                    value={formData.otherOwnershipInterestExplanation}
                    onChange={(e) => updateFormData('otherOwnershipInterestExplanation', e.target.value)}
                    placeholder="Please explain..."
                    className="border-2 min-h-[80px]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Business History */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Business History
          </h3>

          <div className="space-y-6">
            {[
              { field: 'differentOwnership', label: 'Has the firm operated under different ownership in the past?' },
              { field: 'subsidiary', label: 'Is the firm a subsidiary of another business?' },
              { field: 'partnershipWithFirms', label: 'Does the firm have partnerships with other firms?' },
              { field: 'ownsOtherFirms', label: 'Do any owners own other firms?' },
              { field: 'hasSubsidiaries', label: 'Does the firm have any subsidiaries?' },
              { field: 'majorSubcontractor', label: 'Is the firm a major subcontractor to another firm?' }
            ].map((item) => (
              <div key={item.field} className="space-y-4">
                <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                  <Checkbox
                    id={item.field}
                    checked={formData[item.field]}
                    onCheckedChange={(checked) => updateFormData(item.field, checked)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor={item.field} className="cursor-pointer font-semibold text-gray-800">
                      {item.label}
                    </Label>
                  </div>
                </div>
                
                {formData[item.field] && (
                  <div className="ml-8">
                    <Textarea
                      value={formData[`${item.field}Explanation`]}
                      onChange={(e) => updateFormData(`${item.field}Explanation`, e.target.value)}
                      placeholder="Please explain..."
                      className="border-2 min-h-[80px]"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // SECTION 3: MAJORITY OWNER
  const renderMajorityOwner = () => {
    const owner = formData.majorityOwner;
    
    return (
      <div className="space-y-8">
        <Alert className="bg-blue-50 border-blue-300">
          <AlertCircle className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-blue-900">
            Provide information about the individual who owns 51% or more of the business.
          </AlertDescription>
        </Alert>

        {/* Basic Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Owner Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="ownerFullName" className="font-semibold text-gray-700">Full Name *</Label>
              <Input
                id="ownerFullName"
                value={owner.fullName}
                onChange={(e) => updateNestedData('majorityOwner', 'fullName', e.target.value)}
                placeholder="Full legal name"
                className="mt-2 border-2"
              />
            </div>

            <div>
              <Label htmlFor="ownerTitle" className="font-semibold text-gray-700">Title *</Label>
              <Input
                id="ownerTitle"
                value={owner.title}
                onChange={(e) => updateNestedData('majorityOwner', 'title', e.target.value)}
                placeholder="e.g., President, CEO"
                className="mt-2 border-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="ownerHomePhone" className="font-semibold text-gray-700">Home Phone *</Label>
            <Input
              id="ownerHomePhone"
              type="tel"
              value={owner.homePhone}
              onChange={(e) => updateNestedData('majorityOwner', 'homePhone', e.target.value)}
              placeholder="(555) 123-4567"
              className="mt-2 border-2"
            />
          </div>

          <div>
            <Label htmlFor="ownerHomeAddress" className="font-semibold text-gray-700">Home Address *</Label>
            <Input
              id="ownerHomeAddress"
              value={owner.homeAddress}
              onChange={(e) => updateNestedData('majorityOwner', 'homeAddress', e.target.value)}
              placeholder="Street address"
              className="mt-2 border-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="ownerHomeCity" className="font-semibold text-gray-700">City *</Label>
              <Input
                id="ownerHomeCity"
                value={owner.homeCity}
                onChange={(e) => updateNestedData('majorityOwner', 'homeCity', e.target.value)}
                placeholder="City"
                className="mt-2 border-2"
              />
            </div>

            <div>
              <Label htmlFor="ownerHomeState" className="font-semibold text-gray-700">State *</Label>
              <Input
                id="ownerHomeState"
                value={owner.homeState}
                onChange={(e) => updateNestedData('majorityOwner', 'homeState', e.target.value)}
                placeholder="CA"
                maxLength={2}
                className="mt-2 border-2"
              />
            </div>

            <div>
              <Label htmlFor="ownerHomeZip" className="font-semibold text-gray-700">ZIP Code *</Label>
              <Input
                id="ownerHomeZip"
                value={owner.homeZip}
                onChange={(e) => updateNestedData('majorityOwner', 'homeZip', e.target.value)}
                placeholder="12345"
                className="mt-2 border-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="font-semibold text-gray-700 mb-3 block">Sex *</Label>
              <RadioGroup
                value={owner.sex}
                onValueChange={(value) => updateNestedData('majorityOwner', 'sex', value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="cursor-pointer">Male</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="cursor-pointer">Female</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="font-semibold text-gray-700 mb-3 block">Residency Status *</Label>
              <RadioGroup
                value={owner.residencyStatus}
                onValueChange={(value) => updateNestedData('majorityOwner', 'residencyStatus', value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="citizen" id="citizen" />
                  <Label htmlFor="citizen" className="cursor-pointer">U.S. Citizen</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="resident" id="resident" />
                  <Label htmlFor="resident" className="cursor-pointer">Lawful Permanent Resident</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div>
            <Label className="font-semibold text-gray-700 mb-3 block">
              Group Membership * (Check all that apply)
            </Label>
            <div className="space-y-3">
              {[
                { value: 'blackAmerican', label: 'Black American' },
                { value: 'hispanicAmerican', label: 'Hispanic American' },
                { value: 'nativeAmerican', label: 'Native American' },
                { value: 'asianPacific', label: 'Asian-Pacific American' },
                { value: 'subcontinent', label: 'Subcontinent Asian American' },
                { value: 'woman', label: 'Woman' },
                { value: 'other', label: 'Other' }
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                  <Checkbox
                    id={`group-${option.value}`}
                    checked={owner.groupMembership.includes(option.value)}
                    onCheckedChange={() => toggleNestedArrayValue('majorityOwner', 'groupMembership', option.value)}
                  />
                  <Label htmlFor={`group-${option.value}`} className="cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </div>
            
            {owner.groupMembership.includes('other') && (
              <div className="mt-4">
                <Label htmlFor="otherGroup" className="font-semibold text-gray-700">Please specify:</Label>
                <Input
                  id="otherGroup"
                  value={owner.otherGroup}
                  onChange={(e) => updateNestedData('majorityOwner', 'otherGroup', e.target.value)}
                  placeholder="Specify other group"
                  className="mt-2 border-2"
                />
              </div>
            )}
          </div>
        </div>

        {/* Ownership Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Ownership Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="yearsAsOwner" className="font-semibold text-gray-700">Years as Owner *</Label>
              <Input
                id="yearsAsOwner"
                type="number"
                value={owner.yearsAsOwner}
                onChange={(e) => updateNestedData('majorityOwner', 'yearsAsOwner', e.target.value)}
                placeholder="0"
                className="mt-2 border-2"
              />
            </div>

            <div>
              <Label htmlFor="percentageOwned" className="font-semibold text-gray-700">Percentage Owned *</Label>
              <Input
                id="percentageOwned"
                type="number"
                value={owner.percentageOwned}
                onChange={(e) => updateNestedData('majorityOwner', 'percentageOwned', e.target.value)}
                placeholder="51-100"
                min="51"
                max="100"
                className="mt-2 border-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="classOfStock" className="font-semibold text-gray-700">Class of Stock</Label>
              <Input
                id="classOfStock"
                value={owner.classOfStock}
                onChange={(e) => updateNestedData('majorityOwner', 'classOfStock', e.target.value)}
                placeholder="e.g., Common, Preferred"
                className="mt-2 border-2"
              />
            </div>

            <div>
              <Label htmlFor="dateAcquired" className="font-semibold text-gray-700">Date Acquired *</Label>
              <Input
                id="dateAcquired"
                type="date"
                value={owner.dateAcquired}
                onChange={(e) => updateNestedData('majorityOwner', 'dateAcquired', e.target.value)}
                className="mt-2 border-2"
              />
            </div>
          </div>
        </div>

        {/* Initial Investment */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Initial Investment
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="cashInvestment" className="font-semibold text-gray-700">Cash Investment</Label>
              <Input
                id="cashInvestment"
                type="number"
                value={owner.cashInvestment}
                onChange={(e) => updateNestedData('majorityOwner', 'cashInvestment', e.target.value)}
                placeholder="$0"
                className="mt-2 border-2"
              />
            </div>

            <div>
              <Label htmlFor="realEstateInvestment" className="font-semibold text-gray-700">Real Estate Investment</Label>
              <Input
                id="realEstateInvestment"
                type="number"
                value={owner.realEstateInvestment}
                onChange={(e) => updateNestedData('majorityOwner', 'realEstateInvestment', e.target.value)}
                placeholder="$0"
                className="mt-2 border-2"
              />
            </div>

            <div>
              <Label htmlFor="equipmentInvestment" className="font-semibold text-gray-700">Equipment Investment</Label>
              <Input
                id="equipmentInvestment"
                type="number"
                value={owner.equipmentInvestment}
                onChange={(e) => updateNestedData('majorityOwner', 'equipmentInvestment', e.target.value)}
                placeholder="$0"
                className="mt-2 border-2"
              />
            </div>

            <div>
              <Label htmlFor="otherInvestment" className="font-semibold text-gray-700">Other Investment</Label>
              <Input
                id="otherInvestment"
                type="number"
                value={owner.otherInvestment}
                onChange={(e) => updateNestedData('majorityOwner', 'otherInvestment', e.target.value)}
                placeholder="$0"
                className="mt-2 border-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="acquisitionMethod" className="font-semibold text-gray-700">Acquisition Method</Label>
            <Input
              id="acquisitionMethod"
              value={owner.acquisitionMethod}
              onChange={(e) => updateNestedData('majorityOwner', 'acquisitionMethod', e.target.value)}
              placeholder="e.g., Purchase, Gift, Inheritance"
              className="mt-2 border-2"
            />
          </div>

          <div>
            <Label htmlFor="acquisitionDetails" className="font-semibold text-gray-700">Acquisition Details</Label>
            <Textarea
              id="acquisitionDetails"
              value={owner.acquisitionDetails}
              onChange={(e) => updateNestedData('majorityOwner', 'acquisitionDetails', e.target.value)}
              placeholder="Provide details about how ownership was acquired..."
              className="mt-2 border-2 min-h-[100px]"
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Additional Information
          </h3>

          <div>
            <Label htmlFor="familialRelationships" className="font-semibold text-gray-700">
              Familial Relationships to Other Owners/Officers
            </Label>
            <Textarea
              id="familialRelationships"
              value={owner.familialRelationships}
              onChange={(e) => updateNestedData('majorityOwner', 'familialRelationships', e.target.value)}
              placeholder="Describe any family relationships..."
              className="mt-2 border-2 min-h-[80px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
              <Checkbox
                id="managementForOtherBusiness"
                checked={owner.managementForOtherBusiness}
                onCheckedChange={(checked) => updateNestedData('majorityOwner', 'managementForOtherBusiness', checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="managementForOtherBusiness" className="cursor-pointer font-semibold text-gray-800">
                  Do you provide management services for another business?
                </Label>
              </div>
            </div>
            
            {owner.managementForOtherBusiness && (
              <div className="ml-8 space-y-4">
                <div>
                  <Label htmlFor="otherBusinessName" className="font-semibold text-gray-700">Business Name</Label>
                  <Input
                    id="otherBusinessName"
                    value={owner.otherBusinessName}
                    onChange={(e) => updateNestedData('majorityOwner', 'otherBusinessName', e.target.value)}
                    placeholder="Business name"
                    className="mt-2 border-2"
                  />
                </div>
                <div>
                  <Label htmlFor="otherBusinessFunction" className="font-semibold text-gray-700">Function/Role</Label>
                  <Input
                    id="otherBusinessFunction"
                    value={owner.otherBusinessFunction}
                    onChange={(e) => updateNestedData('majorityOwner', 'otherBusinessFunction', e.target.value)}
                    placeholder="Describe your role"
                    className="mt-2 border-2"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
              <Checkbox
                id="ownsOrWorksForRelatedFirm"
                checked={owner.ownsOrWorksForRelatedFirm}
                onCheckedChange={(checked) => updateNestedData('majorityOwner', 'ownsOrWorksForRelatedFirm', checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="ownsOrWorksForRelatedFirm" className="cursor-pointer font-semibold text-gray-800">
                  Do you own or work for any related firm?
                </Label>
              </div>
            </div>
            
            {owner.ownsOrWorksForRelatedFirm && (
              <div className="ml-8">
                <Label htmlFor="relatedFirmDetails" className="font-semibold text-gray-700">Details</Label>
                <Textarea
                  id="relatedFirmDetails"
                  value={owner.relatedFirmDetails}
                  onChange={(e) => updateNestedData('majorityOwner', 'relatedFirmDetails', e.target.value)}
                  placeholder="Provide details..."
                  className="mt-2 border-2 min-h-[80px]"
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="otherActivities" className="font-semibold text-gray-700">
              Other Business Activities
            </Label>
            <Textarea
              id="otherActivities"
              value={owner.otherActivities}
              onChange={(e) => updateNestedData('majorityOwner', 'otherActivities', e.target.value)}
              placeholder="Describe any other business activities..."
              className="mt-2 border-2 min-h-[80px]"
            />
          </div>

          <div>
            <Label htmlFor="personalNetWorth" className="font-semibold text-gray-700">Personal Net Worth</Label>
            <Input
              id="personalNetWorth"
              type="number"
              value={owner.personalNetWorth}
              onChange={(e) => updateNestedData('majorityOwner', 'personalNetWorth', e.target.value)}
              placeholder="$0"
              className="mt-2 border-2"
            />
          </div>

          <div className="flex items-start space-x-3 bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
            <Checkbox
              id="trustCreated"
              checked={owner.trustCreated}
              onCheckedChange={(checked) => updateNestedData('majorityOwner', 'trustCreated', checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <Label htmlFor="trustCreated" className="cursor-pointer font-semibold text-gray-800">
                Has a trust been created for your benefit?
              </Label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // SECTION 3: ADDITIONAL OWNERS
  const renderAdditionalOwners = () => {
    return (
      <div className="space-y-8">
        <Alert className="bg-blue-50 border-blue-300">
          <AlertCircle className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-blue-900">
            Provide information about any additional owners who own less than 51% of the business.
          </AlertDescription>
        </Alert>

        {formData.additionalOwners.map((owner, ownerIndex) => (
          <Card key={ownerIndex} className="border-2 border-gray-300">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Additional Owner #{ownerIndex + 1}</CardTitle>
                {formData.additionalOwners.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeArrayItem('additionalOwners', ownerIndex)}
                    className="flex items-center space-x-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Remove</span>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="font-semibold text-gray-700">Full Name</Label>
                  <Input
                    value={owner.fullName}
                    onChange={(e) => updateArrayItem('additionalOwners', ownerIndex, 'fullName', e.target.value)}
                    placeholder="Full legal name"
                    className="mt-2 border-2"
                  />
                </div>

                <div>
                  <Label className="font-semibold text-gray-700">Title</Label>
                  <Input
                    value={owner.title}
                    onChange={(e) => updateArrayItem('additionalOwners', ownerIndex, 'title', e.target.value)}
                    placeholder="Job title"
                    className="mt-2 border-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="font-semibold text-gray-700">Percentage Owned</Label>
                  <Input
                    type="number"
                    value={owner.percentageOwned}
                    onChange={(e) => updateArrayItem('additionalOwners', ownerIndex, 'percentageOwned', e.target.value)}
                    placeholder="0-49"
                    max="49"
                    className="mt-2 border-2"
                  />
                </div>

                <div>
                  <Label className="font-semibold text-gray-700">Years as Owner</Label>
                  <Input
                    type="number"
                    value={owner.yearsAsOwner}
                    onChange={(e) => updateArrayItem('additionalOwners', ownerIndex, 'yearsAsOwner', e.target.value)}
                    placeholder="0"
                    className="mt-2 border-2"
                  />
                </div>
              </div>

              <div>
                <Label className="font-semibold text-gray-700">Home Phone</Label>
                <Input
                  type="tel"
                  value={owner.homePhone}
                  onChange={(e) => updateArrayItem('additionalOwners', ownerIndex, 'homePhone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className="mt-2 border-2"
                />
              </div>

              <div>
                <Label className="font-semibold text-gray-700">Home Address</Label>
                <Input
                  value={owner.homeAddress}
                  onChange={(e) => updateArrayItem('additionalOwners', ownerIndex, 'homeAddress', e.target.value)}
                  placeholder="Street address"
                  className="mt-2 border-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="font-semibold text-gray-700">City</Label>
                  <Input
                    value={owner.homeCity}
                    onChange={(e) => updateArrayItem('additionalOwners', ownerIndex, 'homeCity', e.target.value)}
                    placeholder="City"
                    className="mt-2 border-2"
                  />
                </div>

                <div>
                  <Label className="font-semibold text-gray-700">State</Label>
                  <Input
                    value={owner.homeState}
                    onChange={(e) => updateArrayItem('additionalOwners', ownerIndex, 'homeState', e.target.value)}
                    placeholder="CA"
                    maxLength={2}
                    className="mt-2 border-2"
                  />
                </div>

                <div>
                  <Label className="font-semibold text-gray-700">ZIP Code</Label>
                  <Input
                    value={owner.homeZip}
                    onChange={(e) => updateArrayItem('additionalOwners', ownerIndex, 'homeZip', e.target.value)}
                    placeholder="12345"
                    className="mt-2 border-2"
                  />
                </div>
              </div>

              <div>
                <Label className="font-semibold text-gray-700">Cash Investment</Label>
                <Input
                  type="number"
                  value={owner.cashInvestment}
                  onChange={(e) => updateArrayItem('additionalOwners', ownerIndex, 'cashInvestment', e.target.value)}
                  placeholder="$0"
                  className="mt-2 border-2"
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          onClick={() => addArrayItem('additionalOwners', {
            fullName: '',
            title: '',
            homePhone: '',
            homeAddress: '',
            homeCity: '',
            homeState: '',
            homeZip: '',
            sex: '',
            groupMembership: [],
            otherGroup: '',
            residencyStatus: '',
            yearsAsOwner: '',
            percentageOwned: '',
            classOfStock: '',
            dateAcquired: '',
            cashInvestment: '',
            realEstateInvestment: '',
            equipmentInvestment: '',
            otherInvestment: '',
            acquisitionMethod: '',
            acquisitionDetails: '',
            familialRelationships: '',
            managementForOtherBusiness: false,
            otherBusinessName: '',
            otherBusinessFunction: '',
            ownsOrWorksForRelatedFirm: false,
            relatedFirmDetails: '',
            otherActivities: '',
            personalNetWorth: '',
            trustCreated: false,
            familyBusinessAssociations: []
          })}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <Plus className="h-5 w-5" />
          <span>Add Another Owner</span>
        </Button>
      </div>
    );
  };

  // SECTION 4: CONTROL - OFFICERS & DIRECTORS
  const renderControl = () => {
    return (
      <div className="space-y-8">
        {/* Officers */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Officers
          </h3>

          {formData.officers.map((officer, index) => (
            <Card key={index} className="border-2 border-gray-300">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900">Officer #{index + 1}</h4>
                  {formData.officers.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('officers', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold text-gray-700">Name</Label>
                    <Input
                      value={officer.name}
                      onChange={(e) => updateArrayItem('officers', index, 'name', e.target.value)}
                      placeholder="Full name"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Title</Label>
                    <Input
                      value={officer.title}
                      onChange={(e) => updateArrayItem('officers', index, 'title', e.target.value)}
                      placeholder="Title"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Date Appointed</Label>
                    <Input
                      type="date"
                      value={officer.dateAppointed}
                      onChange={(e) => updateArrayItem('officers', index, 'dateAppointed', e.target.value)}
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Ethnicity</Label>
                    <Input
                      value={officer.ethnicity}
                      onChange={(e) => updateArrayItem('officers', index, 'ethnicity', e.target.value)}
                      placeholder="Ethnicity"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Sex</Label>
                    <Input
                      value={officer.sex}
                      onChange={(e) => updateArrayItem('officers', index, 'sex', e.target.value)}
                      placeholder="Male/Female"
                      className="mt-2 border-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={() => addArrayItem('officers', { name: '', title: '', dateAppointed: '', ethnicity: '', sex: '' })}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Officer</span>
          </Button>
        </div>

        {/* Directors */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Board of Directors
          </h3>

          {formData.directors.map((director, index) => (
            <Card key={index} className="border-2 border-gray-300">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900">Director #{index + 1}</h4>
                  {formData.directors.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('directors', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold text-gray-700">Name</Label>
                    <Input
                      value={director.name}
                      onChange={(e) => updateArrayItem('directors', index, 'name', e.target.value)}
                      placeholder="Full name"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Title</Label>
                    <Input
                      value={director.title}
                      onChange={(e) => updateArrayItem('directors', index, 'title', e.target.value)}
                      placeholder="Title"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Date Appointed</Label>
                    <Input
                      type="date"
                      value={director.dateAppointed}
                      onChange={(e) => updateArrayItem('directors', index, 'dateAppointed', e.target.value)}
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Ethnicity</Label>
                    <Input
                      value={director.ethnicity}
                      onChange={(e) => updateArrayItem('directors', index, 'ethnicity', e.target.value)}
                      placeholder="Ethnicity"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Sex</Label>
                    <Input
                      value={director.sex}
                      onChange={(e) => updateArrayItem('directors', index, 'sex', e.target.value)}
                      placeholder="Male/Female"
                      className="mt-2 border-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={() => addArrayItem('directors', { name: '', title: '', dateAppointed: '', ethnicity: '', sex: '' })}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Director</span>
          </Button>
        </div>
      </div>
    );
  };

  // SECTION 4: KEY PERSONNEL
  const renderKeyPersonnel = () => {
    return (
      <div className="space-y-8">
        <Alert className="bg-blue-50 border-blue-300">
          <AlertCircle className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-blue-900">
            Indicate the frequency with which key personnel perform critical business functions.
          </AlertDescription>
        </Alert>

        {formData.keyPersonnel.map((person, personIndex) => (
          <Card key={personIndex} className="border-2 border-gray-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Key Personnel #{personIndex + 1}</CardTitle>
                {formData.keyPersonnel.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeArrayItem('keyPersonnel', personIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="font-semibold text-gray-700">Name</Label>
                  <Input
                    value={person.name}
                    onChange={(e) => updateArrayItem('keyPersonnel', personIndex, 'name', e.target.value)}
                    placeholder="Full name"
                    className="mt-2 border-2"
                  />
                </div>

                <div>
                  <Label className="font-semibold text-gray-700">Title</Label>
                  <Input
                    value={person.title}
                    onChange={(e) => updateArrayItem('keyPersonnel', personIndex, 'title', e.target.value)}
                    placeholder="Job title"
                    className="mt-2 border-2"
                  />
                </div>

                <div>
                  <Label className="font-semibold text-gray-700">Race/Ethnicity</Label>
                  <Input
                    value={person.race}
                    onChange={(e) => updateArrayItem('keyPersonnel', personIndex, 'race', e.target.value)}
                    placeholder="Race/Ethnicity"
                    className="mt-2 border-2"
                  />
                </div>

                <div>
                  <Label className="font-semibold text-gray-700">Sex</Label>
                  <Input
                    value={person.sex}
                    onChange={(e) => updateArrayItem('keyPersonnel', personIndex, 'sex', e.target.value)}
                    placeholder="Male/Female"
                    className="mt-2 border-2"
                  />
                </div>

                <div>
                  <Label className="font-semibold text-gray-700">% Ownership</Label>
                  <Input
                    type="number"
                    value={person.percentOwnership}
                    onChange={(e) => updateArrayItem('keyPersonnel', personIndex, 'percentOwnership', e.target.value)}
                    placeholder="0-100"
                    className="mt-2 border-2"
                  />
                </div>
              </div>

              {/* Duties Table */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Duties & Responsibilities</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Select frequency: Never, Occasionally, Frequently, Always
                </p>

                <div className="space-y-3">
                  {[
                    { key: 'setsPolicy', label: 'Sets policy and plans for the business' },
                    { key: 'biddingEstimating', label: 'Responsible for bidding/estimating' },
                    { key: 'majorPurchasing', label: 'Responsible for major purchasing' },
                    { key: 'marketingSales', label: 'Responsible for marketing/sales' },
                    { key: 'supervisesField', label: 'Supervises field operations' },
                    { key: 'attendsBidOpenings', label: 'Attends bid openings' },
                    { key: 'officeManagement', label: 'Responsible for office management' },
                    { key: 'hiresFiresManagement', label: 'Hires/fires management personnel' },
                    { key: 'hiresFiresField', label: 'Hires/fires field personnel' },
                    { key: 'designatesProfits', label: 'Designates profits/dividends' },
                    { key: 'obligatesBusiness', label: 'Obligates business legally' },
                    { key: 'purchasesEquipment', label: 'Purchases major equipment' },
                    { key: 'signsChecks', label: 'Signs checks' }
                  ].map((duty) => (
                    <div key={duty.key} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <Label className="font-medium text-gray-900 mb-2 block">{duty.label}</Label>
                      <RadioGroup
                        value={person.duties[duty.key]}
                        onValueChange={(value) => {
                          const updatedDuties = { ...person.duties, [duty.key]: value };
                          updateArrayItem('keyPersonnel', personIndex, 'duties', updatedDuties);
                        }}
                        className="flex flex-wrap gap-4"
                      >
                        {['never', 'occasionally', 'frequently', 'always'].map((freq) => (
                          <div key={freq} className="flex items-center space-x-2">
                            <RadioGroupItem value={freq} id={`${duty.key}-${freq}-${personIndex}`} />
                            <Label htmlFor={`${duty.key}-${freq}-${personIndex}`} className="cursor-pointer capitalize">
                              {freq}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          onClick={() => addArrayItem('keyPersonnel', {
            name: '',
            title: '',
            race: '',
            sex: '',
            percentOwnership: '',
            duties: {
              setsPolicy: 'never',
              biddingEstimating: 'never',
              majorPurchasing: 'never',
              marketingSales: 'never',
              supervisesField: 'never',
              attendsBidOpenings: 'never',
              officeManagement: 'never',
              hiresFiresManagement: 'never',
              hiresFiresField: 'never',
              designatesProfits: 'never',
              obligatesBusiness: 'never',
              purchasesEquipment: 'never',
              signsChecks: 'never'
            },
            managesOtherBusiness: false,
            otherBusinessDetails: '',
            ownsWorksRelatedFirm: false,
            relatedFirmDetails: ''
          })}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <Plus className="h-5 w-5" />
          <span>Add Key Personnel</span>
        </Button>
      </div>
    );
  };

  // SECTION 4: INVENTORY
  const renderInventory = () => {
    return (
      <div className="space-y-8">
        {/* Equipment */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Equipment
          </h3>

          {formData.equipment.map((item, index) => (
            <Card key={index} className="border-2 border-gray-300">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900">Equipment #{index + 1}</h4>
                  {formData.equipment.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('equipment', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold text-gray-700">Make/Model</Label>
                    <Input
                      value={item.makeModel}
                      onChange={(e) => updateArrayItem('equipment', index, 'makeModel', e.target.value)}
                      placeholder="Make and model"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Current Value</Label>
                    <Input
                      type="number"
                      value={item.currentValue}
                      onChange={(e) => updateArrayItem('equipment', index, 'currentValue', e.target.value)}
                      placeholder="$0"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Owned or Leased</Label>
                    <Input
                      value={item.ownedOrLeased}
                      onChange={(e) => updateArrayItem('equipment', index, 'ownedOrLeased', e.target.value)}
                      placeholder="Owned/Leased"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Used as Collateral?</Label>
                    <Input
                      value={item.usedAsCollateral}
                      onChange={(e) => updateArrayItem('equipment', index, 'usedAsCollateral', e.target.value)}
                      placeholder="Yes/No"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label className="font-semibold text-gray-700">Where Stored</Label>
                    <Input
                      value={item.whereStored}
                      onChange={(e) => updateArrayItem('equipment', index, 'whereStored', e.target.value)}
                      placeholder="Storage location"
                      className="mt-2 border-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={() => addArrayItem('equipment', { makeModel: '', currentValue: '', ownedOrLeased: '', usedAsCollateral: '', whereStored: '' })}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Equipment</span>
          </Button>
        </div>

        {/* Office Space */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Office Space
          </h3>

          {formData.officeSpace.map((space, index) => (
            <Card key={index} className="border-2 border-gray-300">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900">Office #{index + 1}</h4>
                  {formData.officeSpace.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('officeSpace', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label className="font-semibold text-gray-700">Address</Label>
                    <Input
                      value={space.address}
                      onChange={(e) => updateArrayItem('officeSpace', index, 'address', e.target.value)}
                      placeholder="Street address"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">City</Label>
                    <Input
                      value={space.city}
                      onChange={(e) => updateArrayItem('officeSpace', index, 'city', e.target.value)}
                      placeholder="City"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">State</Label>
                    <Input
                      value={space.state}
                      onChange={(e) => updateArrayItem('officeSpace', index, 'state', e.target.value)}
                      placeholder="CA"
                      maxLength={2}
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">ZIP Code</Label>
                    <Input
                      value={space.zip}
                      onChange={(e) => updateArrayItem('officeSpace', index, 'zip', e.target.value)}
                      placeholder="12345"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Owned or Leased</Label>
                    <Input
                      value={space.ownedOrLeased}
                      onChange={(e) => updateArrayItem('officeSpace', index, 'ownedOrLeased', e.target.value)}
                      placeholder="Owned/Leased"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Current Value</Label>
                    <Input
                      type="number"
                      value={space.currentValue}
                      onChange={(e) => updateArrayItem('officeSpace', index, 'currentValue', e.target.value)}
                      placeholder="$0"
                      className="mt-2 border-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={() => addArrayItem('officeSpace', { address: '', city: '', state: '', zip: '', ownedOrLeased: '', currentValue: '' })}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Office Space</span>
          </Button>
        </div>

        {/* Storage Space */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Storage/Warehouse Space
          </h3>

          {formData.storageSpace.map((space, index) => (
            <Card key={index} className="border-2 border-gray-300">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900">Storage #{index + 1}</h4>
                  {formData.storageSpace.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('storageSpace', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label className="font-semibold text-gray-700">Address</Label>
                    <Input
                      value={space.address}
                      onChange={(e) => updateArrayItem('storageSpace', index, 'address', e.target.value)}
                      placeholder="Street address"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">City</Label>
                    <Input
                      value={space.city}
                      onChange={(e) => updateArrayItem('storageSpace', index, 'city', e.target.value)}
                      placeholder="City"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">State</Label>
                    <Input
                      value={space.state}
                      onChange={(e) => updateArrayItem('storageSpace', index, 'state', e.target.value)}
                      placeholder="CA"
                      maxLength={2}
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">ZIP Code</Label>
                    <Input
                      value={space.zip}
                      onChange={(e) => updateArrayItem('storageSpace', index, 'zip', e.target.value)}
                      placeholder="12345"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Owned or Leased</Label>
                    <Input
                      value={space.ownedOrLeased}
                      onChange={(e) => updateArrayItem('storageSpace', index, 'ownedOrLeased', e.target.value)}
                      placeholder="Owned/Leased"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Current Value</Label>
                    <Input
                      type="number"
                      value={space.currentValue}
                      onChange={(e) => updateArrayItem('storageSpace', index, 'currentValue', e.target.value)}
                      placeholder="$0"
                      className="mt-2 border-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={() => addArrayItem('storageSpace', { address: '', city: '', state: '', zip: '', ownedOrLeased: '', currentValue: '' })}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Storage Space</span>
          </Button>
        </div>
      </div>
    );
  };

  // SECTION 4: FINANCIAL
  const renderFinancial = () => {
    return (
      <div className="space-y-8">
        {/* Bank Accounts */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Bank Accounts
          </h3>

          {formData.bankAccounts.map((account, index) => (
            <Card key={index} className="border-2 border-gray-300">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900">Account #{index + 1}</h4>
                  {formData.bankAccounts.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('bankAccounts', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold text-gray-700">Bank Name</Label>
                    <Input
                      value={account.bankName}
                      onChange={(e) => updateArrayItem('bankAccounts', index, 'bankName', e.target.value)}
                      placeholder="Bank name"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">City, State</Label>
                    <Input
                      value={account.cityState}
                      onChange={(e) => updateArrayItem('bankAccounts', index, 'cityState', e.target.value)}
                      placeholder="City, State"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label className="font-semibold text-gray-700">Authorized Signers</Label>
                    <Input
                      value={account.authorizedSigners}
                      onChange={(e) => updateArrayItem('bankAccounts', index, 'authorizedSigners', e.target.value)}
                      placeholder="Names of authorized signers"
                      className="mt-2 border-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={() => addArrayItem('bankAccounts', { bankName: '', cityState: '', authorizedSigners: '' })}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Bank Account</span>
          </Button>
        </div>

        {/* Bonding */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Bonding Capacity
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="bondingAggregate" className="font-semibold text-gray-700">Aggregate Bonding Capacity</Label>
              <Input
                id="bondingAggregate"
                type="number"
                value={formData.bondingAggregate}
                onChange={(e) => updateFormData('bondingAggregate', e.target.value)}
                placeholder="$0"
                className="mt-2 border-2"
              />
            </div>

            <div>
              <Label htmlFor="bondingProjectLimit" className="font-semibold text-gray-700">Single Project Limit</Label>
              <Input
                id="bondingProjectLimit"
                type="number"
                value={formData.bondingProjectLimit}
                onChange={(e) => updateFormData('bondingProjectLimit', e.target.value)}
                placeholder="$0"
                className="mt-2 border-2"
              />
            </div>
          </div>
        </div>

        {/* Loans */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Loans & Lines of Credit
          </h3>

          {formData.loans.map((loan, index) => (
            <Card key={index} className="border-2 border-gray-300">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900">Loan #{index + 1}</h4>
                  {formData.loans.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('loans', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold text-gray-700">Source Name</Label>
                    <Input
                      value={loan.sourceName}
                      onChange={(e) => updateArrayItem('loans', index, 'sourceName', e.target.value)}
                      placeholder="Lender name"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Source Address</Label>
                    <Input
                      value={loan.sourceAddress}
                      onChange={(e) => updateArrayItem('loans', index, 'sourceAddress', e.target.value)}
                      placeholder="Lender address"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Guarantor</Label>
                    <Input
                      value={loan.guarantor}
                      onChange={(e) => updateArrayItem('loans', index, 'guarantor', e.target.value)}
                      placeholder="Guarantor name"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Original Amount</Label>
                    <Input
                      type="number"
                      value={loan.originalAmount}
                      onChange={(e) => updateArrayItem('loans', index, 'originalAmount', e.target.value)}
                      placeholder="$0"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Current Balance</Label>
                    <Input
                      type="number"
                      value={loan.currentBalance}
                      onChange={(e) => updateArrayItem('loans', index, 'currentBalance', e.target.value)}
                      placeholder="$0"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Purpose</Label>
                    <Input
                      value={loan.purpose}
                      onChange={(e) => updateArrayItem('loans', index, 'purpose', e.target.value)}
                      placeholder="Purpose of loan"
                      className="mt-2 border-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={() => addArrayItem('loans', { sourceName: '', sourceAddress: '', guarantor: '', originalAmount: '', currentBalance: '', purpose: '' })}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Loan</span>
          </Button>
        </div>

        {/* Licenses */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Licenses & Permits
          </h3>

          {formData.licenses.map((license, index) => (
            <Card key={index} className="border-2 border-gray-300">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900">License #{index + 1}</h4>
                  {formData.licenses.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('licenses', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold text-gray-700">Holder Name</Label>
                    <Input
                      value={license.holderName}
                      onChange={(e) => updateArrayItem('licenses', index, 'holderName', e.target.value)}
                      placeholder="License holder"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Type</Label>
                    <Input
                      value={license.type}
                      onChange={(e) => updateArrayItem('licenses', index, 'type', e.target.value)}
                      placeholder="License type"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Expiration Date</Label>
                    <Input
                      type="date"
                      value={license.expirationDate}
                      onChange={(e) => updateArrayItem('licenses', index, 'expirationDate', e.target.value)}
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">State</Label>
                    <Input
                      value={license.state}
                      onChange={(e) => updateArrayItem('licenses', index, 'state', e.target.value)}
                      placeholder="CA"
                      maxLength={2}
                      className="mt-2 border-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={() => addArrayItem('licenses', { holderName: '', type: '', expirationDate: '', state: '' })}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add License</span>
          </Button>
        </div>
      </div>
    );
  };

  // SECTION 4: CONTRACTS
  const renderContracts = () => {
    return (
      <div className="space-y-8">
        {/* Completed Contracts */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Completed Contracts (Last 3 Years)
          </h3>

          {formData.completedContracts.map((contract, index) => (
            <Card key={index} className="border-2 border-gray-300">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900">Contract #{index + 1}</h4>
                  {formData.completedContracts.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('completedContracts', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold text-gray-700">Owner/Contractor</Label>
                    <Input
                      value={contract.ownerContractor}
                      onChange={(e) => updateArrayItem('completedContracts', index, 'ownerContractor', e.target.value)}
                      placeholder="Owner or contractor name"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Project Name/Location</Label>
                    <Input
                      value={contract.projectNameLocation}
                      onChange={(e) => updateArrayItem('completedContracts', index, 'projectNameLocation', e.target.value)}
                      placeholder="Project details"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Type of Work</Label>
                    <Input
                      value={contract.workType}
                      onChange={(e) => updateArrayItem('completedContracts', index, 'workType', e.target.value)}
                      placeholder="Description of work"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Dollar Value</Label>
                    <Input
                      type="number"
                      value={contract.dollarValue}
                      onChange={(e) => updateArrayItem('completedContracts', index, 'dollarValue', e.target.value)}
                      placeholder="$0"
                      className="mt-2 border-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={() => addArrayItem('completedContracts', { ownerContractor: '', projectNameLocation: '', workType: '', dollarValue: '' })}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Completed Contract</span>
          </Button>
        </div>

        {/* Active Contracts */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
            Active Contracts
          </h3>

          {formData.activeContracts.map((contract, index) => (
            <Card key={index} className="border-2 border-gray-300">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900">Active Contract #{index + 1}</h4>
                  {formData.activeContracts.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeArrayItem('activeContracts', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold text-gray-700">Prime Contractor</Label>
                    <Input
                      value={contract.primeContractor}
                      onChange={(e) => updateArrayItem('activeContracts', index, 'primeContractor', e.target.value)}
                      placeholder="Prime contractor name"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Project Number</Label>
                    <Input
                      value={contract.projectNumber}
                      onChange={(e) => updateArrayItem('activeContracts', index, 'projectNumber', e.target.value)}
                      placeholder="Project #"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Location</Label>
                    <Input
                      value={contract.location}
                      onChange={(e) => updateArrayItem('activeContracts', index, 'location', e.target.value)}
                      placeholder="Project location"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Type of Work</Label>
                    <Input
                      value={contract.workType}
                      onChange={(e) => updateArrayItem('activeContracts', index, 'workType', e.target.value)}
                      placeholder="Description of work"
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Start Date</Label>
                    <Input
                      type="date"
                      value={contract.startDate}
                      onChange={(e) => updateArrayItem('activeContracts', index, 'startDate', e.target.value)}
                      className="mt-2 border-2"
                    />
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Completion Date</Label>
                    <Input
                      type="date"
                      value={contract.completionDate}
                      onChange={(e) => updateArrayItem('activeContracts', index, 'completionDate', e.target.value)}
                      className="mt-2 border-2"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label className="font-semibold text-gray-700">Dollar Value</Label>
                    <Input
                      type="number"
                      value={contract.dollarValue}
                      onChange={(e) => updateArrayItem('activeContracts', index, 'dollarValue', e.target.value)}
                      placeholder="$0"
                      className="mt-2 border-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={() => addArrayItem('activeContracts', { primeContractor: '', projectNumber: '', location: '', workType: '', startDate: '', completionDate: '', dollarValue: '' })}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Active Contract</span>
          </Button>
        </div>
      </div>
    );
  };

  // SECTION 5: ACDBE
  const renderACDBE = () => {
    return (
      <div className="space-y-8">
        <Alert className="bg-purple-50 border-purple-300">
          <AlertCircle className="h-5 w-5 text-purple-600" />
          <AlertDescription className="text-purple-900">
            This section is only required for Airport Concession Disadvantaged Business Enterprise (ACDBE) certification.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
            <Checkbox
              id="acdbeOperatesConcession"
              checked={formData.acdbeOperatesConcession}
              onCheckedChange={(checked) => updateFormData('acdbeOperatesConcession', checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <Label htmlFor="acdbeOperatesConcession" className="cursor-pointer font-semibold text-gray-800">
                Does your firm operate a concession at an airport?
              </Label>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
            <Checkbox
              id="acdbeSuppliesGoods"
              checked={formData.acdbeSuppliesGoods}
              onCheckedChange={(checked) => updateFormData('acdbeSuppliesGoods', checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <Label htmlFor="acdbeSuppliesGoods" className="cursor-pointer font-semibold text-gray-800">
                Does your firm supply goods/services to airport concessions?
              </Label>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
            <Checkbox
              id="acdbeJointVentures"
              checked={formData.acdbeJointVentures}
              onCheckedChange={(checked) => updateFormData('acdbeJointVentures', checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <Label htmlFor="acdbeJointVentures" className="cursor-pointer font-semibold text-gray-800">
                Does your firm participate in joint ventures at airports?
              </Label>
            </div>
          </div>
        </div>

        {/* Airport Concessions */}
        {formData.acdbeOperatesConcession && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
              Airport Concessions
            </h3>

            {formData.airportConcessions.map((concession, index) => (
              <Card key={index} className="border-2 border-gray-300">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-gray-900">Concession #{index + 1}</h4>
                    {formData.airportConcessions.length > 1 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeArrayItem('airportConcessions', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold text-gray-700">Airport Name</Label>
                      <Input
                        value={concession.airportName}
                        onChange={(e) => updateArrayItem('airportConcessions', index, 'airportName', e.target.value)}
                        placeholder="Airport name"
                        className="mt-2 border-2"
                      />
                    </div>

                    <div>
                      <Label className="font-semibold text-gray-700">Concession Type</Label>
                      <Input
                        value={concession.concessionType}
                        onChange={(e) => updateArrayItem('airportConcessions', index, 'concessionType', e.target.value)}
                        placeholder="e.g., Food, Retail, Services"
                        className="mt-2 border-2"
                      />
                    </div>

                    <div>
                      <Label className="font-semibold text-gray-700">Number of Leases</Label>
                      <Input
                        type="number"
                        value={concession.numLeases}
                        onChange={(e) => updateArrayItem('airportConcessions', index, 'numLeases', e.target.value)}
                        placeholder="0"
                        className="mt-2 border-2"
                      />
                    </div>

                    <div>
                      <Label className="font-semibold text-gray-700">Number of Locations</Label>
                      <Input
                        type="number"
                        value={concession.numLocations}
                        onChange={(e) => updateArrayItem('airportConcessions', index, 'numLocations', e.target.value)}
                        placeholder="0"
                        className="mt-2 border-2"
                      />
                    </div>

                    <div>
                      <Label className="font-semibold text-gray-700">Annual Receipts</Label>
                      <Input
                        type="number"
                        value={concession.annualReceipts}
                        onChange={(e) => updateArrayItem('airportConcessions', index, 'annualReceipts', e.target.value)}
                        placeholder="$0"
                        className="mt-2 border-2"
                      />
                    </div>

                    <div>
                      <Label className="font-semibold text-gray-700">Lease Type</Label>
                      <Input
                        value={concession.leaseType}
                        onChange={(e) => updateArrayItem('airportConcessions', index, 'leaseType', e.target.value)}
                        placeholder="e.g., Direct, Sublease"
                        className="mt-2 border-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              onClick={() => addArrayItem('airportConcessions', { airportName: '', concessionType: '', numLeases: '', numLocations: '', annualReceipts: '', leaseType: '' })}
              className="w-full flex items-center justify-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Airport Concession</span>
            </Button>
          </div>
        )}
      </div>
    );
  };

  // DECLARATION & SIGNATURE
  const renderDeclaration = () => {
    const decl = formData.declaration;

    return (
      <div className="space-y-8">
        <Alert className="bg-red-50 border-red-300">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-900 font-semibold">
            I certify under penalty of perjury that all information provided in this application is true and accurate to the best of my knowledge.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="declOwnerName" className="font-semibold text-gray-700">Owner Name *</Label>
              <Input
                id="declOwnerName"
                value={decl.ownerName}
                onChange={(e) => updateNestedData('declaration', 'ownerName', e.target.value)}
                placeholder="Full name"
                className="mt-2 border-2"
              />
            </div>

            <div>
              <Label htmlFor="declOwnerTitle" className="font-semibold text-gray-700">Title *</Label>
              <Input
                id="declOwnerTitle"
                value={decl.ownerTitle}
                onChange={(e) => updateNestedData('declaration', 'ownerTitle', e.target.value)}
                placeholder="Title"
                className="mt-2 border-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="declFirmName" className="font-semibold text-gray-700">Firm Name *</Label>
            <Input
              id="declFirmName"
              value={decl.firmName}
              onChange={(e) => updateNestedData('declaration', 'firmName', e.target.value)}
              placeholder="Business name"
              className="mt-2 border-2"
            />
          </div>

          <div>
            <Label className="font-semibold text-gray-700 mb-3 block">
              Disadvantaged Group(s) * (Check all that apply)
            </Label>
            <div className="space-y-3">
              {[
                { value: 'blackAmerican', label: 'Black American' },
                { value: 'hispanicAmerican', label: 'Hispanic American' },
                { value: 'nativeAmerican', label: 'Native American' },
                { value: 'asianPacific', label: 'Asian-Pacific American' },
                { value: 'subcontinent', label: 'Subcontinent Asian American' },
                { value: 'woman', label: 'Woman' },
                { value: 'other', label: 'Other' }
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                  <Checkbox
                    id={`decl-group-${option.value}`}
                    checked={decl.disadvantagedGroups.includes(option.value)}
                    onCheckedChange={() => toggleNestedArrayValue('declaration', 'disadvantagedGroups', option.value)}
                  />
                  <Label htmlFor={`decl-group-${option.value}`} className="cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </div>

            {decl.disadvantagedGroups.includes('other') && (
              <div className="mt-4">
                <Label htmlFor="declOtherGroup" className="font-semibold text-gray-700">Please specify:</Label>
                <Input
                  id="declOtherGroup"
                  value={decl.otherGroup}
                  onChange={(e) => updateNestedData('declaration', 'otherGroup', e.target.value)}
                  placeholder="Specify other group"
                  className="mt-2 border-2"
                />
              </div>
            )}
          </div>

          <div className="flex items-start space-x-3 bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
            <Checkbox
              id="personalNetWorthConfirmation"
              checked={decl.personalNetWorthConfirmation}
              onCheckedChange={(checked) => updateNestedData('declaration', 'personalNetWorthConfirmation', checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <Label htmlFor="personalNetWorthConfirmation" className="cursor-pointer font-semibold text-gray-800">
                I confirm that my personal net worth does not exceed $1.32 million (excluding primary residence and ownership interest in the applicant firm) *
              </Label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="signatureDate" className="font-semibold text-gray-700">Date *</Label>
              <Input
                id="signatureDate"
                type="date"
                value={decl.signatureDate}
                onChange={(e) => updateNestedData('declaration', 'signatureDate', e.target.value)}
                className="mt-2 border-2"
              />
            </div>

            <div>
              <Label htmlFor="signature" className="font-semibold text-gray-700">Signature (Type Full Name) *</Label>
              <Input
                id="signature"
                value={decl.signature}
                onChange={(e) => updateNestedData('declaration', 'signature', e.target.value)}
                placeholder="Type your full name"
                className="mt-2 border-2 font-serif text-lg"
              />
            </div>
          </div>
        </div>

        <Alert className="bg-green-50 border-green-300">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-900">
            You're almost done! Review all sections and click "Submit Application" to generate your PDF.
          </AlertDescription>
        </Alert>
      </div>
    );
  };

  const renderCurrentSection = () => {
    const section = sections[currentSection];
    
    switch (section.fields) {
      case 'certification':
        return renderCertificationInfo();
      case 'general':
        return renderGeneralInfo();
      case 'majorityOwner':
        return renderMajorityOwner();
      case 'additionalOwners':
        return renderAdditionalOwners();
      case 'control':
        return renderControl();
      case 'keyPersonnel':
        return renderKeyPersonnel();
      case 'inventory':
        return renderInventory();
      case 'financial':
        return renderFinancial();
      case 'contracts':
        return renderContracts();
      case 'acdbe':
        return renderACDBE();
      case 'declaration':
        return renderDeclaration();
      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div ref={topRef} className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header with Home Button */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DBE/ACDBE Application</h1>
              <p className="text-sm text-gray-600">U.S. Department of Transportation</p>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/home')}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Home className="h-5 w-5 text-gray-700" />
            <span className="font-medium text-gray-700">Home</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <Card className="shadow-xl border-2 border-gray-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b-2 border-gray-200">
            <CardTitle className="text-2xl">
              {sections[currentSection].title}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              OMB APPROVAL NO: 2105-0586 | EXPIRATION DATE: 05/31/2027
            </p>
          </CardHeader>
          
          <CardContent className="pt-6">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">
                  Section {currentSection + 1} of {sections.length}
                </span>
                <span className="text-sm font-semibold text-blue-600">
                  {Math.round(((currentSection + 1) / sections.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Section Content */}
            <div className="mb-8 min-h-[400px]">
              {renderCurrentSection()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6 border-t-2 border-gray-200">
              <Button
                variant="outline"
                onClick={prevSection}
                disabled={currentSection === 0}
                className="flex items-center space-x-2 px-6 py-3 border-2"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Previous</span>
              </Button>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Section {currentSection + 1} / {sections.length}</span>
              </div>
              
              {currentSection < sections.length - 1 ? (
                <Button 
                  onClick={nextSection}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <span>Next</span>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Submit Application</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transform hover:scale-110 transition-all duration-200 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default UCAFormFiller;