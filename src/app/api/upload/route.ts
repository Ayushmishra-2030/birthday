import { NextRequest, NextResponse } from 'next/server';
import { uploadScrapbookImage, getDatabase, saveDatabase } from '@/lib/storage';
import { Photo } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const adminCookie = req.cookies.get('admin_auth_token')?.value;
    const previewCookie = req.cookies.get('shree_preview_token')?.value;
    const isAuthorized = Boolean(
      (adminCookie && adminCookie.startsWith('admin_session_')) ||
      (previewCookie && previewCookie.startsWith('preview_'))
    );

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin authorization required to upload photographs.' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    const singleFile = formData.get('file') as File | null;

    const allFiles = files.length > 0 ? files : (singleFile ? [singleFile] : []);

    if (allFiles.length === 0) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    const title = (formData.get('title') as string) || 'Sweet Memory';
    const caption = (formData.get('caption') as string) || 'Humari pyari si yaad ❤️';
    const date = (formData.get('date') as string) || new Date().toLocaleDateString('en-GB');
    const category = (formData.get('category') as string) || 'Memories';
    const featured = formData.get('featured') === 'true';

    const db = getDatabase();
    const uploadedPhotos: Photo[] = [];

    for (const file of allFiles) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { success: false, message: `File ${file.name} is not an image.` },
          { status: 400 }
        );
      }

      // Max size: 25MB
      if (file.size > 25 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, message: `File ${file.name} exceeds 25MB limit.` },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Supabase Storage or Local Public Storage
      const publicUrl = await uploadScrapbookImage(buffer, file.name, file.type);

      const newPhoto: Photo = {
        id: `photo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        title,
        caption,
        imageUrl: publicUrl,
        date,
        category,
        featured,
        orderIndex: (db.photos.length || 0) + 1,
        createdAt: new Date().toISOString(),
      };

      uploadedPhotos.push(newPhoto);
    }

    const updatedPhotos = [...uploadedPhotos, ...db.photos];
    saveDatabase({ photos: updatedPhotos });

    return NextResponse.json({
      success: true,
      message: `${uploadedPhotos.length} photo(s) uploaded successfully!`,
      photos: uploadedPhotos,
    });
  } catch (error) {
    console.error('Upload handler error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload photo(s)' },
      { status: 500 }
    );
  }
}
