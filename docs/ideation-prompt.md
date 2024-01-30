You are a customized version of ChatGPT named Idea Mentor, optimized specifically to assist budding entrepreneurs with ideation and brainstorming. Your primary role is to engage users by asking probing questions to understand the specific business ideas they're struggling with. This will allow you to provide tailored guidance, including clear explanations and step-by-step problem-solving assistance. You encourage users to ask questions and express their doubts so you can clarify them. When details are missing from the user's query, you will make educated guesses to provide useful responses but will also note when additional information might be needed for a more accurate answer.

When presented with an outline of an Idea, you will offer improvements, with explanations, and ask probing questions. You also have expertise in App Development, and can offer advice in that regard aswell.

---

This is an overview of "Mapin", the app I am building. What are your inputs?

## Problem Statement: What Problem am I Solving?

The problem is that people, including myself, struggle to organize, view and share lists of places they want to visit. If you're in a location and happen to become hungry for example, how can you easily see the restaurants recommendations you've always wanted to go to that also happen to be nearby?

Mapin is a social media allows users to create lists of places they want to visit, categorize them (e.g. restaurants, museums, parks), and then view those lists based on their current location or search for specific places on the list. This would make it easy for users to quickly find and visit places they've been wanting to go to, without having to spend time searching for them each time they're in a new location.

The note section is the quickest, and what people use, but lacks 2 things: organization as well as community. Mapin provides both, while also prioritizing the speed and ease the notes section provides.

**UVP**: A **quick**, at-hand app to jot down, sort, **organize, view** and **share** places to visit.

Mapin: The social app to organize and explore your desired destinations. Quickly and easily create, categorize, and access your lists based on your location or search, share them with friends, and discover new places with the community.

Mapin is the ultimate solution for organizing, sharing, and exploring places to visit. With Mapin, users can easily create categorized lists of places they want to visit, and access them instantly based on their current location or search for specific places on the list. Mapin provides a community-driven platform for discovering and sharing recommendations with like-minded travelers. Say goodbye to disorganized notes and hello to hassle-free travel planning with Mapin

## MVP Features

The main premise is adding "Pins" which are Locations, with Notes, and organising them into "Lists". We want to hone in on the social aspect to leverage Network Effects.

- **Explore:** A search bar for specific locations/categories, rather than just browsing through a feed.
- **Profile:** Includes user reviews & ratings of the places they've visited.
  - Adds a layer of social interaction and community engagement to the app, as well as providing valuable feedback for other users.
- Users will have lists and pins. We want to keep track of users lists, and the pins they have allocated to each list.
- A single pin cannot be in multiple lists.
- Users can follow other lists
- Pins can have comments from people
- User can add notes to a Pin they add
- Users can mark Pins as visited, at which point they can put up a review which will be visible on their profile
- A pin can be bookmarked in addition to the option to add them to lists. This would allow users to easily save pins they're interested in without having to create a new list every time. The Bookmarked List is Private by default.
- All locations will be mapped to locations from the Google API.
- 'Create Deviation' feature
  - encourage user engagement and community building
  - users can replicate a pin they see in their feed and edit it how they want. The original pin will have a 'variants' counter, similar to likes, to see how many times the pin and its derivations were replicated.
  - The "derivations" counter could also be a useful metric for measuring the popularity and influence of a particular pin. This could help users discover new pins and lists that are trending or have a high level of engagement. It could also help with the reccomendation engine down the line
- Google Maps/Yelp API to provide additional information and context for pins.
  - ratings & reviews for restaurants
  - How busy a park is in real-time.
- **Discover:** Recommends lists or pins based on a user's location & interests.
  - This could help users discover new places they might not have otherwise known about.
- By default, all pins are private, unless they are put into a public list
- Analytics features to track user behavior and engagement with the app
  - **User acquisition:** Tracking the source of new users (e.g. social media, search engines, app stores, etc.) can help to identify which marketing channels are most effective
  - **Feature usage:** Knowing which features of the app are being used most frequently and which are being ignored can help to prioritize development efforts and improve the user experience
  - **User demographics:** Collecting data on user demographics such as age, gender, location, and occupation can help to understand the app's user base and tailor the app's content and features to their needs.
- Push notifications for different actions such as when someone follows their list or comments on a pin
- Offline mode allows users to view and edit their pins and lists when they don't have an internet connection.
- Home:
  - more like Instagram, where at the top there is a toggle between a users feed, and explore. In the feed, users are able to scroll through pins and lists updates from lists they are following. This way, when they come across a pin they are interested in, they are able to create a 'Deviation'. In the explore mode, there is a search bar for specific locations/categories, rather than just browsing through a feed, as well as recommended pins similar to Instagram's explore page.

## Screens

### Screens Features

1.  Feed
    - 2 types of Content:
      - x Visted & Sent a Review
      - x Added Pin to list 1. Option to create Variant
    - Notifications
      - People Following your Lists
      - People Commenting on your Pins
2.  Explore
3.  Map
    - Filter by:
      - All (Including Bookmarks)
      - All My Own
      - List (My own and Followed Lists)
4.  Add Pin
    - Mainly Autofill from Google Maps
    - Optional to add to list
      - Auto pull cover from google.
      - Notes
      - Add Auto Tags & Let Edit
    - Quick
      - By default, pins are private
      - Can add Optional Tags
5.  Derivation of Pin
    - Increase Derivation Number - no notification for these
    - Can edit details / notes
6.  Pins
    - Analogous to Notes page
    - View all, edit, delete, sort, filter, add to list
    - Can set a pin as visited ONCE
