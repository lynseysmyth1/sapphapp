import { writeFileSync, chmodSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const hookPath = join(__dirname, '..', '.git', 'hooks', 'prepare-commit-msg');

const hookContent = `#!/bin/sh
# Auto-increment version before commit
# This runs in prepare-commit-msg hook to get the commit message
# $1 is the commit message file path
npm run version:increment
git add package.json src/components/SplashScreen.jsx
`;

writeFileSync(hookPath, hookContent);
chmodSync(hookPath, 0o755);
console.log('Git pre-commit hook installed successfully!');
console.log('Version will now auto-increment on each commit.');
