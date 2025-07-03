export const logger = {
  info: (msg: any, ...args: any[]) => {
    if (process.env.LOG_LEVEL?.includes('info')) {
      console.log('[INFO]', msg, ...args);
    }
  },
  error: (msg: any, ...args: any[]) => {
    console.error('[ERROR]', msg, ...args);
  }
};
