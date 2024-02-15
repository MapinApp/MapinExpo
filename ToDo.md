## 🚀 ToDo

- [x] Have Map Component with Search
- [ ] Need to make pictures saved to db. Find a way to deduplicate the calls to the Google Places Image API. Save the image in a bucket and reference, instead of calling the API every time.
  - Can use [Serverless Functions](https://docs.expo.dev/guides/serverless-functions/) for this
  - Supabase has [Serverless Functions](https://supabase.com/edge-functions)
- [ ] Create a "add new pin" state in data context
- [ ] When clicked on a search result, pupulate the context and navigate to page
- [ ] Create page with initial data. Add in a Search Function to use google search
  - [ ] Add in extra fields like notes etc
  - [ ] Add in a "Add to List" button
- [ ] Make a pins list nullable. If the list is null, then it has not been sorted yet.
- [ ] Generate many Pins in DB
- [ ] Create a list page
  - [ ] Allow us to choose from nulled pins, or add later
- [ ] View lists using flash list
  - [ ] Figure out lists and list page from old code
  - [ ] Use the flash list to display the pins
  - [ ] Copy this code to the profile section
  - [ ] Get Lists Router working properly off of [ToDo Starter Code](https://github.com/supabase/examples-archive/tree/main/supabase-js-v1/todo-list/expo-todo-list)
  - [ ] Use the Booking UI to start off the List UI
- [ ] Deep link list to the map
  - [ ] Create state in data context for the curent map view
  - [ ] Use this to render a search result conditionally, or a List scroll
  - [ ] Use the old code for animated view
- [ ] On Map page, create the list navigation modal. Use a similar flash list from the profile page
  - [ ] Remove the modal border
- [ ] Find a way to remove my Google Places API Key from the FrontEnd. Maybe use Serverless functions
- [ ] Add a SQLite DB for the Lists-Pins Data for Offline Use
  - [Good Blog](https://www.jsparling.com/using-hooks-and-context-with-sqlite-for-expo-in-react-native/)
- [ ] Implement Local DB fallback for when the user is offline / Supabase is unreachable
  - Is this necessary? Will need to think about [Syncing](https://github.com/orgs/supabase/discussions/357) when the user comes back online
- [ ] Implement OAuth
  - [Twitter Expo Example](https://github.com/expo/examples/tree/master/with-twitter-auth)
  - [Facebook Expo Example](https://github.com/expo/examples/tree/master/with-facebook-auth)
- [ ] Add In the Chat UI
- [ ] Will need to implement a [Full Text Search](https://supabase.com/docs/guides/database/full-text-search) for lists / pins
- [ ] Reset Password
- [ ] Add Permissions Request
  - [ ] Location
  - [ ] Notifications
  - [Docs](https://docs.expo.dev/guides/permissions/)
- [ ] Deep linking for directions to a pin
  - [Docs](https://docs.expo.dev/guides/linking/)
- [ ] When Ready, test on a [Development Build](https://docs.expo.dev/develop/development-builds/introduction/). Wil need to test Deep Linking, Permissions etc.
- [ ] Add [Splash Screen](https://docs.expo.dev/router/appearance/#splash-screen) Until Posts are loaded
- [ ] Configure a [Custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp) Server for Email
- [ ] Reach out to influencers to get them to use the app, and advertise
- [ ] Soft Deletes and Activity Logs
- [ ] Update RLS for Private Pins and Lists
- [ ] Audituing Trails for Data Science later down the line
- [ ] Generative AI for List Pictures
- [ ] Push Notifications
- [ ] Deep linking for References
- [ ] Use [API Routes for Google Places](https://docs.expo.dev/router/reference/api-routes/)
  - [OpenAI Example](https://github.com/expo/examples/tree/master/with-openai)
- [ ] Account Deletion Option according to [Google Play Policy](https://support.google.com/googleplay/android-developer/answer/13327111)
- [ ] Create a way to import lists
- [ ] Create a way to moderate content
- [ ] TikTok and Instagram Integration

### Completed

- [x] Add Map component
- [x] Get Theme & Components Working Properly
- [x] Come up with Sign up Design
  - [X](https://dribbble.com/shots/13845336-Sign-in-UI)
- [x] Get Layouts Working Properly
- [x] Get Auth Working
- [x] Check ifg username is taken
- [x] Typography and Fonts
- [x] Add welcome routes to Website
- [x] Register people via refferal only. This will emphasise the importance of the community.

## 📚 Resources

### Supabase

- [Expo With Supabase Auth](https://github.com/codingki/react-native-expo-template/tree/master/template-typescript-bottom-tabs-supabase-auth-flow)
- [Expo ToDo App with Supabase Integration](https://github.com/supabase/supabase/tree/master/examples/expo-todo-list)
- [Adding Stripe Payment to Supabase apps](https://www.sandromaglione.com/supabase-auth-create-stripe-customer-subscription-supabase-stripe-billing-part-1/)
- [Supabase Crash Course](https://www.youtube.com/watch?time_continue=1516&v=7uKQBl9uZ00&feature=emb_logo)

### UI

- [UI from Tiny Tim](https://www.creative-tim.com/product/soft-ui-pro-react-native)
- [Style Ref]()

### Google Places

- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/place-data-fields)
- [Types](https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult)
- [PlaceResults](https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult)

## 📝 Docs

- [Routing Docs](https://expo.github.io/router/docs/features/routing)
- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)
- [Request for Comments](https://github.com/expo/router/discussions/1)

## Issues

- [Known storage limits of Async Storage](https://react-native-async-storage.github.io/async-storage/docs/limits)

## Deps

```bash
npx expo install @react-native-community/datetimepicker @react-native-masked-view/masked-view dayjs expo-blur expo-constants expo-haptics expo-linear-gradient
```

## Packages

- [FlashList](https://docs.expo.dev/versions/latest/sdk/flash-list/)
