export const REGEX = {
  NOT_EMPTY: /.+/,
  ONLY_NUMBER: /[^0-9]/g,
  NAME: /^.{1,5}$/,
  YEAR: /^[0-9\b]{0,4}$/,
  BIRTH_YEAR: /^(19[0-9]{2}|200[0-9]|201[0-9]|202[0-4])$/,
  PHONE_NUMBER: /^[0-9\b -]{0,13}$/,
  VERIFY_CODE: /^[0-9\b]{0,6}$/,
  PHONE_NUMBER_PATTERN: /(\d{3})(\d{4})(\d{4})/,
  ALL_HYPHEN: /-/g,
};
