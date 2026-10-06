import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { ErrorPage } from './pages/ErrorPage';
import { FavoritesProvider } from './context/FavoritesContext';


function App() {
  const router=createBrowserRouter(
    [
      {
      path:'/',
      element:<RootLayout/>,
      errorElement: <ErrorPage />,
      children:[
        {
          index:true,
          element:<HomePage/>,
        },
        {
          path:'/phim/:slug',
          element:<MovieDetailPage/>
        }
      ]
    }
    ]
  )
  return (
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  
    )
  
}

export default App;