// src/pages/SearchResultsPage.jsx

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaUserAlt,
  FaHeart,
  FaHome,
  FaWarehouse,
  FaMountain,
  FaBuilding,
} from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './SearchResultsPage.css';

// Fix для іконок Leaflet у CRA
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl:       require('leaflet/dist/images/marker-icon.png'),
  shadowUrl:     require('leaflet/dist/images/marker-shadow.png'),
});

// Типи житла з іконками
const TYPES = [
  { key: 'studio',  icon: FaHome },
  { key: 'loft',    icon: FaWarehouse },
  { key: 'cottage', icon: FaMountain },
  { key: 'apart',   icon: FaBuilding },
];

// Мок-генерація лістингу з координатами
const makeItems = n =>
  Array.from({ length: n }, (_, i) => {
    const t = TYPES[i % TYPES.length];
    const lat = 50.45 + (Math.random() - 0.5) * 0.1;
    const lng = 30.52 + (Math.random() - 0.5) * 0.1;
    return {
      id: i + 1,
      type:   t.key,
      title:  `${t.key === 'studio'  ? 'Студія' :
               t.key === 'loft'    ? 'Loft'   :
               t.key === 'cottage' ? 'Котедж' : 'Апарт'} у центрі`,
      img:    `/images/rec${(i % 3) + 1}.jpg`,
      price:  800 + (i % 5) * 300,
      nights: 1 + (i % 3),
      rating: (4 + Math.random()).toFixed(1),
      coords: [lat, lng],
    };
  });
const listings = makeItems(12);

