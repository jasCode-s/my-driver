import { z } from "zod";
import { geoPointSchema } from "./geo";
import { tripSchema } from "./trip";

/** Client -> server */
export const driverLocationEventSchema = z.object({
  location: geoPointSchema,
});
export type DriverLocationEvent = z.infer<typeof driverLocationEventSchema>;

export const driverOfferResponseEventSchema = z.object({
  tripId: z.string(),
  accept: z.boolean(),
});
export type DriverOfferResponseEvent = z.infer<typeof driverOfferResponseEventSchema>;

/** Server -> client */
export const tripOfferEventSchema = z.object({
  trip: tripSchema,
  offerExpiresAt: z.string(),
});
export type TripOfferEvent = z.infer<typeof tripOfferEventSchema>;

export const tripStatusChangedEventSchema = z.object({
  trip: tripSchema,
});
export type TripStatusChangedEvent = z.infer<typeof tripStatusChangedEventSchema>;

export const driverLocationUpdateEventSchema = z.object({
  tripId: z.string(),
  driverId: z.string(),
  location: geoPointSchema,
});
export type DriverLocationUpdateEvent = z.infer<typeof driverLocationUpdateEventSchema>;

export const SOCKET_EVENTS = {
  DRIVER_LOCATION: "driver:location",
  DRIVER_ONLINE: "driver:online",
  DRIVER_OFFLINE: "driver:offline",
  DRIVER_OFFER_RESPOND: "driver:offer:respond",
  TRIP_OFFER: "trip:offer",
  TRIP_STATUS_CHANGED: "trip:status_changed",
  DRIVER_LOCATION_UPDATE: "driver:location_update",
} as const;
