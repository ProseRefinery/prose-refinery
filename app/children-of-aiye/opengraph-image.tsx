import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Children of Aiyé — Afrofuturist Fantasy Novel';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: 'serif',
        }}
      >
        {/* Gold accent lines */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)',
          }}
        />

        {/* Decorative corner elements */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '40px',
            width: '60px',
            height: '60px',
            borderTop: '2px solid #D4AF37',
            borderLeft: '2px solid #D4AF37',
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            width: '60px',
            height: '60px',
            borderTop: '2px solid #D4AF37',
            borderRight: '2px solid #D4AF37',
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            width: '60px',
            height: '60px',
            borderBottom: '2px solid #D4AF37',
            borderLeft: '2px solid #D4AF37',
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            width: '60px',
            height: '60px',
            borderBottom: '2px solid #D4AF37',
            borderRight: '2px solid #D4AF37',
            opacity: 0.6,
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '60px',
          }}
        >
          {/* Badge */}
          <div
            style={{
              fontSize: '16px',
              letterSpacing: '4px',
              color: '#D4AF37',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            An Afrofuturist Epic
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#f0f0f0',
              lineHeight: 1.1,
              marginBottom: '16px',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            Children of Aiyé
          </div>

          {/* Divider */}
          <div
            style={{
              width: '120px',
              height: '2px',
              background: '#D4AF37',
              margin: '24px 0',
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: '24px',
              color: '#a0a0a0',
              maxWidth: '700px',
              lineHeight: 1.4,
              marginBottom: '32px',
            }}
          >
            Four divine Frames. One impossible soul.
            <br />
            The mythology franchise Africa deserves.
          </div>

          {/* Author */}
          <div
            style={{
              fontSize: '18px',
              color: '#D4AF37',
              letterSpacing: '2px',
            }}
          >
            BY OLA BELLO
          </div>
        </div>

        {/* Publisher logo area */}
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              color: '#666',
              letterSpacing: '1px',
            }}
          >
            PROSE REFINERY PRESS
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
