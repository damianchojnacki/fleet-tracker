import CurrentVehicleCard from '@/components/CurrentVehicleCard'
import Footer from '@/components/Footer'
import AppLayout from '@/components/Layouts/AppLayout'
import { NewTripCard } from '@/components/NewTripCard'

const Dashboard = () => {
  return (
    <AppLayout header={null}>
      <div className="py-12 px-1">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <CurrentVehicleCard />
          <NewTripCard />
        </div>
      </div>
      <Footer />
    </AppLayout>
  )
}

export default Dashboard
