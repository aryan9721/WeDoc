import React from "react";
import { Redirect } from "react-router-dom";

// // Pages Component
import Chat from "../pages/Chat/Chat";
import Lead from "../pages/Lead/Lead";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

// Pages Calendar
import Calendar from "../pages/Calendar/index";

// //Ecommerce Pages
import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index";
import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail";
import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";
import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index";
import EcommerceCart from "../pages/Ecommerce/EcommerceCart";
import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout";
import EcommerceShops from "../pages/Ecommerce/EcommerceShops/index";
import EcommerceAddProduct from "../pages/Ecommerce/EcommerceAddProduct";

// CME
import CMEList from "../pages/CME/CMEList";
import EditCME from "../pages/CME/EditCME";
// Events
import EventsList from "../pages/Events/EventsList";
import EditEvents from "../pages/Events/EditEvents";

// Gallery
import AddGallery from "../pages/Gallery/AddGallery";
import EditGallery from "../pages/Gallery/EditGallery";

// Featured Videos
import AddFeaturedVideos from "../pages/FeaturedVideos/AddFeaturedVideos";
import EditFeaturedVideos from "../pages/FeaturedVideos/EditFeaturedVideos";

//Email
import EmailInbox from "../pages/Email/email-inbox";
import EmailRead from "../pages/Email/email-read";
import EmailBasicTemplte from "../pages/Email/email-basic-templte";
import EmailAlertTemplte from "../pages/Email/email-template-alert";
import EmailTemplateBilling from "../pages/Email/email-template-billing";

// Career
import Career from "../pages/Career/Career";

// Top Stories
import AddTopStories from "../pages/TopStories/AddTopStories";
import EditTopStories from "../pages/TopStories/EditTopStories";

// Trending
import Trending from "../pages/Trending/Trending";

//Invoices
import InvoicesList from "../pages/Invoices/invoices-list";
import InvoiceDetail from "../pages/Invoices/invoices-detail";

//Contacts
import ContactsGrid from "../pages/Contacts/contacts-grid";
import ContactsList from "../pages/Contacts/ContactList/contacts-list";
import ContactsProfile from "../pages/Contacts/ContactsProfile/contacts-profile";

//Pages
import PagesStarter from "../pages/Utility/pages-starter";
import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import PagesTimeline from "../pages/Utility/pages-timeline";
import PagesFaqs from "../pages/Utility/pages-faqs";
import PagesPricing from "../pages/Utility/pages-pricing";
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";

//Ui
import UiAlert from "../pages/Ui/UiAlert";
import UiButtons from "../pages/Ui/UiButtons";
import UiCards from "../pages/Ui/UiCards";
import UiCarousel from "../pages/Ui/UiCarousel";
import UiColors from "../pages/Ui/UiColors";
import UiDropdown from "../pages/Ui/UiDropdown";
import UiGeneral from "../pages/Ui/UiGeneral";
import UiGrid from "../pages/Ui/UiGrid";
import UiImages from "../pages/Ui/UiImages";
import UiLightbox from "../pages/Ui/UiLightbox";
import UiModal from "../pages/Ui/UiModal";
import UiProgressbar from "../pages/Ui/UiProgressbar";
import UiSweetAlert from "../pages/Ui/UiSweetAlert";
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions";
import UiTypography from "../pages/Ui/UiTypography";
import UiVideo from "../pages/Ui/UiVideo";
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout";
import UiRating from "../pages/Ui/UiRating";
import UiRangeSlider from "../pages/Ui/UiRangeSlider";
import UiNotifications from "../pages/Ui/ui-notifications";
import UiImageCropper from "../pages/Ui/ui-image-cropper";

// Forms
import BasicElements from "../pages/Forms/BasicElements";
import FormLayouts from "../pages/Forms/FormLayouts";
import FormAdvanced from "../pages/Forms/FormAdvanced";
import FormEditors from "../pages/Forms/FormEditors";
import FormValidations from "../pages/Forms/FormValidations";
import FormMask from "../pages/Forms/FormMask";
import FormRepeater from "../pages/Forms/FormRepeater";
import FormUpload from "../pages/Forms/FormUpload";
import FormWizard from "../pages/Forms/FormWizard";
import FormXeditable from "../pages/Forms/FormXeditable";

//Tables
import BasicTables from "../pages/Tables/BasicTables";
import DatatableTables from "../pages/Tables/DatatableTables";
import ResponsiveTables from "../pages/Tables/ResponsiveTables";
import EditableTables from "../pages/Tables/EditableTables";

// Charts
import ChartApex from "../pages/Charts/Apexcharts";
import ChartjsChart from "../pages/Charts/ChartjsChart";
import EChart from "../pages/Charts/EChart";
import SparklineChart from "../pages/Charts/SparklineChart";
import ChartsKnob from "../pages/Charts/charts-knob";

