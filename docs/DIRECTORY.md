# Directory Structure Configuration

## Overview

TxBot uses a sophisticated directory structure system with conditional logic based on `enabled` flags. Each directory can be marked as `true` (active) or `false` (inactive/archived).

---

## Root Directory Structure

```
KENWELL-TX-ORG/Team---Name-file-C-Users-VST-Downloads-kenwell-publisher.htm/
├── 📁 chatbot.ui/              [enabled: true]
│   ├── index.html
│   ├── script.js
│   ├── styles.css
│   ├── README.md
│   ├── DEPLOYMENT.md
│   ├── FAQ.md
│   └── version.json
├── 📁 docs/                    [enabled: true]
│   ├── COMMUNITY.md
│   ├── TUTORIALS.md
│   ├── DIRECTORY.md
│   ├── api-reference.md
│   └── architecture.md
├── 📁 .github/                 [enabled: true]
│   ├── workflows/
│   │   ├── deploy.yml
│   │   └── security.yml
│   ├── configs/
│   │   └── nginx.conf
│   └── ISSUE_TEMPLATE/
├── 📁 backend/                 [enabled: false]
│   ├── Kenwell.py
│   ├── requirements.txt
│   ├── config.py
│   └── tests/
├── 📁 tests/                   [enabled: false]
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── 📁 scripts/                 [enabled: false]
│   ├── setup.sh
│   ├── deploy.sh
│   └── backup.sh
├── Dockerfile                  [enabled: true]
├── docker-compose.yml          [enabled: true]
├── .env.development            [enabled: true]
├── .env.production             [enabled: true]
├── .gitignore                  [enabled: true]
└── README.md                   [enabled: true]
```

---

## Directory Configuration File

### `.github/directory-config.json`

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-07-07T00:00:00Z",
  "directories": {
    "chatbot.ui": {
      "enabled": true,
      "type": "application",
      "description": "Frontend chatbot UI application",
      "production": true,
      "maintainer": "@team-frontend",
      "status": "stable",
      "version": "1.0.0"
    },
    "docs": {
      "enabled": true,
      "type": "documentation",
      "description": "Documentation and guides",
      "production": true,
      "maintainer": "@team-docs",
      "status": "stable",
      "version": "1.0.0"
    },
    ".github": {
      "enabled": true,
      "type": "configuration",
      "description": "GitHub workflows and configs",
      "production": true,
      "maintainer": "@team-devops",
      "status": "stable",
      "version": "1.0.0"
    },
    "backend": {
      "enabled": false,
      "type": "application",
      "description": "Backend API (Archived)",
      "production": false,
      "maintainer": "@team-backend",
      "status": "archived",
      "version": "0.9.0",
      "archived_date": "2026-06-15",
      "reason": "Moved to separate repository"
    },
    "tests": {
      "enabled": false,
      "type": "testing",
      "description": "Test suite (Pending)",
      "production": false,
      "maintainer": "@team-qa",
      "status": "pending",
      "version": "0.1.0",
      "expected_completion": "2026-08-01"
    },
    "scripts": {
      "enabled": false,
      "type": "utility",
      "description": "Deployment scripts (Pending)",
      "production": false,
      "maintainer": "@team-devops",
      "status": "pending",
      "version": "0.1.0",
      "expected_completion": "2026-08-15"
    }
  }
}
```

---

## Directory Status Reference

### ✅ Enabled (True)

**Characteristics:**
- Available for production use
- Actively maintained
- Included in builds and deployments
- Subject to security scans
- Full CI/CD pipeline applied

**Directories:**
- `chatbot.ui/` - Frontend application
- `docs/` - Documentation
- `.github/` - Configuration

### ❌ Disabled (False)

**Characteristics:**
- Not included in production builds
- May be archived or under development
- Excluded from automated deployments
- Reduced maintenance schedule
- Optional CI/CD checks

**Directories:**
- `backend/` - Archived (moved to separate repo)
- `tests/` - Pending implementation
- `scripts/` - Pending implementation

---

## Enabling/Disabling Directories

### Enable a Directory

```bash
# Update config file
jq '.directories.tests.enabled = true' .github/directory-config.json > temp.json && mv temp.json .github/directory-config.json

# Commit changes
git add .github/directory-config.json
git commit -m "chore: enable tests directory"
```

### Disable a Directory

```bash
# Update config file
jq '.directories.scripts.enabled = false' .github/directory-config.json > temp.json && mv temp.json .github/directory-config.json

# Archive with metadata
jq '.directories.scripts.archived_date = now' .github/directory-config.json

