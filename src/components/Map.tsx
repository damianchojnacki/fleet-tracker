import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, ZoomControl } from 'react-leaflet'
import L, { LatLng } from 'leaflet'
import SheetBar from './Sheet'

const Map: React.FC = () => {
  const [position, setPosition] = useState<LatLng | null>(null)
  const [clicked, setClicked] = useState(false)

  function LocationMarker() {
    const map = useMapEvents({
      click() {
        if (!clicked) {
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
      iconUrl: 'data:image/svg+xml;base64,CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9InJnYigxNSwgMjMsIDQxKSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzTmFtZT0ibHVjaWRlIGx1Y2lkZS1jYXIiPgogICAgPHBhdGggZD0iTTE5IDE3aDJjLjYgMCAxLS40IDEtMXYtM2MwLS45LS43LTEuNy0xLjUtMS45QzE4LjcgMTAuNiAxNiAxMCAxNiAxMHMtMS4zLTEuNC0yLjItMi4zYy0uNS0uNC0xLjEtLjctMS44LS43SDVjLS42IDAtMS4xLjQtMS40LjlsLTEuNCAyLjlBMy43IDMuNyAwIDAgMCAyIDEydjRjMCAuNi40IDEgMSAxaDIiIC8+CiAgICA8Y2lyY2xlIGN4PSI3IiBjeT0iMTciIHI9IjIiIC8+CiAgICA8cGF0aCBkPSJNOSAxN2g2IiAvPgogICAgPGNpcmNsZSBjeD0iMTciIGN5PSIxNyIgcj0iMiIgLz4KPC9zdmc+Cg==',
      iconSize: [30, 30]
    })

    return position === null ? null : (
      <Marker position={position} icon={customIcon}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  function MyLocation() {
    return (
      <div className=' z-50 fixed bottom-28 left-4'>
        <svg xmlns="http://www.w3.org/2000/svg" fill='rgb(15, 23, 41)' height="30" width="30" viewBox="0 -960 960 960"><path d="M440-42v-80q-125-14-214.5-103.5T122-440H42v-80h80q14-125 103.5-214.5T440-838v-80h80v80q125 14 214.5 103.5T838-520h80v80h-80q-14 125-103.5 214.5T520-122v80h-80Zm40-158q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-120q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400Zm0-80Z" /></svg>
      </div>
    )
  }

  return (
    <div className='my-3'>
      <MyLocation />
      <SheetBar />
      <MapContainer center={[52.22, 21.01]} zoom={13} className="absolute top-0 left-0 h-[calc(100vh-64px-80px)] xs:h-[calc(100vh-64px-56px)] w-full z-10" zoomControl={false}>
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
