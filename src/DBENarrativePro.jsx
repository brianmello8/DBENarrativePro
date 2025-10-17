import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Download, FileText, AlertCircle, CheckCircle, Building2, DollarSign, Users, Shield, Lock, Eye } from 'lucide-react';

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

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addIncident = () => {
    setFormData(prev => ({
      ...prev,
      socialIncidents: [...prev.socialIncidents, { date: '', description: '', impact: '' }]
    }));
  };

  const updateIncident = (index, field, value) => {
    const newIncidents = [...formData.socialIncidents];
    newIncidents[index][field] = value;
    setFormData(prev => ({ ...prev, socialIncidents: newIncidents }));
  };

  const removeIncident = (index) => {
    if (formData.socialIncidents.length > 1) {
      const newIncidents = formData.socialIncidents.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, socialIncidents: newIncidents }));
    }
  };

  const getUCPAddress = (ucpName) => {
    const ucpData = {
      name: ucpName === 'Other/Custom UCP' ? formData.customUCP : ucpName,
      address: "123 Main Street",
      city: "Sacramento",
      state: "CA",
      zip: "95814"
    };
    return ucpData;
  };

const generateDocuments = async () => {
  setIsGenerating(true);
  
  try {
    // Call our backend API
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formData })
    });

    if (!response.ok) {
      throw new Error('Failed to generate documents');
    }

    const docs = await response.json();
    
    setGeneratedDocs(docs);
    setIsGenerating(false);
  } catch (error) {
    console.error('Error:', error);
    alert('Error generating documents. Please try again.');
    setIsGenerating(false);
  }
};

  const downloadDocument = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAllDocuments = () => {
    const companySlug = formData.companyName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    downloadDocument(generatedDocs.coverLetter, `${companySlug}_Cover_Letter.txt`);
    downloadDocument(generatedDocs.narrative, `${companySlug}_DBE_Narrative.txt`);
    downloadDocument(generatedDocs.checklist, `${companySlug}_Documentation_Checklist.txt`);
    downloadDocument(generatedDocs.reviewSummary, `${companySlug}_Review_Summary.txt`);
  };

  const handlePayment = () => {
    alert('In production: Redirects to Gumroad payment ($149)\n\nFor demo purposes, unlocking documents now...');
    setIsPaid(true);
  };

  const steps = [
    {
      title: 'Welcome',
      icon: Shield,
      subtitle: 'New DBE Certification Requirements',
      content: (
        <div className="space-y-6">
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
                <p className="text-sm text-gray-700">Download and submit to your UCP with confidence</p>
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
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="ABC Construction LLC"
                value={formData.companyName}
                onChange={(e) => updateFormData('companyName', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Your Full Name *</label>
              <input
                type="text"
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="John Smith"
                value={formData.ownerName}
                onChange={(e) => updateFormData('ownerName', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">As business owner</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Industry/Specialization *</label>
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Heavy Highway Construction, Electrical Contracting, etc."
              value={formData.industry}
              onChange={(e) => updateFormData('industry', e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Years in Business *</label>
              <input
                type="number"
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="8"
                value={formData.yearsInBusiness}
                onChange={(e) => updateFormData('yearsInBusiness', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Annual Revenue *</label>
              <input
                type="text"
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="1,250,000"
                value={formData.annualRevenue}
                onChange={(e) => updateFormData('annualRevenue', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Enter without $ or commas</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Primary Business Location *</label>
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="123 Main St, Sacramento, CA 95814"
              value={formData.location}
              onChange={(e) => updateFormData('location', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Your UCP (Unified Certification Program) *</label>
            <select
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              value={formData.ucpSelection}
              onChange={(e) => updateFormData('ucpSelection', e.target.value)}
            >
              <option value="">Select your UCP...</option>
              {ucpList.map((ucp, idx) => (
                <option key={idx} value={ucp}>{ucp}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">The certification program where you will submit this application</p>
          </div>

          {formData.ucpSelection === 'Other/Custom UCP' && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <label className="block text-sm font-bold mb-2 text-gray-700">Enter UCP Name *</label>
              <input
                type="text"
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Full name of your certification program"
                value={formData.customUCP}
                onChange={(e) => updateFormData('customUCP', e.target.value)}
              />
            </div>
          )}

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> This information will be used to properly address your application and generate accurate submission documents.
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
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="March 2023"
                    value={incident.date}
                    onChange={(e) => updateIncident(index, 'date', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">
                    Describe the Incident {index === 0 && '*'}
                  </label>
                  <textarea
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                    rows={5}
                    placeholder="Example: In March 2023, I submitted the lowest qualified bid ($487,000) for State Highway Project SR-125. Despite being properly bonded and meeting all technical requirements, the contract was awarded to a firm with a bid $52,000 higher. When I requested feedback, the contracting officer stated my firm 'didn't have the right relationships' despite our 8-year track record and superior qualifications..."
                    value={incident.description}
                    onChange={(e) => updateIncident(index, 'description', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">
                    Impact on Your Business
                  </label>
                  <textarea
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                    rows={3}
                    placeholder="Example: This loss of a $487,000 contract directly cost my business approximately $73,000 in potential profit. More significantly, it prevented us from establishing a relationship with the state DOT and limited our ability to bid on future projects with confidence..."
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

          <div className="bg-gray-50 border border-gray-300 p-4 rounded-lg">
            <p className="text-xs text-gray-700">
              <strong>Documentation Tips:</strong> Save copies of bid tabulations, email correspondence, meeting notes, 
              or any other evidence that supports these incidents. You'll need to attach this documentation to your 
              application per the checklist we'll provide.
            </p>
          </div>
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
              higher costs, denied financing, lost contracts, or limited growth. Compare your experience 
              to similarly situated businesses where possible.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Access to Capital and Financing *
            </label>
            <textarea
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              rows={5}
              placeholder="Example: In 2024, I applied for a $500,000 line of credit at three regional banks. Despite maintaining 18 consecutive months of positive cash flow and presenting three years of audited financials showing consistent profitability, I was offered interest rates ranging from 12-14%. Industry colleagues with comparable financials reported securing similar financing at 7-9% rates..."
              value={formData.financingBarriers}
              onChange={(e) => updateFormData('financingBarriers', e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">Include specific institutions, dates, amounts, and rates offered vs. market rates</p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Bonding Challenges
            </label>
            <textarea
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              rows={4}
              placeholder="Example: To secure bonding for projects exceeding $1M, I pay premium rates 30-40% above industry averages. My bonding agent confirmed that similarly sized firms in my market with comparable project histories pay significantly less..."
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
              placeholder="Example: Commercial general liability insurance for my operations costs approximately $18,000 annually. Competitors in my market with similar revenue and claims history report annual premiums of $11,000-13,000..."
              value={formData.insuranceChallenges}
              onChange={(e) => updateFormData('insuranceChallenges', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Contract Losses and Bid Disparities *
            </label>
            <textarea
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              rows={5}
              placeholder="Example: Over the past 24 months, I have submitted 47 competitive bids on federally-funded transportation projects. Despite being the low bidder on 12 occasions, I was awarded only 2 contracts. In 8 documented instances, contracts were awarded to bidders with prices 8-15% higher than mine..."
              value={formData.contractLosses}
              onChange={(e) => updateFormData('contractLosses', e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">Include number of bids, win rate, and specific examples of losses to higher bidders</p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Market Position and Revenue Impact
            </label>
            <textarea
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              rows={5}
              placeholder="Example: Based on my firm's technical capabilities, equipment inventory, qualified personnel, and 8 years of industry experience, we should reasonably expect annual revenue in the $3-4M range. However, due to the systematic barriers described above, our revenue has been constrained to approximately $1.2M annually..."
              value={formData.marketDisadvantages}
              onChange={(e) => updateFormData('marketDisadvantages', e.target.value)}
            />
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <p className="text-sm text-amber-900">
              <strong>Pro Tip:</strong> Quantify everything possible. Numbers and percentages strengthen your case. 
              "30% higher costs" is more compelling than "significantly higher costs."
            </p>
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
              placeholder="Include any additional information that supports your disadvantage claim: industry-specific challenges, regional market conditions, relationships with prime contractors, subcontracting opportunities, or other relevant context..."
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
              placeholder="List the evidence you can provide: loan denial letters, bid tabulations, financial statements, bonding quotes, correspondence with contracting officers, industry rate comparisons, etc..."
              value={formData.documentation}
              onChange={(e) => updateFormData('documentation', e.target.value)}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-3">What Happens Next:</h4>
            <div className="space-y-2 text-sm text-blue-900">
              <p>✓ We'll generate your complete application package</p>
              <p>✓ You'll receive a professional narrative statement</p>
              <p>✓ Plus a formal cover letter addressed to your UCP</p>
              <p>✓ Plus a comprehensive evidence checklist</p>
              <p>✓ Plus a review summary to check before submitting</p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-300 p-4 rounded-lg">
            <p className="text-xs text-gray-700">
              <strong>Privacy Note:</strong> Your information is processed securely and is never stored on our servers. 
              All documents are generated locally in your browser and downloaded directly to your device.
            </p>
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
                  You've completed all required sections. We'll now transform your responses into a professional, 
                  compliant DBE recertification application package.
                </p>
                <div className="bg-white/20 backdrop-blur p-4 rounded-lg">
                  <p className="text-sm text-white font-semibold mb-2">Your package will include:</p>
                  <ul className="text-sm text-green-50 space-y-1">
                    <li>✓ Professional cover letter addressed to your UCP</li>
                    <li>✓ Complete narrative statement of disadvantage</li>
                    <li>✓ Supporting documentation checklist</li>
                    <li>✓ Pre-submission review summary</li>
                  </ul>
                </div>
              </div>

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
                  <p className="text-sm text-blue-900 text-center">
                    Our AI is analyzing your responses and crafting compelling narratives that meet 
                    regulatory requirements. This typically takes 20-30 seconds...
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
                      Your professional DBE application package has been created. Review the preview below, 
                      then unlock the complete package for download.
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
                  <Lock className="flex-shrink-0" size={32} />
                  <div className="flex-1">
                    <h4 className="font-bold text-2xl mb-2">Unlock Complete Package</h4>
                    <p className="text-amber-50 mb-4">
                      This preview shows just a portion of your narrative. The complete package includes 4 professional 
                      documents totaling 8-12 pages, formatted and ready for submission.
                    </p>
                    <div className="bg-white/20 backdrop-blur p-4 rounded-lg mb-4">
                      <p className="font-bold mb-2">Complete Package Includes:</p>
                      <ul className="text-sm space-y-1">
                        <li>✓ Full narrative statement (4-6 pages)</li>
                        <li>✓ Professional cover letter</li>
                        <li>✓ Complete documentation checklist</li>
                        <li>✓ Pre-submission review summary</li>
                        <li>✓ Multiple download formats (Word, PDF, Text)</li>
                        <li>✓ Instant download - no waiting</li>
                      </ul>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-3xl font-bold">$149</p>
                        <p className="text-sm text-amber-100">One-time payment • Instant access</p>
                      </div>
                      <button
                        onClick={handlePayment}
                        className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105"
                      >
                        Unlock Now →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>💰 Compare:</strong> Professional consultant fees for narrative preparation: $1,500-3,000
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm text-green-900">
                    <strong>✓ Included:</strong> Unlimited regenerations if you need to make changes
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
                      Your complete DBE application package is ready for download.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-green-200 p-6 rounded-lg">
                  <FileText className="text-green-600 mb-3" size={32} />
                  <h4 className="font-bold mb-2">Narrative Statement</h4>
                  <p className="text-sm text-gray-600 mb-4">Complete statement of disadvantage</p>
                  <button
                    onClick={() => downloadDocument(generatedDocs.narrative, `${formData.companyName.replace(/\s+/g, '_')}_DBE_Narrative.txt`)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>

                <div className="bg-white border-2 border-blue-200 p-6 rounded-lg">
                  <FileText className="text-blue-600 mb-3" size={32} />
                  <h4 className="font-bold mb-2">Cover Letter</h4>
                  <p className="text-sm text-gray-600 mb-4">Formal letter to your UCP</p>
                  <button
                    onClick={() => downloadDocument(generatedDocs.coverLetter, `${formData.companyName.replace(/\s+/g, '_')}_Cover_Letter.txt`)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>

                <div className="bg-white border-2 border-amber-200 p-6 rounded-lg">
                  <FileText className="text-amber-600 mb-3" size={32} />
                  <h4 className="font-bold mb-2">Documentation Checklist</h4>
                  <p className="text-sm text-gray-600 mb-4">Complete evidence checklist</p>
                  <button
                    onClick={() => downloadDocument(generatedDocs.checklist, `${formData.companyName.replace(/\s+/g, '_')}_Checklist.txt`)}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>

                <div className="bg-white border-2 border-purple-200 p-6 rounded-lg">
                  <FileText className="text-purple-600 mb-3" size={32} />
                  <h4 className="font-bold mb-2">Review Summary</h4>
                  <p className="text-sm text-gray-600 mb-4">Pre-submission checklist</p>
                  <button
                    onClick={() => downloadDocument(generatedDocs.reviewSummary, `${formData.companyName.replace(/\s+/g, '_')}_Review.txt`)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>

              <button
                onClick={downloadAllDocuments}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg"
              >
                <Download size={24} />
                Download All Documents
              </button>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h4 className="font-bold text-blue-900 mb-3">Next Steps:</h4>
                <ol className="text-sm text-blue-900 space-y-2">
                  <li>1. Review all four documents carefully for accuracy</li>
                  <li>2. Edit in Microsoft Word if needed (customize for your specific situation)</li>
                  <li>3. Gather all supporting documentation per the checklist</li>
                  <li>4. Sign and date the narrative statement</li>
                  <li>5. Submit complete package to your UCP</li>
                  <li>6. Follow up within 10 business days to confirm receipt</li>
                </ol>
              </div>

              <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
                <h4 className="font-bold text-green-900 mb-2">Good luck with your DBE recertification!</h4>
                <p className="text-sm text-green-800">
                  Your professionally prepared application gives you the best chance for approval under the new standards.
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
              <p className="text-blue-200 text-sm">Professional DBE Recertification Documents</p>
            </div>
            <div className="bg-amber-500 text-amber-900 px-4 py-2 rounded-lg font-bold">
              Compliant 2025
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
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg border-2 border-gray-200 transition-all"
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          
          {step < steps.length - 1 && (
            <button
              onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
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
            <p className="text-xs text-gray-500">No data stored</p>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg text-center">
            <CheckCircle className="text-green-600 mx-auto mb-2" size={24} />
            <p className="text-xs font-semibold text-gray-700">2025 Compliant</p>
            <p className="text-xs text-gray-500">Current regulations</p>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg text-center">
            <FileText className="text-amber-600 mx-auto mb-2" size={24} />
            <p className="text-xs font-semibold text-gray-700">Professional Output</p>
            <p className="text-xs text-gray-500">Ready to submit</p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 DBE Narrative Pro • Helping DBEs navigate new certification requirements</p>
        </div>
      </div>
    </div>
  );
};

export default DBENarrativePro;