import CurrentVehicleCard from '@/components/CurrentVehicleCard'
import AppLayout from '@/components/Layouts/AppLayout'
import TripsTable from '@/components/TripsTable'
import Link from 'next/link'

const Dashboard = () => {
    return (
        <AppLayout header={null}>
            <div className='py-12 px-1 text-primary-foreground'>
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                    <CurrentVehicleCard />
                    <div className='flex justify-between items-center px-2 py-4'>
                        <h1 className='font-semibold'>Latest trips</h1>
                        <Link
                            className='flex items-center gap-2 font-semibold hover:underline hover:text-primary-foreground/[0.8]'
                            href='/trips/create'
                        >
                            <span>New trip</span>
                            <svg className='w-6 h-6' fill='none' strokeLinecap='round' strokeLinejoin='round'
                                 strokeWidth='2' viewBox='0 0 24 24' stroke='currentColor'
                            >
                                <path d='M12 4v16m8-8H4' />
                            </svg>
                        </Link>
                    </div>
                    <div className='bg-background overflow-hidden shadow-sm sm:rounded-lg border'>
                        <TripsTable />
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
