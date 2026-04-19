# ECC Commands Port Plan - Option A

## ⚠️ REVISED BASED ON RED TEAM TESTING

**Status:** Plan needs significant revision based on live testing.

## Overview

Create wrapper scripts for all 80 ECC commands in `~/.local/bin/`

## Confirmed Issues (from Red Team Testing)

1. **CLI Flags Incompatible:** `claude --model haiku` = `opencode -m provider/model` format
2. **No Provider Configured:** Need `claude providers login`
3. **Commands Are Documentation Only:** Not executable workflows
4. **Slash Commands Internal:** `/command` is Claude Code UI feature, not CLI

## Implementation Status

### COMPLETED

- Created `/home/hbtjm/.local/bin/ecc-commands` wrapper script
- Shows 80 command documentation files via `ecc-commands list` or `ecc-commands <name>`
- Updated `observer-loop.sh` to use `opencode run` instead of `claude` flags

### What Was Implemented

```bash
# After adding to PATH
$ ecc-commands list | wc -l
80

$ ecc-commands tdd | head -10
# Shows TDD command documentation
```

### Remaining Issues

| Issue | Status | Action |
|-------|--------|--------|
| Provider not configured | User action | Run `claude providers login` |
| CLI flags different | Acknowledged | Observer script updated (best effort) |
| 80 commands are docs only | Acknowledged | Wrapper provides doc access |
| Slash commands internal | Can't fix | Documented limitation |

## Command Categories to Group

| Category | Commands | Count |
|----------|---------|-------|
| Build/Review/Test | go-build, go-review, go-test, rust-build, rust-review, rust-test, cpp-build, cpp-review, cpp-test, kotlin-build, kotlin-review, kotlin-test, python-review, flutter-build, flutter-review, flutter-test, gradle-build, gan-build, go-build | 17 |
| Code Quality | code-review, refactor-clean, build-fix, verify, test-coverage, security, tdd | 7 |
| Planning | plan, feature-dev, multi-plan, prp-plan, prp-prd, multi-workflow | 6 |
| Execution | multi-execute, multi-backend, multi-frontend, prp-implement, prp-commit | 5 |
| Learning | learn, learn-eval, instinct-export, instinct-import, instinct-status | 5 |
| Loops | loop-start, loop-status, santa-loop, autonomous-loops | 4 |
| Session | sessions, save-session, resume-session, claw | 4 |
| GitOps | review-pr, prune, promote, prp-pr, quality-gate | 5 |
| Skills | skill-create, skill-health, hookify, hookify-list, hookify-configure, hookify-help | 6 |
| Config | model-route, projects, context-budget, multi-workflow | 4 |
| Docs | docs, update-docs, update-codemaps | 3 |
| Jira | jira | 1 |
| Hooks | hookify-list, hookify-help, hookify-configure | 3 |
| Misc | aside, checkpoint, harness-audit, pm2, setup-pm, rules-distill, evolve, prompt-optimize, devfleet, orchestrate, agent-sort | 11 |

## Files to Create

### 1. Main Wrapper Script

```bash
# ~/.local/bin/ecc-commands
#!/bin/bash
# Generic ECC command wrapper
# Usage: ecc-commands <command-name> [args...]

COMMAND="$1"
shift

COMMAND_FILE="$HOME/.opencode/commands/${COMMAND}.md"

if [[ -z "$COMMAND" ]]; then
  echo "Usage: ecc-commands <command> [args...]"
  echo "Run 'ecc-commands list' for available commands"
  exit 1
fi

if [[ "$COMMAND" == "list" ]]; then
  ls ~/.opencode/commands/*.md | xargs -n1 basename | sed 's/.md//'
  exit 0
fi

if [[ -f "$COMMAND_FILE" ]]; then
  cat "$COMMAND_FILE"
else
  echo "Error: Command '$COMMAND' not found"
  exit 1
fi
```

### 2. Individual Symlinks (Optional)

For commands frequently used, create symlinks:

```bash
# For frequently-used commands, create symlinks to main wrapper
for cmd in tdd code-review build-fix verify; do
  ln -sf ecc-commands "ecc-$cmd"
done
```

### 3. The Shell Scripts (CRITICAL FIXES)

These MUST be fixed - they call `claude` directly:

- `~/.opencode/skills/continuous-learning-v2/agents/observer-loop.sh`
- `~/.opencode/skills/continuous-learning-v2/agents/start-observer.sh`

These reference `~/.claude/` which now works via symlink, but scripts should be updated:

- `~/.opencode/skills/strategic-compact/suggest-compact.sh`
- `~/.opencode/skills/continuous-learning/evaluate-session.sh`

## Installation Steps

