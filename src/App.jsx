import React, { useEffect, useState, useCallback } from 'react';
import * as wasm from "@aiamitsuri/interoperability-ffi-wasm";

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const loadData = useCallback(async (p) => {
    setLoading(true);
    try {
      await wasm.default();
      const data = await wasm.fetch_from_js({ 
        page: p.toString(),
        ids: null 
      });
      setResults(data);
    } catch (err) {
      console.error("Wasm Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(page);
  }, [page, loadData]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'left', maxWidth: '1000px' }}>
      <h1 style={{ marginTop: 0 }}>Interoperability FFI (React)</h1>

      {loading && !results ? (
        <p>🚀 Initializing Rust Wasm...</p>
      ) : (
        <>
          <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button onClick={handlePrev} disabled={loading || !results?.pagination?.prev_page_url} style={{ padding: '6px 12px', cursor: 'pointer' }}>
              Previous
            </button>

            <span style={{ fontWeight: 'bold' }}>
              Page {results?.pagination?.current_page || page} / {results?.pagination?.total_pages || 1}
            </span>

            <button onClick={handleNext} disabled={loading || !results?.pagination?.next_page_url} style={{ padding: '6px 12px', cursor: 'pointer' }}>
              Next
            </button>
          </div>

          {results?.data ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {results.data.map((item) => (
                <div key={item.id} style={{ background: '#f9f9f9', border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
                  <h3 style={{ margin: '0 0 10px 0' }}>{item.title}</h3>
                  
                  <div style={{ display: 'flex', gap: '15px', fontSize: '0.9em', color: '#666', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span><strong>Language:</strong> {item.language}</span>
                    <span style={{ color: item.integration === 'completed' ? 'green' : 'orange' }}>
                      <strong>Integration:</strong> {item.integration}
                    </span>
                    
                    {/* Only show Opensources if NOT pending and count > 0 */}
                    {item.integration !== 'pending' && item.opensources?.length > 0 && (
                      <span style={{ color: '#007bff', fontWeight: 'bold' }}>
                        📂 Opensources: {item.opensources.length}
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: '0.85em', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {item.crates && (
                      <p style={{ margin: 0 }}><strong>Crates:</strong> {item.crates.join(', ')}</p>
                    )}
                    {item.developmentkit && (
                      <p style={{ margin: 0 }}><strong>Development Kit:</strong> {item.developmentkit.join(', ')}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No results found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
//ramramjiramramjuramramji
//ramramjiramramjuramramji
//ramramjiramramjuramramji