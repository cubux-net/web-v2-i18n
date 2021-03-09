const fs = require("fs");
const path = require("path");
const { validate } = require("jsonschema");
const iso639 = require("iso-639-1");
const recursive = require("../src/recursive-readdir").default;

let pkgDir = path.dirname(__dirname);
const localesDir = path.join(pkgDir, "locales");
const schemasDir = path.join(pkgDir, "schemas");

/**
 * @typedef SchemaRaw
 * @type {Object}
 */
/**
 * @type {Map<string,SchemaRaw|null>}
 */
const schemas = new Map();
/**
 *
 * @param {string} localPath
 * @return {SchemaRaw|null}
 */
const getSchema = (localPath) => {
  if (schemas.has(localPath)) {
    return schemas.get(localPath);
  }
  const schemaFile = path.join(schemasDir, localPath);
  let schemaRaw = null;
  if (fs.existsSync(schemaFile)) {
    schemaRaw = JSON.parse(fs.readFileSync(schemaFile, { encoding: "utf-8" }));
    // delete schemaRaw.$schema;
  }
  schemas.set(localPath, schemaRaw);
  return schemaRaw;
};

describe("all languages are valid", () => {
  const validateLanguage = (name) => {
    const fullName = path.join(localesDir, name);
    if (!fs.statSync(fullName).isDirectory()) {
      return;
    }

    describe(name, () => {
      it("language directory name", () => {
        // there are no support for code extended by language code like `en-US`
        expect(name).toHaveLength(2);
        expect(iso639.validate(name)).toBe(true);
      });

      describe("files match JSON schemas", () => {
        recursive(fullName).forEach(({ localPath }) => {
          const schemaRaw = getSchema(localPath);
          if (schemaRaw) {
            it(localPath, (done) => {
              // console.log(`I: validating "${path1}" across "${localPath}"`);
              const fillFilePath = path.join(fullName, localPath);
              const jsonData = JSON.parse(
                fs.readFileSync(fillFilePath, { encoding: "utf-8" }),
              );

              const result = validate(jsonData, schemaRaw);
              if (result.valid) {
                done(0);
              } else {
                const [e] = result.errors;
                const rel = path.relative(pkgDir, fillFilePath);
                done.fail(`${rel}: ${e.path.join(".")}: ${e.message}`);
              }
            });
          }
        });
      });

      // TODO: check for unnecessary files
    });
  };

  fs.readdirSync(localesDir).sort().forEach(validateLanguage);
});
