import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingForm } from '../components/BookingForm';
import { BusLayoutSelector } from '../components/BusLayoutSelector';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (destination: string) => {
    if (destination === 'greece') {
      navigate('/greece');
    } else if (destination === 'istanbul') {
      navigate('/istanbul');
    }
  };

  return (
    <div className="container">
      <h1>Вітаємо на нашій офіційній сторінці!</h1>
      <p>
        Тут ви можете дізнатися про наші послуги та акційні пропозиції. Пропонуємо автобусні тури не за всі гроші.
      </p>

      <div className="cards-row">
        <div
          className="card"
          style={{ cursor: 'pointer' }}
          onClick={() => handleCardClick('greece')}
        >
          <img src="/assets/main-greece.jpg" alt="Фотографія 1" />
          <h3>Греція від 289 євро (у гривнях, за актуальним курсом)</h3>
          <div className="tour-block">
            <div style={{ fontSize: '1.22rem', marginBottom: '8px' }}>
              <b>Греція для всіх </b> — доступний та насичений відпочинок на узбережжі «Олімпійська рив'єра».
            </div>
            <div className="tour-section">
              Курорт Пієрія біля гори Олімп – одні з найкращих пляжів північної материкової Греції.
            </div>
            <div className="tour-section">
              <b>Balkan Hellas 3* </b> — апарт-готель на центральній площі Лептокарії, усього за 300 м до
              пляжу. Кожна кімната має міні-кухню, балкон або терасу, зручності в номері. Затишний дворик,
              басейн, шезлонги на території готелю.
            </div>
            <div className="tour-section">
              М'який клімат, довгий сезон, розслаблююча атмосфера — ідеальний варіант для літньої відпустки
              без зайвих турбот.
            </div>
            <div className="tour-section">
              <b>У вартість входить:</b>
              <ul className="tour-list">
                <li> Проїзд у обидві сторони.</li>
                <li> Проживання 7 ночей/8 днів.</li>
                <li>Послуги україномовного гіда на рецепції готелю.</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className="card"
          style={{ cursor: 'pointer' }}
          onClick={() => handleCardClick('istanbul')}
        >
          <img src="/assets/main-stambul.png" alt="Фотографія 2" />
          <h3>Стамбул від 99 євро (у гривнях, за актуальним курсом)</h3>
          <div className="tour-block">
            <div className="tour-section">
              <b>Місто двох континентів </b>- захоплива мандрівка у одне з найчарівніших
              та загадкових міст світу.
              <p>
                Фантастичні краєвиди та архітектура, глибокі традиції, смачна їжа залишать незабутні
                спогади.
              </p>
              <p>
                Мечеть Чамлиджа, палац Топкапи, круїз по Босфору, екскурсія по
                <span className="country-accent"> Стамбулу</span>, гурме-рай: магазин
                смаколиків «Алі Баба» та ринок Капалі Карсі. Виїзди з 
                <span className="country-accent"> Києва,
                  Білої Церкви, Умані, Одеси,
                  Львова, Івано-Франківська та Чернівців. </span>
                Розкрийте таємниці
                <span className="country-accent"> Стамбулу</span> лише за
                три дні перебування у місті.
              </p>
            </div>

            <div className="tour-section">
              <b>У вартість входить:</b>
              <ul className="tour-list">
                <li> Проїзд автобусом комфорт-класу.</li>
                <li> Проживання 3 ночі у готелі.</li>
                <li> Сніданки.</li>
                <li> Супровід гіда.</li>
                <li> Екскурсійні програми.</li>
                <li> Багаж: 15 кг + ручна поклажа 8 кг.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="form-and-bus-container">
        <BookingForm showPayment={true} />
      </div>
    </div>
  );
};
