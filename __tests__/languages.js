const fs = require("fs");
const path = require("path");
const iso639 = require("iso-639-1");

const localesDir = path.join(path.dirname(__dirname), "locales");

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

      // TODO: more tests with generated JSON schemas
      // TODO: check for unnecessary files
    });
  };

  fs.readdirSync(localesDir).sort().forEach(validateLanguage);
});
