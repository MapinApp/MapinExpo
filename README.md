# Mapin

Expo React Native App for Mapin

## File Structure

```
config.ts     - Contains config
/context      - Contexts used to manage global state. Auth & Data
/lib          - Contains Functions, Hooks & Supabase Client
/components   - All Components. Most low level components, e.g. Text
/layout       - Layout components - higher level than components
/app          - Routing Folder. Each file becomes a route
  /(app)      - Logged in app
  /(auth)     - Auth Screens
```

## Screens Overview

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

## Colors

Light:
BG: background: linear-gradient(to top, #eeeeee 0%, #f4f5fa 100%);
Text: color: rgb(95, 95, 95);

## Scripts

Replace Spaces with Underscores:

```bash
for f in *\ *; do mv "$f" "${f// /_}"; done
```

## 🚀 ToDo

- [ ] Replace Alers with Modal
- [ ] Check ifg username is taken
- [ ] Typography and Fonts
- [ ] Design

- Add user location to auth context
- Add name
- add other details
- Add Feed into data
- Notifications

# Auth

- [ ] On Sign up validate unique username
  - https://supabase.com/docs/guides/database/functions
- [ ] On Sign up validate age over 13
- [ ] On Sign up Implement Gender Select

# Explore

- [ ] Will need to implement a Full Text Search
  - https://supabase.com/docs/guides/database/full-text-search

## 📝 Notes

- [Routing Docs](https://expo.github.io/router/docs/features/routing)
- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)
- [Request for Comments](https://github.com/expo/router/discussions/1)

## Routes to add to Website

- https://mapin.co.uk/reset-password
- https://mapin.co.uk/welcome

## Issues

- [Known storage limits of Async Storage](https://react-native-async-storage.github.io/async-storage/docs/limits)
