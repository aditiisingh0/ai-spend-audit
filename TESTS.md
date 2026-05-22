# Tests

## How to run

```bash
npm test
```

## Test file

`src/app/components/auditEngine.test.ts`

## Test coverage

| Test | What it covers |
|------|---------------|
| Cursor Business with 2 seats recommends downgrade to Pro | Audit engine correctly identifies over-sized plan for small team |
| Windsurf flagged as redundant when Cursor is also enabled | Redundancy detection between two AI code editors |
| Copilot Enterprise with small team recommends Business plan | Enterprise plan overkill detection for teams under 5 |
| Claude Team with 1 seat recommends switching to Pro | Team plan overkill detection for solo users |
| Annual saving is exactly 12x monthly saving | Math correctness — annual = monthly × 12 |
| OpenAI API spend over $500 recommends Credex credits | High API spend triggers Credex recommendation |

## All 6 tests pass

```bash
PASS src/app/components/auditEngine.test.ts
  ✓ Cursor Business with 2 seats recommends downgrade to Pro (1 ms)
  ✓ Windsurf flagged as redundant when Cursor is also enabled
  ✓ Copilot Enterprise with small team recommends Business plan
  ✓ Claude Team with 1 seat recommends switching to Pro
  ✓ Annual saving is exactly 12x monthly saving (1 ms)
  ✓ OpenAI API spend over $500 recommends Credex credits

Tests: 6 passed, 6 total
```