## Task: Implement User Authentication with Next.js & Supabase

This task outlines the steps required to create a secure login flow within a Next.js application, leveraging Supabase authentication features. The goal is to provide users with a seamless and persistent login experience.

---

### 1. Project Setup (Assumed)

*   You are working on a Next.js application already configured with Supabase integration.  Ensure your `.env` file contains the necessary Supabase project URL and API key.

---

### 2. Login Flow Implementation

*   **Objective:** Create a login flow that utilizes Supabase's built-in authentication methods (e.g., email/password).
*   **Steps:**
    1.  **Create a Login Form Component:** Design and implement a form component within your Next.js application to collect user credentials (email, password).
    2.  **Integrate Supabase Authentication:** Utilize the `@supabase/ssr` (research here: https://supabase.com/docs/guides/auth/server-side/nextjs) package to handle authentication requests. Implement the following:
        *   `signInWithEmailAndPassword`: Use this function to authenticate users with email and password.
        *   Handle potential errors during sign-in (e.g., invalid credentials, network issues). Display appropriate error messages to the user.
    3.  **Redirect on Successful Login:** Upon successful authentication, redirect the user to the landing page (`/`).

---

### 3. Session Management & Persistence

*   **Objective:** Ensure users remain logged in for a reasonable period and are automatically re-directed to login after that time.
*   **Steps:**
    1.  **Session Duration (90 Days):** Configure Supabase's session expiration to 90 days. This can be done within your Supabase dashboard under Authentication -> Settings -> Session duration.
    2.  **Local Storage Caching:** Utilize the browser’s `localStorage` to cache authentication tokens and user information after a successful login. This allows for persistent sessions across page reloads.
        *   Store the access token, refresh token (if applicable), and user data in `localStorage`.
        *   On each page load, check `localStorage` for existing tokens. If found, automatically authenticate the user using Supabase's authentication helpers.
    3.  **Automatic Re-Login:** After 90 days, the session will expire. Implement logic to detect this expiration and redirect the user back to the login form.

---

### 4. Code Considerations & Best Practices

*   **Error Handling:** Robustly handle errors during authentication processes (e.g., invalid credentials, network issues).
*   **Security:**  Follow best practices for secure authentication, including:
    *   Never store sensitive information directly in client-side code.
    *   Use HTTPS to protect data transmitted between the client and server.
*   **User Experience:** Provide clear feedback to users during login attempts (e.g., success messages, error messages).

---

### 5.  Expected Behavior Summary

*   Users can log in using email/password or other supported authentication methods provided by Supabase.
*   Upon successful login, users are redirected to the landing page (`/`).
*   User sessions persist for 90 days thanks to Supabase's session duration setting and local storage caching.
*   After 90 days, users are automatically re-directed back to the login form.
