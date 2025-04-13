import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { TestPanel } from '@/components/test/TestPanel';
import AuthTester from '@/components/test/AuthTester';
import QuoteTester from '@/components/test/QuoteTester';
import QuizTester from '@/components/test/QuizTester';
import RoleBuilderTester from '@/components/test/RoleBuilderTester';
import AiPromptTester from '@/components/test/AiPromptTester';
import EventTester from '@/components/test/EventTester';
import PageTester from '@/components/test/PageTester';
import StyleTester from '@/components/test/StyleTester';
import PerformanceTester from '@/components/test/PerformanceTester';
import SecurityTester from '@/components/test/SecurityTester';

// Common test handler function
const handleTest = async (config: any) => {
  console.log('Testing with config:', config);
  return { success: true, message: 'Test completed' };
};

// @ref:test/dashboard
const TestDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { name: 'Auth', component: AuthTester },
    { name: 'Quick Quote', component: QuoteTester },
    { name: 'Readiness Quiz', component: QuizTester },
    { name: 'Role Builder', component: RoleBuilderTester },
    { name: 'AI Prompts', component: AiPromptTester },
    { name: 'Event Tracking', component: EventTester },
    { name: 'Page Testing', component: PageTester },
    { name: 'Style Guide', component: StyleTester },
    { name: 'Performance', component: PerformanceTester },
    { name: 'Security', component: SecurityTester },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">ScaleMate Test Dashboard</h1>
          <p className="mt-4 text-xl text-gray-600">
            Test and validate all platform features and components
          </p>
        </div>

        <div className="mt-12">
          <Tab.Group onChange={setSelectedTab}>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {tabs.map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                    ${
                      selected
                        ? 'bg-white text-blue-700 shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    }`
                  }
                >
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {tabs.map((tab, idx) => (
                <Tab.Panel
                  key={idx}
                  className={
                    'rounded-xl bg-white p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                  }
                >
                  <TestPanel>
                    {selectedTab === idx && (
                      <>
                        {tab.name === 'Quick Quote' && (
                          <QuoteTester onTest={handleTest} />
                        )}
                        {tab.name === 'Auth' && <tab.component onTest={handleTest} />}
                        {tab.name === 'Readiness Quiz' && <tab.component onTest={handleTest} />}
                        {tab.name === 'Role Builder' && <tab.component onTest={handleTest} />}
                        {tab.name === 'AI Prompts' && <tab.component onTest={handleTest} />}
                        {tab.name === 'Event Tracking' && <tab.component onTest={handleTest} />}
                        {tab.name === 'Page Testing' && <tab.component onTest={handleTest} />}
                        {tab.name === 'Style Guide' && <tab.component onTest={handleTest} />}
                        {tab.name === 'Performance' && <tab.component onTest={handleTest} />}
                        {tab.name === 'Security' && <tab.component onTest={handleTest} />}
                      </>
                    )}
                  </TestPanel>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900">Test Results</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-700">Coverage</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span>Unit Tests</span>
                  <span className="font-mono">80%</span>
                </div>
                <div className="flex justify-between">
                  <span>Integration Tests</span>
                  <span className="font-mono">70%</span>
                </div>
                <div className="flex justify-between">
                  <span>E2E Tests</span>
                  <span className="font-mono">60%</span>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-700">Performance</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span>FCP</span>
                  <span className="font-mono">&lt; 2s</span>
                </div>
                <div className="flex justify-between">
                  <span>LCP</span>
                  <span className="font-mono">&lt; 2.5s</span>
                </div>
                <div className="flex justify-between">
                  <span>CLS</span>
                  <span className="font-mono">&lt; 0.1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDashboard; 