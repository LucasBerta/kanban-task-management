export const errorNames = {
  VALIDATION: 'Validation error',
  DATA_NOT_FOUND: 'Data not found error',
  INTERNAL_ERROR: 'Internal server error',
};

export function isEmpty(value: any) {
  return !value;
}

export function getDuplicatedRecords(arr: String[] | undefined): Array<String> {
  const caseInsensitiveArr = arr?.map(item => item || ''.toLowerCase());
  const duplicates = caseInsensitiveArr?.filter((item, index) => caseInsensitiveArr.indexOf(item) != index);
  return Array.from(new Set(duplicates));
}
