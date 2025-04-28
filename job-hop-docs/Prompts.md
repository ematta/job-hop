#Proompts
## Backend stub (o4-mini)

Please create a backend stub for a python app. Put it in `job-hop-backend` folder The tech stack we are starting with are:
- uv
- fast api
- supabase

This will just be a stub. Do not implement anything except a simple healthpoint api endpoint that returns 200.

## Stub UI (o4-mini)

I need you to create a UI screen in the job-hop mobile. This UI will be:
- A search bar
- An Add Job button next to an Upload resume button.
- Cards for each job applied to. This should be stubbed with 3 cards displaying Company Name and Job Title. Stub the names
- Tabs for home and job and resumes.

### Stub UI - Job and Resume headers (o4-mini)

In the resume and jobs tab I need a header imag similar to both home and explore tabs.

## Share URL (rewritten Gemma 3 12b QAT) (o4-mini)

"You are an assistant helping to design the functionality of a mobile application. A user will provide a URL from either LinkedIn or Indeed that points to a job posting. The app needs to receive this URL and confirm it has been successfully received.

Task:

1.  Input: Assume you've received a URL from the user, which is a valid link to a job posting on either LinkedIn or Indeed. (For now, don't worry about validating if it is a valid job posting - just assume it is.)
2. Output: Respond with a single, clear alert message that confirms the app has received the URL. This alert should be suitable for display to the user on their mobile device. The alert message should indicate that the URL was successfully captured and will be processed by the backend system.

Example Input (User provides this): https://www.linkedin.com/jobs/1234567890
Example Output: "Job posting URL received! Processing..."

Example Input (User provides this): https://indeed.com/job/software-engineer-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o
Example Output: "Job posting URL received! Processing..."

Important Notes:

* Focus only on confirming receipt of the URL. Do not attempt to parse or analyze the job posting content at this stage.
* The alert message should be concise and user-friendly."