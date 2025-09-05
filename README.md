# Catalan Travel React App

A modern React application for Catalan Travel tour booking with integrated Stripe payments.

## Features

- 🎯 Modern React with TypeScript and Vite
- 💳 Stripe payment integration for tour bookings
- 📱 Responsive design with mobile-first approach
- 🌐 Multi-page routing with React Router
- 📊 Google Sheets integration for dynamic timetables
- 📝 Form validation with React Hook Form
- 🎨 Beautiful UI with custom CSS styling
- 📊 Facebook Pixel tracking integration

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

```bash
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# API Configuration  
VITE_API_BASE_URL=http://localhost:3001

# Google Sheets API (optional)
VITE_GOOGLE_SHEETS_API_KEY=your_google_api_key_here

# Facebook Pixel
VITE_FACEBOOK_PIXEL_ID=667357176346364
```

### 2. Stripe Setup

1. Create a Stripe account at [https://stripe.com](https://stripe.com)
2. Get your publishable key from the Stripe dashboard
3. Update `VITE_STRIPE_PUBLISHABLE_KEY` in your `.env` file
4. For production, you'll need to set up a backend server to handle payment intents

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Payment Integration

### Current Implementation

The app includes a complete Stripe payment form with:
- Card element for secure card input
- Payment method creation
- Form validation and error handling
- Success/failure states

### Backend Requirements

For production use, you'll need a backend server to:
1. Create payment intents
2. Handle webhooks for payment confirmation
3. Process booking data
4. Send confirmation emails

Example backend endpoints needed:
- `POST /api/create-payment-intent`
- `POST /api/confirm-payment`
- `POST /api/webhooks/stripe`

### Alternative Payment Solutions

If Stripe doesn't work for your use case, you can easily replace it with:
- **PayPal**: Using `@paypal/react-paypal-js`
- **Square**: Using Square's Web SDK
- **LiqPay**: For Ukrainian market
- **WayForPay**: Another Ukrainian payment processor

## Tour Booking Features

- **Greece Tours**: From €289, departing from Lviv
- **Istanbul Tours**: From €99, departing from multiple Ukrainian cities
- **Dynamic pricing**: Based on tour type and options
- **Form validation**: Comprehensive form validation for booking details
- **Payment processing**: Secure payment handling with Stripe

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── BookingForm.tsx
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── GreecePage.tsx
│   ├── IstanbulPage.tsx
│   ├── AboutPage.tsx
│   └── ContactsPage.tsx
├── services/           # API services
│   └── paymentService.ts
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles.css          # Global styles
```

## Deployment

### Netlify (Recommended)

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

3. Configure environment variables in Netlify dashboard

### Vercel

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Traditional Hosting

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder contents to your web server

## Revenue Cat Alternative

Since Revenue Cat is primarily for mobile app subscriptions, this React implementation uses Stripe which offers:

- **Better web integration**: Native web components and APIs
- **Flexible payment options**: One-time payments, subscriptions, installments
- **Global coverage**: Supports 135+ currencies and international cards
- **Ukrainian market**: Works well with Ukrainian banks and cards
- **Lower fees**: Competitive pricing for European transactions

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Tours

1. Add tour data to the homepage cards
2. Create a new page component in `pages/`
3. Add route to `App.tsx`
4. Update navigation in `Header.tsx`
5. Configure pricing in `paymentService.ts`

## Support

For questions or issues:
- Email: catalan.tur@gmail.com
- Phone: +380 67 608 43 73

## License

This project is proprietary to Catalan Travel.