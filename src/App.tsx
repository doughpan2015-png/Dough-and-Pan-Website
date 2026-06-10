// // import { Switch, Route, Router as WouterRouter } from "wouter";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { Toaster } from "@/components/ui/toaster";
// // import { TooltipProvider } from "@/components/ui/tooltip";
// // import NotFound from "@/pages/not-found";
// // import Home from "@/pages/Home";
// // import About from "@/pages/About";
// // import MenuPage from "@/pages/MenuPage";
// // import GalleryPage from "@/pages/GalleryPage";
// // import ContactPage from "@/pages/ContactPage";
// // import CustomizeCake from "@/pages/CustomizeCake";
// // import Layout from "@/components/Layout";
// // import AdminLogin from "@/pages/admin/Login";
// // import AdminProducts from "@/pages/admin/Products";
// // import ProtectedRoute from "@/components/ProtectedRoute";
// // import { AuthProvider } from "@/context/AuthContext";

// // const queryClient = new QueryClient();

// // function Router() {
// //   return (
// //     <Switch>
// //       {/* Admin routes — no public Layout */}
// //       <Route path="/admin/login" component={AdminLogin} />
// //       <Route path="/admin/products">
// //         <ProtectedRoute>
// //           <AdminProducts />
// //         </ProtectedRoute>
// //       </Route>
// //       <Route path="/admin">
// //         <ProtectedRoute>
// //           <AdminProducts />
// //         </ProtectedRoute>
// //       </Route>

// //       {/* Public routes — wrapped in Layout */}
// //       <Route>
// //         <Layout>
// //           <Switch>
// //             <Route path="/" component={Home} />
// //             <Route path="/about" component={About} />
// //             <Route path="/menu" component={MenuPage} />
// //             <Route path="/gallery" component={GalleryPage} />
// //             <Route path="/contact" component={ContactPage} />
// //             <Route path="/customize" component={CustomizeCake} />
// //             <Route component={NotFound} />
// //           </Switch>
// //         </Layout>
// //       </Route>
// //     </Switch>
// //   );
// // }

// // function App() {
// //   return (
// //     <QueryClientProvider client={queryClient}>
// //       <AuthProvider>
// //         <TooltipProvider>
// //           <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
// //             <Router />
// //           </WouterRouter>
// //           <Toaster />
// //         </TooltipProvider>
// //       </AuthProvider>
// //     </QueryClientProvider>
// //   );
// // }

// // export default App;

// import { Switch, Route, Router as WouterRouter } from "wouter";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import NotFound from "@/pages/not-found";
// import Home from "@/pages/Home";
// import About from "@/pages/About";
// import MenuPage from "@/pages/MenuPage";
// import GalleryPage from "@/pages/GalleryPage";
// import ContactPage from "@/pages/ContactPage";
// import CustomizeCake from "@/pages/CustomizeCake";
// import Layout from "@/components/Layout";
// import AdminLogin from "@/pages/admin/Login";
// import AdminProducts from "@/pages/admin/Products";
// import ProtectedRoute from "@/components/ProtectedRoute";
// import { AuthProvider } from "@/context/AuthContext";
// import ScrollToTop from "@/components/ScrollToTop";

// const queryClient = new QueryClient();

// function Router() {
//   return (
//     <>
//       <ScrollToTop />
//       <Switch>
//         {/* Admin routes — no public Layout */}
//         <Route path="/admin/login" component={AdminLogin} />
//         <Route path="/admin/products">
//           <ProtectedRoute>
//             <AdminProducts />
//           </ProtectedRoute>
//         </Route>
//         <Route path="/admin">
//           <ProtectedRoute>
//             <AdminProducts />
//           </ProtectedRoute>
//         </Route>

//         {/* Public routes — wrapped in Layout */}
//         <Route>
//           <Layout>
//             <Switch>
//               <Route path="/" component={Home} />
//               <Route path="/about" component={About} />
//               <Route path="/menu" component={MenuPage} />
//               <Route path="/gallery" component={GalleryPage} />
//               <Route path="/contact" component={ContactPage} />
//               <Route path="/customize" component={CustomizeCake} />
//               <Route component={NotFound} />
//             </Switch>
//           </Layout>
//         </Route>
//       </Switch>
//     </>
//   );
// }

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <TooltipProvider>
//           <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
//             <Router />
//           </WouterRouter>
//           <Toaster />
//         </TooltipProvider>
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;

import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import MenuPage from "@/pages/MenuPage";
import GalleryPage from "@/pages/GalleryPage";
import ContactPage from "@/pages/ContactPage";
import CustomizeCake from "@/pages/CustomizeCake";
import Layout from "@/components/Layout";
import AdminLogin from "@/pages/admin/Login";
import AdminProducts from "@/pages/admin/Products";
import AdminSettings from "@/pages/admin/Settings";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        {/* Admin routes — no public Layout */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/products">
          <ProtectedRoute>
            <AdminProducts />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/settings">
          <ProtectedRoute>
            <AdminSettings />
          </ProtectedRoute>
        </Route>
        <Route path="/admin">
          <ProtectedRoute>
            <AdminProducts />
          </ProtectedRoute>
        </Route>

        {/* Public routes — wrapped in Layout */}
        <Route>
          <Layout>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/menu" component={MenuPage} />
              <Route path="/gallery" component={GalleryPage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/customize" component={CustomizeCake} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;