"use client"; // Indica que este es un Client Component

import { useState } from 'react';
import GymHabitTracker from './GymHabitTracker';
import GymCalendarTracker from './GymCalendarTracker';

export default function GymApp() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div>
      {showCalendar ? (
        // Mostrar GymCalendarTracker si showCalendar es true
        <GymCalendarTracker />
      ) : (
        // Mostrar GymHabitTracker si showCalendar es false
        <GymHabitTracker onShowCalendar={() => setShowCalendar(true)} />
      )}
    </div>
  );
}