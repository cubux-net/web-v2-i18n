const fs = require("fs");

exports.__esModule = true;
exports.default = (target, source) => {
  const srcData = JSON.parse(fs.readFileSync(source, { encoding: "utf-8" }));
  const schema = {
    // $schema: "http://json-schema.org/draft-07/schema#",
    $schema: "https://json-schema.org/draft/2019-09/schema",
    $defs: {
      string: {
        type: "string",
        minLength: 1,
      },
    },
    ...generate(srcData),
  };
  const output = JSON.stringify(schema, null, 2) + "\n";
  if (
    !fs.existsSync(target) ||
    output !==
      /** @type {string} */ fs.readFileSync(target, { encoding: "utf-8" })
  ) {
    fs.writeFileSync(target, output, { encoding: "utf-8" });
  }
};

const refString = { $ref: "#/$defs/string" };

function generate(input) {
  if (typeof input === "object") {
    const required = Object.keys(input).sort();
    const properties = {};
    required.forEach((key) => {
      properties[key] = generate(input[key]);
    });
    return {
      type: "object",
      properties,
      required,
    };
  }
  if (typeof input === "string") {
    // TODO: params syntax check
    return refString;
  }
  throw new TypeError(
    "Unsupported data type found in source JSON: " + typeof input,
  );
}
