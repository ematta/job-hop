## Task: Implement "Resumes" Page with Upload Functionality in Next.js & Supabase

This task outlines the steps required to create a "Resumes" page within a Next.js application, allowing users to view and upload their resumes using Supabase storage. The page should display a list of resumes associated with the logged-in user, provide an upload button for new resumes, and handle empty states gracefully.

---

### 1. Page Overview: "Resumes" Page

*   **Purpose:** Display all resumes associated with the currently authenticated user.
*   **Components:**
    *   Resume List: A component to display a list of resume filenames (or thumbnails if possible).
    *   Upload Button: A button that triggers the resume upload process.
    *   Empty State Indicator:  A message displayed when no resumes are associated with the user.

---

### 2. Data Relationship & Storage Structure

*   **User-Resume Relationship:** The relationship between a user and their resumes is one-to-many (one user can have multiple resumes).
*   **Supabase Storage Bucket Naming Convention:**  Resumes should be stored in Supabase storage buckets named according to the following pattern: `resumes/{user_email}/resume.pdf` (or similar filename extension).
    *   Replace `{user_email}` with the user's email address (e.g., `tony@soprano.com`).  This ensures resumes are organized and accessible based on the associated user.

---

### 3. Resume Upload Functionality

*   **Objective:** Implement an upload button that allows users to upload new resume files to their designated Supabase storage bucket.
*   **Steps:**
    1.  **Upload Button Implementation:** Create a button within the "Resumes" page component.
    2.  **File Selection:** Upon clicking the button, allow the user to select a file from their local machine (resume document).
    3.  **Supabase Storage POST Request:** When a file is selected:
        *   Construct a `POST` request to Supabase storage using the appropriate API endpoint and authentication headers.
        *   The destination path for the upload should follow the bucket naming convention described above (`resumes/{user_email}/resume.pdf`).
        *   Include the selected resume file as part of the request body.
    4.  **Success/Error Handling:** Display appropriate success or error messages to the user based on the outcome of the upload operation.

---

### 4. Empty State Handling

*   **Objective:** Provide a clear indication when a user has no resumes associated with their account.
*   **Implementation:** If the list of resumes is empty (no files found in the corresponding Supabase storage bucket), display a message such as "No resumes found." or "You haven't uploaded any resumes yet."

---

### 5. Expected Behavior Summary

*   The "Resumes" page displays a list of all resume filenames associated with the logged-in user.
*   An upload button allows users to upload new resume files to their designated Supabase storage bucket, following the `resumes/{user_email}/resume.pdf` naming convention.
*   If no resumes are found for the user, an "empty" message is displayed.

---
