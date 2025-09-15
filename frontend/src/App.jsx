import React from 'react'
import Navbar from './components/components_lite/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import Home from './components/components_lite/Home'
import PrivacyPolicy from './components/components_lite/PrivacyPolicy'
import TermsConditions from './components/components_lite/Terms&Conditions'
import Jobs from './components/components_lite/Jobs'
import Browse from './components/components_lite/Browse'
import Profile from './components/components_lite/Profile'
import Description from './components/components_lite/Description'
import Companies from './components/admincomponent/Companies'
import CompanyCreate from './components/admincomponent/CompanyCreate'
import CompanySetup from './components/admincomponent/CompanySetup'
import AdminJobs from './components/admincomponent/AdminJobs'
import PostJobs from './components/admincomponent/PostJobs'
import Applicants from './components/admincomponent/Applicants'
import JobDetail from './components/admincomponent/JobDetail'
import ProtectedRoute from './components/admincomponent/ProtectedRoute'
import About from './components/components_lite/About'
import Help from './components/components_lite/Help'
import FAQ from './components/components_lite/FAQ'


const appRouter = createBrowserRouter([
  {path: '/',
    element: <Home />,
  },
  {path: '/login',
    element: <Login />,
  },
  {
    path: '/browse',
    element: <Browse />,
  },
  {path: '/brows',
    element: <Browse />,
  },
  {path: '/register',
    element: <Register />,
  },
  {
    path: '/PrivacyPolicy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/TermsConditions',
    element: <TermsConditions />,
  },
  {
    path: 'About',
    element: <About />,
  },
  {
    path: '/Help',
    element: <Help />
  },
  {
    path: '/FAQ',
    element: <FAQ />
  },
  {
    path: '/Jobs',
    element: <Jobs />,
  },
  {
    path: '/Browse',
    element: <Browse />,
  },
  {
    path: '/Profile',
    element: <Profile />,
  },
  {
    path: '/Description/:id',
    element: <Description />
  },

  // admin routes
  {
    path: '/admin/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>,
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute><PostJobs /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/:id',
    element: <ProtectedRoute><JobDetail /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  }

])

const App = () => {
  return (
    <div>
    <RouterProvider router = {appRouter}>

    </RouterProvider>
    </div>
  )
}

export default App
