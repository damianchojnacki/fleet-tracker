import React from 'react'
import { Button } from '@/components/ui/button'
import CarType from '@/types/Models/Car'
import Car from '@/lib/api/Car'
import { useCar } from '@/hooks/useCar'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'

export interface SelectCarCardProps
{
    car: CarType
}

const SelectVehicleCard = ({ car }: SelectCarCardProps) => {
    const { refresh: refreshAuth } = useAuth()
    const { refreshAvailableCars } = useCar()

    const router = useRouter()

    const selectCar = async () => {
        await Car.select(car.id)

        refreshAuth()
        refreshAvailableCars()

        await router.push('/dashboard')
    }

    return (
        <div className='flex text-primary-foreground items-center border-b-2 border-secondary mt-2 min-w-full'>
            <div className='p-2 rounded-lg flex flex-row items-center'>
                <img src={Car.imageUrl(car)} alt='Vehicle' className='h-auto w-40 md:w-60 object-cover rounded-lg ' />
            </div>
            <div className='w-full flex flex-row justify-between items-center'>
                <div className='ml-4'>
                    <h2 className='text-lg font-semibold my-3 capitalize'
                        data-cy='name'
                    >{car.brand?.name} {car.specs.model}</h2>
                    <p className='text-sm my-1'>Registration: {car.specs.plate_number}</p>
                    <p className='text-sm my-1'>Odometer: {car.mileage?.toLocaleString()} km</p>
                </div>
                <div>
                    <Button onClick={selectCar} className='font-semibold'>Select</Button>
                </div>
            </div>
        </div>
    )
}

export default SelectVehicleCard
