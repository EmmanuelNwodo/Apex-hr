import { z } from "zod";

/**
 * Shared validation primitives for future forms (Find Talent, applications,
 * talent pool). Server actions must always re-validate with these schemas
 * rather than trusting client-side validation alone, per CLAUDE.md
 * section 20.
 */
export const workEmailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email address");

export const requiredTextSchema = (label: string) =>
  z.string().trim().min(1, `${label} is required`);
