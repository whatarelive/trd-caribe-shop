import z from "zod";

// Esquema de validación para el formulario de registro del usuario.
const RegisterSchema = z.object({
    username: z.string()
        .min(5, "El nombre de usuario es requerido")
        .max(150, "El nombre de usuario debe tener 150 caracteres o menos")
        .regex(/^[\w.@+-]+$/, "Solo se permiten letras, números y los caracteres @/./+/-/_"),
    email: z.string()
        .email("Dirección de correo electrónico inválida")
        .max(254, "El correo electrónico debe tener 254 caracteres o menos"),
    first_name: z.string()
        .min(5, "El nombre es requerido")
        .max(150, "El nombre debe tener 150 caracteres o menos"),
    last_name: z.string()
        .min(5, "El apellido es requerido")
        .max(150, "El apellido debe tener 150 caracteres o menos"),
    password: z.string()
        .min(5, "La contraseña es requerida")
        .max(128, "La contraseña debe tener 128 caracteres o menos")
        .regex(/^[a-zA-Z0-9]+$/, "La contraseña solo puede contener letras y números"),
    passwordConfirm: z.string()
        .min(5, "La confirmación de contraseña es requerida")

}).refine((data) => data.password === data.passwordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirm"]
});

// Esquema de validación para el formulario de inicio de sesión cuando se utiliza el email.
const LoginSchemaWithEmail = z.object({
    username: z.never(),
    email: z.string()
        .email("Dirección de correo electrónico inválida")
        .max(254, "El correo electrónico debe tener 254 caracteres o menos"),
    password: z.string()
        .min(5, "La contraseña es requerida")
        .max(128, "La contraseña debe tener 128 caracteres o menos")
        .regex(/^[a-zA-Z0-9]+$/, "La contraseña solo puede contener letras y números"),
});

// Esquema de validación para el formulario de inicio de sesión cuando se utiliza el userName.
const LoginSchemaWithUserName = z.object({
    email: z.never(),
    username: z.string()
        .min(5, "El nombre de usuario es requerido")
        .max(150, "El nombre de usuario debe tener 150 caracteres o menos")
        .regex(/^[\w.@+-]+$/, "Solo se permiten letras, números y los caracteres @/./+/-/_"),
    password: z.string()
        .min(5, "La contraseña es requerida")
        .max(128, "La contraseña debe tener 128 caracteres o menos")
        .regex(/^[a-zA-Z0-9]+$/, "La contraseña solo puede contener letras y números"),
});

export { 
    RegisterSchema,
    LoginSchemaWithEmail,
    LoginSchemaWithUserName
};