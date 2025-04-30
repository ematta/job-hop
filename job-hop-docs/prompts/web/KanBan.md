Build a React-based Kanban board using Next.js and Supabase for managing job application statuses.

**Board Structure:**
* Four vertical columns representing job states: Open, Applied, Interviewing, Closed.

**Core Functionality:**
* Display each job application as a draggable card.
* Allow users to drag cards freely between any column.
* Upon dropping a card, update the associated job record's status in the Supabase (Postgres) database to match the target column's title.

**Component Design:**
* Structure the application with a primary 'Kanban Board' component.
* Break down the columns into reusable 'Swimlane' or 'Column' components.

**Tech Stack:** Next.js, React, Supabase, Postgres.