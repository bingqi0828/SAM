mapboxgl.accessToken = 'pk.eyJ1IjoiYXNkZmphc2kiLCJhIjoiY2t3dHNrajRyMDk3bTJvcnEwa3VyNHl2cCJ9.mTaXflbpgrOZs0FJBdmbHw';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/light-v10',
zoom: 13,
center: [-86.250275, 41.676388]
});

function swtichstyles() {
  var x = document.getElementById("layershere");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function swtichlayers() {
  
  var x = document.getElementById("options");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function pilotcheck() {
  var x = document.getElementById("appizy");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

var dropdown = document.getElementsByClassName("dropdown-btn");
var j;

for (j = 0; j < dropdown.length; j++) {
  dropdown[j].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

const layerList = document.getElementById('layershere');
const inputs = layerList.getElementsByTagName('input');
 
for (const input of inputs) {
input.onclick = (layer) => {
const layerId = layer.target.id;
map.setStyle('mapbox://styles/mapbox/' + layerId);
};
}

function addLayerBefore(addLayerFn, layer, beforeId) {
    // check beforeId defined and exists on the map
    const beforeLayer = Boolean(beforeId) && map.getLayer(beforeId);
      if (beforeLayer && beforeId === beforeLayer.id) addLayerFn(layer, beforeId);
      else {
        console.warn(
          `Not found layer with id '${beforeId}'.\nLayer '${layer.id}' added without before.`
        );
        addLayerFn(layer);
      }
    };


function addFacilityLayer() {
        map.addSource('facility', {
            type: 'geojson',
            data: 'FAA_UAS_FacilityMap_Data_V5.geojson',
            tolerance: 0.75,
            
            });
      
        // define the function to add layer
        const addLayer = (layer, beforeId) => map.addLayer(layer, beforeId);
      
        addLayerBefore(
          addLayer,
          {
            'id': 'facility',
            'type': 'fill',
            'source': 'facility',
            'paint': {
            'fill-color': '#ff69b4',
            'fill-opacity': 0.2
            }
            
            },
          "waterway-label"
        );
      };
         
function addRestrictionLayer() {
    map.addSource('restriction', {
        type: 'geojson',
        data: 'National_Security_UAS_Flight_Restrictions.geojson'
        });
      
        // define the function to add layer
        const addLayer = (layer, beforeId) => map.addLayer(layer, beforeId);
      
        addLayerBefore(
          addLayer,
          {
            'id': 'restriction',
            'type': 'fill',
            'source': 'restriction',
            'paint': {
                'fill-color': 'blue',
                'fill-opacity': 0.2
                }
            },
          "waterway-label"
        );
      };
      
function addPartLayer() {
    map.addSource('part_time', {
        type: 'geojson',
        // Use any Mapbox-hosted tileset using its tileset id.
        // Learn more about where to find a tileset id:
        // https://docs.mapbox.com/help/glossary/tileset-id/
        data: 'Part_Time_National_Security_UAS_Flight_Restrictions.geojson'
        });
          
            // define the function to add layer
            const addLayer = (layer, beforeId) => map.addLayer(layer, beforeId);
          
            addLayerBefore(
              addLayer,
              {
                'id': 'part_time',
                'type': 'fill',
                'source': 'part_time',
                'paint': {
                    'fill-color': 'black',
                    'fill-opacity': 0.2
                    }
                },
              "waterway-label"
            );
          };

function addRecreationLayer() {
    map.addSource('recreational', {
        type: 'geojson',
        data: 'Recreational_Flyer_Fixed_Sites.geojson'
        });
                  
        const addLayer = (layer, beforeId) => map.addLayer(layer, beforeId);
                  
                    addLayerBefore(
                      addLayer,
                      {
                        'id': 'recreational',
                        'type': 'fill',
                        'source': 'recreational',
                        'paint': {
                            'fill-color': 'green',
                            'fill-opacity': 0.4
                            }
                        },
                      "waterway-label"
                    );
                  };
                  
map.on("load", function () {
                    // add layer to the map on load
                    addFacilityLayer();
                    addRestrictionLayer();
                    addPartLayer();
                    addRecreationLayer();
                  
                    const layerList = document.getElementById("layershere");
                    const inputs = layerList.getElementsByTagName("input");
                  
                    function switchLayer(layer) {
                      map.once("styledata", addFacilityLayer);
                      map.once("styledata", addRestrictionLayer);
                      map.once("styledata", addPartLayer);
                      map.once("styledata", addRecreationLayer);
                      const layerId = layer.target.id;
                      map.setStyle("mapbox://styles/mapbox/" + layerId);
                    }
                  
                    // set toggle base style events
                    for (let i = 0; i < inputs.length; i++) {
                      inputs[i].onclick = switchLayer;
                    }

                    map.on('click', 'facility', (e) => {
                        const address = e.features[0].properties.APT1_NAME;
                         
                        new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(address)
                        .addTo(map);
                        });
                    
                    map.on('mouseenter', 'facility', () => {
                            map.getCanvas().style.cursor = 'pointer';
                            });
                        
                    map.on('mouseleave', 'facility', () => {
                            map.getCanvas().style.cursor = '';
                            });

                    map.on('click', 'restriction', (e) => {
                        const address = e.features[0].properties.Facility;
                         
                        new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(address)
                        .addTo(map);
                        });
                    
                    map.on('mouseenter', 'restriction', () => {
                            map.getCanvas().style.cursor = 'pointer';
                            });
                        
                    map.on('mouseleave', 'restriction', () => {
                            map.getCanvas().style.cursor = '';
                            });

                    map.on('click', 'part_time', (e) => {
                        const address = e.features[0].properties.Facility;
                         
                        new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(address)
                        .addTo(map);
                        });
                    
                    map.on('mouseenter', 'part_time', () => {
                            map.getCanvas().style.cursor = 'pointer';
                            });
                        
                    map.on('mouseleave', 'part_time', () => {
                            map.getCanvas().style.cursor = '';
                            });

                    map.on('click', 'recreational', (e) => {
                        const address = e.features[0].properties.SITE_NAME;
                         
                        new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(address)
                        .addTo(map);
                        });
                    
                    map.on('mouseenter', 'recreational', () => {
                            map.getCanvas().style.cursor = 'pointer';
                            });
                        
                    map.on('mouseleave', 'recreational', () => {
                            map.getCanvas().style.cursor = '';
                            });
                  });

const draw = new MapboxDraw({
            displayControlsDefault: false,
            // Select which mapbox-gl-draw control buttons to add to the map.
            controls: {
            polygon: true,
            trash: true
            },
            // Set mapbox-gl-draw to draw by default.
            // The user does not have to click the polygon control button first.
            //defaultMode: 'draw_polygon'
            });

map.addControl(draw);

map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);

map.addControl(
  new mapboxgl.GeolocateControl({
  positionOptions: {
  enableHighAccuracy: true
  },
  // When active the map will receive updates to the device's location as it changes.
  trackUserLocation: true,
  // Draw an arrow next to the location dot to indicate which direction the device is heading.
  showUserHeading: true
  })
  );
  
function updateArea(e) {
const data = draw.getAll();
const answer = document.getElementById('calculated-area');
if (data.features.length > 0) {
const area = turf.area(data);
// Restrict the area to 2 decimal points.
const rounded_area = Math.round(area * 100) / 100;
answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
} else {
answer.innerHTML = '';
if (e.type !== 'draw.delete')
alert('Click the map to draw a polygon.');
}
}


map.on('idle', () => {
    // If these layers were not added to the map, abort
    if (!map.getLayer('facility') || !map.getLayer('restriction') || !map.getLayer('part_time') || !map.getLayer('recreational')   ) {
        return;
    }

    // Enumerate ids of the layers.
    const toggleableLayerIds = ['facility', 'restriction', 'part_time', 'recreational'];
    const layers = [
      'FAA UAS facility',
      'Flight restriction',
      'Part-time restriction',
      'Recreational sites'
      ];
      const colors = [
      '#ff69b4',
      'blue',
      'black',
      'green'
      ];

    let i=0;
    // Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIds) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
            continue;
        }
        const color = colors[i];
        const key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;

        // Create a link.
        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        link.textContent = id;
        link.className = 'active';

        // Show or hide layer when the toggle is clicked.
        link.onclick = function (e) {
            const clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

            const visibility = map.getLayoutProperty(
                clickedLayer,
                'visibility'
            );

            // Toggle layer visibility by changing the layout object's visibility property.
            if (visibility === 'visible') {
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            } else {
                this.className = 'active';
                map.setLayoutProperty(
                    clickedLayer,
                    'visibility',
                    'visible'
                );
            }
           
        };

        const layersnow = document.getElementById('options');
        layersnow.appendChild(key);
        layersnow.appendChild(link);
        
        i=i+1;
    }
});

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
    });
     
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

