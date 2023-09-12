import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import User from '@/lib/api/User'
import Car from '@/lib/api/Car'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { authorize } from '@/lib/utils'
import Welcome from '@/components/Welcome'

const Dashboard = ({ car, fallback }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
            fallback={fallback}
        >
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Welcome />

                        {car ? (
                            <div className="p-6 bg-white border-b border-gray-200">
                                Your car - {car?.brand?.name}
                            </div>
                        ): null}
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard

export const getServerSideProps = async ({ req }: GetServerSidePropsContext) => {
    authorize(req)

    try {
        const user = await User.show()

        return {
            props: {
                car: user.car_id ? await Car.show(user.car_id): null,
                fallback: {
                    [User.showPath]: user,
                }
            },
        }
    } catch (error) {
        if(error.response?.status === 401) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            }
        }

        if(error.response?.status === 409) {
            return {
                redirect: {
                    destination: '/verify-email',
                    permanent: false,
                },
            }
        }

        throw error
    }
}
