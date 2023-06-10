import { green, yellow } from 'colorette'
import { CommandOptions, OptionValues } from 'commander'
import fs from 'fs/promises'
export async function writeFile(outputMDRows: any, options: OptionValues) {
    if (await fs.readFile(`${process.cwd()}/${options.output}`)) {
        console.log(yellow(`Removing ${options.output}`))
        await fs.rm(`${process.cwd()}/${options.output}`)
    }
    await fs.writeFile(`${process.cwd()}/${options.output}`, outputMDRows.join('\n'))
    console.log(green(`Wrote output to ${options.output}`))
}