/**
 * Supabase Client Initialization
 * Moe's PureBite - 100% Gluten-Free Restaurant
 */

const SUPABASE_URL = 'https://rycyfvhxlglnrkbvmwcb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Y3lmdmh4bGdsbnJrYnZtd2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjQ2NjQsImV4cCI6MjEwMzM0MDY2NH0.nmVHTRcHa1JGy_PClyHvzthHhHVUBDjgn3vV86WmRJU';

// Initialize the Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.supabaseClient = supabase;
