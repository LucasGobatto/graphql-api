import * as path from "path";
import * as glob from "glob";

export async function configTestPaths() {
  const filesTestPath = glob.sync("src/**/*test.ts");

  const basePath = path.join(__dirname, "..", "..");
  filesTestPath.forEach((file) =>
    require(path.join(basePath, file.replace(".ts", "")))
  );
}
