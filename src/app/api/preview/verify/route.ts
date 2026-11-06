import { NextRequest, NextResponse } from 'next/server';
import { checkPreviewRateLimit, recordPreviewAttempt, getDatabase } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('remote-addr') || '127.0.0.1';
    
    // Check rate limit
    const rateCheck = checkPreviewRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many failed attempts. Thoda sa sabar karein... Please wait ${rateCheck.cooldownSeconds} seconds before trying again.`,
          remainingAttempts: 0,
          cooldownSeconds: rateCheck.cooldownSeconds,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { code } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Secret code is required.' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    const serverExpectedCode = process.env.SECRET_PREVIEW_CODE || db.settings.secretPreviewCode || 'shree7nov';

    // Strict constant-time-like trim check
    const isMatch = code.trim().toLowerCase() === serverExpectedCode.trim().toLowerCase();

    const attemptResult = recordPreviewAttempt(ip, isMatch);

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: 'Galat secret code! Sirf Ayush ke paas sahi chabi hai... 🗝️',
          remainingAttempts: attemptResult.remainingAttempts,
          cooldownSeconds: attemptResult.cooldownSeconds,
        },
        { status: 401 }
      );
    }

    // Success! Generate preview token
    const token = `preview_${Date.now()}_${Buffer.from(serverExpectedCode).toString('base64')}`;

    const res = NextResponse.json({
      success: true,
      message: 'Secret realm unlocked! Welcome Ayush, your universe for Shree is ready. ❤️',
      token,
    });

    // Set secure cookie
    res.cookies.set('shree_preview_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (error) {
    console.error('Error in preview verify:', error);
    return NextResponse.json(
      { success: false, message: 'Server error verifying preview code' },
      { status: 500 }
    );
  }
}
