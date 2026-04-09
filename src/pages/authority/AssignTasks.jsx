import { useState } from "react";
import { Search, TimerReset } from "lucide-react";
import TaskCard from "../../components/layout/taskCard";
import { MOCK_REPORTS } from "../../data/mockData";
import { mapReportsToTasks } from "../../lib/utils";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "assigned", label: "Assigned" },
  { key: "unassigned", label: "Unassigned" },
  { key: "completed", label: "Completed" },
];

export default function AssignTasks() {
  const tasks = mapReportsToTasks(MOCK_REPORTS);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      activeFilter === "all"
        ? true
        : activeFilter === "assigned"
          ? task.assigned
          : activeFilter === "unassigned"
            ? !task.assigned
            : task.completed;

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const matchesSearch =
      normalizedQuery.length === 0 ||
      task.id.toLowerCase().includes(normalizedQuery) ||
      task.description.toLowerCase().includes(normalizedQuery) ||
      task.category.toLowerCase().includes(normalizedQuery);

    return matchesFilter && matchesSearch;
  });

  const unassignedCount = tasks.filter((task) => !task.assigned).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="min-h-screen bg-[#081121] text-white">
      <div className="border-b border-white/10 bg-[#0f1b31]/95 px-6 py-5 backdrop-blur-xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-900/40">
              <TimerReset className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
                Assign Tasks
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                <span className="font-semibold text-amber-400">
                  {unassignedCount} awaiting assignment
                </span>
                <span className="mx-2 text-slate-600">|</span>
                <span className="font-semibold text-emerald-400">
                  {completedCount} completed
                </span>
                <span className="mx-2 text-slate-600">|</span>
                {tasks.length} total tasks
              </p>
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <div className="relative min-w-0 lg:min-w-[320px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search tasks, reports, categories..."
                className="w-full rounded-xl border border-white/10 bg-[#101d35] py-3 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                activeFilter === filter.key
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-900/40"
                  : "bg-[#152541] text-slate-300 hover:bg-[#1a2d4f]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="rounded-3xl border border-white/10 bg-[#0d172c] shadow-2xl shadow-black/20">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">
                Task List
              </h2>
              <p className="text-sm text-slate-400">
                Showing {filteredTasks.length} task
                {filteredTasks.length === 1 ? "" : "s"} for{" "}
                {FILTERS.find((filter) => filter.key === activeFilter)?.label}
              </p>
            </div>
            <div className="rounded-full bg-[#152541] px-3 py-1 text-sm text-slate-300">
              {filteredTasks.length}
            </div>
          </div>

          <div className="space-y-4 p-5">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-[#0b1427] px-6 py-12 text-center">
                <p className="text-lg font-medium text-slate-200">
                  No tasks match this view
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Try a different filter or clear your search to see more tasks.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
