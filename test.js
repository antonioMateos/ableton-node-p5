console.log('- - - - TEST.JS - - - -');

var Max4Node = require('max4node');

var max = new Max4Node();
max.bind();

// GET Master Track Volume
/*
max.get({
  path: 'live_set master_track mixer_device volume',
  property: 'value'
})
.once('value', function(val) {
  console.log('Master track volume: ' + val);
});
*/

// OBSERVE Master Track Volume
/*
max.observe ({
  path: 'live_set master_track mixer_device volume',
  property: 'value'
})
.on('value', function(val) {
  console.log('Master track volume: ' + val);
});
*/

/* PLAY / STOP A CLIP */
max.call({
  path: 'live_set tracks 1 clip_slots 0 clip',
  method: 'fire'
});

// GET PARAMETERS OF CONTROLS
max.get({
  path: 'live_set tracks 1 devices 0',
  property: 'name'
})
.once('value', function(val) {
  console.log('Device',val);
}); // Kick 808

// TOTAL PARAMETERS ??
/*
max.observe({
  path: 'live_set tracks 1 devices 0 parameters',
  property: 'name'
})
.once('value', function(val) {
  console.log('Total Parameters',val);
}); // -> 15
*/

/* GET ALL PARAMETERS NAMES */
function getAllParams(){

	for(var i=0;i<15;i++){

		var route = 'live_set tracks 1 devices 0 parameters '+i;
		var id = 0;

		/* GET ALL PARAMETERS */
		max.get({
		  path: route,
		  property: 'name'
		})
		.once('value', function(val) {
		  console.log(id,'Kick 808: ',val);
		  id = id+1;
		});

	}

};

//getAllParams();
/* END GET ALL PARAMETER NAMES */

/* BASIC CUSTOM EVENTS STRUCTURE
var events = require('events');
var kickEvent = new events.EventEmitter();
var kickChange = function kickChange(val){
  console.log('Kick 808 LC Value',val);
};
kickEvent.on('change', kickChange);
kickEvent.emit('change',val);
  END BASIC CUSTOM EVENTS STRUCTURE */

/* OBSERVE PARAMETERS -> Kick 808 LC */
exports.kickObs = function(ws) {
	max.observe({
		path: 'live_set tracks 1 devices 0 parameters 1',
		property: 'value'
	})
	.on('value', function(val) {
		console.log('Kick 808 Low Cut =',val);
		if(ws){
		ws.emit('msg', {name: "Kick 808 Low Cut", value: val})
		}
		// EVENT EMITTER => Kick 808 LC Value has change
		// TODO -> Socket to Front => socket.emit('midiMsg',val)
	});
};
/* END OBSERVE PARAMETER -> Kick 808 LC */
