interface PaymentData {
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  tourType: string;
  departureCity: string;
}

interface PaymentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export const paymentService = {
  /**
   * Create a payment intent on the backend
   */
  async createPaymentIntent(data: PaymentData): Promise<PaymentResponse> {
    // In a real application, this would call your backend API
    // For demo purposes, we'll simulate the response
    
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    return response.json();
  },

  /**
   * Confirm payment on the backend
   */
  async confirmPayment(paymentIntentId: string, paymentMethodId: string): Promise<{ success: boolean }> {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/confirm-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentIntentId,
        paymentMethodId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to confirm payment');
    }

    return response.json();
  },

  /**
   * Get tour pricing information
   */
  getTourPricing(tourType: string): { basePrice: number; currency: string } {
    const pricing = {
      'Греція': { basePrice: 289, currency: 'eur' },
      'Стамбул': { basePrice: 99, currency: 'eur' },
    };

    return pricing[tourType as keyof typeof pricing] || { basePrice: 0, currency: 'eur' };
  },
};
