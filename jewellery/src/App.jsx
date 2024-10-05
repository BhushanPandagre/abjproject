import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./component/schema/Header";
import Navbar from "./component/schema/Navbar";
import Sidebar from "./component/schema/Sidebar";
import UserCategory from "./component/admin/pages/userCategory/UserCategory";
import ItemMaster from "./component/admin/pages/itemMaster/ItemMaster";
import AccountMaster from "./component/admin/pages/accountMaster/AccountMaster";
import Login from "./component/auth/Login";
import AddItem from "./component/admin/pages/itemMaster/AddItem";
import ViewItem from "./component/admin/pages/itemMaster/ViewItem";
import UpdateItem from "./component/admin/pages/itemMaster/UpdateItem";
import Group from "./component/admin/pages/itemMaster/group/Group";
import SignUp from "./component/auth/SignUp";
import AddCategory from "./component/admin/pages/itemMaster/category/AddCategory";
import Unit from "./component/admin/pages/itemMaster/unit/Unit";
import AltUnit from "./component/admin/pages/itemMaster/AlternateUnit/AltUnit";
import AddPackagingUnit from "./component/admin/pages/itemMaster/packagingUnit/AddPackagingUnit";
import AccountMasterDetail from "./component/admin/pages/accountMaster/AccountMasterDetail";
import ViewAccountMaster from "./component/admin/pages/accountMaster/ViewAccountMaster";
import UpdateAccountMaster from "./component/admin/pages/accountMaster/UpdateAccountMaster";
import Gst from "./component/admin/gst/Gst";
import Designation from "./component/admin/pages/userCategory/designation/Designation";
import AddPurchaseVoucher from "./component/admin/pages/purchaseVoucher/AddPurchaseVoucher";
import PurchaseVoucherList from "./component/admin/pages/purchaseVoucher/PurchaseVoucherList";
import ViewPurchaseItem from "./component/admin/pages/purchaseVoucher/ViewPurchaseItem";
import UpdatePurchaseItem from "./component/admin/pages/purchaseVoucher/UpdatePurchaseItem";
import AddEmployee from "./component/admin/pages/employeeManagement/AddEmployee";
import EmployeeList from "./component/admin/pages/employeeManagement/EmployeeList";
import AddDepartment from "./component/admin/pages/employeeManagement/department/AddDepartment";
// import Demo from './component/schema/Demo';
import CashDetail from "./component/admin/pages/cashierManagement/CashDetail";
import SubAdminHome from "./component/subAdmin/schema/SubAdminHome";
import AddPurchaseItem from "./component/subAdmin/pages/purchaseVoucher/AddPurchaseItem";
import CashierHeader from "./component/cashier/schema/CashierHeader";
import CashDetailList from "./component/cashier/pages/cashManagement/CashDetailList";
import ItemDemo from "./component/admin/pages/itemMaster/ItemDemo";
import Invoice from "./component/admin/pages/purchaseVoucher/invoice/Invoice";
import ForgotPassword from "./component/auth/ForgotPassword";
import ResetPassword from "./component/auth/ResetPassword";
import AddSupplierMaster from "./component/admin/pages/supplierMaster/AddSupplierMaster";
import ViewSupplierMaster from "./component/admin/pages/supplierMaster/ViewSupplierMaster";
import AddGeneralMaster from "./component/admin/pages/generalMaster/AddGeneralMaster";
import ViewGeneralMaster from "./component/admin/pages/generalMaster/ViewGeneralMaster";
import GeneralMasterDetail from "./component/admin/pages/generalMaster/GeneralMasterDetail";
import SupplierMasterDetail from "./component/admin/pages/supplierMaster/SupplierMasterDetail";
import AddReciept from "./component/admin/pages/recieptAndPayment/reciept/AddReciept";
import AddPayment from "./component/admin/pages/recieptAndPayment/payment/AddPayment";
import RecieptVoucherList from "./component/admin/pages/recieptAndPayment/reciept/RecieptVoucherList";
import PaymentVoucherList from "./component/admin/pages/recieptAndPayment/payment/PaymentVoucherList";
import ViewPaymentVoucher from "./component/admin/pages/recieptAndPayment/payment/ViewPaymentVoucher";
import ViewRecieptVoucher from "./component/admin/pages/recieptAndPayment/reciept/ViewRecieptVoucher";
import CheckStock from "./component/admin/pages/stockGeneral/CheckStock";
import Area from "./component/admin/pages/area/Area";
import Salutation from "./component/admin/pages/accountMaster/salutation/Salutation";
import AddSalesVoucher from "./component/admin/pages/salesVoucher/AddSalesVoucher";
import UpdateSalesVoucher from "./component/admin/pages/salesVoucher/UpdateSalesVoucher";
import SalesVoucherList from "./component/admin/pages/salesVoucher/SalesVoucherList";
import AdminDashboard from "./component/admin/pages/dashboard/AdminDashboard";
import CheckStockDetail from "./component/admin/pages/stockGeneral/CheckStockDetail";
import AddStock from "./component/admin/pages/stockGeneral/addStock/AddStock";
import StockList from "./component/admin/pages/stockGeneral/addStock/StockList";
import ViewStockEntry from "./component/admin/pages/stockGeneral/addStock/ViewStockEntry";
import StockReport from "./component/admin/pages/stockGeneral/stockReport/StockReport";
import ViewSalesVoucher from "./component/admin/pages/salesVoucher/ViewSalesVoucher";
import PaymentReport from "./component/admin/pages/recieptAndPayment/payment/report/PaymentReport";
import PackagingForm from "./component/admin/pages/purchaseVoucher/Packaging/PackagingForm";
import PackagingList from "./component/admin/pages/purchaseVoucher/Packaging/PackagingList";
import UpdatePackaging from "./component/admin/pages/purchaseVoucher/Packaging/UpdatePackaging";
import PackagingDetail from "./component/admin/pages/purchaseVoucher/Packaging/PackagingDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          {/* <Route path="/demo" element={<Demo />} /> */}
          <Route path="/user_category" element={<UserCategory />} />
          <Route path="/item_master" element={<ItemMaster />} />
          <Route path="/add_item" element={<AddItem />} />
          <Route path="/demo_add_item" element={<ItemDemo />} />
          <Route path="/view_item/:id" element={<ViewItem />} />
          <Route path="/update_item/:id" element={<UpdateItem />} />
          <Route path="/add_category" element={<AddCategory />} />
          <Route path="/account_master" element={<AccountMaster />} />
          <Route
            path="/account_master_detail"
            element={<AccountMasterDetail />}
          />
          <Route
            path="/view_account_master/:accountId"
            element={<ViewAccountMaster />}
          />
          <Route
            path="update_account_master/:id"
            element={<UpdateAccountMaster />}
          />
          <Route path="/add_salutation" element={<Salutation />} />

          {/* Admin Dashboard Start  */}
          <Route path="/admin_dashboard" element={<AdminDashboard />} />

          {/* Supplier Master Start  */}
          <Route path="/add_supplier_master" element={<AddSupplierMaster />} />
          <Route
            path="/update_supplier_master/:id"
            element={<AddSupplierMaster />}
          />
          <Route
            path="/view_supplier_master/:id"
            element={<ViewSupplierMaster />}
          />
          <Route path="/supplier_detail" element={<SupplierMasterDetail />} />
          {/* Supplier Master End */}

          {/* General Master Start  */}
          <Route path="/add_general_master" element={<AddGeneralMaster />} />
          <Route path="/edit/:id" element={<AddGeneralMaster />} />
          <Route
            path="/view_general_master/:id"
            element={<ViewGeneralMaster />}
          />
          <Route
            path="/general_master_detail"
            element={<GeneralMasterDetail />}
          />

          {/* Reciept Voucher Start  */}
          <Route path="/add_reciept_voucher" element={<AddReciept />} />
          <Route path="/update_reciept/:id" element={<AddReciept />} />
          <Route
            path="/reciept_voucher_detail"
            element={<RecieptVoucherList />}
          />
          <Route
            path="/view_reciept_voucher"
            element={<ViewRecieptVoucher />}
          />

          {/* Payment Voucher Start  */}
          <Route path="/add_payment_voucher" element={<AddPayment />} />
          <Route path="/update_payment_voucher/:id" element={<AddPayment />} />
          <Route
            path="/payment_voucher_detail"
            element={<PaymentVoucherList />}
          />
           <Route path="/payment_voucher_report" element={<PaymentReport />} />

          <Route
            path="/view_payment_voucher"
            element={<ViewPaymentVoucher />}
          />

          {/* Stock General Start  */}
          <Route path="/stock_check" element={<CheckStock />} />
          <Route path="/stock_check_detail" element={<CheckStockDetail />} />
          <Route path="/add_stock" element={<AddStock />} />
          <Route path="/view_stock_entry/:id" element={<ViewStockEntry />} />
          <Route path="/update_stock/:id" element={<AddStock />} />
          <Route path="/stock_list" element={<StockList />} />
          <Route path="/stock_report" element={<StockReport />} />

          <Route path="/add_group" element={<Group />} />
          <Route path="/add_unit" element={<Unit />} />
          <Route path="/alt_unit" element={<AltUnit />} />
          <Route path="/add_packaging_unit" element={<AddPackagingUnit />} />
          <Route path="/add_designation" element={<Designation />} />
          <Route path="/add_gst" element={<Gst />} />

          {/* Purchase Voucher start */}

          <Route
            path="/add_purchase_voucher"
            element={<AddPurchaseVoucher />}
          />
          <Route
            path="/view_purchase_item/:id"
            element={<ViewPurchaseItem />}
          />
          <Route
            path="/update_purchase_item/:id"
            element={<UpdatePurchaseItem />}
          />
          <Route
            path="/purchase_voucher_list"
            element={<PurchaseVoucherList />}
          />
          <Route path="/purchase_invoice/:id" element={<Invoice />} />

          {/* Sales Voucher start */}
          <Route path="/add_sales_voucher" element={<AddSalesVoucher />} />
          <Route
            path="/update_sales_voucher/:id"
            element={<UpdateSalesVoucher />}
          />
          <Route path="/sales_voucher_list" element={<SalesVoucherList />} />
          <Route
            path="/view_sales_voucher/:id"
            element={<ViewSalesVoucher />}
          />

          {/* packaging Management start */}
          <Route path="/add_packaging" element={<PackagingForm />} />
          <Route path="/packaging_list" element={<PackagingList />} />
          <Route path="/packaging/update/:id" element={<UpdatePackaging />} />
          <Route path="/packaging/:id" element={<PackagingDetail/>} />

          {/* Employee Management start */}

          <Route path="/add_employee" element={<AddEmployee />} />
          <Route path="/employee_list" element={<EmployeeList />} />
          <Route path="/add_department" element={<AddDepartment />} />

          {/* Cashier Management start */}
          <Route path="/cash_detail" element={<CashDetail />} />

          {/* Area Start */}
          <Route path="/add_area" element={<Area />} />
          <Route
            path="/add_purchase_item"
            element={<SubAdminHome Component={AddPurchaseItem} />}
          />

          <Route
            path="/cash_detail_list"
            element={<CashierHeader Component={CashDetailList} />}
          />

          {/* Sub Admin start */}
        </Routes>
      </BrowserRouter>
      {/* <ToastContainer /> */}
    </>
  );
}

export default App;
