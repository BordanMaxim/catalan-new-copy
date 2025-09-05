import React, { useState, useEffect } from 'react';
import { BookingForm } from '../components/BookingForm';
import { BusLayoutSelector } from '../components/BusLayoutSelector';

interface TimetableData {
  values?: string[][];
}

export const IstanbulPage: React.FC = () => {
  const [timetableData, setTimetableData] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    '/assets/istambul_photo/istambul1.jpg',
    '/assets/istambul_photo/istambul2.jpg',
    '/assets/istambul_photo/istambul3.jpg',
    '/assets/istambul_photo/istambul4.jpg',
    '/assets/istambul_photo/istambul5.jpg',
    '/assets/istambul_photo/istambul6.jpg',
    '/assets/istambul_photo/istambul7.jpg',
    '/assets/istambul_photo/istambul8.jpg',
    '/assets/istambul_photo/istambul9.jpg',
  ];

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await fetch(
          'https://sheets.googleapis.com/v4/spreadsheets/17lg4gBmp0Ij4aZ20-_TWOUyTASudrvThz1ixBE_8Vx4/values/Timetable%20Odessa!A1:Z1000?key=AIzaSyBR6dfBERIxZ2Wb--FmFB2DNmrGbcSVJ68'
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

        <section className="istanbul-details">
          <div className="container-istanbul">
            <h2 className="nameHeader">
              Стамбул чекає на тебе!<br />
              від 99 євро (у гривнях, за актуальним курсом)
            </h2>
            
            <p>
              Щоб відкрити тобі свій унікальний шарм. У якому Європа та Азія переплелися в чудовій історії!<br />
              Поринь у традицію усієї країни, відвідавши величну мечеть Чамлиджа і розкішний палац Топкапи – справжні
              символи славетної епохи.<br />
              Дозволь собі зачаруватися круїзом по Босфору, насолоджуючись захопливим видом палаців і фортець, що
              творили історію цього міста.<br />
              Відкрий для себе Принцеві острови – оазу тиші та елегантності, де колись жила й відпочивала османська
              знать.<br />
              Стамбул запрошує отримати незабутні емоції від історії, культури і казкових краєвидів!
            </p>

            <h3 style={{ marginTop: '32px' }}>ДЕТАЛІ ТУРУ</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '26px 44px' }}>
              <div style={{ flex: '1 1 300px', minWidth: '220px' }}>
                <b>Місце відправлення та повернення:</b>
                <br /><br />
                <b>Київ: Час відправлення: 23:00.</b><br />
                Автостанція "Південна", проспект Академіка Глушкова, 3.<br />
                <br />
                <b>Біла Церква: Час відправлення: 00:15.</b><br />
                Біла Церква. Заправка "Avia", Автошлях М05.<br />
                <br />
                <b>Умань: Час відправлення: 01:30.</b><br />
                Вул. Визволителів, 26. Заправка "Esko".<br />
                <br />
                <b>Одеса: Час відправлення: 08:00.</b><br />
                Італійський бульвар, 6, Одеса, Одеська область, Україна.<br />
                <br />
                <b>Львів: Час відправлення: 06:00.</b><br />
                Залізничний вокзал, площа Двірцева. Паркінг автобусів міжнародного сполучення.<br />
                <br />
                <b>Івано-Франківськ: Час відправлення: 08:30.</b><br />
                Івано-Франківськ, заправка "Стелс", вул. Мазепи, 176.<br />
                <br />
                <b>Чернівці: Час відправлення: 10:30.</b><br />
                Чернівці, головний залізничний вокзал.<br />
                <br />
                <b>Час прибуття:</b> Орієнтовно 18:00

                <br /><br />
                <b>У вартість входить:</b>
                <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: 1.6, margin: 0 }}>
                  <li>Проїзд у обидві сторони автобусом турист-класу</li>
                  <li>Проживання 3 ночі у готелі</li>
                  <li>Сніданок</li>
                  <li>Медична страхівка</li>
                  <li>Керівник групи</li>
                  <li>Ліцензований місцевий гід</li>
                  <li>Відвідування туристичних об'єктів, зазначених у програмі</li>
                  <li>Багаж у салон до 8 кг</li>
                  <li>Багаж основний до 15 кг (55 × 40 × 23 см)</li>
                </ul>
                <br />
                <b>Що взяти з собою?</b>
                <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: 1.6, margin: 0 }}>
                  <li>Гроші на додаткові витрати (їжа, напої, додаткові екскурсії, сувеніри, подарунки, особисті витрати тощо)</li>
                  <li>Зручне взуття</li>
                </ul>
              </div>

              <div style={{ flex: '1 1 240px', minWidth: '200px' }}>
                <b>У вартість не входить:</b>
                <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: 1.6, margin: 0 }}>
                  <li>Вхідні квитки у музеї і туристичні об'єкти</li>
                  <li>Круїз по Босфору – 20 €</li>
                  <li>Мечеть Чамлиджа + Площа Таксим + Фенер-Балат (пішохідна прогулянка) – 45 €</li>
                  <li>Палац Топкапи + Гарем султана – 65 €</li>
                  <li>Круїз по Мармуровому морю до Принцевих островів (Бююкада) – 60 €</li>
                  <li>Турецька ніч – 40 €</li>
                  <li>Босфор вночі – 60 €</li>
                  <li>Акваріум Стамбула – 50 €</li>
                  <li>Оренда навушників – 5 € за 3 дні</li>
                </ul>

                <br />
                <b>Додаткові послуги:</b>
                <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: 1.6, margin: 0 }}>
                  <li>Додаткове місце в транспорті – 75 €</li>
                  <li>Для пенсіонерів віком понад 66 років медична страхівка оплачується додатково</li>
                </ul>
              </div>
            </div>

            <h3 style={{ marginTop: '34px' }}>ПРОГРАМА:</h3>
            <div style={{ marginBottom: '32px' }}>
              <b>Неділя</b><br />
              Прибуття у Стамбул та початок екскурсійної програми:
              <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: 1.7, margin: '0 0 14px 0' }}>
                <li>🍬 <b>Магазин солодощів Ali Baba – рай турецьких ласощів!</b> Понад 4000 видів традиційних десертів точно здивують вас! Насолоджуйтеся витонченим смаком ніжної халви, неповторною солодкістю знаменитого лукуму, повітряною пішманіє, ароматним медом і ніжною тахіні. Кожен смаколик – це подорож у кулінарні традиції Туреччини, вибух східних ароматів, ідеальний спосіб побавити себе або привезти солодкий сувенір додому!</li>
                <li>👜 <b>Магазин шкіри та хутра – елегантність і витонченість!</b> Якщо ви цінуєте розкіш і якість, це місце стане вашою ідеальною знахідкою! Огляньте ексклюзивну колекцію курток, сумок і аксесуарів, створених майстрами своєї справи. Кожен виріб поєднує традиції та сучасний дизайн, створюючи унікальний стиль. Насолоджуйтеся красою деталей і їх справжністю!</li>
                <li>🕌 <b>Мечеть Сулейманія – символ величі Османської імперії.</b> Розташована на одному з найвищих пагорбів Стамбула, мечеть Сулейманія вражає своєю величною архітектурою та захопливою панорамою міста. Побудована у XVI столітті, возвеличувала постать султана Сулеймана Пишного. Спокійна атмосфера, грандіозні інтер'єри та чудові сади роблять її не лише місцем поклоніння, а й острівцем тиші й історії в самому серці жвавого Стамбула.</li>
                <li>🏨 <b>Заселення у готель – відпочинок після насиченого дня!</b> Згідно з місцевими правилами, автобус зупиниться на відстані 300–600 метрів від готелю. Разом із керівником групи ви заберете багаж і підете на рецепцію для оформлення поселення. Після поселення можна відпочити в номері перед новими пригодами в Стамбулі!</li>
                <li>🌍 <b>Досліджуйте азійський Стамбул і історичні квартали!</b> Ми відвідаємо величну мечеть Чамлиджа – найбільшу в Туреччині, символ духовності й архітектурної досконалості. Потім повернемось до центру міста, де поринемо в атмосферу жвавої площі Таксим. На завершення – прогулянка мальовничими кварталами Фенер-Балат: вузькі мощені вулички, яскраві будинки й неповторний шарм стамбульського минулого. Незабутній досвід!</li>

                <div className="istanbul-gallery">
                  <img src="/assets/istambul_photo/istambul_text1.jpg" alt="День 1" />
                  <img src="/assets/istambul_photo/istambul_text2.jpg" alt="День 1" />
                </div>
              </ul>

              <b>Понеділок</b><br />
              <b>Сніданок у готелі. Пішохідна екскурсія історичним центром Стамбула.</b>
              <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: 1.7, margin: '0 0 14px 0' }}>
                <li>Ми побачимо красу та історію міста, починаючи з <b>Блакитної мечеті</b> (Султанахмет Джамі), одного з найвражаючих архітектурних шедеврів, відомого своїми грандіозними склепіннями. Далі відкриємо для себе <b>Обеліск Феодосія</b> — стародавній пам'ятник, привезений з Єгипту, символ імперської величі. Також зупинимося біля Німецького фонтану — елегантного подарунка імператора Вільгельма II, місця, наповненого історією, перед тим як продовжити нашу пригоду в Стамбулі!</li>
                <li>👑 <b>Палац Топкапи</b> – колишня резиденція османських султанів, цей величний палац XV століття нині є музеєм, який зберігає безцінні скарби. Захоплива подорож у життя знаті Османської імперії, де сади, оздоблені зали й історичні реліквії перенесуть вас у минуле. (У вартість екскурсії входить: проїзд, місцевий гід, супровід групи).</li>
                <li>🚢 <b>Круїз по Босфору</b> – Насолоджуйтеся чарівною прогулянкою протокою, яка розділяє Європу й Азію! Ви побачите розкішні палаци, величні фортеці та затоку Золотий Ріг. Побачите Стамбула з кораблика. (У вартість екскурсії входить: круїз, місцевий гід, керівник групи).</li>
                <li>🎶 <b>Турецька ніч у ресторані Gar</b> – Завершіть день автентично, смакуючи традиційну вечерю під супровід музики та східних танцювальних шоу. Яскрава атмосфера, смачні страви й турецька гостинність зроблять цей вечір незабутнім! (У вартість входить: вечеря та розважальна програма).</li>

                <div className="istanbul-gallery">
                  <img src="/assets/istambul_photo/istambul_text3.jpeg" alt="День 2" />
                  <img src="/assets/istambul_photo/istambul_text4.jpg" alt="День 2" />
                </div>
              </ul>

              <b>Вівторок</b><br />
              Сніданок у готелі.<br />
              <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: 1.7, margin: '0 0 14px 0' }}>
                <li>🚢 <b>Круїз по Мармуровому морю до Принцевих островів (Бююкада).</b> Вирушаємо в незабутню екскурсію на Бююкаду – найбільший із Принцевих островів. Подорож човном триватиме близько півтори години. Прибувши на острів, ми піднімемося автобусом на пагорб, звідки відкривається захоплива панорама Стамбула – ідеальне місце для незабутніх фото! Ми відвідаємо монастир Святого Георгія – місце, наповнене історією та духовністю, а також насолодимося традиційним турецьким обідом у місцевому кафе.</li>
                <li>🌙 <b>Босфор вночі</b> – Стамбул у світлі місяця. Мрійте з відкритими очима, вирушивши в круїз по Босфору вночі – магічну подорож протокою, яка з'єднує два континенти. З настанням темряви Стамбул оживає, виблискуючи вогнями, що відбиваються в спокійних водах Босфору. Ви побачите величні палаци, історичні фортеці та знамениті мости – все це в романтичній і чарівній атмосфері. Незабутнє враження, ідеальне, щоб закохатися в нічну красу міста. (У вартість екскурсії входить: транспорт, квитки на човен, тур по острову, обід і безалкогольний напій).</li>
                <div className="istanbul-gallery">
                  <img src="/assets/istambul_photo/istambul_text5.jpg" alt="День 3" />
                  <img src="/assets/istambul_photo/istambul_text6.jpg" alt="День 3" />
                </div>
              </ul>

              <b>Середа</b><br />
              Сніданок у готелі та виселення з номерів.<br />
              <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: 1.7, margin: '0' }}>
                <li>🐟 <b>Стамбульський акваріум</b> – Незабутній підводний світ. Стамбульський акваріум варто побачити! Неймовірний тематичний комплекс довжиною 1,2 км, який здійснить подорож від тропічних лісів до морських глибин. Тут ви побачите понад 1500 видів і 17 000 тварин, зокрема акул, пінгвінів і капібар – справжня пригода для всіх любителів природи та чудове місце для всієї родини.</li>
                <li>🛍️ <b>Великий Базар (Kapalı Çarşı)</b> – Магія місцевих закупів. Хто хоче сповна відчути атмосферу Стамбулу. Великий Базар – це не просто шопінг-тур, це культура, вироби власноруч, споглядання мистецтва. Це один з найбільших ринків світу. Тут є все – прикраси, спеції, смаколики, одяг.</li>
              </ul>
              <br />
              <b>Додаткові послуги</b><br />
              <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: 1.6, margin: '0' }}>
                <li>Додаткове місце в транспорті (75.0 €)</li>
                <li>Гід іноземною мовою (300.0 €)</li>
                <li>Для осіб похилого віку &gt; 65 років медична страхівка оплачується додатково (12.0 €)</li>
                <li>Наднормовий багаж оплачується додатково (25.0 €)</li>
              </ul>
              <b>Додаткові витрати (за бажанням):</b>
              <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: 1.6, margin: '0' }}>
                <li>Круїз по Босфору – 20 €</li>
                <li>Мечеть Чамлиджа + Площа Таксим + Фенер-Балат (пішохідна прогулянка) – 45 €</li>
                <li>Палац Топкапи + Гарем Султана – 65 €</li>
                <li>Круїз по Мармуровому морю до Принцевих островів (Бююкада) – 60 €</li>
                <li>Турецька ніч – 40 €</li>
                <li>Босфор вночі – 60 €</li>
                <li>Стамбульський акваріум – 50 €</li>
                <li>Оренда навушників – 5 € за 3 дні</li>
              </ul>
              <div style={{ color: '#d44', fontSize: '12px' }}>
                УВАГА!!! Програма туру може бути змінена без попереднього повідомлення залежно
                від погодних умов, часу прибуття у Стамбул, непередбачених заторів у місті та інших факторів.
              </div>
            </div>
          </div>
        </section>

      </div>

      <div className="form-and-bus-container">
        <BookingForm 
          tourType="Стамбул" 
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
