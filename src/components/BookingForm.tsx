import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface BookingFormData {
  name: string;
  surname: string;
  phone: string;
  email: string;
  tour: string;
  departureCity: string;
  paymentAmount?: number;
}

interface BookingFormProps {
  tourType?: 'Греція' | 'Стамбул';
  departureCities?: string[];
  onSubmit?: (data: BookingFormData) => void;
  showPayment?: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  tourType,
  departureCities = [],
  onSubmit,
  showPayment = false
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentStep, setPaymentStep] = useState(false);
  
  const stripe = useStripe();
  const elements = useElements();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useForm<BookingFormData>();

  const selectedTour = watch('tour');

  const DEPARTURE_OPTIONS = {
    'Греція': ['Львів'],
    'Стамбул': ["Київ", "Біла Церква", "Умань", 'Одеса', 'Львів', 'Івано-Франківськ', 'Чернівці']
  };

  const availableCities = tourType 
    ? DEPARTURE_OPTIONS[tourType] 
    : DEPARTURE_OPTIONS[selectedTour as keyof typeof DEPARTURE_OPTIONS] || [];

  const handleFormSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    try {
      if (showPayment && !paymentStep) {
        // First step: just show payment form
        setPaymentStep(true);
        setIsSubmitting(false);
        return;
      }

      if (showPayment && paymentStep && stripe && elements) {
        const cardElement = elements.getElement(CardElement);
        
        if (!cardElement) {
          throw new Error('Payment card element not found');
        }

        // Create payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: `${data.name} ${data.surname}`,
            email: data.email,
          },
        });

        if (error) {
          throw error;
        }

        // Here you would typically send the payment method to your backend
        // to create a payment intent and process the payment
        console.log('Payment method created:', paymentMethod);
        
        // For demo purposes, we'll just simulate a successful payment
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Submit form data (original functionality)
      const formData = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value.toString());
      });

      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbzvANCni9RMC-hltRJDXETYW6ir0N0_rm4_n3ff5gatWEWzyv2Kb9QW43Cmg_VilRo/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData
        }
      );

      const result = await response.json();
      
      if (result.result === 'success') {
        setShowSuccess(true);
        reset();
        setPaymentStep(false);
        
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);

        if (onSubmit) {
          onSubmit(data);
        }
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert(`Помилка: ${error instanceof Error ? error.message : 'Сталася помилка'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#213255',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
    },
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
      <h2>{showPayment ? 'Забронювати тур' : 'Залишити заявку'}</h2>

      {!paymentStep && (
        <>
          <div className="form-row">
            <input
              type="text"
              placeholder="Ім'я"
              {...register('name', { required: "Ім'я обов'язкове" })}
            />
            <input
              type="text"
              placeholder="Прізвище"
              {...register('surname', { required: "Прізвище обов'язкове" })}
            />
          </div>
          {(errors.name || errors.surname) && (
            <div style={{ color: '#d32f2f', fontSize: '0.9rem' }}>
              {errors.name?.message || errors.surname?.message}
            </div>
          )}

          <div className="form-row">
            <input
              type="tel"
              placeholder="+380991112233"
              {...register('phone', { 
                required: "Телефон обов'язковий",
                pattern: {
                  value: /^\+?\d{10,15}$/,
                  message: "Невірний формат телефону"
                }
              })}
            />
            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Невірний формат email"
                }
              })}
            />
          </div>
          {(errors.phone || errors.email) && (
            <div style={{ color: '#d32f2f', fontSize: '0.9rem' }}>
              {errors.phone?.message || errors.email?.message}
            </div>
          )}

          <div className="form-row">
            <select
              {...register('tour', { required: "Оберіть тур" })}
              defaultValue={tourType || ''}
              style={tourType ? { pointerEvents: 'none', background: '#eee' } : {}}
            >
              <option value="">Оберіть тур</option>
              <option value="Греція">Греція</option>
              <option value="Стамбул">Стамбул</option>
            </select>
          </div>
          {errors.tour && (
            <div style={{ color: '#d32f2f', fontSize: '0.9rem' }}>
              {errors.tour.message}
            </div>
          )}

          {availableCities.length > 0 && (
            <div className="form-row">
              <select
                {...register('departureCity', { required: "Оберіть місто відправлення" })}
                disabled={availableCities.length === 1}
                style={availableCities.length === 1 ? { pointerEvents: 'none', background: '#eee' } : {}}
              >
                {availableCities.length > 1 ? (
                  <option value="">Оберіть місце відправки</option>
                ) : null}
                {availableCities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          )}
          {errors.departureCity && (
            <div style={{ color: '#d32f2f', fontSize: '0.9rem' }}>
              {errors.departureCity.message}
            </div>
          )}

          {showPayment && (
            <div className="form-row">
              <input
                type="number"
                placeholder="Сума до сплати (€)"
                min="1"
                {...register('paymentAmount', { 
                  required: "Вкажіть суму",
                  min: { value: 1, message: "Мінімальна сума 1€" }
                })}
              />
            </div>
          )}
          {errors.paymentAmount && (
            <div style={{ color: '#d32f2f', fontSize: '0.9rem' }}>
              {errors.paymentAmount.message}
            </div>
          )}
        </>
      )}

      {paymentStep && showPayment && (
        <div className="payment-section">
          <h3>Оплата картою</h3>
          <div style={{ 
            padding: '12px', 
            border: '1px solid #ccd3e0', 
            borderRadius: '9px',
            marginBottom: '16px'
          }}>
            <CardElement options={cardElementOptions} />
          </div>
          <button
            type="button"
            onClick={() => setPaymentStep(false)}
            style={{
              background: '#6c757d',
              marginRight: '10px',
              padding: '10px 20px'
            }}
          >
            Назад
          </button>
        </div>
      )}

      <button type="submit" disabled={isSubmitting || (showPayment && !stripe)}>
        <span className="btn-text" style={{ display: isSubmitting ? 'none' : 'inline' }}>
          {paymentStep ? 'Оплатити' : (showPayment ? 'Продовжити до оплати' : 'Відправити')}
        </span>
        <span className="spinner" style={{ display: isSubmitting ? 'inline-block' : 'none' }}></span>
      </button>

      {showSuccess && (
        <div style={{ display: 'block', color: '#2e7d32', padding: '10px 0', textAlign: 'center' }}>
          {showPayment ? 'Оплата успішна! Скоро ми з вами зв\'яжемося.' : 'Заявку надіслано! Скоро ми з вами зв\'яжемося.'}
        </div>
      )}
    </form>
  );
};
