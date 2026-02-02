import { X } from 'lucide-react';
import TrackingDisplay from './TrackingDisplay';

interface TrackingPopupProps {
  isOpen: boolean;
  trackingNumber: string;
  onClose: () => void;
}

export function TrackingPopup({ isOpen, onClose, trackingNumber }: TrackingPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">

      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div
          className="p-6 border-b border-gray-200 flex items-center justify-between flex-shrink-0"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <div className="text-white">
            <h3 className="text-white font-semibold text-lg mb-0.5">Track Shipment</h3>
            <p className="opacity-90 text-sm font-mono">№ {trackingNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors focus:outline-none"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <TrackingDisplay trackingNumber={trackingNumber} isActive={isOpen} />
        </div>
      </div>
    </div>
  );
}