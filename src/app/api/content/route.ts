import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const db = getDatabase();
    const adminCookie = req.cookies.get('admin_auth_token')?.value;
    const previewCookie = req.cookies.get('shree_preview_token')?.value;

    const isAdmin = Boolean(adminCookie && adminCookie.startsWith('admin_session_'));
    const isPreview = Boolean(previewCookie && previewCookie.startsWith('preview_'));

    // Check birthday unlock condition
    const targetDate = new Date(db.settings.birthdayTargetIso).getTime();
    const now = Date.now();
    const isBirthdayReached = now >= targetDate || db.settings.unlockOverride === true;

    const hasAccess = isBirthdayReached || isPreview || isAdmin;

    // Public locked payload (for visitors before Nov 7 without preview)
    if (!hasAccess) {
      return NextResponse.json({
        isUnlocked: false,
        isBirthdayReached: false,
        isPreview: false,
        isAdmin: false,
        targetIso: db.settings.birthdayTargetIso,
        timezone: db.settings.timezone,
        girlfriendName: db.settings.girlfriendName,
        boyfriendName: db.settings.boyfriendName,
        message: 'Someone very special is about to enter her own little universe... Princess Shree, your special day is approaching. Thoda sa patience, princess... your surprise is getting ready. ❤️',
      });
    }

    // Full Unlocked Payload
    return NextResponse.json({
      isUnlocked: true,
      isBirthdayReached,
      isPreview,
      isAdmin,
      settings: db.settings,
      letters: db.letters,
      timeline: db.timeline,
      quotes: db.quotes,
      reasons: db.reasons,
      quiz: db.quiz,
      photos: db.photos,
      lastUpdated: db.lastUpdated,
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const adminCookie = req.cookies.get('admin_auth_token')?.value;
    const isAuthorized = Boolean(adminCookie && adminCookie.startsWith('admin_session_'));

    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized. Admin login required.' }, { status: 401 });
    }

    const body = await req.json();
    const updated = saveDatabase(body);

    return NextResponse.json({
      success: true,
      message: 'Website content updated successfully!',
      data: updated,
    });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
