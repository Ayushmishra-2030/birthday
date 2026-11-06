import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/storage';
import { Photo } from '@/types';

export async function GET() {
  const db = getDatabase();
  return NextResponse.json({ photos: db.photos });
}

export async function PUT(req: NextRequest) {
  try {
    const adminCookie = req.cookies.get('admin_auth_token')?.value;
    const previewCookie = req.cookies.get('shree_preview_token')?.value;
    const isAuthorized = Boolean(
      (adminCookie && adminCookie.startsWith('admin_session_')) ||
      (previewCookie && previewCookie.startsWith('preview_'))
    );

    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const db = getDatabase();

    // If batch photos array is provided (e.g. for reordering)
    if (body.photos && Array.isArray(body.photos)) {
      saveDatabase({ photos: body.photos });
      return NextResponse.json({ success: true, photos: body.photos });
    }

    const { id, title, caption, category, featured, isPublished, date, orderIndex } = body;

    const updated = db.photos.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          title: title ?? p.title,
          caption: caption ?? p.caption,
          category: category ?? p.category,
          featured: featured !== undefined ? featured : p.featured,
          isPublished: isPublished !== undefined ? isPublished : p.isPublished,
          date: date ?? p.date,
          orderIndex: orderIndex ?? p.orderIndex,
        };
      }
      return p;
    });

    saveDatabase({ photos: updated });
    return NextResponse.json({ success: true, photos: updated });
  } catch (error) {
    console.error('Photo update error:', error);
    return NextResponse.json({ error: 'Failed to update photo' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const adminCookie = req.cookies.get('admin_auth_token')?.value;
    const previewCookie = req.cookies.get('shree_preview_token')?.value;
    const isAuthorized = Boolean(
      (adminCookie && adminCookie.startsWith('admin_session_')) ||
      (previewCookie && previewCookie.startsWith('preview_'))
    );

    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Photo ID required' }, { status: 400 });
    }

    const db = getDatabase();
    const updated = db.photos.filter((p) => p.id !== id);
    saveDatabase({ photos: updated });

    return NextResponse.json({ success: true, message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Photo delete error:', error);
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 });
  }
}

