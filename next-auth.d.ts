import "next-auth";
import "next-auth/jwt";

/** 
  * @property {string} username - Nombre de usuario
  * @property {string} email - Correo electronico del usuario
  * @property {string} fullName - Nombre del usuario
  * @property {boolean} isAdmin - Indica si el usuario es administrador
*/ 
interface UserInfo {
  username?: string;
  email?: string;
  fullName?: string;
  isAdmin?: boolean;
}

declare module "next-auth" {
  /**
   * Extiende la interfaz Session de NextAuth
   * @property {string} accessToken - Token de acceso JWT
   * @property {string} refreshToken - Token de refresco para renovar el accessToken
   * @property {boolean} isAuthenticated - Estado de autenticación del usuario
   * @property {User} user - Datos del usuario
   */
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    isAuthenticated?: boolean;
    user?: UserInfo;
  }

  /**
   * Extiende la interfaz User de NextAuth
   * @property {string} accessToken - Token de acceso JWT del usuario
   * @property {string} refreshToken - Token de refresco del usuario
   */
  interface User extends UserInfo {
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Extiende la interfaz JWT de NextAuth
   * @property {string} accessToken - Token de acceso JWT
   * @property {number} accessTokenExpires - Timestamp de expiración del token de acceso
   * @property {string} refreshToken - Token de refresco
   * @property {number} refreshTokenExpires - Timestamp de expiración del token de refresco
   */
  interface JWT extends UserInfo {
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    refreshTokenExpires?: number;
  }
}