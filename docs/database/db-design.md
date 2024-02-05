# Design

To aid with DB Design, first I think through the data I'll need on each page, and therefore the API calls I'll need to make to the DB. From there, I will be able to design the DB.

By understanding the data needed for each screen, you can identify the entities in your database, their attributes, and the relationships between them.

### 1. Identify Entities and Attributes

- **User**: Attributes might include user details, login credentials, date of birth, etc.
- **Pin**: Details about the places like name, location (coordinates), notes, tags, privacy status (public/private).
- **List**: Information about lists including name, description, privacy status, and a reference to the pins included.
- **Review**: User reviews for pins, including rating, text, date, etc.
- **Notifications**: Details about notifications, like type, content, associated pin or list, etc.

### 2. Define Relationships

- **User-Pin**: Users can create multiple pins. A pin is created by a single user but can be copied or bookmarked by others.
- **User-List**: Users can have multiple lists. A list belongs to one user but can be followed by others.
- **List-Pin**: A list can contain multiple pins. A pin can belong to multiple lists.
- **User-Review**: Users can write multiple reviews. Each review is associated with one user and one pin.
- **Notifications**: Related to users, pins, and lists based on the action that triggers the notification.

### 3. Consider Additional Entities for Advanced Features

- **Search**: For storing search history or preferences.
- **Settings**: User-specific settings, like notification preferences, account settings, etc.
- **User Interactions**: Tracking follows, likes, or other social interactions.

### 4. Designing API Calls

- For each screen, determine the necessary API calls. For example:
  - **Home Screen**: API calls to fetch recent activities, suggested pins/lists, etc.
  - **Profile Screen**: Fetch user details, their lists, pins, and reviews.
  - **Map Screen**: Retrieve pins based on location data or filters.

### 5. Addressing Performance and Scalability

- Consider how the database will handle large amounts of data, especially for pins and user interactions.
- Implement indexing on frequently searched fields like location data in pins, user names, etc.

### 6. Security and Privacy

- Ensure user data, especially for features like date of birth or private lists/pins, is securely stored.
- Implement access controls in your API to ensure users can only access or modify their data.

### 7. Flexibility for Future Features

- Design the database with scalability in mind, allowing for the addition of new features like collaborative lists or advanced search filters.

# Design Prompt

To get ChatGPT to understand D2:

```text
Here is the schema for the database. It is a diagram entity-relationship diagram (ERDs).Each key of a SQL Table shape defines a row.The primary value (the thing after the colon) of each row defines its type. The constraint value of each row defines its SQL constraint.I define a foreign key connection between two tables by using the `->` operator between two rows.
```

# DB Improvements

- **Indexing for Performance Optimization:** Indexing: Depending on the queries you anticipate, consider adding indexes to frequently queried columns (e.g., `username` in profiles, `places_id` in pins) to enhance query performance. (And FK columns)
- Review data types for all fields to ensure they are optimal for the expected data. For example, `rating` in the reviews table could be a smaller integer type if you have a fixed rating scale.
