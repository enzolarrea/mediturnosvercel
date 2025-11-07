// auth.js
import { supabase } from './supabase-client.js';

// ===============================
// REGISTRO DE NUEVO USUARIO
// ===============================
export async function registerUser({ email, password, nombre, apellido, telefono, dni, rol = 'paciente' }) {
    try {
        // 1) Crear usuario en Supabase Auth
        const { data: signData, error: signError } = await supabase.auth.signUp({
            email,
            password,
        });
        if (signError) throw signError;

        const user = signData.user;
        console.log("Usuario creado:", user);

        // 2) Crear registro en tabla profiles
        const { error: profileError } = await supabase.from('profiles').insert([
            {
                id: user.id,
                nombre,
                apellido,
                telefono,
                dni,
                rol,
            },
        ]);
        if (profileError) throw profileError;

        alert("✅ Registro completado. Revisa tu correo para confirmar la cuenta.");
        return user;

    } catch (err) {
        console.error("Error en registerUser:", err.message);
        alert("❌ Error al registrarte: " + err.message);
    }
}

// ===============================
// LOGIN DE USUARIO
// ===============================
export async function loginUser({ email, password }) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        console.log("Sesión iniciada:", data);
        alert("✅ Sesión iniciada correctamente.");
        window.location.href = "index.html"; // redirigir al dashboard principal
    } catch (err) {
        console.error("Error en loginUser:", err.message);
        alert("❌ Error al iniciar sesión: " + err.message);
    }
}

// ===============================
// LOGOUT DE USUARIO
// ===============================
export async function logoutUser() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        alert("👋 Sesión cerrada correctamente.");
        window.location.href = "login.html";
    } catch (err) {
        console.error("Error en logoutUser:", err.message);
    }
}

// ===============================
// OBTENER USUARIO ACTUAL
// ===============================
export async function getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    return data.user;
}
