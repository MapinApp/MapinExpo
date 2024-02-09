/*
  This file contains the data context and provider
  that can be used to access the data in the SQL Lite Database
*/
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import type { Lists, List, PinPlace } from "@/types/data";
import { dummyLists } from "./mock/lists";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

interface DataContextType {
  isDBLoadingComplete: boolean;
  lists: Lists;
  addList: (list: List) => Promise<void>;
  addPin: (pin: PinPlace) => Promise<void>;
  deleteList: (listId: number) => Promise<void>;
  deletePin: (pinId: number) => Promise<void>;
}

// Export the data context
// This hook can be used to access the data info in the SQL Lite Database
const DataContext = createContext<DataContextType>({
  isDBLoadingComplete: false,
  lists: {},
  addList: async () => {},
  addPin: async () => {},
  deleteList: async () => {},
  deletePin: async () => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);
  const [lists, setLists] = useState<Lists>({});
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

  async function openDatabase(): Promise<SQLite.SQLiteDatabase> {
    if (
      !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
        .exists
    ) {
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "SQLite"
      );
    }
    await FileSystem.downloadAsync(
      Asset.fromModule(require("../assets/mapin.db")).uri,
      FileSystem.documentDirectory + "SQLite/mapin.db"
    );
    return SQLite.openDatabase("mapin.db");
  }

  const addList = async (list: List) => {
    // Implement the logic to insert a list into the database
    // and update the lists state
    db &&
      db.transaction((tx) => {
        const {
          list_id,
          user_id,
          name,
          description,
          list_photo_url,
          followers_count,
          isPrivate,
          created_at,
          updated_at,
        } = list;
        tx.executeSql(
          `INSERT INTO lists (list_id, user_id, name, description, list_photo_url, followers_count, private, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) 
        ON CONFLICT(list_id) 
        DO UPDATE SET 
          user_id = excluded.user_id, 
          name = excluded.name, 
          description = excluded.description, 
          list_photo_url = excluded.list_photo_url, 
          followers_count = excluded.followers_count, 
          private = excluded.private, 
          created_at = excluded.created_at, 
          updated_at = excluded.updated_at;`,
          [
            list_id,
            user_id,
            name,
            description,
            list_photo_url,
            followers_count,
            isPrivate ? 1 : 0,
            created_at,
            updated_at,
          ]
        );
      });
  };

  const addPin = async (pin: PinPlace) => {
    // Implement the logic to insert a pin into the database
    // and update the pins state
    db &&
      db.transaction((tx) => {
        const {
          pin_id,
          places_id,
          user_id,
          pin_name,
          name,
          notes,
          places_photo_url,
          pin_photo_url,
          bookmark_count,
          lat,
          lng,
          formatted_address,
          maps_url,
          created_at,
          visited,
          visited_at,
          rating,
          review,
          review_updated_at,
          copied_from_pin_id,
          deviation_count,
          isPrivate,
          updated_at,
          opening_hours,
          phone_number,
          price_level,
          types,
          website,
        } = pin;
        tx.executeSql(
          `INSERT INTO pin_place (pin_id, places_id, user_id, pin_name, name, notes, places_photo_url, pin_photo_url, bookmark_count, lat, lng, formatted_address, maps_url, created_at, visited, visited_at, rating, review, review_updated_at, copied_from_pin_id, deviation_count, private, updated_at, opening_hours, phone_number, price_level, types, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          [
            pin_id,
            places_id,
            user_id,
            pin_name,
            name,
            notes,
            places_photo_url,
            pin_photo_url,
            bookmark_count,
            lat,
            lng,
            formatted_address,
            maps_url,
            created_at,
            visited ? 1 : 0,
            visited_at,
            rating,
            review,
            review_updated_at,
            copied_from_pin_id,
            deviation_count,
            isPrivate ? 1 : 0,
            updated_at,
            JSON.stringify(opening_hours),
            phone_number,
            price_level,
            JSON.stringify(types),
            website,
          ]
        );
      });
  };

  const deleteList = async (listId: number) => {
    // Implement the logic to delete a list from the database
    // and update the lists state
  };

  const deletePin = async (pinId: number) => {
    // Implement the logic to delete a pin from the database
    // and update the pins state
  };

  const fetchLists = async () => {
    // Implement the logic to fetch lists joined with pins from the database
    // and update the lists state
    db &&
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM lists LEFT JOIN pin_place ON lists.list_id = pin_place.list_id;`,
          [],
          (_, { rows: { _array } }) => {
            console.log("Fetched lists", _array);
            // Update the lists state
          },
          (_, error) => {
            console.log("Error fetching lists", error);
            return false;
          }
        );
      });
  };

  const populateDatabase = async () => {
    // Populate the database with dummy data
    Object.values(dummyLists).forEach(async (list) => {
      await addList(list);
      list.pins.forEach(async (pin) => {
        await addPin(pin);
      });
    });
  };

  useEffect(() => {
    // Perform database initialization
    (async () => {
      // Open the database
      let db = await openDatabase();
      setDb(db);
      // await populateDatabase();
      // Load initial data for lists and pins from the database
      // and set them to state variables
      // await fetchLists();
      // Set the loading state to true
      setDBLoadingComplete(true);
    })();
  }, []);

  return (
    <DataContext.Provider
      value={{
        lists,
        isDBLoadingComplete,
        addList: async () => {},
        addPin: async () => {},
        deleteList: async () => {},
        deletePin: async () => {},
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the data context
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (process.env.NODE_ENV !== "production") {
    if (!context) {
      throw new Error("useData must be used within a DataProvider");
    }
  }
  return context;
};
