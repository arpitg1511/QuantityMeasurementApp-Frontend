import { Ruler, Weight, Droplets, Thermometer } from 'lucide-react';

export const MEASUREMENT_TYPES = [
  { id: 'LENGTH', name: 'Length', icon: Ruler, color: '#6366f1' },
  { id: 'WEIGHT', name: 'Weight', icon: Weight, color: '#06b6d4' },
  { id: 'VOLUME', name: 'Volume', icon: Droplets, color: '#8b5cf6' },
  { id: 'TEMPERATURE', name: 'Temperature', icon: Thermometer, color: '#f59e0b' },
];

export const UNITS = {
  LENGTH: ['FEET', 'INCH', 'YARDS', 'CENTIMETERS'],
  WEIGHT: ['KILOGRAM', 'GRAM', 'POUND'],
  VOLUME: ['LITRE', 'MILLILITRE', 'GALLON'],
  TEMPERATURE: ['CELSIUS', 'FAHRENHEIT', 'KELVIN'],
};
