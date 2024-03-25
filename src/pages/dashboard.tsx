import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
// import User from '@/lib/api/User'
// import Car from '@/lib/api/Car'
// import { GetServerSidePropsContext } from 'next'
// import { authorize } from '@/lib/utils'
// import { dehydrate, QueryClient } from '@tanstack/react-query'
import Welcome from '@/components/Welcome'
import CurrentVehicleCard from '@/components/CurrentVehicleCard'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'

const Dashboard = () => {
  const Map = useMemo(() => dynamic(
    () => import('@/components/Map'),
    {
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])

  return (
    <AppLayout>
      <Head>
        <title>Laravel - Dashboard</title>
      </Head>

      <div className="p-2 relative">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm sm:rounded-lg border p-2 z-20 relative bg-background/[0.75]">
            <Welcome />
            <CurrentVehicleCard />
          </div>
        </div>

        <Map />
      </div>
    </AppLayout>
  )
}

export default Dashboard

// export const getServerSideProps = async ({ req }: GetServerSidePropsContext) => {
//     authorize(req)
//
//     const queryClient = new QueryClient()
//
//     try {
//         const user = await queryClient.fetchQuery({
//             queryKey: [User.showPath],
//             queryFn: () => User.show(),
//         })
//
//         await queryClient.prefetchQuery({
//             queryKey: [Car.path, user.car_id],
//             queryFn: () => user.car_id ? Car.show(user.car_id) : null,
//         })
//
//         return {
//             props: {
//                 dehydratedState: dehydrate(queryClient),
//             },
//         }
//     } catch (error) {
//         if(error.response?.status === 401) {
//             return {
//                 redirect: {
//                     destination: '/login',
//                     permanent: false,
//                 },
//             }
//         }
//
//         if(error.response?.status === 409) {
//             return {
//                 redirect: {
//                     destination: '/verify-email',
//                     permanent: false,
//                 },
//             }
//         }
//
//         throw error
//     }
// }
