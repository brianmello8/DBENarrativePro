// src/utils/fieldMapping.js

/**
 * Maps form data from React state to PDF field names
 * This is the critical mapping between your UCAFormFiller state and the actual PDF fields
 * 
 * @param {Object} formData - The complete form data object from UCAFormFiller
 * @returns {Object} - Object with PDF field names as keys and values to fill
 */
export function mapFormDataToPdfFields(formData) {
  const mapping = {};
  
  // ============================================================
  // SECTION 1: CERTIFICATION INFORMATION
  // ============================================================
  
  // Basic Contact Information
  mapping['1 Contact persons name and title'] = formData.contactName;
  mapping['2 Title'] = formData.contactTitle;
  mapping['2 Legal name of firm'] = formData.legalFirmName;
  mapping['3 Phone'] = formData.phone;
  mapping['4 Other Phone'] = formData.otherPhone;
  mapping['5Fax'] = formData.fax;
  mapping['6 Email'] = formData.email;
  mapping['7 Firm Websites'] = formData.website;
  
  // Street Address
  mapping['8 Street address of firm No PO Box'] = formData.streetAddress;
  mapping['City'] = formData.city;
  mapping['CountyParish'] = formData.county;
  mapping['State'] = formData.state;
  mapping['Zip'] = formData.zip;
  
  // Mailing Address (if different)
  mapping['9 Mailing address of firm No PO Box'] = formData.mailingAddress;
  mapping['City_2'] = formData.mailingCity;
  mapping['CountyParish_2'] = formData.mailingCounty;
  mapping['State_2'] = formData.mailingState;
  mapping['Zip_2'] = formData.mailingZip;
  
  // Certification Type
  if (formData.certificationType === 'DBE') {
    mapping['undefined'] = 'On'; // DBE checkbox
  } else if (formData.certificationType === 'ACDBE') {
    mapping['undefined_2'] = 'On'; // ACDBE checkbox  
  }
  
  // Prior Certifications
  mapping['a Denied certification or decertified as a DBE ACDBE 8a SDB MBEWBE firm'] = formData.deniedCertification ? 'Yes' : 'No';
  mapping['b Withdrawn an application for these programs or debarred or suspended or otherwise had bidding privileges'] = formData.withdrawnOrDebarred ? 'Yes' : 'No';
  
  if (formData.deniedCertificationExplanation) {
    mapping['denied or restricted by any state or local agency or federal entity'] = formData.deniedCertificationExplanation + 
      (formData.withdrawnOrDebarredExplanation ? ' ' + formData.withdrawnOrDebarredExplanation : '');
  }
  
  // ============================================================
  // SECTION 2: GENERAL INFORMATION  
  // ============================================================
  
  // Business Profile
  mapping['A Business Profile 1 Give a concise description of the firms primary activities and the products or services it'] = formData.businessDescription;
  mapping['2 NAICS Codes for this line of work include'] = formData.naicsCodes;
  mapping['3 This firm was established on'] = formData.dateEstablished;
  
  // For Profit Status
  if (formData.isForProfit === 'yes') {
    mapping['4 Is the firm for profit'] = 'On';
  }
  mapping['Federal Tax ID'] = formData.federalTaxId;
  
  // Legal Structure
  if (formData.legalStructure.includes('Sole Proprietorship')) {
    mapping['Sole Proprietorship'] = 'On';
  }
  if (formData.legalStructure.includes('Limited Liability Partnership')) {
    mapping['Limited Liability Partnership'] = 'On';
  }
  if (formData.legalStructure.includes('Partnership')) {
    mapping['Partnership'] = 'On';
  }
  if (formData.legalStructure.includes('Corporation')) {
    mapping['Corporation'] = 'On';
  }
  if (formData.legalStructure.includes('Limited Liability Company')) {
    mapping['Limited Liability Company'] = 'On';
  }
  
  // Employees
  mapping['Fulltime'] = formData.fullTimeEmployees;
  mapping['Parttime'] = formData.partTimeEmployees;
  mapping['Seasonal'] = formData.seasonalEmployees;
  mapping['Total'] = String(
    parseInt(formData.fullTimeEmployees || 0) + 
    parseInt(formData.partTimeEmployees || 0) + 
    parseInt(formData.seasonalEmployees || 0)
  );
  
  // Gross Receipts (5 years)
  formData.grossReceipts.forEach((receipt, index) => {
    if (index === 0) {
      mapping['Year'] = receipt.year;
      mapping['Gross Receipts of Applicant Firm'] = receipt.applicantAmount;
      mapping['Gross Receipts of Affiliate Firms'] = receipt.affiliateAmount;
    } else {
      mapping[`Year_${index + 1}`] = receipt.year;
      mapping[`Gross Receipts of Applicant Firm_${index + 1}`] = receipt.applicantAmount;
      mapping[`Gross Receipts of Affiliate Firms_${index + 1}`] = receipt.affiliateAmount;
    }
  });
  
  // Relationships with Other Businesses
  mapping['1 Is your firm colocated at any of its business locations or does it share a telephone number PO Box'] = 
    formData.sharedResources ? 'Yes' : 'No';
  
  if (formData.sharedResourcesExplanation) {
    mapping['office or storage space yard warehouse facilities equipment inventory financing office staff andor'] = 
      formData.sharedResourcesExplanation;
  }
  
  mapping['2 Has any other firm had an ownership interest in your firm at present or at any time in the past'] = 
    formData.otherOwnershipInterest ? 'Yes' : 'No';
  
  // Business History
  mapping['a Ever existed under different ownership a different type of ownership or a different name'] = 
    formData.differentOwnership ? 'Yes' : 'No';
  mapping['b Existed as a subsidiary of any other firm'] = 
    formData.subsidiary ? 'Yes' : 'No';
  mapping['c Existed as a partnership in which one or more of the partners arewere other firms'] = 
    formData.partnershipWithFirms ? 'Yes' : 'No';
  mapping['d Owned any percentage of any other firm'] = 
    formData.ownsOtherFirms ? 'Yes' : 'No';
  mapping['e Had any subsidiaries'] = 
    formData.hasSubsidiaries ? 'Yes' : 'No';
  mapping['f Served as a subcontractor with another firm constituting more than 25 of your firms receipts'] = 
    formData.majorSubcontractor ? 'Yes' : 'No';
  
  // ============================================================
  // SECTION 3: MAJORITY OWNER INFORMATION
  // ============================================================
  
  const majorityOwner = formData.majorityOwner;
  
  mapping['1 Full Name'] = majorityOwner.fullName;
  mapping['2 Title'] = majorityOwner.title;
  mapping['3 Home Phone'] = majorityOwner.homePhone;
  mapping['4 Home Address Street and Number'] = majorityOwner.homeAddress;
  mapping['City_3'] = majorityOwner.homeCity;
  mapping['State_3'] = majorityOwner.homeState;
  mapping['Zip_3'] = majorityOwner.homeZip;
  
  // Sex
  if (majorityOwner.sex === 'Male') {
    mapping['5 Sex'] = 'Male';
  } else if (majorityOwner.sex === 'Female') {
    mapping['Female'] = 'On';
  }
  
  // Group Membership
  if (majorityOwner.groupMembership.includes('Black American')) {
    mapping['Black American'] = 'On';
  }
  if (majorityOwner.groupMembership.includes('Hispanic American')) {
    mapping['Hispanic American'] = 'On';
  }
  if (majorityOwner.groupMembership.includes('Asian-Pacific American')) {
    mapping['AsianPacific American'] = 'On';
  }
  if (majorityOwner.groupMembership.includes('Native American')) {
    mapping['Native American'] = 'On';
  }
  if (majorityOwner.groupMembership.includes('Subcontinent Asian American')) {
    mapping['Subcontinent Asian American'] = 'On';
  }
  
  // Residency Status
  if (majorityOwner.residencyStatus === 'US Citizen') {
    mapping['7 Residency Status'] = 'US_Citizen';
  } else if (majorityOwner.residencyStatus === 'Permanent Resident') {
    mapping['Lawfully Admitted Permanent Resident'] = 'On';
  }
  
  // Ownership Details
  mapping['8 Number of years as owner'] = majorityOwner.yearsAsOwner;
  mapping['9 Percentage owned'] = majorityOwner.percentageOwned;
  mapping['a Class of stock owned if applicable'] = majorityOwner.classOfStock;
  mapping['b Date acquired'] = majorityOwner.dateAcquired;
  
  // Initial Investment
  mapping['Cash'] = majorityOwner.cashInvestment;
  mapping['Real Estate'] = majorityOwner.realEstateInvestment;
  mapping['Equipment'] = majorityOwner.equipmentInvestment;
  mapping['Other'] = majorityOwner.otherInvestment;
  
  // Acquisition Method
  if (majorityOwner.acquisitionMethod) {
    const methods = {
      'Started myself': 'Started business myself',
      'Gift': 'Received it as a gift from',
      'Purchased': 'Bought it from',
      'Inherited': 'Inherited it from',
      'Other': 'Other'
    };
    const methodField = methods[majorityOwner.acquisitionMethod];
    if (methodField) {
      mapping[methodField] = 'On';
    }
  }
  
  // Additional Owner Information
  mapping['1 Describe familial relationship to other owners and employees'] = majorityOwner.familialRelationships;
  
  mapping['2 Does this owner perform a management or supervisory function for any other business'] = 
    majorityOwner.managementForOtherBusiness ? 'Yes' : 'No';
  
  if (majorityOwner.otherBusinessName) {
    mapping['Name of Business'] = majorityOwner.otherBusinessName;
    mapping['FunctionTitle'] = majorityOwner.otherBusinessFunction;
  }
  
  mapping['3a Does this owner own or work for any other firms that has a relationship with this firm eg ownership'] = 
    majorityOwner.ownsOrWorksForRelatedFirm ? 'Yes' : 'No';
  
  mapping['4a What is the Personal Net Worth PNW of this disadvantaged owner'] = majorityOwner.personalNetWorth;
  
  mapping['bHas any trust been created for the benefit of this disadvantaged owners'] = 
    majorityOwner.trustCreated ? 'Yes' : 'No';
  
  // ============================================================
  // SECTION 4: CONTROL
  // ============================================================
  
  // Officers
  formData.officers.forEach((officer, index) => {
    const suffix = index === 0 ? '' : `_${index + 1}`;
    mapping[`Name${suffix}`] = officer.name;
    mapping[`Title${suffix}`] = officer.title;
    mapping[`Date Appointed${suffix}`] = officer.dateAppointed;
    mapping[`Ethnicity${suffix}`] = officer.ethnicity;
    mapping[`Sex${suffix}`] = officer.sex;
  });
  
  // Board of Directors
  formData.directors.forEach((director, index) => {
    const suffix = index === 0 ? '_2' : `_${index + 2}`;
    mapping[`Name${suffix}`] = director.name;
    mapping[`Title${suffix}`] = director.title;
    mapping[`Date Appointed${suffix}`] = director.dateAppointed;
    mapping[`Ethnicity${suffix}`] = director.ethnicity;
    mapping[`Sex${suffix}`] = director.sex;
  });
  
  // Management of Other Business
  mapping['3 Do any of the persons listed above perform a management or supervisory function for any other business'] = 
    formData.officersManageOtherBusiness ? 'Yes' : 'No';
  
  // Key Personnel Duties
  if (formData.keyPersonnel && formData.keyPersonnel.length > 0) {
    const person = formData.keyPersonnel[0];
    mapping['Name_3'] = person.name;
    mapping['Title_3'] = person.title;
    mapping['Percent Owned'] = person.percentOwnership;
    
    // Map duty frequencies
    const dutyMap = {
      setsPolicy: 'Sets policy for company directionscope of operations',
      biddingEstimating: 'Bidding and estimating',
      majorPurchasing: 'Major purchasing decisions',
      marketingSales: 'Marketing and sales',
      supervisesField: 'Supervises field operations',
      attendsBidOpenings: 'Attend bid opening and lettings',
      officeManagement: 'Perform office management billing accounts receivablepayable etc',
      hiresFiresManagement: 'Hires and fires management staff',
      hiresFiresField: 'Hire and fire field staff or crew',
      designatesProfits: 'Designates profits spending or investment',
      obligatesBusiness: 'Obligates business by contractcredit',
      purchasesEquipment: 'Purchase equipment',
      signsChecks: 'Signs business checks'
    };
    
    Object.keys(person.duties).forEach(duty => {
      const fieldName = dutyMap[duty];
      if (fieldName) {
        mapping[fieldName] = person.duties[duty];
      }
    });
  }
  
  // ============================================================
  // INVENTORY
  // ============================================================
  
  // Equipment
  if (formData.equipment && formData.equipment.length > 0) {
    formData.equipment.forEach((item, index) => {
      const suffix = index === 0 ? '' : `_${index + 1}`;
      mapping[`Make and Model${suffix}`] = item.makeModel;
      mapping[`Current value${suffix}`] = item.currentValue;
      mapping[`Owned or leased by firm or owner${suffix}`] = item.ownedOrLeased;
      mapping[`Used as collateral${suffix}`] = item.usedAsCollateral;
      mapping[`Where is item stored${suffix}`] = item.location;
    });
  }
  
  // Office Space
  if (formData.officeSpace && formData.officeSpace.length > 0) {
    const office = formData.officeSpace[0];
    mapping['Address Street and Number'] = office.address;
    mapping['City_4'] = office.city;
    mapping['State_4'] = office.state;
    mapping['Zip_4'] = office.zip;
    mapping['Owned or Leased by Firm or Owner'] = office.ownedOrLeased;
    mapping['Current Value of Property or Lease'] = office.value;
  }
  
  // Storage Space
  if (formData.storageSpace && formData.storageSpace.length > 0) {
    const storage = formData.storageSpace[0];
    mapping['Address Street and Number_2'] = storage.address;
    mapping['City_5'] = storage.city;
    mapping['State_5'] = storage.state;
    mapping['Zip_5'] = storage.zip;
    mapping['Owned or Leased by Firm or Owner_2'] = storage.ownedOrLeased;
    mapping['Current Value of Property or Lease_2'] = storage.value;
  }
  
  // ============================================================
  // FINANCIAL INFORMATION
  // ============================================================
  
  mapping['D Does your firm rely on any other firm for management functions or employee payroll'] = 
    formData.reliesOnOtherFirm ? 'Yes' : 'No';
  
  // Banking Information
  if (formData.bankAccounts && formData.bankAccounts.length > 0) {
    const bank = formData.bankAccounts[0];
    mapping['Name of bank'] = bank.bankName;
    mapping['City and State'] = `${bank.city}, ${bank.state}`;
    mapping['The following individuals are authorized to sign checks on this account'] = bank.authorizedSigners;
  }
  
  // Bonding
  mapping['Aggregate limit'] = formData.bondingAggregate;
  mapping['Project limit'] = formData.bondingProject;
  
  // Loans
  if (formData.loans && formData.loans.length > 0) {
    formData.loans.forEach((loan, index) => {
      const suffix = index === 0 ? '' : `_${index + 1}`;
      mapping[`Name of Source${suffix}`] = loan.sourceName;
      mapping[`Address of Source${suffix}`] = loan.sourceAddress;
      mapping[`Name of Person Guaranteeing the Loan${suffix}`] = loan.guarantor;
      mapping[`Original Amount${suffix}`] = loan.originalAmount;
      mapping[`Current Balance${suffix}`] = loan.currentBalance;
      mapping[`Purpose of Loan${suffix}`] = loan.purpose;
    });
  }
  
  // ============================================================
  // CONTRACTS
  // ============================================================
  
  // Completed Contracts
  if (formData.completedContracts && formData.completedContracts.length > 0) {
    formData.completedContracts.forEach((contract, index) => {
      const suffix = index === 0 ? '' : `_${index + 1}`;
      mapping[`Name of OwnerContractor${suffix}`] = contract.ownerContractor;
      mapping[`NameLocation of Project${suffix}`] = contract.projectNameLocation;
      mapping[`Type of Work Performed${suffix}`] = contract.workType;
      mapping[`Dollar Value of Contract${suffix}`] = contract.value;
    });
  }
  
  // Active Contracts
  if (formData.activeContracts && formData.activeContracts.length > 0) {
    formData.activeContracts.forEach((contract, index) => {
      const suffix = index === 0 ? '' : `_${index + 1}`;
      mapping[`Name of Prime Contractor and Project Number${suffix}`] = contract.primeContractor;
      mapping[`Location of Project${suffix}`] = contract.location;
      mapping[`Type of Work${suffix}`] = contract.workType;
      mapping[`Project Start Date${suffix}`] = contract.startDate;
      mapping[`Anticipated Completion Date${suffix}`] = contract.completionDate;
      mapping[`Dollar Value of Contract${suffix}`] = contract.value;
    });
  }
  
  // ============================================================
  // SECTION 5: ACDBE (if applicable)
  // ============================================================
  
  if (formData.certificationType === 'ACDBE' && formData.acdbeInfo) {
    mapping['A I am applying for ACDBE certification to check all that apply'] = 
      formData.acdbeInfo.operatesConcession ? 'Operate a concession at an airport' : '';
    
    mapping['Supply a good or service to an airport concessionaire'] = 
      formData.acdbeInfo.suppliesGoodsServices ? 'On' : '';
  }
  
  // ============================================================
  // DECLARATION & SIGNATURE
  // ============================================================
  
  if (formData.declaration) {
    mapping['I full name printed declare'] = formData.declaration.ownerName;
    mapping['under penalty of perjury that I am title of the'] = formData.declaration.ownerTitle;
    mapping['firm all of the foregoing'] = formData.declaration.firmName;
    
    // Group membership in declaration
    if (formData.declaration.disadvantagedGroups) {
      if (formData.declaration.disadvantagedGroups.includes('Women')) {
        mapping['Women'] = 'On';
      }
      if (formData.declaration.disadvantagedGroups.includes('Black American')) {
        mapping['Black American_2'] = 'On';
      }
      if (formData.declaration.disadvantagedGroups.includes('Hispanic American')) {
        mapping['Hispanic American_2'] = 'On';
      }
      if (formData.declaration.disadvantagedGroups.includes('Native American')) {
        mapping['Native American_2'] = 'On';
      }
      if (formData.declaration.disadvantagedGroups.includes('Asian-Pacific American')) {
        mapping['AsianPacific American_2'] = 'On';
      }
      if (formData.declaration.disadvantagedGroups.includes('Subcontinent Asian American')) {
        mapping['Subcontinent Asian American_2'] = 'On';
      }
    }
    
    mapping['EXECUTED ON'] = formData.declaration.signatureDate;
    mapping['SIGNATURE OWNER'] = formData.declaration.signature;
  }
  
  // Remove any null or undefined values
  return Object.fromEntries(
    Object.entries(mapping).filter(([_, value]) => value !== null && value !== undefined)
  );
}

/**
 * Helper function to format dates for PDF
 * @param {string} date - Date string
 * @returns {string} - Formatted date
 */
function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US');
}

/**
 * Helper function to format currency
 * @param {string|number} amount - Amount
 * @returns {string} - Formatted currency
 */
function formatCurrency(amount) {
  if (!amount) return '';
  return `$${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}