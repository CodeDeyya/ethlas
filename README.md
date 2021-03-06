# NextJS - Phaser Game

# Content

- [Background](#background)
- [Setup](#setup)
- [Technologies](#technologies)
- [Libraries](#libraries)

# Background

<img src="https://ethlas.com/_next/static/images/egg-78fbe54df92dca0d976db4852fdfbd3a.gif" align="right"
     alt="Serial Transmission" height=200 >

The code is build with the intension of integrating Next JS with phaser. The game is build as SSR and it communicates smoothly with the client side react app. Hooks have been utilized to enhance performance between the communication. Styled components is used for styling purposes. The game is a fan made game for team Ethlas. The code only communicate the highscore and current score from game to UI as a proof of concept for communication.

Total time taken to build the project is 6-7 hours including research.

<p align="center">
  <img src="https://ethlas.com/_next/static/images/9-1b9b4ffcbb669f90cbc36d5ee38f6271.png.webp" alt="Wiring" height=300 >
</p>
<!-- toc -->

# File Structure

```bash
+---public
|   |   favicon.ico
|   |   index.html
|   |   logo192.png
|   |   logo512.png
|   |   manifest.json
|   |   robots.txt
|   |
|   \---assets
|       |   ethlas.png
|       |   gradient.png
|       |   logo.png
|       |
|       +---css
|       |       main.css
|       |
|       +---glsl
|       |       plasma-bundle.glsl.js
|       |       starfields.glsl.js
|       |
|       +---img
|       |   |   bomb.png
|       |   |   dude.png
|       |   |   logo.png
|       |   |   platform.png
|       |   |   sky.png
|       |   |   star.png
|       |   |
|       |   \---Button
|       |           button_sprite_sheet.png
|       |
|       \---png
|               phaser3-logo.png
|
\---src
    |   App.css
    |   App.js
    |   App.test.js
    |   index.css
    |   index.js
    |   logo.svg
    |   reportWebVitals.js
    |   setupTests.js
    |
    +---components
    |   +---Elements
    |   +---Game
    |   |       Game.js
    |   |
    |   +---Styled
    |   |       endDialog.styled.js
    |   |       globalStyles.js
    |   |       index.styled.js
    |   |       scoreCard.styled.js
    |   |
    |   \---UI
    |           EndDialog.js
    |           ScoreCard.js
    |
    +---Game
    |       GameScene.js
    |       index.js
    |       PreloadScene.js
    |
    +---hooks
    |       useSSREffect.js
    |
    \---pages
            index.js
            _app.js

```

# Setup

- Clone the project cd/ to project file.
- Run command **yarn** to install all node modules.
- Run command **yarn dev** to start development server
- Run command **yarn build** to build the next js app
- Run command **yarn start** to start the next js app.

# Technologies

<p align="center">
  <img src="https://phaser.io/images/img.png" alt="Phaser" height=200>
</p>
<p align="center">
  <img src="https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png" alt="NodeJS" height=200 >
</p>

# Libraries

- **styled-components** library used for styling
- **MUI V5** library used for UI
