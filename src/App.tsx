import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom";
import { LoadingComponent } from "./components";

const LoginPage = lazy(() => import('./pages/login/login.page'));
const CompanyPage = lazy(() => import('./pages/company/company.page'));
const ProductsPage = lazy(() => import('./pages/products/products.page'));
const InventoryPage = lazy(() => import('./pages/inventory/inventory.page'));

import ApartmentIcon from '@mui/icons-material/Apartment';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import AuthGuard from "./utilities/auth-guard";

const SIDEBAR_ITEMS = [
  {
    id: 'it-1',
    label: 'Empresa',
    icon: <ApartmentIcon />,
    path: '/'
  },
  {
    id: 'it-2',
    label: 'Productos',
    icon: <ShoppingCartOutlinedIcon />,
    path: '/products'
  },
  {
    id: 'it-3',
    label: 'Inventario',
    icon: <InventoryRoundedIcon />,
    path: '/inventory'
  },
]

function App() {

  return (
    <Suspense fallback={<LoadingComponent />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<AuthGuard sidebarItems={SIDEBAR_ITEMS} />}>
          <Route path="/" element={<CompanyPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
        </Route>

      </Routes>
    </Suspense>
  )
}

export default App
