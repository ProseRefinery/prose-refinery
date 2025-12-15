import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 180,
    height: 180,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'black',
                }}
            >
                <div style={{
                    fontSize: 120,
                    fontFamily: 'serif',
                    fontWeight: 900,
                    lineHeight: 1,
                    marginTop: -10
                }}>P</div>
            </div>
        ),
        {
            ...size,
        }
    );
}
