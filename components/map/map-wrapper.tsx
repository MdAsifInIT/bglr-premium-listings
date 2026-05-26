"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface PropertyMarker {
  id: string;
  title: string;
  price: number;
  latitude: number;
  longitude: number;
}

interface MapWrapperProps {
  properties: PropertyMarker[];
  onBoundsChange: (bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number }) => void;
}

export const MapWrapper: React.FC<MapWrapperProps> = ({ properties, onBoundsChange }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if ((window as any).google?.maps) {
      setTimeout(() => setLoaded(true), 0);
      return;
    }
    const callbackName = "initMapCallback";
    (window as any)[callbackName] = () => setLoaded(true);

    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=${callbackName}&libraries=marker`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      delete (window as any)[callbackName];
    };
  }, []);

  useEffect(() => {
    if (!loaded || !mapRef.current) return;

    const google = (window as any).google;
    const isDark = theme === "dark";

    const darkStyles = [
      { elementType: "geometry", stylers: [{ color: "#1e1b4b" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#09090b" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#71717a" }] },
    ];
    
    const lightStyles = [
      { elementType: "geometry", stylers: [{ color: "#f5f5f4" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#52525b" }] },
    ];

    if (!googleMapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 12.9716, lng: 77.5946 }, // Bangalore
        zoom: 12,
        mapId: "NAMMA_LIVING_MAP_ID", // Required for AdvancedMarkerElement
        styles: isDark ? darkStyles : lightStyles,
        disableDefaultUI: true,
      });
      googleMapRef.current = map;

      const listener = map.addListener("idle", () => {
        const bounds = map.getBounds();
        if (!bounds) return;
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();

        if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = setTimeout(() => {
          onBoundsChange({
            minLat: sw.lat(),
            maxLat: ne.lat(),
            minLng: sw.lng(),
            maxLng: ne.lng(),
          });
        }, 350);
      });

      return () => {
        google.maps.event.removeListener(listener);
        if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
      };
    } else {
      googleMapRef.current.setOptions({ styles: isDark ? darkStyles : lightStyles });
    }
  }, [loaded, onBoundsChange, theme]);

  useEffect(() => {
    const map = googleMapRef.current;
    const google = (window as any).google;
    if (!map || !loaded || !google) return;

    markersRef.current.forEach((m) => m.map = null);
    markersRef.current = [];

    properties.forEach((prop) => {
      const pricePill = document.createElement("div");
      pricePill.className = "bg-emerald-700 dark:bg-emerald-800 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-md whitespace-nowrap border-[1.5px] border-white dark:border-zinc-900 transition-transform hover:scale-110 hover:bg-emerald-600 dark:hover:bg-emerald-700 cursor-pointer";
      pricePill.innerText = `₹${prop.price.toLocaleString("en-IN")}`;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: prop.latitude, lng: prop.longitude },
        map,
        title: prop.title,
        content: pricePill,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="color: #18181b; font-family: sans-serif; padding: 4px; max-width: 200px;">
            <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600;">${prop.title}</h4>
            <p style="margin: 0; font-size: 13px; color: #047857; font-weight: 500;">
              ₹${prop.price.toLocaleString("en-IN")}
            </p>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      markersRef.current.push(marker);
    });
  }, [properties, loaded]);

  return (
    <div className="w-full h-full relative bg-stone-100 dark:bg-zinc-950 flex items-center justify-center text-zinc-500">
      <div ref={mapRef} className="absolute inset-0 w-full h-full" />
      {!loaded && <p className="text-sm">Loading Bangalore Premium Map...</p>}
    </div>
  );
};
