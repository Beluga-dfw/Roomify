import React, { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaRulerCombined,
  FaLayerGroup,
  FaDoorOpen,
  FaPaw,
  FaCouch,
  FaHome,
  FaBuilding
} from 'react-icons/fa';
import './DetailsPage.css';

export default function DetailsPage() {
  const mapUrl = 'https://www.google.com/maps';

  // Відгуки
  const [reviews, setReviews] = useState([
    { id: 1, author: 'Анна', rating: 5, text: 'Чудове місце, дуже сподобалося!' },
    { id: 2, author: 'Іван', rating: 4, text: 'Все добре, але трохи шумно вночі.' },
  ]);
  const [showReviews, setShowReviews] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, text: '' });

  // Середній рейтинг
  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const toggleReviews = () => setShowReviews(prev => !prev);

  const handleSubmit = e => {
    e.preventDefault();
    if (newReview.rating > 0 && newReview.text.trim()) {
      setReviews([
        ...reviews,
        { id: Date.now(), author: 'Ви', ...newReview }
      ]);
      setNewReview({ rating: 0, text: '' });
    }
  };

  const renderStars = value => {
    const full = Math.round(value);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  };

  // Дані для блоку фіч
  const features = [
    { Icon: FaRulerCombined, label: 'Площа: 57 м²' },
    { Icon: FaLayerGroup,    label: 'Поверхість: 25' },
    { Icon: FaDoorOpen,      label: 'Поверх: 11' },
    { Icon: FaPaw,           label: 'Домашні тварини: Так' },
    { Icon: FaCouch,         label: 'Меблювання: з меблями' },
  ];

  // Дані для рекомендацій
  const recommendations = [
    { icon: <FaHome />,     title: '2к квартира біля метро', price: '2500₴/доба' },
    { icon: <FaCouch />,    title: 'Лофт у центрі',           price: '3200₴/доба' },
    { icon: <FaBuilding />, title: 'Студіо на Подолі',        price: '2800₴/доба' },
  ];

  return (
    <div className="details-container">
      {/* ← Назад */}
      <nav className="breadcrumbs">
        <a href="/" className="back-link">← Назад</a>
      </nav>

      {/* Заголовок */}
      <h1 className="details-title">The Nolita Express Hostel</h1>

      {/* Рейтинг над фото */}
      <div
        className="rating-section"
        onClick={toggleReviews}
        title="Подивитися відгуки"
      >
        <div className="avg-stars">{renderStars(avgRating)}</div>
        <div className="avg-summary">
          <span className="avg-value">{avgRating}</span>
          <span className="avg-count"> ({reviews.length} відгуків)</span>
        </div>
      </div>

      {/* Панель відгуків */}
      {showReviews && (
        <aside className="reviews-panel">
          <button className="close-btn" onClick={toggleReviews}>&times;</button>

          <div className="reviews-header">
            <div className="avg-stars-large">{renderStars(avgRating)}</div>
            <div className="avg-summary-large">
              <span className="avg-value-large">{avgRating}</span>
              <span className="avg-count-large"> {reviews.length} відгуків</span>
            </div>
          </div>

          <ul className="reviews-list">
            {reviews.map(r => (
              <li key={r.id} className="review-item">
                <div className="review-top">
                  <span className="review-author">{r.author}</span>
                  <span className="review-stars">{renderStars(r.rating)}</span>
                </div>
                <p className="review-text">{r.text}</p>
              </li>
            ))}
          </ul>

          <form className="review-form" onSubmit={handleSubmit}>
            <label>
              Оцініть:
              <select
                value={newReview.rating}
                onChange={e => setNewReview({ ...newReview, rating: +e.target.value })}
              >
                <option value="0">–</option>
                {[1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n} ★</option>
                ))}
              </select>
            </label>
            <label>
              Ваш відгук:
              <textarea
                rows="3"
                value={newReview.text}
                onChange={e => setNewReview({ ...newReview, text: e.target.value })}
              />
            </label>
            <button type="submit" className="btn-submit">Відправити</button>
          </form>
        </aside>
      )}

      {/* Фото + бронювання */}
      <div className="details-top">
        <div className="photos">
          <div className="photo-large placeholder" />
          <div className="photo-thumbs">
            <div className="thumb placeholder" />
            <div className="thumb more-thumb placeholder">
              <span className="more-label">+2</span>
            </div>
          </div>
        </div>

        <aside className="booking-panel">
          <button className="btn-book">Забронювати</button>
          <div className="map-box">
            <a href={mapUrl} target="_blank" rel="noreferrer">
              <FaMapMarkerAlt /> Показати на карті
            </a>
          </div>
        </aside>
      </div>

      {/* Ціна + фічи */}
      <div className="card price-features">
        <div className="price">3000₴/доба</div>
        <div className="features">
          {features.map(({Icon, label}, i) => (
            <div key={i} className="feature-pill">
              <Icon className="feature-icon"/>
              <span className="feature-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Опис */}
      <section className="card description">
        <h2>Опис</h2>
        <p>
          Сучасна двокімнатна квартира з євроремонтом, площею 57 м²,
          розташована на 11 поверсі 25-поверхового будинку. Ідеальна для пари або невеликої родини.
        </p>
      </section>

      {/* Рекомендації */}
      <section className="card recommended">
        <h3>Вам також може сподобатися</h3>
        <ul className="rec-list">
          {recommendations.map((r, i) => (
            <li key={i} className="rec-card">
              <div className="rec-icon">{r.icon}</div>
              <div className="rec-info">
                <div className="rec-title">{r.title}</div>
                <div className="rec-price">{r.price}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
