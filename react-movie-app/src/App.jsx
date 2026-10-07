import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { ErrorPage } from './pages/ErrorPage';
import { FavoritesProvider } from './context/FavoritesContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BookingPage } from './pages/BookingPage'


const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
      }
    }
  }
)
function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: '/phim/:slug',
            element: <MovieDetailPage />
          },
          {
            path: '/dat-ve/:slug',
            element: <BookingPage />,
          },
        ]
      }
    ]
  )
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )

}

export default App;