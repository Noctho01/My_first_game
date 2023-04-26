export function getRandomNumber(min: number, max: number) {
  const result = (Math.random() * (max - min) + min).toString();
  return parseInt(result);
}