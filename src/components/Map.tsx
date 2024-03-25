import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, ZoomControl } from 'react-leaflet'
import L, { LatLng } from 'leaflet'

const Map: React.FC = () => {
  const [position, setPosition] = useState<LatLng | null>(null)
  const [clicked, setClicked] = useState(false)

  function LocationMarker() {
    const map = useMapEvents({
      click() {
        if(!clicked) {
            map.locate()
        }

        setClicked(true)
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })

    const customIcon = L.icon({
      iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhciI+PHBhdGggZD0iTTE5IDE3aDJjLjYgMCAxLS40IDEtMXYtM2MwLS45LS43LTEuNy0xLjUtMS45QzE4LjcgMTAuNiAxNiAxMCAxNiAxMHMtMS4zLTEuNC0yLjItMi4zYy0uNS0uNC0xLjEtLjctMS44LS43SDVjLS42IDAtMS4xLjQtMS40LjlsLTEuNCAyLjlBMy43IDMuNyAwIDAgMCAyIDEydjRjMCAuNi40IDEgMSAxaDIiLz48Y2lyY2xlIGN4PSI3IiBjeT0iMTciIHI9IjIiLz48cGF0aCBkPSJNOSAxN2g2Ii8+PGNpcmNsZSBjeD0iMTciIGN5PSIxNyIgcj0iMiIvPjwvc3ZnPg==',
      iconSize: [36, 36]
    })

    return position === null ? null : (
      <Marker position={position} icon={customIcon}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  return (
    <div className='my-3'>
      <MapContainer center={[52.22, 21.01]} zoom={13} className="absolute top-0 left-0 h-[86vh] md:h-[92vh] w-full z-10" zoomControl={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          zIndex={1}
        />
        <LocationMarker />
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  )
}

export default Map
