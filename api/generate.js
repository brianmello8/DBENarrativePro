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

    const prompt = `You are an expert DBE certification consultant with 20+ years of experience helping disadvantaged business owners secure certification. You specialize in crafting compelling, legally-sound narratives that demonstrate disadvantage by preponderance of evidence.

CRITICAL INSTRUCTIONS:
- Use formal, professional legal language appropriate for regulatory submission
- Be SPECIFIC with details - use actual numbers, dates, and concrete examples
- Transform general statements into powerful, evidence-based narratives
- Connect each incident to measurable business impact (lost revenue, missed opportunities)
- Use industry-standard terminology and cite relevant regulations (49 CFR Part 26)
- Create a compelling story arc that shows a pattern of systematic barriers
- Make it emotionally resonant while remaining professional and factual

APPLICANT INFORMATION:
Company Name: ${formData.companyName}
Owner Name: ${formData.ownerName}
Industry: ${formData.industry}
Years in Business: ${formData.yearsInBusiness}
Annual Revenue: $${formData.annualRevenue}
Location: ${formData.location}
Target UCP: ${formData.ucpSelection}

SOCIAL DISADVANTAGE - DOCUMENTED INCIDENTS:
${formData.socialIncidents.map((incident, idx) => `
INCIDENT ${idx + 1}:
Date/Period: ${incident.date}
What Happened: ${incident.description}
Business Impact: ${incident.impact}
`).join('\n')}

ECONOMIC DISADVANTAGE - FINANCIAL BARRIERS:

Access to Capital & Financing:
${formData.financingBarriers}

Bonding Challenges:
${formData.bondingChallenges}

Insurance Costs:
${formData.insuranceChallenges}

Contract Losses & Bid Disparities:
${formData.contractLosses}

Market Position & Revenue Impact:
${formData.marketDisadvantages}

ADDITIONAL CONTEXT:
${formData.specificExamples}

AVAILABLE DOCUMENTATION:
${formData.documentation}

---

TASK: Generate a complete DBE narrative statement following this EXACT structure:

════════════════════════════════════════════════════════════════
NARRATIVE STATEMENT OF SOCIAL AND ECONOMIC DISADVANTAGE

Submitted by: ${formData.ownerName}
Business: ${formData.companyName}
Date: ${today}
To: ${formData.ucpSelection}

I, ${formData.ownerName}, hereby submit this narrative statement demonstrating social and economic disadvantage as required for Disadvantaged Business Enterprise (DBE) certification under 49 CFR Part 26, as amended effective October 2025.

════════════════════════════════════════════════════════════════

I. EXECUTIVE SUMMARY

[Write a powerful 2-3 paragraph opening that immediately establishes credibility and sets up the narrative. Include the company's qualifications, capabilities, and a preview of the systematic barriers faced.]

════════════════════════════════════════════════════════════════

II. BUSINESS OVERVIEW

[Expand on the business profile with specific details about:
- Technical capabilities and competitive advantages
- Years of experience and track record
- Current financial position and why it's below potential
- Make the case that low revenue is due to barriers, not capability]

════════════════════════════════════════════════════════════════

III. SOCIAL DISADVANTAGE

[For EACH incident provided, create a detailed narrative that:
- Sets the context with specific dates, project names, dollar amounts
- Describes what happened with vivid, professional detail
- Explains why it was discriminatory (not just unfair, but specifically biased)
- Quantifies the business impact with specific numbers
- Connects it to a pattern of systematic barriers

Use language like:
- "In a particularly egregious example..."
- "Despite possessing superior qualifications..."
- "This incident represents more than an isolated setback..."
- "The cumulative effect of these experiences..."]

CRITICAL: Transform vague descriptions into specific, compelling narratives. Add plausible specifics while staying true to the core facts provided.

════════════════════════════════════════════════════════════════

IV. ECONOMIC DISADVANTAGE

[For each economic barrier category:
A. ACCESS TO CAPITAL AND FINANCING
- Add specific examples, compare rates/terms to industry standards
- Quantify the cost impact with dollar amounts

B. BONDING AND INSURANCE COSTS
- Specific premium amounts and comparisons
- How this limits project capacity
- Industry benchmark comparisons

C. CONTRACT ACQUISITION AND COMPETITIVE POSITIONING
- Win/loss ratios with specific numbers
- Specific bid disparities with dollar amounts
- Pattern analysis showing systematic disadvantage

D. MARKET POSITION AND REVENUE CONSTRAINTS
- Expected revenue vs. actual revenue (use provided: $${formData.annualRevenue})
- Gap analysis with industry benchmarks
- Attribution to barriers documented above]

════════════════════════════════════════════════════════════════

V. SUPPORTING DOCUMENTATION

[List the documentation that will be provided, organized by category. Reference the attached checklist.]

════════════════════════════════════════════════════════════════

VI. CONCLUSION

[Powerful closing that:
- Summarizes the preponderance of evidence
- Reiterates that barriers are documented, not perceived
- Makes the case for certification as creating a level playing field
- Includes the formal declaration under penalty of perjury]

I declare under penalty of perjury under the laws of the United States that the foregoing is true and correct to the best of my knowledge and belief.

Executed on ${today}

_________________________________
${formData.ownerName}
Owner, ${formData.companyName}

════════════════════════════════════════════════════════════════

IMPORTANT REQUIREMENTS:
✓ Use real dates, numbers, and specific details from the provided information
✓ Where details are vague, enhance them with realistic, plausible specifics
✓ Maintain formal, professional tone throughout
✓ Use transition phrases that create narrative flow
✓ Include regulatory citations where appropriate (49 CFR Part 26)
✓ Make every paragraph count - no filler content
✓ Aim for 4-6 pages of substantive, compelling content
✓ Format with clear section headers using the ════ dividers shown above

Generate the complete narrative now:`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16000,
      temperature: 0.8,
      messages: [{ role: "user", content: prompt }]
    });

    const narrative = message.content[0].text;

    const coverPrompt = `You are a professional business consultant. Generate a formal, compelling cover letter for ${formData.ownerName}, owner of ${formData.companyName}, submitting their DBE recertification application to ${formData.ucpSelection}.

Date: ${today}
Company: ${formData.companyName}
Industry: ${formData.industry}
Years in Business: ${formData.yearsInBusiness}

REQUIREMENTS:
- Professional business letter format with proper address block
- Confident but respectful tone
- Briefly highlight the key strengths of the application (qualifications, experience, documentation)
- Reference the enclosed documentation package
- One page maximum
- Include a strong call to action
- Express willingness to provide additional information
- Professional closing with signature block

The letter should convey:
✓ Professionalism and preparedness
✓ Confidence in meeting certification requirements
✓ Respect for the certification process
✓ Clear understanding of the new 2025 standards requiring individualized proof
✓ Appreciation for the reviewer's time and consideration

Use formal business letter language. Begin with applicant's contact information, then UCP address, then date, then a professional salutation.

Generate the complete cover letter now:`;

    const coverMsg = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      temperature: 0.7,
      messages: [{ role: "user", content: coverPrompt }]
    });

    const coverLetter = coverMsg.content[0].text;

    const checklist = `SUPPORTING DOCUMENTATION CHECKLIST
${formData.companyName} - DBE Recertification Application

Applicant: ${formData.ownerName}
Date: ${today}
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
   • Any formal complaints or inquiries filed

☐ ECONOMIC DISADVANTAGE DOCUMENTATION
   • Loan applications and denial letters
   • Correspondence regarding financing terms offered
   • Bonding cost documentation and capacity limitations
   • Insurance quotes showing premium disparities
   • Comparative market analysis (if available)
   • Evidence of contract losses to higher bidders

☐ BUSINESS CAPABILITY EVIDENCE
   • List of completed projects (last 3 years)
   • Client references and testimonials
   • Professional licenses and certifications
   • Equipment lists and ownership documentation
   • Personnel qualifications and resumes
   • Bonding capacity letters

☐ ADDITIONAL SUPPORTING MATERIALS
   • Organizational chart
   • Business plan or strategic overview
   • Marketing materials and capability statements
   • Any additional evidence supporting disadvantage claims

════════════════════════════════════════════════════════════════

SUBMISSION INSTRUCTIONS:

1. Review all documents for completeness and accuracy
2. Organize materials in the order listed above
3. Include this checklist as a cover sheet for your documentation package
4. Submit complete package to:

   ${formData.ucpSelection}
   [Contact information available through UCP website]

5. Retain copies of all submitted materials for your records
6. Follow up within 10 business days to confirm receipt

════════════════════════════════════════════════════════════════

IMPORTANT NOTES:

- All documentation must be current (within last 90 days where applicable)
- Personal net worth calculations must exclude primary residence and retirement accounts
- Evidence must demonstrate disadvantage by preponderance of the evidence
- Incomplete applications may result in delays or denial
- Contact your UCP certifier with questions before submission

════════════════════════════════════════════════════════════════

Document prepared by: DBE Narrative Pro
Preparation Date: ${today}`;

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
✓ Executive Summary
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

