import figlet from 'figlet';
import { blue, green } from 'colorette';
import { Command } from 'commander';
import { getMissingData } from './lib/getMissingData';
import { loadJSON } from './lib/fileLoader';


// CLI setup
const cli = new Command();
cli
    .version('1.0.0')
    .description('An AI powered CV generator')
    .option('--openAI <value>', 'OpenAI API key', 'none')
    .option('-d, --data <value>', 'Path to data file', 'CV.json')
    .parse(process.argv);
const options = cli.opts();

// Constants
var openAIKey = options.openAI;
var dataPath = options.data;

// Main
(async () => {
    // Initial parsing and validation
    console.log(blue(figlet.textSync('CV-Generator')));
    if (options.openAI === 'none') {
        openAIKey = await getMissingData("What is your OpenAI API key?");
    }
    console.log(green('OpenAI API key:'), openAIKey);
    console.log(green('Data path:'), dataPath);
    // Load Data
    const data = await loadJSON(dataPath);
    process.exit(0);
})();