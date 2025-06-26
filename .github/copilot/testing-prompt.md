# Testing Guidelines

When writing tests:
1. Use component factories from `src/test/factories/` (create new ones following patterns if needed)
2. Use `dataTestIds` from `src/test/dataTestIds.ts` for element selection
3. Test visible behavior, not implementation details
4. Follow structure: `__tests__/ComponentName.spec.ts` with describe/it blocks
5. Use `createWrapper` utility from test-utils.ts
6. Group tests by user interactions and initial state
7. Always use data-testid selectors, never CSS/class selectors

See full pattern in COPILOT_TEST_INSTRUCTIONS.md
