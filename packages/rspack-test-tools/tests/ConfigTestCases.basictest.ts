import path from "path";
import { describeByWalk } from "../src/helper";
import { createConfigCase } from "../src/case/config";

const NAME = "ConfigTestCases";
const caseDir: string = path.resolve(
	__dirname,
	"../../rspack/tests/configCases"
);
const distDir: string = path.resolve(
	__dirname,
	`../../rspack/tests/js/${NAME}`
);

describeByWalk(NAME, caseDir, distDir, (name, src, dist) => {
	createConfigCase(name, src, dist);
});
