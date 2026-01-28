import React from "react";
import MainRoute from "./MainRoute";
import Header from "./components/Header";
import Footer from './components/Footer'



function App() {
  return (
    <>
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <MainRoute />
      </main>
      <Footer /> {/* Footer always on bottom */}
    </div>
    </>
  );
}

export default App;
