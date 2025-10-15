const Anthropic = require('@anthropic-ai/sdk').default;

module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formData } = req.body;

    // Initialize Claude API
    const anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY
    });

    // Get today's date
    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    // Create the prompt for Claude
    const prompt = `You are a professional DBE certification consultant. Generate a complete, professional DBE recertification narrative package based on the following information:

Company Name: ${formData.companyName}
Owner Name: ${formData.ownerName}
Industry: ${formData.industry}
Years in Business: ${formData.yearsInBusiness}
Annual Revenue: $${formData.annualRevenue}
Location: ${formData.location}
UCP: ${formData.ucpSelection}

Social Disadvantage Incidents:
${formData.socialIncidents.map((incident, idx) => `
Incident ${idx + 1}:
Date: ${incident.date}
Description: ${incident.description}
Impact: ${incident.impact}
`).join('\n')}

Economic Disadvantage Details:
Financing Barriers: ${formData.financingBarriers}
Bonding Challenges: ${formData.bondingChallenges}
Insurance Challenges: ${formData.insuranceChallenges}
Contract Losses: ${formData.contractLosses}
Market Disadvantages: ${formData.marketDisadvantages}

Additional Context: ${formData.specificExamples}
Available Documentation: ${formData.documentation}

Please generate a complete, professional DBE narrative statement that:
1. Follows the exact format and structure required for 2025 DBE recertification
2. Uses formal, professional language appropriate for legal/regulatory submission
3. Incorporates all the specific details provided above
4. Demonstrates disadvantage by preponderance of evidence
5. Is ready for submission to a Unified Certification Program

Generate ONLY the narrative statement content, formatted professionally with clear sections.`;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 8000,
      temperature: 0.7,
      messages: [{
        role: "user",
        content: prompt
      }]
    });

    // Extract the generated narrative
    const generatedNarrative = message.content[0].text;

    // Generate cover letter
    const coverLetterPrompt = `Based on the DBE narrative below, generate a professional cover letter for ${formData.ownerName} of ${formData.companyName} submitting this to ${formData.ucpSelection}. Keep it concise and professional.

Narrative: ${generatedNarrative.substring(0, 500)}...`;

    const coverLetterMessage = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2000,
      messages: [{
        role: "user",
        content: coverLetterPrompt
      }]
    });

    const coverLetter = coverLetterMessage.content[0].text;

    // Generate checklist
    const checklist = `SUPPORTING DOCUMENTATION CHECKLIST
${formData.companyName} - DBE Recertification Application

Applicant: ${formData.ownerName}
Submission Date: ${today}
UCP: ${formData.ucpSelection}

════════════════════════════════════════════════════════════════

REQUIRED DOCUMENTS - Please ensure all items are included:

☐ IDENTITY AND OWNERSHIP DOCUMENTATION
   • Personal identification (driver's license, passport)
   • Proof of business ownership (articles of incorporation, operating agreement)
   • Personal financial statement
   • Three years of personal tax returns

☐ BUSINESS FINANCIAL RECORDS
   • Three years of business tax returns
   • Current profit & loss statement
   • Current balance sheet
   • Business bank statements (last 12 months)
   • Evidence of revenue stated: $${formData.annualRevenue}

☐ SOCIAL DISADVANTAGE EVIDENCE
   • Documentation of incidents described in narrative
   • Correspondence, emails, or records supporting claims
   • Witness statements (if applicable)
   • Project bid tabulations showing losses despite competitive pricing

☐ ECONOMIC DISADVANTAGE DOCUMENTATION
   • Loan applications and denial letters
   • Correspondence regarding financing terms offered
   • Bonding cost documentation and capacity limitations
   • Insurance quotes showing premium disparities
   • Evidence of contract losses to higher bidders

☐ BUSINESS CAPABILITY EVIDENCE
   • List of completed projects (last 3 years)
   • Client references and testimonials
   • Professional licenses and certifications
   • Equipment lists and ownership documentation

Document prepared by: DBE Narrative Pro
Preparation Date: ${today}`;

    // Generate review summary
    const reviewSummary = `APPLICATION REVIEW SUMMARY
Final Check Before Submission

Application for: ${formData.companyName}
Prepared by: DBE Narrative Pro
Date: ${today}

════════════════════════════════════════════════════════════════

APPLICANT INFORMATION:
✓ Business Name: ${formData.companyName}
✓ Owner Name: ${formData.ownerName}
✓ Industry: ${formData.industry}
✓ Years in Business: ${formData.yearsInBusiness}
✓ Annual Revenue: $${formData.annualRevenue}
✓ Location: ${formData.location}

SUBMISSION TARGET:
✓ UCP: ${formData.ucpSelection}

NARRATIVE COMPONENTS INCLUDED:
✓ Business Overview
✓ Social Disadvantage Section (${formData.socialIncidents.filter(i => i.description).length} incidents documented)
✓ Economic Disadvantage Section (Complete)
✓ Supporting Documentation References
✓ Declaration Under Penalty of Perjury

DOCUMENT PACKAGE COMPLETE:
✓ Cover Letter
✓ Narrative Statement
✓ Evidence Checklist
✓ Review Summary (this document)

════════════════════════════════════════════════════════════════

NEXT STEPS:
1. Review all four documents carefully for accuracy
2. Edit as needed to add specific details
3. Gather all supporting documentation per the checklist
4. Sign and date the narrative statement
5. Submit complete package to your UCP
6. Follow up within 10 business days to confirm receipt

Good luck with your DBE recertification!`;

    // Return all generated documents
    res.status(200).json({
      coverLetter: coverLetter,
      narrative: generatedNarrative,
      checklist: checklist,
      reviewSummary: reviewSummary,
      preview: generatedNarrative.substring(0, 1500) + '\n\n[... Preview shows first portion of narrative. Unlock full document package to access complete content ...]'
    });

  } catch (error) {
    console.error('Error generating documents:', error);
    res.status(500).json({ 
      error: 'Failed to generate documents',
      details: error.message 
    });
  }
}