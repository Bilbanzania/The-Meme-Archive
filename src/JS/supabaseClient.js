const YOUR_MEME_ARCHIVE_SUPABASE_URL = 'YOUR_MEME_ARCHIVE_SUPABASE_URL_HERE';
const YOUR_MEME_ARCHIVE_SUPABASE_ANON_KEY = 'YOUR_MEME_ARCHIVE_ANON_KEY_HERE';

let supabaseClientInstance;

if (typeof supabase !== 'undefined' && typeof supabase.createClient === 'function') {
    supabaseClientInstance = supabase.createClient(YOUR_MEME_ARCHIVE_SUPABASE_URL, YOUR_MEME_ARCHIVE_SUPABASE_ANON_KEY);
} else {
    console.error('Supabase JS library not loaded. Ensure CDN script tag is present.');
    // Fallback or error handling
}

export const supabase = supabaseClientInstance;