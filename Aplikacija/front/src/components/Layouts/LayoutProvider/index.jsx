import { useEffect } from 'react';
import { MainLayout } from '../MainLayout';
import { useLocation } from 'react-router-dom';

// Switch between Auth and Main Layout
const LayoutProvider = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <MainLayout>{children}</MainLayout>;
};

export default LayoutProvider;
