import { BaseLogoProps } from './brand-logo';

const Logo = ({ size, darkBg, color }: any) => {
  return (
    <>
      {!darkBg && !color && (
        <svg height={size} viewBox="0 0 103 91" fill="none">
          <path
            d="M0.843105 24.4701C0.125215 25.188 0.125215 26.352 0.843105 27.0699L17.7355 43.9622C18.4534 44.6801 18.4534 45.8441 17.7355 46.5619L0.844974 63.4524C0.127083 64.1703 0.127084 65.3343 0.844975 66.0522L11.2011 76.4082C11.919 77.1261 13.0829 77.1261 13.8008 76.4082L43.6488 46.5603C44.3666 45.8424 44.3666 44.6784 43.6488 43.9606L13.8006 14.1124C13.0827 13.3945 11.9188 13.3945 11.2009 14.1124L0.843105 24.4701Z"
            fill="#2563EB"
          />
          <path
            d="M90.921 0.958584C90.2031 0.240694 89.0392 0.240693 88.3213 0.958583L45.1596 44.1203C44.4417 44.8382 44.4417 46.0021 45.1596 46.72L88.3213 89.8818C89.0392 90.5996 90.2031 90.5996 90.921 89.8818L101.341 79.462C102.059 78.7441 102.059 77.5802 101.341 76.8623L70.9565 46.4781C70.2386 45.7602 70.2386 44.5963 70.9565 43.8784L101.099 13.7361C101.817 13.0182 101.817 11.8543 101.099 11.1364L90.921 0.958584Z"
            fill="#2563EB"
          />
        </svg>
      )}
      {darkBg && !color && (
        <svg height={size} viewBox="0 0 103 91" fill="none">
          <path
            d="M1.34311 24.4701C0.625215 25.188 0.625215 26.352 1.34311 27.0699L18.2355 43.9622C18.9534 44.6801 18.9534 45.8441 18.2355 46.5619L1.34497 63.4524C0.627083 64.1703 0.627084 65.3343 1.34497 66.0522L11.7011 76.4082C12.419 77.1261 13.5829 77.1261 14.3008 76.4082L44.1488 46.5603C44.8666 45.8424 44.8666 44.6784 44.1488 43.9606L14.3006 14.1124C13.5827 13.3945 12.4188 13.3945 11.7009 14.1124L1.34311 24.4701Z"
            fill="white"
          />
          <path
            d="M91.421 0.958584C90.7031 0.240694 89.5392 0.240693 88.8213 0.958583L45.6596 44.1203C44.9417 44.8382 44.9417 46.0021 45.6596 46.72L88.8213 89.8818C89.5392 90.5996 90.7031 90.5996 91.421 89.8818L101.841 79.462C102.559 78.7441 102.559 77.5802 101.841 76.8623L71.4565 46.4781C70.7386 45.7602 70.7386 44.5963 71.4565 43.8784L101.599 13.7361C102.317 13.0182 102.317 11.8543 101.599 11.1364L91.421 0.958584Z"
            fill="white"
          />
        </svg>
      )}
      {color && (
        <svg height={size} viewBox="0 0 103 91" fill="none">
          <path
            d="M1.34311 24.4701C0.625215 25.188 0.625215 26.352 1.34311 27.0699L18.2355 43.9622C18.9534 44.6801 18.9534 45.8441 18.2355 46.5619L1.34497 63.4524C0.627083 64.1703 0.627084 65.3343 1.34497 66.0522L11.7011 76.4082C12.419 77.1261 13.5829 77.1261 14.3008 76.4082L44.1488 46.5603C44.8666 45.8424 44.8666 44.6784 44.1488 43.9606L14.3006 14.1124C13.5827 13.3945 12.4188 13.3945 11.7009 14.1124L1.34311 24.4701Z"
            fill={color}
          />
          <path
            d="M91.421 0.958584C90.7031 0.240694 89.5392 0.240693 88.8213 0.958583L45.6596 44.1203C44.9417 44.8382 44.9417 46.0021 45.6596 46.72L88.8213 89.8818C89.5392 90.5996 90.7031 90.5996 91.421 89.8818L101.841 79.462C102.559 78.7441 102.559 77.5802 101.841 76.8623L71.4565 46.4781C70.7386 45.7602 70.7386 44.5963 71.4565 43.8784L101.599 13.7361C102.317 13.0182 102.317 11.8543 101.599 11.1364L91.421 0.958584Z"
            fill={color}
          />
        </svg>
      )}
    </>
  );
};

