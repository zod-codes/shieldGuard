import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { RoadTransportation } from './pages/RoadTransportation';
import { WarehouseLogistics } from './pages/WarehouseLogistics';
import { InternationalShipping } from './pages/InternationalShipping';
import { Insurance } from './pages/Insurance';
import { Careers } from './pages/Careers';
import { Team } from './pages/Team';
import { AboutUs } from './pages/AboutUs';
import { LogisticsCoordinator } from './pages/jobs/LogisticsCoordinator';
import { WarehouseManager } from './pages/jobs/WarehouseManager';
import { SalesExecutive } from './pages/jobs/SalesExecutive';
import { CustomerSupportSpecialist } from './pages/jobs/CustomerSupportSpecialist';
import { SoftwareEngineer } from './pages/jobs/SoftwareEngineer';
import { FleetManager } from './pages/jobs/FleetManager';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/road-transportation',
        element: <RoadTransportation />,
      },
      {
        path: '/warehouse-logistics',
        element: <WarehouseLogistics />,
      },
      {
        path: '/international-shipping',
        element: <InternationalShipping />,
      },
      {
        path: '/insurance',
        element: <Insurance />,
      },
      {
        path: '/careers',
        element: <Careers />,
      },
      {
        path: '/team',
        element: <Team />
      },
      {
        path: '/about-us',
        element: <AboutUs />
      },
      {
        path: '/jobs/logistics-coordinator',
        element: <LogisticsCoordinator />
      },
      {
        path: '/jobs/warehouse-manager',
        element: <WarehouseManager />
      },
      {
        path: '/jobs/sales-executive',
        element: <SalesExecutive />
      },
      {
        path: '/jobs/customer-support-specialist',
        element: <CustomerSupportSpecialist />
      },
      {
        path: '/jobs/software-engineer',
        element: <SoftwareEngineer />
      },
      {
        path: '/jobs/fleet-manager',
        element: <FleetManager />
      },
    ],
  },
]);