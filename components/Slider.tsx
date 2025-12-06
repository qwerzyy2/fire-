import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  unit?: string;
  highlight?: boolean;
  description?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 100,
  onChange,
  unit = '',
  highlight = false,
  description
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`p-4 rounded-xl border transition-all duration-200 ${highlight ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
      <div className="flex justify-between items-end mb-2">
        <div>
          <label className="text-sm font-semibold text-gray-600 block">{label}</label>
          {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
        </div>
        <div className={`font-mono font-bold text-lg ${highlight ? 'text-emerald-700' : 'text-gray-800'}`}>
          {unit === '¥' ? '¥' : ''}{value.toLocaleString()}{unit !== '¥' ? unit : ''}
        </div>
      </div>
      
      <div className="relative w-full h-8 flex items-center group">
        {/* Track Background */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          {/* Filled Bar */}
          <div 
            className={`h-full rounded-full ${highlight ? 'bg-emerald-500' : 'bg-blue-500'}`} 
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Visual Thumb/Knob */}
        <div 
          className={`absolute h-5 w-5 rounded-full shadow-md border-2 border-white pointer-events-none transition-transform duration-75 ease-out ${highlight ? 'bg-emerald-600' : 'bg-blue-600'}`}
          style={{ 
            left: `calc(${percentage}% - 10px)` // Center the 20px knob (10px offset)
          }} 
        />

        {/* Invisible Interactive Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10 touch-none"
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 font-mono mt-1">
        <span>{unit === '¥' ? '¥' : ''}{min.toLocaleString()}{unit !== '¥' ? unit : ''}</span>
        <span>{unit === '¥' ? '¥' : ''}{max.toLocaleString()}{unit !== '¥' ? unit : ''}</span>
      </div>
    </div>
  );
};