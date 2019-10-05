/**
 * Gets whether the current environment is considered a development environment (true is returned), or production environment (false is returned).
 */
export const isDevelopment: boolean = process.env.NODE_ENV == 'development';