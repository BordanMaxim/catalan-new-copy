import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container about-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '18px' }}>Про нас</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '38px 32px',
          justifyContent: 'center',
          marginBottom: '34px'
        }}
      >
        <div style={{ flex: '1 1 330px', minWidth: '250px' }}>
          <p style={{ fontSize: '1.15em', lineHeight: '1.6' }}>
            <b>Catalan Travel</b> — це український туроператор, який створює **доступні подорожі** по Україні та
            за кордон без компромісів у якості.<br />
            Ми піклуємось про ваш комфорт, слухаємо побажання і супроводжуємо на всьому шляху — від вибору туру
            до повернення додому.
          </p>
          <p style={{ fontSize: '1.13em' }}>
            <b>Наші регулярні напрямки:</b><br />
            <b>Греція зі Львова</b> — відпочинок на Егейському морі біля гори Олімп.<br />
            <b>Стамбул з Одеси</b> — єднання Європи та Азії в автобусному екскурсійному турі.
          </p>
          <p>
            Ми цінуємо ваш час і прагнення до якісного відпочинку. Наші тури — це чіткі умови бронювання,
            прозора вартість, жодних прихованих доплат і максимальна організація без метушні.
          </p>
          <div style={{ marginBottom: '10px', marginTop: '16px' }}>
            <b>Нас обирають, тому що:</b>
            <ul
              style={{
                fontSize: '1.04em',
                lineHeight: '1.5',
                margin: '8px 0 0 18px',
                listStyle: 'none',
                paddingLeft: 0
              }}
            >
              <li>Умови подорожей — прості та зрозумілі.</li>
              <li>Комфортний транспорт та перевірені партнери.</li>
              <li>Підтримка менеджера на всіх етапах.</li>
              <li>Чесні ціни — без прихованих платежів.</li>
            </ul>
          </div>
          <p style={{ marginBottom: '0', marginTop: '16px' }}>
            Ми не женемося за кількістю. Віримо: <b>краще менше, але якісніше</b>.<br />
            Catalan Travel — це тури, створені з любов'ю, професіоналізмом і жагою до пригод.<br />
            <br />
            Приєднуйтесь — ваші нові враження вже чекають!
          </p>

          <hr style={{ margin: '30px 0 16px 0', opacity: '.26' }} />
          <div style={{ fontSize: '1em' }}>
            <b>Реквізити:</b><br />
            ТОВ «Каталан Тревел»<br />
            Україна, Львів, вул. Кривоноса, 7.<br />
            Телефон: <a href="tel:+380676084373">+380 67 608 43 73</a><br />
            E-mail: <a href="mailto:catalan.tur@gmail.com">catalan.tur@gmail.com</a><br />
            Р/р UA633052990000026008001027968<br />
            ЄДРПОУ: 43074306<br />
            МФО: 325321<br />
            Дата та номер запису в ЄДРЮО: 05.08.2019 № 15561030004070587<br />
            Ліцензія Мінекономіки №65 від 25.09.2019
          </div>
        </div>
      </div>
    </div>
  );
};
