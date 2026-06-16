# Information Architecture and User Flows

## Sitemap

```mermaid
flowchart TD
  App["MrDTwice"]

  App --> Nav["Global navigation"]
  Nav --> Home["Home<br/>/"]
  Nav --> Places["Discover Places<br/>/places"]
  Nav --> About["About<br/>/about"]
  Nav --> AddPlace["Add Place drawer"]

  Home --> Places
  Home --> Detail["Place Detail<br/>/places/:id"]
  Places --> Detail
  About --> Places
  About --> AddPlace
  AddPlace --> Detail
  AddPlace --> Places
```

## Page Structure

```mermaid
flowchart TD
  Home["Home /"] --> HomeHero["Hero with search"]
  Home --> HomeCategories["Category shortcuts"]
  Home --> HomeRegions["Recommended Regions"]
  Home --> HomeNear["Places Near You"]
  Home --> HomeTop["Top Rated Places"]

  Places["Discover Places /places"] --> PlacesSearch["Text search"]
  Places --> PlacesFilters["Country, region, category filters"]
  Places --> PlacesCount["Result count"]
  Places --> PlacesGrid["Place card grid"]

  Detail["Place Detail /places/:id"] --> DetailBreadcrumb["Breadcrumb"]
  Detail --> DetailImage["Main image"]
  Detail --> DetailHeader["Title, category, location"]
  Detail --> DetailRating["Rating summary"]
  Detail --> DetailAbout["About text"]
  Detail --> DetailInfo["Details card"]
  Detail --> DetailReviews["Reviews list"]
  Detail --> DetailReviewForm["Add Review form"]

  About["About /about"] --> AboutHero["Story hero"]
  About --> AboutIntro["Intro text"]
  About --> AboutStats["Stats"]
  About --> AboutPlaces["Inspirational places"]
  About --> AboutPrinciples["Project principles"]
  About --> AboutCta["Final CTA"]

  AddPlace["Add Place drawer"] --> AddTitle["Title"]
  AddPlace --> AddDescription["Description"]
  AddPlace --> AddCategory["Category"]
  AddPlace --> AddLocation["Country, region, city"]
  AddPlace --> AddImage["Image upload"]
```

## Main Actions

```mermaid
flowchart LR
  SearchHome["Search from Home"] --> PlacesSearch["/places?search=..."]
  CategoryShortcut["Category shortcut"] --> PlacesCategory["/places?category=..."]
  RegionShortcut["Region shortcut"] --> PlacesRegion["/places?region=..."]
  PlaceCard["Place card"] --> Detail["/places/:id"]
  AddPlaceButton["Add Place button"] --> AddPlaceDrawer["Add Place drawer"]
  ExplorePlaces["Explore places CTA"] --> Places["/places"]
  ShareDiscovery["Share a discovery CTA"] --> AddPlaceDrawer
```

## User Flows

### Search and Discover

```mermaid
flowchart LR
  A["Open Home"] --> B["Enter search term"]
  B --> C["Submit search"]
  C --> D["Open /places with search applied"]
  D --> E["Open a place card"]
  E --> F["View place detail"]
```

### Browse Catalog

```mermaid
flowchart LR
  A["Open /places"] --> B["Use search or filters"]
  B --> C["Update result count and cards"]
  C --> D["Open a place card"]
  D --> E["View place detail"]
```

### Add a Place

```mermaid
flowchart LR
  A["Click Add Place"] --> B["Open drawer"]
  B --> C["Fill required fields"]
  C --> D["Upload image"]
  D --> E["Submit"]
  E --> F{"After save"}
  F --> G["Show new place detail"]
  F --> H["Return to catalog"]
```

### Add a Review

```mermaid
flowchart LR
  A["Open place detail"] --> B["Click Add Review"]
  B --> C["Enter name"]
  C --> D["Select rating"]
  D --> E["Write review"]
  E --> F["Submit"]
  F --> G["Update reviews and average rating"]
```

## MVP Decisions

```mermaid
flowchart TD
  MVP["MVP decisions"]
  MVP --> NoAuth["No authentication"]
  MVP --> ReviewName["Reviewer name collected in review form"]
  MVP --> Drawer["Add Place is a drawer, not a page"]
  MVP --> StaticRegions["Recommended Regions can be static"]
  MVP --> StaticNear["Places Near You can be static"]
  MVP --> LegalLinks["Footer legal links can be placeholders"]
```
