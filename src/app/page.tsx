import HabitCalendarTracker from './components/HabitCalendarTracker';
import { Dumbbell, Moon, Briefcase, Book, Sun, Coffee, Utensils, Film } from 'lucide-react'; // Importar íconos adicionales
import Navbar from './components/Navbar';

const habits = [
  {
    name: 'Gym (Bryan Johnson)',
    key: 'gym',
    icon: <Dumbbell className="text-white w-6 h-6" />
  },
  {
    name: 'Dormirme antes de las 10pm',
    key: 'sleep',
    icon: <Moon className="text-white w-6 h-6" />
  },
  {
    name: 'Trabajar (Researcher, CEO, Software Engineer)',
    key: 'work',
    icon: <Briefcase className="text-white w-6 h-6" />
  },
  {
    name: 'Estudiar inglés',
    key: 'study',
    icon: <Book className="text-white w-6 h-6" />
  },
  {
    name: 'No dormir en el día',
    key: 'no-sleep-day',
    icon: <Sun className="text-white w-6 h-6" />
  },
  {
    name: 'Desayuno saludable y completo',
    key: 'healthy-breakfast',
    icon: <Coffee className="text-white w-6 h-6" />
  },
  {
    name: 'Almuerzo saludable y completo',
    key: 'healthy-lunch',
    icon: <Utensils className="text-white w-6 h-6" />
  },
  {
    name: 'Cena saludable y completa',
    key: 'healthy-dinner',
    icon: <Utensils className="text-white w-6 h-6" />
  },
  {
    name: 'No pornografia',
    key: 'no-porn',
    icon: <Film className="text-white w-6 h-6" />
  }
];

export default function Home() {
  return (
    <div className="h-screen">
      {/* Navbar fija */}
      <Navbar />

      {/* Contenedor principal sin scrollbar */}
      <main className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
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