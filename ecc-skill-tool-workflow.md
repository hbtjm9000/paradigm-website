# ECC Skill & Tool Loading Pattern

## Current State

| Component | Available | Enabled | Ratio |
|-----------|-----------|---------|-------|
| **Tools** | 8 | Built-in | 100% |
| **Skills** | 110 | 14 | 13% |

## Verification

- Tools: lint-check, format-code, run-tests, check-coverage, git-summary, changed-files, security-audit, index
- Skills: Loaded from `instructions` array in opencode.json

## Loading Pattern

Skills are loaded via `opencode.json` `instructions` array:

```json
{
  "instructions": [
    "skills/tdd-workflow/SKILL.md",
    "skills/security-review/SKILL.md",
    // ... more skills
  ]
}
```

**Key Insight:** Skills outside `instructions` array are NOT loaded.

## Deterministic Loading Workflow

### 1. Skill Selection Strategy

**Pattern: Enable only what's needed**

Instead of loading all 110 skills, select the active skillset based on:
- Current project type (frontend, backend, etc.)
- Active workflow (TDD, security, etc.)
- Task at hand

### 2. Tool Loading

Tools are in `~/.opencode/tools/` but loaded differently:

```
tools/index.ts  → main tool registry
tools/lint-check.ts  → for lint operations
tools/format-code.ts  → for format operations
```

### 3. Discovery Flow

```
[Skill Manifest] → [User selects needed] → [Add to instructions] → [Active]
```

## Proposed Workflow

### Step 1: Categorize Skills

Assign skills to categories in a manifest:

```bash
# Skill Categories
CATEGORIES=(
  core           # tdd-workflow, security-review, coding-standards
  frontend      # frontend-patterns, frontend-slides
  backend       # backend-patterns, api-design
  testing       # e2e-testing, verification-loop
  specialized  # ... domain-specific
)
```

### Step 2: Load by Context

Create a command to load skill category:

```bash
# ecc-enable <category>
# Loads all skills in category to opencode.json
```

### Step 3: Active Skill Set

Maintain active skill set in dedicated file:

```
~/.opencode/active-skills.json
```

## Performance Considerations

| Concern | Mitigation |
|---------|------------|
| Too many skills slow loading | Keep active set small (10-20) |
| Skill conflicts | One skill per concern at a time |
| Context bloat | Strategic compact after major tasks |

## Implementation

### 1. Create Skill Manifest Script

```bash
# ~/.local/bin/ecc-skill-manifest
#!/bin/bash
# Manage skill loading

CATEGORIES="core|frontend|backend|testing|security|research|ops"

case "$1" in
  list-categories) echo "$CATEGORIES" | tr '|' '\n' ;;
  list) ls ~/.opencode/skills/ | sort ;;
  active) cat ~/.opencode/opencode.json | jq -r '.instructions[]' | grep skills ;;
  enable) echo "TODO: Add skill to instructions" ;;
esac
```

### 2. Create Load Command

```bash
# Usage: ecc-load core
# Loads core skills into opencode.json
```

## Next Steps

1. Decide on active skill categories for your workflow
2. Create loading automation
3. Test skill loading/detection

---

# MEMORY SOLUTION (CORE)

## Requirement: Memory As Core Infrastructure

Memory must be **always available** - it resolves:
1. Context persistence across resets
2. Context persistence across compactions
3. Skill state tracking (enabled/disabled)

## Memory Path (CORE)

```
~/.opencode/projects/*/memory/ Cross-session context
~/.opencode/memory/        Global memory (all projects)
```

## Implementation

The memory layer should track:
- Active skills (loaded from instructions array)
- Session history (what happened before reset)
- Compaction state (what was compacted, why)

## Location: ~/lab/ecc-skill-tool-workflow.md

This plan file is saved at: /home/hbtjm/lab/ecc-skill-tool-workflow.md

---

# RED TEAM CRITIQUE

## Attack Surface Analysis

### 1. JSON Modification Vulnerability

| Risk | Description | Severity |
|------|-------------|----------|
| **Config Corruption** | Editing `opencode.json` could break opencode entirely | HIGH |
| **Race Conditions** | Concurrent edits could corrupt JSON | MEDIUM |
| **Invalid Paths** | Adding non-existent skills causes failures | MEDIUM |

**Mitigation:** Always backup before editing, validate JSON after

### 2. Tool Execution Risks

| Risk | Description | Severity |
|------|-------------|----------|
| **Tool Injection** | Could malicious tools be added to tools/? | LOW |
| **Tool Flag Abuse** | Passing dangerous flags to tools | MEDIUM |
| **Path Traversal** | tools reading outside project | LOW |

**Mitigation:** Tools are compiled TS, not user-editable

### 3. Skill Conficts & Interference

| Risk | Description | Severity |
|------|-------------|----------|
| **Skill vs Skill** | Two skills give contradictory advice | MEDIUM |
| **Context Pollution** | Too many skills dilute focus | LOW |
| **Memory Leaks** | Skills not unloaded accumulate | MEDIUM |

### 4. Performance Degradation

| Trigger | Impact |
|---------|--------|
| 50+ skills loaded | Slow startup |
| Large skill files | High memory |
| Poorly written skills | Token bloat |

### 5. Persistence Issues

| Scenario | Problem |
|----------|---------|
| Skill enabled but opencode restart | Skill lost |
| Profile switch mid-session | Context inconsistency |
| No persistence | Must re-enable on each run |

**MITIGATED BY MEMORY:** With CORE memory layer tracking active skills, persistence is solved.

## Red Team Scorecard (Revised)

| Category | Score | With Memory |
|----------|-------|-------------|
| Security | 7/10 | 7/10 |
| Performance | 8/10 | 8/10 |
| Reliability | 6/10 | 9/10 (memory persistence) |
| Usability | 5/10 | 7/10 |
| Observability | 4/10 | 6/10 |

## Recommended Fixes

### 1. Before Implementation

- [x] Note: Memory is CORE requirement
- [ ] Validate JSON syntax before each write
- [ ] Create `.opencode.json.backup` before changes

### 2. Memory Integration

```bash
# Memory should track:
ACTIVE_SKILLS_FILE="$HOME/.opencode/memory/active-skills.json"

# Read current active skills
cat "$ACTIVE_SKILLS_FILE"

# After any skill change, update memory
echo "$ACTIVE_SKILLS" > "$ACTIVE_SKILLS_FILE"
```

---

## Final Status

**DEFERRED** - Awaiting implementation to include CORE memory layer.

Memory must be a core always-on service that tracks:
- Currently enabled skills
- Session context for resets
- Compaction state

Plan saved to: /home/hbtjm/lab/ecc-skill-tool-workflow.md