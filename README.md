# Mapin

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

## Screens

```mermaid
stateDiagram-v2
    state "CEO" as ceo
    state "T. H. Eboss" as ceo
    ceo --> devmngr
    ceo --> admmngr
    ceo --> law

    state "Dev. Manager" as devmngr
    state "Alice" as devmngr
    devmngr --> dev

    state "Development Team" as dev
    state "Bob" as dev
    state "Charles" as dev
    state "David" as dev
    state "Eveline" as dev

    state "Adm. Manager" as admmngr
    state "Florence" as admmngr
    admmngr --> adm

    state "Administration Team" as adm
    state "Grace" as adm
    state "Holt" as adm
    state "Ivan" as adm

    state "Lawyer" as law
    state "John" as law
```

## Colors

Light:
BG: background: linear-gradient(to top, #eeeeee 0%, #f4f5fa 100%);
Text: color: rgb(95, 95, 95);

## 🚀 ToDo

- [ ] Replace Alers with Modal
- [ ] Check ifg username is taken
- [ ] Typography and Fonts
- [ ] Design
  - Inspiration:
    - https://dribbble.com/nikitinteam

## Scripts

Replace Spaces with Underscores:
`for f in *\ *; do mv "$f" "${f// /_}"; done`

## Data

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
