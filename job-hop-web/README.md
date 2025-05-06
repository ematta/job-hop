# Job Hop Web (Vite + React + TypeScript)

This project is a client-side rendered web app using:
- Vite (build tool)
- React (UI framework)
- TypeScript (type safety)
- React Router v7 (routing)
- Supabase (backend)
- Material-UI (MUI, UI components)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your Supabase credentials.
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open your browser:**
   - Visit [http://localhost:5173](http://localhost:5173)

## Project Structure
- All pages are in `src/pages/`.
- Routing is handled in `src/App.tsx` using React Router v7.
- Supabase client is set up in `src/supabaseClient.ts`.
- MUI is used for UI components (see Home page for example).

## Notes
- No server-side rendering or Next.js patterns are used.
- Navigation is client-side only.
- For 404s, see `src/pages/NotFound.tsx`.

---

For workspace-specific Copilot instructions, see `.github/copilot-instructions.md`.