const DetailedLogo = ({ size, darkBg }: any) => {
  return (
    <>
      {!darkBg && (
        <svg height={size} viewBox="0 0 268 91" fill="none">
          <path
            d="M0.843105 24.4701C0.125215 25.188 0.125215 26.352 0.843105 27.0699L17.7355 43.9622C18.4534 44.6801 18.4534 45.8441 17.7355 46.5619L0.844974 63.4524C0.127083 64.1703 0.127084 65.3343 0.844975 66.0522L11.2011 76.4082C11.919 77.1261 13.0829 77.1261 13.8008 76.4082L43.6488 46.5603C44.3666 45.8424 44.3666 44.6784 43.6488 43.9606L13.8006 14.1124C13.0827 13.3945 11.9188 13.3945 11.2009 14.1124L0.843105 24.4701Z"
            fill="#2563EB"
          />
          <path
            d="M90.921 0.958584C90.2031 0.240694 89.0392 0.240693 88.3213 0.958583L45.1596 44.1203C44.4417 44.8382 44.4417 46.0021 45.1596 46.72L88.3213 89.8818C89.0392 90.5996 90.2031 90.5996 90.921 89.8818L101.341 79.462C102.059 78.7441 102.059 77.5802 101.341 76.8623L70.9565 46.4781C70.2386 45.7602 70.2386 44.5963 70.9565 43.8784L101.099 13.7361C101.817 13.0182 101.817 11.8543 101.099 11.1364L90.921 0.958584Z"
            fill="#2563EB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M147.013 83.4202H141.12L125.879 7.42017H144.1L150.787 49.6666L160.56 7.42017H162.389H172.482H174.107L183.971 49.7437L190.567 7.42017H208.924L193.615 83.4202H187.79H181.965H177.833L167.388 39.844L156.97 83.4202H152.77H147.013ZM239.585 24.858C244.429 24.858 252.857 25.633 264.87 27.1831L265.16 11.0531L260.365 10.1812C250.483 8.3405 242.685 7.42017 236.969 7.42017C228.735 7.42017 222.002 9.40614 216.77 13.3781C211.539 17.2532 208.923 23.0658 208.923 30.8159C208.923 38.4692 210.764 43.7974 214.445 46.8006C218.127 49.8038 223.697 51.9351 231.157 53.1945C238.713 54.4539 243.363 55.5195 245.107 56.3914C246.947 57.2633 247.868 58.6196 247.868 60.4603C247.868 62.3009 246.996 63.7056 245.252 64.6744C243.605 65.5463 240.408 65.9823 235.661 65.9823C231.011 65.9823 222.68 65.2072 210.667 63.6572L210.086 79.9325L214.736 80.8044C223.842 82.5482 231.592 83.4201 237.986 83.4201C257.459 83.4201 267.195 75.5731 267.195 59.879C267.195 52.7101 265.548 47.5272 262.254 44.3303C258.96 41.1333 253.39 38.8567 245.543 37.5004C237.793 36.0473 232.949 34.9816 231.011 34.3035C229.171 33.5285 228.25 32.2207 228.25 30.38C228.25 28.4425 228.928 27.0377 230.285 26.1658C231.738 25.294 234.838 24.858 239.585 24.858Z"
            fill="#2563EB"
          />
        </svg>
      )}
      {darkBg && (
        <svg height={size} viewBox="0 0 268 91" fill="none">
          <path
            d="M1.34311 24.4701C0.625215 25.188 0.625215 26.352 1.34311 27.0699L18.2355 43.9622C18.9534 44.6801 18.9534 45.8441 18.2355 46.5619L1.34497 63.4524C0.627083 64.1703 0.627084 65.3343 1.34497 66.0522L11.7011 76.4082C12.419 77.1261 13.5829 77.1261 14.3008 76.4082L44.1488 46.5603C44.8666 45.8424 44.8666 44.6784 44.1488 43.9606L14.3006 14.1124C13.5827 13.3945 12.4188 13.3945 11.7009 14.1124L1.34311 24.4701Z"
            fill="white"
          />
          <path
            d="M91.421 0.958584C90.7031 0.240694 89.5392 0.240693 88.8213 0.958583L45.6596 44.1203C44.9417 44.8382 44.9417 46.0021 45.6596 46.72L88.8213 89.8818C89.5392 90.5996 90.7031 90.5996 91.421 89.8818L101.841 79.462C102.559 78.7441 102.559 77.5802 101.841 76.8623L71.4565 46.4781C70.7386 45.7602 70.7386 44.5963 71.4565 43.8784L101.599 13.7361C102.317 13.0182 102.317 11.8543 101.599 11.1364L91.421 0.958584Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M147.513 83.4202H141.62L126.379 7.42017H144.6L151.287 49.6666L161.06 7.42017H162.889H172.982H174.607L184.471 49.7437L191.067 7.42017H209.424L194.115 83.4202H188.29H182.465H178.333L167.888 39.844L157.47 83.4202H153.27H147.513ZM240.085 24.858C244.929 24.858 253.357 25.633 265.37 27.1831L265.66 11.0531L260.865 10.1812C250.983 8.3405 243.185 7.42017 237.469 7.42017C229.235 7.42017 222.502 9.40614 217.27 13.3781C212.039 17.2532 209.423 23.0658 209.423 30.8159C209.423 38.4692 211.264 43.7974 214.945 46.8006C218.627 49.8038 224.197 51.9351 231.657 53.1945C239.213 54.4539 243.863 55.5195 245.607 56.3914C247.447 57.2633 248.368 58.6196 248.368 60.4603C248.368 62.3009 247.496 63.7056 245.752 64.6744C244.105 65.5463 240.908 65.9823 236.161 65.9823C231.511 65.9823 223.18 65.2072 211.167 63.6572L210.586 79.9325L215.236 80.8044C224.342 82.5482 232.092 83.4201 238.486 83.4201C257.959 83.4201 267.695 75.5731 267.695 59.879C267.695 52.7101 266.048 47.5272 262.754 44.3303C259.46 41.1333 253.89 38.8567 246.043 37.5004C238.293 36.0473 233.449 34.9816 231.511 34.3035C229.671 33.5285 228.75 32.2207 228.75 30.38C228.75 28.4425 229.428 27.0377 230.785 26.1658C232.238 25.294 235.338 24.858 240.085 24.858Z"
            fill="white"
          />
        </svg>
      )}
    </>
  );
};

interface WorkspacesLogoProps extends BaseLogoProps {
  detailed?: boolean;
  color?: string;
}

export const WorkspacesLogo = ({
  size = 24,
  darkBg = false,
  detailed = false,
  color,
}: WorkspacesLogoProps) => {
  return (
    <>
      {!detailed && <Logo size={size} darkBg={darkBg} color={color} />}
      {detailed && <DetailedLogo size={size} darkBg={darkBg} />}
    </>
  );
};