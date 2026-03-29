//The App file is the 
// switch between pages
// It's THE HOME PAGE! <3 <3 <3 
// It has strings attached to the baby pages
// aka, battlescreen.jsx, startmenu.jsx, and Results.jsx

import React from 'react'; //imports React library for building user interfaces
import './index.css'; //links to the css file for styling

// This is the functional component
function App() {
  return (
    <div id="app"> 
      <div className="logo-container">
        <h1 className="title-main">BEETLE-BATTLE</h1>
        <h1 className="title-reflection">BEETLE-BATTLE</h1>
      </div>
    </div>
  );
}

export default App;