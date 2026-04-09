import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const mapReportsToTasks = (reports) => {
  return reports.map((r, index) => ({
    ...r,
    assigned: index % 3 !== 0, // some assigned, some not
    completed: r.status === "resolved",
    teamId: index % 3 !== 0 ? "TEAM-001" : null,
    deadline: "2026-04-12",
  }));
};