//Icons

import IconUnicons from "../pages/Icons/IconUnicons";
import IconBoxicons from "../pages/Icons/IconBoxicons";
import IconDripicons from "../pages/Icons/IconDripicons";
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign";
import IconFontawesome from "../pages/Icons/IconFontawesome";

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle";
import MapsVector from "../pages/Maps/MapsVector";
import MapsLeaflet from "../pages/Maps/MapsLeaflet";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import AddDoctor from "../pages/Authentication/AddDoctor";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Register1 from "../pages/AuthenticationInner/Register";
import Recoverpw from "../pages/AuthenticationInner/Recoverpw";
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen";

// Profile
import UserProfile from "../pages/Authentication/user-profile";
import Special from "../pages/Special/Special";
import Catalogue from "../pages/Catalogue/Catalogue";
import Reviews from "../pages/Reviews/Reviews";
import CompanyProfile from "../pages/CompanyProfile/CompanyProfile";
import AddCustomer from "../pages/AddCustomer/AddCustomer";
import MySpecial from "../pages/MySpecial/MySpecial";
import SuccessPayment from "../pages/Ecommerce/successPayment";
import CancelPayment from "../pages/Ecommerce/cancelPayment";
import MyeCatalogue from "../pages/MyeCatalogue/MyeCatalogue";
import MyFavourite from "../pages/MyFavourite/MyFavourite";
import MyReviews from "../pages/MyReviews/MyReviews";
import Customer from "../pages/Customer/Customer";
import Inventory from "../pages/Inventory/Inventory";
import Quotes from "../pages/Quotes/Quotes";
import EditCustomer from "../pages/EditCustomer/EditCustomer";
import AddInventory from "../pages/Inventory/AddInventory";
import ViewCustomer from "../pages/EditCustomer/ViewCustomer";
import EditInventory from "../pages/Inventory/EditInventory";
import AddQuotes from "../pages/Quotes/AddQuotes";
import ViewInventory from "../pages/Inventory/ViewInventory";
import EditQuotes from "../pages/Quotes/EditQuote";
import SendRequest from "../pages/SendRequest/SendRequest";
import MyRequest from "../pages/MyRequest/MyRequest";
import BusinessEnquiry from "../pages/BusinessEnquiry/BusinessEnquiry";
import AddBusinessEnquiry from "../pages/BusinessEnquiry/AddBusinessEnquiry";
import IncomingBusinessEnquiry from "../pages/BusinessEnquiry/IncomingBusinessEnquiry";
import AddNewCatalogue from "../pages/MyeCatalogue/AddNewCatalogue";
import AddNewSpecial from "../pages/MySpecial/AddNewSpecial";
import AddInvoice from "../pages/Invoices/AddInvoice";
import SettingPage from "../pages/SettingPage/SettingPage";
import ViewQuotes from "../pages/Quotes/ViewQuote";
import GenerateInvoice from "../pages/Quotes/GenerateInvoice";
import EcommerceAddress from "../pages/Ecommerce/EcommerceAddress";
import EditMyeCatalogue from "../pages/MyeCatalogue/EditMyeCatalogue";
import Subscription from "../pages/Authentication/Subscription";
import CatalogueDetail from "../pages/Catalogue/CatalogueDetail";
import SpecialDetail from "../pages/MySpecial/SpecialDetail";
import RequestDetail from "../pages/Authentication/RequestDetail";
import ViewOrders from "../pages/Ecommerce/EcommerceOrders/ViewOrder";
import EcommerceMyProduct from "../pages/Ecommerce/EcommerceMyProduct";
import IncomingDetail from "../pages/BusinessEnquiry/IncomingDetail";
import MyeCatalogueDetail from "../pages/MyeCatalogue/MyeCatalogueDetail";

// Advertisement
import AddAdvertisement from "../pages/Advertisement/AddAdvertisement";
import EditAdvertisement from "../pages/Advertisement/EditAdvertisement";

// Reference
import Reference from "../pages/Reference/Reference";

// Membership
import Membership from "../pages/Membership/Membership";

// Doctors
import Doctors from "../pages/Doctors/Doctors";

// Association
import Association from "../pages/Association/Association";

// Feedback
import Feedback from "../pages/Feedback/Feedback";

// terms-condition
import TermsCondition from "../pages/TermCondition/TermsCondition";
import EventSummery from "../pages/Events/EventSummery";
import CMESummery from "../pages/CME/CMESummery";
import MyProfile from "../pages/MyProfile/MyProfile";

