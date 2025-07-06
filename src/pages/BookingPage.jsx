import React, { useState, useMemo } from 'react';
import {
  FaCalendarAlt,
  FaCreditCard,
  FaRegCreditCard,
  FaHome,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import './BookingPage.css';

export default function BookingPage() {
  const pricePerNight = 1500;
  const cleaningFeePerNight = 150;
  const serviceFee = 100;

  // Дати
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');

  // Особисті дані
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [saveData, setSaveData] = useState(false);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Україна');
  const [postal, setPostal] = useState('');
  const [phoneCode, setPhoneCode] = useState('+380');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sendConfirmation, setSendConfirmation] = useState(true);

  // Оплата та угода
  const [method, setMethod] = useState('saved');
  const [accepted, setAccepted] = useState(false);

  // Кількість ночей
  const nights = useMemo(() => {
    if (!checkin || !checkout) return 0;
    const inD = new Date(checkin);
    const outD = new Date(checkout);
    return Math.max(Math.round((outD - inD) / (1000 * 60 * 60 * 24)), 0);
  }, [checkin, checkout]);

  // Підрахунок сум
  const stayTotal     = nights * pricePerNight;
  const cleaningTotal = nights * cleaningFeePerNight;
  const total         = stayTotal + cleaningTotal + serviceFee;

  // Валідація форми для активації кнопки (без accepted)
  const canBook =
    nights > 0 &&
    firstName.trim() &&
    lastName.trim() &&
    email.trim() &&
    address.trim() &&
    city.trim() &&
    phoneNumber.trim();

  const handleSubmit = e => {
    e.preventDefault();

    if (!accepted) {
      alert('Будь ласка, погодьтесь з умовами проживання');
      return;
    }

    if (canBook) {
      alert('Бронювання відправлено!');
    }
  };

  // Яскраві 5 зірок
  const renderStars = () => '★'.repeat(5);

  // Визначаємо поточний крок степпера
  const step = !checkin || !checkout
    ? 1
    : !(firstName && lastName && email && address && city && phoneNumber)
      ? 2
      : 3;

  return (
    <form className="booking-container" onSubmit={handleSubmit}>
      {/* STEPPER */}
      <ul className="booking-stepper">
        {['Дати', 'Дані', 'Оплата'].map((label, i) => (
          <li key={i} className={i + 1 <= step ? 'active' : ''}>
            {label}
          </li>
        ))}
      </ul>

      {/* HEADER */}
      <div className="booking-header">
        <img
          src="/images/booking-room.jpg"
          alt="Room"
          className="booking-img"
        />
        <div className="booking-info">
          <h2 className="booking-title">2к квартира у клубному будинку</h2>
          <div className="booking-price">
            <span className="price-amount">1 500 грн</span>
            <span className="price-unit">/доба</span>
          </div>
          <div className="booking-rating">
            {renderStars()} <span>Оцінка: 4,9 (25 відгуків)</span>
          </div>
          <div className="booking-address">
            <FaHome className="icon-inline" />
            м. Київ, Печерськ, вул. Коновальця
          </div>
        </div>
      </div>

      {/* ДАТИ */}
      <section className="booking-section">
        <h3>
          <FaCalendarAlt className="section-icon" /> Дати бронювання:
        </h3>
        <div className="date-inputs">
          <label>
            Дата в’їзду:
            <input
              type="date"
              value={checkin}
              onChange={e => setCheckin(e.target.value)}
            />
          </label>
          <label>
            Дата виїзду:
            <input
              type="date"
              value={checkout}
              onChange={e => setCheckout(e.target.value)}
            />
          </label>
        </div>
      </section>

      <div className="booking-grid">
        {/* ЛІВА КОЛОНКА – ОСОБИСТІ ДАНІ */}
        <div className="booking-left">
          <section className="booking-section">
            <h3>
              <FaMapMarkerAlt className="section-icon" /> Введіть свої дані
            </h3>
            <div className="personal-info-note">
              <p>
                <strong>Початок:</strong> заповніть обов’язкові поля (*).
              </p>
              <p>
                Будь ласка, вкажіть дані латиницею, щоб персонал міг їх прочитати.
              </p>
            </div>
            <div className="personal-grid">
              <label>
                Ім’я (латиницею) *
                <input
                  type="text"
                  placeholder="наприкл. Ivan"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </label>
              <label>
                Прізвище (латиницею) *
                <input
                  type="text"
                  placeholder="наприкл. Ivanov"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </label>
            </div>
            <label>
              Електронний адрес *
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={saveData}
                onChange={e => setSaveData(e.target.checked)}
              />
              Зберегти мої дані для майбутніх бронювань
            </label>

            <h4>Контактні дані</h4>
            <label>
              Адреса *
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </label>
            <div className="personal-grid">
              <label>
                Місто *
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </label>
              <label>
                Країна/Регіон *
                <select
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                >
                  <option>Україна</option>
                  <option>Норвегія</option>
                  <option>Польща</option>
                  <option>Німеччина</option>
                </select>
              </label>
            </div>
            <label>
              Індекс (необов’язково)
              <input
                type="text"
                value={postal}
                onChange={e => setPostal(e.target.value)}
              />
            </label>
            <div className="personal-grid">
              <label>
                Телефон *
                <div className="phone-input">
                  <select
                    value={phoneCode}
                    onChange={e => setPhoneCode(e.target.value)}
                  >
                    <option>+380</option>
                    <option>+47</option>
                    <option>+48</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="123 456 789"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                  />
                </div>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={sendConfirmation}
                  onChange={e => setSendConfirmation(e.target.checked)}
                />
                Надіслати підтвердження на e-mail (рекомендується)
              </label>
            </div>
          </section>
        </div>

        {/* ПРАВА КОЛОНКА – ПІДСУМОК + КНОПКА */}
        <aside className="booking-right">
          {/* Деталі оплати */}
          <section className="booking-section">
            <h3>
              <FaCreditCard className="section-icon" /> Деталі оплати:
            </h3>
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Послуга</th>
                  <th>К-сть/Опис</th>
                  <th>Сума</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Проживання</td>
                  <td>{nights} ніч{nights === 1 ? '' : 'і'}</td>
                  <td>{stayTotal || '–'}</td>
                </tr>
                <tr>
                  <td>Прибирання</td>
                  <td>₴{cleaningFeePerNight} × {nights}</td>
                  <td>{cleaningTotal || '–'}</td>
                </tr>
                <tr>
                  <td>Комісія сервісу</td>
                  <td>–</td>
                  <td>{serviceFee}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">Разом</td>
                  <td className="total-cell">{total || '–'} грн</td>
                </tr>
              </tfoot>
            </table>
          </section>

          {/* Метод оплати */}
          <section className="booking-section">
            <h3>
              <FaRegCreditCard className="section-icon" /> Оберіть метод:
            </h3>
            <div className="payment-methods">
              <button
                type="button"
                className={method === 'saved' ? 'method active' : 'method'}
                onClick={() => setMethod('saved')}
              >
                Карткою **** 3333
              </button>
              <button
                type="button"
                className={method === 'new' ? 'method active' : 'method'}
                onClick={() => setMethod('new')}
              >
                Іншою карткою
                <span className="small-text">(налаштування)</span>
              </button>
            </div>
          </section>

          {/* Погодження та кнопка */}
          <div className="booking-actions">
            <label className="agree">
              <input
                type="checkbox"
                checked={accepted}
                onChange={e => setAccepted(e.target.checked)}
              />
              Згоден(на) з умовами проживання *
            </label>
            <button
              type="submit"
              className="btn-booking"
              disabled={!canBook}
            >
              Забронювати
            </button>
          </div>
        </aside>
      </div>
    </form>
  );
}
