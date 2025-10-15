import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formData } = req.body;

    if (!formData) {
      return res.status(400).json({ error: 'No form data provided' });
    }

    if (!process.env.CLAUDE_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY
    });

    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const prompt = `You are a professional DBE certification consultant. Generate a complete, professional DBE recertification narrative statement.

Company: ${formData.companyName}
Owner: ${formData.ownerName}
Industry: ${formData.industry}
Years: ${formData.yearsInBusiness}
Revenue: $${formData.annualRevenue}
Location: ${formData.location}
UCP: ${formData.ucpSelection}

Social Disadvantage Incidents:
${formData.socialIncidents.map((incident, idx) => `
Incident ${idx + 1} (${incident.date}):
${incident.description}
Impact: ${incident.impact}
`).join('\n')}

Economic Barriers:
- Financing: ${formData.financingBarriers}
- Bonding: ${formData.bondingChallenges}
- Insurance: ${formData.insuranceChallenges}
- Contracts: ${formData.contractLosses}
- Market: ${formData.marketDisadvantages}

Additional: ${formData.specificExamples}
Documentation: ${formData.documentation}

Generate a complete, formal DBE narrative statement following 2025 requirements. Use professional legal language, demonstrate disadvantage by preponderance of evidence, and format with clear sections.`;

    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 8000,
      temperature: 0.7,
      messages: [{ role: "user", content: prompt }]
    });

    const narrative = message.content[0].text;

    const coverPrompt = `Generate a professional cover letter for ${formData.ownerName} of ${formData.companyName} submitting DBE recertification to ${formData.ucpSelection}. Date: ${today}. One page, formal, regulatory-appropriate.`;

    const coverMsg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2000,
      messages: [{ role: "user", content: coverPrompt }]
    });

    const coverLetter = coverMsg.content[0].text;

    const checklist = `SUPPORTING DOCUMENTATION CHECKLIST
${formData.companyName} - DBE Recertification

Applicant: ${formData.ownerName}
Date: ${today}
UCP: ${formData.ucpSelection}

════════════════════════════════════════════════════════════════

REQUIRED DOCUMENTS:

☐ IDENTITY AND OWNERSHIP DOCUMENTATION
   • Personal identification
   • Proof of business ownership
   • Personal financial statement
   • Three years of personal tax returns

☐ BUSINESS FINANCIAL RECORDS
   • Three years of business tax returns
   • Current profit & loss statement
   • Current balance sheet
   • Business bank statements

☐ SOCIAL DISADVANTAGE EVIDENCE
   • Documentation of incidents described in narrative
   • Correspondence, emails, or records supporting claims

☐ ECONOMIC DISADVANTAGE DOCUMENTATION
   • Loan applications and denial letters
   • Bonding cost documentation
   • Insurance quotes

☐ BUSINESS CAPABILITY EVIDENCE
   • List of completed projects (last 3 years)
   • Client references and testimonials
   • Professional licenses and certifications

Prepared by: DBE Narrative Pro
Date: ${today}`;

    const reviewSummary = `APPLICATION REVIEW SUMMARY

Company: ${formData.companyName}
Owner: ${formData.ownerName}  
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

DOCUMENT PACKAGE COMPLETE:
✓ Cover Letter
✓ Narrative Statement
✓ Evidence Checklist
✓ Review Summary

════════════════════════════════════════════════════════════════

NEXT STEPS:
1. Review all documents carefully
2. Gather supporting documentation
3. Sign and date the narrative
4. Submit to your UCP

Good luck with your DBE recertification!`;

    return res.status(200).json({
      coverLetter,
      narrative,
      checklist,
      reviewSummary,
      preview: narrative.substring(0, 1500) + '\n\n[... Preview shows first portion of narrative. Unlock full document package to access complete content ...]'
    });

  } catch (error) {
    console.error('Generate error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate',
      message: error.message 
    });
  }
}