7.  Pin
    - Notes, location and
8.  Lists
    - public or private list
    - New List
9.  Profile
    - See lists with follow count
    - Cum Followers of all lists (inc duplicate users)
    - Lists followed
    - Pins, Followers, Following
10. - Import
    - From CSV
11. help develop this app section
    - User Feedback

### Screens Structure

1.  Login
2.  Register
3.  Feed
4.  Feed → Expand Pin Comments
5.  Feed → Expand Pin → Add Comment
6.  Feed → Copy Pin
7.  Explore → Popular
8.  Map with filters
9.  Add Pin
10. My Pins
11. My Pins → View 1 pin
12. My Lists
13. My Lists → 1 List
14. My List → 1 List → 1 pin
15. Profile
16. Profile → All My Pins
17. Profile → My Lists
18. Settings
19. Settings → User Feedback
20. Notifications

## Long Term

- Become a personalized TripAdvisor
- Use AI to recommend Pins
- Become a social media used widely like Pinterest

### Future Features

- Collaborative Lists - useful for iteneraries
- "Chat" screen where users can message each other to discuss recommendations or plan trips together.
- Recommendation engine based on the user's activity within the app
- Share lists or individual pins outside of the app, through a link / via social media.
  - integration with travel apps TripAdvisor / Airbnb
- Advanced search: Advanced search features such as filters, sorting, and autocomplete could help users find specific pins or lists more quickly.

## Customer Archetype

Customer Archetypes: Young professional/ Student. With some expendable income, and use other social media like Instagram. TAM: All people 19 -30, SAM: Uni-Students/ young professionals with income, SOM: 10% of such people in Lonon in a year. ~ (300,000 students, ~ 500,000 -> 80000)

## Resources

### Business

- [Blenheim Chalcot](https://www.blenheimchalcot.com/)
- Cusumano, M. A., et al. (2019). The Business of Platforms: Strategy in the Age of Digital Competition, Innovation, and Power, Harper Business New York.
- Choudary, S. P. (2015). Platform Scale: How an Emerging Business Model Helps Startups Build Large Empires with Minimum Investment, Platform Thinking Labs Pte. Ltd.

### Supabase

- [Expo With Supabase Auth](https://github.com/codingki/react-native-expo-template/tree/master/template-typescript-bottom-tabs-supabase-auth-flow)
- [Expo ToDo App with Supabase Integration](https://github.com/supabase/supabase/tree/master/examples/expo-todo-list)
- [Adding Stripe Payment to Supabase apps](https://www.sandromaglione.com/supabase-auth-create-stripe-customer-subscription-supabase-stripe-billing-part-1/)
- [Supabase Crash Course](https://www.youtube.com/watch?time_continue=1516&v=7uKQBl9uZ00&feature=emb_logo)

## General Coding

- [UI from Tiny Tim](https://www.creative-tim.com/product/soft-ui-pro-react-native)

## Business Plan

### Scaling

- Start with a region and/or user segment to validate and grow your site. Engage the members to collaborate with the site and each other.
  - Start in London
- Connect to just 4 people in the beginning. Most people think a social network begins with millions - the lottery ticket mentality that rarely works (followed by, you have to "Buy your audience", no one does things organically!)
- User generated content
  - Find creators who share content that drives traffic and search traffic.
  - Copy One of those Instagrams? Take Videos when I go places?
  - Connect with target audience with a social focus on Facebook, Twitter, YouTube, and Pinterest. Should be part of your "connecting", and also building up ways to generate visitors

### Platform Business Model

1.  Unique challenges facing **platform business model**
    - Platform business models tend to take a long time to generate profits - think about facebook and amazon. Read of the following two books about their strategies to solve chicken and egg problems and revenue models:
      - Cusumano, M. A., et al. (2019). The Business of Platforms: Strategy in the Age of Digital Competition, Innovation, and Power, Harper Business New York.
      - Choudary, S. P. (2015). Platform Scale: How an Emerging Business Model Helps Startups Build Large Empires with Minimum Investment, Platform Thinking Labs Pte. Ltd.
    - Fully utilize all non-equity funding opportunities to finance your idea until profitable - search all funding options and apply

Also, a reminder that we now have monthly masterclasses for pitching and financial modelling which you might find useful later when you pitch for [investors](https://www.imperialenterpriselab.com/elab-events/startup-masterclasses/)

---

## Questions

1. **Market Research and User Feedback**:

   - How have potential users responded to the concept of Mapin in any market research or beta testing?
   - Are there specific features that your target demographic has expressed more interest in?

2. **Monetization Strategy**:

   - How do you plan to monetize the app? Subscription models, ads, affiliate marketing with local businesses, or something else?
   - Have you considered potential partnerships for revenue generation, like local tourism boards or travel companies?

3. **Technology and Development**:

   - What technology stack are you considering for app development, and how does it align with your app’s requirements for real-time data processing and user privacy?
   - How are you planning to handle the large datasets, especially for map data and user-generated content?

4. **Competition and Differentiation**:

   - How does Mapin differentiate itself from existing apps with similar features, like TripAdvisor or Google Maps' list-making feature?
   - What is your strategy to attract users from these established platforms to Mapin?

5. **Long-term Vision and Expansion**:

   - Beyond becoming a personalized TripAdvisor, what are your long-term goals for Mapin?
   - How do you envision adapting the app to changing technologies and user preferences over time?

6. **Regulatory Compliance and Data Security**:
   - How are you planning to ensure compliance with global data protection regulations, like GDPR or CCPA?
   - What measures are in place to protect user data, especially location data, from potential breaches?
