import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import { execa } from 'execa';
import degit from 'degit';

const REPOS: Record<string, string> = {
  react: 'blessedrajp/react-template',
  node: 'blessedrajp/nodeJs-template',
  next: 'blessedrajp/next-template',
};

type InitOptions = {
  template?: string;
  name?: string;
  yarn?: boolean;
  git?: boolean;
};

export const initProject = async (options: InitOptions) => {
  let { template, name: projectName, yarn, git } = options;

  if (!template || !['react', 'node', 'next'].includes(template)) {
    const res = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'Choose a template:',
        choices: ['react', 'node', 'next'],
      }
    ]);
    template = res.template;
  }

  if (!projectName) {
    const res = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter your project name:',
        validate: input => input ? true : 'Project name is required.'
      }
    ]);
    projectName = res.projectName;
  }

  if (!projectName) throw new Error('Project name is undefined.');

  const repo = REPOS[template as keyof typeof REPOS];
  const emitter = degit(repo);
  const projectDir = path.join(process.cwd(), projectName);

  console.log(chalk.blue(`\n🚀 Downloading ${template} template into "${projectName}"...\n`));
  try {
    await emitter.clone(projectDir);
    console.log(chalk.green('✅ Template downloaded.'));
  } catch (err: any) {
    console.error(chalk.red('❌ Download failed:'), err.message);
    return;
  }

  const readmePath = path.join(projectDir, 'README.md');
  if (fs.existsSync(readmePath)) {
    let readme = fs.readFileSync(readmePath, 'utf-8');
    readme = readme.replace(/__PROJECT_NAME__/g, projectName);
    fs.writeFileSync(readmePath, readme);
  }

  console.log(chalk.yellow(`\n📦 Installing dependencies using ${yarn ? 'yarn' : 'npm'}...\n`));
  await execa(yarn ? 'yarn' : 'npm', ['install'], {
    cwd: projectDir,
    stdio: 'inherit',
  });

  if (git) {
    console.log(chalk.blue('\n🔧 Initializing git...\n'));
    await execa('git', ['init'], { cwd: projectDir });
    await execa('git', ['add', '.'], { cwd: projectDir });
    await execa('git', ['commit', '-m', 'Initial commit from initrajs CLI'], {
      cwd: projectDir
    });
    console.log(chalk.green('✅ Git repo initialized.\n'));
  }

  console.log(chalk.green(`\n🎉 Setup complete. Run:`));
  console.log(chalk.cyan(`  cd ${projectName}`));
  console.log(chalk.cyan(`  ${yarn ? 'yarn dev' : 'npm run dev'}\n`));
};
