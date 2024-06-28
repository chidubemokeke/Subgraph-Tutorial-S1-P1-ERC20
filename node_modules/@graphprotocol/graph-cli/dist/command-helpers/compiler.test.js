"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const compiler_1 = require("./compiler");
vitest_1.describe.concurrent('appendApiVersionForGraph', () => {
    (0, vitest_1.it)('append /api/v0 to Prod URL with trailing slash', () => {
        (0, vitest_1.expect)((0, compiler_1.appendApiVersionForGraph)('https://api.thegraph.com/ipfs/')).toBe('https://api.thegraph.com/ipfs/api/v0');
    });
    (0, vitest_1.it)('append /api/v0 to Prod URL without trailing slash', () => {
        (0, vitest_1.expect)((0, compiler_1.appendApiVersionForGraph)('https://api.thegraph.com/ipfs')).toBe('https://api.thegraph.com/ipfs/api/v0');
    });
    (0, vitest_1.it)('append /api/v0 to Staging URL without trailing slash', () => {
        (0, vitest_1.expect)((0, compiler_1.appendApiVersionForGraph)('https://staging.api.thegraph.com/ipfs')).toBe('https://staging.api.thegraph.com/ipfs/api/v0');
    });
    (0, vitest_1.it)('do nothing if Prod URL has /api/v0', () => {
        (0, vitest_1.expect)((0, compiler_1.appendApiVersionForGraph)('https://api.thegraph.com/ipfs/api/v0')).toBe('https://api.thegraph.com/ipfs/api/v0');
    });
    (0, vitest_1.it)('do nothing if Prod URL has no /ipfs', () => {
        (0, vitest_1.expect)((0, compiler_1.appendApiVersionForGraph)('https://api.thegraph.com')).toBe('https://api.thegraph.com');
    });
    (0, vitest_1.it)('do nothing for non-graph endpoint', () => {
        (0, vitest_1.expect)((0, compiler_1.appendApiVersionForGraph)('https://ipfs.saihaj.dev/')).toBe('https://ipfs.saihaj.dev/');
    });
    (0, vitest_1.it)('do nothing for non-graph endpoint ending with /ipfs', () => {
        (0, vitest_1.expect)((0, compiler_1.appendApiVersionForGraph)('https://ipfs.saihaj.dev/ipfs/')).toBe('https://ipfs.saihaj.dev/ipfs/');
    });
});
