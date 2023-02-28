# XState Audio Player - An demo audio player using XState

A mini project to simulate an audio player states using finite state machines and statecharts XState

## Features

![Statecharts](https://user-images.githubusercontent.com/23608297/221735982-437ddb17-68ff-48ad-8a04-f0465227e429.png)

## Installation

Clone the project

```bash
  git clone git@github.com:hanknguyen14/xstate-audio-player.git
```

Go to the project directory

```bash
  cd xstate-audio-player
```

Install the packages

```bash
  npm install
```

Run start application

```bash
  npm start
```

## Visualizer

Enabled development tool

```ts
  // App.tsx
  import { inspect } from '@xstate/inspect';
  //...

  inspect({
    iframe: false,
  });
  //...

  const [state, send] = useMachine(appMachine, {
    //...
    devTools: true,
  });
```

Run start application

```bash
  npm start
```

A visualizer inspect window will be opened with the application

![Visualizer](https://user-images.githubusercontent.com/23608297/221743054-6627281e-8151-486e-9543-a5c6c66183be.png)

## Demo

[Demo site](https://xstate-demo.netlify.app "XState Audio Player")

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Feedback

If you have any feedback, please reach out to me at hungnguyen.dhg@gmail.com
