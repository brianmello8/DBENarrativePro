// SEOHead.jsx - React Helmet implementation for dynamic SEO meta tags
// Install: npm install react-helmet-async

import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = "DBE Narrative Pro - AI-Powered DBE Certification Documents",
  description = "DBE Recertification Support. AI-generated narrative & support documents to help you get recertified.",
  keywords = "DBE certification, DBE certification support, disadvantaged business enterprise, DBE recertification, DBE Changes, DBE Program Changes, DBE Narrative Guidance, UCP application, DOT certification, minority business certification, DBE documents, 49 CFR Part 26, social disadvantage narrative, economic disadvantage statement",
  ogImage = "https://dbenarrativepro.com/og-image.png",
  ogUrl = "https://dbenarrativepro.com/",
  canonicalUrl = "https://dbenarrativepro.com/"
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="DBE Narrative Pro" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Structured Data - WebApplication */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "DBE Narrative Pro",
          "description": "AI-powered tool for generating professional DBE certification narrative statements and supporting documents.",
          "url": "https://dbenarrativepro.com",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "149",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127"
          }
        })}
      </script>
      
      {/* Structured Data - Product */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "DBE Certification Document Package",
          "description": "Complete DBE recertification application package including AI-enhanced narrative statement, cover letter, documentation checklist, and review summary.",
          "brand": {
            "@type": "Brand",
            "name": "DBE Narrative Pro"
          },
          "offers": {
            "@type": "Offer",
            "url": "https://dbenarrativepro.com",
            "priceCurrency": "USD",
            "price": "149",
            "priceValidUntil": "2026-12-31",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127",
            "bestRating": "5",
            "worstRating": "1"
          }
        })}
      </script>
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "DBE Narrative Pro",
          "url": "https://dbenarrativepro.com",
          "logo": "https://dbenarrativepro.com/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "email": "support@dbenarrativepro.com",
            "availableLanguage": ["English"]
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;

// ============================================
// USAGE IN YOUR APP
// ============================================

// 1. Install react-helmet-async
// npm install react-helmet-async

// 2. Wrap your app with HelmetProvider in your main App.js or index.js:
/*
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <YourAppComponents />
    </HelmetProvider>
  );
}
*/

// 3. Use the SEOHead component in your DBENarrativePro component:
/*
import SEOHead from './SEOHead';

const DBENarrativePro = () => {
  return (
    <>
      <SEOHead />
      <div className="min-h-screen...">
        // Your existing component code
      </div>
    </>
  );
};
*/

// 4. For dynamic pages, pass custom props:
/*
<SEOHead 
  title="Step 2: Business Profile | DBE Narrative Pro"
  description="Enter your business information for DBE certification"
  canonicalUrl="https://dbenarrativepro.com/business-profile"
/>
*/


















