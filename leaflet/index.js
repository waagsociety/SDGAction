const map = L.map('map', { attributionControl: false }).setView([52.25, 5.75], 7.2)
map.scrollWheelZoom.disable()

const options = L.mapboxGL({
  accessToken: 'pk.eyJ1IjoibmF0aGFud2FhZyIsImEiOiJjaXl5N3M2dzkwMDAyMzJteXY1MThzenVlIn0.VjqEnfNyPCbMeT5q8OGrmA',
  style: 'mapbox://styles/mapbox/satellite-v9',
})

options.addTo(map)

map.on('click', function(e) {
  console.log(e)
})

var style = {
  color: "white",
  weight: 2,
  opacity: 1,
  fillOpacity: 1,
}

function valueToColor(value) {
  const absolute = Math.abs(value)
  const s = Math.floor(Math.max(0, 160 - absolute))
  const rgb = [s,s,s]
  const index = value < 0 ? 0 : 2
  rgb[index] = 255
  return 'rgb(' + rgb.join() + ')'
}

const layer = L.geoJSON(geojson, { 
  style,
  onEachFeature: function(feature, layer) {
    layer.on('click', function(e) {
      console.log('whaaaaat')
    })
  }
}).addTo(map)

function random(ceiling) {
  return Math.random() * ceiling
}

layer.eachLayer(function(layer) {
  console.log(valueToColor(random(0, 100)))
  layer.setStyle({
    color: valueToColor(random(-100, 100)),
  })
})


