import CurrentVehicleCard from '@/components/CurrentVehicleCard'
import AppLayout from '@/components/Layouts/AppLayout'
import SelectVehicleCard from '@/components/SelectVehicleCard'
import { useCar } from '@/hooks/useCar'

const AvailableCars = () => {
    const { availableCars } = useCar()

    return (
        <AppLayout header={null}>
            <div className='py-12 px-1'>
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                    <CurrentVehicleCard />
                    {availableCars ? (
                        availableCars.map(car => <SelectVehicleCard key={car.id} car={car} />)
                    ) : (
                        <span>No cars available</span>
                    )}
                </div>
            </div>
        </AppLayout>
    )
}

export default AvailableCars