# Commit changes
git add .github/directory-config.json
git commit -m "chore: archive scripts directory - moved to utilities repo"
```

---

## Directory States

### 🟢 Active (enabled: true, status: stable)
```json
{
  "enabled": true,
  "status": "stable",
  "production": true,
  "version": "1.0.0"
}
```
**Action:** Use in production, actively maintain

### 🟡 Development (enabled: true, status: beta)
```json
{
  "enabled": true,
  "status": "beta",
  "production": false,
  "version": "0.5.0"
}
```
**Action:** Test in staging, gather feedback

### 🔵 Pending (enabled: false, status: pending)
```json
{
  "enabled": false,
  "status": "pending",
  "production": false,
  "expected_completion": "2026-08-01"
}
```
**Action:** Schedule implementation, track progress

### ⚫ Archived (enabled: false, status: archived)
```json
{
  "enabled": false,
  "status": "archived",
  "production": false,
  "archived_date": "2026-06-15",
  "reason": "Moved to separate repository"
}
```
**Action:** Reference for history, no maintenance

---

## GitHub Actions Integration

### Build Matrix Based on Directory Status

```yaml
jobs:
  build:
    strategy:
      matrix:
        directory: ${{ fromJson(env.ENABLED_DIRS) }}
    runs-on: ubuntu-latest
    steps:
      - name: Build ${{ matrix.directory }}
        if: matrix.directory.enabled == true
        run: |
          cd ${{ matrix.directory.name }}
          npm run build
```

### Workflow Configuration

```bash
# Load enabled directories
ENABLED_DIRS=$(jq '[.directories | to_entries[] | select(.value.enabled == true)]' .github/directory-config.json)
```

---

## Directory Maintenance Guide

### Adding a New Directory

```bash
# 1. Create directory
mkdir -p new-feature

# 2. Add to config
jq '.directories."new-feature" = {
  "enabled": true,
  "type": "application",
  "description": "New feature description",
  "production": false,
  "maintainer": "@team-name",
  "status": "beta",
  "version": "0.1.0"
}' .github/directory-config.json > temp.json && mv temp.json .github/directory-config.json

# 3. Commit
git add new-feature .github/directory-config.json
git commit -m "feat: add new-feature directory"
```

### Transitioning to Production

```bash
# 1. Update status to stable
jq '.directories."new-feature".status = "stable"' .github/directory-config.json

# 2. Enable production flag
jq '.directories."new-feature".production = true' .github/directory-config.json

# 3. Update version
jq '.directories."new-feature".version = "1.0.0"' .github/directory-config.json

# 4. Commit
git add .github/directory-config.json
git commit -m "chore: promote new-feature to production v1.0.0"
```

### Archiving a Directory

```bash
# 1. Update config
jq '.directories."old-feature" |= . + {
  "enabled": false,
  "status": "archived",
  "archived_date": "'$(date -u +'%Y-%m-%d')'T00:00:00Z",
  "reason": "Functionality moved to separate repository"
}' .github/directory-config.json

# 2. Create archive branch (optional)
git checkout -b archive/old-feature

# 3. Commit changes
git add .github/directory-config.json
git commit -m "chore: archive old-feature directory"
```

---

## Directory Access Control

### Branch Protection Rules

Based on directory status:

```yaml
Protected Branches:
  - main: All enabled directories
  - develop: All directories (enabled + disabled)
  - feature/*: Individual directories
  - archive/*: Archived directories (no protection)
```

### CODEOWNERS File

```
# chatbot.ui/
chatbot.ui/ @team-frontend

# docs/
docs/ @team-docs

# .github/
.github/ @team-devops

# backend/ (archived, read-only)
backend/ @archive-team

# tests/ (pending)
tests/ @team-qa

# scripts/ (pending)
scripts/ @team-devops
```

---

## Monitoring & Reporting

### Directory Health Dashboard

```bash
#!/bin/bash
# scripts/directory-health.sh

echo "=== TxBot Directory Status Report ==="
echo "Generated: $(date)"
echo ""

jq '.directories | to_entries[] | 
  "\(.key): \(.value.enabled) [\(.value.status)] v\(.value.version)"' \
  .github/directory-config.json
```

### Output Example
```
=== TxBot Directory Status Report ===
Generated: 2026-07-07 12:00:00 UTC

chatbot.ui: true [stable] v1.0.0
docs: true [stable] v1.0.0
.github: true [stable] v1.0.0
backend: false [archived] v0.9.0
tests: false [pending] v0.1.0
scripts: false [pending] v0.1.0
```

---

## Best Practices

✅ **DO:**
- Keep config file in sync with actual directories
- Document reasons for disabling directories
- Use semantic versioning
- Archive instead of deleting
- Maintain clear status transitions

❌ **DON'T:**
- Leave orphaned directories
- Forget to update config
- Use vague descriptions
- Delete important code
- Mix enabled/disabled in same PR

---

## See Also

- [Community Forum](./COMMUNITY.md)
- [Tutorials](./TUTORIALS.md)
- [Main README](../README.md)
- [Deployment Guide](../chatbot.ui/DEPLOYMENT.md)

---

**Directory Structure v1.0.0**

*Last updated: 2026-07-07*
