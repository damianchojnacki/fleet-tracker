import React from 'react'
import { Button } from '@/components/ui/button'
import CarType from '@/types/Models/Car'
import Car from '@/lib/api/Car'

export interface SelectCarCardProps {
  car: CarType
}

const SelectVehicleCard = ({ car }: SelectCarCardProps) => {
  const activateCar = async () => {
    await Car.activate(car.id)
  }

  return (
    <div className="flex items-center border-b-2 border-secondary mt-2 min-w-full">
      <div className="p-2 rounded-lg flex flex-row items-center">
        <img src={Car.imageUrl(car)} alt="Vehicle" className="h-auto w-40 md:w-60 object-cover rounded-lg "
        />
      </div>
      <div className='w-full flex flex-row justify-between items-center'>
        <div className="ml-4">
          <h2 className="text-lg text-primary font-semibold
          my-3 capitalize"
          >{car.brand?.name} {car.specs.model}</h2>
          <p className="text-sm text-primary my-1">Registration: {car.specs.plate_number}</p>
          <p className="text-sm text-primary my-1">Odometer: {car.mileage?.toLocaleString()} km</p>
        </div>
        <div>
          <Button onClick={activateCar} className='bg-primary hover:bg-[#1B4865]/[0.8] text-white font-semibold' >Select</Button>
        </div>
      </div>
    </div>
  )
}

export default SelectVehicleCard
