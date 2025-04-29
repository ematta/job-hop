## Task: Implement Dynamic Navigation Menu on Profile Picture Click

This task outlines the steps required to create a dynamic navigation menu within a web application. The menu will appear when the user clicks on the profile picture icon located in the top right-hand corner of the page.  The menu's content and visibility will be dynamically adjusted based on whether the user is currently logged in or not.

---

### 1. Trigger Event: Profile Picture Click

*   **Action:** When a user clicks on the profile picture icon (located in the top right-hand corner of the page), a navigation menu should appear.
*   **Implementation Note:**  The specific method for detecting this click event will depend on the framework being used, which in this case is React/Next.js.

---

### 2. Navigation Menu Content

*   **Links to Include:** The navigation menu should contain the following four links:
    1.  Login (or Logout): This link's text and functionality will change based on the user’s login status.
    2.  Resumes (/resumes)
    3.  Jobs (/jobs)
    4.  Profile Page (/profile)

---

### 3. Conditional Visibility - Logged-In State

*   **When User is Logged In:**
    *   Login Link: Should display as "Logout" and redirect the user to a logout endpoint (implementation details not specified in this prompt).
    *   Resume Link: Should be visible and functional, linking to the resume page.
    *   Jobs Link: Should be visible and functional, linking to the jobs page.
    *   Profile Page Link: Should be visible and functional, linking to the profile page.

---

### 4. Conditional Visibility - Logged-Out State

*   **When User is Not Logged In:**
    *   Login Link: Should display as "Login" and redirect the user to a login page (implementation details not specified in this prompt).
    *   Resume Link: Should be hidden from view.
    *   Jobs Link: Should be hidden from view.
    *   Profile Page Link: Should be hidden from view.

---

### 5. Important Note: Missing Pages

*   **Job and Profile Pages:** The "Jobs" and "Profile Page" links are not yet implemented in this prompt. However, the navigation menu should still function correctly by displaying these links (and making them functional) when the user is logged in, even though they currently lead to non-existent pages.  The functionality of these pages will be addressed in a separate task.

---