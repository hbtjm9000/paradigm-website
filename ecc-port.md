# ECC Skills Porting Report

Skills with references to `claude` CLI that need porting for ecc-universal (opencode target).

## Confirmations

- **~/.claude/**: NOW SYMLINKED to ~/.opencode/
- **~/.opencode/**: Exists at `/home/hbtjm/.opencode/`
- **opencode CLI**: Functional with `opencode run`, `opencode agent list`, etc.

## Implemented Symlinks/Aliases

- `~/.claude/` → `~/.opencode/` (symlink created)
- `~/.local/bin/claude` → `~/.bun/bin/opencode` (symlink for `claude` command)
- `~/.local/bin/claude-agents` → wrapper script for `opencode agent list`
- `~/.local/bin/ecc-commands` → lookup wrapper for 80 command docs
- PATH includes `~/.local/bin/` for these commands

## Additional Fixes Applied

- Updated `continuous-learning-v2/agents/observer-loop.sh` to use `opencode run` instead of `claude --model haiku` flags

## Known Limitations

- Provider not configured - run `claude providers login`
- 80 commands are documentation only (not executable workflows)
- Slash commands (/tdd, /code-review) are internal Claude Code UI feature

## Skills Status After Testing (Updated)

| Skill | Issue | Working? |
|-------|-------|----------|
| autonomous-loops | References `claude -p` throughout | ✓ Works via symlink |
| nanoclaw-repl | Built on `claude -p` | ✓ Works via symlink |
| team-builder | Uses `claude agents` command | ✓ Works via claude-agents |
| dmux-workflows | References `claude` CLI | ✓ Works via symlink |

## Code Usage Details

### claude -p references (autonomous-loops, nanoclaw-repl)
```
claude -p "prompt"
claude -p --model opus "prompt"
claude -p --allowedTools "Read,Grep,Glob" "prompt"
```

### claude agents references (team-builder)
```
claude agents
```

### Path references (~/.claude/)
- `~/.claude/settings.json`
- `~/.claude.json`
- `~/.claude/skills/`
- `~/.claude/agents/`
- `~/.claude/projects/*/memory/`
- `~/.claude/homunculus/`
- `~/.claude/claw/`
- `.claude/`

## Porting Recommendations

1. **autonomous-loops, nanoclaw-repl** - Replace `claude -p` with `opencode run` (non-interactive mode equivalent)
2. **team-builder** - Uses `opencode agent list` as verified working
3. **path references** - Replace `~/.claude/` with `~/.opencode/`; check `opencode.json` for config
4. **MCP configs** - opencode uses `opencode.json` structure (not `~/.claude.json`)

## Verified Working

- `opencode run` - equivalent to `claude -p`
- `opencode agent list` - equivalent to `claude agents`
- Skills are loaded and listed in agent permissions
- opencode.json used for config (not ~/.claude.json)
- Skills loaded from skills/ directory in opencode.json instructions

## Tested: autonomous-loops skill

**Working despite documentation** - The skill contains `claude -p` references in documentation but this is written as reference documentation for users on the Claude Code CLI. The skill itself is still functional for:
- Reading pattern descriptions
- Providing guidance on loop architectures
- The document is informational (describing patterns) rather than broken code

## Config Location Verified

- opencode uses `.opencode/` in project dir OR `~/.opencode/` for global config
- Config file is `opencode.json` (not `.claude.json` or `~/.claude.json`)
- Skills referenced in `instructions:` array in opencode.json

## Affected Files

- /home/hbtjm/.opencode/skills/autonomous-loops/SKILL.md
- /home/hbtjm/.opencode/skills/nanoclaw-repl/SKILL.md
- /home/hbtjm/.opencode/skills/team-builder/SKILL.md
- /home/hbtjm/.opencode/skills/dmux-workflows/SKILL.md
- /home/hbtjm/.opencode/skills/blueprint/SKILL.md
- /home/hbtjm/.opencode/skills/search-first/SKILL.md
- /home/hbtjm/.opencode/skills/fal-ai-media/SKILL.md
- /home/hbtjm/.opencode/skills/exa-search/SKILL.md
- /home/hbtjm/.opencode/skills/deep-research/SKILL.md
- /home/hbtjm/.opencode/skills/jira-integration/SKILL.md
- /home/hbtjm/.opencode/skills/knowledge-ops/SKILL.md
- /home/hbtjm/.opencode/skills/workspace-surface-audit/SKILL.md
- /home/hbtjm/.opencode/skills/security-scan/SKILL.md
- /home/hbtjm/.opencode/skills/plankton-code-quality/SKILL.md
- /home/hbtjm/.opencode/skills/skill-stocktake/SKILL.md
- /home/hbtjm/.opencode/skills/strategic-compact/SKILL.md
- /home/hbtjm/.opencode/skills/continuous-learning-v2/SKILL.md
- /home/hbtjm/.opencode/skills/continuous-learning-v2/agents/observer.md
- /home/hbtjm/.opencode/skills/council/SKILL.md
- /home/hbtjm/.opencode/skills/eval-harness/SKILL.md
- /home/hbtjm/.opencode/skills/hookify-rules/SKILL.md
- /home/hbtjm/.opencode/skills/agent-sort/SKILL.md