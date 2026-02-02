import { useState } from 'react';
import { Package, ArrowLeft, Search, AlertCircle, Loader2, } from 'lucide-react';
import TrackingDisplay from './TrackingDisplay.tsx';

interface TrackingPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TrackingPage({ isOpen, onClose }: TrackingPageProps) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset states
    setError('');
    setShowResults(false);

    // Client-side Validation
    const cleanedNumber = trackingNumber.trim();

    if (!cleanedNumber) {
      setError('Please enter a tracking number');
      return;
    }

    if (cleanedNumber.length < 8) {
      setError('Tracking number must be at least 8 characters');
      return;
    }

    // 3. Simulate API Call with Error Handling
    setIsLoading(true);

    try {
      // Simulate network delay (remove this in real app)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock "Not Found" logic (Replace with your real API check)
      if (cleanedNumber === 'INVALID' || cleanedNumber !== 'FD-2026-001234') {
        throw new Error('Tracking number not found. Please check and try again.');
      }

      // If successful:
      setShowResults(true);
    } catch (err) {
      // Capture the error message
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShowResults(false);
    setTrackingNumber('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      
      {/* Header */}
      <div className="sticky top-0 z-10 p-4 border-b border-gray-200 flex items-center space-x-3" style={{ backgroundColor: 'var(--primary)' }}>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h3 className="text-white">Track Shipment</h3>
      </div>

      {/* Content */}
      <div className="p-4 max-w-lg mx-auto">
        {!showResults ? (
          /* --- Search Form --- */
          <div className="pt-8">
            <div className="flex items-center justify-center mb-8">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(0, 191, 165, 0.1)' }}
              >
                <Package size={40} style={{ color: 'var(--primary)' }} />
              </div>
            </div>
            <h2 className="text-center mb-2 text-xl font-semibold">Track Your Shipment</h2>
            <p className="text-center text-gray-600 mb-8">
              Enter your tracking number
            </p>

            <form onSubmit={handleTrack} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Search className="ml-1 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => {
                      setTrackingNumber(e.target.value);
                      if (error) setError(''); // Clear error when user types
                    }}
                    placeholder="Enter tracking number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 text-gray-800 pl-[8%]"
                  />
                </div>

                {/* Error Message Display */}
                {error && (
                  <div className="mt-3 flex items-center text-red-500 text-sm animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={16} className="mr-1" />
                    {error}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 rounded-lg text-white transition-colors flex items-center justify-center font-medium"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    <span>Checking...</span>
                  </div>
                ) : (
                  'Track Shipment'
                )}
              </button>
            </form>
          </div>
        ) : (
          /* --- Tracking Results (LIVE) --- */
          <div className="pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <TrackingDisplay trackingNumber={trackingNumber} isActive={showResults} />

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full mt-6 px-6 py-3 rounded-lg border-2 transition-colors"
              style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
            >
              Track Another Shipment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
