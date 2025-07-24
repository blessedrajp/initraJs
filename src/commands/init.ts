import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import { execa } from 'execa';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const customRequire = createRequire(import.meta.url);
const download = customRequire('download-git-repo');

const REPOS: Record<string, string> = {
  react: 'github:blessedrajp/react-template',
  node: 'github:blessedrajp/nodeJs-template',
  next: 'github:blessedrajp/next-template',
};

type InitOptions = {
  template?: string;
  name?: string;
  yarn?: boolean;
  git?: boolean;
};

export const initProject = async (options: InitOptions) => {
  let { template, name: projectName, yarn, git } = options;

  // Prompt for template
  if (!template || !['react', 'node', 'next'].includes(template)) {
    const res = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'Choose a template:',
        choices: ['react', 'node', 'next'],
      },
    ]);
    template = res.template;
  }

  // Prompt for project name
  if (!projectName) {
    const res = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter your project name:',
        validate: (input) => (input ? true : 'Project name is required.'),
      },
    ]);
    projectName = res.projectName;
  }

  if (!projectName) {
    throw new Error('Project name is undefined. This should never happen.');
  }

  const repoUrl = REPOS[template as keyof typeof REPOS];
  const projectDir = path.join(process.cwd(), projectName);

  console.log(chalk.blue(`\n🚀 Downloading ${template} template into "${projectName}"...\n`));

  download(repoUrl, projectDir, async (err: Error | null) => {
    if (err) {
      console.error(chalk.red('❌ Download failed:'), err.message);
      return;
    }

    console.log(chalk.green('✅ Template downloaded.'));

    // Replace __PROJECT_NAME__ in README.md
    const readmePath = path.join(projectDir, 'README.md');
    if (fs.existsSync(readmePath)) {
      let readme = fs.readFileSync(readmePath, 'utf-8');
      readme = readme.replace(/__PROJECT_NAME__/g, projectName);
      fs.writeFileSync(readmePath, readme);
    }

    // Install dependencies
    console.log(chalk.yellow(`\n📦 Installing dependencies using ${yarn ? 'yarn' : 'npm'}...\n`));
    await execa(yarn ? 'yarn' : 'npm', ['install'], {
      cwd: projectDir,
      stdio: 'inherit',
    });

    // Init git
    if (git) {
      console.log(chalk.blue('\n🔧 Initializing git...\n'));
      await execa('git', ['init'], { cwd: projectDir });
      await execa('git', ['add', '.'], { cwd: projectDir });
      await execa('git', ['commit', '-m', 'Initial commit from Genzo CLI'], {
        cwd: projectDir,
      });
      console.log(chalk.green('✅ Git repo initialized.\n'));
    }

    // Final message
    console.log(chalk.green(`\n🎉 Setup complete. Run:\n`));
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan(`  ${yarn ? 'yarn dev' : 'npm run dev'}\n`));
  });
};
