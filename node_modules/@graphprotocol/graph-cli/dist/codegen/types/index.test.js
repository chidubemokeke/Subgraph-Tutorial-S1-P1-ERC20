"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const codegen = __importStar(require("."));
vitest_1.describe.concurrent('ethereum.Value -> AssemblyScript', () => {
    // Scalar values
    (0, vitest_1.test)('address -> Address', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'address')).toBe('x.toAddress()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('address')).toBe('Address');
    });
    (0, vitest_1.test)('bool -> boolean', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'bool')).toBe('x.toBoolean()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('bool')).toBe('boolean');
    });
    (0, vitest_1.test)('byte -> Bytes', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'byte')).toBe('x.toBytes()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('byte')).toBe('Bytes');
    });
    (0, vitest_1.test)('bytes -> Bytes', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'bytes')).toBe('x.toBytes()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('bytes')).toBe('Bytes');
    });
    (0, vitest_1.test)('bytes0 (invalid)', () => {
        (0, vitest_1.expect)(() => codegen.ethereumToAsc('x', 'bytes0')).toThrow();
        (0, vitest_1.expect)(() => codegen.ascTypeForEthereum('bytes0')).toThrow();
    });
    (0, vitest_1.test)('bytes1..32 -> Bytes', () => {
        for (let i = 1; i <= 32; i++) {
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `bytes${i}`)).toBe('x.toBytes()');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`bytes${i}`)).toBe('Bytes');
        }
    });
    (0, vitest_1.test)('bytes33 (invalid)', () => {
        (0, vitest_1.expect)(() => codegen.ethereumToAsc('x', 'bytes33')).toThrow();
        (0, vitest_1.expect)(() => codegen.ascTypeForEthereum('bytes33')).toThrow();
    });
    (0, vitest_1.test)('int8..32, uint8..uint24 -> i32', () => {
        for (let i = 8; i <= 32; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `int${i}`)).toBe('x.toI32()');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`int${i}`)).toBe('i32');
        }
        for (let i = 8; i <= 24; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint${i}`)).toBe('x.toI32()');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint${i}`)).toBe('i32');
        }
    });
    (0, vitest_1.test)('uint32 -> BigInt', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint32`)).toBe('x.toBigInt()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('uint32')).toBe('BigInt');
    });
    (0, vitest_1.test)('(u)int40..256 -> BigInt', () => {
        for (let i = 40; i <= 256; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `int${i}`)).toBe('x.toBigInt()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint${i}`)).toBe('x.toBigInt()');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`int${i}`)).toBe('BigInt');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint${i}`)).toBe('BigInt');
        }
    });
    (0, vitest_1.test)('string -> String', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'string')).toBe('x.toString()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('string')).toBe('string');
    });
    // Array values
    (0, vitest_1.test)('address[*] -> Array<Address>', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'address[]')).toBe('x.toAddressArray()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'address[1]')).toBe('x.toAddressArray()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'address[123]')).toBe('x.toAddressArray()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('address[]')).toBe('Array<Address>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('address[1]')).toBe('Array<Address>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('address[123]')).toBe('Array<Address>');
    });
    (0, vitest_1.test)('bool[*] -> Array<boolean>', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'bool[]')).toBe('x.toBooleanArray()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'bool[5]')).toBe('x.toBooleanArray()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'bool[275]')).toBe('x.toBooleanArray()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('bool[]')).toBe('Array<boolean>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('bool[5]')).toBe('Array<boolean>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('bool[275]')).toBe('Array<boolean>');
    });
    (0, vitest_1.test)('byte[*] -> Array<Bytes>', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'byte[]')).toBe('x.toBytesArray()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'byte[7]')).toBe('x.toBytesArray()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'byte[553]')).toBe('x.toBytesArray()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('byte[]')).toBe('Array<Bytes>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('byte[7]')).toBe('Array<Bytes>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('byte[553]')).toBe('Array<Bytes>');
    });
    (0, vitest_1.test)('bytes[*] -> Array<Bytes>', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'bytes[]')).toBe('x.toBytesArray()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'bytes[14]')).toBe('x.toBytesArray()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'bytes[444]')).toBe('x.toBytesArray()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('bytes[]')).toBe('Array<Bytes>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('bytes[14]')).toBe('Array<Bytes>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('bytes[444]')).toBe('Array<Bytes>');
    });
    (0, vitest_1.test)('bytes0[*] (invalid)', () => {
        (0, vitest_1.expect)(() => codegen.ethereumToAsc('x', 'bytes0[]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumToAsc('x', 'bytes0[83]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumToAsc('x', 'bytes0[123]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ascTypeForEthereum('bytes0[]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ascTypeForEthereum('bytes0[83]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ascTypeForEthereum('bytes0[123]')).toThrow();
    });
    (0, vitest_1.test)('bytes1..32[*] -> Array<Bytes>', () => {
        for (let i = 1; i <= 32; i++) {
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `bytes${i}[]`)).toBe('x.toBytesArray()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `bytes${i}[7]`)).toBe('x.toBytesArray()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `bytes${i}[432]`)).toBe('x.toBytesArray()');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`bytes${i}[]`)).toBe('Array<Bytes>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`bytes${i}[7]`)).toBe('Array<Bytes>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`bytes${i}[432]`)).toBe('Array<Bytes>');
        }
    });
    (0, vitest_1.test)('bytes33[*] (invalid)', () => {
        (0, vitest_1.expect)(() => codegen.ethereumToAsc('x', 'bytes33[]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumToAsc('x', 'bytes33[58]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumToAsc('x', 'bytes33[394]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ascTypeForEthereum('bytes33[]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ascTypeForEthereum('bytes33[58]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ascTypeForEthereum('bytes33[394]')).toThrow();
    });
    (0, vitest_1.test)('int8..32[*], uint8..24[*] -> Array<i32>', () => {
        for (let i = 8; i <= 32; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `int${i}[]`)).toBe('x.toI32Array()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `int${i}[6]`)).toBe('x.toI32Array()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `int${i}[4638]`)).toBe('x.toI32Array()');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`int${i}[]`)).toBe('Array<i32>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`int${i}[6]`)).toBe('Array<i32>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`int${i}[4638]`)).toBe('Array<i32>');
        }
        for (let i = 8; i <= 24; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint${i}[]`)).toBe('x.toI32Array()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint${i}[6]`)).toBe('x.toI32Array()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint${i}[593]`)).toBe('x.toI32Array()');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint${i}[]`)).toBe('Array<i32>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint${i}[6]`)).toBe('Array<i32>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint${i}[593]`)).toBe('Array<i32>');
        }
    });
    (0, vitest_1.test)('uint32[*] -> Array<BigInt>', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint32[]`)).toBe('x.toBigIntArray()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint32[6]`)).toBe('x.toBigIntArray()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint32[593]`)).toBe('x.toBigIntArray()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint32[]`)).toBe('Array<BigInt>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint32[6]`)).toBe('Array<BigInt>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint32[593]`)).toBe('Array<BigInt>');
    });
    (0, vitest_1.test)('(u)int40..256[*] -> Array<BigInt>', () => {
        for (let i = 40; i <= 256; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `int${i}[]`)).toBe('x.toBigIntArray()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `int${i}[7]`)).toBe('x.toBigIntArray()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `int${i}[6833]`)).toBe('x.toBigIntArray()');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`int${i}[]`)).toBe('Array<BigInt>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`int${i}[7]`)).toBe('Array<BigInt>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`int${i}[6833]`)).toBe('Array<BigInt>');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint${i}[]`)).toBe('x.toBigIntArray()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint${i}[23]`)).toBe('x.toBigIntArray()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint${i}[467]`)).toBe('x.toBigIntArray()');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint${i}[]`)).toBe('Array<BigInt>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint${i}[23]`)).toBe('Array<BigInt>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint${i}[467]`)).toBe('Array<BigInt>');
        }
    });
    (0, vitest_1.test)('string[*] -> Array<string>', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'string[]')).toBe('x.toStringArray()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'string[4]')).toBe('x.toStringArray()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'string[754]')).toBe('x.toStringArray()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('string[]')).toBe('Array<string>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('string[4]')).toBe('Array<string>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('string[754]')).toBe('Array<string>');
    });
    // Multi dimensional arrays
    (0, vitest_1.test)('address[*][*] -> Array<Array<Address>>', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'address[][]')).toBe('x.toAddressMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'address[5][]')).toBe('x.toAddressMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'address[][4]')).toBe('x.toAddressMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'address[1][2]')).toBe('x.toAddressMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'address[123][321]')).toBe('x.toAddressMatrix()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('address[][]')).toBe('Array<Array<Address>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('address[5][]')).toBe('Array<Array<Address>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('address[][4]')).toBe('Array<Array<Address>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('address[1][2]')).toBe('Array<Array<Address>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('address[123][321]')).toBe('Array<Array<Address>>');
    });
    (0, vitest_1.test)('bool[*][*] -> Array<Array<boolean>>', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'bool[][]')).toBe('x.toBooleanMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'bool[1][]')).toBe('x.toBooleanMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'bool[][3]')).toBe('x.toBooleanMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'bool[5][2]')).toBe('x.toBooleanMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'bool[275][572]')).toBe('x.toBooleanMatrix()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('bool[][]')).toBe('Array<Array<boolean>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('bool[1][]')).toBe('Array<Array<boolean>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('bool[][3]')).toBe('Array<Array<boolean>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('bool[5][2]')).toBe('Array<Array<boolean>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('bool[275][572]')).toBe('Array<Array<boolean>>');
    });
    (0, vitest_1.test)('byte[*][*] -> Array<Array<Bytes>>', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'byte[][]')).toBe('x.toBytesMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'byte[7][]')).toBe('x.toBytesMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'byte[][8]')).toBe('x.toBytesMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'byte[553][355]')).toBe('x.toBytesMatrix()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('byte[][]')).toBe('Array<Array<Bytes>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('byte[7][]')).toBe('Array<Array<Bytes>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('byte[][8]')).toBe('Array<Array<Bytes>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('byte[553][355]')).toBe('Array<Array<Bytes>>');
    });
    (0, vitest_1.test)('bytes[*][*] -> Array<Array<Bytes>>', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'bytes[][]')).toBe('x.toBytesMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'bytes[14][]')).toBe('x.toBytesMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'bytes[][41]')).toBe('x.toBytesMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'bytes[444][555]')).toBe('x.toBytesMatrix()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('bytes[][]')).toBe('Array<Array<Bytes>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('bytes[14][]')).toBe('Array<Array<Bytes>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('bytes[][41]')).toBe('Array<Array<Bytes>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('bytes[444][555]')).toBe('Array<Array<Bytes>>');
    });
    (0, vitest_1.test)('bytes0[*][*] (invalid)', () => {
        (0, vitest_1.expect)(() => codegen.ethereumToAsc('x', 'bytes0[][]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumToAsc('x', 'bytes0[83][]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumToAsc('x', 'bytes0[][83]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumToAsc('x', 'bytes0[123][321]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ascTypeForEthereum('bytes0[][]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ascTypeForEthereum('bytes0[83][]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ascTypeForEthereum('bytes0[][83]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ascTypeForEthereum('bytes0[123][321]')).toThrow();
    });
    (0, vitest_1.test)('bytes1..32[*][*] -> Array<Array<Bytes>>', () => {
        for (let i = 1; i <= 32; i++) {
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `bytes${i}[][]`)).toBe('x.toBytesMatrix()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `bytes${i}[7][]`)).toBe('x.toBytesMatrix()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `bytes${i}[][7]`)).toBe('x.toBytesMatrix()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `bytes${i}[432][234]`)).toBe('x.toBytesMatrix()');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`bytes${i}[][]`)).toBe('Array<Array<Bytes>>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`bytes${i}[6][]`)).toBe('Array<Array<Bytes>>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`bytes${i}[][7]`)).toBe('Array<Array<Bytes>>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`bytes${i}[432][234]`)).toBe('Array<Array<Bytes>>');
        }
    });
    (0, vitest_1.test)('bytes33[*][*] (invalid)', () => {
        (0, vitest_1.expect)(() => codegen.ethereumToAsc('x', 'bytes33[][]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumToAsc('x', 'bytes33[58][]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumToAsc('x', 'bytes33[][85]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumToAsc('x', 'bytes33[394][493]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ascTypeForEthereum('bytes33[][]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ascTypeForEthereum('bytes33[58][]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ascTypeForEthereum('bytes33[][85]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ascTypeForEthereum('bytes33[394][493]')).toThrow();
    });
    (0, vitest_1.test)('int8..32[*][*], uint8..24[*][*] -> Array<Array<i32>>', () => {
        for (let i = 8; i <= 32; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `int${i}[][]`)).toBe('x.toI32Matrix()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `int${i}[6][]`)).toBe('x.toI32Matrix()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `int${i}[][6]`)).toBe('x.toI32Matrix()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `int${i}[4638][8364]`)).toBe('x.toI32Matrix()');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`int${i}[][]`)).toBe('Array<Array<i32>>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`int${i}[6][]`)).toBe('Array<Array<i32>>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`int${i}[][6]`)).toBe('Array<Array<i32>>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`int${i}[4638][8364]`)).toBe('Array<Array<i32>>');
        }
        for (let i = 8; i <= 24; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint${i}[][]`)).toBe('x.toI32Matrix()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint${i}[6][]`)).toBe('x.toI32Matrix()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint${i}[][6]`)).toBe('x.toI32Matrix()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint${i}[593][395]`)).toBe('x.toI32Matrix()');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint${i}[][]`)).toBe('Array<Array<i32>>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint${i}[6][]`)).toBe('Array<Array<i32>>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint${i}[][6]`)).toBe('Array<Array<i32>>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint${i}[593][395]`)).toBe('Array<Array<i32>>');
        }
    });
    (0, vitest_1.test)('uint32[*][*] -> Array<Array<BigInt>>', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint32[][]`)).toBe('x.toBigIntMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint32[6][]`)).toBe('x.toBigIntMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint32[][6]`)).toBe('x.toBigIntMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint32[593][395]`)).toBe('x.toBigIntMatrix()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint32[][]`)).toBe('Array<Array<BigInt>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint32[6][]`)).toBe('Array<Array<BigInt>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint32[][5]`)).toBe('Array<Array<BigInt>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint32[593][395]`)).toBe('Array<Array<BigInt>>');
    });
    (0, vitest_1.test)('(u)int40..256[*][*] -> Array<Array<BigInt>>', () => {
        for (let i = 40; i <= 256; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `int${i}[][]`)).toBe('x.toBigIntMatrix()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `int${i}[7][]`)).toBe('x.toBigIntMatrix()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `int${i}[][7]`)).toBe('x.toBigIntMatrix()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `int${i}[6833][3386]`)).toBe('x.toBigIntMatrix()');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`int${i}[][]`)).toBe('Array<Array<BigInt>>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`int${i}[7][]`)).toBe('Array<Array<BigInt>>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`int${i}[][7]`)).toBe('Array<Array<BigInt>>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`int${i}[6833][3386]`)).toBe('Array<Array<BigInt>>');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint${i}[][]`)).toBe('x.toBigIntMatrix()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint${i}[23][]`)).toBe('x.toBigIntMatrix()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint${i}[][32]`)).toBe('x.toBigIntMatrix()');
            (0, vitest_1.expect)(codegen.ethereumToAsc('x', `uint${i}[467][764]`)).toBe('x.toBigIntMatrix()');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint${i}[][]`)).toBe('Array<Array<BigInt>>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint${i}[23][]`)).toBe('Array<Array<BigInt>>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint${i}[][32]`)).toBe('Array<Array<BigInt>>');
            (0, vitest_1.expect)(codegen.ascTypeForEthereum(`uint${i}[467][764]`)).toBe('Array<Array<BigInt>>');
        }
    });
    (0, vitest_1.test)('string[*][*] -> Array<Array<string>>', () => {
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'string[][]')).toBe('x.toStringMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'string[4][]')).toBe('x.toStringMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'string[][3]')).toBe('x.toStringMatrix()');
        (0, vitest_1.expect)(codegen.ethereumToAsc('x', 'string[754][457]')).toBe('x.toStringMatrix()');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('string[][]')).toBe('Array<Array<string>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('string[4][]')).toBe('Array<Array<string>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('string[][3]')).toBe('Array<Array<string>>');
        (0, vitest_1.expect)(codegen.ascTypeForEthereum('string[754][457]')).toBe('Array<Array<string>>');
    });
});
(0, vitest_1.describe)('AssemblyScript -> ethereum.Value', () => {
    // Scalar values
    (0, vitest_1.test)('Address -> address', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'address')).toBe('ethereum.Value.fromAddress(x)');
    });
    (0, vitest_1.test)('boolean -> bool', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'bool')).toBe('ethereum.Value.fromBoolean(x)');
    });
    (0, vitest_1.test)('Bytes -> byte', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'byte')).toBe('ethereum.Value.fromFixedBytes(x)');
    });
    (0, vitest_1.test)('Bytes -> bytes', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'bytes')).toBe('ethereum.Value.fromBytes(x)');
    });
    (0, vitest_1.test)('Bytes -> bytes0 (invalid)', () => {
        (0, vitest_1.expect)(() => codegen.ethereumFromAsc('x', 'bytes0')).toThrow();
    });
    (0, vitest_1.test)('Bytes -> bytes1..32', () => {
        for (let i = 1; i <= 32; i++) {
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `bytes${i}`)).toBe('ethereum.Value.fromFixedBytes(x)');
        }
    });
    (0, vitest_1.test)('Bytes -> bytes33 (invalid)', () => {
        (0, vitest_1.expect)(() => codegen.ethereumFromAsc('x', 'bytes33')).toThrow();
    });
    (0, vitest_1.test)('i32 -> int8..32, uint8..24', () => {
        for (let i = 8; i <= 32; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `int${i}`)).toBe(`ethereum.Value.fromI32(x)`);
        }
        for (let i = 8; i <= 24; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint${i}`)).toBe(`ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(x))`);
        }
    });
    (0, vitest_1.test)('BigInt -> uint32', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint32`)).toBe(`ethereum.Value.fromUnsignedBigInt(x)`);
    });
    (0, vitest_1.test)('BigInt -> (u)int40..256', () => {
        for (let i = 40; i <= 256; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `int${i}`)).toBe(`ethereum.Value.fromSignedBigInt(x)`);
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint${i}`)).toBe(`ethereum.Value.fromUnsignedBigInt(x)`);
        }
    });
    (0, vitest_1.test)('String -> string', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'string')).toBe('ethereum.Value.fromString(x)');
    });
    // Array values
    (0, vitest_1.test)('Array<Address> -> address[*]', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'address[]')).toBe('ethereum.Value.fromAddressArray(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'address[1]')).toBe('ethereum.Value.fromAddressArray(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'address[123]')).toBe('ethereum.Value.fromAddressArray(x)');
    });
    (0, vitest_1.test)('Array<boolean> -> bool[*]', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'bool[]')).toBe('ethereum.Value.fromBooleanArray(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'bool[5]')).toBe('ethereum.Value.fromBooleanArray(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'bool[275]')).toBe('ethereum.Value.fromBooleanArray(x)');
    });
    (0, vitest_1.test)('Array<Bytes> -> byte[*]', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'byte[]')).toBe('ethereum.Value.fromFixedBytesArray(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'byte[7]')).toBe('ethereum.Value.fromFixedBytesArray(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'byte[553]')).toBe('ethereum.Value.fromFixedBytesArray(x)');
    });
    (0, vitest_1.test)('Array<Bytes> -> bytes[*]', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'bytes[]')).toBe('ethereum.Value.fromBytesArray(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'bytes[14]')).toBe('ethereum.Value.fromBytesArray(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'bytes[444]')).toBe('ethereum.Value.fromBytesArray(x)');
    });
    (0, vitest_1.test)('bytes0[*] (invalid)', () => {
        (0, vitest_1.expect)(() => codegen.ethereumFromAsc('x', 'bytes0[]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumFromAsc('x', 'bytes0[83]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumFromAsc('x', 'bytes0[123]')).toThrow();
    });
    (0, vitest_1.test)('Array<Bytes> -> bytes1..32[*]', () => {
        for (let i = 1; i <= 32; i++) {
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `bytes${i}[]`)).toBe('ethereum.Value.fromFixedBytesArray(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `bytes${i}[7]`)).toBe('ethereum.Value.fromFixedBytesArray(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `bytes${i}[432]`)).toBe('ethereum.Value.fromFixedBytesArray(x)');
        }
    });
    (0, vitest_1.test)('bytes33[*] (invalid)', () => {
        (0, vitest_1.expect)(() => codegen.ethereumFromAsc('x', 'bytes33[]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumFromAsc('x', 'bytes33[58]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumFromAsc('x', 'bytes33[394]')).toThrow();
    });
    (0, vitest_1.test)('Array<i32> -> int8..32[*], uint8..24[*]', () => {
        for (let i = 8; i <= 32; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `int${i}[]`)).toBe('ethereum.Value.fromI32Array(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `int${i}[6]`)).toBe('ethereum.Value.fromI32Array(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `int${i}[4638]`)).toBe('ethereum.Value.fromI32Array(x)');
        }
        for (let i = 8; i <= 24; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint${i}[]`)).toBe('ethereum.Value.fromI32Array(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint${i}[6]`)).toBe('ethereum.Value.fromI32Array(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint${i}[593]`)).toBe('ethereum.Value.fromI32Array(x)');
        }
    });
    (0, vitest_1.test)('Array<BigInt> -> uint32[*]', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint32[]`)).toBe('ethereum.Value.fromUnsignedBigIntArray(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint32[6]`)).toBe('ethereum.Value.fromUnsignedBigIntArray(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint32[593]`)).toBe('ethereum.Value.fromUnsignedBigIntArray(x)');
    });
    (0, vitest_1.test)('Array<BigInt> -> (u)int40..256[*]', () => {
        for (let i = 40; i <= 256; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `int${i}[]`)).toBe('ethereum.Value.fromSignedBigIntArray(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `int${i}[7]`)).toBe('ethereum.Value.fromSignedBigIntArray(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `int${i}[6833]`)).toBe('ethereum.Value.fromSignedBigIntArray(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint${i}[]`)).toBe('ethereum.Value.fromUnsignedBigIntArray(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint${i}[23]`)).toBe('ethereum.Value.fromUnsignedBigIntArray(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint${i}[467]`)).toBe('ethereum.Value.fromUnsignedBigIntArray(x)');
        }
    });
    (0, vitest_1.test)('Array<String> -> string[*]', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'string[]')).toBe('ethereum.Value.fromStringArray(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'string[4]')).toBe('ethereum.Value.fromStringArray(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'string[754]')).toBe('ethereum.Value.fromStringArray(x)');
    });
    // Multidimensional arrays
    (0, vitest_1.test)('Array<Array<Address>> -> address[*][*]', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'address[][]')).toBe('ethereum.Value.fromAddressMatrix(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'address[1][]')).toBe('ethereum.Value.fromAddressMatrix(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'address[][2]')).toBe('ethereum.Value.fromAddressMatrix(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'address[123][321]')).toBe('ethereum.Value.fromAddressMatrix(x)');
    });
    (0, vitest_1.test)('Array<Array<boolean>> -> bool[*][*]', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'bool[][]')).toBe('ethereum.Value.fromBooleanMatrix(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'bool[5][]')).toBe('ethereum.Value.fromBooleanMatrix(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'bool[][5]')).toBe('ethereum.Value.fromBooleanMatrix(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'bool[275][572]')).toBe('ethereum.Value.fromBooleanMatrix(x)');
    });
    (0, vitest_1.test)('Array<Array<Bytes>> -> byte[*][*]', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'byte[][]')).toBe('ethereum.Value.fromFixedBytesMatrix(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'byte[7][]')).toBe('ethereum.Value.fromFixedBytesMatrix(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'byte[][6]')).toBe('ethereum.Value.fromFixedBytesMatrix(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'byte[553][355]')).toBe('ethereum.Value.fromFixedBytesMatrix(x)');
    });
    (0, vitest_1.test)('Array<Array<Bytes>> -> bytes[*][*]', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'bytes[][]')).toBe('ethereum.Value.fromBytesMatrix(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'bytes[14][]')).toBe('ethereum.Value.fromBytesMatrix(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'bytes[][41]')).toBe('ethereum.Value.fromBytesMatrix(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'bytes[444][333]')).toBe('ethereum.Value.fromBytesMatrix(x)');
    });
    (0, vitest_1.test)('bytes0[*][*] (invalid)', () => {
        (0, vitest_1.expect)(() => codegen.ethereumFromAsc('x', 'bytes0[][]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumFromAsc('x', 'bytes0[83][]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumFromAsc('x', 'bytes0[][38]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumFromAsc('x', 'bytes0[123][321]')).toThrow();
    });
    (0, vitest_1.test)('Array<Array<Bytes>> -> bytes1..32[*][*]', () => {
        for (let i = 1; i <= 32; i++) {
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `bytes${i}[][]`)).toBe('ethereum.Value.fromFixedBytesMatrix(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `bytes${i}[7][]`)).toBe('ethereum.Value.fromFixedBytesMatrix(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `bytes${i}[][7]`)).toBe('ethereum.Value.fromFixedBytesMatrix(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `bytes${i}[432][234]`)).toBe('ethereum.Value.fromFixedBytesMatrix(x)');
        }
    });
    (0, vitest_1.test)('bytes33[*][*] (invalid)', () => {
        (0, vitest_1.expect)(() => codegen.ethereumFromAsc('x', 'bytes33[][]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumFromAsc('x', 'bytes33[58][]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumFromAsc('x', 'bytes33[][85]')).toThrow();
        (0, vitest_1.expect)(() => codegen.ethereumFromAsc('x', 'bytes33[394][493]')).toThrow();
    });
    (0, vitest_1.test)('Array<Array<i32>> -> int8..32[*][*], uint8..24[*][*]', () => {
        for (let i = 8; i <= 32; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `int${i}[][]`)).toBe('ethereum.Value.fromI32Matrix(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `int${i}[6][]`)).toBe('ethereum.Value.fromI32Matrix(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `int${i}[][5]`)).toBe('ethereum.Value.fromI32Matrix(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `int${i}[4638][8364]`)).toBe('ethereum.Value.fromI32Matrix(x)');
        }
        for (let i = 8; i <= 24; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint${i}[][]`)).toBe('ethereum.Value.fromI32Matrix(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint${i}[6][]`)).toBe('ethereum.Value.fromI32Matrix(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint${i}[][5]`)).toBe('ethereum.Value.fromI32Matrix(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint${i}[593][395]`)).toBe('ethereum.Value.fromI32Matrix(x)');
        }
    });
    (0, vitest_1.test)('Array<Array<BigInt>> -> uint32[*][*]', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint32[][]`)).toBe('ethereum.Value.fromUnsignedBigIntMatrix(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint32[6][]`)).toBe('ethereum.Value.fromUnsignedBigIntMatrix(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint32[][5]`)).toBe('ethereum.Value.fromUnsignedBigIntMatrix(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint32[593][395]`)).toBe('ethereum.Value.fromUnsignedBigIntMatrix(x)');
    });
    (0, vitest_1.test)('Array<Array<BigInt>> -> (u)int40..256[*][*]', () => {
        for (let i = 40; i <= 256; i += 8) {
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `int${i}[][]`)).toBe('ethereum.Value.fromSignedBigIntMatrix(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `int${i}[8][]`)).toBe('ethereum.Value.fromSignedBigIntMatrix(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `int${i}[][7]`)).toBe('ethereum.Value.fromSignedBigIntMatrix(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `int${i}[6833][3386]`)).toBe('ethereum.Value.fromSignedBigIntMatrix(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint${i}[][]`)).toBe('ethereum.Value.fromUnsignedBigIntMatrix(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint${i}[23][]`)).toBe('ethereum.Value.fromUnsignedBigIntMatrix(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint${i}[][32]`)).toBe('ethereum.Value.fromUnsignedBigIntMatrix(x)');
            (0, vitest_1.expect)(codegen.ethereumFromAsc('x', `uint${i}[467][764]`)).toBe('ethereum.Value.fromUnsignedBigIntMatrix(x)');
        }
    });
    (0, vitest_1.test)('Array<Array<String>> -> string[*][*]', () => {
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'string[]')).toBe('ethereum.Value.fromStringArray(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'string[4]')).toBe('ethereum.Value.fromStringArray(x)');
        (0, vitest_1.expect)(codegen.ethereumFromAsc('x', 'string[754]')).toBe('ethereum.Value.fromStringArray(x)');
    });
});
(0, vitest_1.describe)('Value -> AssemblyScript', () => {
    (0, vitest_1.test)('BigDecimal -> BigDecimal', () => {
        (0, vitest_1.expect)(codegen.valueToAsc('x', 'BigDecimal')).toBe('x.toBigDecimal()');
    });
    (0, vitest_1.test)('[BigDecimal] -> Array<BigDecimal>', () => {
        (0, vitest_1.expect)(codegen.valueToAsc('x', '[BigDecimal]')).toBe('x.toBigDecimalArray()');
    });
    (0, vitest_1.test)('String -> string', () => {
        (0, vitest_1.expect)(codegen.valueToAsc('x', 'string')).toBe('x.toString()');
    });
    (0, vitest_1.test)('[String] -> Array<string>', () => {
        (0, vitest_1.expect)(codegen.valueToAsc('x', '[String]')).toBe('x.toStringArray()');
    });
});
(0, vitest_1.describe)('AssemblyScript -> Value', () => {
    (0, vitest_1.test)('BigDecimal -> BigDecimal', () => {
        (0, vitest_1.expect)(codegen.valueFromAsc('x', 'BigDecimal')).toBe('Value.fromBigDecimal(x)');
        (0, vitest_1.expect)(codegen.valueTypeForAsc('BigDecimal')).toBe('BigDecimal');
    });
    (0, vitest_1.test)('Array<BigDecimal> -> [BigDecimal]', () => {
        (0, vitest_1.expect)(codegen.valueFromAsc('x', '[BigDecimal]')).toBe('Value.fromBigDecimalArray(x)');
        (0, vitest_1.expect)(codegen.valueTypeForAsc('Array<BigDecimal>')).toBe('[BigDecimal]');
    });
    (0, vitest_1.test)('string -> String', () => {
        (0, vitest_1.expect)(codegen.valueFromAsc('x', 'String')).toBe('Value.fromString(x)');
        (0, vitest_1.expect)(codegen.valueTypeForAsc('string')).toBe('String');
    });
    (0, vitest_1.test)('Array<string> -> [String]', () => {
        (0, vitest_1.expect)(codegen.valueFromAsc('x', '[String]')).toBe('Value.fromStringArray(x)');
        (0, vitest_1.expect)(codegen.valueTypeForAsc('Array<string>')).toBe('[String]');
    });
});
