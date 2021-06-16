function log(...fragments) { console.log(fragments.join(' ')); }

function info(...fragments) { log('[info]', ...fragments);}
function warn(...fragments) { log('[warn]', ...fragments);}
function error(...fragments) { log('[error]', ...fragments);}

module.exports = {
  info,
  warn,
  error,
};
