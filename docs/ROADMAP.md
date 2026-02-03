# Development Roadmap

This document outlines the planned features and improvements for **Ruins of Arkan**.

## Vision

Transform Ruins of Arkan from a prototype into a polished, engaging roguelite experience with deep gameplay mechanics, beautiful visuals, and compelling progression systems.

## Current Status: v1.0.0 - Prototype

✅ **Completed Features**

- Entity-Component-System architecture
- Physics system with collision detection
- Player movement (keyboard, mouse, touch)
- Enemy AI (chase behavior)
- Health system with visual feedback
- Pickup collection mechanics
- Mobile touch controls (virtual joystick)
- Game state management (play, pause, game over)
- Sprite inspector (debug tool)
- Comprehensive configuration system
- Asset management system
- Audio system foundation

## Roadmap

### Phase 1: Core Gameplay Enhancement (v1.1.0)

**Goal**: Make the game more engaging and fun to play

**Combat System**
- [ ] Basic attack/shooting mechanic
- [ ] Projectile system
- [ ] Weapon types (melee, ranged)
- [ ] Weapon switching
- [ ] Ammo system (for ranged weapons)
- [ ] Attack animations

**Enemy Variety**
- [ ] Multiple enemy types with different behaviors
  - [ ] Ranged enemies (shoot from distance)
  - [ ] Tank enemies (high health, slow)
  - [ ] Fast enemies (low health, high speed)
  - [ ] Swarm enemies (small, appear in groups)
- [ ] Enemy animations
- [ ] Death animations and effects

**Power-Up System**
- [ ] Speed boost power-up
- [ ] Damage boost power-up
- [ ] Shield/invincibility power-up
- [ ] Multi-shot power-up
- [ ] Duration timers for temporary effects
- [ ] Visual indicators for active power-ups

**Estimated Timeline**: 4-6 weeks

---

### Phase 2: Progression & Difficulty (v1.2.0)

**Goal**: Add depth and replayability

**Difficulty Scaling**
- [ ] Progressive difficulty (enemies spawn faster over time)
- [ ] Enemy health scaling
- [ ] Wave system (distinct waves of enemies)
- [ ] Boss waves (special challenging encounters)

**Score System Enhancement**
- [ ] Points for enemy kills
- [ ] Combo system (consecutive kills)
- [ ] Time-based scoring bonus
- [ ] Difficulty multipliers
- [ ] Score breakdown screen

**Player Progression**
- [ ] Experience points (XP) system
- [ ] Level-up mechanics
- [ ] Skill tree or upgrade system
  - [ ] Health upgrades
  - [ ] Speed upgrades
  - [ ] Weapon upgrades
  - [ ] Special abilities
- [ ] Persistent progression between runs

**Estimated Timeline**: 4-6 weeks

---

### Phase 3: Content & Variety (v1.3.0)

**Goal**: Expand game content and environments

**Multiple Levels/Arenas**
- [ ] 3-5 different arena designs
- [ ] Unique visual themes per arena
- [ ] Environmental hazards
  - [ ] Lava/poison zones
  - [ ] Moving platforms
  - [ ] Collapsing floors
- [ ] Arena transitions

**Items & Equipment**
- [ ] Collectible weapons
- [ ] Armor/defense items
- [ ] Consumable items (healing potions, bombs)
- [ ] Rare/legendary items
- [ ] Item inventory system

**Objectives & Challenges**
- [ ] Daily challenges
- [ ] Achievement system
- [ ] Special objectives (kill X enemies, survive X seconds)
- [ ] Unlockable content

**Estimated Timeline**: 6-8 weeks

---

### Phase 4: Visual & Audio Polish (v1.4.0)

**Goal**: Enhance presentation and feel

**Visual Effects**
- [ ] Particle systems
  - [ ] Explosion effects
  - [ ] Hit effects
  - [ ] Power-up collection effects
  - [ ] Ambient particles
- [ ] Screen shake on impacts
- [ ] Flash effects for damage
- [ ] Trail effects for fast movement
- [ ] Death animations

**Sprite Improvements**
- [ ] Professional sprite art
- [ ] Animated sprites
- [ ] Multiple animation states (idle, walk, attack)
- [ ] Smooth sprite transitions

