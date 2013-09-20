cordova.define("cordova/plugin/html5video", function(require, exports, module) {
	var exec = require("cordova/exec");
	var Html5Video = function() {
	};

	Html5Video.prototype._videos = {};
	Html5Video.prototype._callbacks = {};
	Html5Video.prototype._pausedTime = 0;

	/*
	 * videos - a map between html video tag ids and the file name of the video
	 * they play. In addition, file names must be all lowercase, with only
	 * alpha-numeric characters
	 */
	Html5Video.prototype.initialize = function(videos) {
		var me = this;

		if (!videos)
			return false;

		me._videos = videos;
		if (device.platform == 'Android') {
			return cordova.exec(function(result) {
				me._videos = result;
			}, function(err) {
				console.error('html video error: ' + err);
			}, 'Html5Video', 'initialize', [ videos ]);
		}
	};

	/*
	 * videoId - the html video tag id of the video to play callback - a
	 * function that is called when the video has finished playing
	 */
	Html5Video.prototype.play = function(videoId, callback) {
		var me = this;
		me._callbacks[videoId] = callback;

		if (device.platform == 'Android') {
			return cordova.exec(function(result) {			
			}, function(err) {
				console.error('html video error: ' + err);
			}, 'Html5Video', 'play', [ videoId ]);
		} else {
			this._playVideo(document.getElementById(videoId));
		}
	}

	Html5Video.prototype._play = function(video) {
		var me = this,
			videoId = video.id;

		video.src = me._videos[videoId];
		//video.setAttribute('poster', video.getAttribute('poster'));		

		if (!!me._callbacks[videoId]) {
			video.addEventListener("timeupdate", function() {
				if (video.duration > 0
						&& video.duration - video.currentTime == 0) {
					video.removeEventListener("timeupdate", this, false);
					me._callbacks[videoId](video);
				}
			}, false);
		}
		
		video.addEventListener("canplay", function(){
			video.removeEventListener("canplay", this, false);
			video.play();
		}, false);
		
		video.play();
	}
	
	/*
	 * videoId - the html video tag id of the video to play 
	 * callback - a function that is called when the video has finished playing
	 */
	/*Html5Video.prototype.pause = function(videoId, callback) {
		var me = this;
		me._callbacks[videoId] = callback;

		if (device.platform == 'Android') {
			return cordova.exec(function(result) {			
			}, function(err) {
				console.error('html video error: ' + err);
			}, 'Html5Video', 'pause', [ videoId ]);
		} else {
			this._pauseVideo(document.getElementById(videoId));
		}
	}

	Html5Video.prototype._pause = function(video) {
		var me = this,
			videoId = video.id;

		video.src = me._videos[videoId];		
		
		video.pause();
	}*/

	module.exports = new Html5Video();
});

if (!window.plugins) {
	window.plugins = {};
}
if (!window.plugins.html5Video) {
	window.plugins.html5Video = cordova.require("cordova/plugin/html5video");
}