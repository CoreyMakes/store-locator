function t(t){return t&&"object"==typeof t&&"default"in t?t.default:t}var e=t(require("event-emitter")),i=t(require("google-maps"));function o(){this.emitter=new e,this.actions={},this.filters={},this.previousRequest={},this.addAction("Bus/getPreviousRequest",this.getPreviousRequest,this)}o.prototype.addAction=function(t,e,i){this.actions[t]={ctx:i,fn:e}},o.prototype.removeAction=function(t){delete this.actions[t]},o.prototype.on=function(){this.emitter.on.apply(this.emitter,arguments)},o.prototype.off=function(){this.emitter.off.apply(this.emitter,arguments)},o.prototype.emit=function(){this.emitter.emit.apply(this.emitter,arguments)},o.prototype.applyFilter=function(t,e){var i=this.filters[t];return i&&i.fn&&i.fn.bind?i.fn(e):e},o.prototype.addFilter=function(t,e,i){void 0===i&&(i=!1),this.filters[t]={ctx:i,fn:e}},o.prototype.destroy=function(){this.emitter=null},o.prototype.getPreviousRequest=function(t,e){Object.assign(t,this.previousRequest),e(t)};var n={lookup:function(t,e){e({locations:[]})},settings:{key:"",lang:"en",region:"US",center:{lat:40.7190658,lng:-73.9969894},zoom:15,styles:{},disableDefaultUI:!0,zoomControl:!0,gestureHandling:"cooperative",icon:function(t){return"//image.png"},iconSize:function(t,e){return 1.5*e},paginate:!0,pageSize:50,mobilePageSize:5,mobileBreakpoint:1e3},elements:{map:".js-map",sidebar:".js-sidebar",form:".js-form",pagination:".js-pagination",nextPage:".js-next",prevPage:".js-prev",filter:".js-filter",redo:".js-redo",geolocation:".js-geolocation",geolocationFeedback:".js-geolocation-feedback"},templates:{sidebar:function(t){return"<li>"+t.name+"</li>"},marker:function(t){return"<div>"+t.name+"</div>"},empty:function(){return"<p>No Results Found</p>"}}};function s(){}function a(t,e,i){var o=t.lookup;void 0===e&&(e=[]),this.bus=i,this.lookup=o,this.createQueue(e)()}a.prototype.createQueue=function(t,e){var i=this;return void 0===e&&(e={}),t.length?((t=t.filter(function(t){return i.bus.actions[t]})).push(function(){i.lookup(e,function(t){i.endQueue(e,t)})}),t.reverse().reduce(function(t,o){return i.bus.actions[o].fn.bind(i.bus.actions[o].ctx,e,t)})):(this.lookup(e,function(t){i.endQueue(e,t)}),s)},a.prototype.endQueue=function(t,e){this.bus.previousRequest=Object.assign({},t),this.bus.emit("response",t,Object.assign({locations:[]},e))};var r=function(t){return t.classList.add("is-visible")},h=function(t){return t.classList.remove("is-visible")},u=function(t,e){return t.classList.contains(e)},c=function(t){return t.preventDefault()},p=function(t,e,i){return void 0===e&&(e=document),void 0===i&&(i=!1),i?[].slice.call(e.querySelectorAll(t)):e.querySelector(t)},g=function(t,e,i,o){return t.addEventListener||(e="on"+e),(t.addEventListener||t.attachEvent).call(t,e,i,o),i},l=function(t,e,i,o){return t.removeEventListener||(e="on"+e),(t.removeEventListener||t.detachEvent).call(t,e,i,o),i},d=function(t){var e={us:/^\d{5}([\-]?\d{4})?$/,uk:/^(GIR|[A-Z]\d[A-Z\d]??|[A-Z]{2}\d[A-Z\d]??)[ ]??(\d[A-Z]{2})$/,de:/^\b((?:0[1-46-9]\d{3})|(?:[1-357-9]\d{4})|(?:[4][0-24-9]\d{3})|(?:[6][013-9]\d{3}))\b$/,ca:/^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]) {0,1}(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$/,fr:/^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/,it:/^(V-|I-)?[0-9]{5}$/,au:/^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/,nl:/^[1-9][0-9]{3}\s?([a-zA-Z]{2})?$/,es:/^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/,dk:/^([D|d][K|k]( |-))?[1-9]{1}[0-9]{3}$/,se:/^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/,be:/^[1-9]{1}[0-9]{3}$/,in:/^\d{6}$/};return void 0!==e[t]&&e[t]};function m(t,e){var o=t.settings,n=t.elements,s=t.templates;this.bus=e,this.settings=o,this.elements=n,this.templates=s,this.markers=[],this.google={},this.map=p(n.map),this.redo=p(n.redo),this.updateMap=this.updateMap.bind(this),this.focusOnMarker=this.focusOnMarker.bind(this),this.updateIcons=this.updateIcons.bind(this),this.showCenterButton=this.showCenterButton.bind(this),this.onRedo=this.onRedo.bind(this),e.on("response",this.updateMap),e.on("focus-on-marker",this.focusOnMarker),e.on("zoom-changed",this.updateIcons),e.on("dragend",this.showCenterButton),e.addAction("Map/Geocode",this.geocode,this),e.addAction("Map/getCenter",this.getCenter,this),e.addAction("Map/hideCenterButton",this.hideCenterButton,this),this.redo&&g(this.redo,"click",this.onRedo),i.LIBRARIES=["geometry","places"],i.KEY=o.key,i.LANGUAGE=o.lang,i.REGION=o.region,i.load(this.googleHasLoaded.bind(this))}function f(t,e){var i=t.elements;this.bus=e,this.form=p(i.form),this.onSubmit=this.onSubmit.bind(this),this.form&&(g(this.form,"submit",this.onSubmit),e.addAction("Form/validate",this.validate,this),e.addAction("Form/getValues",this.getValues,this),e.on("response",this.updateAddress.bind(this)))}function b(t,e){var i=this,o=t.elements,n=t.templates;this.bus=e,this.templates=n,this.sidebar=p(o.sidebar),this.filters=p(o.filter,document,!0)||[],this.geolocation=p(o.geolocation,document,!0)||[],this.geolocationFeedback=p(o.geolocationFeedback,document,!0)||[],this.onGeolocationClick=this.onGeolocationClick.bind(this),this.onFilterChange=this.onFilterChange.bind(this),this.onResponse=this.onResponse.bind(this),this.sidebar&&(this.geolocation.length&&this.geolocation.map(function(t){g(t,"click",i.onGeolocationClick)}),this.filters.length&&this.filters.map(function(t){g(t,"change",i.onFilterChange)}),e.on("response",this.onResponse),e.addAction("Sidebar/getFilters",this.getFilters,this),e.addAction("Sidebar/geolocation",this.askForGeolocation,this))}function y(t,e){var i=t.elements,o=t.settings;this.bus=e,this.settings=o,this.elements=i,this.paginate=o.paginate,this.pagination=p(i.pagination),this.pagination&&(this.left=p(i.prevPage,this.pagination),this.right=p(i.nextPage,this.pagination)),this.page=0,this.onClick=this.onClick.bind(this),this.onResponse=this.onResponse.bind(this),this.getPageSize=this.getPageSize.bind(this),this.paginate&&this.pagination&&g(this.pagination,"click",this.onClick),this.paginate&&(e.on("response",this.onResponse),e.addAction("Pagination/pageSize",this.addPageSizeToRequest,this),e.addAction("Pagination/getCurrentPage",this.getCurrentPage,this))}function v(t){var e=this;void 0===t&&(t={});var i=t.elements;this.settings={lookup:t.lookup||n.lookup,settings:Object.assign({},n.settings,t.settings),elements:Object.assign({},n.elements,i)};var s=Object.assign({},n.templates,t.templates);Object.keys(s).map(function(t){s[t]=s[t].bind(e)}),this.settings.templates=s,this.bus=new o,this.map=new m(this.settings,this.bus),this.form=new f(this.settings,this.bus),this.sidebar=new b(this.settings,this.bus),this.pagination=new y(this.settings,this.bus),this.on("request",this.triggerRequest.bind(this))}m.prototype.googleHasLoaded=function(t){var e=this;this.google.core=t,this.google.geocoder=new t.maps.Geocoder;var i=this.settings;this.google.map=new t.maps.Map(this.map,{center:i.center,zoom:i.zoom,styles:i.styles,disableDefaultUI:i.disableDefaultUI,zoomControl:i.zoomControl,gestureHandling:i.gestureHandling}),this.google.map.addListener("dragend",function(){return e.bus.emit("dragend")}),this.google.map.addListener("zoom_changed",function(){return e.bus.emit("zoom-changed")})},m.prototype.onRedo=function(t){t&&c(t),t&&t.target&&h(t.target),this.bus.emit("request",this.bus.applyFilter("Map/onRedo/request",["Form/validate","Form/getValues","Map/hideCenterButton","Map/getCenter","Sidebar/getFilters","Pagination/pageSize","Pagination/getCurrentPage","Map/Geocode"]))},m.prototype.updateMap=function(t,e){var i={lat:Number(t.lat),lng:Number(t.lng)};this.resetCenter(i),this.removeMarkers(),this.addMarker(Object.assign({},i,{center:!0}),0,!1,!0),this.addMarkers(t,e)},m.prototype.resetCenter=function(t){this.google.map.setCenter(t)},m.prototype.removeMarkers=function(){this.markers.forEach(function(t){return t.marker.setMap(null)}),this.markers=[]},m.prototype.addMarkers=function(t,e){var i=this,o=e.locations;void 0===o&&(o=[]),o.length!==[]&&o.map(function(t,e){i.addMarker(t,e+1)})},m.prototype.addMarker=function(t,e,i,o){void 0===i&&(i=!1),void 0===o&&(o=!1);var n=this.settings.iconSize(t,this.google.map.getZoom());i=new this.google.core.maps.Marker({position:{lat:Number(t.lat),lng:Number(t.lng)},icon:{url:this.settings.icon(t),scaledSize:new this.google.core.maps.Size(n,n)},zIndex:e,map:this.google.map}),o?i.name="center":(i.html=this.createMarkerHTML(t),i.addListener("click",this.showModal.bind(this,i)),i.name=t.name),this.markers.push({location:t,marker:i})},m.prototype.showModal=function(t){this.InfoWindow||(this.InfoWindow=new this.google.core.maps.InfoWindow({map:this.google.map})),this.InfoWindow.setContent(t.html),this.InfoWindow.open(this.google.map,t)},m.prototype.createMarkerHTML=function(t){return this.templates.marker(t)},m.prototype.focusOnMarker=function(t){var e=this.markers.map(function(t){return t.marker})[t+1];this.resetCenter(e.getPosition()),this.showModal(e)},m.prototype.updateIcons=function(){var t=this;this.markers.forEach(function(e){var i=e.location,o=e.marker,n=t.settings.iconSize(i,t.google.map.getZoom());o.setIcon({url:t.settings.icon(i),scaledSize:new t.google.core.maps.Size(n,n)})})},m.prototype.showCenterButton=function(){this.redo&&r(this.redo)},m.prototype.geocode=function(t,e){var i=function(t){return void 0===t&&(t={}),t.lat&&t.lng?{location:{lat:t.lat,lng:t.lng}}:d(t.region)&&d(t.region).test(t.address)?{componentRestrictions:{country:t.region,postalCode:t.address}}:Object.assign({},{address:t.address},t.region?{region:t.region}:{})}(t),o=!i.location;this.google.geocoder.geocode(i,function(i,n){if("OK"===n){var s=i[0]||{};t.address=s.formatted_address||t.address,o&&(t.lat=s.geometry.location.lat(),t.lng=s.geometry.location.lng())}else console.error("geocode error");e(t)})},m.prototype.getCenter=function(t,e){var i=this.google.map.getCenter();Object.assign(t,{lat:i.lat(),lng:i.lng(),address:!1}),e(t)},m.prototype.hideCenterButton=function(t,e){h(this.redo),e(t)},m.prototype.destroy=function(){l(this.redo,"click",this.onRedo),i.release()},f.prototype.onSubmit=function(t){t&&c(t),this.bus.emit("request",this.bus.applyFilter("Form/onSubmit/request",["Form/validate","Form/getValues","Sidebar/getFilters","Pagination/pageSize","Pagination/getCurrentPage","Map/Geocode"]))},f.prototype.validate=function(t,e){e()},f.prototype.getValues=function(t,e){p("[name]",this.form,!0).map(function(e){e.value&&(t[e.getAttribute("name")]=e.value)}),e(t)},f.prototype.updateAddress=function(t,e){var i=p('[name="address"]',this.form);i&&(i.value=t.address)},f.prototype.destroy=function(){this.form&&l(this.form,"submit",this.onSubmit)},b.prototype.onGeolocationClick=function(t){t&&c(t),this.bus.emit("request",this.bus.applyFilter("Sidebar/onGeolocationClick/request",["Form/getValues","Pagination/pageSize","Pagination/getCurrentPage","Sidebar/geolocation","Sidebar/getFilters","Map/Geocode"]))},b.prototype.onFilterChange=function(t){t&&c(t),this.bus.emit("request",this.bus.applyFilter("Sidebar/onFilterChange/request",["Form/getValues","Sidebar/getFilters","Pagination/pageSize","Map/Geocode"]))},b.prototype.onResponse=function(t,e){var i;(i=this.sidebar)&&(i.innerHTML=""),this.addToSidebar(e)},b.prototype.addToSidebar=function(t){var e=this;if(!t.locations.length)return this.noResults();this.sidebar.scrollTop=0,t.locations.map(function(t,i){var o=document.createElement("div");g(o,"click",function(t){return e.showMarker(t,i)}),o.innerHTML=e.templates.sidebar(t),e.sidebar.appendChild(o)})},b.prototype.showMarker=function(t,e){t.target.getAttribute("href")||(t&&c(t),this.bus.emit("focus-on-marker",e,t))},b.prototype.noResults=function(){this.sidebar.innerHTML=this.templates.empty()},b.prototype.getFilters=function(t,e){var i=this.filters.reduce(function(t,e){var i=e.getAttribute("name");return e.checked?(t[i]||(t[i]=[]),t[e.getAttribute("name")].push(e.value),t):t},{});Object.keys(i).length?e(Object.assign(t,i)):e(t)},b.prototype.askForGeolocation=function(t,e){this.geolocation.length&&this.geolocation.forEach(function(t){t.style.display="none"}),this.geolocationFeedback.length&&this.geolocationFeedback.forEach(function(t){return r(t)}),navigator.geolocation.getCurrentPosition(function(i){e(Object.assign(t,{lat:i.coords.latitude,lng:i.coords.longitude}))})},b.prototype.destroy=function(){var t=this;this.geolocation.length&&this.geolocation.map(function(e){l(e,"click",t.onGeolocationClick)}),this.filters.length&&this.filters.map(function(e){l(e,"change",t.onFilterChange)})},y.prototype.onClick=function(t){t&&c(t),!1!==this.incrementPage(t)&&this.bus.emit("request",this.bus.applyFilter("Pagination/onClick/request",["Bus/getPreviousRequest","Pagination/pageSize","Pagination/getCurrentPage"]))},y.prototype.onResponse=function(t,e){this.updatePagination(e),this.updateDOM()},y.prototype.incrementPage=function(t){var e=t.target,i=this.elements.prevPage.replace(".",""),o=this.elements.nextPage.replace(".","");return!!u(e,"is-active")&&(u(e,i)?this.page--:!!u(t.target,o)&&this.page++)},y.prototype.updatePagination=function(t){this.pageCount=Number(t.pageCount),this.page=Number(t.page)},y.prototype.addPageSizeToRequest=function(t,e){Object.assign(t,{pageSize:this.getPageSize()}),e(t)},y.prototype.getPageSize=function(){var t=this.settings.pageSize;return window.innerWidth<this.settings.mobileBreakpoint&&this.settings.mobilePageSize&&(this.pageSize=this.settings.mobilePageSize),t},y.prototype.getCurrentPage=function(t,e){e((t.page=this.page,t))},y.prototype.updateDOM=function(){this.pagination&&this.pageCount>1&&this.pagination.classList.add("is-active"),this.left&&this.left.classList[this.hasPrevPage()?"add":"remove"]("is-active"),this.right&&this.right.classList[this.hasNextPage()?"add":"remove"]("is-active")},y.prototype.hasPrevPage=function(){return this.page>=1},y.prototype.hasNextPage=function(){return this.page+1<this.pageCount},y.prototype.destroy=function(){this.pagination&&l(this.pagination,"click",this.onClick)},v.prototype.triggerRequest=function(t){return new a(this.settings,t,this.bus)},v.prototype.on=function(){this.bus.on.apply(this.bus,arguments)},v.prototype.off=function(){this.bus.off.apply(this.bus,arguments)},v.prototype.addAction=function(){this.bus.addAction.apply(this.bus,arguments)},v.prototype.removeAction=function(){this.bus.removeAction.apply(this.bus,arguments)},v.prototype.destroy=function(){this.bus.destroy(),this.map.destroy(),this.form.destroy(),this.sidebar.destroy(),this.pagination.destroy(),this.bus=null,this.map=null,this.form=null,this.sidebar=null,this.pagination=null},module.exports=v;
//# sourceMappingURL=index.js.map
