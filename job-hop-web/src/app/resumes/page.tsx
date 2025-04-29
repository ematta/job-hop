'use client';
import { useEffect, useState, useRef } from 'react';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function getUserId() {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('supabase.user');
  if (!userStr) return null;
  try {
    const user = JSON.parse(userStr);
    return user?.id || user?.uuid || null;
  } catch {
    return null;
  }
}

export default function ResumesPage() {
  const [resumes, setResumes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userId = getUserId();

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    supabase.storage.from('resumes').list(`${userId}/`, { limit: 100 })
      .then(({ data, error }) => {
        if (error) {
          setError('Failed to load resumes.');
          setResumes([]);
        } else {
          setResumes(data?.map(f => f.name) || []);
        }
        setLoading(false);
      });
  }, [userId, success]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccess(null);
    setUploading(true);
    const file = e.target.files?.[0];
    if (!file) {
      setUploading(false);
      return;
    }
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are supported.');
      setUploading(false);
      return;
    }
    const filePath = `${userId}/${file.name}`;
    const { error: uploadError } = await supabase.storage.from('resumes').upload(filePath, file, { upsert: true, contentType: 'application/pdf' });
    if (uploadError) {
      setError('Upload failed: ' + uploadError.message);
    } else {
      setSuccess('Resume uploaded successfully!');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
    setUploading(false);
  };

  if (!userId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Resumes</h2>
          <p className="text-gray-500">You must be logged in to view your resumes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Resumes</h2>
        {error && <div className="text-red-500 text-center mb-2">{error}</div>}
        {success && <div className="text-green-600 text-center mb-2">{success}</div>}
        <div className="mb-6 flex flex-col items-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-2"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload PDF Resume'}
          </button>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : resumes.length === 0 ? (
          <div className="text-center text-gray-500">You haven&apos;t uploaded any resumes yet.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {resumes.map((name) => (
              <li key={name} className="py-2 flex items-center justify-between">
                <span className="truncate">{name}</span>
                <a
                  href={supabase.storage.from('resumes').getPublicUrl(`${userId}/${name}`).data.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
