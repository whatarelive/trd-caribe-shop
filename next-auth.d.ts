import "next-auth";
import "next-auth/jwt";

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
    user?: {
      username?: string;
      isAdmin?: boolean;
    };
  }

  /**
   * Extiende la interfaz User de NextAuth
   * @property {string} username - Nombre de usuario
   * @property {boolean} isAdmin - Indica si el usuario es administrador
   * @property {string} accessToken - Token de acceso JWT del usuario
   * @property {string} refreshToken - Token de refresco del usuario
   */
  interface User {
    username?: string;
    isAdmin?: boolean;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Extiende la interfaz JWT de NextAuth
   * @property {string} username - Nombre de usuario
   * @property {boolean} isAdmin - Indica si el usuario es administrador
   * @property {string} accessToken - Token de acceso JWT
   * @property {number} accessTokenExpires - Timestamp de expiración del token de acceso
   * @property {string} refreshToken - Token de refresco
   * @property {number} refreshTokenExpires - Timestamp de expiración del token de refresco
   */
  interface JWT {
    username?: string;
    isAdmin?: boolean;
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    refreshTokenExpires?: number;
  }
}