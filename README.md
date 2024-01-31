# Mapin

Expo React Native App for Mapin

## 📁 Folder Structure

```
/docs         - Documentation
/shared       - Shared Components
  /assets     - Images, Fonts, etc
  /components - All Components. Most low level components, e.g. Text
  /context    - Contexts used to manage global state. Auth & Data
  /constants  - Constants used throughout the app
  /lib        - Contains Functions, Hooks & Supabase Client
/app          - Routing Folder. Each file becomes a route
  /(app)      - Logged in app
  /(auth)     - Auth Screens
```

## 📱 Screens Overview

```mermaid
stateDiagram-v2
    state "/" as entry
    entry --> auth
    entry --> app

    state "(auth)" as auth
    auth --> logIn
    auth --> signUp
    auth --> forgotPassword

    state "log-in" as logIn
    state "forgot-password" as forgotPassword

    state "sign-up" as signUp
    signUp --> details
    signUp --> user
    signUp --> dob
    signUp --> dobWhy
    signUp --> tc

    state "details" as details
    state "user" as user
    state "dob" as dob
    state "dob-why" as dobWhy
    state "terms-and-conditions" as tc

    state "(app)" as app
    app --> home
    app --> map
    app --> addPin
    app --> lists
    app --> profile

    state "home" as home
    home --> feed
    home --> explore

    state "feed" as feed
    feed --> pinVisited
    feed --> listUpdated
    feed --> notifications
    feed --> copyPin

    state "pin-visited" as pinVisited
    pinVisited --> pinVisitedId

    state "[pinId]" as pinVisitedId

    state "list-updated" as listUpdated
    listUpdated --> listUpdatedId

    state "[listId]" as listUpdatedId

    state "notifications" as notifications
    state "copy-pin" as copyPin

    state "explore" as explore
    explore --> discover
    explore --> searchResults

    state "discover" as discover
    discover --> discoverId

    state "[discoverId]" as discoverId

    state "search-results" as searchResults
    searchResults --> searchResultId

    state "[searchResultId]" as searchResultId

    state "map" as map

    state "add-pin" as addPin

    state "lists" as lists
    lists --> list
    lists --> createList

    state "[listId] inc Bookmarks" as list
    list --> listPinId

    state "[pinId]" as listPinId

    state "profile" as profile
    profile --> settings
    profile --> allPins
    profile --> profileList
    profile --> reviews

    state "settings" as settings
    settings --> userFeedback

    state "user-feedback" as userFeedback

    state "all-pins" as allPins
    allPins --> allPinsId

    state "[pinId]" as allPinsId

    state "profile-lists" as profileList
    profileList --> profileListId

    state "[listId]" as profileListId

    state "reviews" as reviews
    reviews --> reviewsId

    state "[reviewId]" as reviewsId
```

## 💾 DataBase

# Schema

![Mapin Database](/docs/database/img/mapin_v11.svg)

## API Structure

| **<br>**           | **Description**                  | **API id** | **Type** | **API Request**                                   | **Policies**                         | **URL** | **Body Keys** |
| ------------------ | -------------------------------- | ---------- | -------- | ------------------------------------------------- | ------------------------------------ | ------- | ------------- |
| **Register/Login** | OAuth Sign in                    | 1          |          |                                                   |                                      |         |               |
| **<br>**           | Register                         | 2          | POST     | POST to Profile to update private details         | User can only edit their own profile |         |               |
|                    | Edit Profile                     | 3          | PATCH    |                                                   |                                      |         |               |
| **Feed**           | Get Feed                         | 4          | GET      | GET Updates for Pins in Lists a user is following |                                      |         |               |
| **<br>**           | Get Pin Info on Feed             | 5          | GET      | GET single Pin Info                               |                                      |         |               |
| **<br>**           | Comment on a Pin                 | 6          | POST     | POST a comment to a Pin                           |                                      |         |               |
| **<br>**           | Copy Pin                         | 7          | POST     | Copy Pin. Update derivation number on Pin         |                                      |         |               |
| **Explore**        | Popular Pins                     | 8          | GET      | GET popular Pins                                  |                                      |         |               |
| **<br>**           | Follow List                      | 9          | POST     | Follow list                                       |                                      |         |               |
| **Map**            | Fetch all Nearby Pins            | 10         | GET      | GET Pins with Filters (List)                      |                                      |         |               |
| **Add Pin**        | Post a new Pin                   | 11         | POST     | New Pin                                           |                                      |         |               |
| **Pins**           | Get ALL Pins                     | 12         | GET      | Get all Pins                                      |                                      |         |               |
| **<br>**           | Get 1 Pin                        | 13         | GET      | Get detail 1 Pin                                  |                                      |         |               |
| **<br>**           | Update 1 Pin as vistied          | 14         | UPDATE   | Update 1 Pin as visited                           |                                      |         |               |
| **<br>**           | Update Pin                       | 15         | UPDATE   | Update detail on 1 pin                            |                                      |         |               |
| **My Lists**       | Get Lists Overview               | 16         | GET      | GET lists                                         |                                      |         |               |
| **<br>**           | Get 1 List Detail                | 17         | GET      | Get 1 list Details                                |                                      |         |               |
| **<br>**           | Get 1 Pin Detail                 | 18         | GET      | Get 1 Pin Detail                                  |                                      |         |               |
| **Profile**        | Pin number, Followers, Following | 19         | GET      | Get Person Details                                |                                      |         |               |
| **<br>**           | Lists- own; get all. else Public | 20         | GET      | Get Lists for Profile                             |                                      |         |               |
| **<br>**           | All Pins (Public/Private)        | 21         |          |                                                   |                                      |         |               |
| **Settings**       | User Feedback                    | 22         | POST     | Send user feedback                                |                                      |         |               |
