import { supabase } from '../supabase';
import { ApiResponse } from './api';

export interface AdminUser {
  email: string;
  password: string;
  metadata?: {
    role: 'admin';
    permissions: string[];
  };
}

export const createAdminAccount = async (admin: AdminUser): Promise<ApiResponse<{ user: any; error: any }>> => {
  try {
    // 1. Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: admin.email,
      password: admin.password,
      options: {
        data: {
          role: 'admin',
          ...admin.metadata
        }
      }
    });

    if (authError) {
      return {
        data: null,
        error: authError,
        status: 400,
        message: 'Failed to create admin account'
      };
    }

    // 2. Add admin role to the user
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: authData.user?.id,
        role: 'admin',
        permissions: admin.metadata?.permissions || ['*']
      });

    if (roleError) {
      return {
        data: null,
        error: roleError,
        status: 400,
        message: 'Failed to assign admin role'
      };
    }

    return {
      data: {
        user: authData.user,
        error: null
      },
      error: null,
      status: 200,
      message: 'Admin account created successfully'
    };
  } catch (error) {
    return {
      data: null,
      error: error as Error,
      status: 500,
      message: 'An unexpected error occurred'
    };
  }
};

export const verifyAdminRole = async (userId: string): Promise<ApiResponse<boolean>> => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (error) {
      return {
        data: null,
        error,
        status: 400,
        message: 'Failed to verify admin role'
      };
    }

    return {
      data: data?.role === 'admin',
      error: null,
      status: 200
    };
  } catch (error) {
    return {
      data: null,
      error: error as Error,
      status: 500,
      message: 'An unexpected error occurred'
    };
  }
}; 