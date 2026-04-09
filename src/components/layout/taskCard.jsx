import { useState } from "react";
import { CalendarDays, Truck, Users } from "lucide-react";
import { MOCK_TEAMS, WASTE_CATEGORIES } from "../../data/mockData";

const severityClasses = {
  CRITICAL: "bg-red-500/15 text-red-300 border border-red-500/20",
  HIGH: "bg-orange-500/15 text-orange-300 border border-orange-500/20",
  MEDIUM: "bg-amber-500/15 text-amber-300 border border-amber-500/20",
  LOW: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20",
};

export default function TaskCard({ task }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(task.teamId || "");

  const team = MOCK_TEAMS.find((entry) => entry.id === task.teamId);
  const wasteCategory = WASTE_CATEGORIES[task.category];

  return (
    <div
      onClick={() => setExpanded((current) => !current)}
      className="cursor-pointer rounded-2xl border border-white/10 bg-[#111d35] p-5 transition-all hover:border-cyan-400/30 hover:bg-[#142340]"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium tracking-wide text-slate-400">
              {task.id}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                severityClasses[task.severity] || severityClasses.MEDIUM
              }`}
            >
              {task.severity}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                task.completed
                  ? "bg-emerald-500/15 text-emerald-300"
                  : task.assigned
                    ? "bg-sky-500/15 text-sky-300"
                    : "bg-amber-500/15 text-amber-300"
              }`}
            >
              {task.completed
                ? "Completed"
                : task.assigned
                  ? "Assigned"
                  : "Unassigned"}
            </span>
          </div>

          <h3 className="mt-3 text-xl font-semibold leading-snug text-slate-50">
            {task.description}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <span className="rounded-full bg-[#172846] px-3 py-1">
              {wasteCategory?.label || task.category}
            </span>
            <span className="rounded-full bg-[#172846] px-3 py-1">{task.ward_id}</span>
            <span className="rounded-full bg-[#172846] px-3 py-1">
              {task.status}
            </span>
          </div>
        </div>

        <div className="flex min-w-[180px] flex-col items-start gap-2 rounded-2xl border border-white/8 bg-[#0d172c] px-4 py-3 lg:items-end">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Deadline
          </p>
          <p className="text-base font-semibold text-slate-100">
            {task.deadline}
          </p>
          <p className="text-xs text-slate-500">
            {task.assigned ? "Team already allocated" : "Waiting for allocation"}
          </p>
        </div>
      </div>

      {expanded && (
        <div className="mt-5 border-t border-white/10 pt-5">
          {task.assigned ? (
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-[#0b1427] p-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Users className="h-4 w-4 text-cyan-300" />
                  Assigned Team
                </div>
                <p className="mt-2 text-base font-semibold text-slate-100">
                  {team?.name || "Team unavailable"}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {team?.members?.join(", ") || "Members not listed"}
                </p>
              </div>

              <div className="rounded-2xl bg-[#0b1427] p-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Truck className="h-4 w-4 text-emerald-300" />
                  Vehicle
                </div>
                <p className="mt-2 text-base font-semibold text-slate-100">
                  {team?.vehicle || "Vehicle pending"}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Specialty: {team?.specialization || "General cleanup"}
                </p>
              </div>

              <div className="rounded-2xl bg-[#0b1427] p-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CalendarDays className="h-4 w-4 text-amber-300" />
                  Timeline
                </div>
                <p className="mt-2 text-base font-semibold text-slate-100">
                  {task.completed ? "Ready for closure review" : "Work in progress"}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Due by {task.deadline}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-[#0b1427] p-4">
              <p className="text-sm font-medium text-slate-300">
                Assign a cleanup team
              </p>
              <div className="mt-3 flex flex-col gap-3 lg:flex-row">
                <select
                  onClick={(event) => event.stopPropagation()}
                  value={selectedTeam}
                  onChange={(event) => setSelectedTeam(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#111d35] px-4 py-3 text-sm text-slate-100 focus:border-emerald-400 focus:outline-none"
                >
                  <option value="">Select Team</option>
                  {MOCK_TEAMS.map((teamOption) => (
                    <option key={teamOption.id} value={teamOption.id}>
                      {teamOption.name} ({teamOption.vehicle})
                    </option>
                  ))}
                </select>

                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    console.log("Assigning:", selectedTeam);
                  }}
                  className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
                >
                  Confirm Assignment
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
