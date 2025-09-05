import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { HomePage } from './pages/HomePage';
import { GreecePage } from './pages/GreecePage';
import { IstanbulPage } from './pages/IstanbulPage';
import { AboutPage } from './pages/AboutPage';
import { ContactsPage } from './pages/ContactsPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import BookingWizard from './components/BookingWizard';
import './styles.css';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_51234567890abcdef');

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/greece" element={<GreecePage />} />
                <Route path="/istanbul" element={<IstanbulPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/booking" element={<BookingWizard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </Elements>
    </QueryClientProvider>
  );
}

export default App;