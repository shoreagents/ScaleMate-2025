import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDownloadModal as useBlueprintModal } from '@/components/quote/QuoteDownloadModal';
import { useDownloadModal as useCostSavingsModal } from '@/components/cost-savings/CostSavingsDownloadModal';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { openModal: openBlueprintModal } = useBlueprintModal();
  const { openModal: openCostSavingsModal } = useCostSavingsModal();

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
    // Rest of the component code
  );
};

export default Dashboard; 