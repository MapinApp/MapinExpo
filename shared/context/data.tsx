// // React Context Provider for creating, storing, and deleting Mapin Data i.e Lists and Pins with IDs
// import { useAsyncStorage } from "@react-native-async-storage/async-storage";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "./auth";
// import type { List, Pin, User } from "@/types/data";

// const emptyUser: User = {
//   dob: "",
//   email: "",
//   first_name: "",
//   last_name: "",
//   created_at: "",
//   gender: "",
//   username: "",
//   profile_photo_url: "https://picsum.photos/600/600",
//   stats: {
//     posts: 0,
//     followers: 0,
//     following: 0,
//   },
//   bio: "Hello World!",
// };

// type DataContext = {
//   user: User;
//   lists: List[];
//   pins: Pin[];
//   addPin: (props: {
//     pin_name: string;
//     address_str: string;
//     lat: number;
//     lng: number;
//     notes: string;
//   }) => void;
//   addList: (props: {
//     name: string;
//     description: string;
//     private: boolean;
//     cover_image_url: string;
//     pinIds: number[];
//   }) => void;
//   deletePin: (id: number) => void;
//   deleteList: (id: number) => void;
//   setUser: (user: User) => void;
//   clearUser: () => void;
// };

// const DataContext = createContext<DataContext | undefined>(undefined);

// export const DataProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User>(emptyUser);
//   const [lists, setLists] = useState<List[] | null>(null);
//   const [pins, setPins] = useState<Pin[] | null>(null);

//   const { session } = useAuth();
//   // useAsyncStorage for MAPIN_PIN_DATA
//   // prettier-ignore
//   const { getItem: getUser, setItem: setAsyncUser } =  useAsyncStorage("MAPIN_USER_DATA");
//   // prettier-ignore
//   const { getItem: getList, setItem: setAsyncLists } =  useAsyncStorage("MAPIN_LIST_DATA");
//   // prettier-ignore
//   const { getItem: getPin, setItem: setAsyncPins } =  useAsyncStorage("MAPIN_PIN_DATA");

//   // Load Mapin Data from storage on first load
//   useEffect(() => {
//     let isMounted = true;
//     // Get List Data
//     getList().then((json) => {
//       if (!isMounted) return;
//       if (json != null) {
//         const loadedLists = JSON.parse(json);
//         setLists(loadedLists ?? []);
//       } else {
//         setLists([]);
//       }
//     });
//     // Get Pin Data
//     getPin().then((json) => {
//       if (!isMounted) return;
//       if (json != null) {
//         const loadedPins = JSON.parse(json);
//         setPins(loadedPins ?? []);
//       } else {
//         setPins([]);
//       }
//     });

//     // Get User Data if session is null
//     getUser().then((json) => {
//       if (!isMounted) return;
//       if (json != null && !session) {
//         const loadedUser = JSON.parse(json);
//         setUser(loadedUser ?? {});
//       }
//     });

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // Persist User to storage
//   useEffect(() => {
//     if (!user) return;
//     setAsyncUser(JSON.stringify(user));
//   }, [user]);

//   // Persist Lists to storage
//   useEffect(() => {
//     if (!lists) return;
//     setAsyncLists(JSON.stringify(lists));
//   }, [lists]);

//   // Persist Pins to storage
//   useEffect(() => {
//     if (!pins) return;
//     setAsyncPins(JSON.stringify(pins));
//   }, [pins]);

//   // Each time session changes, update user
//   useEffect(() => {
//     if (!session) return;
//     let userData = {
//       ...user, // Keep existing user data
//       dob:
//         session.user.user_metadata.date_of_birth ??
//         session.user.user_metadata.date_of_birth,
//       email: session.user.email ?? session.user.email,
//       first_name:
//         session.user.user_metadata.first_name ??
//         session.user.user_metadata.first_name,
//       last_name:
//         session.user.user_metadata.last_name ??
//         session.user.user_metadata.last_name,
//       created_at: session.user.created_at ?? session.user.created_at,
//       gender:
//         session.user.user_metadata.gender ?? session.user.user_metadata.gender,
//       username:
//         session.user.user_metadata.username ??
//         session.user.user_metadata.username,
//     };
//     setUser(userData);
//   }, [session]);

//   const addList = (props: {
//     name: string;
//     description: string;
//     private: boolean;
//     cover_image_url: string;
//     pinIds: number[];
//   }) => {
//     // Create sequential ID
//     const id = Math.floor(Math.random() * 1000);
//     // Ensure props.name is not empty
//     if (!props.name) {
//       alert("List name cannot be empty");
//       return;
//     }
//     const list = {
//       list_id: id,
//       user_id: 1,
//       name: props.name,
//       description: props.description,
//       created_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//       private: props.private,
//       cover_image_url: props.cover_image_url,
//       pinIds: props.pinIds,
//     };
//     setLists((lists) => [...lists, list]);
//   };

//   const addPin = (props: {
//     pin_name: string;
//     address_str: string;
//     lat: number;
//     lng: number;
//     notes: string;
//   }) => {
//     const id = Math.random();
//     const pin = {
//       pin_id: id,
//       user_id: 1,
//       pin_photo_id: 1,
//       pin_name: props.pin_name,
//       address_str: props.address_str,
//       lat: props.lat,
//       lng: props.lng,
//       notes: props.notes,
//       created_at: new Date().toISOString(),
//     };
//     setPins((pins) => [...pins, pin]);
//   };

//   const deleteList = (id: number) => {
//     setLists((lists) => lists.filter((list) => list.list_id !== id));
//   };

//   const deletePin = (id: number) => {
//     setPins((pins) => pins.filter((pin) => pin.pin_id !== id));
//   };

//   const clearUser = () => {
//     setUser(emptyUser);
//   };

//   return (
//     <DataContext.Provider
//       value={{
//         user,
//         lists,
//         pins,
//         addList,
//         addPin,
//         deleteList,
//         deletePin,
//         setUser,
//         clearUser,
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };

// export const useData = () => {
//   const context = useContext(DataContext);
//   if (!context) {
//     throw new Error("useData must be used within a DataProvider");
//   }
//   return context;
// };
