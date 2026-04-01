import { useState, useEffect } from 'react';
import { UNITS } from '../constants/units';
import { measurementService } from '../services/api';

export const useQuantityMeasurement = (initialType = 'LENGTH') => {
  const [type, setType] = useState(initialType);
  const [val1, setVal1] = useState(1);
  const [unit1, setUnit1] = useState(UNITS[initialType][0]);
  const [val2, setVal2] = useState('');
  const [unit2, setUnit2] = useState(UNITS[initialType][1] || UNITS[initialType][0]);
  const [operation, setOperation] = useState('CONVERT');
  const [result, setResult] = useState(null);
  const [resultUnit, setResultUnit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUnit1(UNITS[type][0]);
    setUnit2(UNITS[type][1] || UNITS[type][0]);
    setResult(null);
    setResultUnit(null);
    setError(null);
  }, [type]);

  const performOperation = async () => {
    setLoading(true);
    setError(null);
    try {
      const v1 = parseFloat(val1);
      const v2 = (operation === 'CONVERT') ? 0 : parseFloat(val2 || 0);

      if (isNaN(v1) || (operation !== 'CONVERT' && isNaN(v2))) {
        throw new Error('Please enter valid numeric values');
      }

      const payload = {
        thisQuantityDTO: {
          value: v1,
          unit: unit1,
          measurementType: type
        },
        thatQuantityDTO: {
          value: v2,
          unit: unit2,
          measurementType: type
        }
      };

      let response;
      switch (operation) {
        case 'CONVERT':
          response = await measurementService.convert(payload);
          break;
        case 'COMPARE':
          response = await measurementService.compare(payload);
          break;
        case 'ADD':
          response = await measurementService.add(payload);
          break;
        case 'SUBTRACT':
          response = await measurementService.subtract(payload);
          break;
        case 'DIVIDE':
          response = await measurementService.divide(payload);
          break;
        default:
          throw new Error('Unsupported operation');
      }

      setResult(response.data.resultValue !== null && response.data.resultValue !== undefined ? response.data.resultValue : response.data.resultString);
      setResultUnit(response.data.resultUnit);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to perform operation. Please check your inputs.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    type, setType,
    val1, setVal1,
    unit1, setUnit1,
    val2, setVal2,
    unit2, setUnit2,
    operation, setOperation,
    result, resultUnit, loading, error,
    performOperation
  };
};
