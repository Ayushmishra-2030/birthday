import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const adminCookie = req.cookies.get('admin_auth_token')?.value;
  const previewCookie = req.cookies.get('shree_preview_token')?.value;

  const isAdmin = Boolean(adminCookie && adminCookie.startsWith('admin_session_'));
  const isPreview = Boolean(previewCookie && previewCookie.startsWith('preview_'));

  return NextResponse.json({
    isAdmin,
    isPreview,
  });
}

export async function POST(req: NextRequest) {
  // Logout
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete('admin_auth_token');
  return response;
}

