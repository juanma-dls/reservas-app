import { Moon, Sun } from 'lucide-react';
import { useTheme } from './teme-provider';

export function ModeToggle({ stopPropagation = false }: { stopPropagation?: boolean }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div
      className="flex items-center space-x-2"
      onPointerDown={stopPropagation ? e => e.stopPropagation() : undefined}
    >
      <Sun className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-yellow-400'}`} />
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={isDark}
          onChange={e => handleThemeChange(e.target.checked)}
        />
        <span className="w-12 h-6 rounded-full bg-yellow-300 dark:bg-indigo-400 transition-colors"></span>
        <span
          className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform
            ${isDark ? 'translate-x-6' : 'translate-x-0'}`}
        />
      </label>
      <Moon className={`h-5 w-5 ${isDark ? 'text-indigo-300' : 'text-gray-400'}`} />
    </div>
  );
}