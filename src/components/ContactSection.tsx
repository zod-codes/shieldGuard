import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Get In Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="mb-6">Contact Information</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4"
                  style={{ backgroundColor: 'rgba(0, 191, 165, 0.1)' }}
                >
                  <Phone size={20} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <h4 className="mb-1">Phone</h4>
                  <p className="text-gray-600">+7 (495) 123-45-67</p>
                  {/* <p className="text-gray-600">+1 (555) 987-6543</p> */}
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
                  <h4 className="mb-1">Email</h4>
                  <p className="text-gray-600">info@shieldguard.com</p>
                  <p className="text-gray-600">support@shieldguard.com</p>
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
                  <h4 className="mb-1">Office</h4>
                  <p className="text-gray-600">Moscow, 123, Primyrnaya St</p>
                  {/* <p className="text-gray-600">New York, NY 10001</p> */}
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="mb-4">Business Hours</h4>
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
                <label className="block text-sm font-medium text-gray-700 mb-2" id='name'>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 text-gray-800"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" id='email'>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" id='phone'>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 text-gray-800"
                  />
                </div>
              </div>

              <div className='w-auto'>
                <label className="block text-sm font-medium text-gray-700 mb-2" id='subject'>
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
                <label className="block text-sm font-medium text-gray-700 mb-2" id='message'>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 text-gray-800 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg text-white transition-colors flex items-center justify-center space-x-2"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