export default function SearchResultsPage() {
  const navigate = useNavigate();

  // === Search Bar ===
  const [where, setWhere]         = useState('');
  const [dateIn, setDateIn]       = useState('');
  const [dateOut, setDateOut]     = useState('');
  const [guests, setGuests]       = useState(1);
  const [showGuests, setShowGuests] = useState(false);
  const guestRef = useRef();

  useEffect(() => {
    const handleClickOutside = e => {
      if (guestRef.current && !guestRef.current.contains(e.target)) {
        setShowGuests(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const guestText = `${guests} гост${guests > 1 ? 'ей' : 'ь'}`;

  // === Filters state (UI only, без реальної фільтрації) ===
  const [priceMin, setPriceMin]   = useState('');
  const [priceMax, setPriceMax]   = useState('');
  const [fBreakfast, setFBreakfast] = useState(false);
  const [fWifi, setFWifi]         = useState(false);
  const [rating5, setRating5]     = useState(false);
  const [rating4p, setRating4p]   = useState(false);
  const [rating3p, setRating3p]   = useState(false);
  const [typeHotel,   setTypeHotel]   = useState(false);
  const [typePrivate, setTypePrivate] = useState(false);
  const [typeHouse,   setTypeHouse]   = useState(false);
  const [typeLoft,    setTypeLoft]    = useState(false);
  const [beds, setBeds]   = useState(0);
  const [baths, setBaths] = useState(0);

  // Тут ви можете вставити реальну фільтрацію based on state — зараз просто всі лістинги
  const filtered = listings.filter(item => {
    // приклад фільтрації за ціною
    if (priceMin && item.price < +priceMin) return false;
    if (priceMax && item.price > +priceMax) return false;
    // інші фільтри можна додати аналогічно
    return true;
  });

  const getTypeIcon = key => {
    const t = TYPES.find(x => x.key === key);
    return t ? t.icon : FaHome;
  };

  return (
    <div className="results-page">
      {/* 1. Search Bar */}
      <div className="hp-search-container">
        <div className="hp-search">
          <div className="hp-search-field">
            <FaMapMarkerAlt className="icon"/>
            <input
              type="text"
              placeholder="Куди ви їдете?"
              value={where}
              onChange={e => setWhere(e.target.value)}
            />
          </div>
          <div className="hp-search-field">
            <FaRegCalendarAlt className="icon"/>
            <input
              type="date"
              placeholder="Приїзд"
              value={dateIn}
              onChange={e => setDateIn(e.target.value)}
            />
          </div>
          <div className="hp-search-field">
            <FaRegCalendarAlt className="icon"/>
            <input
              type="date"
              placeholder="Виїзд"
              value={dateOut}
              onChange={e => setDateOut(e.target.value)}
            />
          </div>
          <div
            className="hp-search-field hp-guest-field"
            ref={guestRef}
            onClick={() => setShowGuests(true)}
          >
            <FaUserAlt className="icon"/>
            <input
              type="text"
              readOnly
              placeholder="Гості"
              value={guestText}
            />
            {showGuests && (
              <div className="guest-dropdown">
                <div className="guest-row">
                  <div className="guest-labels">
                    <div className="guest-name">Гості</div>
                    <div className="guest-sub">Від 1 до 16</div>
                  </div>
                  <div className="guest-controls">
                    <button disabled={guests <= 1} onClick={() => setGuests(g => g - 1)}>−</button>
                    <span>{guests}</span>
                    <button onClick={() => setGuests(g => g + 1)}>＋</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button className="hp-btn"><FaSearch/></button>
        </div>
      </div>

      {/* 2. Sidebar + Listings */}
      <div className="results-body">
        <aside className="sidebar-card">
          {/* Карта */}
          <MapContainer
            center={[50.45, 30.52]}
            zoom={12}
            scrollWheelZoom={false}
            className="map-container"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filtered.map(item => (
              <Marker key={item.id} position={item.coords}>
                <Popup>
                  {item.title}<br/>
                  {item.price}₴/доба
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Фільтри */}
          <div className="filters-panel">
            <h3>Всі фільтри</h3>

            <section className="filter-group">
              <h4>Ваш бюджет</h4>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="мін ₴"
                  value={priceMin}
                  onChange={e => setPriceMin(e.target.value)}
                />
                <span>—</span>
                <input
                  type="number"
                  placeholder="макс ₴"
                  value={priceMax}
                  onChange={e => setPriceMax(e.target.value)}
                />
              </div>
            </section>

            <section className="filter-group">
              <h4>Популярні фільтри</h4>
              <label>
                <input
                  type="checkbox"
                  checked={fBreakfast}
                  onChange={() => setFBreakfast(f => !f)}
                /> Сніданок
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={fWifi}
                  onChange={() => setFWifi(w => !w)}
                /> Wi-Fi
              </label>
            </section>

            <section className="filter-group">
              <h4>Оцінка</h4>
              <label>
                <input
                  type="checkbox"
                  checked={rating5}
                  onChange={() => setRating5(r => !r)}
                /> ★ 5
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={rating4p}
                  onChange={() => setRating4p(r => !r)}
                /> ★ 4+
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={rating3p}
                  onChange={() => setRating3p(r => !r)}
                /> ★ 3+
              </label>
            </section>

            <section className="filter-group">
              <h4>Тип розміщення</h4>
              <label>
                <input
                  type="checkbox"
                  checked={typeHotel}
                  onChange={() => setTypeHotel(t => !t)}
                /> Готель
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={typePrivate}
                  onChange={() => setTypePrivate(t => !t)}
                /> Приватне
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={typeHouse}
                  onChange={() => setTypeHouse(t => !t)}
                /> Будинок
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={typeLoft}
                  onChange={() => setTypeLoft(t => !t)}
                /> Лофт
              </label>
            </section>

            <section className="filter-group">
              <h4>Спальні і ванні кімнати</h4>
              <div className="rooms-control">
                <span>Спальні</span>
                <div className="guest-controls">
                  <button disabled={beds <= 0} onClick={() => setBeds(b => b - 1)}>−</button>
                  <span>{beds}</span>
                  <button onClick={() => setBeds(b => b + 1)}>＋</button>
                </div>
              </div>
              <div className="rooms-control">
                <span>Ванні кімнати</span>
                <div className="guest-controls">
                  <button disabled={baths <= 0} onClick={() => setBaths(b => b - 1)}>−</button>
                  <span>{baths}</span>
                  <button onClick={() => setBaths(b => b + 1)}>＋</button>
                </div>
              </div>
            </section>
          </div>
        </aside>

        <main className="listings-grid">
          {filtered.map(item => {
            const Icon = getTypeIcon(item.type);
            return (
              <div key={item.id} className="card">
                <div className="card-img-wrapper">
                  <img src={item.img} alt={item.title} />
                  <button className="btn-fav"><FaHeart/></button>
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    {/* Клік на іконку — перехід */}
                    <Icon
                      className="card-type-icon"
                      onClick={() => navigate(`/booking/${item.id}`)}
                    />
                    {item.title}
                  </h5>
                  <p className="card-info">
                    <span>{item.price}₴/доба</span>
                    <span> • {item.nights} ніч{item.nights > 1 ? 'і' : ''}</span>
                    <span> • ★{item.rating}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
}
