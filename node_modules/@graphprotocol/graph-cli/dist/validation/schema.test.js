"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const schema_1 = require("./schema");
vitest_1.describe.concurrent('Schema validation', () => {
    (0, vitest_1.test)('Type suggestions', () => {
        (0, vitest_1.expect)((0, schema_1.typeSuggestion)('Address')).toEqual('Bytes');
        (0, vitest_1.expect)((0, schema_1.typeSuggestion)('address')).toEqual('Bytes');
        (0, vitest_1.expect)((0, schema_1.typeSuggestion)('bytes')).toEqual('Bytes');
        (0, vitest_1.expect)((0, schema_1.typeSuggestion)('string')).toEqual('String');
        (0, vitest_1.expect)((0, schema_1.typeSuggestion)('bool')).toEqual('Boolean');
        (0, vitest_1.expect)((0, schema_1.typeSuggestion)('boolean')).toEqual('Boolean');
        (0, vitest_1.expect)((0, schema_1.typeSuggestion)('float')).toEqual('BigDecimal');
        (0, vitest_1.expect)((0, schema_1.typeSuggestion)('Float')).toEqual('BigDecimal');
        (0, vitest_1.expect)((0, schema_1.typeSuggestion)(`int`)).toBe('Int');
        (0, vitest_1.expect)((0, schema_1.typeSuggestion)(`uint`)).toBe('BigInt');
        (0, vitest_1.expect)((0, schema_1.typeSuggestion)(`uint32`)).toBe('BigInt');
        (0, vitest_1.expect)((0, schema_1.typeSuggestion)(`int8`)).toBe('Int8');
        (0, vitest_1.expect)((0, schema_1.typeSuggestion)(`i8`)).toBe('Int8');
        (0, vitest_1.expect)((0, schema_1.typeSuggestion)(`u8`)).toBe('Int8');
        (0, vitest_1.expect)((0, schema_1.typeSuggestion)(`uint8`)).toBe('Int8');
        // Test i16..i32, int17..int32
        for (let i = 16; i <= 32; i += 8) {
            (0, vitest_1.expect)((0, schema_1.typeSuggestion)(`i${i}`)).toBe('Int');
            (0, vitest_1.expect)((0, schema_1.typeSuggestion)(`int${i}`)).toBe('Int');
        }
        // Test u16..u24, uint16..uint24
        for (let i = 16; i <= 24; i += 8) {
            (0, vitest_1.expect)((0, schema_1.typeSuggestion)(`u${i}`)).toBe('Int');
            (0, vitest_1.expect)((0, schema_1.typeSuggestion)(`uint${i}`)).toBe('Int');
        }
        // Test i40..i256, int40..int256, u40..u256, uint40..uint256
        for (let i = 40; i <= 256; i += 8) {
            (0, vitest_1.expect)((0, schema_1.typeSuggestion)(`i${i}`)).toBe('BigInt');
            (0, vitest_1.expect)((0, schema_1.typeSuggestion)(`int${i}`)).toBe('BigInt');
            (0, vitest_1.expect)((0, schema_1.typeSuggestion)(`u${i}`)).toBe('BigInt');
            (0, vitest_1.expect)((0, schema_1.typeSuggestion)(`uint${i}`)).toBe('BigInt');
        }
    });
});
