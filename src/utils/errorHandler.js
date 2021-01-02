/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */

/* catch error handler

	With asyc/await, you need some way to catch errors
	instead of usig try/catch in each controller we
	wrap the function in catchErrors()

	catch and errors will pass through our express middleware with next()

*/

export const catchErrors = fn =>
  function(req, res, next) {
    return fn(req, res, next).catch(next);
  };

/*
	NOT FOUND error handler
	showed when a route isn`t found, returns a 404 and pass it to next error handler
*/

export const notFound = (req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
};

/*
	DEVELOPMENT ERROR error handler
	showed on syntax or other un-hanfled errors, with additional details
*/

export const developmentErrors = (err, req, res, next) => {
  console.error(err);

  // eslint-disable-next-line no-param-reassign
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stack: err.stack,
  };
  res.status(err.status || 500);
  res.json({ error: errorDetails });
};

/*
  PRODUCTION ERROR Hanlder
  No stacktraces are leaked to user
*/
export const productionErrors = (err, req, res, next) => {
  console.log(err);

  const errorDetails = {
    message: err.message,
    status: err.status,
  };
  res.status(err.status || 500);
  res.json({ error: errorDetails });
};
