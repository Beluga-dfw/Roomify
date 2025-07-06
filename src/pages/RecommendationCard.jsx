import React from 'react';
import './RecommendationCard.css';

export default function RecommendationCard({ Icon, title, price, onClick }) {
  return (
    <li className="rec-card" onClick={onClick}>
      {Icon && (
        <div className="rec-icon">
          <Icon />
        </div>
      )}
      <div className="rec-info">
        <div className="rec-title">{title}</div>
        <div className="rec-price">{price}</div>
      </div>
    </li>
  );
}
