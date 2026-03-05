import { format } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import CalendarGrid from "./CalenderGrid";
import { useState } from "react";
export default function CalendarSection({
  currentMonth,
  onPrev,
  onNext,
  events,
  selectedDate,
  onDateSelect
}) {
 

  return (
    <div className="flex flex-col h-full p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Content Schedule
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Orchestrate your cross-platform social strategy.
        </p>
      </div>

      {/* TOOLBAR */}
      <div className="flex items-center justify-between mb-6">
        {/* LEFT TOGGLE */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button className="px-4 py-1.5 text-sm font-medium bg-white rounded-md shadow-sm">
            Month
          </button>
          <button className="px-4 py-1.5 text-sm text-gray-600">Week</button>
        </div>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm">
            <button
              onClick={onPrev}
              type="button"
              className="p-2 hover:bg-gray-50 rounded-l-lg"
            >
              <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
            </button>

            <div className="px-5 py-2 text-sm font-medium text-gray-800 border-x border-gray-200">
              {format(currentMonth, "MMMM yyyy")}
            </div>

            <button
              onClick={onNext}
              className="p-2 hover:bg-gray-50 rounded-r-lg"
            >
              <ChevronRightIcon className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <button className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-lg shadow-sm hover:bg-gray-50">
            Filters
          </button>
        </div>
      </div>

      {/* CALENDAR CONTAINER */}
      <div className="flex flex-col h-full">
        <div className="h-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <CalendarGrid
            currentMonth={currentMonth}
            events={events}
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
          />
        </div>
      </div>
    </div>
  );
}
