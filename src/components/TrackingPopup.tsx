import { X, MapPin, Package, Truck, CheckCircle, Clock } from 'lucide-react';

interface TrackingPopupProps {
  isOpen: boolean;
  trackingNumber: string;
  onClose: () => void;
}

export function TrackingPopup({ isOpen, onClose, trackingNumber }: TrackingPopupProps) {
  if (!isOpen) return null;

  const journeyStages = [
    {
      status: 'completed',
      title: 'Order Placed',
      location: 'Washington, DC',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-10">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between" style={{ backgroundColor: 'var(--primary)' }}>
          <div className="text-white">
            <h3 className="text-white mb-1">Track Shipment</h3>
            <p className="opacity-90">№ {trackingNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {/* Current Status Card */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <MapPin size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                    In Transit
                  </span>
                </div>
                <h4 className="mb-1">Current Location</h4>
                <p className="text-gray-600 mb-2">Sorting Center, Kazan</p>
                <div className="flex items-center text-gray-500">
                  <Clock size={16} className="mr-2" />
                  <span>Updated: Jan 2, 2026, 9:45 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="space-y-4">
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
                  <div className={`flex items-start space-x-4 pb-4 ${isPending ? 'opacity-50' : ''}`}>
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
                      <p className="text-gray-600 mb-1">{stage.location}</p>
                      <p className="text-gray-500">{stage.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Estimated Delivery */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center space-x-3">
              <Clock size={20} style={{ color: 'var(--primary)' }} />
              <div>
                <p className="text-sm text-gray-600">Estimated Delivery Date</p>
                <p className="font-semibold">anuary 4, 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
