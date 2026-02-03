# Contributing to Ruins of Arkan

Thank you for your interest in contributing to Ruins of Arkan! This document provides guidelines and instructions for contributing to the project.

## 🤝 Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and professional in all interactions.

## 🚀 Getting Started

### Prerequisites

- Node.js 14 or higher
- npm (comes with Node.js)
- Git
- A code editor (VS Code, WebStorm, etc.)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/videogamedev.git
   cd videogamedev
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/koreric75/videogamedev.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Start the development server**:
   ```bash
   npm run dev
   ```

## 📋 Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `bugfix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests

### 2. Make Your Changes

- Follow the existing code style and architecture patterns
- Write clean, readable, and well-commented code
- Keep changes focused and atomic (one feature/fix per branch)
- Test your changes thoroughly

### 3. Write Tests

- Add unit tests for new functionality in the `tests/` directory
- Ensure all tests pass: `npm test`
- Aim for good test coverage of new code

### 4. Lint Your Code

Before committing, ensure your code passes linting:

```bash
npm run lint
npm run lint:fix  # Auto-fix issues where possible
```

### 5. Commit Your Changes

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "Add feature: describe what you added"
```

**Commit Message Guidelines:**
- Use present tense ("Add feature" not "Added feature")
- Be descriptive but concise
- Reference issue numbers when applicable (#123)

Good examples:
- `Add virtual joystick for mobile controls`
- `Fix collision detection bug with fast-moving entities`
- `Refactor physics system for better performance`
- `Update README with installation instructions`

### 6. Keep Your Branch Updated

Regularly sync your branch with the upstream main branch:

```bash
git fetch upstream
git rebase upstream/main
```

### 7. Push Your Changes

```bash
git push origin feature/your-feature-name
```

### 8. Submit a Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Fill out the PR template with:
   - Clear title describing the change
   - Detailed description of what changed and why
   - Screenshots/GIFs for visual changes
   - Related issue numbers
5. Submit the PR and wait for review

## 🎨 Code Style Guidelines

### TypeScript

- Use TypeScript strict mode
- Prefer interfaces over types for object shapes
- Use meaningful variable and function names
- Avoid `any` type; use proper typing
- Use arrow functions for callbacks

### Architecture

- Follow the Entity-Component-System (ECS) pattern
- Keep components as pure data (no logic)
- Put logic in systems
- Use dependency injection for system dependencies
- Centralize configuration in `src/game/config.ts`

### File Organization

- One class/interface per file (with exceptions for small related types)
- Group related files in appropriate directories
- Use index files for clean imports

### Comments

- Use JSDoc comments for public APIs
- Add inline comments only when code isn't self-explanatory
- Keep comments up-to-date with code changes

Example:
```typescript
/**
 * Creates a new entity with the specified components.
 * @param components - Array of components to attach to the entity
 * @returns The newly created entity ID
 */
function createEntity(components: Component[]): number {
  // Implementation
}
```

## 🧪 Testing Guidelines

- Write tests for all new features and bug fixes
- Follow the existing test structure and naming conventions
- Use descriptive test names that explain what is being tested
- Test edge cases and error conditions
- Mock external dependencies when appropriate

Example test structure:
```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    // Setup
  });

  it('should do something specific', () => {
    // Arrange
    const input = setupTestData();
    
    // Act
    const result = functionUnderTest(input);
    
    // Assert
    expect(result).toBe(expectedValue);
  });
});
```

## 🎓 Skills Framework

Before contributing, familiarize yourself with the project's skills framework:

```bash
./skills.sh
```

This shows the active skill personas that guide development:
- **Solution Architect**: System design and architecture
- **Functional Analyst**: Requirements and features
- **Developers**: Implementation and testing

## 📚 Learning Resources

If you're new to the technologies used in this project:

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Entity-Component-System Pattern](https://en.wikipedia.org/wiki/Entity_component_system)
- [HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Game Programming Patterns](https://gameprogrammingpatterns.com/)
- [Architecture Documentation](docs/architecture.md)

## 🐛 Reporting Bugs

When reporting bugs, please include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Exact steps to reproduce the issue
3. **Expected Behavior**: What you expected to happen
4. **Actual Behavior**: What actually happened
5. **Environment**: Browser, OS, Node version
6. **Screenshots**: If applicable
7. **Error Messages**: Full error messages or stack traces

Use the bug report template when creating an issue.

## 💡 Suggesting Enhancements

We welcome feature suggestions! Please:

1. Check if the feature has already been suggested
2. Provide a clear use case for the feature
3. Describe the expected behavior
4. Consider how it fits with the existing architecture
5. Be open to discussion and feedback

## 📝 Documentation

Documentation improvements are always welcome:

- Fix typos or unclear explanations
- Add examples or diagrams
- Improve code comments
- Update outdated information
- Translate documentation (if applicable)

## ✅ Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows the project's style guidelines
- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] New tests added for new features
- [ ] Documentation updated if needed
- [ ] Commit messages are clear and descriptive
- [ ] Branch is up-to-date with main
- [ ] PR description clearly explains the changes

## 🔍 Review Process

1. **Automated Checks**: CI will run tests and linting
2. **Code Review**: Maintainers will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, your PR will be merged
5. **Recognition**: Contributors are recognized in release notes

## 🎉 Recognition

All contributors will be recognized in:
- The repository's contributor list
- Release notes for significant contributions
- Project documentation when applicable

## 📞 Getting Help

If you need help or have questions:

- Open an issue with the "question" label
- Check existing issues and documentation
- Review the architecture documentation
- Run `./skills.sh` to understand project priorities

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Ruins of Arkan! 🎮✨
