˚₊‧ʚ🐞ɞ‧₊˚ Beetle Battle ˚₊‧ʚ🐞ɞ‧₊˚
----
"Like a lady-bug, their spots are unique. Every individual has a programming signature that's waiting to be shined upon." -Samantha
--
Code, Compete, Create. (Your opponent is the Asian Lady Beetle (an imposter) you must defeat through honing your own beauty. 
An educational syntax game that teaches you how to code by making you compete with your friends and family, or even a bot. (in case you're lonely)

About The Project
---
With the exponential growth of AI, computer science has never been more accessible than now. (So it seems)
However, using AI is only filtering out "turned on" and "turned off" brains.
So, to stop this issue from widening, we have created "Beat"le Battle, a competitive syntax trainer.

Beetle Battle helps students learn and memorize coding syntax without an AI crutch by giving them 
a prompt and requiring them to write the code while racing against time and a player. 

Writing code, is aimed to force users to take the time to process the prompt, think about syntax, and attack. 

This game cultivates a fierce environment for any developer to mature into confident programmers.

What this project includes: 
---
We built the backend in JavaScript and used MongoDB to store players' stats. 
Using Gemini's API, we create unique questions for various programming languages and parse users' code to assign a proper score. 
For the frontend, we are using React to translate our Figma designs into working code: CSS, HTML,  JSX. 
To bridge the frontend and backend, we used Node.js and Express to interact with the database and our parser.

How To Play on the web-game
----
1. Choose your programming language and difficulty
2. Get matched with an opponent (or face the Bot)
3. The gane starts
4. Both players receive the same the same prompt
5. Write your code and hit Submit
6. The game judges your code, assigns a score, and gives feedback
7. After the match, both players get personalized notes, and a winner is chosen

Built during the 2026 AthenaHacks,  
---------------------------------------
this project transforms the dry experience of algorithm practice into competitive, fast-pace envrionment.

✨ Key Features
------
***Custom SVG UI: 

Everything was made using shapes in html, inspired through Figma. Examples include:
The Ladybug "Play" button, "Leaf" battle arenas, mushroom bounced difficulties are all built entirely from scalable, code-driven SVG shapes.

***Gemini AI Integration:

Utilizes Google’s Gemini API to evaluate code quality, prompt difficulty, and provide real-time snarky feedback to help defeat your opponent and move forwards. 

***Multiplayer Matchmaking:

Aimed for Real-time synchronization using Socket.io to find opponents of similar skill levels.


***Live Leaderboard: 

A scrolling, persistent ranking system powered by MongoDB to track the top-tier "Beetle Kings."
Multi-Language Support: Practice in Python, JavaScript, or Java with tailored logic prompts.


📸 Visuals
---------------------------------------
Home Menu	Battle Arena, Customize difficulty, language, and name.	Real-time code input on interactive leaf vectors.


🚀 Getting Started
---------------------------------------
Prerequisites

Node.js (v18 or higher)

MongoDB (Local or Atlas)

Google Gemini API Key

Installation Guide
---------------------------------------
***Clone the repository:

Bash
git clone https://github.com/yourusername/athenahacks2026.git
cd athenahacks2026
Install dependencies:

***Bash
npm install

***Environment Setup:
Create a .env file in the root directory and add:

***Code snippet
PORT=3000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_key

***Run the application:
***Bash
# Run backend and frontend together
npm start
The app will be running at http://localhost:5173.


🎮 Usage Instructions
---
Identity: Enter your "Fighter Name" in the input field.

Strategy: Select your preferred coding Language and Difficulty level (Mushroom buttons).

Deploy: Click the Ladybug Play Button to enter the matchmaking queue.

Battle: Once in the arena, read the Code Prompt at the top. Type your solution into the right-hand leaf and click RUN to strike your opponent!

🛠️ Built With Figma, VSCode, Parcel, React, CSS, Javascript. 
---
Team: Samantha Reap, Allyson Le, Ximena Camacho, Khushi Patel

🗺️ Future Roadmap
---
Various Compilers, More modes, Sneaky attacks like banana peels to throw.
