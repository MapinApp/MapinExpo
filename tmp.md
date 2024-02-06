These are the types:

```ts
export interface PinPlace {
  pin_id: string;
  places_id: string;
  user_id: string;
  pin_name: string;
  name: string;
  notes: string;
  places_photo_url: string;
  pin_photo_url: string | null;
  bookmark_count: number;
  lat: number;
  lng: number;
  formatted_address: string;
  maps_url: string;
  created_at: string;
  visited: boolean;
  visited_at: string | null;
  rating: number | null;
  review: string | null;
  review_updated_at: string | null;
  copied_from_pin_id: string | null;
  deviation_count: number;
  private: boolean;
  updated_at: string | null;
  opening_hours: {} | null;
  phone_number: string | null;
  price_level: number | null;
  types: string[];
  website: string | null;
}

type ListID = string;

export interface List {
  list_id: ListID;
  user_id: string;
  name: string;
  description: string;
  list_photo_url: string;
  followers_count: number;
  private: boolean;
  created_at: string;
  updated_at: string;
  pins: PinPlace[];
}

export interface Lists {
  [key: ListID]: List;
}
```

This is the dummy data:

```ts
import type { Lists } from "@/types/data";

export const dummyLists: Lists = {
  list1: {
    list_id: "list1",
    user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
    created_at: "2021-06-06T00:00:00Z",
    updated_at: "2021-06-06T00:00:00Z",
    name: "Restaurants",
    description: "A bunch of Restaurants I want to Visit",
    list_photo_url: "https://source.unsplash.com/1600x900/",
    followers_count: 0,
    private: false,
    pins: [
      {
        pin_id: "8",
        places_id: "8",
        pin_name: "Kiln",
        name: "Kiln",
        lat: 51.51140069999999,
        lng: -0.136059,
        formatted_address: "58 Brewer St, London W1F 9TL, UK",
        rating: 4.4,
        types: ["restaurant"],
        notes: "Software Engineer",
        user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
        pin_photo_url: "https://source.unsplash.com/1600x900/",
        places_photo_url: "https://source.unsplash.com/1600x900/",
        maps_url: "https://maps.example.com/place1",
        created_at: "2021-07-27T00:00:00Z",
        visited: true,
        visited_at: "2021-07-27T00:00:00Z",
        review: null,
        review_updated_at: null,
        deviation_count: 0,
        private: false,
        updated_at: "2021-07-27T00:00:00Z",
        opening_hours: null,
        phone_number: null,
        price_level: null,
        website: null,
        bookmark_count: 0,
        copied_from_pin_id: "b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f",
      },
      {
        pin_id: "11",
        places_id: "11",
        pin_name: "Hoppers King's Cross",
        name: "Hoppers King's Cross",
        lat: 51.53435,
        lng: -0.1254808,
        formatted_address: "Unit 3, 4 Pancras Sq, London N1C 4AG, UK",
        rating: 4.3,
        types: ["restaurant"],
        notes: "IT Manager",
        user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
        pin_photo_url: "https://source.unsplash.com/1600x900/",
        places_photo_url: "https://source.unsplash.com/1600x900/",
        maps_url: "https://maps.example.com/place1",
        created_at: "2021-07-27T00:00:00Z",
        visited: true,
        visited_at: "2021-07-27T00:00:00Z",
        review: null,
        review_updated_at: null,
        deviation_count: 0,
        private: false,
        updated_at: "2021-07-27T00:00:00Z",
        opening_hours: null,
        phone_number: null,
        price_level: null,
        website: null,
        bookmark_count: 0,
        copied_from_pin_id: "b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f",
      },
    ],
  },
  list2: {
    list_id: "list2",
    user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
    created_at: "2021-06-06T00:00:00Z",
    updated_at: "2021-06-06T00:00:00Z",
    name: "Other Restaurants",
    description: "Another bunch of Restaurants I want to Visit",
    list_photo_url: "https://source.unsplash.com/1600x900/",
    followers_count: 2,
    private: false,
    pins: [
      {
        pin_id: "21",
        places_id: "21",
        pin_name: "Patara Fine Thai Cuisine Soho",
        name: "Patara Fine Thai Cuisine Soho",
        lat: 51.5141736,
        lng: -0.1307411,
        formatted_address: "15 Greek St, London W1D 4DP, UK",
        rating: 4.3,
        types: ["restaurant"],
        notes: "Data Analyst",
        user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
        pin_photo_url: "https://source.unsplash.com/1600x900/",
        places_photo_url: "https://source.unsplash.com/1600x900/",
        maps_url: "https://maps.example.com/place1",
        created_at: "2021-07-27T00:00:00Z",
        visited: true,
        visited_at: "2021-07-27T00:00:00Z",
        review: null,
        review_updated_at: null,
        deviation_count: 0,
        private: false,
        updated_at: "2021-07-27T00:00:00Z",
        opening_hours: null,
        phone_number: null,
        price_level: null,
        website: null,
        bookmark_count: 0,
        copied_from_pin_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
      },
      {
        pin_id: "25",
        places_id: "25",
        pin_name: "Busaba",
        name: "Busaba",
        lat: 51.51378200000001,
        lng: -0.134049,
        formatted_address: "106-110 Wardour St, London W1F 0TR, UK",
        rating: 4,
        types: ["restaurant"],
        notes: "Frontend Engineer",
        user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
        pin_photo_url: "https://source.unsplash.com/1600x900/",
        places_photo_url: "https://source.unsplash.com/1600x900/",
        maps_url: "https://maps.example.com/place1",
        created_at: "2021-07-27T00:00:00Z",
        visited: true,
        visited_at: "2021-07-27T00:00:00Z",
        review: null,
        review_updated_at: null,
        deviation_count: 0,
        private: false,
        updated_at: "2021-07-27T00:00:00Z",
        opening_hours: null,
        phone_number: null,
        price_level: null,
        website: null,
        bookmark_count: 0,
        copied_from_pin_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
      },
      {
        pin_id: "2",
        places_id: "2",
        pin_name: "The Ivy Asia St Paul's",
        name: "The Ivy Asia St Paul's",
        lat: 51.5137197,
        lng: -0.0960783,
        formatted_address: "20 New Change, London EC4M 9AG, UK",
        rating: 4.4,
        types: ["restaurant"],
        notes: "CEO",
        user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
        pin_photo_url: "https://source.unsplash.com/1600x900/",
        places_photo_url: "https://source.unsplash.com/1600x900/",
        maps_url: "https://maps.example.com/place1",
        created_at: "2021-07-27T00:00:00Z",
        visited: true,
        visited_at: "2021-07-27T00:00:00Z",
        review: null,
        review_updated_at: null,
        deviation_count: 0,
        private: false,
        updated_at: "2021-07-27T00:00:00Z",
        opening_hours: null,
        phone_number: null,
        price_level: null,
        website: null,
        bookmark_count: 0,
        copied_from_pin_id: "b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f",
      },
    ],
  },
};
```

Given the above types and data, write a function that takes in a `PinPlace` and populates the database. Also write a function that takes in a `List` and populates the database.

Then write a function that uses these functions to populate the database with the `dummyLists` data.

Here is the DatContext:

```tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import type { Lists, List, PinPlace } from "@/types/data";
import { dummyLists } from "./mock/lists";

interface DataContextType {
  lists: Lists;
  addList: (list: List) => Promise<void>;
  addPin: (pin: PinPlace) => Promise<void>;
  deleteList: (listId: number) => Promise<void>;
  deletePin: (pinId: number) => Promise<void>;
}

// Export the data context
// This hook can be used to access the data info in the SQL Lite Database
const DataContext = createContext<DataContextType>({
  lists: {},
  addList: async () => {},
  addPin: async () => {},
  deleteList: async () => {},
  deletePin: async () => {},
});

// Database initialization and operations
const database = {
  async initializeDatabase() {
    const db = SQLite.openDatabase("mapin.db");
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
  },
  // Add database operations to Add List and Add Pin
  ...
};
```
