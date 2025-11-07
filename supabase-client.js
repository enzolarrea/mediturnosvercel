// supabase-client.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Usa las variables globales definidas en config.js
export const supabase = createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);

// Verificación opcional
console.log("✅ Conexión a Supabase inicializada:", window.SUPABASE_URL);
