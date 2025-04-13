import React, { ReactNode } from 'react';

interface TestPanelProps {
  children: ReactNode;
}

// @ref:test/components/TestPanel
export const TestPanel = ({ children }: TestPanelProps) => {
  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}; 