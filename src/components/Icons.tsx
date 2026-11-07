import type { SVGProps } from "react";

export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 20.2s-7.6-4.5-7.6-10.1c0-2.8 2.1-4.9 4.6-4.9 1.4 0 2.5.7 3 1.7.5-1 1.6-1.7 3-1.7 2.5 0 4.6 2.1 4.6 4.9C19.6 15.7 12 20.2 12 20.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SparkleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 1.8c.5 5.7 3.5 8.7 9.2 9.2-5.7.5-8.7 3.5-9.2 9.2-.5-5.7-3.5-8.7-9.2-9.2 5.7-.5 8.7-3.5 9.2-9.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m12 2.2 2.8 6.2 6.7.7-5 4.5 1.4 6.6-5.9-3.4-5.9 3.4 1.4-6.6-5-4.5 6.7-.7L12 2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WindIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 8h12.5c2.2 0 3.6-1.5 3.6-3.4 0-1.7-1.2-3-2.9-3-1.5 0-2.7 1-2.9 2.4M3 13h19.6c2.6 0 4.4 1.8 4.4 4.2 0 2.3-1.8 4.1-4.1 4.1-2 0-3.6-1.3-4-3.1M3 18h9.2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SpeakerIcon({
  muted,
  ...props
}: SVGProps<SVGSVGElement> & { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.5 9.2h3.2L12.4 5v14l-4.7-4.2H4.5a1.4 1.4 0 0 1-1.4-1.4v-2.8a1.4 1.4 0 0 1 1.4-1.4Z"
        fill="currentColor"
      />
      {muted ? (
        <path
          d="m16.2 9.2 5 5m0-5-5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path
            d="M15.4 9.1a4.2 4.2 0 0 1 0 5.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M18.1 6.7a7.6 7.6 0 0 1 0 10.6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export function ReplayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.8 8.5A8 8 0 1 1 4 14.2M4.8 4.5v4.2h4.3"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
