import React, { useState } from 'react';
import './ModeratorPage.css';

const ModeratorPage = () => {
  const [statusFilter, setStatusFilter] = useState('На модерації');
  const [sortOption, setSortOption] = useState('Дата (нові спочатку)');
  const [search, setSearch] = useState('');

  const listings = [
    {
      id: 1,
      title: '3х кімнатна в центрі',
      address: 'м. Київ, вул. Велика Васильківська, буд. 98',
      price: '1200 грн/доба',
      date: '14.05.2025',
      author: 'Сергій Петрович (sergiy_petrovich@gmail.com)',
      complaints: 2,
      rating: 4,
    },
    {
      id: 2,
      title: '2к квартира біля метро',
      address: 'м. Львів, вул. Наукова, буд. 12',
      price: '1000 грн/доба',
      date: '12.05.2025',
      author: 'Олена Іванівна (olena_ivanivna@gmail.com)',
      complaints: 0,
      rating: 5,
    },
  ];

  return (
    <div className="moderator-container">
      <aside className="sidebar">
        <div className="mod-info">
          <div className="mod-name">IvanMod <span className="online-indicator">● online</span></div>
        </div>
        <div className="stats">
          <p><span role="img" aria-label="new">🆕</span> Нові: <strong>12</strong></p>
          <p><span role="img" aria-label="approved">✅</span> Схвалено: <strong>45</strong></p>
          <p><span role="img" aria-label="rejected">❌</span> Відхилено: <strong>5</strong></p>
          <p><span role="img" aria-label="complaints">⚠️</span> Скарги: <strong>3</strong></p>
        </div>
      </aside>

      <main className="main-content">
        <div className="header">
          <h2>Оголошення</h2>
          <div className="controls">
            <input
              type="text"
              placeholder="Пошук..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>На модерації</option>
              <option>Схвалено</option>
              <option>Відхилено</option>
              <option>Зі скаргами</option>
            </select>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option>Дата (нові спочатку)</option>
              <option>За популярністю</option>
              <option>За кількістю скарг</option>
              <option>За містом</option>
              <option>За автором</option>
              <option>По кількості фото</option>
              <option>За алфавітом</option>
              <option>Наявність коментарів модераторів</option>
              <option>За статусом</option>
            </select>
          </div>
        </div>

        <div className="listings">
          {listings.map((listing) => (
            <div key={listing.id} className="listing-card">
              <div className="image-placeholder"></div>
              <div className="listing-details">
                <h3>{listing.title}</h3>
                <p><strong>Адреса:</strong> {listing.address}</p>
                <p><strong>Ціна:</strong> {listing.price}</p>
                <p><strong>Дата:</strong> {listing.date}</p>
                <p><strong>Автор:</strong> {listing.author}</p>
                <p><strong>Скарги:</strong> {listing.complaints}</p>
                <p><strong>Рейтинг:</strong> {'★'.repeat(listing.rating)}{'☆'.repeat(5 - listing.rating)}</p>
                <div className="actions">
                  <button className="approve">Схвалити</button>
                  <button className="reject">Відхилити</button>
                  <button className="detail">Деталі</button>
                  <button className="comment">Комент</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ModeratorPage;
