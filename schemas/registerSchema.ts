import { z } from "zod";

export const registerSchema = z.object({
  name: z.string()
    .min(1, "Campo obrigatório") 
    .min(6, "Nome deve ter pelo menos 6 caracteres"),
  email: z.string()
    .min(1, "Campo obrigatório") 
    .email("Digite um email válido"),
  password: z.string()
    .min(1, "Campo obrigatório") 
    .min(8, "Senha deve ter pelo menos 8 caracteres"),
});

export type RegisterData = z.infer<typeof registerSchema>;
