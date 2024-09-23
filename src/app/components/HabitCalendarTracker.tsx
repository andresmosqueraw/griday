"use client"

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

interface HabitCalendarTrackerProps {
  habitName: string;
  habitKey: string;
  icon: React.ReactNode;
}

export default function HabitCalendarTracker({ habitName, habitKey, icon }: HabitCalendarTrackerProps) {
  const [completedDays, setCompletedDays] = useState<{ [key: string]: number[] }>({});
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const storedDays = localStorage.getItem(`completedDays-${habitKey}`);
    if (storedDays) {
      setCompletedDays(JSON.parse(storedDays));
    }
  }, [habitKey]);

  useEffect(() => {
    localStorage.setItem(`completedDays-${habitKey}`, JSON.stringify(completedDays));
  }, [completedDays, habitKey]);

  const handleCheck = (day: number) => {
    const key = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}`;
    const newCompletedDays = completedDays[key]?.includes(day)
      ? completedDays[key].filter(d => d !== day)
      : [...(completedDays[key] || []), day];

    setCompletedDays({
      ...completedDays,
      [key]: newCompletedDays,
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  };

  const days = getDaysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const key = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}`;

  return (
    <div className="bg-gray-900 p-4 rounded-xl max-w-md mx-auto mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="bg-gray-800 p-1 rounded-xl">
            {icon}
          </div>
          <div>
            <h2 className="text-white text-sm font-semibold">{habitName}</h2>
            <p className="text-gray-400 text-xs">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button onClick={prevMonth} className="bg-gray-800 p-1 rounded-xl hover:bg-gray-700 transition-colors">
            <ChevronLeft className="text-white w-4 h-4" />
          </button>
          <button onClick={nextMonth} className="bg-gray-800 p-1 rounded-xl hover:bg-gray-700 transition-colors">
            <ChevronRight className="text-white w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map(day => (
          <div key={day} className="text-gray-400 text-xs font-medium text-center">{day}</div>
        ))}
        {Array.from({ length: (new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() + 6) % 7 }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map(day => (
          <button
            key={day}
            onClick={() => handleCheck(day)}
            className={`aspect-square rounded-md flex items-center justify-center text-xs font-medium transition-colors ${
              completedDays[key]?.includes(day) ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}