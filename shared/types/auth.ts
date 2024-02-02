import type { Session } from "@supabase/gotrue-js/src/lib/types";

export interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  gender: string;
  dob: any;
}

// export Session
// Add when I need to use the session
export interface AuthSession extends Session {}
