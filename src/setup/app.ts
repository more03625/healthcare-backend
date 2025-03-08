import * as fs from 'fs';
import * as readline from 'readline';

// Function to prompt the user for input
const promptUser = (query: string): Promise<string> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
};

// Function to create a directory if it doesn't exist
const createDirectory = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
        console.log(`Directory '${path}' created successfully.`);
    } else {
        console.log(`Directory '${path}' already exists. Skipping creation.`);
    }
};

// Function to create a file with specified content
const createFile = (path: string, content: string) => {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, content);
        console.log(`File '${path}' created successfully.`);
    } else {
        console.log(`File '${path}' already exists. Skipping creation.`);
    }
};

// Main setup function
const setUp = async () => {
    try {
        // Prompt user for the main folder name
        const mainFolderName = await promptUser('Enter the main folder name: ');
        const mainFolderPath = `src/${mainFolderName}`;

        // Create the main folder
        createDirectory(mainFolderPath);

        // List of subfolders to create
        const subfolders = ['constants', 'controllers', 'db', 'interfaces', 'models', 'routes', 'schema', 'utils'];

        // Iterate over each subfolder
        subfolders.forEach((subfolder) => {
            const subfolderPath = `${mainFolderPath}/${subfolder}`;

            // Create the subfolder
            createDirectory(subfolderPath);

            // Create an index.ts file within the subfolder
            const filePath = `${subfolderPath}/index.ts`;
            const fileContent = `// Your ${subfolder} logic goes here\nconsole.log('${subfolder} Initialized');\n`;
            createFile(filePath, fileContent);
        });

        // Create .gitignore file in the main folder
        const gitignorePath = `${mainFolderPath}/.gitignore`;
        const gitignoreContent = '/dist\n/node_modules\npackage-lock.json\n';
        createFile(gitignorePath, gitignoreContent);

        // Create tsconfig.json file in the main folder
        const tsConfigPath = `${mainFolderPath}/tsconfig.json`;
        const tsConfigContent = `{
 "compilerOptions": {
     "target": "es2016",
     "module": "commonjs",
     "outDir": "./dist",
     "rootDir": ".",
     "strict": true
 }
}`;
        createFile(tsConfigPath, tsConfigContent);

    } catch (error) {
        console.error('An error occurred:', error);
    }
};

// Execute the setup function
setUp();
