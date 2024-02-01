// import { useGlobalSearchParams } from "expo-router";
// import { useMemo } from "react";
// import { useData } from "@/context/data";

// // This Function will filter the lists returned based on the search query.
// // Can then render those lists in the UI

// function useQueriedLists() {
//   const { lists } = useData();
//   const { q } = useGlobalSearchParams<{ q: string }>();
//   return useMemo(
//     () =>
//       lists.filter((item) => {
//         if (!q) {
//           return true;
//         }
//         return item.name.toLowerCase().includes(q?.toLowerCase());
//       }),
//     [q, lists]
//   );
// }

// export default useQueriedLists;
