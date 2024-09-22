"use client"

import { useState, useEffect } from 'react';
import { Dumbbell, ChevronLeft, ChevronRight } from 'lucide-react';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function GymCalendarTracker() {
  const [completedDays, setCompletedDays] = useState<{ [key: string]: number[] }>({});
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Cargar días completados desde localStorage
  useEffect(() => {
    const storedDays = localStorage.getItem('completedDays');
    if (storedDays) {
      setCompletedDays(JSON.parse(storedDays));
    }
  }, []);

  // Guardar días completados en localStorage
  useEffect(() => {
    localStorage.setItem('completedDays', JSON.stringify(completedDays));
  }, [completedDays]);

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

  // Obtener los días de un mes específico
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  };

  const days = getDaysInMonth(currentMonth);

  // Cambiar al mes anterior
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  // Cambiar al siguiente mes
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const key = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}`;

  return (
    <div className="bg-gray-900 p-6 rounded-3xl max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gray-800 p-2 rounded-2xl">
            <Dumbbell className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold">Ir al gym</h2>
            <p className="text-gray-400 text-sm">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button onClick={prevMonth} className="bg-gray-800 p-2 rounded-2xl hover:bg-gray-700 transition-colors">
            <ChevronLeft className="text-white w-6 h-6" />
          </button>
          <button onClick={nextMonth} className="bg-gray-800 p-2 rounded-2xl hover:bg-gray-700 transition-colors">
            <ChevronRight className="text-white w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-gray-400 font-medium text-center">{day}</div>
        ))}
        {Array.from({ length: (new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() + 6) % 7 }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map(day => (
          <button
            key={day}
            onClick={() => handleCheck(day)}
            className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
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