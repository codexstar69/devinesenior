import React from "react";
import { Helmet } from "react-helmet";
import { COMPANY_NAME } from "@/lib/constants";

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
}

const Seo: React.FC<SeoProps> = ({
  title = `${COMPANY_NAME} | Premium Care For Your Loved Ones`,
  description = `${COMPANY_NAME} offers compassionate senior care services including assisted living, memory care, and rehabilitation in a luxury environment.`,
  canonical = "",
  ogType = "website",
  ogImage = "https://images.unsplash.com/photo-1573496546038-82f9c39f6365?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
}) => {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      <html lang="en" />
    </Helmet>
  );
};

export default Seo;
