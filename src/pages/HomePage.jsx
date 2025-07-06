import React, { useRef, useState, useEffect } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaUserAlt,
  FaHeart,
  FaStar,
} from 'react-icons/fa';
import './HomePage.css';

// Генератор мок-данных для каруселей
const makeItems = (baseId, titles) =>
  titles.map((title, i) => ({
    id: baseId + i,
    title,
    price: 1000 + i * 300,
    img: `/images/rec${(i % 3) + 1}.jpg`,
    rating: (4 + Math.random()).toFixed(1),
    nights: 1 + (i % 3),
  }));

const mockRecent      = makeItems(1,  ['Студія біля моря','Loft у центрі','Котедж у горах','Апарт-стайл','Міні-готель','City View','Еко-дом']);
const mockKiev        = makeItems(11,['Квартира на Подолі','Дім у передмісті','Студіо для пар','Центр міста','Річковий вид','Панорама','Мансарда']);
const mockOdessa      = makeItems(21,['Бунгало біля моря','Сімейний котедж','Студія в центрі','Вид на порт','Морський бриз','Hygge flat','Садовий будинок']);
const mockNY          = makeItems(31,['Пентхаус Манхеттен','Студія Бруклін','Кондомініум Челсі','Loft SOHO','Skyline view','Central Park','Tribeca']);
const mockRecommended = makeItems(41,['Ретро-апартаменти','Сучасний loft','Котедж з каміном','Minimal flat','Art space','Русска душа','Loft&Co']);

export default function HomePage() {
  // Состояние полей поиска
  const [destination, setDestination] = useState('');
  const [dateIn, setDateIn]           = useState('');
  const [dateOut, setDateOut]         = useState('');

  // Гости
  const [showGuests, setShowGuests]   = useState(false);
  const [adults, setAdults]     = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants]   = useState(0);
  const [pets, setPets]         = useState(0);

  const guestRef = useRef();

  // Закрытие дропдауна при клике вне его
  useEffect(() => {
    const handleClick = e => {
      if (guestRef.current && !guestRef.current.contains(e.target)) {
        setShowGuests(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Текст в поле «Кто едет?»
  const summaryGuests = [
    `${adults} доросл${adults > 1 ? 'і' : 'ий'}`,
    children ? `${children} дит${children > 1 ? 'и' : 'ина'}` : null,
    infants  ? `${infants} немовлят${infants > 1 ? 'а' : ''}` : null,
    pets     ? `${pets} тварин` : null,
  ].filter(Boolean).join(', ') || 'Кто едет?';

  // Карусели секций
  const carousels = [
    { title: 'Ви нещодавно дивилися',    items: mockRecent },
    { title: 'Популярні в Києві',         items: mockKiev },
    { title: 'Кращі варіанти Одеси',      items: mockOdessa },
    { title: 'Топ-апартаменти Нью-Йорка', items: mockNY },
    { title: 'Рекомендації для вас',      items: mockRecommended },
  ];
  const carouselRefs = useRef(carousels.map(() => React.createRef()));

  // Функция прокрутки карусели
  const scroll = (ref, dir) => {
    if (ref.current) {
      ref.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
    }
  };

  // Рендер одной карточки
  const renderCard = item => (
    <div key={item.id} className="card">
      <div className="card-img-wrapper">
        <img src={item.img} alt={item.title} />
        <button className="btn-fav"><FaHeart/></button>
      </div>
      <div className="card-body">
        <h5>{item.title}</h5>
        <p className="card-info">
          <span>{item.price}₴/доба</span>
          <span>• {item.nights} ніч{item.nights>1?'і':''}</span>
          <span>• ★{item.rating}</span>
        </p>
      </div>
    </div>
  );

  return (
    <div className="hp-container">
      {/* ——— Шапка поиска ——— */}
      <div className="hp-search-container">
        <div className="hp-search">
          {/* Поле «Куда едете?» */}
          <div className="hp-search-field">
            <FaMapMarkerAlt className="icon"/>
            <input
              type="text"
              placeholder="Куди ви їдете?"
              value={destination}
              onChange={e => setDestination(e.target.value)}
            />
          </div>

          {/* Поле «Заїзд» */}
          <div className="hp-search-field">
            <FaRegCalendarAlt className="icon"/>
            <input
              type="date"
              placeholder="Заїзд"
              value={dateIn}
              onChange={e => setDateIn(e.target.value)}
            />
          </div>

          {/* Поле «Виїзд» */}
          <div className="hp-search-field">
            <FaRegCalendarAlt className="icon"/>
            <input
              type="date"
              placeholder="Виїзд"
              value={dateOut}
              onChange={e => setDateOut(e.target.value)}
            />
          </div>

          {/* Поле «Кто едет?» */}
          <div
            className="hp-search-field hp-guest-field"
            ref={guestRef}
            onClick={() => setShowGuests(v => !v)}
          >
            <FaUserAlt className="icon"/>
            <input
              type="text"
              readOnly
              value={summaryGuests}
            />
            {showGuests && (
              <div className="guest-dropdown">
                {[
                  { label: 'Взрослые', count: adults,   set: setAdults,   min: 1, sub: 'От 13 лет' },
                  { label: 'Дети',      count: children, set: setChildren, min: 0, sub: '2–12 лет' },
                  { label: 'Младенцы',  count: infants,  set: setInfants,  min: 0, sub: 'Младше 2' },
                  { label: 'Дом. животные', count: pets, set: setPets,  min: 0, sub: 'Ваш питомец?' },
                ].map(({ label, count, set, min, sub }) => (
                  <div key={label} className="guest-row">
                    <div className="guest-labels">
                      <div className="guest-name">{label}</div>
                      <div className="guest-sub">{sub}</div>
                    </div>
                    <div className="guest-controls">
                      <button disabled={count <= min} onClick={() => set(count - 1)}>−</button>
                      <span>{count}</span>
                      <button onClick={() => set(count + 1)}>＋</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Кнопка поиска */}
          <button className="hp-btn">
            <FaSearch/>
          </button>
        </div>
      </div>

      {/* ——— Секции с каруселями ——— */}
      {carousels.map((sec, idx) => (
        <section key={idx} className="hp-section">
          <h3>{sec.title}</h3>
          <div className="hp-carousel">
            <button
              className="hp-arrow left"
              onClick={() => scroll(carouselRefs.current[idx], -1)}
            >
              <FaChevronLeft/>
            </button>
            <div className="hp-cards" ref={carouselRefs.current[idx]}>
              {sec.items.map(renderCard)}
            </div>
            <button
              className="hp-arrow right"
              onClick={() => scroll(carouselRefs.current[idx], 1)}
            >
              <FaChevronRight/>
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}
