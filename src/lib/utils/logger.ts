type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context: string;
  metadata?: Record<string, any>;
}

class Logger {
  private context: string;
  private isDevelopment: boolean;

  constructor(context: string) {
    this.context = context;
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  private formatLog(level: LogLevel, message: string, metadata?: Record<string, any>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: this.context,
      ...(metadata && { metadata })
    };
  }

  private log(level: LogLevel, message: string, metadata?: Record<string, any>) {
    const logEntry = this.formatLog(level, message, metadata);
    
    if (this.isDevelopment) {
      // In development, use console with colors
      const colors = {
        info: '\x1b[36m', // Cyan
        warn: '\x1b[33m', // Yellow
        error: '\x1b[31m', // Red
        debug: '\x1b[35m', // Magenta
        reset: '\x1b[0m'  // Reset
      };
      
      console.log(
        `${colors[level]}[${logEntry.timestamp}] [${level.toUpperCase()}] [${this.context}]: ${message}${
          metadata ? ` ${JSON.stringify(metadata)}` : ''
        }${colors.reset}`
      );
    } else {
      // In production, use structured logging
      console.log(JSON.stringify(logEntry));
    }
  }

  info(message: string, metadata?: Record<string, any>) {
    this.log('info', message, metadata);
  }

  warn(message: string, metadata?: Record<string, any>) {
    this.log('warn', message, metadata);
  }

  error(message: string, metadata?: Record<string, any>) {
    this.log('error', message, metadata);
  }

  debug(message: string, metadata?: Record<string, any>) {
    if (this.isDevelopment) {
      this.log('debug', message, metadata);
    }
  }
}

export { Logger }; 