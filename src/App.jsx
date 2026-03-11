import React, { useEffect, useState, useCallback } from 'react';
import * as wasm from "@aiamitsuri/interoperability-ffi-wasm";

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      await wasm.default();

      const params = {
        language: "node",
        integration: "done",
        crates: "wasm",
        developmentkit: "app",
        page: "1",
        ids: null
      };

      const data = await wasm.fetch_from_js(params);
      console.log("Data received from Rust:", data);
      setResults(data);
    } catch (err) {
      console.error("Wasm Error:", err);
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading && !results) return <p>🚀 Initializing Rust Wasm...</p>;
  if (error) return <p style={{color: 'red'}}>❌ Error: {error}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🚩 Interoperability Search</h1>
      
      <button 
        onClick={loadData} 
        disabled={loading}
        style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer' }}>
        {loading ? 'Refreshing...' : '🔄 Refresh Data'}
      </button>

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