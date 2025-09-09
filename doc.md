# Architecture Server

## Network
Folder for emitting and receiving packets.  
Contains types and modules for handling network communication.

### Types
- **Game Types** – player movement data  
- **Auth Types** – authorization data  
- **Message Types** – player information data  

### Subfolders for packet direction
- `Emi` – types for emitting packets  
- `Recv` – types for receiving packets  

---

## Game
Folder containing most of the game logic and managers.  
Primarily for handling game interactions and creating game objects.

### Structure
- `GameObjects` – classes representing game objects  
- `Managers` – all managers  
  - `Managers/Cluster` – calculates data for the client, optimizes CPU usage by managing territory  

---

## Core
Folder for basic classes and utilities used throughout the server, such as `GameObject.ts`, `Vector2d.ts`, etc.

---

## Directory Naming Convention
- All folders use lowercase and kebab-case, for example:  

## Main physics engine Matter.js
<a href="https://brm.io/matter-js/">Matter js documentation</a>
