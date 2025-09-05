# 🎯 Stripe Payment Setup Guide

## 📋 Prerequisites

Your React app already has Stripe integration built-in! You just need to configure it with your actual Stripe account.

## 🔑 Step 1: Get Stripe Keys

1. **Create Account**: Go to [stripe.com](https://stripe.com) and sign up
2. **Access Dashboard**: Navigate to [dashboard.stripe.com](https://dashboard.stripe.com)
3. **Get API Keys**: Go to **Developers → API Keys**
4. **Copy Keys**:
   - **Publishable Key**: `pk_test_...` (for frontend)
   - **Secret Key**: `sk_test_...` (for backend - keep this secure!)

## 🔧 Step 2: Configure Frontend

1. **Open your `.env` file** in the `catalan-travel` folder
2. **Replace the placeholder** with your real Stripe publishable key:

```bash
# Replace this line:
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_STRIPE_KEY_HERE

# With your actual key:
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51HwJR2SIc5ChYyDLNhAEYRGLGTywtxxx...
```

3. **Restart your app** after updating the `.env` file:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm start
```

## 💳 Step 3: Test Payments

### Test Card Numbers (Stripe provides these):

- **Successful Payment**: `4242 4242 4242 4242`
- **Declined Payment**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

**Use any future date for expiry and any 3-digit CVC**

### Testing Process:

1. **Open your app**: `http://localhost:3000`
2. **Go to a tour page** (Greece or Istanbul)
3. **Fill out the booking form**
4. **Enter payment amount** (e.g., 50 EUR)
5. **Use test card**: `4242 4242 4242 4242`
6. **Complete payment**

## 🏗️ Step 4: Backend Setup (Required for Production)

Your current setup works for testing, but for real payments you need a backend server.

### Option A: Simple Node.js Backend

Create a simple Express server to handle payment intents:

```javascript
// server.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, customerName, customerEmail } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: currency.toLowerCase(),
      metadata: {
        customerName,
        customerEmail
      }
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
```

### Option B: Use Stripe Checkout (Easier)

For a simpler solution, you can redirect to Stripe's hosted checkout page instead of handling cards directly in your app.

## 🌍 Step 5: Ukrainian Payment Support

### Supported Cards in Ukraine:
- ✅ **Visa** - Widely accepted
- ✅ **Mastercard** - Widely accepted  
- ✅ **Local Ukrainian cards** - Many work internationally

### Currency Setup:
```javascript
// In your payment configuration
{
  amount: 289, // Your tour price
  currency: 'eur', // Euros
  // Or use 'uah' for Ukrainian Hryvnia
}
```

## 🚀 Step 6: Go Live

When ready for real payments:

1. **Complete Stripe Account Verification**
2. **Switch to Live Keys**:
   - Replace `pk_test_...` with `pk_live_...`
   - Use live secret key in backend
3. **Update Environment**:
   ```bash
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
   ```

## 🛡️ Security Best Practices

1. **Never expose secret keys** in frontend code
2. **Always validate payments** on your backend
3. **Use HTTPS** in production
4. **Set up webhooks** for payment confirmations
5. **Handle errors gracefully**

## 📱 Current App Features

Your React app already includes:

- ✅ **Payment Form**: Secure card input with Stripe Elements
- ✅ **Form Validation**: Email, phone, tour selection
- ✅ **Dynamic Pricing**: €289 for Greece, €99 for Istanbul
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Success States**: Confirmation messages
- ✅ **Mobile Responsive**: Works on all devices

## 🎯 Quick Start (Testing)

1. Get Stripe test key from dashboard
2. Update `.env` file with your key
3. Restart the app: `npm start`
4. Use test card: `4242 4242 4242 4242`
5. Test a booking at `http://localhost:3000`

That's it! Your payment system is ready for testing! 🎉

## 📞 Support

For questions about this setup:
- **Stripe Docs**: [stripe.com/docs](https://stripe.com/docs)
- **React Integration**: [stripe.com/docs/stripe-js/react](https://stripe.com/docs/stripe-js/react)
