# Contributing to Ruins of Arkan

Thank you for your interest in contributing to Ruins of Arkan! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Submitting Changes](#submitting-changes)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and professional in all interactions.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- A code editor (VS Code recommended)
- Git

### Setting Up Your Development Environment

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/videogamedev.git
   cd videogamedev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to http://localhost:5173

### Project Structure

```
src/
  main.ts                    # Entry point
  game/
    config.ts               # Central configuration
    engine.ts               # Game engine (loop)
    spawn.ts                # Sprite spawning utilities
    core/
      entity.ts             # Entity-component system
      physics.ts            # Physics & collision detection
      render.ts             # Rendering system
      input.ts              # Input handling
      assets.ts             # Asset management
      audio.ts              # Audio system
    scenes/
      mainScene.ts          # Main gameplay scene
    ui/
      spriteInspector.ts    # Debug inspector
      joystick.ts           # Mobile controls
```

## Development Workflow

### Branch Naming

Use descriptive branch names:
- `feature/add-power-ups` - New features
- `fix/collision-bug` - Bug fixes
- `docs/api-reference` - Documentation updates
- `refactor/physics-system` - Code refactoring

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding standards below
   - Write tests for new features
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm run lint        # Check code style
   npm test           # Run unit tests
   npm run build      # Ensure it builds
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```

## Coding Standards

### TypeScript Guidelines

- **Use TypeScript features**: Leverage types, interfaces, and type inference
- **Avoid `any`**: Use specific types whenever possible
- **Use ES6+**: Arrow functions, destructuring, async/await, etc.
- **Naming conventions**:
  - Classes: `PascalCase` (e.g., `GameEngine`)
  - Functions/variables: `camelCase` (e.g., `updatePlayer`)
  - Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_ENEMIES`)
  - Interfaces: `PascalCase` with `I` prefix optional (e.g., `GameConfig`)

### Code Style

- **Indentation**: 2 spaces (configured in ESLint)
- **Line length**: 100 characters max (soft limit)
- **Semicolons**: Required
- **Quotes**: Single quotes for strings
- **Comments**: Use JSDoc style for functions and classes

Example:
```typescript
/**
 * Updates the player position based on input
 * @param deltaTime Time elapsed since last frame in seconds
 * @param input Current input state
 */
function updatePlayer(deltaTime: number, input: InputState): void {
  // Implementation
}
```

### ECS Architecture

Follow the Entity-Component-System pattern:

1. **Entities** are simple IDs
2. **Components** are pure data (no logic)
3. **Systems** contain all the logic

Example component:
```typescript
export interface Transform {
  x: number;
  y: number;
  rotation: number;
}
```

Example system:
```typescript
class PhysicsSystem {
  update(entities: Entity[], deltaTime: number): void {
    // Update physics for all entities
  }
}
```

### Configuration

All game constants should be defined in `src/game/config.ts`:

```typescript
import { config } from './game/config';

// ✅ Good
const speed = config.player.speed;

// ❌ Bad
const speed = 200; // Magic number
```

## Testing Guidelines

### Writing Tests

- **Test files**: Located in `tests/` directory
- **Naming**: `*.test.ts` or `*.spec.ts`
- **Framework**: Jest with jsdom environment

Example test:
```typescript
describe('PhysicsSystem', () => {
  it('should detect collision between overlapping entities', () => {
    const entity1 = createEntity({ x: 0, y: 0, width: 10, height: 10 });
    const entity2 = createEntity({ x: 5, y: 5, width: 10, height: 10 });
    
    const collision = detectCollision(entity1, entity2);
    expect(collision).toBe(true);
  });
});
```

### Running Tests

```bash
npm test              # Run all tests
npm test -- --watch   # Run in watch mode
npm test -- --coverage # Generate coverage report
```

## Documentation

### Code Documentation

- Document all public APIs with JSDoc comments
- Include parameter types and return types
- Provide usage examples for complex functions

### Architecture Documentation

When adding new systems or major features, update:
- `docs/architecture.md` - Architecture overview
- `docs/API.md` - API reference
- `README.md` - If it affects user-facing features

### Commit Messages

Follow conventional commits format:

```
<type>: <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat: Add power-up system with 3 power types
fix: Resolve collision detection edge case
docs: Update API documentation for PhysicsSystem
```

## Submitting Changes

### Pull Request Process

1. **Update documentation**: Ensure all relevant docs are updated
2. **Run tests**: Verify all tests pass
3. **Run linter**: Fix all linting errors
4. **Create PR**: Submit a pull request to the main repository
5. **Describe changes**: Provide a clear description of what changed and why

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] All existing tests pass
- [ ] New tests added (if applicable)
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Documentation updated
- [ ] No linting errors
- [ ] Commits follow conventional commit format
```

## Skills Framework

This project uses a skills framework to guide development:

```bash
./skills.sh
```

Review the enabled personas to understand the project's priorities:
- **Solution Architect**: System design and architecture
- **Functional Analyst**: Requirements and features
- **Developers**: Implementation and testing

## Need Help?

- **Bug reports**: Open an issue with detailed reproduction steps
- **Feature requests**: Open an issue describing the feature and use case
- **Questions**: Check existing documentation or open a discussion

## Recognition

Contributors will be recognized in:
- The project README
- Release notes
- The CONTRIBUTORS file (if we create one)

Thank you for contributing! 🎮
