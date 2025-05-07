import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDownloadModal as useBlueprintModal } from '@/components/quote/QuoteDownloadModal';
import { useDownloadModal as useCostSavingsModal } from '@/components/cost-savings/CostSavingsDownloadModal';
import NoNavbarLayout from '@/components/layout/NoNavbarLayout';
import DashboardHeader from '@/components/layout/DashboardHeader';
import DashboardSidebar, { NavItem } from '@/components/layout/DashboardSidebar';
import { supabase } from '@/lib/supabase';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { openModal: openBlueprintModal } = useBlueprintModal();
  const { openModal: openCostSavingsModal } = useCostSavingsModal();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleProfileClick = () => {
    router.push('/user/profile');
  };

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'profile', label: 'Profile', icon: 'user' },
    { id: 'settings', label: 'Settings', icon: 'cog' }
  ];

  useEffect(() => {
    if (router.isReady) {
      const { showBlueprintModal, showCostSavingsModal } = router.query;
      
      if (showBlueprintModal === 'true') {
        // Remove the parameter
        router.replace('/user/dashboard', undefined, { shallow: true });
        // Open blueprint modal
        openBlueprintModal();
      } else if (showCostSavingsModal === 'true') {
        // Remove the parameter
        router.replace('/user/dashboard', undefined, { shallow: true });
        // Open cost savings modal
        openCostSavingsModal();
      }
    }
  }, [router.isReady, router.query, openBlueprintModal, openCostSavingsModal]);

  return (
    <NoNavbarLayout>
      <div className="flex h-screen bg-gray-100">
        <DashboardSidebar 
          logoText="ScaleMate"
          navItems={navItems}
          activeTab={activeTab}
          onTabClick={setActiveTab}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader 
            title="Dashboard"
            onLogout={handleLogout}
            onProfileClick={handleProfileClick}
          />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">
              <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>
              {/* Add your dashboard content here */}
            </div>
          </main>
        </div>
      </div>
    </NoNavbarLayout>
  );
};

export default Dashboard; 