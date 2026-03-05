import { format, isSameMonth, isToday, isSameDay } from "date-fns";

export default function CalendarCell({
  day,
  monthStart,
  events,
  selectedDate,
  onDateSelect,
}) {
  const baseBg = !isSameMonth(day, monthStart)
    ? "bg-gray-50 text-gray-400"
    : "bg-white";

  const isSelected = selectedDate && isSameDay(day, selectedDate);

  return (
    <div
      onClick={() => onDateSelect(day)}
     className={`flex-1 border-r border-b border-gray-200 p-3 flex flex-col cursor-pointer transition
  ${
    isSelected
      ? "bg-blue-200"
      : !isSameMonth(day, monthStart)
      ? "bg-gray-50 text-gray-400"
      : "bg-white hover:bg-blue-50"
  }
`}
    >
      <div
        className={`text-sm font-medium ${
          isToday(day)
            ? "bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-full"
            : ""
        }`}
      >
        {format(day, "d")}
      </div>
    </div>
  );
}
