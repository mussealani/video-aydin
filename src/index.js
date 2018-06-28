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
          debug: true,
          video: {
          // video constraints: set resolution of camera
          mandatory: {
              minWidth: 320,
              minHeight: 240,
          },
        },
        // dimensions of captured video frames
        frameWidth: 320,
        frameHeight: 240
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

// player.on('error', function(error) {
//   console.log('error:', error);
// });

// // user clicked the record button and started recording
// player.on('startRecord', function() {
//   console.log('started recording!');
// });

player.on('finishRecord', function() {
  // the blob object contains the recorded data that
  // can be downloaded by the user, stored on server etc.
  //console.log('finished recording:', player.recordedData);

  var data = player.recordedData;
  if (player.recordedData.video) {
      // for chrome (when recording audio+video)
      data = player.recordedData.video;
  }
  
  var serverUrl = '/videos';
  var formData = new FormData();
  formData.append('file', data, data.name);

  console.log('uploading recording:', data.name);

  fetch(serverUrl, {
      method: 'POST',
      body: formData
  }).then(
      success => console.log('recording upload complete.')
  ).catch(
      error => console.error('an upload error occurred!')
  );
});