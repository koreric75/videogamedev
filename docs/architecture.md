# Architecture Documentation

## Overview

This document describes the architecture of the "Ruins of Arkan" game, a 2D top-down roguelite built with TypeScript and HTML5 Canvas.

## Architecture Pattern

The game uses an **Entity-Component-System (ECS)** architecture combined with a **Scene-based** structure.

### Key Principles

1. **Separation of Concerns**: Game logic, rendering, physics, and input are handled by separate systems
2. **Composition over Inheritance**: Entities are composed of components rather than using deep inheritance hierarchies
3. **Dependency Injection**: Systems receive dependencies through constructors
4. **Configuration Management**: All game constants are centralized in a single configuration file

## Core Systems

### 1. Entity System

The entity system provides the foundation for all game objects.

### 2. Physics System

Handles collision detection and physics updates.

### 3. Rendering System

Manages all rendering operations.

### 4. Input System

Centralized input handling for keyboard, mouse, and touch.

### 5. Configuration System

Centralized game configuration.

## Design Patterns Used

1. **Factory Pattern**: EntityFactory for creating entities
2. **Component Pattern**: Entity-component composition
3. **Observer Pattern**: Component callbacks
4. **Strategy Pattern**: Different entity behaviors via components
