import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Preview session ended. Website locked to public countdown mode.',
  });

  // Clear preview and admin session cookies
  response.cookies.set('shree_preview_token', '', {
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });

  response.cookies.set('admin_auth_token', '', {
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}