```bash
# 1. Create wrapper directory
mkdir -p ~/.local/bin

# 2. Create main wrapper
cat > ~/.local/bin/ecc-commands << 'WRAPPER_SCRIPT'
#!/bin/bash
# ... (script from above)
WRAPPER_SCRIPT
chmod +x ~/.local/bin/ecc-commands

# 3. Create frequent-use symlinks
for cmd in tdd code-review build-fix verify; do
  ln -sf ecc-commands "ecc-$cmd"
done

# 4. Add to PATH in .bashrc
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc

# 5. Create claude-commands as alias to ecc-commands (for /command routing)
echo "alias claude-commands='ecc-commands'" >> ~/.bashrc
```

## Testing Plan

```bash
# Test each category
ecc-commands list | wc -l  # Should show ~80 commands
ecc-commands tdd | head -10  # Should show TDD skill content
ecc-code-review 2>&1 | head -5  # Via symlink
```

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Command file not found | Low | Verify each .md exists |
| Opencode can't use commands | Medium | Commands are docs, not executable |
| Conflicts with existing | Low | Namespaced as `ecc-*` |
| PATH issues | Medium | Test after install |

## Red Team / Attack Surface Analysis

### 1. Execution Model Vulnerability

| Attack Vector | Description | Risk Level |
|-------------|------------|------------|
| **Arbitrary Command Execution** | If commands/*.md files contain backticks or `$()` that get eval'd | CRITICAL |
| **Path Injection** | If argument parsing allows `../` path traversal | HIGH |
| **Command Injection** | Shell metacharacters in arguments passed to sub-commands | HIGH |

**Mitigation:**
- NEVER eval command content - treat as DATA only
- Validate path arguments with `realpath` and prefix check
- Use `--` delimiter before arguments

### 2. Opencode Integration Gaps

| Issue | Description | Risk |
|-------|-------------|-----|
| **Commands are just docs** | They display markdown but don't execute | MEDIUM |
| **No `/command` routing** | Slash commands are internal to Claude, not CLI | HIGH |
| **No hooks integration** | opencode uses different hooks system | MEDIUM |
| **MCP servers not configured** | Will need separate MCP config | MEDIUM |

**Fix:** After implementing, verify that opencode actually uses these command files.

### 3. Shell Script Failures

The scripts in `skills/continuous-learning-v2/agents/` call `claude` but:
- `command -v claude` works via symlink
- `claude --model haiku --max-turns 1 --print` passes flags - may not work

**Test:**
```bash
claude --model haiku --max-turns 1 --print "test" 2>&1 | head -5
```

### 4. Configuration Conflicts

- opencode uses `opencode.json`, not `~/.claude.json`
- This install has BOTH `.claude/` and `.opencode/` pointed to same dir
- Could cause config merging issues

**Mitigation:** Merge key configs rather than symlink.

### 5. Breakage Scenarios

| Scenario | Trigger | Impact |
|----------|---------|--------|
| opencode updates | New command format | Commands fail to parse |
| symlink breaks | `.claude/` removed | 22 skills break |
| PATH clears | Terminal restart | Commands not found |

### 6. Security: Commands as Attack Surface

If an attacker can write to `~/.opencode/commands/`:
- They could add malicious content
- This would display via our wrappers
- BUT we don't eval, so low risk

**Verified Safe:** Plan treats command files as DATA only.

## Red Team Scorecard

| Category | Score | Notes |
|----------|-------|-------|
| Execution Safety | 9/10 | No eval, read-only |
| Compatibility | 6/10 | Commands display only |
| Shell Script Fix | 5/10 | Needs testing |
| Path Security | 8/10 | Symlink covers most |
| Fallbacks | 4/10 | No backup if broken |

## Recommended Fixes Before Proceeding

1. **Test shell script calls** with actual `claude` command
2. **Merge configs** rather than relying on symlink for everything
3. **Add error handling** for opencode not installed
4. **Create fallback list** of commands that actually need execution vs display

## RED TEAM FINDINGS (Live Test)

### Finding 1: CLI FLAGS INCOMPATIBLE

`claude --model haiku --max-turns 1 --print` flags:
- `--model` works differently (uses `-m` with provider format)
- `--max-turns` not recognized by opencode
- `--print` not recognized by opencode

**Impact:** Shell scripts that call `claude --model haiku ...` will FAIL.

**Fix Applied:** Updated `observer-loop.sh` to use `opencode run` (best effort).

### Finding 2: No Provider Configured

`claude providers list` shows no providers configured - needs `claude providers login`.

**Impact:** Can't run prompts until provider configured.

**Fix Available:** User can run `claude providers login`.

### Finding 3: Commands Are Docs Only

The `commands/*.md` files contain markdown for `/command` routing in Claude Code's interactive mode. They don't execute anything.

**Impact:** Our wrapper only displays documentation, doesn't run workflows.

**Mitigated:** Created `ecc-commands` wrapper to display docs.

### Finding 4: Slash Commands Are Internal

`/tdd`, `/code-review` etc are handled by Claude Code's interactive prompt, not via CLI.

**Impact:** No equivalent `claude /command` at CLI level - this is UI-only feature.

**Acknowledged:** Can't be fixed at CLI level.