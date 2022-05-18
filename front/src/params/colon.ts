export function match(param: string): boolean {
  return /^:\w+$/.test(param);
}
