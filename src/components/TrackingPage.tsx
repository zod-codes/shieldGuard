import { useState } from 'react';
import { Package, ArrowLeft, MapPin, Truck, CheckCircle, Clock } from 'lucide-react';

interface TrackingPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TrackingPage({ isOpen, onClose }: TrackingPageProps) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setShowResults(true);
    }
  };

  if (!isOpen) return null;

  const journeyStages = [
    {
      status: 'completed',
      title: 'Order Placed',
      location: 'Moscow, Russia',
      date: 'Dec 28, 2025, 10:30 AM',
      icon: Package
    },
    {
      status: 'completed',
      title: 'Received at Warehouse',
      location: 'Moscow Warehouse',
      date: 'Dec 29, 2025, 8:15 AM',
      icon: Package
    },
    {
      status: 'completed',
      title: 'In Transit',
      location: 'Nizhny Novgorod',
      date: 'Dec 30, 2025, 2:20 PM',
      icon: Truck
    },
    {
      status: 'current',
      title: 'Arrived at Sorting Center',
      location: 'Kazan',
      date: 'Jan 2, 2026, 9:45 AM',
      icon: MapPin
    },
    {
      status: 'pending',
      title: 'On the Way to Recipient',
      location: 'Ufa',
      date: 'Expected Jan 3',
      icon: Truck
    },
    {
      status: 'pending',
      title: 'Delivered',
      location: 'Ufa, Russia',
      date: 'Expected Jan 4',
      icon: CheckCircle
    }
  ];

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
      <div className="p-4">
        {!showResults ? (
          /* Search Form */
          <div className="pt-8">
            <div className="flex items-center justify-center mb-8">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(0, 191, 165, 0.1)' }}
              >
                <Package size={40} style={{ color: 'var(--primary)' }} />
              </div>
            </div>
            <h2 className="text-center mb-2">Track Your Shipment</h2>
            <p className="text-center text-gray-600 mb-8">
              Enter your tracking number
            </p>

            <form onSubmit={handleTrack} className="space-y-4">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 text-gray-800"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg text-white transition-colors"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Track Shipment
              </button>
            </form>
          </div>
        ) : (
          /* Tracking Results */
          <div className="pb-8">
            {/* Tracking Number */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
              <p className="font-semibold">{trackingNumber || 'FD-2026-001234'}</p>
            </div>

            {/* Current Status Card */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  <MapPin size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                      In Transit
                    </span>
                  </div>
                  <h4 className="mb-1">Current Location</h4>
                  <p className="text-gray-600 mb-2">Sorting Center, Kazan</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock size={14} className="mr-2" />
                    <span>Updated: Jan 2, 2026, 9:45 AM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="space-y-4 mb-6">
              <h4 className="mb-4">Shipment History</h4>

              {journeyStages.map((stage, index) => {
                const Icon = stage.icon;
                const isCompleted = stage.status === 'completed';
                const isCurrent = stage.status === 'current';
                const isPending = stage.status === 'pending';

                return (
                  <div key={index} className="relative">
                    {/* Connecting Line */}
                    {index !== journeyStages.length - 1 && (
                      <div
                        className="absolute left-6 top-12 w-0.5 h-full -mb-4"
                        style={{
                          backgroundColor: isCompleted ? 'var(--primary)' : '#e5e7eb'
                        }}
                      />
                    )}

                    {/* Stage */}
                    <div className={`flex items-start space-x-3 pb-4 ${isPending ? 'opacity-50' : ''}`}>
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-4 border-white"
                        style={{
                          backgroundColor: isCompleted || isCurrent ? 'var(--primary)' : '#e5e7eb'
                        }}
                      >
                        <Icon size={20} className={isCompleted || isCurrent ? 'text-white' : 'text-gray-400'} />
                      </div>

                      <div className="flex-1 pt-2">
                        <h4 className={`mb-1 ${isCurrent ? 'text-black' : ''}`}>
                          {stage.title}
                        </h4>
                        <p className="text-gray-600 mb-1 text-sm">{stage.location}</p>
                        <p className="text-gray-500 text-sm">{stage.date}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Estimated Delivery */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center space-x-3">
                <Clock size={20} style={{ color: 'var(--primary)' }} />
                <div>
                  <p className="text-sm text-gray-600">Estimated Delivery Date</p>
                  <p className="font-semibold">January 4, 2026</p>
                </div>
              </div>
            </div>

            {/* New Search Button */}
            <button
              onClick={() => {
                setShowResults(false);
                setTrackingNumber('');
              }}
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
