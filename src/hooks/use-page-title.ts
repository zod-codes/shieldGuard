// src/hooks/usePageTitle.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_TITLE = 'Shield Guard';

// Map your paths to readable titles here
const routeTitles: Record<string, string> = {
  '/': 'Home',
  '/about-us': 'About Us',
  '/careers': 'Careers',
  '/team': 'Team',
  '/insurance': 'Insurance',
  '/international-shipping': 'International Shipping',
  '/warehouse-logistics': 'Warehouse Logistics',
  '/road-transportation': 'Road Transportation',
  '/jobs/logistics-coordinator': 'Jobs | Logistics Coordinator',
  '/jobs/warehouse-manager': 'Jobs | Warehouse Manager',
  '/jobs/sales-executive': 'Jobs | Sales Executive',
  '/jobs/customer-support-specialist': 'Jobs | Customer Support Specialist',
  '/jobs/software-engineer': 'Jobs | Software Engineer',
  '/jobs/fleet-manager': 'Jobs | Fleet Manager',
};

export const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    // Get the title based on the current path, default to "Home" or just the base title
    const currentPath = location.pathname;
    const pageTitle = routeTitles[currentPath] || 'Cargo Transport'; 

    // Update the document title
    document.title = `${BASE_TITLE} | ${pageTitle}`;
    
  }, [location]); // Re-run this effect whenever the location changes
};