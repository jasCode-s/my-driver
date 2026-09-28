export const USER_ROLES = ["rider", "driver"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const TRIP_STATUSES = [
  "requested",
  "accepted",
  "driver_en_route",
  "in_progress",
  "completed",
  "cancelled",
] as const;
export type TripStatus = (typeof TRIP_STATUSES)[number];
