import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightLeft, Plus, Minus, Repeat } from 'lucide-react';
import { useQuantityMeasurement } from '../../hooks/useQuantityMeasurement';
import { MEASUREMENT_TYPES, UNITS } from '../../constants/units';
import { Button, Input, Select, Card } from '../../components/ui/Atoms';

const Dashboard = () => {
  const {
    type, setType,
    val1, setVal1,
    unit1, setUnit1,
    val2, setVal2,
    unit2, setUnit2,
    operation, setOperation,
    result, resultUnit, loading, error,
    performOperation
  } = useQuantityMeasurement();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container"
      style={{ padding: '3rem 1.5rem' }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem' }} className="gradient-text">
          Precision Metrics
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>
          Simplified quantity conversion and management for modern workflows.
        </p>
      </div>

      {/* Measurement Selection Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
        {MEASUREMENT_TYPES.map((m) => (
          <Button
            key={m.id}
            onClick={() => setType(m.id)}
            style={{ 
              height: '8rem', 
              flexDirection: 'column', 
              fontSize: '1.1rem',
              backgroundColor: type === m.id ? m.color : 'var(--surface)',
              opacity: type === m.id ? 1 : 0.7,
              border: 'none'
            }}
          >
            <m.icon size={32} />
            {m.name}
          </Button>
        ))}
      </div>

      {/* Main Panel */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Card>
          {/* Operation Tabs */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', overflowX: 'auto' }}>
            {['CONVERT', 'COMPARE', 'ADD', 'SUBTRACT'].map((op) => (
              <button 
                key={op}
                onClick={() => setOperation(op)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: operation === op ? 'var(--primary)' : 'var(--text-muted)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '0.5rem 1rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {op}
                {operation === op && <motion.div layoutId="underline" style={{ position: 'absolute', bottom: -17, left: 0, right: 0, height: 2, background: 'var(--primary)' }} />}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Input 
                label="Quantity 1" 
                type="number" 
                value={val1} 
                onChange={(e) => setVal1(e.target.value)} 
                placeholder="Enter value"
              />
              <Select 
                options={UNITS[type]} 
                value={unit1} 
                onChange={(e) => setUnit1(e.target.value)} 
              />
            </div>

            <div style={{ color: 'var(--text-muted)', paddingTop: '1.5rem' }}>
               {operation === 'CONVERT' ? <ArrowRightLeft size={24} /> : 
                operation === 'ADD' ? <Plus size={24} /> : 
                operation === 'SUBTRACT' ? <Minus size={24} /> : 
                <Repeat size={24} />}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="input-label">{operation === 'CONVERT' ? 'To Unit' : 'Quantity 2'}</label>
              {operation !== 'CONVERT' && (
                <Input 
                  type="number" 
                  value={val2} 
                  onChange={(e) => setVal2(e.target.value)} 
                  placeholder="Enter value"
                />
              )}
              <Select 
                options={UNITS[type]} 
                value={unit2} 
                onChange={(e) => setUnit2(e.target.value)} 
              />
            </div>
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {error && <p style={{ color: 'var(--error)', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</p>}
            <Button 
              style={{ width: '100%', maxWidth: '300px', height: '3.5rem', fontSize: '1.1rem' }}
              onClick={performOperation}
              disabled={loading}
            >
              {loading ? 'Processing...' : `Perform ${operation}`}
            </Button>

            <AnimatePresence>
              {result !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{ 
                    marginTop: '2rem', 
                    padding: '1.5rem 3rem', 
                    borderRadius: '1rem', 
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px dashed var(--primary)',
                    textAlign: 'center'
                  }}
                >
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {operation === 'COMPARE' ? 'Verification' : 'Computed Result'}
                  </p>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0.5rem 0' }}>
                    {typeof result === 'string' ? result.charAt(0).toUpperCase() + result.slice(1) : result}
                  </h3>
                  {resultUnit && <p style={{ color: 'var(--primary)', fontWeight: 500 }}>{resultUnit}</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default Dashboard;
