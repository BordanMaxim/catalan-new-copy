import React from 'react';

export const ContactsPage: React.FC = () => {
  return (
    <div>
      <div className="contact-map-card">
        <div className="contact-info">
          <div className="contact-title">
            <span className="main-color">Львів</span>
          </div>
          <div className="contact-row">
            <div>
              <div className="contact-label">Місто:</div>
              <div>Львів</div>
              <div className="contact-label" style={{ marginTop: '8px' }}>Адреса:</div>
              <div>вул. Кривоноса, 7 </div>
            </div>
            <div>
              <div className="contact-label">Графік роботи:</div>
              <div><span className="main-color">Понеділок – Неділя</span></div>
              <div>09:00 – 19:00, без перерви</div>
            </div>
            <div>
              <div className="contact-label">Телефон:</div>
              <div>
                <a href="tel:+380676084373" className="main-link">+38 (067) 608-43-73</a><br />
                <a href="tel:+380686084373" className="main-link">+38 (068) 608-43-73</a>
              </div>
              <div className="contact-label" style={{ marginTop: '8px' }}>E-mail:</div>
              <div>
                <a href="mailto:catalan.tur@gmail.com" className="main-link">catalan.tur@gmail.com</a>
              </div>
              <div className="contact-label" style={{ marginTop: '8px' }}>Instagram:</div>
              <div>
                <a href="https://www.instagram.com/catalantravellviv/" className="main-link" target="_blank" rel="noopener">
                  instagram.com/catalantravellviv
                </a>
              </div>
              <div className="contact-label" style={{ marginTop: '8px' }}>Facebook:</div>
              <div>
                <a href="https://www.facebook.com/profile.php?id=61578328834214" className="main-link" target="_blank" rel="noopener">
                  facebook.com/catalantravellviv
                </a>
              </div>
              <div className="contact-label" style={{ marginTop: '8px' }}>TikTok:</div>
              <div>
                <a href="https://www.tiktok.com/@catalan.travel.li?_t=ZM-8yGWxkgATDS&_r=1" className="main-link" target="_blank" rel="noopener">
                  tiktok.com/@catalantravellviv
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2572.867188271188!2d24.036473377106233!3d49.84495297148286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add1366ba968b%3A0x3aaf9193e88c7234!2z0LLRg9C70LjRhtGPINCc0LDQutGB0LjQvNCwINCa0YDQuNCy0L7QvdC-0YHQsCwgNywg0JvRjNCy0ZbQsiwg0JvRjNCy0ZbQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCA3OTAwMA!5e0!3m2!1suk!2sua!4v1752750607992!5m2!1suk!2sua"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Львів офіс на карті"
          />
        </div>
      </div>

      <div className="contact-map-card">
        <div className="contact-info">
          <div className="contact-title">
            <span className="main-color">Одеса</span>
          </div>
          <div className="contact-row">
            <div>
              <div className="contact-label">Місто:</div>
              <div>Одеса</div>
              <div className="contact-label" style={{ marginTop: '8px' }}>Адреса:</div>
              <div>Тільки онлайн</div>
            </div>
            <div>
              <div className="contact-label">Графік роботи:</div>
              <div><span className="main-color">Понеділок – Неділя</span></div>
              <div>09:00 – 19:00, без перерви</div>
            </div>
            <div>
              <div className="contact-label">Телефон:</div>
              <div>
                <a href="tel:+380984284284" className="main-link">+38 (098) 428-42-84</a><br />
                <a href="tel:+380914817574" className="main-link">+38 (091) 481-75-74</a>
              </div>
              <div className="contact-label" style={{ marginTop: '8px' }}>E-mail:</div>
              <div>
                <a href="mailto:catalan.ua.md@gmail.com" className="main-link">catalan.ua.md@gmail.com</a>
              </div>
              <div className="contact-label" style={{ marginTop: '8px' }}>Instagram:</div>
              <div>
                <a href="https://www.instagram.com/catalantravel_odesa/" className="main-link" target="_blank" rel="noopener">
                  instagram.com/catalantravel_odesa
                </a>
              </div>
              <div className="contact-label" style={{ marginTop: '8px' }}>Facebook:</div>
              <div>
                <a href="https://www.facebook.com/profile.php?id=61578107841399" className="main-link" target="_blank" rel="noopener">
                  facebook.com/catalantravel.odesa
                </a>
              </div>
              <div className="contact-label" style={{ marginTop: '8px' }}>TikTok:</div>
              <div>
                <a href="https://www.tiktok.com/@catalan.travel.od?_t=ZM-8yGUHiVi2uU&_r=1" className="main-link" target="_blank" rel="noopener">
                  tiktok.com/@catalantravel_odesa
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-map contact-map--online" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/assets/onlyOnline.png" alt="Тільки онлайн" style={{ width: '100%', height: 'auto', opacity: 0.8 }} />
        </div>
      </div>
    </div>
  );
};
