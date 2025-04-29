import { supabase } from './supabaseClient';

// Simple DOM helpers
type HTMLElementWithStyle = HTMLElement & { style: CSSStyleDeclaration };
function show(element: HTMLElementWithStyle) { element.style.display = ''; }
function hide(element: HTMLElementWithStyle) { element.style.display = 'none'; }

// UI Elements
let root = document.getElementById('root') as HTMLElement | null;
if (!root) {
  root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
}

// Render login form
function renderLogin() {
  if (!root) return;
  root.innerHTML = `
    <h2>Login</h2>
    <input id="email" type="email" placeholder="Email" />
    <input id="password" type="password" placeholder="Password" />
    <button id="loginBtn">Login</button>
    <div id="loginError" style="color:red;"></div>
  `;
  (document.getElementById('loginBtn') as HTMLButtonElement).onclick = async () => {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      (document.getElementById('loginError') as HTMLElement).textContent = error.message;
    } else {
      checkAuthAndRender();
    }
  };
}

// Render job submission form
function renderJobForm() {
  if (!root) return;
  root.innerHTML = `
    <h2>Submit Job</h2>
    <input id="company" placeholder="Company Name" />
    <input id="title" placeholder="Job Title" />
    <input id="url" placeholder="Job URL" />
    <button id="submitJob">Submit</button>
    <div id="formMsg"></div>
    <button id="logoutBtn">Logout</button>
  `;
  (document.getElementById('submitJob') as HTMLButtonElement).onclick = async () => {
    const company = (document.getElementById('company') as HTMLInputElement).value;
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const url = (document.getElementById('url') as HTMLInputElement).value;
    // TODO: Adjust table/fields as needed
    const { error } = await supabase.from('jobs').insert([{ company, title, url }]);
    const msg = document.getElementById('formMsg') as HTMLElement;
    if (error) {
      msg.textContent = 'Error!';
      msg.style.color = 'red';
    } else {
      msg.textContent = 'Success!';
      msg.style.color = 'green';
    }
  };
  (document.getElementById('logoutBtn') as HTMLButtonElement).onclick = async () => {
    await supabase.auth.signOut();
    checkAuthAndRender();
  };
}

// Check auth state and render appropriate UI
async function checkAuthAndRender() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    renderJobForm();
  } else {
    renderLogin();
  }
}

// On popup load
checkAuthAndRender();