**UI/UX Enhancement**
- [ ] Main menu design
- [ ] Pause menu redesign
- [ ] Settings menu
  - [ ] Audio controls
  - [ ] Graphics settings
  - [ ] Control remapping
- [ ] HUD improvements (health, score, ammo)
- [ ] Minimap

**Audio**
- [ ] Background music (multiple tracks)
- [ ] Enhanced sound effects
  - [ ] Weapon sounds
  - [ ] Impact sounds
  - [ ] Ambient sounds
- [ ] Audio mixing and balance
- [ ] Music transitions

**Estimated Timeline**: 4-6 weeks

---

### Phase 5: Multiplayer & Social (v2.0.0)

**Goal**: Add social and competitive features

**Multiplayer**
- [ ] Local co-op (2-4 players)
- [ ] Online multiplayer (if feasible)
- [ ] Cooperative game modes
- [ ] Competitive modes (PvP arena)

**Social Features**
- [ ] Leaderboards (local and online)
- [ ] Replays/recordings
- [ ] Share screenshots
- [ ] Player profiles
- [ ] Stats tracking

**Estimated Timeline**: 8-12 weeks

---

### Phase 6: Advanced Features (v2.1.0+)

**Goal**: Add unique and advanced gameplay systems

**Procedural Generation**
- [ ] Procedurally generated arenas
- [ ] Random item spawns
- [ ] Procedural enemy compositions
- [ ] Seed-based generation (for sharing runs)

**Advanced Game Modes**
- [ ] Endless mode
- [ ] Survival mode (limited lives)
- [ ] Time attack mode
- [ ] Boss rush mode
- [ ] Custom game mode (player-defined rules)

**Mod Support**
- [ ] Custom sprite loading
- [ ] Custom level editor
- [ ] Scripting API for mods
- [ ] Community mod repository

**Estimated Timeline**: Ongoing

---

## Technical Improvements

These improvements will be integrated throughout the phases:

### Code Quality
- [ ] Increase test coverage to 80%+
- [ ] Refactor legacy code
- [ ] Improve type safety
- [ ] Performance optimization
- [ ] Code documentation

### Architecture
- [ ] Event system for loose coupling
- [ ] Save/load system
- [ ] Replay system
- [ ] Analytics integration
- [ ] Error tracking

### DevOps
- [ ] Automated testing (CI/CD)
- [ ] Automated builds
- [ ] Version management
- [ ] Release automation
- [ ] Performance monitoring

---

## Community Involvement

We welcome community contributions! Here's how you can help:

### Priority Features (Community Vote)

We'll periodically poll the community to prioritize features. Suggest features via:
- GitHub Issues
- Community discussions
- Social media

### Open for Contributions

These features are ready for community contributions:
- Additional sprite artwork
- Sound effect creation
- Level design
- Enemy behavior patterns
- Power-up ideas
- Testing and bug reports

### Becoming a Contributor

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on contributing to the project.

---

## Release Schedule

**Target Release Dates** (subject to change):

- v1.1.0 - Q2 2026
- v1.2.0 - Q3 2026
- v1.3.0 - Q4 2026
- v1.4.0 - Q1 2027
- v2.0.0 - Q2 2027

**Release Process**:
1. Feature complete
2. Testing phase (2 weeks)
3. Bug fixes
4. Documentation updates
5. Release candidate
6. Final release

---

## Long-Term Vision

**Year 1**: Solid single-player experience with rich content
**Year 2**: Multiplayer features and social integration
**Year 3**: Community-driven content and advanced features

**Success Metrics**:
- Active player base
- Positive community feedback
- Regular contributions
- Stable performance
- Growing feature set

---

## Feedback & Suggestions

Have ideas for the roadmap? We'd love to hear them!

- **GitHub Issues**: Report bugs or request features
- **Discussions**: Share ideas and vote on priorities
- **Pull Requests**: Contribute directly to the codebase

---

**Last Updated**: February 3, 2026  
**Current Version**: v1.0.0  
**Next Release**: v1.1.0 (targeting Q2 2026)
