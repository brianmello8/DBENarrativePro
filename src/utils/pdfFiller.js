// src/utils/pdfFiller.js
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { mapFormDataToPdfFields } from './fieldMapping';

/**
 * Fills the DBE/ACDBE PDF with form data
 * @param {Object} formData - The form data from UCAFormFiller
 * @returns {Promise<void>} - Downloads the filled PDF
 */
export async function fillAndDownloadPDF(formData) {
  try {
    // 1. Load the blank PDF from public folder
    const pdfUrl = '/pdfs/DBE_Uniform_Certification_Application_Final.pdf';
    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
    
    // 2. Load the PDF document
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    
    // 3. Get the form
    const form = pdfDoc.getForm();
    
    // 4. Map form data to PDF fields
    const fieldMappings = mapFormDataToPdfFields(formData);
    
    // 5. Fill in the fields
    let filledCount = 0;
    let errorCount = 0;
    const errors = [];
    
    for (const [pdfFieldName, value] of Object.entries(fieldMappings)) {
      try {
        // Skip if no value
        if (value === '' || value === null || value === undefined) {
          continue;
        }
        
        // Get the field
        const field = form.getField(pdfFieldName);
        
        // Determine field type and fill accordingly
        const fieldType = field.constructor.name;
        
        if (fieldType === 'PDFTextField') {
          field.setText(String(value));
          filledCount++;
        } else if (fieldType === 'PDFCheckBox') {
          if (value === true || value === 'true' || value === 'Yes') {
            field.check();
            filledCount++;
          } else {
            field.uncheck();
          }
        } else if (fieldType === 'PDFRadioGroup') {
          field.select(String(value));
          filledCount++;
        }
        
      } catch (error) {
        errorCount++;
        errors.push({
          field: pdfFieldName,
          value: value,
          error: error.message
        });
        console.warn(`Could not fill field "${pdfFieldName}":`, error.message);
      }
    }
    
    console.log(`✓ Successfully filled ${filledCount} fields`);
    if (errorCount > 0) {
      console.warn(`⚠ ${errorCount} fields had errors:`, errors);
    }
    
    // 6. Save the PDF
    const pdfBytes = await pdfDoc.save();
    
    // 7. Create filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const firmName = formData.legalFirmName || 'Application';
    const filename = `DBE_Application_${firmName.replace(/[^a-z0-9]/gi, '_')}_${timestamp}.pdf`;
    
    // 8. Download the filled PDF
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, filename);
    
    return {
      success: true,
      filledCount,
      errorCount,
      errors,
      filename
    };
    
  } catch (error) {
    console.error('Error filling PDF:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Preview the PDF with filled data (optional feature)
 * @param {Object} formData - The form data
 * @returns {Promise<string>} - Data URL of the PDF
 */
export async function getFilledPdfDataUrl(formData) {
  try {
    const pdfUrl = '/pdfs/DBE_Uniform_Certification_Application_Final.pdf';
    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();
    const fieldMappings = mapFormDataToPdfFields(formData);
    
    // Fill fields
    for (const [pdfFieldName, value] of Object.entries(fieldMappings)) {
      if (value === '' || value === null || value === undefined) continue;
      
      try {
        const field = form.getField(pdfFieldName);
        const fieldType = field.constructor.name;
        
        if (fieldType === 'PDFTextField') {
          field.setText(String(value));
        } else if (fieldType === 'PDFCheckBox') {
          if (value === true || value === 'true' || value === 'Yes') {
            field.check();
          }
        } else if (fieldType === 'PDFRadioGroup') {
          field.select(String(value));
        }
      } catch (error) {
        // Skip errors in preview
      }
    }
    
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
    
  } catch (error) {
    console.error('Error creating PDF preview:', error);
    throw error;
  }
}

/**
 * Get list of all available PDF fields (for debugging)
 * @returns {Promise<Array>} - Array of field names
 */
export async function getPdfFields() {
  try {
    const pdfUrl = '/pdfs/DBE_Uniform_Certification_Application_Final.pdf';
    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    
    return fields.map(field => ({
      name: field.getName(),
      type: field.constructor.name
    }));
  } catch (error) {
    console.error('Error getting PDF fields:', error);
    return [];
  }
}