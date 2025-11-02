import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FileText, CheckCircle, Home, AlertCircle, Lock } from 'lucide-react';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { Helmet } from 'react-helmet-async';
import Navigation from '../Navigation';

const DownloadPage = () => {
  const navigate = useNavigate();
  const [isPaid, setIsPaid] = useState(false);
  const [generatedDocs, setGeneratedDocs] = useState(null);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    // Load payment status
    const savedPaymentStatus = localStorage.getItem('dbeNarrativePaid');
    setIsPaid(savedPaymentStatus === 'true');
    
    // Load generated documents
    const savedDocs = localStorage.getItem('dbeNarrativeGeneratedDocs');
    if (savedDocs) {
      try {
        setGeneratedDocs(JSON.parse(savedDocs));
      } catch (error) {
        console.error('Error loading documents:', error);
      }
    }
  }, []);

  // Track downloads with GA4
  const trackDownload = (documentType) => {
    if (window.gtag) {
      window.gtag('event', 'file_download', {
        file_type: documentType,
        file_format: 'docx'
      });
    }
  };

  // FIXED: Separate function for actual document creation
  const createAndDownloadDoc = async (type) => {
    let content, filename;

    switch(type) {
      case 'cover':
        content = generatedDocs.cover;
        filename = 'DBE_Cover_Letter.docx';
        break;
      case 'narrative':
        content = generatedDocs.narrative;
        filename = 'DBE_Personal_Narrative.docx';
        break;
      case 'checklist':
        content = generatedDocs.checklist;
        filename = 'DBE_Evidence_Checklist.docx';
        break;
      case 'review':
        content = generatedDocs.review;
        filename = 'DBE_Review_Summary.docx';
        break;
      default:
        throw new Error('Unknown document type');
    }

    // Parse content into paragraphs
    const paragraphs = content.split('\n').map(line => {
      const trimmedLine = line.trim();
      
      // Headers
      if (trimmedLine.startsWith('# ')) {
        return new Paragraph({
          text: trimmedLine.substring(2),
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        });
      }
      if (trimmedLine.startsWith('## ')) {
        return new Paragraph({
          text: trimmedLine.substring(3),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 }
        });
      }
      
      // Bold text
      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        return new Paragraph({
          children: [
            new TextRun({
              text: trimmedLine.slice(2, -2),
              bold: true
            })
          ],
          spacing: { before: 200, after: 100 }
        });
      }
      
      // Regular paragraph
      return new Paragraph({
        text: trimmedLine,
        spacing: { before: 120, after: 120 }
      });
    });

    const doc = new Document({
      sections: [{
        properties: {},
        children: paragraphs
      }]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, filename);
    trackDownload(type);
    
    console.log(`✅ Downloaded ${filename}`);
  };

  const downloadDocument = async (type) => {
    if (!isPaid || !generatedDocs) {
      alert('Please complete payment to download documents.');
      return;
    }

    setDownloading(type);
    
    try {
      await createAndDownloadDoc(type);
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  // FIXED: Download all documents sequentially without state conflicts
  const downloadAllDocuments = async () => {
    if (!isPaid || !generatedDocs) {
      alert('Please complete payment to download documents.');
      return;
    }
    
    setDownloading('all');
    const types = ['cover', 'narrative', 'checklist', 'review'];
    
    try {
      for (const type of types) {
        await createAndDownloadDoc(type);
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      console.log('✅ All documents downloaded successfully');
    } catch (error) {
      console.error('Error downloading all documents:', error);
      alert('Some documents failed to download. Please try downloading them individually.');
    } finally {
      setDownloading(null);
    }
  };

  if (!generatedDocs) {
    return (
      <>
        <Helmet>
          <title>Download Documents - DBE Narrative Pro</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
          <Navigation />
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center border-2 border-gray-200">
              <AlertCircle className="mx-auto mb-6 text-amber-500" size={64} />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                No Documents Found
              </h1>
              <p className="text-gray-600 mb-8">
                You need to generate your DBE documents first before accessing this page.
              </p>
              <button
                onClick={() => navigate('/dbe-narrative-pro')}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl inline-flex items-center gap-3 transition-all transform hover:scale-105 shadow-xl"
              >
                <Home size={24} />
                Go to Form
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!isPaid) {
    return (
      <>
        <Helmet>
          <title>Complete Purchase - DBE Narrative Pro</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
          <Navigation />
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center border-2 border-gray-200">
              <Lock className="mx-auto mb-6 text-blue-500" size={64} />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Complete Your Purchase
              </h1>
              <p className="text-gray-600 mb-8">
                Your documents have been generated and are ready to download. 
                Please complete your payment to unlock access.
              </p>
              <button
                onClick={() => navigate('/dbe-narrative-pro')}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl inline-flex items-center gap-3 transition-all transform hover:scale-105 shadow-xl"
              >
                Return to Form
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Download Your Documents - DBE Narrative Pro</title>
        <meta name="description" content="Download your AI-generated DBE certification documents" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <Navigation />
        
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 mb-8 text-white text-center">
            <CheckCircle className="mx-auto mb-4" size={64} />
            <h1 className="text-4xl font-bold mb-2">
              🎉 Your Documents Are Ready!
            </h1>
            <p className="text-xl text-green-50">
              All four professional DBE documents have been generated and are ready to download
            </p>
          </div>

          {/* Download All Button */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 text-center border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Quick Download
            </h2>
            <p className="text-gray-600 mb-6">
              Get all four documents at once with a single click
            </p>
            <button
              onClick={downloadAllDocuments}
              disabled={downloading === 'all'}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-xl inline-flex items-center gap-3 transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {downloading === 'all' ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent" />
                  Downloading All Documents...
                </>
              ) : (
                <>
                  <Download size={24} />
                  Download All Documents
                </>
              )}
            </button>
          </div>

          {/* Individual Download Cards */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Or Download Individual Documents
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Cover Letter */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <FileText className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Cover Letter
                    </h3>
                    <p className="text-sm text-gray-600">
                      Professional submission letter for your UCP
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => downloadDocument('cover')}
                  disabled={downloading === 'cover'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {downloading === 'cover' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={18} />
                      Download
                    </>
                  )}
                </button>
              </div>

              {/* Personal Narrative */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-300 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-indigo-500 p-3 rounded-lg">
                    <FileText className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Personal Narrative
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your complete disadvantage statement (2025 compliant)
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => downloadDocument('narrative')}
                  disabled={downloading === 'narrative'}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {downloading === 'narrative' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={18} />
                      Download
                    </>
                  )}
                </button>
              </div>

              {/* Evidence Checklist */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-purple-500 p-3 rounded-lg">
                    <FileText className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Evidence Checklist
                    </h3>
                    <p className="text-sm text-gray-600">
                      Required supporting documents list
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => downloadDocument('checklist')}
                  disabled={downloading === 'checklist'}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {downloading === 'checklist' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={18} />
                      Download
                    </>
                  )}
                </button>
              </div>

              {/* Review Summary */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-300 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-pink-500 p-3 rounded-lg">
                    <FileText className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Review Summary
                    </h3>
                    <p className="text-sm text-gray-600">
                      Final submission checklist and tips
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => downloadDocument('review')}
                  disabled={downloading === 'review'}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {downloading === 'review' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={18} />
                      Download
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
              <AlertCircle size={24} />
              Important Notes
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>All documents are fully editable - you can make any changes you need</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>Save these documents to a secure location</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>Review each document carefully before submission</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>You can return to this page anytime using your browser history</span>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl inline-flex items-center gap-2 transition-all"
            >
              <Home size={20} />
              Return to Home
            </button>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 mt-12">
            <p>© 2025 DBE Narrative Pro • AI-Enhanced DBE Certification Documents</p>
            <p className="mt-1 text-xs">Compliant with 49 CFR Part 26 (Interim Final Rule - October 2025)</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadPage;