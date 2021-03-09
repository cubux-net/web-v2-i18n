const fs = require("fs");
const path = require("path");

exports.__esModule = true;
exports.default = readdir;

/**
 * @callback FilterCallback
 * @param {Dirent} entry
 * @param {string} localPath
 * @return {boolean}
 */
/**
 *
 * @param {string} dir
 * @param {FilterCallback} [filter]
 * @param {string} [prefix]
 * @return {Array<{entry:Dirent, localPath:string, localDir:string}>}
 */
function readdir(dir, { filter, prefix = "" } = {}) {
  let result = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(
    /** @param {Dirent} f */ (f) => {
      const localPath = path.join(prefix, f.name);
      if (filter && !filter(f, localPath)) {
        return;
      }

      if (f.isDirectory()) {
        result = result.concat(
          readdir(path.join(dir, f.name), {
            filter,
            prefix: localPath,
          }),
        );
      } else {
        result.push({ entry: f, localPath, localDir: prefix });
      }
    },
  );
  return result;
}
