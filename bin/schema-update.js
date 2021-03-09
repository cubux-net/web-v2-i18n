#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const generate = require("./lib/generate-schema").default;
const recursive = require("../src/recursive-readdir").default;

const pkgDir = path.join(__dirname, "..");
// get any specific language
const localePath = path.join(pkgDir, "locales/en");
const schemasPath = path.join(pkgDir, "schemas");

const blackListFiles = new Set(["lib/echarts.json"]);

const files = recursive(localePath, {
  /**
   * @param {Dirent} stat
   * @param {string} file
   * @return {boolean}
   */
  filter: (stat, file) =>
    stat.isDirectory() ||
    (stat.isFile() && stat.name.endsWith(".json") && !blackListFiles.has(file)),
});
files.sort();

files.forEach(({ localDir, localPath, entry: { name } }) => {
  const schemaDir = path.join(schemasPath, localDir);
  if (undefined !== fs.mkdirSync(schemaDir, { recursive: true })) {
    console.log("E! Cannot create directory:", schemaDir);
    process.exit(1);
  }
  const schemaFile = path.join(schemaDir, name);
  const srcFile = path.join(localePath, localPath);
  console.log(`gen "${schemaFile}" from "${srcFile}"`);
  generate(schemaFile, srcFile);
});
