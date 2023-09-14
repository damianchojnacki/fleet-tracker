import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
// import User from '@/lib/api/User'
// import Car from '@/lib/api/Car'
// import { GetServerSidePropsContext } from 'next'
// import { authorize } from '@/lib/utils'
// import { dehydrate, QueryClient } from '@tanstack/react-query'
import Welcome from '@/components/Welcome'
import CarSection from '@/components/CarSection'

const Dashboard = () => {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-foreground leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-background overflow-hidden shadow-sm sm:rounded-lg border">
                        <Welcome />

                        <CarSection />
                    </div>
                </div>
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
