// import { useRouter, useSegments } from "expo-router";
// import React, { useState, useEffect, useContext, createContext } from "react";
// import { supabase } from "@/lib/supabase";

// // Create the auth context
// const AuthContext = createContext(null);

// // Export the auth context
// export function useAuth() {
//   return useContext(AuthContext);
// }

// function useProtectedRoute(session: any) {
//   const rootSegment = useSegments()[0];
//   const router = useRouter();

//   useEffect(() => {
//     if (
//       // If the session is not signed in and the initial segment is not anything in the auth group.
//       !session &&
//       rootSegment !== "(auth)"
//     ) {
//       // Navigate to dynamic routes by passing an object like { pathname: 'profile', params: { id: '123' } }.
//       // Redirect to the log-in page.
//       router.replace("(auth)/");
//     } else if (session && session.user && rootSegment !== "(app)") {
//       // Redirect away from the log-in page.
//       router.replace("/");
//     }
//   }, [session, rootSegment]);
// }

// export function AuthProvider(props) {
//   const [session, setSession] = useState(null);
//   const router = useRouter();
//   const [registerData, setRegisterData] = useState({
//     email: "",
//     firstName: "",
//     lastName: "",
//     username: "",
//     password: "",
//     gender: "",
//     dob: new Date(),
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });
//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });
//   }, []);

//   useProtectedRoute(session);

//   async function signInWithEmail(payload) {
//     setLoading(true);
//     const { error } = await supabase.auth.signInWithPassword({
//       email: payload.email,
//       password: payload.password,
//     });
//     if (error) alert(error.message);
//     setLoading(false);
//   }

//   function capitalizeFirstLetter(string: string) {
//     return string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase();
//   }

//   async function signUpWithEmail(registerData: any) {
//     // prettier-ignore
//     const { email, firstName, lastName, username, password, gender, dob } = registerData;
//     setLoading(true);

//     const data = {
//       first_name: capitalizeFirstLetter(firstName),
//       last_name: capitalizeFirstLetter(lastName),
//       username: username,
//       gender: gender,
//       date_of_birth: dob.toISOString().split("T")[0],
//     };
//     // console.log(data);
//     const { error } = await supabase.auth.signUp({
//       email: email,
//       password: password,
//       options: {
//         emailRedirectTo: "https://mapin.co.uk/welcome",
//         data: data,
//       },
//     });

//     if (error) {
//       if (error.message.includes("profiles_username_key")) {
//         alert("That username is already taken...");
//       } else {
//         alert(error.message);
//       }
//     } else {
//       router.replace("(auth)/");
//       alert(
//         "Mapin account created! Check your email (& Spam...) for the verification link"
//       );
//     }
//     setLoading(false);
//   }

//   async function resetPassword(email: string) {
//     setLoading(true);

//     const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
//       redirectTo: "https://mapin.co.uk/reset-password",
//     });
//     if (error) {
//       alert(error.message);
//     } else {
//       alert("Check your email (& Spam...) for the password reset link");
//       router.replace("(auth)/");
//     }
//     setLoading(false);
//   }

//   async function isUsernameUnique(username: string) {
//     // If username is unique, return true, else return false
//     const { data, error } = await supabase
//       .from("profiles")
//       .select("username")
//       .eq("username", username);
//     if (error) {
//       alert(error.message);
//     }
//     if (data.length > 0) {
//       return false;
//     }
//     return true;
//   }

//   async function doesEmailExist(email: string) {
//     // If email exists, return true, else return false
//     const { data, error } = await supabase
//       .from("profiles")
//       .select("email")
//       .eq("email", email);
//     if (error) {
//       alert(error.message);
//     }
//     if (data.length > 0) {
//       return true;
//     }
//     return false;
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         signIn: (payload) => {
//           signInWithEmail(payload);
//         },
//         signOut: async () => {
//           await supabase.auth.signOut();
//           router.replace("(auth)/");
//         },
//         signUp: () => {
//           signUpWithEmail(registerData);
//         },
//         resetPassword: (email) => {
//           resetPassword(email);
//         },
//         registerData: registerData,
//         setRegisterData: setRegisterData,
//         session,
//         loading,
//         setLoading,
//         isUsernameUnique,
//         doesEmailExist,
//       }}
//     >
//       {props.children}
//     </AuthContext.Provider>
//   );
// }
