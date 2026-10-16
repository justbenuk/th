import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, unstable_rethrow } from "next/navigation";
import { cache } from "react";

export const getSession = cache(async () => {
  try {
    return await auth.api.getSession({
      headers: await headers(),
      query: { disableCookieCache: true },
    });
  } catch (error) {
    unstable_rethrow(error);
    console.error(`Public session lookup failed: ${error}`);
    return null;
  }
});

const getFreshSession = cache(async () =>
  auth.api.getSession({
    headers: await headers(),
    query: { disableCookieCache: true },
  }),
);

export async function requireUser() {
  const session = await getFreshSession();

  if (!session?.user) redirect("/login");

  return session.user;
}

export async function requireAdmin() {
  const user = await requireUser();

  if (user.role !== "admin") redirect("/unauthorised");

  return user;
}
