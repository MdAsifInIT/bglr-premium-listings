import type { ListApprovedPropertiesData } from "@/src/dataconnect-generated";

export type SampleProperty = ListApprovedPropertiesData["properties"][number] & {
  isDemo: true;
  owner: {
    fullName: string;
    phoneNumber: string;
  };
};

export interface PropertyBounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

export const sampleListings: SampleProperty[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    __typename: "Property_Key",
    isDemo: true,
    title: "Skyline Penthouse at UB City",
    description:
      "A full-floor penthouse with private elevator access, wraparound terraces, smart-home controls, a chef's kitchen, and uninterrupted views across central Bengaluru.",
    price: 350000000,
    bhkCount: 5,
    propertyType: "Penthouse",
    listingType: "Sale",
    locality: "Vittal Mallya Road",
    latitude: 12.9715,
    longitude: 77.5945,
    imageUrls: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80&w=1600",
    ],
    owner: {
      fullName: "Namma Living Concierge",
      phoneNumber: "+91 98765 43210",
    },
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    __typename: "Property_Key",
    isDemo: true,
    title: "Courtyard Villa in Indiranagar",
    description:
      "An architect-designed villa tucked behind a quiet avenue, featuring a private courtyard, double-height living room, Italian marble, and staff quarters.",
    price: 280000000,
    bhkCount: 4,
    propertyType: "Villa",
    listingType: "Sale",
    locality: "Indiranagar",
    latitude: 12.9784,
    longitude: 77.6408,
    imageUrls: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=1600",
    ],
    owner: {
      fullName: "Aarav Mehta",
      phoneNumber: "+91 99887 76655",
    },
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    __typename: "Property_Key",
    isDemo: true,
    title: "Lakeview Residence in HSR",
    description:
      "A high-floor apartment with wide balconies, lake-facing bedrooms, bespoke wardrobes, premium clubhouse access, and two reserved parking bays.",
    price: 85000000,
    bhkCount: 3,
    propertyType: "Apartment",
    listingType: "Sale",
    locality: "HSR Layout",
    latitude: 12.9121,
    longitude: 77.6446,
    imageUrls: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1600",
    ],
    owner: {
      fullName: "Priya Rao",
      phoneNumber: "+91 91234 56789",
    },
  },
  {
    id: "44444444-4444-4444-8444-444444444444",
    __typename: "Property_Key",
    isDemo: true,
    title: "Garden Duplex in Koramangala",
    description:
      "A serene duplex home with a landscaped deck, family lounge, private study, and refined interiors close to Koramangala's dining and startup corridor.",
    price: 420000,
    bhkCount: 4,
    propertyType: "Apartment",
    listingType: "Rent",
    locality: "Koramangala",
    latitude: 12.9352,
    longitude: 77.6245,
    imageUrls: [
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=1600",
    ],
    owner: {
      fullName: "Devika Nair",
      phoneNumber: "+91 90080 07060",
    },
  },
  {
    id: "55555555-5555-4555-8555-555555555555",
    __typename: "Property_Key",
    isDemo: true,
    title: "Whitefield Estate Home",
    description:
      "A resort-style estate villa with private garden, home theatre, solar backup, pool deck, and quick access to Whitefield's technology parks.",
    price: 195000000,
    bhkCount: 5,
    propertyType: "Villa",
    listingType: "Sale",
    locality: "Whitefield",
    latitude: 12.9698,
    longitude: 77.7499,
    imageUrls: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=1600",
    ],
    owner: {
      fullName: "Karthik Shenoy",
      phoneNumber: "+91 98800 12345",
    },
  },
  {
    id: "66666666-6666-4666-8666-666666666666",
    __typename: "Property_Key",
    isDemo: true,
    title: "Sadashivanagar Heritage Bungalow",
    description:
      "A restored bungalow on a tree-lined street with expansive lawns, traditional verandahs, modern services, and rare central-city privacy.",
    price: 520000000,
    bhkCount: 6,
    propertyType: "Villa",
    listingType: "Sale",
    locality: "Sadashivanagar",
    latitude: 13.0068,
    longitude: 77.5802,
    imageUrls: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1600",
    ],
    owner: {
      fullName: "Namma Living Private Office",
      phoneNumber: "+91 98765 00001",
    },
  },
];

export function getSampleListingsWithinBounds(bounds: PropertyBounds) {
  return sampleListings.filter((property) => (
    property.latitude >= bounds.minLat &&
    property.latitude <= bounds.maxLat &&
    property.longitude >= bounds.minLng &&
    property.longitude <= bounds.maxLng
  ));
}

export function getSampleListingById(id: string) {
  return sampleListings.find((property) => property.id === id);
}
