import React, { useState, useEffect } from 'react';
import { BookingForm } from '../components/BookingForm';
import { BusLayoutSelector } from '../components/BusLayoutSelector';

interface TimetableData {
  values?: string[][];
}

export const GreecePage: React.FC = () => {
  const [timetableData, setTimetableData] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    '/assets/main-greece.jpg',
    '/assets/greece_photo/greece1.jpg',
    '/assets/greece_photo/greece2.jpg',
    '/assets/greece_photo/greece3.jpg',
    '/assets/greece_photo/greece4.jpg',
    '/assets/greece_photo/greece6.jpg',
    '/assets/greece_photo/greece8.png',
    '/assets/greece_photo/greece5.jpg',
    '/assets/greece_photo/greece10.jpg',
  ];

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await fetch(
          'https://sheets.googleapis.com/v4/spreadsheets/17lg4gBmp0Ij4aZ20-_TWOUyTASudrvThz1ixBE_8Vx4/values/Timetable%20Lvov!A1:Z1000?key=AIzaSyBR6dfBERIxZ2Wb--FmFB2DNmrGbcSVJ68'
        );
        const data: TimetableData = await response.json();
        
        if (data.values && data.values.length > 0) {
          setTimetableData(data.values);
        }
      } catch (error) {
        console.error('Failed to fetch timetable:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const scrollToForm = () => {
    const form = document.getElementById('tourForm');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const firstInput = form.querySelector('input, select, textarea') as HTMLElement;
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 500);
      }
    }
  };

  return (
    <div>
      <div className="formAndGalery">
        <div className="photo-gallery">
          <div className="gallery-main">
            <a href="#" className="gallery-img" onClick={(e) => {
              e.preventDefault();
              handleImageClick(galleryImages[0]);
            }}>
              <img src={galleryImages[0]} alt="Главное фото" />
            </a>
          </div>
          <div className="gallery-top">
            {galleryImages.slice(1).map((img, index) => (
              <a
                key={index}
                href="#"
                className="gallery-img"
                onClick={(e) => {
                  e.preventDefault();
                  handleImageClick(img);
                }}
              >
                <img src={img} alt={`Фото ${index + 1}`} />
              </a>
            ))}
          </div>
        </div>

        <section className="greece-details">
          <h2 className="nameHeader">
            Незабутні враження в Греції<br />
            від 289 євро (у гривнях, за актуальним курсом)
          </h2>

          <div className="container-greece">
            <p>
              <b>Відпочинок біля підніжжя Олімпу...</b> Ви чули про нього зі школи, про плеяду богів і міфи
              Давньої Греції. Про «восьме диво світу» – монастирі Метеори, збудовані на 500-метрових скелях. Про золоті
              піски Скіатоса і термали Едеси. Ви можете усе побачити на власні очі під час екскурсій у Греції.
            </p>

            <h3>Чому з нами?</h3>
            <ol>
              <li>Ми розвиваємо протягом шести років напрямок «Греція для всіх» і гарантуємо надійність та якість.</li>
              <li>Пропонуємо бюджетний відпочинок з чіткими умовами бронювання. Жодних прихованих платежів.</li>
              <li>Запропоновані локації максимально відповідають критеріям доступність/комфорт/ціна, з урахуванням ваших побажань.</li>
              <li>Близько 10 000 задоволених туристів, і більшість наших клієнтів – це постійні друзі, які мандрують з нами знову.</li>
              <li>Онлайн-підтримка 24/7 і повний супровід на всіх етапах бронювання, зокрема на місці у Греції.</li>
            </ol>

            <h4>У вартість входить:</h4>
            <ul>
              <li>Транспорт у обидві сторони.</li>
              <li>Проживання у готелі 7 ночей/8 днів.</li>
              <li>Супровід гіда-керівника.</li>
              <li>Представник туроператора у готелі.</li>
            </ul>

            <h4>Додаткові оплати:</h4>
            <ul>
              <li>Турзбір 3 євро/кімната/доба (або 10,5 євро для одного за увесь період);</li>
              <li>Кондиціонер (за бажанням, 3 євро/доба);</li>
              <li>Страховий поліс 250 грн для дорослого.</li>
            </ul>

            <h3>Програма туру:</h3>
            <ul>
              <li>
                <b>День 1.</b><br />
                Вирушаємо в автобусний тур у Грецію.<br />
                Час виїзду (прибути на відправлення потрібно на 15 хв раніше):<br />
                Львів о 5:30 від головного залізничного вокзалу (площа Двірцева).<br />
                Тривалість проїзду – 27-31 год у одну сторону.
              </li>
              <li>
                <b>День 2.</b><br />
                Бл. 12:00 прибуття у Грецію. Знайомство, інформування туристів на рецепції готелю. Вільний час до поселення.<br />
                Поселення о 14:00.<br />
                На морі відпочиваємо 7 ночей (8 днів).
              </li>
              <li>
                <b>День 9.</b><br />
                10:00 Залишаємо готельні номери.<br />
                18:00 Вирушаємо в Україну.
              </li>
              <li>
                <b>День 10.</b><br />
                Прибуття у Львів бл. 20:00.
              </li>
            </ul>
          </div>
        </section>
      </div>

      <div className="form-and-bus-container">
        <BookingForm 
          tourType="Греція" 
          showPayment={true}
        />
      </div>

      {/* Timetable */}
      <div id="timetable-container" style={{ overflowX: 'auto', marginTop: '40px' }}>
        {loading ? (
          <p>Завантаження розкладу...</p>
        ) : timetableData.length > 0 ? (
          <table className="greece-timetable">
            <thead>
              <tr>
                {timetableData[0].map((cell, index) => {
                  // Скрываем колонку с Excursion ID
                  if (cell && cell.toLowerCase().includes('excursion id')) {
                    return null;
                  }
                  return <th key={index}>{cell}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {timetableData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => {
                    // Скрываем колонку с Excursion ID
                    if (timetableData[0][cellIndex] && timetableData[0][cellIndex].toLowerCase().includes('excursion id')) {
                      return null;
                    }
                    return <td key={cellIndex}>{cell}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Не вдалося завантажити табель</p>
        )}
      </div>

      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <button className="booking-btn" onClick={scrollToForm}>
          Забронювати
        </button>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="modal" style={{ display: 'block' }} onClick={closeModal}>
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="modal-content" src={selectedImage} alt="Modal" />
        </div>
      )}
    </div>
  );
};
