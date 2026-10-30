// jspdf-fontkit bundles jsPDF's source directly, so jsPDF's own dev tooling
// (karma, jsdoc, rollup 2, codeclimate, ...) is never used. Skip installing it
// to keep the lockfile free of unused, vulnerable packages.
function readPackage(pkg) {
  if (pkg.name === "jspdf") {
    pkg.devDependencies = { fontkit: pkg.devDependencies.fontkit };
  }
  return pkg;
}

module.exports = { hooks: { readPackage } };