FINAL CHECKLIST BEFORE SUBMISSION:

☐ Review all narrative content for accuracy
☐ Verify all dates and dollar amounts
☐ Ensure all incidents include specific details
☐ Confirm UCP information is correct
☐ Gather all supporting documentation per checklist
☐ Sign and date all required documents
☐ Make copies of entire submission package
☐ Prepare submission envelope/package
☐ Submit via certified mail or as directed by UCP
☐ Calendar follow-up date (10 business days)

════════════════════════════════════════════════════════════════

TIPS FOR STRENGTHENING YOUR APPLICATION:

1. SPECIFIC DETAILS MATTER
   • Include exact dates, dollar amounts, and names where appropriate
   • "In March 2023" is stronger than "A few years ago"
   • "$52,000 higher bid" is stronger than "significantly higher"

2. SHOW CAUSE AND EFFECT
   • Connect each incident to business impact
   • Demonstrate how barriers led to lost revenue
   • Quantify impacts whenever possible

3. SUPPORTING DOCUMENTATION IS CRITICAL
   • Every claim in your narrative should have supporting evidence
   • Organize documents to match narrative structure
   • Use tabs or labels for easy reference

4. PROFESSIONAL PRESENTATION
   • Use clean, professional formatting
   • Check for spelling and grammar
   • Ensure consistent formatting throughout
   • Use quality paper for printed submissions

5. BE PREPARED FOR QUESTIONS
   • UCP may request clarification or additional evidence
   • Keep all source documents readily accessible
   • Be responsive to any follow-up requests

════════════════════════════════════════════════════════════════

NEXT STEPS:

1. Download all four documents from this package
2. Review each document carefully for accuracy
3. Make any necessary edits in Microsoft Word
4. Gather all supporting documentation per the checklist
5. Sign and date the narrative statement
6. Submit complete package to your UCP
7. Follow up within 10 business days to confirm receipt

════════════════════════════════════════════════════════════════

IMPORTANT REMINDERS:

- This is YOUR application - review it thoroughly before submission
- Accuracy is critical - all statements must be truthful and verifiable
- Keep copies of everything you submit
- Follow up proactively with your UCP
- Be prepared to provide additional information if requested

Your DBE certification is important. Take the time to ensure your application is complete, accurate, and well-documented.

Good luck with your recertification!

════════════════════════════════════════════════════════════════

Questions about this application package?
This document package was generated by DBE Narrative Pro`;

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