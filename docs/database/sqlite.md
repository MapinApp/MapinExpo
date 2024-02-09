# Creating the SQLite Database

```python
import sqlite3
from sqlite3 import Error

class SQLiteDB:
    """
    SQLite Database class for generating the database file
    - SQLite does not support the decimal data type directly. Use REAL instead of DECIMAL.
    - Remove Array data type from the table. Use TEXT instead, with comma separated values.
    - Replace jsonb with TEXT data type.
    - remove DEFAULT NOW(). This MUST come from the application
    - replace UUID with TEXT data type
    - remove  prefix from table names
    """

    create_places_sql = """
        CREATE TABLE places (
            places_id text PRIMARY KEY,
            name text NOT NULL,
            formatted_address text NOT NULL,
            lat REAL NOT NULL, -- Latitude, decimal degrees format
            lng REAL NOT NULL, -- Longitude, decimal degrees format
            types TEXT NOT NULL,
            maps_url text NOT NULL,
            website text,
            price_level int,
            opening_hours TEXT,
            phone_number text,
            created_at timestamptz NOT NULL,
            updated_at timestamptz NOT NULL,
            places_photo_url text NOT NULL
        );
    """

    create_pins_sql = """
       CREATE TABLE pins (
            pin_id TEXT PRIMARY KEY,
            places_id TEXT REFERENCES places(places_id) ON DELETE SET NULL,
            user_id TEXT NOT NULL,
            list_id TEXT REFERENCES lists(list_id) ON DELETE CASCADE NOT NULL,
            pin_photo_url TEXT,
            pin_name TEXT NOT NULL,
            notes text,
            created_at timestamptz NOT NULL,
            updated_at timestamptz NOT NULL,
            visited boolean DEFAULT FALSE NOT NULL,
            visited_at timestamptz NOT NULL,
            copied_from_pin_id TEXT REFERENCES pins(pin_id) ON DELETE SET NULL,
            deviation_count int DEFAULT 0 NOT NULL,
            review text,
            rating smallint CHECK (rating >= 0 AND rating <= 5),
            review_updated_at timestamptz,
            bookmark_count int DEFAULT 0 NOT NULL, -- Number of times this pin has been bookmarked
            is_private boolean DEFAULT FALSE  NOT NULL
        );
    """

    create_lists_sql = """
        CREATE TABLE lists (
            list_id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            name TEXT NOT NULL,
            description TEXT,
            created_at timestamptz NOT NULL,
            updated_at timestamptz NOT NULL,
            is_private boolean DEFAULT FALSE NOT NULL,
            list_photo_url TEXT,
            followers_count int DEFAULT 0 NOT NULL -- Number of users following this list
        );
    """

    def __init__(self, db_file):
        self.db_file = db_file
        self.conn = None

    def create_connection(self):
        """ create a database connection to a SQLite database """
        conn = None
        try:
            self.conn = sqlite3.connect(self.db_file)
            print(f"SQLite Version: {sqlite3.version}")
        except Error as e:
            print(e)
        finally:
            if conn:
                conn.close()

    def create_tables(self):
        # Create Table
        if self.conn is None:
            self.create_connection()
        # Execute all SQL
        cursor = self.conn.cursor()
        cursor.execute(self.create_places_sql)
        cursor.execute(self.create_pins_sql)
        cursor.execute(self.create_lists_sql)
        # Create Index on Lists Table
        self.conn.commit()

if __name__ == '__main__':
    import os

    # Delete the database file if it exists
    if os.path.exists("./mapin.db"):
        os.remove("./mapin.db")

    # Create the database
    sqlite = SQLiteDB("./mapin.db")
    sqlite.create_tables()
```
