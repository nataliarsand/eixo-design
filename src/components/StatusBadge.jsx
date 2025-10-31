import React from 'react';
import './StatusBadge.css';

const StatusBadge = ({ children, variant = 'online' }) => {
  return (
    <span className={`status-badge status-badge--${variant}`}>
      <span className="status-badge__dot"></span>
      <span className="status-badge__text">{children}</span>
    </span>
  );
};

export default StatusBadge;
