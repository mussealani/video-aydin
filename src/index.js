import videojs from 'video.js';
import 'webrtc-adapter';
import record from 'videojs-record/dist/videojs.record.js';

const player = videojs('videoRecord', {
  // video.js options
  controls: true,
  loop: false,
  fluid: false,
  width: 320,
  height: 240,
  plugins: {
      // videojs-record plugin options
      record: {
          image: false,
          audio: true,
          video: true,
          maxLength: 5,
          debug: true
      }
  }
}, function(){
  // print version information at startup
  var msg = 'Using video.js ' + videojs.VERSION +
      ' with videojs-record ' + videojs.getPluginVersion('record')
  videojs.log(msg);
});

// error handling
player.on('deviceError', function() {
  console.log('device error:', player.deviceErrorCode);
});
player.on('error', function(error) {
  console.log('error:', error);
});
// user clicked the record button and started recording
player.on('startRecord', function() {
  console.log('started recording!');
});
// user completed recording and stream is available
player.on('finishRecord', function() {
  // the blob object contains the recorded data that
  // can be downloaded by the user, stored on server etc.
  console.log('finished recording: ', player.recordedData);
});