import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserAlt,
  FaEnvelope,
  FaPhone,
  FaCreditCard,
  FaGlobe,
  FaClock,
  FaBell,
  FaCalendarAlt,
  FaPlus,
} from 'react-icons/fa';
import './ProfilePage.css';

export default function ProfilePage() {
  const [tab, setTab] = useState('about');
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: 'Іван Петренко',
    email: 'ivan.petrenko@example.com',
    phone: '+380991234567',
    description: 'Люблю подорожувати й відкривати нові місця.',
    location: 'Київ, Україна',
    languages: 'Українська, Англійська',
    timezone: 'Europe/Kiev',
    notifyEmail: true,
    notifySMS: false,
    cardNumber: '**** **** **** 3456',
    cardExpiry: '12/24',
    cardCVC: '123',
  });

  const myBookings = [
    { id: 1, placeId: 4, place: 'Апарт-стайл у центрі', date: '2025-07-15', total: 2400 },
    { id: 2, placeId: 2, place: 'Loft у центрі',         date: '2025-08-01', total: 2600 },
  ];
  const myListings = [
    { id: 1, title: 'Студія біля моря', price: 800 },
    { id: 2, title: 'Loft у центрі',      price: 1300 },
    { id: 3, title: 'Котедж у горах',     price: 1600 },
  ];

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setProfile(p => ({
      ...p,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const save = () => {
    setEditMode(false);
    // TODO: persist changes
  };

  const cancel = () => {
    setEditMode(false);
    // TODO: optionally reset state if tracking temp state
  };

  return (
    <div className="profile-page">
      <div className="container">
        <aside className="profile-sidebar">
          <button className={tab==='about'   ? 'active' : ''} onClick={()=>setTab('about')}>
            <FaUserAlt/> Про мене
          </button>
          <button className={tab==='bookings'? 'active' : ''} onClick={()=>setTab('bookings')}>
            <FaCalendarAlt/> Бронювання
          </button>
          <button className={tab==='listings'? 'active' : ''} onClick={()=>setTab('listings')}>
            <FaPlus/> Оголошення
          </button>
        </aside>

        <main className="profile-content">
          {/* About Me */}
          {tab==='about' && (
            <section className="about-section">
              <h2>Про мене</h2>
              <div className="about-inner">
                <img
                  className="profile-photo"
                  src="https://i.pravatar.cc/150?img=13"
                  alt="Аватар"
                />
                <div className="info-block">
                  <label>
                    Ім’я
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </label>
                  <label>
                    <FaEnvelope/> Email
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </label>
                  <label>
                    <FaPhone/> Телефон
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </label>
                  <label>
                    Опис про себе
                    <textarea
                      name="description"
                      value={profile.description}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </label>
                  <label>
                    <FaGlobe/> Мови
                    <input
                      type="text"
                      name="languages"
                      value={profile.languages}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </label>
                  <label>
                    <FaClock/> Часовий пояс
                    <select
                      name="timezone"
                      value={profile.timezone}
                      onChange={handleChange}
                      disabled={!editMode}
                    >
                      <option>Europe/Kiev</option>
                      <option>Europe/London</option>
                      <option>America/New_York</option>
                      <option>Asia/Tokyo</option>
                    </select>
                  </label>

                  {/* Payment Block */}
                  <div className="payment-block">
                    <h3><FaCreditCard/> Платіжні дані</h3>
                    <label>
                      Номер картки
                      <input
                        type="text"
                        name="cardNumber"
                        value={profile.cardNumber}
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </label>
                    <div className="field-row">
                      <label>
                        Термін дії
                        <input
                          type="text"
                          name="cardExpiry"
                          value={profile.cardExpiry}
                          onChange={handleChange}
                          disabled={!editMode}
                        />
                      </label>
                      <label>
                        CVC
                        <input
                          type="text"
                          name="cardCVC"
                          value={profile.cardCVC}
                          onChange={handleChange}
                          disabled={!editMode}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Buttons */}
                  {!editMode
                    ? <button className="btn-edit" onClick={()=>setEditMode(true)}>Змінити дані</button>
                    : (
                      <div className="edit-buttons">
                        <button className="btn-save" onClick={save}>Зберегти</button>
                        <button className="btn-cancel" onClick={cancel}>Скасувати</button>
                      </div>
                    )
                  }
                </div>
              </div>
            </section>
          )}

          {/* My Bookings */}
          {tab==='bookings' && (
            <section className="bookings-section">
              <h2>Мої бронювання</h2>
              <ul className="bookings-list">
                {myBookings.map(b=>(
                  <li key={b.id}>
                    <div>
                      <h4>{b.place}</h4>
                      <p>Дата: {b.date}</p>
                      <p>Сума: {b.total}₴</p>
                    </div>
                    <button className="btn-details" onClick={()=>navigate(`/details/${b.placeId}`)}>
                      Деталі
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* My Listings */}
          {tab==='listings' && (
            <section className="listings-section">
              <div className="listings-header">
                <h2>Мої оголошення</h2>
                <button className="btn-add" onClick={()=>navigate('/add-listing')}>
                  <FaPlus/> Додати
                </button>
              </div>
              <ul className="listings-list">
                {myListings.map(l=>(
                  <li key={l.id}>
                    <div>
                      <h4>{l.title}</h4>
                      <p>{l.price}₴/доба</p>
                    </div>
                    <button className="btn-details" onClick={()=>navigate(`/details/${l.id}`)}>
                      Переглянути
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
