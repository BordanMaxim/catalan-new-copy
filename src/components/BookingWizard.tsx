import React, { useState, useEffect } from 'react';
import './BookingWizard.css';
import { BusLayout } from './BusLayout';

// Типы данных
interface ExcursionData {
  id: string;
  busType: string;
  priceStandard: number;
  priceEconomy: number;
  priceVip: number;
  departure: string;
  return: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  people: number;
  totalPrice: string;
  departureTime?: string;
}

interface SeatData {
  seatNumber: number;
  seatType: 'standard' | 'vip' | 'economy';
  isOccupied: boolean;
}

interface ClientInfo {
  name: string;
  surname: string;
}

interface BookingData {
  direction: string;
  city: string;
  excursionId: string;
  busType: string;
  selectedSeats: number[];
  clients: ClientInfo[];
  contactData: {
    phone: string;
    email?: string;
  };
}

const BookingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    direction: '',
    city: '',
    excursionId: '',
    busType: '',
    selectedSeats: [],
    clients: [],
    contactData: {
      phone: '',
      email: ''
    }
  });

  const [excursions, setExcursions] = useState<ExcursionData[]>([]);
  const [seats, setSeats] = useState<SeatData[]>([]);
  const [loading, setLoading] = useState(false);
  const [availableBuses, setAvailableBuses] = useState<ExcursionData[]>([]);

  // Загрузка данных из Google Sheets
  useEffect(() => {
    loadSeatsData();
  }, []);

  const loadExcursionsData = async (direction: string, city: string) => {
    try {
      setLoading(true);
      
      // Выбираем правильную таблицу в зависимости от направления
      let timetableSheet = '';
      
      if (direction === 'Греція') {
        timetableSheet = 'Timetable%20Lvov'; // Для Греции всегда Lvov
      } else if (direction === 'Стамбул') {
        timetableSheet = 'Timetable%20Odessa'; // Для Стамбула всегда Odessa (содержит все города)
      }
      
      // Загружаем данные о датах из соответствующей таблицы
      const datesResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/17lg4gBmp0Ij4aZ20-_TWOUyTASudrvThz1ixBE_8Vx4/values/${timetableSheet}!A1:Z1000?key=AIzaSyBR6dfBERIxZ2Wb--FmFB2DNmrGbcSVJ68`
      );
      const datesData = await datesResponse.json();
      
      if (datesData.values && datesData.values.length > 1) {
        const datesRows = datesData.values.slice(1);
        
        let excursionsData: ExcursionData[] = [];
        
        if (direction === 'Греція') {
          // Для Греции используем старую структуру данных
          excursionsData = datesRows
            .filter((row: any[]) => row[7]) // Только строки с Excursion ID
            .map((row: any[]) => ({
              id: row[7], // Excursion ID
              busType: '', // Будет загружен позже
              priceStandard: 0, // Будет загружен позже
              priceEconomy: 0, // Будет загружен позже
              priceVip: 0, // Будет загружен позже
              departure: row[0], // Відправлення
              return: row[1],   // Повернення
              checkIn: row[2],  // Заїзд
              checkOut: row[3], // Виїзд
              nights: parseInt(row[4]) || 0,   // Ніч
              people: parseInt(row[5]) || 0,   // Кількість людей
              totalPrice: row[6],     // Ціна
              departureTime: undefined // Для Греции нет времени отправления
            }));
        } else if (direction === 'Стамбул') {
          // Для Стамбула используем новую структуру данных
          excursionsData = datesRows
            .filter((row: any[]) => row[7]) // Только строки с Excursion ID
            .filter((row: any[]) => {
              // Фильтруем по городу отправления
              const departureCity = row[0]; // Місце відправлення
              return departureCity && departureCity.includes(city);
            })
            .map((row: any[]) => ({
              id: row[7], // Excursion ID
              busType: '', // Будет загружен позже
              priceStandard: 0, // Будет загружен позже
              priceEconomy: 0, // Будет загружен позже
              priceVip: 0, // Будет загружен позже
              departure: row[1], // Відправлення - прибуття
              return: row[1],   // Відправлення - прибуття (то же самое)
              checkIn: row[3],  // Заїзд - Виїзд
              checkOut: row[3], // Заїзд - Виїзд (то же самое)
              nights: parseInt(row[4]) || 0,   // Ніч
              people: parseInt(row[5]) || 0,   // К-сть людей
              totalPrice: row[6],     // Ціна
              departureTime: row[2]   // Час виїзду
            }));
        }
        
        setExcursions(excursionsData);
        console.log('Загружены данные экскурсий для', direction, 'из города', city, ':', excursionsData);
      }
    } catch (error) {
      console.error('Ошибка загрузки данных экскурсий:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSeatsData = async () => {
    try {
      // Загружаем данные о типах мест
      const seatTypesResponse = await fetch(
        'https://sheets.googleapis.com/v4/spreadsheets/17lg4gBmp0Ij4aZ20-_TWOUyTASudrvThz1ixBE_8Vx4/values/Seat%20Type!A1:Z1000?key=AIzaSyBR6dfBERIxZ2Wb--FmFB2DNmrGbcSVJ68'
      );
      const seatTypesData = await seatTypesResponse.json();
      
      // Загружаем данные о статусе мест (пока не используется)
      // const seatsResponse = await fetch(
      //   'https://sheets.googleapis.com/v4/spreadsheets/17lg4gBmp0Ij4aZ20-_TWOUyTASudrvThz1ixBE_8Vx4/values/Excursions%20Seats!A1:Z1000?key=AIzaSyBR6dfBERIxZ2Wb--FmFB2DNmrGbcSVJ68'
      // );
      // const seatsData = await seatsResponse.json();
      
      if (seatTypesData.values && seatTypesData.values.length > 1) {
        const seatTypesRows = seatTypesData.values.slice(1);
        
        // Создаем мапу типов мест
        const seatTypesMap = new Map();
        seatTypesRows.forEach((row: any[]) => {
          if (row[0] && row[1]) {
            seatTypesMap.set(parseInt(row[0]), row[1]);
          }
        });
        
        const seatsDataArray: SeatData[] = [];
        
        // Создаем массив мест с реальными типами
        for (let i = 1; i <= 83; i++) {
          const seatType = seatTypesMap.get(i) || 'standard';
          seatsDataArray.push({
            seatNumber: i,
            seatType: seatType as 'standard' | 'vip' | 'economy',
            isOccupied: false // Пока все места свободны
          });
        }
        
        setSeats(seatsDataArray);
        console.log('Загружены типы мест:', seatsDataArray);
      }
    } catch (error) {
      console.error('Ошибка загрузки данных мест:', error);
    }
  };

  const loadBusesForExcursion = async (excursionId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://sheets.googleapis.com/v4/spreadsheets/17lg4gBmp0Ij4aZ20-_TWOUyTASudrvThz1ixBE_8Vx4/values/Excursions%20Bus%20Info!A1:Z1000?key=AIzaSyBR6dfBERIxZ2Wb--FmFB2DNmrGbcSVJ68'
      );
      const data = await response.json();
      
      if (data.values && data.values.length > 1) {
        const rows = data.values.slice(1);
        
        // Фильтруем автобусы для выбранной экскурсии
        const busesForExcursion = rows
          .filter((row: any[]) => row[0] === excursionId)
          .map((row: any[]) => ({
            id: row[0],
            busType: row[1],
            priceStandard: parseInt(row[2]) || 0,
            priceEconomy: parseInt(row[3]) || 0,
            priceVip: parseInt(row[4]) || 0,
            departure: '',
            return: '',
            checkIn: '',
            checkOut: '',
            nights: 0,
            people: 0,
            totalPrice: ''
          }));
        
        setAvailableBuses(busesForExcursion);
        console.log('Загружены автобусы для экскурсии', excursionId, ':', busesForExcursion);
      }
    } catch (error) {
      console.error('Ошибка загрузки автобусов:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDirectionSelect = (direction: string) => {
    setBookingData(prev => ({ ...prev, direction }));
    setCurrentStep(2);
  };

  const handleCitySelect = (city: string) => {
    setBookingData(prev => ({ ...prev, city }));
    loadExcursionsData(bookingData.direction, city); // Загружаем данные экскурсий для выбранного города
    setCurrentStep(3);
  };

  const handleExcursionSelect = (excursionId: string) => {
    setBookingData(prev => ({ ...prev, excursionId }));
    loadBusesForExcursion(excursionId);
    setCurrentStep(4);
  };

  const handleBusSelect = (busType: string) => {
    setBookingData(prev => ({ ...prev, busType }));
    setCurrentStep(5);
  };

  const handleSeatSelect = (seatNumber: number) => {
    setBookingData(prev => ({
      ...prev,
      selectedSeats: prev.selectedSeats.includes(seatNumber)
        ? prev.selectedSeats.filter(s => s !== seatNumber)
        : [...prev.selectedSeats, seatNumber]
    }));
  };

  const handleClientDataSubmit = (clients: ClientInfo[], contactData: any) => {
    setBookingData(prev => ({ ...prev, clients, contactData }));
    setCurrentStep(7);
  };

  const calculateTotalPrice = () => {
    if (!bookingData.busType) return 0;
    
    const bus = availableBuses.find(b => b.busType === bookingData.busType);
    if (!bus) return 0;
    
    let total = 0;
    bookingData.selectedSeats.forEach(seatNumber => {
      const seat = seats.find(s => s.seatNumber === seatNumber);
      if (seat) {
        switch (seat.seatType) {
          case 'standard':
            total += bus.priceStandard;
            break;
          case 'economy':
            total += bus.priceEconomy;
            break;
          case 'vip':
            total += bus.priceVip;
            break;
        }
      }
    });
    
    return total;
  };

  const submitBooking = async () => {
    try {
      setLoading(true);
      
      const bookingPayload = {
        excursionId: bookingData.excursionId,
        seats: bookingData.selectedSeats,
        email: bookingData.contactData.email || '',
        phone: bookingData.contactData.phone,
        solicitation: bookingData.direction,
        departure_city: bookingData.city,
        clients: bookingData.clients,
        busType: bookingData.busType
      };

      const response = await fetch('https://script.google.com/macros/s/AKfycbyZGeVrPJMEEL83NfY2zu38-unITUmPGAmuVt86Ud0Bp9L2lgNK2HDBK-EA2skXcEw/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload)
      });

      if (response.ok) {
        alert('Бронирование успешно отправлено!');
        // Сброс формы или переход на главную страницу
        setCurrentStep(1);
        setBookingData({
          direction: '',
          city: '',
          excursionId: '',
          busType: '',
          selectedSeats: [],
          clients: [],
          contactData: {
            phone: '',
            email: ''
          }
        });
      } else {
        alert('Ошибка при отправке бронирования. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Ошибка отправки бронирования:', error);
      alert('Ошибка при отправке бронирования. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <DirectionSelector onSelect={handleDirectionSelect} />;
      case 2:
        return <CitySelector 
          direction={bookingData.direction} 
          onSelect={handleCitySelect}
          onBack={() => setCurrentStep(1)}
        />;
      case 3:
        return <DateSelector 
          direction={bookingData.direction}
          city={bookingData.city}
          excursions={excursions}
          loading={loading}
          onSelect={handleExcursionSelect}
          onBack={() => setCurrentStep(2)}
        />;
      case 4:
        return <BusSelector 
          excursionId={bookingData.excursionId}
          availableBuses={availableBuses}
          onSelect={handleBusSelect}
          onBack={() => setCurrentStep(3)}
        />;
      case 5:
        return <SeatSelector 
          excursionId={bookingData.excursionId}
          busType={bookingData.busType}
          seats={seats}
          selectedSeats={bookingData.selectedSeats}
          onSeatSelect={handleSeatSelect}
          onNext={() => setCurrentStep(6)}
          onBack={() => setCurrentStep(4)}
        />;
      case 6:
        return <ClientModal 
          selectedSeats={bookingData.selectedSeats}
          seats={seats}
          onSubmit={handleClientDataSubmit}
          onBack={() => setCurrentStep(5)}
        />;
      case 7:
        return <PaymentSummary 
          bookingData={bookingData}
          totalPrice={calculateTotalPrice()}
          excursions={excursions}
          onSubmit={submitBooking}
          loading={loading}
          onBack={() => setCurrentStep(6)}
        />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="booking-wizard">
        <div className="loading">
          <h2>Загрузка данных...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-wizard">
      <div className="booking-header">
        <h1>Бронирование экскурсии</h1>
        <div className="progress-bar">
          <div className="progress-step" data-step="1" data-active={currentStep >= 1}>
            <span>1</span>
            <label>Направление</label>
          </div>
          <div className="progress-step" data-step="2" data-active={currentStep >= 2}>
            <span>2</span>
            <label>Город</label>
          </div>
          <div className="progress-step" data-step="3" data-active={currentStep >= 3}>
            <span>3</span>
            <label>Дата</label>
          </div>
          <div className="progress-step" data-step="4" data-active={currentStep >= 4}>
            <span>4</span>
            <label>Автобус</label>
          </div>
          <div className="progress-step" data-step="5" data-active={currentStep >= 5}>
            <span>5</span>
            <label>Место</label>
          </div>
          <div className="progress-step" data-step="6" data-active={currentStep >= 6}>
            <span>6</span>
            <label>Данные</label>
          </div>
          <div className="progress-step" data-step="7" data-active={currentStep >= 7}>
            <span>7</span>
            <label>Оплата</label>
          </div>
        </div>
      </div>
      
      <div className="booking-content">
        {renderStep()}
      </div>
    </div>
  );
};

// Заглушки для компонентов (создадим их дальше)
const DirectionSelector: React.FC<{ onSelect: (direction: string) => void }> = ({ onSelect }) => (
  <div className="step-content">
    <h2>Выберите направление</h2>
    <div className="direction-options">
      <button className="direction-btn" onClick={() => onSelect('Греція')}>
        <h3>Греція</h3>
        <p>7 ночей</p>
      </button>
      <button className="direction-btn" onClick={() => onSelect('Стамбул')}>
        <h3>Стамбул</h3>
        <p>3 ночи</p>
      </button>
    </div>
  </div>
);

const CitySelector: React.FC<{ 
  direction: string; 
  onSelect: (city: string) => void;
  onBack: () => void;
}> = ({ direction, onSelect, onBack }) => {
  const cities = direction === 'Греція' 
    ? ['Львів'] 
    : ['Київ', 'Біла Церква', 'Умань', 'Одеса', 'Львів', 'Івано-Франківськ', 'Чернівці'];

  return (
    <div className="step-content">
      <h2>Выберите город отправления</h2>
      <div className="city-options">
        {cities.map(city => (
          <button key={city} className="city-btn" onClick={() => onSelect(city)}>
            {city}
          </button>
        ))}
      </div>
      <button className="back-btn" onClick={onBack}>Назад</button>
    </div>
  );
};

const DateSelector: React.FC<{ 
  direction: string;
  city: string;
  excursions: ExcursionData[];
  loading: boolean;
  onSelect: (excursionId: string) => void;
  onBack: () => void;
}> = ({ direction, city, excursions, loading, onSelect, onBack }) => {
  // Данные уже загружены для конкретного города, поэтому показываем все
  const availableExcursions = excursions;

  console.log('Доступные экскурсии для', direction, 'из города', city, ':', availableExcursions);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    
    // Обрабатываем разные форматы дат
    if (dateStr.startsWith('Туди ')) {
      // "Туди 15.08.25" -> "15.08.2025"
      const match = dateStr.match(/Туди (\d{2})\.(\d{2})\.(\d{2})/);
      if (match) {
        const [, day, month, year] = match;
        return `${day}.${month}.20${year}`;
      }
    } else if (dateStr.includes(' - ')) {
      // "20.09.2025 - 25.09.2025" -> "20.09.2025 - 25.09.2025"
      return dateStr;
    } else {
      // "15.08.25" -> "15.08.2025"
      const match = dateStr.match(/(\d{2})\.(\d{2})\.(\d{2})/);
      if (match) {
        const [, day, month, year] = match;
        return `${day}.${month}.20${year}`;
      }
    }
    
    return dateStr;
  };

  const formatDepartureReturn = (departure: string, returnDate: string) => {
    if (direction === 'Греція') {
      // Для Греции показываем отдельно departure и return
      return (
        <>
          <span className="departure-date">{formatDate(departure)}</span>
          <span className="date-separator">→</span>
          <span className="return-date">{formatDate(returnDate)}</span>
        </>
      );
    } else {
      // Для Стамбула показываем объединенную дату
      return <span className="departure-date">{formatDate(departure)}</span>;
    }
  };

  if (loading) {
    return (
      <div className="step-content">
        <h2>Загрузка дат экскурсий из {city}...</h2>
        <div className="loading-spinner">⏳</div>
      </div>
    );
  }

  return (
    <div className="step-content">
      <h2>Выберите дату экскурсии из {city}</h2>
      <div className="date-options">
        {availableExcursions.map(exc => (
          <button key={exc.id} className="date-btn" onClick={() => onSelect(exc.id)}>
            <div className="date-info">
              <div className="date-main">
                {formatDepartureReturn(exc.departure, exc.return)}
                {exc.departureTime && (
                  <span className="departure-time">в {exc.departureTime}</span>
                )}
              </div>
              <div className="date-details">
                <span className="nights">{exc.nights} ночей</span>
                <span className="check-in">Заезд: {formatDate(exc.checkIn)}</span>
                <span className="check-out">Выезд: {formatDate(exc.checkOut)}</span>
              </div>
              <div className="date-price">
                <span className="total-price">{exc.totalPrice}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
      <button className="back-btn" onClick={onBack}>Назад</button>
    </div>
  );
};

const BusSelector: React.FC<{ 
  excursionId: string;
  availableBuses: ExcursionData[];
  onSelect: (busType: string) => void;
  onBack: () => void;
}> = ({ excursionId, availableBuses, onSelect, onBack }) => {
  return (
    <div className="step-content">
      <h2>Выберите автобус</h2>
      <div className="bus-options">
        {availableBuses.map(bus => (
          <button key={bus.busType} className="bus-btn" onClick={() => onSelect(bus.busType)}>
            <h3>{bus.busType}</h3>
            <div className="prices">
              <span>Standard: {bus.priceStandard}₴</span>
              <span>Economy: {bus.priceEconomy}₴</span>
              <span>VIP: {bus.priceVip}₴</span>
            </div>
          </button>
        ))}
      </div>
      <button className="back-btn" onClick={onBack}>Назад</button>
    </div>
  );
};

const SeatSelector: React.FC<{ 
  excursionId: string;
  busType: string;
  seats: SeatData[];
  selectedSeats: number[];
  onSeatSelect: (seatNumber: number) => void;
  onNext: () => void;
  onBack: () => void;
}> = ({ busType, seats, selectedSeats, onSeatSelect, onNext, onBack }) => {
  const getBusLayoutType = (busType: string): 'layout1' | 'layout2' | 'layout3' => {
    if (busType.includes('IS 98 SIS')) return 'layout1';
    if (busType.includes('XWX 919') || busType.includes('XWX 920') || busType.includes('XWX 921') || 
        busType.includes('XWX 922') || busType.includes('XWX 923') || busType.includes('XWX 924') || 
        busType.includes('XWX 925')) return 'layout2';
    if (busType.includes('AEX 988') || busType.includes('AEX 989') || busType.includes('AEX 990') || 
        busType.includes('AEX 991')) return 'layout3';
    return 'layout1'; // По умолчанию
  };

  return (
    <div className="step-content">
      <h2>Выберите места</h2>
      <div className="bus-layout-section">
        <div className="bus-layout-container">
          <BusLayout 
            layoutType={getBusLayoutType(busType)} 
            seats={seats}
            selectedSeats={selectedSeats}
            onSeatSelect={onSeatSelect}
          />
        </div>
        <div className="seat-selection-info">
          <h3>Информация о местах</h3>
          <div className="seat-legend">
            <div className="legend-item">
              <div className="legend-color standard"></div>
              <span>Standard (1-33)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color vip"></div>
              <span>VIP (34-73)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color economy"></div>
              <span>Economy (74-83)</span>
            </div>
          </div>
          <div className="selected-seats-info">
            <h4>Выбранные места: {selectedSeats.length}</h4>
            {selectedSeats.length > 0 && (
              <div className="selected-seats-list">
                {selectedSeats.map(seatNumber => {
                  const seat = seats.find(s => s.seatNumber === seatNumber);
                  return (
                    <span key={seatNumber} className={`selected-seat ${seat?.seatType}`}>
                      {seatNumber} ({seat?.seatType})
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="step-actions">
        <button className="back-btn" onClick={onBack}>Назад</button>
        <button className="next-btn" onClick={onNext} disabled={selectedSeats.length === 0}>
          Далее ({selectedSeats.length} мест)
        </button>
      </div>
    </div>
  );
};

const ClientModal: React.FC<{ 
  selectedSeats: number[];
  seats: SeatData[];
  onSubmit: (clients: ClientInfo[], contactData: any) => void;
  onBack: () => void;
}> = ({ selectedSeats, seats, onSubmit, onBack }) => {
  const [clients, setClients] = useState<ClientInfo[]>([]);
  const [contactData, setContactData] = useState({
    phone: '',
    email: ''
  });

  // Инициализируем массив клиентов при изменении выбранных мест
  React.useEffect(() => {
    const newClients = selectedSeats.map(() => ({ name: '', surname: '' }));
    setClients(newClients);
  }, [selectedSeats]);

  const handleClientChange = (index: number, field: 'name' | 'surname', value: string) => {
    const newClients = [...clients];
    newClients[index] = { ...newClients[index], [field]: value };
    setClients(newClients);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверяем, что все поля заполнены
    const allClientsFilled = clients.every(client => client.name.trim() && client.surname.trim());
    if (!allClientsFilled) {
      alert('Пожалуйста, заполните имена и фамилии для всех пассажиров');
      return;
    }
    
    if (!contactData.phone.trim()) {
      alert('Пожалуйста, укажите номер телефона');
      return;
    }
    
    onSubmit(clients, contactData);
  };

  return (
    <div className="step-content">
      <h2>Данные пассажиров</h2>
      <div className="clients-info">
        <p>Вы выбрали {selectedSeats.length} мест. Пожалуйста, укажите данные для каждого пассажира:</p>
      </div>
      
      <form onSubmit={handleSubmit} className="client-form">
        <div className="passengers-section">
          <h3>Пассажиры</h3>
          {selectedSeats.map((seatNumber, index) => {
            const seat = seats.find(s => s.seatNumber === seatNumber);
            return (
              <div key={seatNumber} className="passenger-card">
                <div className="passenger-header">
                  <h4>Место {seatNumber} ({seat?.seatType || 'standard'})</h4>
                </div>
                <div className="passenger-fields">
                  <div className="form-group">
                    <label>Имя *</label>
                    <input
                      type="text"
                      value={clients[index]?.name || ''}
                      onChange={(e) => handleClientChange(index, 'name', e.target.value)}
                      required
                      placeholder="Введите имя"
                    />
                  </div>
                  <div className="form-group">
                    <label>Фамилия *</label>
                    <input
                      type="text"
                      value={clients[index]?.surname || ''}
                      onChange={(e) => handleClientChange(index, 'surname', e.target.value)}
                      required
                      placeholder="Введите фамилию"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="contact-section">
          <h3>Контактные данные</h3>
          <div className="form-group">
            <label>Телефон *</label>
            <input
              type="tel"
              value={contactData.phone}
              onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
              required
              placeholder="+380123456789"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={contactData.email}
              onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="example@email.com"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="back-btn" onClick={onBack}>Назад</button>
          <button type="submit" className="next-btn">Далее</button>
        </div>
      </form>
    </div>
  );
};

const PaymentSummary: React.FC<{ 
  bookingData: BookingData;
  totalPrice: number;
  excursions: ExcursionData[];
  onSubmit: () => void;
  loading: boolean;
  onBack: () => void;
}> = ({ bookingData, totalPrice, excursions, onSubmit, loading, onBack }) => {
  const getExcursionDate = (excursionId: string) => {
    const excursion = excursions.find(e => e.id === excursionId);
    if (excursion) {
      return `${excursion.departure} - ${excursion.return}`;
    }
    return excursionId; // Fallback to ID if not found
  };
  return (
    <div className="step-content">
      <h2>Подтверждение бронирования</h2>
      <div className="booking-summary">
        <div className="summary-item">
          <span>Направление:</span>
          <span>{bookingData.direction}</span>
        </div>
        <div className="summary-item">
          <span>Город:</span>
          <span>{bookingData.city}</span>
        </div>
        <div className="summary-item">
          <span>Экскурсия:</span>
          <span>{getExcursionDate(bookingData.excursionId)}</span>
        </div>
        <div className="summary-item">
          <span>Автобус:</span>
          <span>{bookingData.busType}</span>
        </div>
        <div className="summary-item">
          <span>Места:</span>
          <span>{bookingData.selectedSeats.join(', ')}</span>
        </div>
        <div className="summary-item">
          <span>Телефон:</span>
          <span>{bookingData.contactData.phone}</span>
        </div>
        {bookingData.contactData.email && (
          <div className="summary-item">
            <span>Email:</span>
            <span>{bookingData.contactData.email}</span>
          </div>
        )}
        <div className="summary-item">
          <span>Пассажиры:</span>
          <div className="passengers-list">
            {bookingData.clients.map((client, index) => (
              <div key={index} className="passenger-item">
                {client.name} {client.surname} (место {bookingData.selectedSeats[index]})
              </div>
            ))}
          </div>
        </div>
        <div className="summary-item total">
          <span>Общая стоимость:</span>
          <span>{totalPrice}₴</span>
        </div>
      </div>
      <div className="step-actions">
        <button className="back-btn" onClick={onBack} disabled={loading}>Назад</button>
        <button 
          className="payment-btn" 
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? 'Отправка...' : 'Подтвердить бронирование'}
        </button>
      </div>
    </div>
  );
};

export default BookingWizard;
