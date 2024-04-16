import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/root.layout.tsx";
import HomePage from "./pages/home/home.page.tsx";
import SignInPage from "./pages/sign-in/sign-in.page.tsx";
import SignUpPage from "./pages/sign-up/sign-up.page.tsx";
import MainLayout from "./layout/main.layout";
import JobPage from "./pages/job/job.page.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import AdminMainLayout from "./layout/admin.layout.tsx";
import AdminJobPostsPage from "./pages/admin/jobPosts/admin-job-posts.page.tsx";
import JobCreatePage from "./pages/admin/createJob/job-create.page.tsx";
import AdminJobPage from "./pages/admin/job/admin-job.page.tsx";
import AdminJobApplicationPage from "./pages/admin/jobApplication/admin-job-application.page.tsx";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log(PUBLISHABLE_KEY);
 
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")  //Secret key
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/home",
            element: <HomePage />,
          },
          {
            path: "job/:id",
            element: <JobPage />
          }
        ],
      },
      {
        path: "admin",
        element: <AdminMainLayout />,
        children: [
          {
            path: "jobs",
            element: <AdminJobPostsPage />,
          },
          {
            path: "job/create",
            element: <JobCreatePage />,
          },
          {
            path: "job/:id",
            element: <AdminJobPage />,
          },
          {
            path: "job/:id/application/:applicationId",
            element: <AdminJobApplicationPage />,
          },
        ],
      },
      {
        path: "/sign in",
        element: <SignInPage />,
      },
      {
        path: "/sign up",
        element: <SignUpPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
 console.log("hi");
 