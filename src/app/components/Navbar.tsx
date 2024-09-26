export default function Navbar() {
    return (
      <nav className="bg-gray-800 p-4 text-white fixed top-0 left-0 right-0 shadow-lg z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-lg font-semibold">Griday</div>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-400 transition">Inicio</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">Hábitos</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">Configuración</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }  