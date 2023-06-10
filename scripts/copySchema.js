const fs = require('fs/promises');
const { version } = require(`${process.cwd()}/package.json`);

(async () => {
    try {
        await fs.copyFile(`${process.cwd()}/schema.json`, `${process.cwd()}/docs/schema/${version}.json`);
        console.log('Schema copied');
    } catch (err) {
        console.error(err);
    }
})();
