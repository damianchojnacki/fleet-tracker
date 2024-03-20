import React from 'react'
import { Button } from './ui/button'

const SelectVehicleCard = ({ vehicle }) => {
  return (
    <div className="flex items-center border-b-2 border-secondary mt-2 min-w-full">
      <div className="p-2 rounded-lg flex flex-row items-center">
        <img src={
          `https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=${vehicle.make}&modelFamily=${vehicle.model}&angle=1&zoomType=fullscreen`
        } alt="Vehicle" className="h-auto w-40 md:w-60 object-cover rounded-lg "
        />
      </div>
      <div className='w-full flex flex-row justify-between items-center'>
        <div className="ml-4">
          <h2 className="text-lg text-primary font-semibold
          my-3"
          >{vehicle.make} {vehicle.model}</h2>
          <p className="text-sm text-primary my-1">Registration: {vehicle.registration}</p>
          <p className="text-sm text-primary my-1">Odometer: {vehicle.odometer}</p>
        </div>
        <div>
          <Button className='bg-primary hover:bg-[#1B4865]/[0.8] text-white font-semibold'>Select</Button>
        </div>
      </div>
    </div>
  )
}

export default SelectVehicleCard
