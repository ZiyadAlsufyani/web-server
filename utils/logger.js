/**
 * Logs a message to the console with timestamp
 * @param {string} message - The message to log
 */
function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

module.exports = { log };