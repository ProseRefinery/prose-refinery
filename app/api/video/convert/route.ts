import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';

// Set ffmpeg path
if (ffmpegPath) {
    ffmpeg.setFfmpegPath(ffmpegPath);
}

export async function POST(req: NextRequest) {
    const tempDir = os.tmpdir();
    const uniqueId = uuidv4();
    const inputPath = path.join(tempDir, `input-${uniqueId}.webm`);
    const outputPath = path.join(tempDir, `output-${uniqueId}.mp4`);

    try {
        // 1. Write the incoming stream to a temporary WebM file
        const blob = await req.blob();
        const buffer = Buffer.from(await blob.arrayBuffer());
        await fs.promises.writeFile(inputPath, buffer);

        // 2. Convert WebM to MP4 using ffmpeg
        await new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .outputOptions([
                    '-c:v libx264',     // Use H.264 codec for max compatibility (Instagram)
                    '-preset fast',     // Fast conversion
                    '-crf 23',          // Good quality balance
                    '-c:a aac',         // AAC audio
                    '-b:a 128k',
                    '-movflags +faststart' // Optimize for web streaming
                ])
                .save(outputPath)
                .on('end', resolve)
                .on('error', (err: Error) => {
                    console.error('FFmpeg error:', err);
                    reject(err);
                });
        });

        // 3. Read the converted file
        const fileBuffer = await fs.promises.readFile(outputPath);

        // 4. Cleanup temp files
        await Promise.all([
            fs.promises.unlink(inputPath).catch(() => { }),
            fs.promises.unlink(outputPath).catch(() => { })
        ]);

        // 5. Return the MP4 file
        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'video/mp4',
                'Content-Disposition': `attachment; filename="reel-${uniqueId}.mp4"`,
            },
        });

    } catch (error) {
        console.error('Conversion failed:', error);

        // Cleanup on error
        await Promise.all([
            fs.promises.unlink(inputPath).catch(() => { }),
            fs.promises.unlink(outputPath).catch(() => { }) // Might not exist
        ]);

        return NextResponse.json(
            { error: 'Video conversion failed.' },
            { status: 500 }
        );
    }
}
