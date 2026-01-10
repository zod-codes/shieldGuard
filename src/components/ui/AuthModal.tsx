import { X, Mail, Lock, User, Phone, Loader2, AlertCircle } from 'lucide-react';
import { useState, useCallback, useEffect, useRef } from 'react';
import { FormInput } from '../FormInput';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

interface FormData {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  fullName?: string;
  phone?: string;
  confirmPassword?: string;
  general?: string;
}

const INITIAL_FORM_STATE: FormData = {
  email: '',
  password: '',
  fullName: '',
  phone: '',
  confirmPassword: ''
};

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Refs for focus management
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    // Focus the first input when modal opens
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);

    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    };

    // Focus trap
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, isLoading]);

  // Validation
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (mode === 'signup') {
      // Full name validation
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      } else if (formData.fullName.length < 2) {
        newErrors.fullName = 'Please enter your full name';
      }

      // Phone validation
      const phoneRegex = /^\+?[\d\s\-()]+$/;
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }

      // Confirm password validation
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, mode]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/' + mode, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      console.log('Form submitted:', mode, formData);

      setIsSuccess(true);

      // Close modal after success
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData(INITIAL_FORM_STATE);
      }, 1500);

    } catch (error) {
      setErrors({
        general: `Something went wrong. Please try again. ${error}`
      });
    } finally {
      setIsLoading(false);
    }
  }, [formData, mode, onClose, validateForm]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    // Clear error for this field
    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }));
  }, []);

  const switchMode = useCallback(() => {
    setMode(prevMode => prevMode === 'login' ? 'signup' : 'login');
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 id="modal-title" className="text-2xl font-bold text-gray-900">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h3>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close modal"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* General error message */}
          {errors.general && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{errors.general}</p>
            </div>
          )}

          {/* Success message */}
          {isSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                {mode === 'login' ? 'Successfully signed in!' : 'Account created successfully!'}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                <FormInput
                  ref={firstInputRef}
                  label="Full Name"
                  icon={User}
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  disabled={isLoading}
                  error={errors.fullName}
                  required
                />

                <FormInput
                  label="Phone Number"
                  icon={Phone}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  disabled={isLoading}
                  error={errors.phone}
                  required
                />
              </>
            )}

            <FormInput
              ref={mode === 'login' ? firstInputRef : undefined}
              label="Email Address"
              icon={Mail}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              disabled={isLoading}
              error={errors.email}
              required
              autoComplete="email"
            />

            <FormInput
              label="Password"
              icon={Lock}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={isLoading}
              error={errors.password}
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />

            {mode === 'signup' && (
              <FormInput
                label="Confirm Password"
                icon={Lock}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={isLoading}
                error={errors.confirmPassword}
                required
                autoComplete="new-password"
              />
            )}

            {mode === 'login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={isLoading}
                  className="text-sm text-teal-600 hover:text-teal-700 transition-colors disabled:opacity-50"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {mode === 'signup' && (
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  disabled={isLoading}
                  className="mt-1 mr-2 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <button
                    type="button"
                    disabled={isLoading}
                    className="text-teal-600 hover:underline disabled:opacity-50"
                  >
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    disabled={isLoading}
                    className="text-teal-600 hover:underline disabled:opacity-50"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>{mode === 'login' ? 'Signing In...' : 'Creating Account...'}</span>
                </>
              ) : (
                <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>

            {/* Mode Switch */}
            <div className="text-center text-sm text-gray-600">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={switchMode}
                    disabled={isLoading}
                    className="text-teal-600 hover:text-teal-700 font-semibold transition-colors disabled:opacity-50"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={switchMode}
                    disabled={isLoading}
                    className="text-teal-600 hover:text-teal-700 font-semibold transition-colors disabled:opacity-50"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}