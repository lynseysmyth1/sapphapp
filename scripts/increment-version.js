import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
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

// Get commit message for LAST_CHANGE
// Try to get from COMMIT_EDITMSG file (if in prepare-commit-msg hook), otherwise use last commit
let lastChange = 'Initial version';
try {
  // Try to read from commit message file (if available in prepare-commit-msg hook)
  const commitMsgPath = join(__dirname, '..', '.git', 'COMMIT_EDITMSG');
  try {
    const commitMsg = readFileSync(commitMsgPath, 'utf8').trim();
    // Get first line (subject) of commit message, skip comments
    const lines = commitMsg.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
    if (lines.length > 0 && lines[0].length > 0) {
      lastChange = lines[0];
    }
  } catch {
    // If commit message file doesn't exist or can't be read, use last commit
    const lastCommit = execSync('git log -1 --pretty=format:"%s"', { encoding: 'utf8', cwd: join(__dirname, '..') });
    lastChange = lastCommit.trim() || 'Initial version';
  }
  
  // Truncate if too long
  if (lastChange.length > 40) {
    lastChange = lastChange.substring(0, 37) + '...';
  }
} catch (error) {
  console.warn('Could not get commit message:', error.message);
}

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

// Update LAST_CHANGE constant
splashScreenContent = splashScreenContent.replace(
  /const LAST_CHANGE = ['"](.*?)['"];/,
  `const LAST_CHANGE = '${lastChange}';`
);

writeFileSync(splashScreenPath, splashScreenContent);
console.log(`Updated SplashScreen.jsx with version ${newVersion} and last change: ${lastChange}`);
