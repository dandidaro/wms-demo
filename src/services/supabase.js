import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://sbnihbuzarnmqvpfsiwf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNibmloYnV6YXJubXF2cGZzaXdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NDQ0NDMsImV4cCI6MjA1MzAyMDQ0M30.vZDBOwMBarX0kP2q_MFovYZeti-dia_-qTmaih6iGMk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
