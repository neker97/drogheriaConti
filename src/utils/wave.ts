/* eslint-disable no-plusplus */
class Wave {
  private waveLength: number[];

  private color: string;

  constructor(waveLength: number[], color: string) {
    this.waveLength = waveLength;
    this.color = color;
  }

  public draw = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    frequency: number
  ): void => {
    context.save();

    // Quante "strisce/pennellate"
    const brushLayers = 1;
    for (let layer = 0; layer < brushLayers; layer++) {
      const alpha = 0.09 + 0.025 * Math.sin(layer); // trasparenza alternata
      context.beginPath();
      context.moveTo(0, height);

      // "Pennellata" offsettata
      for (let i = 0; i < width; i++) {
        const wave1 = Math.sin(
          i * (this.waveLength[0] ?? 0) - frequency + layer * 0.12
        );
        const wave2 = Math.sin(
          i * (this.waveLength[1] ?? 0) - frequency + layer * 0.16
        );
        const wave3 = Math.sin(
          i * (this.waveLength[2] ?? 0) - frequency + layer * 0.21
        );

        // Più "rumoroso" sulle y per l'effetto pennello
        const noise =
          Math.sin(i * 0.08 + layer * 2) * 2 * (1 - layer / brushLayers);

        context.lineTo(
          i * 2.5,
          height - 400 + wave1 * wave2 * wave3 * 190 + layer * 7 + noise
        );
      }

      context.lineTo(width, height);
      // Riempimento semitrasparente per effetto "brush"
      context.fillStyle = this.color.replace(
        /rgba?\(([^)]+)\)/,
        (match, contents) => {
          // Se è già rgba, sostituisci l'alpha
          const colorParts = contents.split(',');
          if (colorParts.length === 4) {
            colorParts[3] = ` ${alpha}`;
            return `rgba(${colorParts.join(',')})`;
          }
          if (colorParts.length === 3) {
            return `rgba(${colorParts.join(',')}, ${alpha})`;
          }
          return match;
        }
      );
      context.fill();
      context.closePath();
    }

    context.restore();
  };
}

export default Wave;
