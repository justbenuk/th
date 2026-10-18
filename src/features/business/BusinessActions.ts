"use server";

import { z } from "zod";
import { BusinessSchema } from "./BusinessSchema";

export async function AddBusinessAction(
  values: z.infer<typeof BusinessSchema>,
) {
  return { success: false, message: "testing add action" };
}

export async function UpdateBusinessAction(
  id: string,
  values: z.infer<typeof BusinessSchema>,
) {
  return { success: false, message: "testing add action" };
}
