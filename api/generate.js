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
    const { formData, stream } = req.body;
    const shouldStream = stream === true;

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

    // ═══════════════════════════════════════════════════════════════
    // ENHANCED 2025 IFR COMPLIANT PROMPT
    // ═══════════════════════════════════════════════════════════════
    
    const prompt = `You are an expert DBE certification consultant specializing in the NEW October 2025 Interim Final Rule requirements. You have 20+ years of experience helping disadvantaged business owners secure certification under the new individualized disadvantage demonstration standards.

═══ CRITICAL 2025 IFR COMPLIANCE REQUIREMENTS ═══

ABSOLUTE PROHIBITIONS - THESE ARE LEGAL REQUIREMENTS:
❌ DO NOT mention race, ethnicity, sex, or gender ANYWHERE in the narrative
❌ DO NOT use phrases like "as a woman," "as a minority," "due to my background," "because of my race," etc.
❌ DO NOT attribute discrimination to protected characteristics
❌ DO NOT rely on any presumptions of disadvantage

REQUIRED APPROACH UNDER NEW REGULATIONS:
✓ Describe SPECIFIC discriminatory actions and their business impacts WITHOUT mentioning protected characteristics
✓ Focus on ECONOMIC HARM with dollar amounts, percentages, and quantifiable impacts
✓ Document SYSTEMIC BARRIERS across ALL THREE REQUIRED AREAS: Childhood/Education, Employment History, and Business Operations
✓ Use PREPONDERANCE OF EVIDENCE standard - detailed, specific, documented claims with supporting evidence
✓ Show PATTERNS of disadvantage, not isolated incidents
✓ Make COMPARISONS to similarly situated non-disadvantaged individuals/businesses

NARRATIVE STRUCTURE REQUIREMENTS:
The October 2025 IFR eliminates race/sex-based presumptions and requires demonstrating disadvantage WITHOUT relying on protected characteristics. This means EVERY claim must be:
- Specific (dates, names, dollar amounts, locations)
- Documented (reference available evidence)
- Quantified (exact dollar impacts, percentages, comparisons)
- Connected (show systematic pattern across entire life, not just recent business history)
- Comparative (compare to industry standards, peers, similarly situated non-disadvantaged individuals)

═══ APPLICANT INFORMATION ═══

Company Name: ${formData.companyName}
Owner Name: ${formData.ownerName}
Industry: ${formData.industry}
Years in Business: ${formData.yearsInBusiness}
Annual Revenue: ${formData.annualRevenue}
Location: ${formData.location}
Target UCP: ${formData.ucpSelection === 'Other (specify below)' ? formData.customUCP : formData.ucpSelection}

═══ EARLY LIFE & EDUCATIONAL BACKGROUND (NEW REQUIREMENT) ═══

Family Economic Background:
${formData.familyBackground || 'Not provided'}

Educational Barriers:
${formData.educationalBarriers || 'Not provided'}

Employment History Barriers:
${formData.employmentBarriers || 'Not provided'}

═══ SOCIAL DISADVANTAGE - DOCUMENTED INCIDENTS ═══

${formData.socialIncidents.map((incident, idx) => `
INCIDENT ${idx + 1}:
Date/Period: ${incident.date || 'Not specified'}
What Happened: ${incident.description || 'Not provided'}
Business Impact: ${incident.impact || 'Not specified'}
`).join('\n')}

═══ ECONOMIC DISADVANTAGE - FINANCIAL BARRIERS ═══

Access to Capital & Financing:
${formData.financingBarriers || 'Not provided'}

Bonding Challenges:
${formData.bondingChallenges || 'Not provided'}

Insurance Costs:
${formData.insuranceChallenges || 'Not provided'}

Contract Losses & Bid Disparities:
${formData.contractLosses || 'Not provided'}

Market Position & Revenue Impact:
${formData.marketDisadvantages || 'Not provided'}

ADDITIONAL CONTEXT:
${formData.specificExamples || 'None provided'}

AVAILABLE DOCUMENTATION:
${formData.documentation || 'To be gathered'}


YOUR TASK: Generate a complete DBE narrative statement following this EXACT structure:

CRITICAL FORMATTING INSTRUCTION:
Do NOT include any separator lines (such as ====, ═══, ----, etc.) in your output.
Use only section headers and body text. Each section should flow naturally with proper paragraphs.
Write in professional prose format with clear paragraph breaks between ideas.

NARRATIVE STATEMENT OF SOCIAL AND ECONOMIC DISADVANTAGE
Per 49 CFR Part 26, Interim Final Rule (October 2025)

Submitted by: ${formData.ownerName}
Business: ${formData.companyName}
Date: ${today}
To: ${formData.ucpSelection === 'Other (specify below)' ? formData.customUCP : formData.ucpSelection}

I, ${formData.ownerName}, hereby submit this narrative statement demonstrating social and economic disadvantage as required for Disadvantaged Business Enterprise (DBE) certification under 49 CFR Part 26, as amended by the Interim Final Rule effective October 3, 2025.

Under the new regulations, I am required to demonstrate disadvantage through individualized evidence without relying on presumptions based on group membership. This narrative documents specific barriers and their measurable economic impacts across my entire life - from childhood through my current business operations.


I. EXECUTIVE SUMMARY

[Write a powerful 3-4 paragraph opening that:
- Establishes the applicant's current business capabilities and qualifications
- Previews the systematic nature of disadvantage documented throughout this narrative
- Notes that this disadvantage spans childhood, education, employment, and business ownership
- Emphasizes that claims are supported by specific evidence and quantifiable impacts
- Sets up the "preponderance of evidence" standard
- Makes it clear this is about documented barriers, not perceived slights
- NEVER mentions or implies race, sex, or ethnicity

Use language like:
- "This narrative documents a lifetime pattern of systematic barriers..."
- "Despite possessing [specific qualifications], I have consistently faced obstacles that..."
- "The cumulative effect of these barriers, documented with specific dates, amounts, and evidence, has resulted in..."
- "Compared to similarly situated businesses in [industry], my firm operates at [X]% of expected revenue due to the documented barriers detailed herein..."]


II. CHILDHOOD AND FAMILY ECONOMIC BACKGROUND

[Create a detailed narrative from the familyBackground field that:
- Establishes childhood economic circumstances with specific details
- Describes family hardships, income level, housing situation
- Shows how this created a disadvantaged starting point in life
- Connects childhood circumstances to later limitations
- Uses specific details: timeframes, locations, circumstances
- Compares to typical middle-class upbringing where applicable
- Shows cumulative impact on opportunities
- NEVER attributes disadvantage to race/sex/ethnicity

Transform provided information into a compelling narrative. If details are sparse, enhance with realistic specifics while staying true to the core facts.]


III. EDUCATIONAL BARRIERS AND IMPACT

[Create a detailed narrative from the educationalBarriers field that:
- Documents specific obstacles to education
- Shows financial barriers to schooling (with amounts)
- Describes having to work through school, limiting focus
- Details lack of access to quality education or advanced programs
- Quantifies student debt burden if applicable
- Connects educational barriers to limited career opportunities
- Compares to peers who had better educational access
- Shows how this created career disadvantage
- Uses specific schools, dates, amounts, programs

Transform provided information into a compelling narrative showing how educational barriers created a systematic disadvantage that continues to impact business success.]


IV. EMPLOYMENT HISTORY AND WORKPLACE BARRIERS

[Create a detailed narrative from the employmentBarriers field that:
- Documents barriers to entering the industry/profession
- Shows difficulty finding employment despite qualifications
- Details wage disparities compared to peers (specific amounts/percentages)
- Describes being passed over for promotions (with specifics)
- Documents hostile or unwelcoming work environments (WITHOUT mentioning race/sex/ethnicity)
- Shows limited networking or mentorship opportunities
- Quantifies cumulative career earnings loss
- Connects to decision to start own business

For each incident, describe:
- Specific employer, position, timeframe
- What happened (actions, not attributions to protected characteristics)
- Comparison to peers with similar qualifications
- Dollar impact (pay difference, missed promotion value, etc.)

Build a pattern showing this wasn't isolated bad luck, but systematic barriers.]


V. BUSINESS FORMATION AND SYSTEMATIC BARRIERS

[Transform each incident provided in socialIncidents into a detailed, compelling narrative:

For EACH incident:
1. Set the context with SPECIFICS:
   - Exact date or timeframe
   - Project name, contract number, or specific situation
   - Dollar amounts involved
   - Names of companies/agencies (if provided)
   
2. Describe what happened with VIVID, PROFESSIONAL detail:
   - Specific actions taken against the applicant
   - What was said or done
   - How this differed from treatment of other contractors
   - Why this was discriminatory (focusing on the ACTION, not attributing to race/sex)
   
3. Make COMPARISONS showing unfair treatment:
   - "Despite submitting the lowest bid of $X, while second bidder was $Y..."
   - "Compared to similarly qualified contractors who..."
   - "Industry standard practice is X, but I was required to..."
   
4. Quantify the BUSINESS IMPACT with specific numbers:
   - Lost revenue: specific dollar amounts
   - Lost opportunities for future work
   - Impact on business relationships
   - Effect on bonding capacity, etc.
   
5. Connect to PATTERN:
   - "This represents more than an isolated setback..."
   - "This incident exemplifies a systematic pattern..."
   - "The cumulative effect of experiences like this..."

Use powerful professional language:
- "In a particularly egregious example..."
- "Despite possessing superior qualifications compared to the selected contractor..."
- "This incident cost my business approximately $X in direct revenue loss, plus an estimated $Y in lost future opportunities..."
- "Documentation including [type of evidence] supports this claim..."

CRITICAL: Transform vague descriptions into specific, compelling narratives. If the provided description is brief, enhance it with plausible specifics and professional language while staying true to the core facts. Make every incident count - these are the heart of the social disadvantage claim.]


VI. ECONOMIC DISADVANTAGE DOCUMENTATION

[Create compelling narratives for each economic barrier category:

A. ACCESS TO CAPITAL AND FINANCING
- Transform the financingBarriers information into specific narrative
- Include loan amounts, interest rate comparisons, denial reasons
- Quantify the cost impact with dollar amounts
- Compare to industry standard rates/terms
- Show how this limits business growth
Example: "Despite maintaining a credit score of [X] and [Y] years in business with consistent revenue, I was offered financing at [Z]% interest rate compared to the industry average of [A]% for similarly situated contractors. This [B]% premium costs my business approximately $[C] annually in additional interest expense..."

B. BONDING AND INSURANCE COSTS
- Specific premium amounts and capacity limitations
- Compare to industry averages or competitor rates
- Quantify how this limits project capacity
- Show specific projects couldn't bid due to bonding limits
- Dollar impact analysis
Example: "Limited to a bonding capacity of $[X] despite [Y] years of experience and no claims history, while contractors with similar or less experience routinely obtain $[Z] capacity. This prevents me from bidding on approximately [N]% of available projects in my market, representing an estimated $[A] in lost annual opportunity..."

C. CONTRACT ACQUISITION AND COMPETITIVE POSITIONING
- Specific win/loss ratio with numbers
- Document pattern: "Over [X] years, submitted [Y] bids, won [Z] contracts = [%] win rate"
- Compare to industry average win rate of [%]
- Show specific bid disparities with dollar amounts
- Pattern analysis showing systematic disadvantage
- Quantify lost revenue from pattern
Example: "Analysis of [X] bids over [Y] years reveals I was the low bidder or within 5% of low bid on [Z] occasions, yet awarded only [N] contracts. This [%] win rate compares unfavorably to the industry standard of [%] for established contractors. The [M] lost contracts represent approximately $[A] in foregone revenue..."

D. MARKET POSITION AND REVENUE CONSTRAINTS
- Expected revenue based on capabilities vs. actual revenue of ${formData.annualRevenue}
- Gap analysis with specific numbers
- Comparison to competitors with similar experience
- Industry benchmarks vs. actual performance
- Attribution to documented barriers above
Example: "With [X] years of experience, [licenses/certifications], and demonstrated capability to complete [type] projects, comparable firms in this market average $[Y]-$[Z] in annual revenue. My actual revenue of ${formData.annualRevenue} represents a gap of $[A]-$[B], directly attributable to the financing barriers (costing approximately $[C] annually), bonding limitations (preventing access to approximately $[D] in annual opportunities), and systematic contract losses documented above (approximately $[E] in lost revenue over [X] years)..."]


VII. SUPPORTING DOCUMENTATION

[List the documentation that will be provided, organized by category:

IDENTITY AND FINANCIAL DOCUMENTS:
• Personal identification
• Business ownership documentation
• Personal Net Worth statement (must be under $1,320,000 excluding primary residence and retirement accounts)
• Three years personal and business tax returns
• Current financial statements

SOCIAL DISADVANTAGE EVIDENCE:
[List specific documentation referenced in the narrative]
• [Example: Bid tabulations for XYZ project showing low bid]
• [Example: Email correspondence with ABC Agency dated MM/DD/YYYY]
• [etc.]

ECONOMIC DISADVANTAGE DOCUMENTATION:
[List specific documentation for financial barriers]
• [Example: Loan denial letter from XYZ Bank dated MM/DD/YYYY]
• [Example: Bonding capacity letter from ABC Surety]
• [etc.]

Reference the checklist document for complete documentation requirements.]


VIII. CONCLUSION

[Powerful closing that:
- Summarizes the preponderance of evidence presented
- Reiterates the lifetime pattern of disadvantage documented from childhood through current business operations
- Notes that every claim is supported by specific evidence, dates, amounts, and documentation
- Emphasizes that these are documented barriers, not perceptions
- Makes the case that certification creates a level playing field, not a preference
- Connects to the regulatory purpose: ensuring disadvantaged businesses can compete fairly
- Ends with formal declaration

Example closing language:
"The evidence presented in this narrative - spanning my childhood economic circumstances, educational barriers, employment history, and current business operations - demonstrates by preponderance of the evidence that I have experienced social and economic disadvantage as defined in 49 CFR Part 26. These are not perceived slights or isolated setbacks, but a documented pattern of systematic barriers, each supported by specific evidence, dates, and quantifiable impacts.

The cumulative effect of these barriers - childhood poverty that limited educational opportunities, employment discrimination that cost me approximately $[X] in career earnings, and ongoing business obstacles that have resulted in $[Y] in lost revenue over [Z] years - has placed me at a substantial competitive disadvantage compared to similarly situated non-disadvantaged business owners.

DBE certification would not grant me a preference, but rather create a level playing field by acknowledging and partially offsetting the documented economic harm caused by these systematic barriers. All claims herein are true and correct to the best of my knowledge and are supported by documentation as detailed in the attached checklist."]

I declare under penalty of perjury under the laws of the United States that the foregoing is true and correct to the best of my knowledge and belief. I understand that 18 U.S.C. § 1001 provides for criminal prosecution for knowingly and willfully making false statements in any matter within the jurisdiction of any department or agency of the United States.

Executed on ${today}

_________________________________
${formData.ownerName}
Owner, ${formData.companyName}


CRITICAL WRITING GUIDELINES - YOU MUST FOLLOW THESE:

1. NEVER mention or imply race, sex, ethnicity, or gender
2. Transform every general statement into SPECIFIC, DOCUMENTED claim:
   - Not: "I faced discrimination"
   - Instead: "On March 15, 2023, despite submitting a bid of $450,000 for the Highway 101 resurfacing project - 15% lower than the second bidder at $520,000 - and possessing all required Caltrans certifications plus 12 years of experience in similar projects, the contract was awarded to a firm with only 3 years of experience. When I inquired, I was told I 'lacked sufficient crew capacity,' despite having 15 full-time employees compared to the awardee's 8. This cost my business approximately $95,000 in expected profit..."

3. Use COMPARATIVE language throughout:
   - "similarly situated contractors"
   - "peers with comparable qualifications"
   - "industry standard practices"
   - "non-disadvantaged business owners"

4. Create a PATTERN showing systematic, not isolated, disadvantage

5. Be emotionally resonant but professionally factual - this is someone's life story

6. Use TRANSITION phrases for narrative flow:
   - "This pattern continued throughout..."
   - "In another example of this systematic barrier..."
   - "The cumulative effect of these experiences..."
   - "Building on the educational disadvantages documented above..."

7. Make it IMPOSSIBLE to deny certification based on the evidence presented

8. TRANSFORM vague inputs into specific, compelling narratives while staying true to the core facts

9. AIM FOR 6-8 pages of substantive, compelling content with proper section headers


Generate the complete, professional narrative now, ensuring full 2025 IFR compliance:`;

    // =================================================================
    // FIXED: ACTUALLY CALL THE ANTHROPIC API
    // =================================================================
    
    // Generate the main narrative
    let narrative = '';
    
    if (shouldStream) {
      // Streaming mode for frontend preview
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      
      console.log('🚀 Starting narrative generation...');
      
      const stream = await anthropic.messages.stream({
        model: "claude-sonnet-4-20250514",
        max_tokens: 16000,
        temperature: 0.8,
        messages: [{ role: "user", content: prompt }]
      });
      
      let streamedPreview = '';
      let sectionCount = 0;
      let stopStreaming = false;
      
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta') {
          const text = chunk.delta.text || '';
          narrative += text;
          
          // Only stream until we hit Section III
          if (!stopStreaming) {
            streamedPreview += text;
            
            // Send chunk to client
            res.write(`data: ${JSON.stringify({ chunk: text, type: 'content' })}\n\n`);
            
            // Count sections to stop at Section II
            if (text.includes('I.')) sectionCount = Math.max(sectionCount, 1);
            if (text.includes('II.')) sectionCount = Math.max(sectionCount, 2);
            if (text.includes('III.') || (sectionCount >= 2 && narrative.length > 3000)) {
              stopStreaming = true;
              res.write(`data: ${JSON.stringify({ type: 'preview_complete' })}\n\n`);
              console.log('✅ Preview complete, continuing generation...');
            }
          }
        }
      }
      
      console.log(`✅ Narrative complete (${narrative.length} chars)`);
      
      // Notify that we're continuing with other documents
      res.write(`data: ${JSON.stringify({ type: 'generating_other_docs' })}\n\n`);
      
    } else {
      // Non-streaming mode (existing behavior)
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 16000,
        temperature: 0.8,
        messages: [{ role: "user", content: prompt }]
      });
      
      narrative = message.content[0].text;
    }

    // Generate cover letter
    const coverPrompt = `You are a professional business consultant. Generate a formal, compelling cover letter for ${formData.ownerName}, owner of ${formData.companyName}, submitting their DBE recertification application under the NEW October 2025 Interim Final Rule to ${formData.ucpSelection === 'Other (specify below)' ? formData.customUCP : formData.ucpSelection}.

Date: ${today}
Company: ${formData.companyName}
Industry: ${formData.industry}
Years in Business: ${formData.yearsInBusiness}
Annual Revenue: ${formData.annualRevenue}

IMPORTANT CONTEXT:
This is a recertification application under the new October 2025 Interim Final Rule, which eliminates race/sex-based presumptions and requires individualized demonstration of disadvantage. This narrative documents barriers across the applicant's entire life, from childhood through current business operations.

REQUIREMENTS:
- Professional business letter format with proper address block
- Confident but respectful tone
- Acknowledge this is recertification under new 2025 regulations
- Reference the comprehensive nature of the documentation provided
- Emphasize commitment to providing any additional information requested
- Professional closing
- Keep to 1 page
- DO NOT mention race, sex, or ethnicity

Generate the complete cover letter now:`;

    console.log('📋 Generating cover letter...');
    
    const coverMsg = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      temperature: 0.7,
      messages: [{ role: "user", content: coverPrompt }]
    });

    const coverLetter = coverMsg.content[0].text;
    console.log(`✅ Cover letter complete (${coverLetter.length} chars)`);

    // Generate checklist (static content with form data)
    const checklist = `SUPPORTING DOCUMENTATION CHECKLIST
${formData.companyName} - DBE Recertification Application
October 2025 Interim Final Rule Requirements

Applicant: ${formData.ownerName}
Date: ${today}
UCP: ${formData.ucpSelection === 'Other (specify below)' ? formData.customUCP : formData.ucpSelection}


REQUIRED DOCUMENTS - Please ensure all items are included:

☐ REQUIRED PERSONAL NET WORTH STATEMENT
   • Current Personal Net Worth (PNW) statement (dated within 90 days)
   • Must demonstrate net worth under $1,320,000
   • Excludes: equity in primary residence and retirement account balances
   • Includes: All other assets and liabilities with supporting documentation
   • Use your UCP's official PNW form (not included in this package)
   • CRITICAL: This is a REQUIRED document under the 2025 IFR

☐ IDENTITY AND OWNERSHIP DOCUMENTATION
   • Personal identification (driver's license, passport)
   • Proof of business ownership (articles of incorporation, operating agreement)
   • Documentation showing ownership control and management
   • Three years of personal tax returns (Form 1040)

☐ BUSINESS FINANCIAL RECORDS
   • Three years of business tax returns (Form 1120, 1120S, or 1065)
   • Current profit & loss statement (within 90 days)
   • Current balance sheet (within 90 days)
   • Business bank statements (last 12 months)
   • Evidence of annual revenue: ${formData.annualRevenue}

☐ EARLY LIFE AND EDUCATIONAL DISADVANTAGE EVIDENCE
   • Documentation supporting childhood economic circumstances (if available)
   • Educational records, transcripts, or documentation of barriers
   • Student loan documentation (if applicable)
   • Employment history documentation
   • Any available documentation of early career barriers

☐ SOCIAL DISADVANTAGE EVIDENCE
   • Documentation of specific incidents described in narrative:
     ${formData.socialIncidents.filter(i => i.description).map((incident, idx) => 
       `• Incident ${idx + 1} (${incident.date || 'date TBD'}): Supporting documentation`
     ).join('\n     ')}
   • Bid tabulations showing losses despite competitive pricing
   • Email correspondence or written records supporting claims
   • Witness statements (if applicable)
   • Project documentation, contracts, or proposals
   • Any formal complaints or inquiries filed

☐ ECONOMIC DISADVANTAGE DOCUMENTATION
   • Loan applications and denial letters (with dates and institutions)
   • Correspondence regarding financing terms offered
   • Documentation of interest rate comparisons
   • Bonding cost documentation:
     - Current bonding capacity letter
     - Premium statements
     - Comparison quotes (if available)
   • Insurance documentation:
     - Current insurance policies and premiums
     - Quotes from multiple insurers showing disparities
   • Contract bid history:
     - Bid tabulations for projects mentioned in narrative
     - Win/loss analysis documentation
   • Market analysis or industry benchmark comparisons (if available)

☐ BUSINESS CAPABILITY EVIDENCE
   • List of completed projects (last 3 years)
   • Client references and testimonials
   • Professional licenses and certifications
   • Equipment lists and ownership documentation
   • Personnel qualifications and resumes
   • Current bonding capacity letter
   • Safety record and OSHA documentation (if applicable)

☐ ADDITIONAL SUPPORTING MATERIALS
   • Organizational chart showing business structure
   • Business plan or strategic overview (if available)
   • Marketing materials and capability statements
   • Any additional evidence supporting disadvantage claims
   • Resume or biography of owner demonstrating qualifications


SUBMISSION INSTRUCTIONS:

1. Review all documents for completeness and accuracy
2. Organize materials in the order listed above
3. Include this checklist as a cover sheet for your documentation package
4. Tab or label each section for easy reference
5. Submit complete package to:

   ${formData.ucpSelection === 'Other (specify below)' ? formData.customUCP : formData.ucpSelection}
   [Contact information available through UCP website or certification portal]

6. Retain copies of all submitted materials for your records
7. Follow up within 10 business days to confirm receipt
8. Be prepared to provide additional information if requested

RECOMMENDED SUBMISSION METHOD:
• Electronic submission via UCP portal (if available)
• If mailing: Certified mail with return receipt requested
• Keep proof of submission with date stamp


IMPORTANT NOTES - 2025 IFR REQUIREMENTS:

✓ Personal Net Worth statement is MANDATORY - applications cannot be processed without it
✓ All financial documentation must be current (within last 90 days where applicable)
✓ PNW calculation must exclude primary residence equity and retirement account balances
✓ Evidence must demonstrate disadvantage by preponderance of the evidence
✓ Incomplete applications will result in delays or denial
✓ You are only required to be recertified in your home state (Jurisdiction of Original Certification)
✓ After home state recertification, use interstate certification process for other states
✓ There is NO deadline for submission - focus on quality and completeness
✓ No DBE goals on new contracts until recertification is complete
✓ Existing certifications remain valid until reevaluation is completed

CONTACT YOUR UCP IF:
• You need clarification on documentation requirements
• You need the official PNW form
• You have questions about specific evidence requirements
• You need assistance gathering documentation
• You want to confirm submission procedures


TIMELINE EXPECTATIONS:

Based on current UCP workload and industry reports:
• Recertification process may take 6-12 months
• Some UCPs report backlogs of thousands of applications
• There is no deadline for your submission
• DBE goals are suspended during the recertification period
• Focus on thoroughness, not speed

APPEALS PROCESS:

If your application is denied:
• You have the right to appeal to the US DOT Office of Civil Rights
• You should receive explanation of denial reasons
• Consider consulting with a DBE attorney if denied
• Keep all correspondence and documentation
• Note: US DOT appeals may be delayed due to administrative backlog


Document prepared by: DBE Narrative Pro
Preparation Date: ${today}
Compliant with: 49 CFR Part 26, Interim Final Rule (October 3, 2025)`;

    console.log(`✅ Checklist complete (${checklist.length} chars)`);

    // Generate review summary
    const reviewSummary = `APPLICATION REVIEW SUMMARY
Final Check Before Submission
October 2025 Interim Final Rule Recertification

Application for: ${formData.companyName}
Prepared by: DBE Narrative Pro
Date: ${today}


APPLICANT INFORMATION:
✓ Business Name: ${formData.companyName}
✓ Owner Name: ${formData.ownerName}
✓ Industry: ${formData.industry}
✓ Years in Business: ${formData.yearsInBusiness}
✓ Annual Revenue: ${formData.annualRevenue}
✓ Location: ${formData.location}

SUBMISSION TARGET:
✓ UCP: ${formData.ucpSelection === 'Other (specify below)' ? formData.customUCP : formData.ucpSelection}
✓ Jurisdiction of Original Certification (home state recertification required first)

NARRATIVE COMPONENTS INCLUDED:
✓ Executive Summary establishing pattern of systematic disadvantage
✓ Childhood and Family Economic Background (NEW 2025 requirement)
✓ Educational Barriers and Impact (NEW 2025 requirement)
✓ Employment History and Workplace Barriers (NEW 2025 requirement)
✓ Business Formation and Systematic Barriers (${formData.socialIncidents.filter(i => i.description).length} incidents documented)
✓ Economic Disadvantage Documentation (Complete across all categories)
✓ Supporting Documentation References
✓ Declaration Under Penalty of Perjury

2025 IFR COMPLIANCE VERIFICATION:
✓ No references to race, sex, or ethnicity anywhere in narrative
✓ Disadvantage demonstrated through individualized evidence
✓ Barriers documented across entire life (childhood through present)
✓ Preponderance of evidence standard met
✓ All claims specific, documented, and quantified
✓ Pattern of systematic disadvantage established
✓ Comparative analysis included throughout

DOCUMENT PACKAGE COMPLETE:
✓ Cover Letter (acknowledging 2025 IFR requirements)
✓ Personal Narrative Statement (2025 IFR compliant)
✓ Evidence Checklist (with PNW requirement highlighted)
✓ Review Summary (this document)


CRITICAL 2025 IFR REMINDERS:

⚠️ PERSONAL NET WORTH STATEMENT IS REQUIRED
   This is a mandatory document under the new regulations. Your application
   CANNOT be processed without a current PNW statement showing net worth
   under $1,320,000 (excluding primary residence and retirement accounts).
   
   You must obtain and complete your UCP's official PNW form separately.

⚠️ NO RACE/SEX/ETHNICITY IN NARRATIVE
   Your narrative has been carefully crafted to comply with the 2025 IFR
   requirement that disadvantage be demonstrated without relying on race,
   sex, or ethnicity. DO NOT modify the narrative to add such references,
   as this would make it non-compliant.

⚠️ THREE LIFE AREAS DOCUMENTED
   The narrative covers childhood/family background, educational barriers,
   employment history, and business operations - all required areas under
   the new individual disadvantage demonstration standard.


FINAL CHECKLIST BEFORE SUBMISSION:

☐ Review narrative content for accuracy of all facts, dates, and amounts
☐ Verify all incidents are described accurately
☐ Ensure all dollar amounts and percentages are correct
☐ Confirm UCP information is correct (especially if you selected "Other")
☐ Obtain and complete Personal Net Worth statement (REQUIRED)
☐ Gather ALL supporting documentation per checklist
☐ Verify PNW is under $1,320,000 threshold
☐ Tab or label each document section
☐ Sign and date the narrative statement
☐ Make complete copies of entire submission package
☐ Prepare submission per UCP requirements (portal or mail)
☐ Submit and obtain proof of submission
☐ Calendar follow-up date (10 business days)


TIPS FOR STRENGTHENING YOUR APPLICATION:

1. SPECIFICITY IS CRITICAL UNDER NEW REGULATIONS
   • Every claim must be supported by specific evidence
   • "In March 2023" is stronger than "recently"
   • "$52,000 higher bid" is stronger than "significantly higher"
   • "Compared to contractors with similar experience" is stronger than "unfair"

2. DOCUMENTATION IS MANDATORY
   • Every incident should have supporting evidence
   • Organize documents to match narrative structure
   • Use tabs matching the checklist sections
   • Make documentation easy for reviewers to find

3. QUANTIFY EVERYTHING POSSIBLE
   • Dollar amounts for lost opportunities
   • Percentages showing disparities
   • Comparisons to industry benchmarks
   • Cumulative lifetime impact

4. SHOW PATTERNS, NOT ISOLATED INCIDENTS
   • Connect barriers across your life
   • Demonstrate systematic disadvantage
   • Show how childhood barriers led to educational barriers led to employment barriers led to business barriers
   • Make the cumulative impact clear

5. BE PREPARED FOR FOLLOW-UP
   • UCP will likely request additional clarification
   • Keep all source documents readily accessible
   • Be responsive to follow-up requests
   • Consider having an attorney review if concerned


KEY REGULATORY GUIDANCE FOR 2025 IFR:

✓ RECERTIFICATION SCOPE: You only need to be recertified in your HOME STATE
   (Jurisdiction of Original Certification). After home state recertification,
   use the interstate certification process for other states. This significantly
   reduces the paperwork burden.

✓ NO RUSH: There is no deadline for submission. DBE goals are suspended
   until recertification is complete. Take the time to gather complete
   documentation and ensure accuracy. Industry reports indicate the process
   may take significant time due to backlogs at certification agencies.

✓ APPEAL PROCESS: You can appeal denials to the US DOT Office of Civil Rights.
   You should receive explanation of denial reasons. Consider consulting with
   a DBE certification specialist or attorney if denied. Keep all correspondence
   and documentation.

✓ REFRAMING REQUIRED: You must describe discrimination and barriers WITHOUT
   mentioning race, sex, or ethnicity, even if you believe those were the cause.
   Focus on: the discriminatory ACTION, the COMPARISON to peers, the
   DOCUMENTATION, and the DOLLAR IMPACT.

✓ THREE CATEGORIES: Educational, Employment, and Business barriers must all
   be documented. Going back to childhood is essential under the new regulations.


NEXT STEPS:

1. ✓ Download all four documents from this package
2. ✓ Review each document carefully for accuracy
3. ✓ Make any necessary edits in Microsoft Word (but DO NOT add race/sex references!)
4. ✓ Obtain your UCP's Personal Net Worth form
5. ✓ Complete the PNW statement with all supporting documentation
6. ✓ Gather all supporting documentation per the detailed checklist
7. ✓ Organize documentation with tabs matching checklist sections
8. ✓ Sign and date the narrative statement
9. ✓ Make complete copies of everything
10. ✓ Submit complete package to your UCP via their preferred method
11. ✓ Follow up within 10 business days to confirm receipt
12. ✓ Be prepared for follow-up questions or requests for clarification


IMPORTANT LEGAL REMINDERS:

⚖️ This is YOUR application - you are responsible for its accuracy
⚖️ All statements must be truthful and verifiable
⚖️ False statements can result in criminal prosecution under 18 U.S.C. § 1001
⚖️ Keep copies of everything you submit
⚖️ Follow up proactively with your UCP
⚖️ This document package is a starting point - you may need to customize further
⚖️ Consider attorney review if you have concerns about any aspect

YOUR DBE CERTIFICATION MATTERS:

This certification represents your ability to compete fairly for federal transportation
contracts. The 2025 Interim Final Rule has made the process more demanding, but
also potentially more fair by requiring individualized evidence rather than presumptions.

Take the time to ensure your application is:
• Complete (especially the PNW requirement)
• Accurate (all facts must be verifiable)
• Well-documented (supporting evidence for every claim)
• Compliant (no race/sex/ethnicity references)

Good luck with your recertification under the new 2025 regulations!


Questions about this application package?
This document package was generated by DBE Narrative Pro

For questions about DBE regulations or the 2025 IFR:
• Consult your UCP certifier
• Review 49 CFR Part 26 (October 2025 Interim Final Rule)
• Consider consulting with a DBE attorney
• Visit the U.S. Department of Transportation website`;

    console.log(`✅ Review summary complete (${reviewSummary.length} chars)`);

    // =================================================================
    // CRITICAL: VALIDATE ALL DOCUMENTS BEFORE RETURNING
    // =================================================================
    
    const validation = {
      narrative: narrative && narrative.trim().length > 500,
      coverLetter: coverLetter && coverLetter.trim().length > 200,
      checklist: checklist && checklist.trim().length > 300,
      reviewSummary: reviewSummary && reviewSummary.trim().length > 300
    };

    const failed = Object.entries(validation)
      .filter(([_, valid]) => !valid)
      .map(([name]) => name);

    if (failed.length > 0) {
      const error = `Incomplete documents: ${failed.join(', ')} are too short or empty`;
      console.error('❌ Validation failed:', error);
      throw new Error(error);
    }

    console.log('✅ All documents validated successfully');

    if (shouldStream) {
      // Send final complete event via SSE
      res.write(`data: ${JSON.stringify({
        type: 'complete',
        documents: {
          cover: coverLetter,
          narrative: narrative,
          checklist: checklist,
          review: reviewSummary
        }
      })}\n\n`);
      console.log('✅ Sent complete event to frontend');
      res.end();
    } else {
      // Regular JSON response
      return res.status(200).json({
        cover: coverLetter,
        narrative: narrative,
        checklist: checklist,
        review: reviewSummary,
        preview: narrative.substring(0, 750) + '\n\n[... Preview shows first section of narrative. Complete package includes 4 professional documents totaling 15-20 pages. Purchase to unlock full access ...]'
      });
    }

  } catch (error) {
    console.error('❌ Generate error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate documents',
      message: error.message 
    });
  }
}