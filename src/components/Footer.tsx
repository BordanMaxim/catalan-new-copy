import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container-sity">
        <div className="container-lvov">
          <b>Львів</b>
          <div className="footer-contacts">
            <a href="tel:+380686084373" className="footer-icon" title="Подзвонити">
              📱 +380686084373
            </a>
            <a href="tel:+380676084373" className="footer-icon" title="Подзвонити">
              📱 +380676084373
            </a>
            <a href="mailto:catalan.tur@gmail.com" className="footer-icon" title="Email">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gmail.svg" alt="Email" />
              catalan.tur@gmail.com
            </a>
          </div>
          <div className="social-icons">
            <a href="viber://chat?number=%2B380686084373" className="social-icon" title="Viber" target="_blank" rel="noopener">
              <img src="/assets/icons/viber.png" alt="Viber" />
            </a>
            <a href="https://wa.me/380686084373" className="social-icon" title="WhatsApp" target="_blank" rel="noopener">
              <img src="/assets/icons/whatsapp.png" alt="WhatsApp" />
            </a>
            <a href="https://t.me/+380686084373" className="social-icon" title="Telegram" target="_blank" rel="noopener">
              <img src="/assets/icons/telegram.png" alt="Telegram" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61578328834214" className="social-icon" title="facebook" target="_blank" rel="noopener">
              <img src="/assets/icons/facebook.png" alt="facebook" />
            </a>
            <a href="https://www.instagram.com/catalantravellviv/" className="social-icon" title="instagram" target="_blank" rel="noopener">
              <img src="/assets/icons/instagram.png" alt="instagram" />
            </a>
            <a href="https://www.tiktok.com/@catalan.travel.li?_t=ZM-8yGWxkgATDS&_r=1" className="social-icon" title="tiktok" target="_blank" rel="noopener">
              <img src="/assets/icons/tiktok.png" alt="tiktok" />
            </a>
          </div>
        </div>
        <div className="container-odesa">
          <b>Одеса</b>
          <div className="footer-contacts">
            <a href="tel:+380984284284" className="footer-icon" title="Подзвонити">
              📱 +380984284284
            </a>
            <a href="tel:+380914817574" className="footer-icon" title="Подзвонити">
              ☎️ +380914817574
            </a>
            <a href="mailto:catalan.ua.md@gmail.com" className="footer-icon" title="Email">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gmail.svg" alt="Email" />
              catalan.ua.md@gmail.com
            </a>
          </div>
          <div className="social-icons">
            <a href="viber://chat?number=%2B380984284284" className="social-icon" title="Viber" target="_blank" rel="noopener">
              <img src="/assets/icons/viber.png" alt="Viber" />
            </a>
            <a href="https://wa.me/380984284284" className="social-icon" title="WhatsApp" target="_blank" rel="noopener">
              <img src="/assets/icons/whatsapp.png" alt="WhatsApp" />
            </a>
            <a href="https://t.me/+380984284284" className="social-icon" title="Telegram" target="_blank" rel="noopener">
              <img src="/assets/icons/telegram.png" alt="Telegram" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61578107841399" className="social-icon" title="facebook" target="_blank" rel="noopener">
              <img src="/assets/icons/facebook.png" alt="facebook" />
            </a>
            <a href="https://www.instagram.com/catalantravel_odesa/" className="social-icon" title="instagram" target="_blank" rel="noopener">
              <img src="/assets/icons/instagram.png" alt="instagram" />
            </a>
            <a href="https://www.tiktok.com/@catalan.travel.od?_t=ZM-8yGUHiVi2uU&_r=1" className="social-icon" title="tiktok" target="_blank" rel="noopener">
              <img src="/assets/icons/tiktok.png" alt="tiktok" />
            </a>
          </div>
        </div>
      </div>
      <div>
        © 2025 Catalan Travel. Всі права захищені.
      </div>
    </footer>
  );
};
