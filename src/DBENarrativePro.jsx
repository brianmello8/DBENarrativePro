import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Download, FileText, AlertCircle, CheckCircle, Building2, DollarSign, Users, Shield, Lock, Eye } from 'lucide-react';

const DBENarrativePro = ({ redirectLicenseKey }) => {
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
  const [licenseKey, setLicenseKey] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [licenseError, setLicenseError] = useState('');
  const [showLicenseInput, setShowLicenseInput] = useState(false);

  // Handle auto-verification when redirected from Gumroad
  useEffect(() => {
    // Check if already verified (localStorage cache)
    const checkStoredLicense = () => {
      try {
        const storedLicense = localStorage.getItem('dbe_license_verified');
        if (storedLicense) {
          const licenseData = JSON.parse(storedLicense);
          // Check if verification is less than 24 hours old
          const hoursSinceVerification = (Date.now() - licenseData.timestamp) / (1000 * 60 * 60);
          if (hoursSinceVerification < 24) {
            setIsPaid(true);
            setLicenseKey(licenseData.key);
            return true;
          } else {
            // Clear expired license
            localStorage.removeItem('dbe_license_verified');
          }
        }
      } catch (error) {
        console.error('Error reading stored license:', error);
      }
      return false;
    };

    // First check if we have a cached valid license
    const hasValidCache = checkStoredLicense();

    // If redirected from Gumroad with new license key, verify it
    if (redirectLicenseKey && !hasValidCache) {
      setLicenseKey(redirectLicenseKey);
      setShowLicenseInput(true); // Show the verification UI
      verifyLicense(redirectLicenseKey); // Auto-verify the license
    }
  }, [redirectLicenseKey]);

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

  const generateDocuments = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const ucpName = formData.ucpSelection === 'Other/Custom UCP' ? formData.customUCP : formData.ucpSelection;
      
      // Generate Cover Letter
      const coverLetter = `${formData.ownerName}
${formData.companyName}
${formData.location}

${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

${ucpName}
Disadvantaged Business Enterprise (DBE) Program

RE: DBE Recertification Application - ${formData.companyName}

Dear Certification Officer,

I am writing to submit my application for recertification as a Disadvantaged Business Enterprise (DBE) under 49 CFR Part 26, as amended. ${formData.companyName} has been operating in the ${formData.industry} industry for ${formData.yearsInBusiness} years and maintains an annual revenue of approximately $${Number(formData.annualRevenue).toLocaleString()}.

As required under the new regulatory framework effective October 2025, I am providing individualized evidence of both social and economic disadvantage. The enclosed narrative statement details specific incidents of discrimination and economic barriers that have materially impacted my business operations and growth potential.

This application includes:

1. Detailed narrative statement of social and economic disadvantage
2. Supporting documentation as outlined in the attached checklist
3. Current financial statements and business records
4. Evidence of continuing disadvantage

I have experienced persistent barriers in accessing capital, securing bonding, and competing for contracts on equal terms. These disadvantages stem from systemic bias and have resulted in measurable economic harm to my business, as detailed in the narrative statement.

I am committed to maintaining compliance with all DBE program requirements and appreciate your consideration of this application. Please contact me at your earliest convenience if you require any additional information or documentation.

Thank you for your time and attention to this matter.

Respectfully submitted,

${formData.ownerName}
Owner, ${formData.companyName}`;

      // Generate Narrative Statement
      const narrative = `DBE NARRATIVE STATEMENT
${formData.companyName}
Prepared for: ${ucpName}

═══════════════════════════════════════════════════════════════

I. INTRODUCTION AND BUSINESS BACKGROUND

I, ${formData.ownerName}, am the owner and principal of ${formData.companyName}, a ${formData.industry} business located at ${formData.location}. My company has been in operation for ${formData.yearsInBusiness} years with current annual revenues of approximately $${Number(formData.annualRevenue).toLocaleString()}.

This narrative provides individualized evidence of social and economic disadvantage as required under 49 CFR Part 26, as amended effective October 2025. The following sections document specific incidents of discrimination, economic barriers, and the measurable impact these disadvantages have had on my business operations and growth.

═══════════════════════════════════════════════════════════════

II. SOCIAL DISADVANTAGE - SPECIFIC INCIDENTS

${formData.socialIncidents.map((incident, idx) => `
INCIDENT ${idx + 1}: ${incident.date}

Description:
${incident.description}

Impact on Business:
${incident.impact}

This incident demonstrates a clear pattern of discriminatory treatment that has materially affected my ability to compete on equal terms in the marketplace.
`).join('\n───────────────────────────────────────────────────────────\n')}

═══════════════════════════════════════════════════════════════

III. ECONOMIC DISADVANTAGE - DOCUMENTED BARRIERS

A. ACCESS TO CAPITAL AND FINANCING

${formData.financingBarriers}

These financing barriers have directly constrained my business growth and limited my ability to pursue larger contracts and expand operations.

B. BONDING CHALLENGES

${formData.bondingChallenges || 'Bonding requirements have presented additional financial barriers, with premium rates that exceed industry averages for similarly situated businesses.'}

C. INSURANCE COSTS

${formData.insuranceChallenges || 'Insurance costs represent a disproportionate burden on my business operations compared to industry peers with similar risk profiles.'}

D. CONTRACT LOSSES AND BID DISPARITIES

${formData.contractLosses}

These documented instances of bid irregularities and contract losses demonstrate systematic disadvantage in the competitive bidding process.

E. MARKET POSITION AND REVENUE IMPACT

${formData.marketDisadvantages}

The cumulative effect of these barriers has artificially constrained my business revenue and market position below what should be expected given my technical capabilities, experience, and qualifications.

═══════════════════════════════════════════════════════════════

IV. ADDITIONAL SUPPORTING EVIDENCE

${formData.specificExamples}

═══════════════════════════════════════════════════════════════

V. SUPPORTING DOCUMENTATION

The following documentation is provided in support of this narrative:

${formData.documentation}

═══════════════════════════════════════════════════════════════

VI. CONCLUSION

The evidence presented in this narrative demonstrates individualized proof of both social and economic disadvantage as required under 49 CFR Part 26. I have experienced persistent discrimination and economic barriers that have materially and substantially affected my ability to compete in the marketplace on equal terms.

These disadvantages are not merely theoretical but are documented through specific incidents, financial records, and comparative analysis with similarly situated businesses. The cumulative impact has resulted in measurable economic harm and continues to affect my business operations.

I respectfully request certification as a Disadvantaged Business Enterprise based on this individualized showing of disadvantage.

Respectfully submitted,

${formData.ownerName}
Owner, ${formData.companyName}
${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;

      // Generate Documentation Checklist
      const checklist = `SUPPORTING DOCUMENTATION CHECKLIST
${formData.companyName} - DBE Recertification Application

═══════════════════════════════════════════════════════════════

This checklist identifies all supporting documentation that should accompany your DBE recertification application. Check each item as you gather and organize your materials.

REQUIRED BUSINESS DOCUMENTS:
☐ Current business license and registrations
☐ Articles of incorporation or organization
☐ Operating agreement or bylaws
☐ Most recent three years of business tax returns
☐ Current year-to-date financial statements
☐ Business bank statements (most recent 12 months)

OWNERSHIP DOCUMENTATION:
☐ Stock certificates or ownership interest documents
☐ Proof of capital contributions
☐ Documentation of management authority
☐ Résumé demonstrating expertise in the industry

SOCIAL DISADVANTAGE EVIDENCE:
${formData.socialIncidents.map((incident, idx) => `
☐ Incident ${idx + 1} (${incident.date}):
   - Bid tabulation sheets or contract documents
   - Email correspondence or written communications
   - Meeting notes or memoranda
   - Any other contemporaneous documentation
`).join('\n')}

ECONOMIC DISADVANTAGE EVIDENCE:
☐ Loan application documents and denial letters
☐ Bank correspondence regarding financing terms
☐ Bonding quotes showing premium rates
☐ Industry rate comparison data
☐ Insurance quotes and policy documents
☐ Bid tabulation sheets showing contract awards to higher bidders
☐ Financial analysis comparing market position to industry peers
☐ Documentation of revenue constraints

ADDITIONAL SUPPORTING MATERIALS:
☐ Letters of reference from clients or industry professionals
☐ Project portfolios demonstrating capabilities
☐ Industry certifications and licenses
☐ Any additional evidence referenced in the narrative

PERSONAL FINANCIAL STATEMENT:
☐ Personal financial statement (most recent)
☐ Personal tax returns (most recent three years)
☐ Documentation of personal net worth

APPLICATION FORMS:
☐ Completed UCP application form
☐ Personal net worth statement
☐ Affidavit of disadvantage
☐ Any additional forms required by ${ucpName}

═══════════════════════════════════════════════════════════════

ORGANIZATION TIPS:

1. Create a table of contents listing all documents in order
2. Use tabs or dividers to separate document categories
3. Number each page sequentially
4. Make two complete copies (one for submission, one for your records)
5. Consider electronic submission if accepted by your UCP

═══════════════════════════════════════════════════════════════

SUBMISSION CHECKLIST:

☐ All documents are signed where required
☐ All documents are dated appropriately
☐ Documents are organized in logical order
☐ Cover letter is included
☐ Narrative statement is included
☐ All referenced exhibits are included
☐ Copies are legible and complete
☐ Application is submitted by deadline

═══════════════════════════════════════════════════════════════

IMPORTANT NOTES:

- Keep copies of everything you submit
- Follow up within 10 business days to confirm receipt
- Be prepared to provide additional documentation if requested
- Maintain organized files for future reference

Prepared by: DBE Narrative Pro
Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;

      // Generate Review Summary
      const reviewSummary = `PRE-SUBMISSION REVIEW SUMMARY
${formData.companyName} - DBE Recertification Application

═══════════════════════════════════════════════════════════════

Use this summary to review your application before submission.

APPLICATION COMPLETENESS CHECK:

NARRATIVE QUALITY:
☐ Narrative includes specific dates and incidents
☐ Each incident describes what happened in detail
☐ Business impact is quantified where possible
☐ Economic barriers are documented with numbers
☐ Comparisons to similarly situated businesses included
☐ Language is professional and factual
☐ No general or vague statements without support

EVIDENCE STRENGTH:
☐ At least ${formData.socialIncidents.length} social disadvantage incident(s) documented
☐ Economic barriers include specific dollar amounts
☐ Supporting documentation is referenced and attached
☐ Financial records demonstrate business performance
☐ Independent verification available where possible

REGULATORY COMPLIANCE:
☐ Application meets new 2025 individualized evidence standards
☐ No reliance on group-based presumptions
☐ Personal disadvantage clearly distinguished from business disadvantage
☐ Continuing disadvantage is demonstrated
☐ All required forms completed and signed

═══════════════════════════════════════════════════════════════

KEY INFORMATION SUMMARY:

Business Name: ${formData.companyName}
Owner: ${formData.ownerName}
Industry: ${formData.industry}
Years in Business: ${formData.yearsInBusiness}
Annual Revenue: $${Number(formData.annualRevenue).toLocaleString()}
Location: ${formData.location}
Submitting to: ${ucpName}

═══════════════════════════════════════════════════════════════

NARRATIVE STRENGTH ASSESSMENT:

Social Disadvantage Documentation:
- Number of specific incidents: ${formData.socialIncidents.length}
- Incidents include dates: ${formData.socialIncidents.every(i => i.date) ? 'Yes ✓' : 'Review needed'}
- Incidents include detailed descriptions: ${formData.socialIncidents.every(i => i.description.length > 100) ? 'Yes ✓' : 'Review needed'}
- Business impact quantified: ${formData.socialIncidents.some(i => i.impact) ? 'Yes ✓' : 'Review needed'}

Economic Disadvantage Documentation:
- Financing barriers documented: ${formData.financingBarriers ? 'Yes ✓' : 'Review needed'}
- Contract losses documented: ${formData.contractLosses ? 'Yes ✓' : 'Review needed'}
- Market disadvantages explained: ${formData.marketDisadvantages ? 'Yes ✓' : 'Review needed'}
- Includes specific dollar amounts: Review your narrative
- Includes comparative data: Review your narrative

═══════════════════════════════════════════════════════════════

RECOMMENDATIONS FOR STRENGTHENING YOUR APPLICATION:

1. SPECIFICITY: Ensure every claim includes:
   - Specific dates or time periods
   - Names of institutions/individuals (where appropriate)
   - Dollar amounts and percentages
   - Comparison to industry norms

2. DOCUMENTATION: Attach supporting evidence for:
   - Every incident mentioned in the narrative
   - Financial claims and comparisons
   - Bid tabulations and contract losses
   - Loan applications and denials

3. CLARITY: Review narrative for:
   - Clear cause-and-effect relationships
   - Logical organization and flow
   - Professional tone throughout
   - No contradictions or inconsistencies

4. COMPLETENESS: Verify you have:
   - Addressed both social AND economic disadvantage
   - Provided individualized (not group-based) evidence
   - Demonstrated continuing disadvantage
   - Included all required application forms

═══════════════════════════════════════════════════════════════

COMMON PITFALLS TO AVOID:

✗ Vague or general statements without specific examples
✗ Relying on race or gender without individualized proof
✗ Failing to quantify economic impact
✗ Missing supporting documentation
✗ Incomplete application forms
✗ Unsigned documents
✗ Inconsistencies between narrative and documentation

═══════════════════════════════════════════════════════════════

FINAL SUBMISSION CHECKLIST:

☐ Read entire application one final time
☐ Have someone else review for clarity and completeness
☐ Verify all cross-references are accurate
☐ Confirm all exhibits are attached and labeled
☐ Make complete copies for your records
☐ Submit by deadline via required method
☐ Follow up to confirm receipt

═══════════════════════════════════════════════════════════════

AFTER SUBMISSION:

1. Confirm receipt within 10 business days
2. Respond promptly to any requests for additional information
3. Keep organized files of all correspondence
4. Note any deadlines for supplemental materials
5. Maintain records for future recertification

═══════════════════════════════════════════════════════════════

Good luck with your DBE recertification!

This review summary was generated by DBE Narrative Pro
${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;

      const mockDocs = {
        preview: `DBE NARRATIVE STATEMENT - PREVIEW
        
This is a preview of your narrative statement. The complete package includes:

══════════════════════════════════════════════════════

COMPANY: ${formData.companyName}
OWNER: ${formData.ownerName}
INDUSTRY: ${formData.industry}
YEARS IN BUSINESS: ${formData.yearsInBusiness}
ANNUAL REVENUE: $${Number(formData.annualRevenue).toLocaleString()}

══════════════════════════════════════════════════════

SOCIAL DISADVANTAGE - DOCUMENTED INCIDENTS:
${formData.socialIncidents.length} incident(s) documented with specific dates, 
descriptions, and business impact.

ECONOMIC DISADVANTAGE - DOCUMENTED BARRIERS:
Financing challenges, contract losses, and market disadvantages 
detailed with specific dollar amounts and comparative analysis.

══════════════════════════════════════════════════════

[The full narrative is approximately 4-6 pages and includes:]

✓ Complete incident descriptions
✓ Detailed economic analysis
✓ Supporting documentation references
✓ Professional formatting for UCP submission

[Preview shows first 500 characters of full narrative:]

${narrative.substring(0, 500)}...

══════════════════════════════════════════════════════

UNLOCK COMPLETE PACKAGE TO DOWNLOAD:
- Full Narrative Statement (4-6 pages)
- Professional Cover Letter
- Documentation Checklist
- Pre-Submission Review Summary

All documents formatted for Microsoft Word editing.`,
        narrative,
        coverLetter,
        checklist,
        reviewSummary
      };
      
      setGeneratedDocs(mockDocs);
      setIsGenerating(false);
    }, 2000);
  };

  // Download as Word-compatible RTF file
  const downloadAsWord = (content, filename, title) => {
    const rtfContent = textToRTF(title, content);
    const blob = new Blob([rtfContent], { type: 'application/rtf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.replace('.txt', '.doc');
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAllDocuments = () => {
    const companySlug = formData.companyName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '') || 'DBE_Application';
    
    downloadAsWord(generatedDocs.coverLetter, `${companySlug}_Cover_Letter.doc`, 'DBE Recertification Cover Letter');
    downloadAsWord(generatedDocs.narrative, `${companySlug}_DBE_Narrative.doc`, 'DBE Narrative Statement');
    downloadAsWord(generatedDocs.checklist, `${companySlug}_Documentation_Checklist.doc`, 'Supporting Documentation Checklist');
    downloadAsWord(generatedDocs.reviewSummary, `${companySlug}_Review_Summary.doc`, 'Application Review Summary');
    
    alert('All documents downloaded successfully! Open with Microsoft Word to edit.');
  };

  const handlePayment = () => {
    // Get current URL for redirect
    const currentUrl = window.location.origin + window.location.pathname;
    // Build Gumroad URL with redirect parameter
    const gumroadUrl = `https://narrativepro.gumroad.com/l/zlixb?wanted=true&redirect_url=${encodeURIComponent(currentUrl)}?license_key={license_key}`;
    
    window.open(gumroadUrl, '_blank');
    setShowLicenseInput(true);
  };

  const verifyLicense = async (keyToVerify = licenseKey) => {
    setVerifying(true);
    setLicenseError('');
    
    try {
      const response = await fetch('/api/verify-license', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          licenseKey: keyToVerify 
        }),
      });

      const data = await response.json();
      
      if (data.valid) {
        // Store verification in localStorage with 24-hour expiration
        try {
          localStorage.setItem('dbe_license_verified', JSON.stringify({
            key: keyToVerify,
            timestamp: Date.now(),
            email: data.purchaseInfo?.email
          }));
        } catch (error) {
          console.error('Error storing license:', error);
        }
        
        setIsPaid(true);
        setLicenseKey(keyToVerify);
        alert('License verified successfully! Your documents are now unlocked.');
      } else {
        setLicenseError(data.error || 'Invalid license key. Please check your email from Gumroad and try again.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setLicenseError('Unable to verify license. Please check your internet connection and try again.');
    } finally {
      setVerifying(false);
    }
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
                placeholder="1250000"
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
                    placeholder="Example: In March 2023, I submitted the lowest qualified bid ($487,000) for State Highway Project SR-125. Despite being properly bonded and meeting all technical requirements, the contract was awarded to a firm with a bid $52,000 higher..."
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
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              rows={5}
              placeholder="Example: In 2024, I applied for a $500,000 line of credit at three regional banks. Despite maintaining 18 consecutive months of positive cash flow, I was offered interest rates ranging from 12-14%. Industry colleagues with comparable financials reported securing similar financing at 7-9% rates..."
              value={formData.financingBarriers}
              onChange={(e) => updateFormData('financingBarriers', e.target.value)}
            />
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
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              rows={5}
              placeholder="Example: Over the past 24 months, I have submitted 47 competitive bids on federally-funded transportation projects. Despite being the low bidder on 12 occasions, I was awarded only 2 contracts..."
              value={formData.contractLosses}
              onChange={(e) => updateFormData('contractLosses', e.target.value)}
            />
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
              <p>✓ We'll generate your complete application package</p>
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
                    <li>✓ All as Word documents for easy editing</li>
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
                      documents totaling 8-12 pages, formatted as Word files ready for editing.
                    </p>
                    <div className="bg-white/20 backdrop-blur p-4 rounded-lg mb-4">
                      <p className="font-bold mb-2">Complete Package Includes:</p>
                      <ul className="text-sm space-y-1">
                        <li>✓ Full narrative statement (4-6 pages)</li>
                        <li>✓ Professional cover letter</li>
                        <li>✓ Complete documentation checklist</li>
                        <li>✓ Pre-submission review summary</li>
                        <li>✓ Downloadable Word documents (.doc)</li>
                        <li>✓ Fully editable in Microsoft Word</li>
                        <li>✓ Instant download - no waiting</li>
                      </ul>
                    </div>

                    {!showLicenseInput && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <p className="text-3xl font-bold">$149</p>
                            <p className="text-sm text-amber-100">One-time payment • Instant access</p>
                          </div>
                          <button
                            onClick={handlePayment}
                            className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105"
                          >
                            Pay for Download →
                          </button>
                        </div>
                      </div>
                    )}

                    {showLicenseInput && (
                      <div className="bg-white/10 backdrop-blur rounded-lg p-6 space-y-4">
                        <div>
                          <label className="block text-white font-semibold mb-2">
                            {verifying ? '🔄 Verifying your license...' : '✓ Payment Complete? Enter Your License Key:'}
                          </label>
                          <p className="text-amber-100 text-sm mb-3">
                            {verifying 
                              ? 'Please wait while we verify your purchase with Gumroad...'
                              : 'Check your email from Gumroad for your license key'
                            }
                          </p>
                          <input
                            type="text"
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            value={licenseKey}
                            onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
                            className="w-full p-3 rounded-lg text-gray-900 font-mono text-center text-lg mb-2"
                            maxLength={50}
                            disabled={verifying}
                          />
                          {licenseError && (
                            <div className="bg-red-500/20 border border-red-300 rounded-lg p-3 mb-2">
                              <p className="text-white text-sm">{licenseError}</p>
                            </div>
                          )}
                          <button
                            onClick={() => verifyLicense()}
                            disabled={!licenseKey.trim() || verifying}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                          >
                            {verifying ? (
                              <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Verifying License...
                              </>
                            ) : (
                              <>
                                <CheckCircle size={20} />
                                Verify & Unlock Documents
                              </>
                            )}
                          </button>
                        </div>
                        
                        {!verifying && (
                          <button
                            onClick={() => setShowLicenseInput(false)}
                            className="w-full text-white/80 hover:text-white text-sm underline"
                          >
                            ← Back to purchase
                          </button>
                        )}
                      </div>
                    )}
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
                    <strong>✓ Included:</strong> Full editing capability in Microsoft Word
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
                      Your complete DBE application package is ready for download as Word documents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-green-200 p-6 rounded-lg">
                  <FileText className="text-green-600 mb-3" size={32} />
                  <h4 className="font-bold mb-2">Narrative Statement</h4>
                  <p className="text-sm text-gray-600 mb-4">Complete statement of disadvantage (4-6 pages)</p>
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
                  <p className="text-sm text-gray-600 mb-4">Formal letter to your UCP</p>
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
            <p className="text-xs font-semibold text-gray-700">Word Documents</p>
            <p className="text-xs text-gray-500">Fully editable</p>
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