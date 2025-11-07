import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const supabase = createClient(
    "https://pxzfneyporftbfquqllw.supabase.co", // tu URL real
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4emZuZXlwb3JmdGJmcXVxbGx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0Njk3NjYsImV4cCI6MjA3ODA0NTc2Nn0.t6TlZZ6QsCToRpTXsoLk1wZF5y9Avs0cnsoCqfIRBwY"
);

console.log("✅ Conexión a Supabase inicializada:", supabase);
