/*
  This file contains the data context and provider
  that can be used to access the data in the SQL Lite Database
*/
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import type { Lists, List, PinPlace } from "@/types/data";
import { dummyLists } from "./mock/lists";

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
  // Open the SQLite database
  const db = SQLite.openDatabase("mapin.db");

  // Database initialization
  const initializeDatabase = async () => {
    // Perform database setup i.e., creating tables
    db.transaction(
      (tx) => {
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS pin_place (
          pin_id TEXT PRIMARY KEY NOT NULL,
          places_id TEXT,
          list_id TEXT REFERENCES lists(list_id) ON DELETE SET NULL,
          user_id TEXT NOT NULL,
          pin_name TEXT NOT NULL,
          name TEXT NOT NULL,
          notes TEXT,
          places_photo_url TEXT,
          pin_photo_url TEXT,
          bookmark_count INTEGER NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL,
          formatted_address TEXT NOT NULL,
          maps_url TEXT NOT NULL,
          created_at TEXT NOT NULL,
          visited BOOLEAN NOT NULL,
          visited_at TEXT,
          rating REAL,
          review TEXT,
          review_updated_at TEXT,
          copied_from_pin_id TEXT,
          deviation_count INTEGER NOT NULL,
          private BOOLEAN NOT NULL,
          updated_at TEXT,
          opening_hours TEXT, -- Stored as JSON string
          phone_number TEXT,
          price_level INTEGER,
          types TEXT, -- Stored as JSON string (e.g., '["type1", "type2"]')
          website TEXT
        );
      `);
        // Create the 'lists' table
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS lists (
          list_id TEXT PRIMARY KEY NOT NULL,
          user_id TEXT NOT NULL,
          name TEXT NOT NULL,
          description TEXT,
          list_photo_url TEXT,
          followers_count INTEGER NOT NULL,
          private BOOLEAN NOT NULL,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );
      `);
      },
      (error) => {
        console.log("Error setting up database tables", error);
      },
      () => {
        console.log("Database tables set up successfully");
      }
    );
  };

  const addList = async (list: List) => {
    // Implement the logic to insert a list into the database
    // and update the lists state
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
        `INSERT INTO lists (list_id, user_id, name, description, list_photo_url, followers_count, private, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
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
      await initializeDatabase();
      await populateDatabase();
      // Load initial data for lists and pins from the database
      // and set them to state variables
      await fetchLists();
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
