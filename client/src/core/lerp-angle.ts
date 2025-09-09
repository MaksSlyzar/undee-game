export default function lerpAngle(start: number, end: number, t: number): number {
  let difference = end - start;

  while (difference < -Math.PI) difference += 2 * Math.PI;
  while (difference > Math.PI) difference -= 2 * Math.PI;

  return start + difference * t;
}

