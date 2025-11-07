// turns.js
import { supabase } from './supabase-client.js';

// ===============================
// CREAR NUEVO TURNO
// ===============================
export async function crearTurno({ medico_id, fecha, hora, motivo = "" }) {
    try {
        const { data: userData } = await supabase.auth.getUser();
        const paciente_id = userData.user.id;

        const { data, error } = await supabase.from("turnos").insert([
            { paciente_id, medico_id, fecha, hora, motivo, estado: "pendiente" },
        ]);

        if (error) throw error;

        alert("✅ Turno creado correctamente.");
        console.log("Turno creado:", data);
        return data;
    } catch (err) {
        console.error("Error al crear turno:", err.message);
        alert("❌ No se pudo crear el turno: " + err.message);
    }
}

// ===============================
// LISTAR TURNOS DEL PACIENTE ACTUAL
// ===============================
export async function listarTurnosPaciente() {
    try {
        const { data: userData } = await supabase.auth.getUser();
        const paciente_id = userData.user.id;

        const { data, error } = await supabase
            .from("turnos")
            .select(`
        id, fecha, hora, estado, motivo,
        medico:medico_id ( nombre, apellido, especialidad_id )
      `)
            .eq("paciente_id", paciente_id)
            .order("fecha", { ascending: true });

        if (error) throw error;

        console.log("Turnos del paciente:", data);
        return data;
    } catch (err) {
        console.error("Error al listar turnos:", err.message);
    }
}

// ===============================
// CANCELAR TURNO
// ===============================
export async function cancelarTurno(turnoId) {
    try {
        const { data: userData } = await supabase.auth.getUser();
        const paciente_id = userData.user.id;

        const { error } = await supabase
            .from("turnos")
            .update({ estado: "cancelado" })
            .eq("id", turnoId)
            .eq("paciente_id", paciente_id);

        if (error) throw error;

        alert("❌ Turno cancelado correctamente.");
    } catch (err) {
        console.error("Error al cancelar turno:", err.message);
    }
}
