export function loadJSON(path: string) {
    try {
        const fullPath = `${process.cwd()}/${path}`
        const file = require(fullPath);
        return file;
    } catch (error) {
        console.log(`Could not load file at ${path}`);
        process.exit(1);
    }
}