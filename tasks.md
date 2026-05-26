# Namma Living - Premium Bengaluru Real Estate Listings - Tasks

This file tracks the status of tasks for the bglr-premium-listings application.

## Phase 1: Initialize Project & Layout Primitives
- [x] Create project directory and file structures (empty/shell placeholders)
- [x] Implement utility classes and Firebase initialize config (`lib/utils.ts`, `lib/firebase.ts`)
- [x] Implement root layout and providers (`app/layout.tsx`, `components/providers.tsx`)
- [x] Implement global navigation (`components/navbar.tsx`)
- [x] Implement Animated Listing Card and carousel (`components/property-card.tsx`)
- [x] Implement property discovery feed with Framer Motion (`components/property-feed.tsx`)
- [x] Implement conversion-focused homepage (`app/page.tsx`)

## Phase 2: Core Implementation
- [x] Implement custom UI components (button, input, textarea, card)
- [x] Implement drag-and-drop Image Upload Compressor (`components/upload-zone.tsx`)
- [x] Implement Google Maps API Wrapper component (`components/map/`)
- [x] Implement Auth Screens with Data Connect mutations (`app/auth/`)
- [x] Implement Property Listings Management & Moderation (`app/listings/`, `app/admin/`)
- [x] Implement Dual-Panel Split Map Discovery Feed (`app/search/page.tsx`)
- [x] Implement dynamic, server-rendered detail pages (`app/property/[id]/page.tsx`)

## Phase 4: Schema & Data Architecture Extensions
- [x] Create SavedSearch and Lead models in schema (`dataconnect/schema/schema.gql`)
- [x] Append ListUserProperties, ListUserFavorites, ListUserSavedSearches queries (`dataconnect/example/queries.gql`)
- [x] Append DeleteProperty, UpdatePropertyStatus, CreateFavorite, DeleteFavorite, CreateSavedSearch, CreateLead mutations (`dataconnect/example/mutations.gql`)
- [x] Regenerate Data Connect SDK with correct forward-slash output directory paths

## Phase 5: Manage Listings Owner Dashboard
- [x] Create dashboard header with glassmorphic metrics cards (`dashboard-header.tsx`)
- [x] Create listing row with pause/activate and delete controls (`listing-row.tsx`)
- [x] Update manage listings page to fetch user listings and display dashboard (`app/listings/manage/page.tsx`)

## Phase 6: Shortlist & Saved Search Engine
- [x] Implement heart FavoriteButton with optimistic UI toggles (`components/favorite-button.tsx`)
- [x] Embed FavoriteButton overlay in PropertyCard (`components/property-card.tsx`)
- [x] Implement Shortlist feed page with loader and skeletons (`app/shortlist/page.tsx`)
- [x] Implement SaveSearchButton in Discovery Map Feed page (`app/search/components/save-search-button.tsx`)

## Phase 7: WhatsApp Agent Lead Router
- [x] Create sticky bottom (mobile) & sidebar (desktop) LeadForm (`lead-form.tsx`)
- [x] Implement Indian phone pattern validation & database lead telemetry logging
- [x] Format WhatsApp redirect message & open wa.me url in a new tab
