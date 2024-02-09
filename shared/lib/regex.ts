// REGEX for validation
/*
 * name validation
 * accepted: letters & spaces, minimum 3 chars, maximum 15 chars
 * ^ matches the start of the string.
 * [a-zA-Z' -] matches any letter (lowercase or uppercase), apostrophes, spaces, or hyphens.
 * {3,15} specifies that the name must be at least 3 characters long and at most 15 characters long.
 * $ matches the end of the string.
 */
export const name: RegExp = /^[a-zA-Z' -]{3,15}$/;

/*
 * email validation
 */
export const email: RegExp = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/;
/*
 * password validation, should contain:
 * (?=.*\d): at least one digit
 * (?=.*[a-z]): at least one lower case
 * (?=.*[A-Z]): at least one uppercase case
 * (?=.*\W): at least one Symbol
 * (?=.*[-+_!@#$%^&*.,?]): at least one of these Symbols
 * [0-9a-zA-Z]{6,}: at least 6 from the mentioned characters
 */
export const password: RegExp =
  // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?])[0-9a-zA-Z-+_!@#$%^&*.,?]{6,}$/;
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z-+_!@#$%^&*.,?]{6,}$/;

/*
 * username validation
 * ^ matches the start of the string.
 * [a-zA-Z0-9] matches any letter (lowercase or uppercase) or digit, and it must be the first character of the username.
 * ([a-zA-Z0-9._]){1,28} matches any letter, digit, dot, or underscore between 1 and 28 times.
 * [a-zA-Z0-9] matches any letter or digit, and it must be the last character of the username.
 * $ matches the end of the string.
 */
export const username: RegExp = /^[a-zA-Z0-9]([a-zA-Z0-9._]){4,28}[a-zA-Z0-9]$/;
