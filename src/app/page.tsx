import HabitCalendarTracker from './components/HabitCalendarTracker';
import { Dumbbell, Moon } from 'lucide-react';
import Navbar from './components/Navbar';

const habits = [
  {
    name: 'Ir al gym',
    key: 'gym',
    icon: <Dumbbell className="text-white w-6 h-6" />
  },
  {
    name: 'Dormir bien',
    key: 'sleep',
    icon: <Moon className="text-white w-6 h-6" />
  }
  // Puedes agregar más hábitos aquí...
];

export default function Home() {
  return (
    <div className="h-screen">
      {/* Navbar fija */}
      <Navbar />

      {/* Contenedor principal sin scrollbar */}
      <main className="pt-16 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {habits.map(habit => (
          <HabitCalendarTracker
            key={habit.key}
            habitName={habit.name}
            habitKey={habit.key}
            icon={habit.icon}
          />
        ))}
      </main>
    </div>
  );
}