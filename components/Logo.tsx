interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Shield outline */}
      <path
        d="M16 2.5L5 6.5V15C5 22.5 10.5 27.5 16 29.5C21.5 27.5 27 22.5 27 15V6.5L16 2.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Two figures standing together */}
      <circle cx="12.5" cy="13.5" r="2.25" fill="currentColor" />
      <circle cx="19.5" cy="13.5" r="2.25" fill="currentColor" />
      <path
        d="M9 22C9 18.9624 10.7909 17 13 17C13.7231 17 14.4044 17.2127 15 17.6M23 22C23 18.9624 21.2091 17 19 17C18.2769 17 17.5956 17.2127 17 17.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
