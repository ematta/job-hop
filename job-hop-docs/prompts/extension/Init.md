Build the development process and necessary features to transform a basic Chrome extension popup into a job submission tool connected to a Supabase backend and a companion web app (`job-hop-web`).

**Chrome Extension Popup Flow:**

1.  **Open Popup:** User clicks the extension icon.
2.  **Check Authentication:** The extension popup attempts to authenticate the user using Supabase by checking cookies and local storage shared with `job-hop-web`.
3.  **Display Content:**
    * **If Authenticated:** Load and display the job submission form (based on the `job-hop-web` form).
    * **If Not Authenticated:** Create a login prompt to go through the login process in the extension popup.
4.  **User Interaction:** User fills out the job form.
5.  **Form Submission:** User submits the form. The extension sends the data to the backend using a method analogous to `job-hop-web`.
6.  **Handle Response:**
    * If submission is successful, show a "Success!" message in the popup.
    * If submission fails, show an "Error!" message.

**Technical Considerations:**

* Accessing and utilizing shared browser storage (cookies, local storage) from the extension context.
* Integrating Supabase authentication client-side within the extension.
* Implementing the form UI and validation (potentially reusing logic from `job-hop-web`).
* Handling asynchronous API calls for form submission.
* Managing UI state (showing form, success message, error message).