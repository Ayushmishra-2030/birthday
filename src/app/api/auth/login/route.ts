import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const expectedUser = (process.env.ADMIN_USERNAME || 'ayush').trim();
    const expectedPass = (process.env.ADMIN_PASSWORD || 'shreeforever2026').trim();

    if (username?.trim() === expectedUser && password?.trim() === expectedPass) {
      const adminToken = `admin_session_${Date.now()}_ayush`;
      const response = NextResponse.json({
        success: true,
        message: 'Admin authentication successful! Welcome Ayush.',
        token: adminToken,
      });

      response.cookies.set('admin_auth_token', adminToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid admin username or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
