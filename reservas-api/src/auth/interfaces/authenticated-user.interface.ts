// Interface realizada para poder interacutar con req en metodos de controladores protegidos
export interface AuthenticatedUser extends Request {
  userId: string;
  email: string;
}
