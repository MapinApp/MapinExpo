import { createContext, useContext, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";

// lists
// pins
// addPin
// addList
// deletePin
// deleteList

const DataContext = createContext<DataContext | undefined>(undefined);

export const DataProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Use the following function to open the database
  async function openDatabase(
    pathToDatabaseFile: string
  ): Promise<SQLite.SQLiteDatabase> {
    if (
      !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
        .exists
    ) {
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "SQLite"
      );
    }
    await FileSystem.downloadAsync(
      Asset.fromModule(require(pathToDatabaseFile)).uri,
      FileSystem.documentDirectory + "SQLite/mapin.db"
    );
    // opens the database named mapin.db
    return SQLite.openDatabase("mapin.db");
  }

  const db = await openDatabase("/sqlite/mapin");
  const readOnly = true;

  // Not Async as we don't need to wait for the result
  // For getUsers, we pass in a function that takes the array that the query returns as its parameter. We will pass in a function that can take the users from the query and set the state.
  const getUsers = (setUserFunc) => {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from users", [], (_, { rows: { _array } }) => {
          setUserFunc(_array);
        });
      },
      // Error callback
      (t, error) => {
        console.log("db error load users");
        console.log(error);
      },
      // Success callback
      (_t, _success) => {
        console.log("loaded users");
      }
    );
  };

  // For insertUser, we pass in a successFunc that will be called after the insert has happened. In our case, we are passing in the function to refresh the users from the database. This way we know that our state will reflect what is in the database.
  const insertUser = (userName, successFunc) => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into users (name) values (?)", [userName]);
      },
      (t, error) => {
        console.log("db error insertUser");
        console.log(error);
      },
      (t, success) => {
        successFunc();
      }
    );
  };

  const dropDatabaseTablesAsync = async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "drop table users",
          [],
          // Error callback
          (_, result) => {
            resolve(result);
          },
          // Success callback
          (_, error) => {
            console.log("error dropping users table");
            reject(error);
          }
        );
      });
    });
  };

  const setupUsersAsync = async () => {
    return new Promise((resolve, _reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql("insert into users (id, name) values (?,?)", [
            1,
            "john",
          ]);
        },
        // Error callback
        (t, error) => {
          console.log("db error insertUser");
          console.log(error);
          resolve();
        },
        // Success callback
        (t, success) => {
          resolve(success);
        }
      );
    });
  };

  const executeSqlAsync = async () => {
    await db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync("SELECT COUNT(*) FROM USERS", []);
      console.log("Count:", result.rows[0]["COUNT(*)"]);
    }, readOnly);
  };

  // Load Data from Supabase on LoadS
  useEffect(() => {
    let isMounted = true;
    // Get List Data
    getList().then((json) => {
      if (!isMounted) return;
      if (json != null) {
        const loadedLists = JSON.parse(json);
        setLists(loadedLists ?? []);
      } else {
        setLists([]);
      }
    });
    // Get Pin Data
    getPin().then((json) => {
      if (!isMounted) return;
      if (json != null) {
        const loadedPins = JSON.parse(json);
        setPins(loadedPins ?? []);
      } else {
        setPins([]);
      }
    });

    // Get User Data if session is null
    getUser().then((json) => {
      if (!isMounted) return;
      if (json != null && !session) {
        const loadedUser = JSON.parse(json);
        setUser(loadedUser ?? {});
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DataContext.Provider
      value={{
        user,
        lists,
        pins,
        addList,
        addPin,
        deleteList,
        deletePin,
        setUser,
        clearUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  // The component manages its own state (isDBLoadingComplete) to indicate when the database loading is complete.
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

  // When the app starts up, we want to set up the database tables if they haven’t already been setup, and insert some initial data. When working in dev, we may want to drop the existing tables to start clean, so we include a function call for that, which we can comment out in prod.
  useEffect(() => {
    async function loadDataAsync() {
      try {
        await database.dropDatabaseTablesAsync();
        await database.setupDatabaseAsync();
        await database.setupUsersAsync();
        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []);

  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }

  return context;
};
