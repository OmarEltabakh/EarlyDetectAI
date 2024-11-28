import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import Options from './Components/Options/Options'
import Answers from './Components/Answers/Answers'

export default function App() {


  const routers = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: "Options", element: <Options /> },
        { path: "answers", element: <Answers /> },
      ]
    }
  ])





  return <>

    <RouterProvider router={routers} />

  </>


}

