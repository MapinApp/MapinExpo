# **Mapin**

- 24 August 2021 v1
- 04 April 2022 v2
- 11 March 2023 v3
- 30 Jan 2024 v4

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
- For the 'Add Pin' feature, make the process as streamlined as possible to encourage quick and frequent use

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
- **Community Engagement**: Gamification: Introduce elements like badges or rewards for users who contribute regularly by adding pins, reviews, or engaging with the community.
- Consider features that allow users to organize meet-ups or group visits to popular destinations, fostering real-world community building.
- Offline Functionality: Can view and edit pins and lists when they don't have an internet connection.

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

## Business Plan

### Monetization Strategy

How do you plan to monetize the app?

Collaborations with local tourism boards and travel companies are being considered. These partnerships could involve promoting curated experiences or special deals, which would provide users with unique travel options and generate revenue through affiliate marketing.

- Affiliate marketing with local businesses
- Consider potential partnerships for revenue generation, like local tourism boards or travel companies?
- Integration with Existing Services: In addition to Google Maps and Yelp, consider partnerships with local travel agencies or tourist information centers to provide exclusive content or deals.

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

## AI Integration

### Gen AI for Generating Lists

One way to implement generative AI into the Mapin travel app would be to automate the process of generating travel itineraries for users.

Here's a possible approach:

1.  Collect user data: Gather information about the user's preferences, travel history, budget, and other relevant factors.
2.  Generate itinerary options: Use a generative model to generate several travel itinerary options based on the user dat- The model could take into account factors such as destination, activities, transportation, and accommodations.
3.  Present options to user: Display the generated itineraries to the user, along with any relevant details and pricing information. The user can then select the itinerary they prefer or provide feedback for further refinement.
4.  Refine itinerary: If the user provides feedback, use the generative model again to refine the itinerary based on the feedback. Repeat this process until the user is satisfied with the itinerary.
5.  Book travel: Once the user has selected an itinerary, the app can automatically book travel arrangements such as flights, hotels, and tours.

This approach would allow users to quickly and easily generate travel itineraries without having to spend hours researching and planning. It could also provide personalized recommendations based on the user's preferences, making the travel experience more enjoyable and fulfilling.

## Competition

- Differentiation from Competitors: Mapin differentiates itself by focusing on the social networking aspect of travel planning, allowing users to connect with friends and influencers for recommendations. Unlike TripAdvisor or Google Maps, Mapin emphasizes personal and community-based experiences rather than just ratings and reviews.
- User Attraction Strategy: To attract users from established platforms, Mapin will focus on creating a unique user experience centered around community engagement, and personalized content curation. Additionally, influencer partnerships and targeted marketing campaigns will be critical in drawing users to try the app.
