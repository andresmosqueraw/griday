import { Dumbbell, Check } from 'lucide-react';

interface GymHabitTrackerProps {
  onShowCalendar: () => void; // Definir el prop que se pasará para cambiar el estado
}

export default function GymHabitTracker({ onShowCalendar }: GymHabitTrackerProps) {
  const completedDays = [13, 14, 15, 16, 22, 23, 27, 32, 33, 34, 35, 37, 38, 42, 52, 62, 63, 82, 102];

  return (
    <div
      className="bg-gray-900 p-6 rounded-3xl max-w-md mx-auto hover:bg-gray-900/50 cursor-pointer transition-colors" // Efecto hover agregado
      onClick={onShowCalendar} // Al hacer clic, cambiará el estado en GymApp
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gray-800 p-2 rounded-2xl">
            <Dumbbell className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold">Ir al gym</h2>
            <p className="text-gray-400 text-sm">Ir al gym</p>
          </div>
        </div>
        <button className="bg-gray-800 p-2 rounded-2xl hover:bg-gray-700 transition-colors">
          <Check className="text-white w-6 h-6" />
        </button>
      </div>
      <div className="grid grid-cols-10 gap-2">
        {[...Array(100)].map((_, index) => (
          <div
            key={index}
            className={`aspect-square rounded-lg ${
              completedDays.includes(index + 1) ? 'bg-red-400' : 'bg-gray-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
}