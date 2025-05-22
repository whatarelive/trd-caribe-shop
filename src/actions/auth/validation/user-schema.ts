import z from "zod";

// Esquema de validación para el formulario de registro del usuario.
const RegisterSchema = z.object({
    username: z.string().min(5).max(150).regex(/^[\w.@+-]+$/),
    password: z.string().min(5).max(128).regex(/^[a-zA-Z0-9]+$/),
    email: z.string().email().max(254),
    first_name: z.string().min(5).max(150),
    last_name: z.string().min(5).max(150),
    passwordConfirm: z.string().min(5),
});
RegisterSchema.refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
});

// Esquema de validación para el formulario de inicio de sesión
const LoginSchema = RegisterSchema.pick({ username: true, password: true });
// Esquema de validación para el formulario de actualización del usuario
const UpdateSchema = RegisterSchema.omit({ passwordConfirm: true }).partial()

export {
    LoginSchema,
    RegisterSchema,
    UpdateSchema
}