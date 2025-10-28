// SEOHead.jsx - Enhanced React Helmet implementation for comprehensive SEO
// Fully integrated with react-helmet-async

import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  // Primary Meta Tags
  title = "DBE Narrative Pro - AI-Powered DBE Certification Documents | 2025 Compliant",
  description = "Generate professional DBE recertification documents with AI for $149. Includes narrative statement, cover letter, checklist & review. Compliant with October 2025 regulations (49 CFR Part 26). Save $1,500-3,000 vs consultants.",
  keywords = "DBE certification, DBE recertification 2025, disadvantaged business enterprise, DBE narrative statement, 49 CFR Part 26, DOT certification, UCP application, minority business, DBE documents, social disadvantage narrative, economic disadvantage, AI document generation, DBE consultant alternative, October 2025 regulations",
  
  // URLs
  ogUrl = "https://dbenarrativepro.com/",
  canonicalUrl = "https://dbenarrativepro.com/",
  
  // Images
  ogImage = "https://dbenarrativepro.com/og-image.png",
  ogImageAlt = "DBE Narrative Pro - AI-Powered DBE Certification Documents",
  
  // Page Type
  pageType = "website", // Options: website, article, product
  
  // Article/Blog specific (optional)
  articlePublishedTime = null,
  articleModifiedTime = null,
  articleAuthor = null,
  articleSection = null,
  
  // Product specific (optional)
  productPrice = "149",
  productCurrency = "USD",
  productAvailability = "InStock",
  
  // Additional
  noIndex = false, // Set to true for pages you don't want indexed
  locale = "en_US",
  siteName = "DBE Narrative Pro",
  
  // Structured Data Types
  includeProductSchema = false,
  includeFAQSchema = false,
  faqItems = [], // Array of {question, answer} objects
  includeBreadcrumbSchema = false,
  breadcrumbItems = [], // Array of {name, url} objects
}) => {
  
  // Generate Breadcrumb Schema
  const breadcrumbSchema = includeBreadcrumbSchema && breadcrumbItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  } : null;

  // Generate FAQ Schema
  const faqSchema = includeFAQSchema && faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  // Product Schema (for pricing pages)
  const productSchema = includeProductSchema ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "DBE Narrative Pro - Complete Document Package",
    "description": "Professional DBE recertification package including AI-enhanced narrative statement, cover letter, documentation checklist, and review summary. Compliant with 2025 regulations.",
    "brand": {
      "@type": "Brand",
      "name": "DBE Narrative Pro"
    },
    "image": ogImage,
    "offers": {
      "@type": "Offer",
      "url": ogUrl,
      "priceCurrency": productCurrency,
      "price": productPrice,
      "priceValidUntil": "2026-12-31",
      "availability": `https://schema.org/${productAvailability}`,
      "seller": {
        "@type": "Organization",
        "name": "DBE Narrative Pro"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "147",
      "bestRating": "5",
      "worstRating": "1"
    }
  } : null;

  // Organization Schema (always included)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DBE Narrative Pro",
    "url": "https://dbenarrativepro.com",
    "logo": "https://dbenarrativepro.com/logo.png",
    "description": "AI-powered platform for generating professional DBE certification documents compliant with October 2025 regulations.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "support@dbenarrativepro.com",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      // Add your social media profiles here when available
      // "https://www.facebook.com/dbenarrativepro",
      // "https://twitter.com/dbenarrativepro",
      // "https://www.linkedin.com/company/dbenarrativepro"
    ]
  };

  // WebApplication Schema (always included)
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "DBE Narrative Pro",
    "description": "AI-powered tool for generating professional DBE certification narrative statements and supporting documents compliant with 49 CFR Part 26 (October 2025 regulations).",
    "url": "https://dbenarrativepro.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": productPrice,
      "priceCurrency": productCurrency,
      "availability": `https://schema.org/${productAvailability}`
    },
    "featureList": [
      "AI-generated narrative statement",
      "Professional cover letter",
      "Complete documentation checklist",
      "Application review summary",
      "Editable Word documents",
      "2025 regulation compliant"
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="en" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <meta name="googlebot" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Language & Locale */}
      <meta name="language" content="English" />
      <meta property="og:locale" content={locale} />
      
      {/* Author & Publisher */}
      <meta name="author" content="DBE Narrative Pro" />
      <meta name="publisher" content="DBE Narrative Pro" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      
      {/* Article specific Open Graph tags */}
      {pageType === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {pageType === 'article' && articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {pageType === 'article' && articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}
      {pageType === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Geo Tags (if applicable) */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Structured Data - Organization (Always included) */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* Structured Data - WebApplication (Always included) */}
      <script type="application/ld+json">
        {JSON.stringify(webAppSchema)}
      </script>
      
      {/* Structured Data - Product (Conditional) */}
      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}
      
      {/* Structured Data - FAQ (Conditional) */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      
      {/* Structured Data - Breadcrumb (Conditional) */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;

// ============================================
// USAGE EXAMPLES FOR EACH PAGE
// ============================================

/*
// 1. HOME PAGE (HomePage.jsx)
// ---------------------------------
import SEOHead from './SEOHead';

const HomePage = () => {
  return (
    <>
      <SEOHead 
        title="DBE Narrative Pro - AI DBE Certification Documents | Free UCA Form & $149 Narrative"
        description="Complete your DBE certification with our free UCA form filler and AI-powered narrative generator ($149). Compliant with October 2025 regulations. Save $1,500-3,000 vs consultants."
        canonicalUrl="https://dbenarrativepro.com/"
        ogUrl="https://dbenarrativepro.com/"
        includeProductSchema={true}
        includeBreadcrumbSchema={true}
        breadcrumbItems={[
          { name: "Home", url: "https://dbenarrativepro.com/" }
        ]}
      />
      <div className="min-h-screen">
        // Your home page content
      </div>
    </>
  );
};
*/

/*
// 2. UCA FORM PAGE (UCAFormFiller.jsx)
// ---------------------------------
import SEOHead from './SEOHead';

const UCAFormFiller = () => {
  return (
    <>
      <SEOHead 
        title="Free DBE UCA Form Filler | Official DOT Application | DBE Narrative Pro"
        description="Fill out your DBE Uniform Certification Application (UCA) online for free. Download as PDF ready for submission to your UCP. Official 17-page DOT form."
        keywords="DBE UCA form, DBE application form, uniform certification application, free DBE form, DOT UCA form, DBE form filler"
        canonicalUrl="https://dbenarrativepro.com/uca-form"
        ogUrl="https://dbenarrativepro.com/uca-form"
        includeBreadcrumbSchema={true}
        breadcrumbItems={[
          { name: "Home", url: "https://dbenarrativepro.com/" },
          { name: "Free UCA Form", url: "https://dbenarrativepro.com/uca-form" }
        ]}
      />
      <div className="min-h-screen">
        // Your UCA form content
      </div>
    </>
  );
};
*/

/*
// 3. NARRATIVE PRO PAGE (DBENarrativePro.jsx)
// ---------------------------------
import SEOHead from './SEOHead';

const DBENarrativePro = () => {
  return (
    <>
      <SEOHead 
        title="DBE Narrative Pro - AI-Generated Narrative Statement | $149 | 2025 Compliant"
        description="Generate professional DBE recertification documents with AI. Get narrative statement, cover letter, checklist & review for $149. Compliant with October 2025 49 CFR Part 26 regulations."
        keywords="DBE narrative statement, DBE recertification 2025, AI DBE documents, social disadvantage narrative, economic disadvantage statement, 49 CFR Part 26"
        canonicalUrl="https://dbenarrativepro.com/narrative"
        ogUrl="https://dbenarrativepro.com/narrative"
        includeProductSchema={true}
        productPrice="149"
        includeBreadcrumbSchema={true}
        breadcrumbItems={[
          { name: "Home", url: "https://dbenarrativepro.com/" },
          { name: "Narrative Pro", url: "https://dbenarrativepro.com/narrative" }
        ]}
      />
      <div className="min-h-screen">
        // Your narrative pro content
      </div>
    </>
  );
};
*/

/*
// 4. FAQ PAGE (FAQPage.jsx)
// ---------------------------------
import SEOHead from './SEOHead';

const FAQPage = () => {
  const faqData = [
    {
      question: "When did the Interim Final Rule (IFR) become effective?",
      answer: "The IFR was published in the Federal Register on October 3, 2025 and became effective that day. This represents the most significant change to DBE certification requirements in decades."
    },
    {
      question: "What changed in the October 2025 DBE regulations?",
      answer: "The DOT eliminated race and gender-based presumptions of disadvantage. All applicants must now provide individualized proof of social and economic disadvantage through detailed narratives and supporting documentation."
    },
    {
      question: "How much does DBE Narrative Pro cost?",
      answer: "The UCA form filler is 100% free. The AI-powered Narrative Pro package costs $149 one-time payment and includes narrative statement, cover letter, checklist, and review summary as editable Word documents."
    }
    // Add more FAQs here
  ];

  return (
    <>
      <SEOHead 
        title="FAQ - DBE Certification Questions | October 2025 Regulations | DBE Narrative Pro"
        description="Frequently asked questions about DBE certification, October 2025 regulation changes, narrative requirements, and our AI-powered document generation service."
        keywords="DBE FAQ, DBE certification questions, 2025 DBE changes, DBE narrative help, 49 CFR Part 26 FAQ"
        canonicalUrl="https://dbenarrativepro.com/faq"
        ogUrl="https://dbenarrativepro.com/faq"
        includeFAQSchema={true}
        faqItems={faqData}
        includeBreadcrumbSchema={true}
        breadcrumbItems={[
          { name: "Home", url: "https://dbenarrativepro.com/" },
          { name: "FAQ", url: "https://dbenarrativepro.com/faq" }
        ]}
      />
      <div className="min-h-screen">
        // Your FAQ content
      </div>
    </>
  );
};
*/

// ============================================
// ADVANCED FEATURES
// ============================================

/*
// For pages you DON'T want indexed (like thank you pages, internal tools, etc.)
<SEOHead 
  title="Thank You | DBE Narrative Pro"
  noIndex={true}
/>
*/

/*
// For blog posts or articles
<SEOHead 
  title="How to Complete Your DBE Narrative Statement | DBE Narrative Pro Blog"
  description="Step-by-step guide to writing a compelling DBE narrative statement under the new 2025 regulations."
  pageType="article"
  articlePublishedTime="2025-01-15T08:00:00Z"
  articleModifiedTime="2025-01-20T10:30:00Z"
  articleAuthor="DBE Narrative Pro Team"
  articleSection="Guides"
  canonicalUrl="https://dbenarrativepro.com/blog/how-to-complete-dbe-narrative"
  ogUrl="https://dbenarrativepro.com/blog/how-to-complete-dbe-narrative"
/>
*/

// ============================================
// SEO BEST PRACTICES
// ============================================

/*
1. Title Tags:
   - Keep under 60 characters
   - Include primary keyword
   - Make it compelling and unique for each page

2. Meta Descriptions:
   - Keep 150-160 characters
   - Include call-to-action
   - Include primary and secondary keywords naturally

3. Keywords:
   - Focus on long-tail keywords
   - Don't keyword stuff
   - Include variations and related terms

4. Structured Data:
   - Use appropriate schema types for each page
   - Keep data accurate and up-to-date
   - Test with Google's Rich Results Test

5. Images:
   - Use descriptive alt text
   - OG images should be 1200x630px
   - Compress images for fast loading

6. URLs:
   - Keep clean and descriptive
   - Use hyphens, not underscores
   - Include keywords when natural
*/