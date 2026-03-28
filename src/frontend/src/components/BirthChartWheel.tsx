export default function BirthChartWheel() {
  const houses = Array.from({ length: 12 }, (_, i) => i + 1);
  const zodiacSymbols = [
    "♈",
    "♉",
    "♊",
    "♋",
    "♌",
    "♍",
    "♎",
    "♏",
    "♐",
    "♑",
    "♒",
    "♓",
  ];
  const cx = 200;
  const cy = 200;
  const outerR = 180;
  const innerR = 120;
  const labelR = 150;

  return (
    <div className="flex justify-center">
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className="max-w-full"
      >
        <title>Birth Chart Wheel</title>
        {/* Outer circle */}
        <circle
          cx={cx}
          cy={cy}
          r={outerR}
          fill="oklch(0.97 0.015 85)"
          stroke="oklch(0.78 0.14 75)"
          strokeWidth="2"
        />
        {/* Inner circle */}
        <circle
          cx={cx}
          cy={cy}
          r={innerR}
          fill="oklch(0.94 0.025 80)"
          stroke="oklch(0.78 0.14 75)"
          strokeWidth="1.5"
        />
        {/* Center */}
        <circle
          cx={cx}
          cy={cy}
          r={30}
          fill="oklch(0.22 0.08 22)"
          stroke="oklch(0.78 0.14 75)"
          strokeWidth="1"
        />
        <text
          x={cx}
          y={cy + 6}
          textAnchor="middle"
          fontSize="18"
          fill="oklch(0.78 0.14 75)"
          fontFamily="Cinzel"
        >
          ॐ
        </text>

        {/* House divisions */}
        {houses.map((house) => {
          const angle = ((house - 1) * 30 - 90) * (Math.PI / 180);
          const x1 = cx + innerR * Math.cos(angle);
          const y1 = cy + innerR * Math.sin(angle);
          const x2 = cx + outerR * Math.cos(angle);
          const y2 = cy + outerR * Math.sin(angle);
          const midAngle = ((house - 1) * 30 + 15 - 90) * (Math.PI / 180);
          const lx = cx + labelR * Math.cos(midAngle);
          const ly = cy + labelR * Math.sin(midAngle);
          const zx = cx + (innerR - 20) * Math.cos(midAngle);
          const zy = cy + (innerR - 20) * Math.sin(midAngle);

          return (
            <g key={house}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="oklch(0.78 0.14 75)"
                strokeWidth="1"
                opacity="0.6"
              />
              <text
                x={lx}
                y={ly + 4}
                textAnchor="middle"
                fontSize="10"
                fill="oklch(0.45 0.08 35)"
                fontFamily="Cinzel"
                fontWeight="600"
              >
                {house}
              </text>
              <text
                x={zx}
                y={zy + 4}
                textAnchor="middle"
                fontSize="12"
                fill="oklch(0.68 0.20 48)"
              >
                {zodiacSymbols[house - 1]}
              </text>
            </g>
          );
        })}

        {/* Sample planet markers */}
        {[
          { symbol: "☉", house: 1, color: "oklch(0.78 0.14 75)" },
          { symbol: "☽", house: 4, color: "oklch(0.75 0.08 220)" },
          { symbol: "♂", house: 8, color: "oklch(0.60 0.20 25)" },
          { symbol: "♃", house: 9, color: "oklch(0.65 0.16 140)" },
          { symbol: "♀", house: 2, color: "oklch(0.65 0.18 350)" },
        ].map(({ symbol, house, color }) => {
          const angle = ((house - 1) * 30 + 15 - 90) * (Math.PI / 180);
          const r = (outerR + innerR) / 2;
          const px = cx + r * Math.cos(angle);
          const py = cy + r * Math.sin(angle);
          return (
            <text
              key={symbol}
              x={px}
              y={py + 5}
              textAnchor="middle"
              fontSize="14"
              fill={color}
              fontWeight="bold"
            >
              {symbol}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
