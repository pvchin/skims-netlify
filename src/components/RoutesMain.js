import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import {
  Home,
  Customers,
  Items,
  ItemHistory,
  Inventory,
  Receivable,
  Receipts,
  Payable,
  Payments,
  Sales,
  SalesInvoice,
  Suppliers,
  Purchases,
  PurchasesInvoice,
  CustomerStatement,
  SupplierStatement,
  ItemGroup,
  Settings,
  Tables,
  Error,
} from '../pages';

const RoutesMain = () => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <React.Suspense fallback={<>...</>}>
            <Home />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/items"
        element={
          <React.Suspense fallback={<>...</>}>
            <Items />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/itemhistory"
        element={
          <React.Suspense fallback={<>...</>}>
            <ItemHistory />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/customers"
        element={
          <React.Suspense fallback={<>...</>}>
            <Customers />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/customerstatement"
        element={
          <React.Suspense fallback={<>...</>}>
            <CustomerStatement />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/suppliers"
        element={
          <React.Suspense fallback={<>...</>}>
            <Suppliers />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/supplierstatement"
        element={
          <React.Suspense fallback={<>...</>}>
            <SupplierStatement />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/receipts"
        element={
          <React.Suspense fallback={<>...</>}>
            <Receipts />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/payments"
        element={
          <React.Suspense fallback={<>...</>}>
            <Payments />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/sales"
        element={
          <React.Suspense fallback={<>...</>}>
            <Sales />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/salesinvoice"
        element={
          <React.Suspense fallback={<>...</>}>
            <SalesInvoice />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/purchases"
        element={
          <React.Suspense fallback={<>...</>}>
            <Purchases />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/purchaseinvoice"
        element={
          <React.Suspense fallback={<>...</>}>
            <PurchasesInvoice />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/receivable"
        element={
          <React.Suspense fallback={<>...</>}>
            <Receivable />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/payable"
        element={
          <React.Suspense fallback={<>...</>}>
            <Payable />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/inventory"
        element={
          <React.Suspense fallback={<>...</>}>
            <Inventory />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/itemgroups"
        element={
          <React.Suspense fallback={<>...</>}>
            <ItemGroup />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/settings"
        element={
          <React.Suspense fallback={<>...</>}>
            <Settings />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/tables"
        element={
          <React.Suspense fallback={<>...</>}>
            <Tables />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/error"
        element={
          <React.Suspense fallback={<>...</>}>
            <Error />
          </React.Suspense>
        }
      />
      <Route
        path="*"
        element={
          <React.Suspense fallback={<>...</>}>
            <Error />
          </React.Suspense>
        }
      />
    </Routes>
  );
};

export default RoutesMain;
