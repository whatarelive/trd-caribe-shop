// Apdater para mapear los datos de la sesión del usuario recibidos en el inicio de sesión.
export const loginFromAPI = (session: any) => ({
    username: session.username,
    email: session.email,
    fullName: `${session.first_name} ${session.last_name}`,
    isAdmin: Boolean(session.is_staff),
    accessToken: session.access,
    refreshToken: session.refresh,
});

// Apdater para mapear los datos de la sesión del usuario recibidos en el registro.
export const registerFromAPI = (session: any) => ({
    username: session.username,
    email: session.email,
    fullName: `${session.first_name} ${session.last_name}`,
    isAdmin: false,
    accessToken: session.token.access,
    refreshToken: session.token.refresh,
});

// Adapter para mapear los datos de la revalidación del token de la sesión.
export const newTokenFromAPI = (token: any) => ({
    accessToken: token.access,
    refreshToken: token.refresh,
});