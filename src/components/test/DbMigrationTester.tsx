import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { TestResult, TestConfig } from '@/lib/utils/test';
import { formatTestResult } from '@/lib/utils/test';

interface DbMigrationTesterProps {
  onTest: (config: TestConfig) => Promise<TestResult>;
}

export const DbMigrationTester: React.FC<DbMigrationTesterProps> = ({ onTest }) => {
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(false);

  const runMigration = async () => {
    setLoading(true);
    try {
      // Execute the migration SQL
      const { error: migrationError } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS public.user_roles (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            role TEXT NOT NULL,
            permissions TEXT[] DEFAULT '{}',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
            UNIQUE(user_id, role)
          );

          ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

          DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
          DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

          CREATE POLICY "Admins can manage all roles"
            ON public.user_roles
            FOR ALL
            TO authenticated
            USING (
              EXISTS (
                SELECT 1 FROM public.user_roles
                WHERE user_id = auth.uid()
                AND role = 'admin'
              )
            );

          CREATE POLICY "Users can view their own roles"
            ON public.user_roles
            FOR SELECT
            TO authenticated
            USING (user_id = auth.uid());

          CREATE OR REPLACE FUNCTION public.update_updated_at()
          RETURNS TRIGGER AS $$
          BEGIN
              NEW.updated_at = timezone('utc'::text, now());
              RETURN NEW;
          END;
          $$ LANGUAGE plpgsql;

          CREATE TRIGGER update_user_roles_updated_at
              BEFORE UPDATE ON public.user_roles
              FOR EACH ROW
              EXECUTE FUNCTION public.update_updated_at();
        `
      });

      if (migrationError) {
        setResult({
          success: false,
          message: 'Failed to execute migration',
          details: migrationError
        });
        return;
      }

      setResult({
        success: true,
        message: 'Migration completed successfully',
        details: {
          tablesCreated: ['user_roles'],
          rlsEnabled: true,
          policiesCreated: true
        }
      });
    } catch (error) {
      setResult({
        success: false,
        message: 'An unexpected error occurred',
        details: error
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Database Migration Test</h2>
      
      <div className="space-y-2">
        <button
          onClick={runMigration}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {loading ? 'Running...' : 'Run Migrations'}
        </button>
      </div>

      {result && (
        <div className={`p-4 rounded ${result.success ? 'bg-green-100' : 'bg-red-100'}`}>
          <pre className="whitespace-pre-wrap">
            {formatTestResult(result)}
          </pre>
        </div>
      )}
    </div>
  );
}; 