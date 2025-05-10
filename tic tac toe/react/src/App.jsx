import { useState, useEffect } from 'react';
import NavBar from '../src/components/NavBar/NavBar';
import GameView from './views/GameView/GameView';
import LeaderBoardView from './views/LeaderBoardView/LeaderBoardView';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
export default function App() {


  return (
    <BrowserRouter>
      <NavBar />
      <Routes location={location} key={location.pathname + JSON.stringify(location.state)}>
        <Route path="/GameView" element={<GameView/>}/>
        <Route path="/LeaderBoardView" element={<LeaderBoardView/>}/>
      </Routes>
    </BrowserRouter>
  );
}
