import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = "https://kdiybhmxspjohywlezvr.supabase.co";
const supabaseKey: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkaXliaG14c3Bqb2h5d2xlenZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNTU1NzIsImV4cCI6MjA1ODkzMTU3Mn0.HZv3nMLnYMls3O1YU-Rg-i4b_P8gAGpgvan9ScyXhtk";

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
