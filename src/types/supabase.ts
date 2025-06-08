export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          username: string | null
          role: 'user' | 'admin'
          phone_number: string | null
          location: string | null
          profile_picture_url: string | null
          email: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          username?: string | null
          role?: 'user' | 'admin'
          phone_number?: string | null
          location?: string | null
          profile_picture_url?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          username?: string | null
          role?: 'user' | 'admin'
          phone_number?: string | null
          location?: string | null
          profile_picture_url?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      admin_audit_log: {
        Row: {
          id: string
          admin_id: string
          action: string
          details: Json
          ip_address: string
          created_at: string
        }
        Insert: {
          id?: string
          admin_id: string
          action: string
          details: Json
          ip_address: string
          created_at?: string
        }
        Update: {
          id?: string
          admin_id?: string
          action?: string
          details?: Json
          ip_address?: string
          created_at?: string
        }
      }
      username_check_log: {
        Row: {
          id: number
          user_id: string
          username_checked: string
          check_time: string
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          username_checked: string
          check_time?: string
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          username_checked?: string
          check_time?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_username_exists: {
        Args: {
          username_to_check: string
          current_user_id: string
        }
        Returns: boolean
      }
      delete_user_completely: {
        Args: {
          p_user_id: string
        }
        Returns: void
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
} 