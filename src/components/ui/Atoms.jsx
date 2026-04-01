import React from 'react';

export const Button = ({ children, variant = 'primary', style, ...props }) => {
  const className = `btn btn-${variant}`;
  return (
    <button className={className} style={style} {...props}>
      {children}
    </button>
  );
};

export const Input = ({ label, className, ...props }) => (
  <div className="input-group">
    {label && <label className="input-label">{label}</label>}
    <input className={`custom-input ${className}`} {...props} />
  </div>
);

export const Select = ({ label, options, ...props }) => (
  <div className="input-group">
    {label && <label className="input-label">{label}</label>}
    <select className="custom-input custom-select" {...props}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export const Card = ({ children, glass = true, className, style }) => (
  <div className={`card ${glass ? 'glass' : ''} ${className}`} style={style}>
    {children}
  </div>
);
