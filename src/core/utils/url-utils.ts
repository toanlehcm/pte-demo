/**
 * Base url for assets
 * @returns Base url for assets
 */
export const staticUrl = (path: string): string => {
  const base = '/'; //import.meta.env.BASE_URL || ;
  if (!path.startsWith('/')) path = '/' + path;
  return `${base}${path}`.replace(/\/{2,}/g, '/');
};