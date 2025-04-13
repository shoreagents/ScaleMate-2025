import React, { useState } from 'react';
import { createAdminAccount, verifyAdminRole } from '@/lib/utils/admin';
import { TestResult, TestConfig } from '@/lib/utils/test';
import { formatTestResult } from '@/lib/utils/test';
import { supabase } from '@/lib/supabase';

interface AdminAccountTesterProps {
  onTest: (config: TestConfig) => Promise<TestResult>;
}

export const AdminAccountTester: React.FC<AdminAccountTesterProps> = ({ onTest }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(false);

  const checkTableExists = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('count')
        .limit(1);

      if (error) {
        if (error.code === '42P01') { // Table doesn't exist
          return {
            success: false,
            message: 'user_roles table does not exist. Please run the migration first.',
            details: error
          };
        }
        throw error;
      }
      return { success: true, message: 'Table exists' };
    } catch (error) {
      return {
        success: false,
        message: 'Error checking table existence',
        details: error
      };
    }
  };

  const handleCreateAdmin = async () => {
    setLoading(true);
    try {
      // First check if table exists
      const tableCheck = await checkTableExists();
      if (!tableCheck.success) {
        setResult(tableCheck);
        return;
      }

      const response = await createAdminAccount({
        email,
        password,
        metadata: {
          role: 'admin',
          permissions: ['*']
        }
      });

      if (response.error) {
        setResult({
          success: false,
          message: response.message || 'Failed to create admin account',
          details: response.error
        });
        return;
      }

      // Verify the admin role
      const verifyResponse = await verifyAdminRole(response.data?.user?.id);
      
      setResult({
        success: verifyResponse.data === true,
        message: verifyResponse.data 
          ? 'Admin account created and verified successfully' 
          : 'Admin account created but role verification failed',
        details: {
          user: response.data?.user,
          roleVerified: verifyResponse.data
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
      <h2 className="text-xl font-bold">Admin Account Creation Test</h2>
      
      <div className="space-y-2">
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleCreateAdmin}
          disabled={loading || !email || !password}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {loading ? 'Creating...' : 'Create Admin Account'}
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

export default AdminAccountTester; 