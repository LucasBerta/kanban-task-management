"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDuplicatedRecords = exports.isEmpty = exports.errorNames = void 0;
exports.errorNames = {
    VALIDATION: 'Validation error',
    DATA_NOT_FOUND: 'Data not found error',
    INTERNAL_ERROR: 'Internal server error',
};
function isEmpty(value) {
    return !value;
}
exports.isEmpty = isEmpty;
function getDuplicatedRecords(arr) {
    const caseInsensitiveArr = arr === null || arr === void 0 ? void 0 : arr.map(item => item || ''.toLowerCase());
    const duplicates = caseInsensitiveArr === null || caseInsensitiveArr === void 0 ? void 0 : caseInsensitiveArr.filter((item, index) => caseInsensitiveArr.indexOf(item) != index);
    return Array.from(new Set(duplicates));
}
exports.getDuplicatedRecords = getDuplicatedRecords;
