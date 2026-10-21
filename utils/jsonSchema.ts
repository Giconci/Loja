import { zodToJsonSchema } from "zod-to-json-schema";
import { registerSchema } from "@/schemas/registerSchema";
import { ZodType } from "zod";

export const registerJsonSchema = zodToJsonSchema(
  registerSchema as ZodType<any>,
  "Register"
);
