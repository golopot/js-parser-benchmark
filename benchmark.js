// @ts-ignore
import * as espree from "espree";
import { performance } from "perf_hooks";
import { readFileSync } from "fs";
import typescriptESLintParser from "@typescript-eslint/parser";
// @ts-ignore
import BabelEslintParser from "@babel/eslint-parser";
import babelParser from "@babel/parser";
import * as meriyah from "meriyah";
import seafox from "seafox";
import * as acorn from "acorn";

/** @type {{name:string, parse: (_: string) => any}[]}} */
const parsers = [
  {
    name: "espree",
    parse(source) {
      return espree.parse(source, {
        range: true,
        loc: false,
        tokens: false,
        comment: false,
        useJSXTextNode: false,
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      });
    },
  },
  {
    name: "acorn",
    parse(source) {
      return acorn.parse(source, {
        ranges: true,
        ecmaVersion: 2021,
        sourceType: "module",
      });
    },
  },
  {
    name: "@typescript/eslint-parser",
    parse(source) {
      return typescriptESLintParser.parse(source, {
        range: true,
        loc: false,
        tokens: false,
        comment: false,
        useJSXTextNode: false,
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      });
    },
  },
  {
    name: "@babel/eslint-parser",
    parse(source) {
      return BabelEslintParser.parse(source, {
        sourceType: "module",
        requireConfigFile: false,
        babelOptions: {},
      });
    },
  },
  {
    name: "@babel/parser",
    parse(source) {
      return babelParser.parse(source, {
        sourceType: "module",
      });
    },
  },
  {
    name: "meriyah",
    parse(source) {
      return meriyah.parse(source, {
        module: true,
        ranges: true,
        loc: false,
        jsx: true,
      });
    },
  },
  {
    name: "seafox",
    parse(source) {
      return seafox.parse(source, {
        module: true,
        loc: true,
      });
    },
  },
];

function main() {
  const source = readFileSync("./react.development.js").toString();

  for (const parser of parsers) {
    const start = performance.now();
    parser.parse(source);
    const end = performance.now();
    console.log(parser.name, end - start);
  }
}

main();
