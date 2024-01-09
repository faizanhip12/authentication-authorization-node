import pinoHttp from 'pino-http';

export const logger = pinoHttp({
    customLogLevel: (res, err) => {
      // Customize log level based on your conditions
      if (err || res.statusCode >= 400) {
        return 'error';
      }
      return 'info';
    },
    customSuccessMessage: (res) => {
      // Customize the log message for successful requests
      return `Request completed successfully with status ${res.statusCode}`;
    },
    customErrorMessage: (error:any) => {
      // Customize the log message for errors
      return `Error: ${error.message}`;
    },
    serializers: {
      // Customize the serialization of log entries
      req: (req) => ({
        id: req.id,
        method: req.method,
        url: req.url,
        headers: req.headers,
      }),
      res: (res) => ({
        statusCode: res.statusCode,
        headers: res._headers,
      }),
      err: (err) => ({
        message: err.message,
        stack: err.stack,
      }),
    },
  })