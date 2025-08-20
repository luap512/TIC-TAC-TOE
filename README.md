Tic‑Tac‑Toe (Full Stack: React • Spring Boot • PostgreSQL)

A modern Tic‑Tac‑Toe web app with:

Single‑player (unbeatable Minimax AI)

Local 2‑player on one device

Online multiplayer via WebSockets

Match history + leaderboard persisted in PostgreSQL

Built to showcase full‑stack skills: React frontend, Java + Spring Boot API, PostgreSQL DB, JPA/Hibernate, JWT (optional), and Docker Compose for one‑command local setup.

Demo (Screenshots / GIFs)

Add 2–3 images here once you have them.

client/public/screenshot-home.png

client/public/screenshot-game.png

client/public/screenshot-leaderboard.png

Features

Game Modes

Single‑player vs AI (Minimax + alpha‑beta pruning)

Local 2‑player (hot‑seat)

Online multiplayer (matchmaking + real‑time board updates)

Persistence

Stores finished games, moves, winners, timestamps

Player profiles (username, optional auth)

Leaderboard (W/L, streaks, ELO‑style rating optional)

Real‑Time

Spring WebSocket channels for moves & game state

Production‑friendly

Environment‑based config

Dockerized services

Basic CI‑ready scripts

Tech Stack

Frontend

React + Vite (or CRA)

TypeScript (optional)

Zustand/Redux for state (pick one)

Tailwind CSS (optional)

Backend

Java 21, Spring Boot 3

Spring Web, Spring Data JPA, Spring Security (JWT optional)

Spring WebSocket (STOMP)

MapStruct / Lombok (optional)

Database

PostgreSQL 15

Flyway for migrations
