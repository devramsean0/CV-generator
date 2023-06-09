import * as readline from 'readline/promises'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
export async function getMissingData(question: string) {
    const answer = await rl.question(`${question} `);
    return answer;
}