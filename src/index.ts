import figlet from 'figlet';
import { blue, bold, green } from 'colorette';
import { Command } from 'commander';
import { getMissingData } from './lib/getMissingData';
import { loadJSON } from './lib/fileLoader';
import { generateSummary } from './lib/generateSummary';
import getOpenAIKey from './lib/openai';
import { writeFile } from './lib/writeFile';

// CLI setup
const cli = new Command();
cli
    .version('1.0.0')
    .description('An AI powered CV generator')
    .option('--openAI <value>', 'OpenAI API key', 'none')
    .option('-d, --data <value>', 'Path to data file', 'CV.json')
    .option('-g, --gptModel <value', 'Change the model of GPT used. defaults to gpt-3.5-turbo', 'gpt-3.5-turbo')
    .option('-o, --output <value>', 'Output file name', 'output.md')
    .parse(process.argv);
const options = cli.opts();

// Constants
var openAIKey = options.openAI;
var dataPath = options.data;
const outputMDRows = [];
// Main
(async () => {
    // Initial parsing and validation
    console.log(bold(blue(figlet.textSync('CV-Generator'))));
    if (options.openAI === 'none') {
        openAIKey = await getMissingData("What is your OpenAI API key?");
    }
    console.log(green('OpenAI API key:'), openAIKey);
    console.log(green('Data path:'), dataPath);
    // Get OPENAI class
    const openAI = getOpenAIKey(openAIKey);
    // Load Data
    const data = await loadJSON(dataPath);
    // Initial markdown formatting
    outputMDRows.push(`# ${data.name}`);
    outputMDRows.push(`**${data.title}**`);
    outputMDRows.push(`<br />`);
    console.log(green('Done Initial Header'))
    // Generate a summary
    const summary = await generateSummary(data, openAI, options);
    outputMDRows.push(summary);
    console.log(green('Done Summary'))
    // Contact info
    outputMDRows.push(`## Contact Information`);
    if (data.contact.email) {
        outputMDRows.push(`Email: ${data.contact.email}, `);
    }
    if (data.contact.phone) {
        outputMDRows.push(`Phone: ${data.contact.phone}, `);
    }
    if (data.contact.website) {
        outputMDRows.push(`Website: (${data.contact.website})[${data.contact.website}], `);
    }
    console.log(green('Done Contact Info'))
    // Work Experience
    outputMDRows.push(`## Work Experience`);
    data.workExperience.forEach((job: any) => {
        outputMDRows.push(`### ${job.title} at ${job.company}`);
        outputMDRows.push(`**${job.startDate} - ${job.endDate}**`);
        outputMDRows.push(job.description);
    });
    console.log(green('Done Work Experience'))
    // Education
    outputMDRows.push(`## Education`);
    data.education.forEach((school: any) => {
        outputMDRows.push(`### ${school.degree} at ${school.school}`);
        if (school.graduated) {
            outputMDRows.push(`**Graduated: ${school.graduatingYear}**`);
        } else {
            outputMDRows.push(`**Expected Graduation: ${school.graduatingYear}**`);
        }
        outputMDRows.push(school.description);
    });
    console.log(green('Done Education'))
    // Skills
    outputMDRows.push(`## Skills`);
    data.skills.forEach((skill: any) => {
        outputMDRows.push(`### ${skill.name}`);
        outputMDRows.push(`**${skill.level}**`);
    });
    console.log(green('Done Skills'))
    await writeFile(outputMDRows, options);
    console.log(bold(green('Done! You are advised to review the output and style it as you want before you send it.')))
    process.exit(0);
})();