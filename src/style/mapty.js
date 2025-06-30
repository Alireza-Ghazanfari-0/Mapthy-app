'use strict';
//
const form = document.querySelector('.formm');
const selectType = document.querySelector('.selection');
const distance = document.querySelector('.distancee');
const duration = document.querySelector('.durationn');
const cadence = document.querySelector('.cadencee');
const elevation = document.querySelector('.elevationn');
const eleG = document.querySelector('.elevat');
const cad = document.querySelector('.cad');
//
//select running as default by loading page
selectType.value = 1;

//recieve my location to show map around my location
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    //can access my location
    function (position) {
      alert('دسترسی دارددددد');
      console.log('دسترسی دارد');
      const { latitude } = position.coords;
      const { longitude } = position.coords;
    },
    //can not access my location(here we manually set lat long of a location)
    function () {
      alert('دسترسی ندارد');
      console.log('دسترسی ندارد');
      const [latitude, longitude] = [30.3519915, 48.2121041];
      var map = L.map('mapWindow').setView([latitude, longitude], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      /*L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup('آبادان')
        .openPopup();*/

      //var popup = L.popup();
      //click on map
      var new_latlng;
      map.on('click', function (event) {
        console.log([event.latlng.lat, event.latlng.lng]);
        new_latlng = [event.latlng.lat, event.latlng.lng];
        /*popup
          .setLatLng(e.latlng)
          .setContent('You clicked the map at ' + e.latlng.toString())
          .openOn(map);*/
        //////////////
        //show input form
        form.classList.remove('hidden');
        //
      });
      //change between run or cycle
      selectType.addEventListener('change', function () {
        cad.classList.toggle('hidden');
        eleG.classList.toggle('hidden');
      });

      //press enter after filling input form
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        //alert('yesy');
        //define date
        let now = new Date();
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        let Date1 = `${months[now.getMonth()]} ${now.getDate()}`;
        //
        if (
          selectType.value == 1 &&
          distance.value > 0 &&
          duration.value > 0 &&
          cadence.value > 0
        ) {
          let HTML1 = `<div
          class="container ps-4 text-white mx-auto py-2 rounded mb-2"
          style="width: 85%; border-left: 0.5vw solid green; background-color: #42484d;"
        >
          <div class="mb-1">Running on <span>${Date1}</span></div>
          <div class="row">
            <span class="col-auto" style="font-size: smaller"
              ><span>${distance.value}</span> KM</span
            >
            <span class="col-auto" style="font-size: smaller"
              ><span>${duration.value}</span> MIN</span
            >
            <span class="col-auto" style="font-size: smaller"
              ><span>${(duration.value / distance.value).toFixed(
                1
              )}</span> MIN/KM</span
            >
            <span class="col-auto" style="font-size: smaller"
              ><span>${cadence.value}</span> SPM</span
            >
          </div>
        </div>`;
          form.insertAdjacentHTML('afterend', HTML1);
          distance.value = duration.value = cadence.value = '';
          mark();
        } else if (
          selectType.value == 2 &&
          distance.value > 0 &&
          duration.value > 0 &&
          elevation.value > 0
        ) {
          let HTML1 = `<div
          class="container ps-4 text-white mx-auto py-2 rounded mb-2"
          style="width: 85%; border-left: 0.5vw solid orange; background-color: #42484d;"
        >
          <div class="mb-1">Cycling on <span>${Date1}</span></div>
          <div class="row">
            <span class="col-auto" style="font-size: smaller"
              ><span>${distance.value}</span> KM</span
            >
            <span class="col-auto" style="font-size: smaller"
              ><span>${duration.value}</span> MIN</span
            >
            <span class="col-auto" style="font-size: smaller"
              ><span>${(distance.value / (duration.value / 60)).toFixed(
                1
              )}</span> KM/H</span
            >
            <span class="col-auto" style="font-size: smaller"
              ><span>${elevation.value}</span> M</span
            >
          </div>
        </div>`;
          form.insertAdjacentHTML('afterend', HTML1);
          distance.value = duration.value = elevation.value = '';
          mark();
          //
        } else {
          alert('**please Enter Valid Positive NUMBER**');
        }
        //hide input form
        form.classList.add('hidden');
        //

        // show marker on map
        function mark() {
          L.marker(new_latlng)
            .addTo(map)
            .bindPopup(
              L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${
                  selectType.value == 1 ? 'markerCSS1' : 'markerCSS2'
                }`,
              })
            )
            .setPopupContent(
              `${selectType.value == 1 ? 'Running on' : 'Cycling on'} ${Date1}`
            )
            .openPopup();
        }
      });
    }
  );
