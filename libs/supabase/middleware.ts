// libs/supabase/middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createMiddlewareClient({ req: request, res: response });

  // Refreshing the auth token
  await supabase.auth.getSession();

  return response;
}