const userRoutes = [
  // yaha pe neeche wala list aayege jo meine change kare hai
];

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/add-doctor", component: AddDoctor },

  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

  // Authentication Inner
  { path: "/pages-login", component: Login1 },
  { path: "/pages-register", component: Register1 },
  { path: "/page-recoverpw", component: Recoverpw },
  { path: "/auth-lock-screen", component: LockScreen },

  // yeah list upar aayege
  { path: "/dashboard", component: Dashboard },
  { path: "/calendar", component: Calendar },
  //chat
  { path: "/chat", component: Chat },

  // lead
  { path: "/lead", component: Lead },

  // business enquiry
  { path: "/businessenquiry", component: BusinessEnquiry },

  // Add business enquiry
  { path: "/addbusinessenquiry", component: AddBusinessEnquiry },
  { path: "/myecataloguedetail", component: MyeCatalogueDetail },
  // special
  { path: "/special", component: Special },
  { path: "/specialdetail", component: SpecialDetail },
  { path: "/incomingdetail", component: IncomingDetail },
  // settingpage
  { path: "/settingpage", component: SettingPage },
  // AddInventory
  { path: "/viewinventory", component: ViewInventory },
  // AddNewSpecial
  { path: "/addnewspecial", component: AddNewSpecial },

  // Association
  { path: "/association", component: Association },

  // Career
  { path: "/career", component: Career },

  // Top Stories
  { path: "/add-top-stories", component: AddTopStories },
  { path: "/edit-top-stories", component: EditTopStories },

  // Featured videos
  { path: "/add-featured-videos", component: AddFeaturedVideos },
  { path: "/edit-featured-videos", component: EditFeaturedVideos },

  // Trending
  { path: "/trending", component: Trending },

  // Reference
  { path: "/reference", component: Reference },

  // Feedback
  { path: "/feedback", component: Feedback },

  // Advertisement
  { path: "/add-advertisement", component: AddAdvertisement },
  { path: "/edit-advertisement", component: EditAdvertisement },

  // Membership
  { path: "/membership", component: Membership },

  // Doctors
  { path: "/doctors", component: Doctors },
  // catalogue
  { path: "/catalogue", component: Catalogue },
  { path: "/cataloguedetail", component: CatalogueDetail },
  // reviews
  { path: "/reviews", component: Reviews },

  // CompanyProfile
  { path: "/companyProfile", component: CompanyProfile },

  // MySpecial
  { path: "/myspecial", component: MySpecial },

  // TermsandCondition
  { path: "/terms-condition", component: TermsCondition },

  // successPayment
  { path: "/successPayment", component: SuccessPayment },

  // cancelPayment
  { path: "/cancelPayment", component: CancelPayment },

  // MyRequest
  { path: "/myrequest", component: MyRequest },

  // MyeCatalogue
  { path: "/myecatalogue", component: MyeCatalogue },

  // MyFavourite
  { path: "/myfavourite", component: MyFavourite },

  // Add new catalogue
  { path: "/addnewcatalogue", component: AddNewCatalogue },

  // EcommerceAddress
  { path: "/ecommerceaddress", component: EcommerceAddress },

  // MyReviews
  { path: "/myreviews", component: MyReviews },

  // Incoming Business enquiry
  { path: "/incomingbusinessenquiry", component: IncomingBusinessEnquiry },

  // Customer
  { path: "/customer", component: Customer },

  // Inventory
  { path: "/inventory", component: Inventory },
  //requestDetails
  { path: "/requestdetail", component: RequestDetail },

  // AddInventory
  { path: "/addinventory", component: AddInventory },
  // ViewQuotes
  { path: "/viewquotes", component: ViewQuotes },
  //vieworders
  { path: "/vieworders", component: ViewOrders },
  //EditmyeCatalogue
  { path: "/editmyecatalogue", component: EditMyeCatalogue },
  //geneate invoice
  { path: "/GenerateInvoice", component: GenerateInvoice },
  // AddInventory
  { path: "/editinventory", component: EditInventory },

  // Quotes
  { path: "/quotes", component: Quotes },

  // AddQuotes
  { path: "/addquotes", component: AddQuotes },

  // EditQuotes
  { path: "/editquotes", component: EditQuotes },

  // Edit Customer
  { path: "/editcustomer", component: EditCustomer },
  //subscription
  { path: "/subscription", component: Subscription },

  // Send Request
  { path: "/sendrequest", component: SendRequest },
  //View Customer
  { path: "/viewcustomer", component: ViewCustomer },
  // AddCustomer
  { path: "/addcustomer", component: AddCustomer },

  // CME
  { path: "/cme-list", component: CMEList },
  { path: "/edit-cme", component: EditCME },
  { path: "/summery-cme", component: CMESummery },

  //Ecommerce
  { path: "/ecommerce-products", component: EcommerceProducts },
  { path: "/myproduct", component: EcommerceMyProduct },
  { path: "/ecommerce-product-detail", component: EcommerceProductDetail },
  { path: "/ecommerce-products/:id", component: EcommerceProductDetail },
  { path: "/ecommerce-orders", component: EcommerceOrders },

  { path: "/ecommerce-customers", component: EcommerceCustomers },
  { path: "/ecommerce-cart", component: EcommerceCart },
  { path: "/ecommerce-checkout", component: EcommerceCheckout },
  { path: "/ecommerce-shops", component: EcommerceShops },
  { path: "/ecommerce-add-product", component: EcommerceAddProduct },

  //Events
  { path: "/events-list", component: EventsList },
  { path: "/edit-events", component: EditEvents },
  { path: "/summery-event", component: EventSummery },

  // Gallery
  { path: "/add-gallery", component: AddGallery },
  { path: "/edit-gallery", component: EditGallery },
  //Email
  { path: "/email-inbox", component: EmailInbox },
  { path: "/email-read", component: EmailRead },
  { path: "/email-template-basic", component: EmailBasicTemplte },
  { path: "/email-template-alert", component: EmailAlertTemplte },
  { path: "/email-template-billing", component: EmailTemplateBilling },

  //Invoices
  { path: "/invoices-list", component: InvoicesList },
  { path: "/invoices-detail", component: InvoiceDetail },
  { path: "/invoices-detail/:id", component: InvoiceDetail },
  { path: "/addinvoice", component: AddInvoice },

  // Contacts
  { path: "/contacts-grid", component: ContactsGrid },
  { path: "/contacts-list", component: ContactsList },
  { path: "/contacts-profile", component: ContactsProfile },

  //Utility
  { path: "/pages-starter", component: PagesStarter },
  { path: "/pages-timeline", component: PagesTimeline },
  { path: "/pages-faqs", component: PagesFaqs },
  { path: "/pages-pricing", component: PagesPricing },

  // Ui
  { path: "/ui-alerts", component: UiAlert },
  { path: "/ui-buttons", component: UiButtons },
  { path: "/ui-cards", component: UiCards },
  { path: "/ui-carousel", component: UiCarousel },
  { path: "/ui-colors", component: UiColors },
  { path: "/ui-dropdowns", component: UiDropdown },
  { path: "/ui-general", component: UiGeneral },
  { path: "/ui-grid", component: UiGrid },
  { path: "/ui-images", component: UiImages },
  { path: "/ui-lightbox", component: UiLightbox },
  { path: "/ui-modals", component: UiModal },
  { path: "/ui-progressbars", component: UiProgressbar },
  { path: "/ui-sweet-alert", component: UiSweetAlert },
  { path: "/ui-tabs-accordions", component: UiTabsAccordions },
  { path: "/ui-typography", component: UiTypography },
  { path: "/ui-video", component: UiVideo },
  { path: "/ui-session-timeout", component: UiSessionTimeout },
  { path: "/ui-rating", component: UiRating },
  { path: "/ui-rangeslider", component: UiRangeSlider },
  { path: "/ui-notifications", component: UiNotifications },
  { path: "/ui-image-cropper", component: UiImageCropper },

  // Forms
  { path: "/basic-elements", component: BasicElements },
  { path: "/form-layouts", component: FormLayouts },
  { path: "/form-advanced", component: FormAdvanced },
  { path: "/form-editors", component: FormEditors },
  { path: "/form-mask", component: FormMask },
  { path: "/form-repeater", component: FormRepeater },
  { path: "/form-uploads", component: FormUpload },
  { path: "/form-wizard", component: FormWizard },
  { path: "/form-validation", component: FormValidations },
  { path: "/form-xeditable", component: FormXeditable },

  // Tables
  { path: "/tables-basic", component: BasicTables },
  { path: "/tables-datatable", component: DatatableTables },
  { path: "/tables-responsive", component: ResponsiveTables },
  { path: "/tables-editable", component: EditableTables },

  //Charts
  { path: "/apex-charts", component: ChartApex },
  { path: "/chartjs-charts", component: ChartjsChart },
  { path: "/e-charts", component: EChart },
  { path: "/sparkline-charts", component: SparklineChart },
  { path: "/charts-knob", component: ChartsKnob },

  // Icons
  { path: "/icons-unicons", component: IconUnicons },
  { path: "/icons-boxicons", component: IconBoxicons },
  { path: "/icons-dripicons", component: IconDripicons },
  { path: "/icons-materialdesign", component: IconMaterialdesign },
  { path: "/icons-fontawesome", component: IconFontawesome },

  // Maps
  { path: "/maps-google", component: MapsGoogle },
  { path: "/maps-vector", component: MapsVector },
  { path: "/maps-leaflet", component: MapsLeaflet },

  // //profile
  { path: "/profile", component: UserProfile },
  { path: "/my-profile", component: MyProfile },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/login" /> },

  // yaha tk hai list
];

export { userRoutes, authRoutes };
