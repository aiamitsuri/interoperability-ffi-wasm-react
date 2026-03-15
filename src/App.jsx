import React, { useEffect, useState, useCallback } from 'react';
import * as wasm from "@aiamitsuri/interoperability-ffi-wasm";

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      await wasm.default();
      const params = {
        language: null,
        integration: null,
        crates: null,
        developmentkit: null,
        page: page.toString(),
        ids: null,
      };
      const data = await wasm.fetch_from_js(params);
      setResults(data);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  if (loading && !results) return <p>🚀 Initializing Rust Wasm...</p>;
  if (error) return <p style={{ color: 'red' }}>❌ Error: {error}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Interoperability Search</h1>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button onClick={loadData} disabled={loading}>
          {loading ? 'Refreshing...' : '🔄 Refresh'}
        </button>

        <button 
          onClick={handlePrev} 
          disabled={loading || !results?.pagination?.prev_page_url}
        >
          Previous
        </button>

        <span>
          Page {results?.pagination?.current_page} of {results?.pagination?.total_pages}
        </span>

        <button 
          onClick={handleNext} 
          disabled={loading || !results?.pagination?.next_page_url}
        >
          Next
        </button>
      </div>

      {results ? (
        <div>
          <h3>Found {results.pagination?.total_items || 0} Items</h3>
          <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '8px', overflow: 'auto' }}>
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default App;