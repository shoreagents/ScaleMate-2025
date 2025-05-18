import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  if (!session) {
    return NextResponse.json({ error: 'No session found' }, { status: 401 });
  }

  return NextResponse.json({
    user: session.user,
    session: session,
  });
}

export async function DELETE(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
} 