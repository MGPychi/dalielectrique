"use server";

import { cache } from "react";

export const getTotalUsersCount = cache(async () => {
  return 10;
});
export const getTotalUsersCountToday = cache(async () => {
  return 1;
});
