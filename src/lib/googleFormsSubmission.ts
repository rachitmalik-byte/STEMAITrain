/**
 * Google Forms Submission Utility
 * 
 * This module provides a clean interface for submitting data to Google Forms.
 * It handles the FormData construction and fetch request with proper error handling.
 */

export interface GoogleFormConfig {
  formId: string; // The form ID from your Google Form URL
  entries: Record<string, string>; // { entryId: value, ... }
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Submit data to a Google Form
 * @param config - Configuration object with form ID and entry mappings
 * @returns Promise<SubmissionResult>
 */
export async function submitToGoogleForm(config: GoogleFormConfig): Promise<SubmissionResult> {
  try {
    const formData = new FormData();

    // Add each entry to the FormData
    Object.entries(config.entries).forEach(([entryId, value]) => {
      formData.append(entryId, value);
    });

    // Construct the form response URL
    const formResponseURL = `https://docs.google.com/forms/d/e/${config.formId}/formResponse`;

    // Submit the form with no-cors mode
    // This prevents CORS errors but means we won't get response details
    const response = await fetch(formResponseURL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });

    // With no-cors mode, the response is always opaque but the submission still goes through
    return {
      success: true,
      message: 'Form submitted successfully to Google Forms'
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Google Forms submission error:', errorMessage);

    return {
      success: false,
      message: 'Failed to submit form to Google Forms',
      error: errorMessage
    };
  }
}

/**
 * Pre-configured submission functions for your forms
 */

// COMPANY/ENTERPRISE FORM
// Form ID: 1FAIpQLSfC3GuziOcTUB6uUu7zEARHwdA3OwASh5OYlAs1IkfpNpHnYw
export async function submitCompanyForm(data: {
  fullName: string;
  company: string;
  workEmail: string;
  requirementArea: string;
  projectDetails: string;
}): Promise<SubmissionResult> {
  return submitToGoogleForm({
    formId: '1FAIpQLSfC3GuziOcTUB6uUu7zEARHwdA3OwASh5OYlAs1IkfpNpHnYw',
    entries: {
      'entry.157807120': data.fullName,      // Full Name
      'entry.800572658': data.company,        // Company
      'entry.1030955062': data.workEmail,     // Work Email
      'entry.483721231': data.requirementArea, // Requirement Area
      'entry.1500569326': data.projectDetails  // Project Details
    }
  });
}

// INDIVIDUAL/EXPERT FORM
// Form ID: 1FAIpQLSclZmHLsA3uruaT5fQV3yNjtQcMTVVBfvNPlmtxWc_IxIYYSQ
export async function submitExpertForm(data: {
  fullName: string;
  email: string;
  areaOfExpertise: string;
  highestQualification: string;
  toolsMastered: string;
  portfolioUrl: string;
  backgroundIntroduction: string;
}): Promise<SubmissionResult> {
  return submitToGoogleForm({
    formId: '1FAIpQLSclZmHLsA3uruaT5fQV3yNjtQcMTVVBfvNPlmtxWc_IxIYYSQ',
    entries: {
      'entry.1132860551': data.fullName,                   // Full Name
      'entry.1099594640': data.email,                      // Email
      'entry.1740919847': data.areaOfExpertise,            // Area of Expertise
      'entry.297797108': data.highestQualification,        // Highest Qualification
      'entry.117201284': data.toolsMastered,               // Tools Mastered
      'entry.603129646': data.portfolioUrl,                // Portfolio / LinkedIn
      'entry.1158572007': data.backgroundIntroduction      // Background Introduction
    }
  });
}

/**
 * How to extract entry IDs from your Google Form:
 * 
 * 1. Open your Google Form in edit mode
 * 2. Right-click on a field and select "Inspect" (or press F12)
 * 3. Look for the "data-params" attribute or find <input> tags with name attributes like "entry.123456789"
 * 4. The number after "entry." is the entry ID
 * 
 * Alternative method (easier):
 * 1. Open the form's form response URL (from "Get prefilled link")
 * 2. The URL query parameters will show all entry IDs
 * 3. Example: ?entry.157807120=&entry.800572658=&etc
 * 
 * Testing without code:
 * You can test your form by constructing a URL like:
 * https://docs.google.com/forms/d/e/{formId}/formResponse?entry.123456789=value&entry.987654321=value2
 */
