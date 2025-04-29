## Task: Implement "Jobs" Screen with Job Listing, Editing, Deletion, and Resume Attachment in Next.js & Supabase

This task outlines the steps required to create a "Jobs" screen within a Next.js application. The screen will display a list of jobs that the user has applied for, presented as cards.  It will also provide functionality for editing existing job entries, deleting them, adding new jobs via a modal, and attaching resumes from a pre-existing list. All data interactions will be handled using the Supabase client within the Next.js application.

---

### 1. Route & Screen Title

*   **Route:** The screen should be accessible at the route `/jobs`.
*   **Screen Title:**  The page title displayed to the user should be "Jobs List".

---

### 2. Job Card Display

*   **Presentation:** Jobs should be displayed as cards on the screen.
*   **Card Content:** Each card should display the following information:
    *   Company Name
    *   Job Title

---

### 3. Action Buttons per Job Card

*   **Deletion (X Button):**  Each job card should include an "X" button that, when clicked, deletes the corresponding job entry from the database.
*   **Edit Button:** Each job card should include an edit button that, when clicked, opens a modal or redirects to an editing page allowing the user to modify the job details (company name, job title, URL).

---

### 4. Add New Job Functionality

*   **Plus (+) Button:**  Next to the "Jobs List" title, there should be a plus (+) button that triggers the appearance of a modal window.
*   **Modal Content:** The modal should prompt the user for the following information:
    *   Name of Company (text input)
    *   Job Title (text input)
    *   URL (text input)
*   **Submission:** Upon submission, the new job entry should be added to the database and displayed on the "Jobs" screen.

---

### 5. Resume Selection & Attachment

*   **Existing Resumes List:** A list of resumes that have already been uploaded by the user should be displayed (presumably retrieved from Supabase).
*   **Selectable Resume:**  For each job entry, a selectable option (e.g., dropdown menu or radio buttons) should allow the user to choose which resume is attached to that specific job.

---

### 6. Database Interaction

*   **Supabase Client:** All read and write operations related to jobs and resumes should be performed using the Supabase client within the Next.js application. This includes:
    *   Retrieving a list of all jobs for the current user.
    *   Creating new job entries.
    *   Updating existing job entries.
    *   Deleting job entries.
    *   Retrieving a list of uploaded resumes.

---
