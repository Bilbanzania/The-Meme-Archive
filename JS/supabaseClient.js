const YOUR_MEME_ARCHIVE_SUPABASE_URL = 'https://fspcthpkzkvntibawaif.supabase.co';
const YOUR_MEME_ARCHIVE_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzcGN0aHBremt2bnRpYmF3YWlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNzE5NDcsImV4cCI6MjA2NDg0Nzk0N30.hZEQKptuz9jad4x5yuxCcKUa6Zq_jL0jdkkpSfbhS_Q';
// --- END USER CONFIGURATION ---

let supabaseClientInstance;

// This code assumes you are including the Supabase JS library via a <script> tag in your HTML.
// That script tag makes the global 'supabase' object available.
if (typeof supabase !== 'undefined' && typeof supabase.createClient === 'function') {
    if (YOUR_MEME_ARCHIVE_SUPABASE_URL === 'https://fspcthpkzkvntibawaif.supabase.co' || YOUR_MEME_ARCHIVE_SUPABASE_ANON_KEY === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzcGN0aHBremt2bnRpYmF3YWlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNzE5NDcsImV4cCI6MjA2NDg0Nzk0N30.hZEQKptuz9jad4x5yuxCcKUa6Zq_jL0jdkkpSfbhS_Q') {
        console.warn(
            'Supabase URL or Anon Key is not configured in src/JS/supabaseClient.js. ' +
            'Please replace the placeholder values with your actual Supabase project credentials for the Meme Archive.'
        );
        // Provide a non-functional client to prevent immediate errors in other modules,
        // but operations will not work.
        supabaseClientInstance = {
            storage: {
                from: () => ({
                    upload: () => Promise.reject(new Error("Supabase not configured.")),
                    list: () => Promise.reject(new Error("Supabase not configured.")),
                    getPublicUrl: () => ({ data: { publicUrl: '' } })
                })
            },
            // You can add stubs for other Supabase services (like .from('table') for database) if your app might try to use them before configuration.
        };
    } else {
        // Initialize the Supabase client using the global 'supabase' object from the CDN
        supabaseClientInstance = supabase.createClient(YOUR_MEME_ARCHIVE_SUPABASE_URL, YOUR_MEME_ARCHIVE_SUPABASE_ANON_KEY);
        console.log("Supabase client initialized for Meme Archive.");
    }
} else {
    console.error(
        'Supabase JS library not found. ' +
        'Make sure you have included it via a <script> tag in your HTML file ' +
        'before your application scripts.'
    );
    // Provide a non-functional client
    supabaseClientInstance = {
        storage: {
            from: () => ({
                upload: () => Promise.reject(new Error("Supabase library not loaded.")),
                list: () => Promise.reject(new Error("Supabase library not loaded.")),
                getPublicUrl: () => ({ data: { publicUrl: '' } })
            })
        },
    };
}

// Export the initialized (or dummy) client instance
export const supabase = supabaseClientInstance;