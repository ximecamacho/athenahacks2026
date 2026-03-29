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


      <div className="leaderboard-container">
        <h2 className="leaderboard-title">LeaderBoard</h2>

        <div className="scroll-box">
          <p>1. BeetleKing - 500</p>
          <p>2. LadyBugQueen - 450</p>
          <p>3. ImposterMaster - 400</p>
          <p>4. BugBoss - 350</p>
          <p>5. InsectChampion - 300</p>
        </div>
      </div>

      <div className="difficulty-container">
        <h2 className="difficulty-title">Difficulty</h2>

        <button className="mushroom-button easy">Easy</button>
        <button className="mushroom-button medium">Medium</button>
        <button className="mushroom-button hard">Hard</button>

      </div>



    </div>
  );
}

export default App;