export interface RequestWithToken extends Request {
  token?: string; // Hacemos que la propiedad token sea opcional
}