import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'white',
                    borderRadius: 0, // Square as requested/implied "white background" usually means filling the tile
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 481.41 666.57"
                    style={{
                        width: '24px',
                        height: '24px',
                    }}
                >
                    {/* Paths from favicon.svg converted with inline styles */}

                    {/* fil0: #017F5F */}
                    <path fill="#017F5F" d="M409.06 578.58l-107.29 -98.01 -1.43 -169.44 51.64 0c19.58,0 38.18,-4.31 54.85,-12.02l2.23 279.47z" />

                    {/* fil4: #007F57 */}
                    <polygon fill="#007F57" points="233.3,306.09 126.87,306.09 127.06,192.43 127.21,104.66 127.21,102.73 231.14,0 231.28,18.45 231.28,19.05 231.3,20.77 231.3,24.1 231.36,104.66 231.37,132.53 231.44,192.43 231.44,194.95 232.51,194.86 " />

                    {/* fil1: stroke #9384BE (Stroke usually less visible at favicon scale, but including for completeness if needed, though original had fill:none) */}
                    {/* Skipping fil1 as it duplicated fil0 geometry with stroke */}

                    {/* fil0 again (Polygon): #017F5F */}
                    <polygon fill="#017F5F" points="232.91,399.12 231.48,568.56 124.19,666.57 126.33,399.12 " />

                    {/* fil2: #787C7F */}
                    <path fill="#787C7F" d="M420.71 132.74c-0.58,-0.02 -1.14,-0.03 -1.71,-0.03 -22.96,-16.32 -50.78,-26.46 -80.8,-27.88 -2.41,-0.11 -4.84,-0.17 -7.29,-0.17l-99.02 0 0.34 49.18 0.27 38.59 0.45 0 0.03 2.4 -0.47 0.03 -1.08 0.09 0 -2.52 -0.06 -59.9 -0.02 -27.88 -0.06 -80.57 0 -3.33 -0.03 -20.59 189.44 132.57z" />

                    {/* fil3: #31363F */}
                    <polygon fill="#31363F" points="232.23,153.85 231.89,104.66 231.36,104.66 231.37,132.54 231.44,192.43 232.49,192.43 " />

                    {/* fil5: #292929 */}
                    <path fill="#292929" d="M481.41 251.89l0 20.62c0,50.48 -30.62,94.31 -74.57,114.59 -16.67,7.71 -35.27,12.02 -54.85,12.02l-249.96 0 -1.18 162.31 -100.1 101.76 -0.5 -264.07 -0.25 0 0 -294.46 127.21 0 -0.15 87.77 -25.01 0 0 113.66 216.65 0c27.49,0 49.96,-21.99 49.96,-48.87l0 -7.96c0,-31.25 -26.15,-56.83 -58.09,-56.83l-78.07 0 -0.26 -38.59 -0.34 -49.19 99.02 0c2.45,0 4.87,0.06 7.29,0.17 30.02,1.42 57.84,11.55 80.8,27.88 37.74,26.8 62.41,70.31 62.41,119.18z" />
                </svg>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
