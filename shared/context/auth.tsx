/*
 * set up a React Context provider that can expose an authentication session to the entire app.
 * This provider uses a mock implementation. You can replace it with your own authentication provider.
 */
import React, { useEffect, useState } from "react";
import { useStorageState } from "@/lib/useStorageState";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
// Custom
import type { RegisterData, AuthSession } from "@/types/auth";
import { capitalizeFirstLetter } from "@/lib/utils";

// Create the auth context
const AuthContext = React.createContext<{
  signIn: (payload: { email: string; password: string }) => void;
  signUp: () => void;
  signOut: () => void;
  resetPassword: (payload: { email: string }) => void;
  registerData: RegisterData;
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterData>>;
  session: AuthSession | null;
  isLoading: boolean;
  // Utils
  isUsernameUnique: (username: string) => Promise<boolean>;
  isEmailUnique: (email: string) => Promise<boolean>;
  doesReferralExist: (referral: string) => Promise<boolean>;
}>({
  signIn: () => null,
  signUp: () => null,
  signOut: () => null,
  resetPassword: () => null,
  registerData: {
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    gender: "",
    dob: new Date(),
  },
  setRegisterData: () => null,
  session: null,
  isLoading: false,
  // Utils
  isUsernameUnique: () => Promise.resolve(false),
  isEmailUnique: () => Promise.resolve(false),
  doesReferralExist: () => Promise.resolve(false),
});

// Export the auth context
// This hook can be used to access the user info in the Session Object
export function useAuth() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuth must be wrapped in a <AuthProvider />");
    }
  }
  return value;
}

export function AuthProvider(props: React.PropsWithChildren) {
  // From the useStorageState hook
  const [[isLoading, session], setSession] = useStorageState("session");
  // Internal Loading for SupaBase
  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    gender: "",
    dob: new Date(),
  });
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Stringify the session object for storage
      setSession(JSON.stringify(session));
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(JSON.stringify(session));
    });
  }, []);

  async function signInWithEmail(payload: { email: string; password: string }) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
    if (error) {
      alert(error.message);
    } else router.replace("/(app)/home");
    setLoading(false);
  }

  async function signUpWithEmail() {
    const { email, firstName, lastName, username, password, gender, dob } =
      registerData;
    setLoading(true);
    const data = {
      first_name: capitalizeFirstLetter(firstName),
      last_name: capitalizeFirstLetter(lastName),
      username: username,
      gender: gender,
      date_of_birth: dob.toISOString().split("T")[0],
    };
    // console.log(data);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "https://mapin.co.uk/welcome",
        data: data,
      },
    });
    if (error) {
      if (error.message.includes("profiles_username_key")) {
        alert("That username is already taken...");
      } else {
        alert(error.message);
      }
    } else if (!session)
      alert(
        "Mapin account created! Check your email for the verification link"
      );
    setLoading(false);
  }

  async function resetPassword(payload: { email: string }) {
    setLoading(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      payload.email,
      {
        redirectTo: "https://mapin.co.uk/reset-password",
      }
    );
    if (error) {
      alert(error.message);
    } else {
      alert("Check your email (& Spam...) for the password reset link");
      router.replace("/(auth)/");
    }
    setLoading(false);
  }

  // UTILITY FUNCTIONS
  async function isUsernameUnique(username: string): Promise<boolean> {
    // If username is unique, return true, else return false
    /*
    This function checks if a username is unique by querying the Supabase database. It should handle errors gracefully and return false in case of any error to prevent unintended registration with a non-unique username.
    */
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username);

      if (error) {
        alert(error.message);
        // throw new Error(error.message);
      }
      if (data) {
        if (data.length > 0) {
          return false;
        }
        return true;
      } else {
        return true;
      } // If no data is returned, the username is unique
    } catch (error) {
      console.error("Error checking username uniqueness:", error);
      return false; // In case of error, assume username is not unique to avoid duplicate usernames
    }
  }

  async function isEmailUnique(email: string): Promise<boolean> {
    // If email is unique, return true, else return false
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", email);
      if (error) {
        alert(error.message);
        // throw new Error(error.message);
      }
      if (data) {
        if (data.length > 0) {
          return false;
        }
        return true;
      } else {
        return true;
      }
    } catch (error) {
      console.error("Error checking if email exists:", error);
      return false; // In case of error, conservatively return false to prevent false negatives
    }
  }

  async function doesReferralExist(referral: string): Promise<boolean> {
    // If referral exists, return true, else return false
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("referral_key")
        .eq("referral_key", referral);
      if (error) {
        alert(error.message);
        // throw new Error(error.message);
      }
      if (data) {
        if (data.length > 0) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking if email exists:", error);
      return false; // In case of error, conservatively return false to prevent false negatives
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn: (payload: { email: string; password: string }) => {
          // Perform sign-in logic here
          signInWithEmail(payload);
        },
        signUp: () => {
          // Perform sign-up logic here
          signUpWithEmail();
        },
        signOut: async () => {
          await supabase.auth.signOut();
          setSession(null);
          router.replace("/(auth)/");
        },
        resetPassword: (payload: { email: string }) => {
          resetPassword(payload);
        },
        registerData: registerData,
        setRegisterData: setRegisterData,
        session: session ? JSON.parse(session) : null,
        isLoading: isLoading || loading,
        // Utils
        isUsernameUnique,
        isEmailUnique,
        doesReferralExist,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
