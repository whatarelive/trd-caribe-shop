import type { IUser, IUserAPI } from "@/interfaces/models/user.interface";

// Adapter para los datos de un usuario recibidos desde la API.
export const userFromAPI = (user: any): IUser => ({
    id: user.id,
    email: user.email,
    fullName: `${user.first_name} ${user.last_name}`,
    username: user.username,
    isAdmin: Boolean(user.is_staff),
});

// Adapter para los datos de un usuario que se van a enviar a la API.
export const userFormatAPI = (user: any): IUserAPI => ({
    ...(user.email && { email: user.email }),
    ...(user.password && { password: user.password }),
    ...(user.username && { username: user.username }),
    ...(user.first_name && { first_name: user.first_name }),
    ...(user.last_name && { last_name: user.last_name }),
});