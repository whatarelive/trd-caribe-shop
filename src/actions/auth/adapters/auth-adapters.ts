// Apdater para mapear los datos de la sesión del usuario recibidos en el inicio de sesión.
export const loginFromAPI = (session: any) => ({
    username: session.username,
    email: session.email,
    fullName: `${session.first_name} ${session.last_name}`,
    isAdmin: Boolean(session.is_staff),
    accessToken: session.access,
    refreshToken: session.refresh,
    accessTokenExpires: Date.now() + 60 * 59 * 1000, // 59 minutos de vida
    refreshTokenExpires: Date.now() + 23 * 60 * 60 * 1000, // 23 horas de vida
});

// Apdater para mapear los datos de la sesión del usuario recibidos en el registro.
export const registerFromAPI = (session: any) => ({
    username: session.username,
    email: session.email,
    fullName: `${session.first_name} ${session.last_name}`,
    isAdmin: false,
    accessToken: session.token.access,
    refreshToken: session.token.refresh,
    accessTokenExpires: Date.now() + 60 * 59 * 1000, // 59 minutos de vida
    refreshTokenExpires: Date.now() + 23 * 60 * 60 * 1000, // 23 horas de vida
});

// Adapter para mapear los datos de la revalidación del token de la sesión.
export const newTokenFromAPI = (token: any) => ({
    accessToken: token.access,
    refreshToken: token.refresh,
});