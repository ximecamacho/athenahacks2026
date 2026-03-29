//The App file is the
// switch between pages
// It's THE HOME PAGE! <3 <3 <3
// It has strings attached to the baby pages
// aka, battlescreen.jsx, startmenu.jsx, and Results.jsx

import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import { io } from 'socket.io-client';

function App() {
  const [screen, setScreen] = useState('home');
  const [difficulty, setDifficulty] = useState(null);
  const [language, setLanguage] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [status, setStatus] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  // Battle state
  const socketRef = useRef(null);
  const [matchId, setMatchId] = useState('');
  const [question, setQuestion] = useState('');
  const [userCode, setUserCode] = useState('');
  const [botCode, setBotCode] = useState('');
  const [gameStatus, setGameStatus] = useState('waiting'); // waiting | countdown | active | submitted | finished
  const [countdownNum, setCountdownNum] = useState(null);
  const [hint, setHint] = useState('');
  const [winner, setWinner] = useState('');
  const [matchFeedback, setMatchFeedback] = useState(null);
  const [attempts, setAttempts] = useState(0);

  // Fetch leaderboard whenever home screen is shown
  useEffect(() => {
    if (screen !== 'home') return;
    fetch('/api/leaderboard')
      .then(r => r.json())
      .then(data => setLeaderboard(data))
      .catch(() => {});
  }, [screen]);

  // Function to switch to the battle screen
  async function startBattle() {
    if (!difficulty || !language || !playerName.trim()) {
      setStatus('Pick a difficulty, language, and enter your name!');
      return;
    }

    // Register player in the database (non-blocking)
    fetch('/api/player', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerName: playerName.trim() })
    }).catch(() => {});

    // Reset battle state and go to battle screen immediately
    setUserCode('');
    setBotCode('');
    setQuestion('');
    setHint('');
    setWinner('');
    setMatchFeedback(null);
    setAttempts(0);
    setGameStatus('countdown');
    setCountdownNum(null);
    setScreen('battle');

    // Connect socket and set up all game event listeners
    const socket = io({ path: '/socket.io' });
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('find_match', { playerName: playerName.trim(), language, difficulty });
    });

    socket.on('match_found', ({ matchId }) => {
      setMatchId(matchId);
    });

    socket.on('countdown', ({ count }) => {
      setCountdownNum(count);
    });

    socket.on('match_start', ({ prompt }) => {
      setQuestion(prompt);
      setGameStatus('active');
      setCountdownNum(null);
    });

    socket.on('opponent_submitted', () => {
      setBotCode('Bot has submitted their answer...');
    });

    socket.on('submission_result', ({ correct, feedback, hint }) => {
      if (!correct) {
        setHint(hint);
        setGameStatus('active');
      }
    });

    socket.on('wrong_answer', ({ hint, prompt }) => {
      setHint(hint);
      setQuestion(prompt);
      setAttempts(a => a + 1);
      setGameStatus('active');
    });

    socket.on('round_starting', () => {
      setGameStatus('countdown');
      setUserCode('');
      setBotCode('');
      setHint('');
      setAttempts(0);
      setMatchFeedback(null);
      setQuestion('');
    });

    socket.on('match_over', ({ winner, feedback, scores }) => {
      setWinner(winner);
      setMatchFeedback(feedback);
      setGameStatus('finished');
      const botEntry = scores?.find(p => p.name !== playerName.trim());
      if (botEntry?.code) setBotCode(botEntry.code);
    });

    socket.on('match_error', ({ message }) => {
      setQuestion(message);
      setGameStatus('active');
    });

    socket.on('connect_error', () => {
      setQuestion('Cannot connect to server — is the backend running?');
      setGameStatus('active');
    });
  }

  function submitCode() {
    if (!socketRef.current || !userCode.trim() || gameStatus !== 'active') return;
    setGameStatus('submitted');
    setHint('');
    socketRef.current.emit('submit_code', {
      matchId,
      playerName: playerName.trim(),
      code: userCode
    });
  }

  function goHome() {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setScreen('home');
    setGameStatus('waiting');
  }

  //  HOME SCREEN
  if (screen === 'home') {
    return (
      <div id="app">
        {/*the beautiful start menu <3 */}
        <div className="logo-container">
          <h1 className="title-main">BEETLE-BATTLE</h1>
          <h1 className="title-reflection">BEETLE-BATTLE</h1>
        </div>

        {/*the leaderboard */}
        <div className="leaderboard-container">
          <h2 className="leaderboard-title">LeaderBoard</h2>
          <div className="scroll-box">
            {leaderboard.length === 0 ? (
              <p>No players yet!</p>
            ) : (
              leaderboard.map((player, i) => (
                <p key={player._id}>{i + 1}. {player.playerName} - {player.wins} wins</p>
              ))
            )}
          </div>
        </div>

        {/*the difficulty buttons */}
        <div className="difficulty-container">
          <h2 className="difficulty-title">Difficulty</h2>
          <button className={`mushroom-button easy${difficulty === 'easy' ? ' selected' : ''}`} onClick={() => setDifficulty('easy')}>Easy</button>
          <button className={`mushroom-button medium${difficulty === 'medium' ? ' selected' : ''}`} onClick={() => setDifficulty('medium')}>Medium</button>
          <button className={`mushroom-button hard${difficulty === 'hard' ? ' selected' : ''}`} onClick={() => setDifficulty('hard')}>Hard</button>
        </div>

        {/*the language buttons */}
        <div className="language-container">
          <h2 className="difficulty-title">Language</h2>
          <button className={`mushroom-button easy${language === 'Python' ? ' selected' : ''}`} onClick={() => setLanguage('Python')}>Python</button>
          <button className={`mushroom-button medium${language === 'JavaScript' ? ' selected' : ''}`} onClick={() => setLanguage('JavaScript')}>JS</button>
          <button className={`mushroom-button hard${language === 'Java' ? ' selected' : ''}`} onClick={() => setLanguage('Java')}>Java</button>
        </div>

        {/*name input */}
        <div className="name-container">
          <input
            className="name-input"
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
          />
          {status && <p className="status-text">{status}</p>}
        </div>

        {/* Merged the Ladybug SVG with the Start Function */}
        <div className="play-section">
          <button className="ladybug-btn" onClick={startBattle}>
            <svg width="150" height="120" viewBox="0 0 150 120">
              <ellipse cx="75" cy="70" rx="60" ry="45" fill="#C94021" />
              <circle cx="120" cy="70" r="25" fill="black" />
              <path d="M 130 50 Q 140 30 150 40" stroke="black" fill="none" strokeWidth="2" />
              <path d="M 135 55 Q 145 35 155 45" stroke="black" fill="none" strokeWidth="2" />
              <circle cx="80" cy="45" r="5" fill="black" />
              <circle cx="60" cy="85" r="5" fill="black" />
              <circle cx="90" cy="80" r="5" fill="black" />
            </svg>
            <span className="play-text">PLAY</span>
          </button>
        </div>
      </div>
    ); // CLOSED: The home return
  }

  // --- BATTLE ARENA SCREEN --------------------
  if (screen === 'battle') {
    return (
      <div className="battle-screen">

        {/* Title + Beetles */}
        <div className="title-lady-bug-container">
          <h1 className="lady-bug-style">Asian Lady Beetle</h1>
        </div>

        <div className="div-vectors">
          <div className="beetle-player">
            <svg width="120" height="120" viewBox="0 0 1050 1095" fill="none">
              <path d="M1050 405.182C1050 134.568 758.555 -158.717 525 100.421C322.386 -128.606 0 134.568 0 405.182C0 675.796 309.411 899.532 525 1095C747.576 901.559 1050 675.796 1050 405.182Z" fill="#526022"/>
            </svg>
            <p className="beetle-label">{playerName || 'You'}</p>
          </div>

          {/* Countdown overlay */}
          {gameStatus === 'countdown' && (
            <div className="countdown-display">
              {countdownNum === null ? 'Get Ready...' : countdownNum === 0 ? 'GO!' : countdownNum}
            </div>
          )}

          <div className="beetle-player">
            <svg width="120" height="120" viewBox="0 0 1050 1095" fill="none">
              <path d="M1050 405.182C1050 134.568 758.555 -158.717 525 100.421C322.386 -128.606 0 134.568 0 405.182C0 675.796 309.411 899.532 525 1095C747.576 901.559 1050 675.796 1050 405.182Z" fill="#8B1A1A"/>
            </svg>
            <p className="beetle-label">SyntaxBot</p>
          </div>
        </div>

        {/* Question prompt */}
        {question && (
          <div className="battle-question">
            <p className="question-text">{question}</p>
          </div>
        )}

        {/* Hint */}
        {hint && (
          <div className="battle-hint">
            <p className="hint-wrong">Wrong answer — try again! (Attempt {attempts})</p>
            <p>Hint: {hint}</p>
          </div>
        )}

        {/* Code editors */}
        {(gameStatus === 'active' || gameStatus === 'submitted' || gameStatus === 'finished') && (
          <div className="battle-editors">
            <div className="editor-container">
              <p className="editor-label">Your Code</p>
              <textarea
                className="code-textarea"
                value={userCode}
                onChange={e => setUserCode(e.target.value)}
                placeholder={`Write your ${language} code here...`}
                disabled={gameStatus !== 'active'}
              />
              {gameStatus === 'active' && (
                <button className="submit-btn" onClick={submitCode}>Submit</button>
              )}
              {gameStatus === 'submitted' && (
                <p className="status-text" style={{ marginTop: '10px' }}>Judging your code...</p>
              )}
            </div>

            <div className="editor-container">
              <p className="editor-label">SyntaxBot's Code</p>
              <textarea
                className="code-textarea bot-blurred"
                value={botCode || 'Bot is coding...'}
                readOnly
              />
            </div>
          </div>
        )}

        {/* Match result */}
        {gameStatus === 'finished' && matchFeedback && (
          <div className="battle-result">
            {winner === playerName ? (
              <>
                <h2 className="result-winner">You Win!</h2>
                <p>{matchFeedback.winnerNote}</p>
                <p className="key-lesson">{matchFeedback.keyLesson}</p>
                <p className="encourage-msg">Get ready for the next round...</p>
                <button className="submit-btn" onClick={() => {
                  socketRef.current?.emit('next_round', { matchId, playerName: playerName.trim() });
                  setUserCode('');
                  setBotCode('');
                  setHint('');
                  setAttempts(0);
                  setMatchFeedback(null);
                  setQuestion('');
                  setGameStatus('countdown');
                }}>Next Round</button>
              </>
            ) : (
              <>
                <h2 className="result-winner result-loss">Don't give up!</h2>
                <p className="encourage-msg">You almost had it! Here's the question again — give it another shot.</p>
                <p>{matchFeedback.loserNote}</p>
                <p className="key-lesson">{matchFeedback.keyLesson}</p>
                <div className="retry-question">
                  <p className="question-text">{question}</p>
                </div>
                <div className="result-actions">
                  <button className="submit-btn" onClick={() => {
                    // Reset editor and go straight back to the question — no new match
                    setUserCode('');
                    setBotCode('');
                    setHint('');
                    setAttempts(0);
                    setMatchFeedback(null);
                    setWinner('');
                    setGameStatus('active');
                    // Reconnect socket silently so submit works
                    if (socketRef.current) socketRef.current.disconnect();
                    const socket = io({ path: '/socket.io' });
                    socketRef.current = socket;
                    socket.on('connect', () => {
                      socket.emit('find_match', { playerName: playerName.trim(), language, difficulty });
                    });
                    socket.on('match_found', ({ matchId: id }) => setMatchId(id));
                    socket.on('wrong_answer', ({ hint: h }) => {
                      setHint(h);
                      setAttempts(a => a + 1);
                      setGameStatus('active');
                    });
                    socket.on('match_over', ({ winner: w, feedback: f, scores }) => {
                      setWinner(w);
                      setMatchFeedback(f);
                      setGameStatus('finished');
                      const botEntry = scores?.find(p => p.name !== playerName.trim());
                      if (botEntry?.code) setBotCode(botEntry.code);
                    });
                    socket.on('round_starting', () => {
                      setUserCode(''); setBotCode(''); setHint('');
                      setAttempts(0); setMatchFeedback(null); setQuestion('');
                    });
                  }}>Try Same Question</button>
                  <button className="back-btn" style={{ alignSelf: 'center' }} onClick={goHome}>Back to Menu</button>
                </div>
              </>
            )}
          </div>
        )}

        {(gameStatus !== 'finished') && (
          <button className="back-btn" onClick={goHome}>Back to Menu</button>
        )}
      </div>
    );
  }
}

export default App;
