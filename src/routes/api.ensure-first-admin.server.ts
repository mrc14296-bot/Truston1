import { createServerFn } from '@tanstack/react-start/server';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

export const ensureFirstAdminRole = createServerFn({ method: 'POST' })(async (userId: string) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase credentials');
  }

  const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });

  try {
    // Check if any admin exists
    const { data: existingAdmins } = await supabase
      .from('user_roles')
      .select('id')
      .eq('role', 'admin');

    // If no admin exists, make this user admin
    if (!existingAdmins || existingAdmins.length === 0) {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: 'admin' });

      if (error) {
        console.error('Error assigning admin role:', error);
        throw error;
      }

      return { success: true, message: 'Admin role assigned' };
    }

    return { success: false, message: 'Admin role already exists' };
  } catch (error) {
    console.error('ensureFirstAdminRole error:', error);
    throw error;
  }
});
