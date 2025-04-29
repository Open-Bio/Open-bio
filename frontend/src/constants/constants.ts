// src/constants/constants.ts

/**
 * invalid characters for flow name
 * @constant
 */
export const INVALID_CHARACTERS = [
  " ",
  ",",
  ".",
  ":",
  ";",
  "!",
  "?",
  "/",
  "\\",
  "(",
  ")",
  "[",
  "]",
  "\n",
];

/**
 * regex to highlight the variables in the text
 * @constant regexHighlight
 * @type {RegExp}
 * @default
 * @example
 * {{variable}} or {variable}
 * @returns {RegExp}
 * @description
 * This regex is used to highlight the variables in the text.
 * It matches the variables in the text that are between {{}} or {}.
 */

export const regexHighlight = /\{\{(.*?)\}\}|\{([^{}]+)\}/g;
export const specialCharsRegex = /[!@#$%^&*()\-_=+[\]{}|;:'",.<>/?\\`´]/;

export const ICON_STROKE_WIDTH = 1.25;

export const DEFAULT_PLACEHOLDER = "Type something...";

export const DEFAULT_TOOLSET_PLACEHOLDER = "Used as a tool";
