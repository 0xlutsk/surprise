type CandleProps = {
  number: "2" | "1";
  lit: boolean;
  extinguished: boolean;
  flickering?: boolean;
};

export function Candle({
  number,
  lit,
  extinguished,
  flickering = false,
}: CandleProps) {
  return (
    <div
      className={`candle candle--${number} ${lit ? "is-lit" : ""} ${
        extinguished ? "is-out" : ""
      } ${flickering ? "is-flickering" : ""}`}
      aria-label={`Lumânarea ${number}${extinguished ? ", stinsă" : lit ? ", aprinsă" : ""}`}
    >
      <div className="candle__flame-zone" aria-hidden="true">
        <span className="candle__glow" />
        <span className="candle__flame">
          <span className="candle__flame-inner" />
        </span>
        <span className="candle__smoke">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
      <span className="candle__wick" aria-hidden="true" />
      <div className="candle__body">
        <span className="candle__shine" aria-hidden="true" />
        <span className="candle__number">{number}</span>
        <span className="candle__base" aria-hidden="true" />
      </div>
    </div>
  );
}
