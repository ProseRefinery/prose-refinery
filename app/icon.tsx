import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 512,
    height: 512,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '16%', // Standard app icon curvature (squircle-ish)
                }}
            >
                <svg
                    width="320"
                    height="320"
                    viewBox="0 0 481.41 666.57"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="black"
                        d="M481.41 251.89l0 20.62c0,50.48 -30.62,94.31 -74.57,114.59 -16.67,7.71 -35.27,12.02 -54.85,12.02l-249.96 0 -1.18 162.31 -100.1 101.76 -0.5 -264.07 -0.25 0 0 -294.46 127.21 0 -0.15 87.77 -25.01 0 0 113.66 216.65 0c27.49,0 49.96,-21.99 49.96,-48.87l0 -7.96c0,-31.25 -26.15,-56.83 -58.09,-56.83l-78.07 0 -0.26 -38.59 -0.34 -49.19 99.02 0c2.45,0 4.87,0.06 7.29,0.17 30.02,1.42 57.84,11.55 80.8,27.88 37.74,26.8 62.41,70.31 62.41,119.18z"
                    />
                </svg>
            </div>
        ),
        { ...size }
    );
}
