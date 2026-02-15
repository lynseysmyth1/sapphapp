import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packagePath = join(__dirname, '..', 'package.json');

// Read package.json
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));

// Store old version for logging
const oldVersion = packageJson.version;

// Parse version (e.g., "1.0.0")
const versionParts = packageJson.version.split('.');
const major = parseInt(versionParts[0]);
const minor = parseInt(versionParts[1]);
const patch = parseInt(versionParts[2]) || 0;

// Increment patch version
const newPatch = patch + 1;
const newVersion = `${major}.${minor}.${newPatch}`;

// Update version
packageJson.version = newVersion;

// Write back to package.json
writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');

console.log(`Version incremented: ${oldVersion} -> ${newVersion}`);

// Also update the version in SplashScreen.jsx
const splashScreenPath = join(__dirname, '..', 'src', 'components', 'SplashScreen.jsx');
let splashScreenContent = readFileSync(splashScreenPath, 'utf8');

// Update APP_VERSION constant
splashScreenContent = splashScreenContent.replace(
  /const APP_VERSION = ['"](.*?)['"];/,
  `const APP_VERSION = '${newVersion}';`
);

writeFileSync(splashScreenPath, splashScreenContent);
console.log(`Updated SplashScreen.jsx with version ${newVersion}`);
