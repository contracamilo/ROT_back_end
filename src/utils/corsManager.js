const allowlist = ['http://localhost:3000/', 'http://example2.com']

export const corsOptionsDelegate = function (req, callback) {
  const corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } 
  } else {
    corsOptions = { origin: false } 
  }
  callback(null, corsOptions) 
}