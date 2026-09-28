import { z } from "zod";
import { geoPointSchema } from "./geo";
import { TRIP_STATUSES } from "./roles";

export const createTripRequestSchema = z.object({
  pickup: geoPointSchema,
  dropoff: geoPointSchema,
});
export type CreateTripRequest = z.infer<typeof createTripRequestSchema>;

export const tripStatusSchema = z.enum(TRIP_STATUSES);

export const tripSchema = z.object({
  id: z.string(),
  riderId: z.string(),
  driverId: z.string().nullable(),
  status: tripStatusSchema,
  pickup: geoPointSchema,
  dropoff: geoPointSchema,
  estimatedFareCents: z.number().int().nonnegative().nullable(),
  requestedAt: z.string(),
  acceptedAt: z.string().nullable(),
  startedAt: z.string().nullable(),
  completedAt: z.string().nullable(),
});
export type Trip = z.infer<typeof tripSchema>;

export const rateTripRequestSchema = z.object({
  stars: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});
export type RateTripRequest = z.infer<typeof rateTripRequestSchema>;
