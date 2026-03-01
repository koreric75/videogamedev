# Security Policy — videogamedev

## Supported Versions

| Version | Supported |
|---------|-----------|
| main    | ✅        |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

1. **Do NOT open a public GitHub Issue.**
2. Contact the repository owner directly.
3. Include: description, steps to reproduce, and potential impact.

## Security Measures

- **Secrets Management:** All API keys stored in GitHub Actions Secrets and `.env` files (excluded from version control via `.gitignore`).
- **Dependency Scanning:** Automated via Dependabot and CI/CD security workflows.
- **Architecture Governance:** Automated architecture diagrams and compliance auditing via [ArchitectAIPro_GHActions](https://github.com/koreric75/ArchitectAIPro_GHActions).
- **CHAD Monitoring:** This repository is monitored by the Centralized Hub for Architectural Decision-making (CHAD) dashboard.

## Standards

This project follows the [BlueFalconInk LLC Security Standards](https://github.com/koreric75/ArchitectAIPro_GHActions/blob/main/SECURITY.md).
