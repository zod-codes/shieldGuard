import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react"
import { useState, useCallback, useEffect, useRef } from 'react';
import { X, Mail, Phone, MapPin, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const {register, reset, handleSubmit} = useForm();

  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState(null);

  const accessKey = "cc10d60c-0824-42e7-833f-63a27d482adc";

  const { submit: onSubmit } = useWeb3Forms({
    access_key: accessKey,
    settings: {
      from_name: "Acme Inc",
      subject: "New Contact Message from your Website",
      // ... other settings
    },
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setResult(msg);
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setResult(msg);
    },
  });


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    onClose();
  }, [formData, onClose]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }, [formData]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 id="modal-title" className="text-2xl font-bold text-gray-900">
            Get In Touch
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <p className="text-gray-600 mb-6">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4"
                    style={{ backgroundColor: 'rgba(0, 191, 165, 0.1)' }}
                  >
                    <Phone size={20} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+7 (495) 123-45-67</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4"
                    style={{ backgroundColor: 'rgba(0, 191, 165, 0.1)' }}
                  >
                    <Mail size={20} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@findicar.com</p>
                    <p className="text-gray-600">support@findicar.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4"
                    style={{ backgroundColor: 'rgba(0, 191, 165, 0.1)' }}
                  >
                    <MapPin size={20} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-900">Office</h4>
                    <p className="text-gray-600">Moscow, 123, Primyrnaya St</p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="mb-4 font-semibold text-gray-900">Business Hours</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-0 text-gray-800"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-0 text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-0 text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-0 text-gray-800 max-w-full"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="quote">Request a Quote</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-0 text-gray-800 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
