import CurrentVehicleCard from '@/components/CurrentVehicleCard'
import Footer from '@/components/Footer'
import AppLayout from '@/components/Layouts/AppLayout'
import SelectVehicleCard from '@/components/SelectVehicleCard'

const AvailableVehicles = () => {
  const availableVehicles = [
    {
      make: 'Ford',
      model: 'Mondeo',
      registration: 'GA403CA',
      odometer: '120,606 km',
    },
    {
      make: 'Dacia',
      model: 'Jogger',
      registration: 'GA222CA',
      odometer: '81,711 km',
    },
    {
      make: 'Volkswagen',
      model: 'Crafter',
      registration: 'GG333CA',
      odometer: '97,155 km',
    },
    {
      make: 'Nissan',
      model: 'Navara',
      registration: 'GA405CA',
      odometer: '100,006 km',
    }
  ]

  return (
    <AppLayout header={null}>
      <div className="py-12 px-1">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <CurrentVehicleCard />
          {availableVehicles.map(vehicle => <SelectVehicleCard key={vehicle.registration} vehicle={vehicle} />)}
        </div>
      </div>
      <Footer />
    </AppLayout>
  )
}

export default AvailableVehicles
