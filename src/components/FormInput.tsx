import { type LucideIcon } from 'lucide-react';
import { type InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  name: string;
  error?: string;
  props?: string[];
}

export function FormInput({
  label,
  icon: Icon,
  name,
  error,
  className = '',
  ...props
}: FormInputProps) {
  const inputId = `input-${name}`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        />
        <input
          id={inputId}
          name={name}
          className={`
            w-full pl-10 pr-4 py-3 
            border rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-0
            text-gray-800
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
