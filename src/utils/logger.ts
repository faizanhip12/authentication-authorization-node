import pino from 'pino'

const levels = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
}

export  const logger = pino(
    {
 
      customLevels: levels, // our defined levels
      useOnlyCustomLevels: true,
      level: 'http',
      prettyPrint: {
        colorize: true, // colorizes the log
        levelFirst: true,
        translateTime: 'yyyy-dd-mm, h:MM:ss TT',
      },
      
    },
  )