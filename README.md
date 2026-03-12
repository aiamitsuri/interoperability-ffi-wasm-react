# interoperability-ffi-wasm-react

# Initialize React project
- npm create vite@latest interoperability-ffi-wasm-react -- --template react
- cd interoperability-ffi-wasm-react
- npm install

# Install package and Wasm plugins
- npm install @aiamitsuri/interoperability-ffi-wasm@0.1.12
- npm install -D vite-plugin-wasm vite-plugin-top-level-await

# Run
- npm run dev
