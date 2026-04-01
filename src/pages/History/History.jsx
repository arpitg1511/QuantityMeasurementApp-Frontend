import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Atoms';
import { measurementService } from '../../services/api';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await measurementService.getAllHistory(); 
        // Backend returns oldest first by default or as-is. 
        // We'll reverse to show newest first.
        setHistory([...response.data].reverse() || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load history. Please ensure you are logged in correctly.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <div className="container" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>Loading history...</div>;
  if (error) return <div className="container" style={{ padding: '3rem 1.5rem', color: 'var(--error)', textAlign: 'center' }}>{error}</div>;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem' }}>Operation History</h2>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
            <thead>
              <tr style={{ background: 'var(--glass)', borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '1.5rem', textAlign: 'left', color: 'var(--text-muted)' }}>Type</th>
                <th style={{ padding: '1.5rem', textAlign: 'left', color: 'var(--text-muted)' }}>Operation</th>
                <th style={{ padding: '1.5rem', textAlign: 'left', color: 'var(--text-muted)' }}>Details</th>
                <th style={{ padding: '1.5rem', textAlign: 'left', color: 'var(--text-muted)' }}>Result</th>
                <th style={{ padding: '1.5rem', textAlign: 'left', color: 'var(--text-muted)' }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr><td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No history found. Try performing some measurements!</td></tr>
              ) : (
                history.map((row, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid var(--glass-border)', background: row.error ? 'rgba(239, 68, 68, 0.05)' : 'transparent' }}>
                    <td style={{ padding: '1.5rem', fontWeight: 600 }}>{row.thisMeasurementType}</td>
                    <td style={{ padding: '1.5rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '1rem', 
                        background: 'var(--surface-light)', 
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        fontWeight: 700
                      }}>
                        {row.operation}
                      </span>
                    </td>
                    <td style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <span>{row.thisValue} {row.thisUnit}</span>
                        {row.operation !== 'convert' && (
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>& {row.thatValue} {row.thatUnit}</span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '1.5rem' }}>
                      {row.error ? (
                        <span style={{ color: 'var(--error)', fontSize: '0.875rem' }}>{row.errorMessage}</span>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem' }}>
                             {row.resultValue !== null && row.resultValue !== undefined ? row.resultValue : 
                              row.resultString === 'true' ? 'Equivalent' : 
                              row.resultString === 'false' ? 'Not Equivalent' : 
                              row.resultString}
                          </span>
                          {row.resultUnit && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.resultUnit}</span>}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      {row.createdAt ? new Date(row.createdAt).toLocaleString() : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default History;
