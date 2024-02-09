## 🚀 ToDo

- [x] Get Theme & Components Working Properly
- [x] Come up with Sign up Design
  - [X](https://dribbble.com/shots/13845336-Sign-in-UI)
- [x] Get Layouts Working Properly
- [ ] Get Router Working Properly
  - Including Lists ToDo Starter Code
- [ ] Add the SQL for the Lists Data. This will be replacement for the data context that i used before.
  - [Good Blog](https://www.jsparling.com/using-hooks-and-context-with-sqlite-for-expo-in-react-native/)
- [ ] Add Map component
- [x] Get Auth Working
- [ ] Implement OAuth
  - [Twitter Expo Example](https://github.com/expo/examples/tree/master/with-twitter-auth)
  - [Facebook Expo Example](https://github.com/expo/examples/tree/master/with-facebook-auth)
- [ ] Get Data Layer Working
- [x] Check ifg username is taken
- [x] Typography and Fonts
- [ ] Add In the Chat UI
- [ ] Use the Booking UI to start off the List UI
- [ ] Will need to implement a Full Text Search
  - https://supabase.com/docs/guides/database/full-text-search
- [ ] Add routes to Website
  - `/reset-password`
  - `/welcome`
- [ ] Add Permissions Request
  - [ ] Location
  - [ ] Notifications
  - [Docs](https://docs.expo.dev/guides/permissions/)
- [ ] Deep linking for directions to a pin
  - [Docs](https://docs.expo.dev/guides/linking/)
- [ ] When Ready, test on a [Development Build](https://docs.expo.dev/develop/development-builds/introduction/). Wil need to test Deep Linking, Permissions etc.
- [ ] Add [Splash Screen](https://docs.expo.dev/router/appearance/#splash-screen) Until Posts are loaded
- [ ] Configure a [Custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp) Server for Email
- [ ] Register people via refferal only. This will emphasise the importance of the community.
- [ ] Reach out to influencers to get them to use the app, and advertiser
- [ ] Soft Deletes and Activity Logs
- [ ] Update RLS for Private Pins and Lists
- [ ] Audituing Trails for Data Science later down the line
- [ ] Generative AI for List Pictures
- [ ] Push Notifications
- [ ] Deep linking for References
- [ ] Use [API Routes for Google Places](https://docs.expo.dev/router/reference/api-routes/)
  - [OpenAI Example](https://github.com/expo/examples/tree/master/with-openai)
- [ ] Account Deletion Option according to [Google Play Policy](https://support.google.com/googleplay/android-developer/answer/13327111)

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
