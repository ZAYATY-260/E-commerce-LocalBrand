// visitorLogger.js
const getIpAddress = require('../Functions/ipUtils');
const fs = require('fs').promises;
const path = require('path');

const ensureDirectoryExists = async (filePath) => {
    const dirname = path.dirname(filePath);
    try {
        await fs.mkdir(dirname, { recursive: true });
    } catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }
};

const readLogsFromFile = async (logFile) => {
    try {
        const data = await fs.readFile(logFile, 'utf8');
        return JSON.parse(data) || [];
    } catch (err) {
        if (err.code === 'ENOENT') {
            return [];
        }
        throw err;
    }
};

const writeLogsToFile = async (logFile, logs) => {
    await fs.writeFile(logFile, JSON.stringify(logs, null, 2), 'utf8');
};

const logVisitor = async (req) => {
    const ipAddress = getIpAddress(req);
    const logFile = path.join(__dirname, '../logs/visitorLogs.json');

    try {
        await ensureDirectoryExists(logFile);

        let logs = await readLogsFromFile(logFile);

        let visitor = logs.find(log => log.ipAddress === ipAddress);

        if (!visitor) {
            visitor = { ipAddress, count: 1 };
            logs.push(visitor);
        } else {
            visitor.count += 1;
        }

        await writeLogsToFile(logFile, logs);
    } catch (err) {
        console.error("Error updating visitor count:", err);
        throw err; // Throw error to be caught by the caller
    }
};

module.exports = { logVisitor };
