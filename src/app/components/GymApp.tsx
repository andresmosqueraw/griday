"use client"; // Indica que este es un Client Component

import { useState } from 'react';
import GymHabitTracker from './GymHabitTracker';
import HabitCalendarTracker from './HabitCalendarTracker';

export default function GymApp() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div>
      {showCalendar ? (
        // Mostrar CalendarTracker si showCalendar es true
        <HabitCalendarTracker habitName={''} habitKey={''} icon={undefined} />
      ) : (
        // Mostrar GymHabitTracker si showCalendar es false
        <GymHabitTracker onShowCalendar={() => setShowCalendar(true)} />
      )}
    </div>
  );
}