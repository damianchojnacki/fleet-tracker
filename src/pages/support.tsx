import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Chat from '@/components/Chat'

const Dashboard = () => {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-foreground leading-tight">
                    Support
                </h2>
            }
        >
            <Head>
                <title>FleetTracker - Support</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-background overflow-hidden shadow-sm sm:rounded-lg border">
                        <Chat/>
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
