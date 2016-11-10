var APP = {};

(function() {
	APP = {
		/**
		 * Initialise l'application
		 */
		timerHelp: null,

		initialize: function() {
		},
		/**
		 * 
		 *  toutes les pages via $().ready
		 */
		initPage: function() {
			$('.map__btn').on('click touch',self.openPopinPays);
			$('.popin--pays__offre').on('click touch',self.openPopinOffre);
			$('.map__overlay').on('click touch',self.closeAllPopins);
			$('.popin--pays .popin__close').on('click touch',self.closeAllPopins);
			$('.popin--offre .popin__close').on('click touch',self.closePopin);
			$('.video-link').on('click touch',self.openPopinVideo);
			$('video').on('click touch',self.pauseVideo);
			$('.popin--video .popin__close').on('click touch',self.closeVideo);
			$('.video-overlay').on('click touch',self.closeVideo);
			var el = document.documentElement

			$('.loader').click(self.setFullscreen);
		},

		setFullscreen: function() {
			$('.loader').addClass('hidden');
			var elem = document.getElementById("body");
			req = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen;
      req.call(elem);
		},

		openPopinPays: function() {
			self.closeAllPopins();
			$('.'+$(this).attr('data-open')).find('.popin--pays').removeClass('hidden');
			$('.map__cloud').addClass('hidden');
			$('.map__'+$(this).attr('data-cloud')).removeClass('hidden');
			$('.map__'+$(this).attr('data-open')).removeClass('hidden');
			$('.map').addClass($(this).attr('data-bg'));
			$('.map__overlay').removeClass('hidden');
			self.updateInfo('pays', $(this).attr('data-save'));
		},

		openPopinOffre: function() {
			$('.popin--offre').addClass('hidden');
			$('.popin--pays__offre').removeClass('selected');
			$(this).addClass('selected');	
			$(this).parent().parent().parent().parent().find('.'+$(this).attr('data-open')).toggleClass('hidden');

			self.updateInfo('offre', $(this).attr('data-save'));
		},

		openPopinVideo: function() {
			$('.popin--video').removeClass('hidden');
			$('.video-overlay').removeClass('hidden');
			$('.popin--video video').attr('src', $(this).attr('data-video'));
			
		},

		pauseVideo: function() {
			if ($('video').get(0).paused == false) {
				$('.popin--video').addClass('paused');
		    $('video').get(0).pause();
		  } else {
		    $('video').get(0).play();
		    $('.popin--video').removeClass('paused');
		  }
		},

		closeVideo: function() {
			$('.popin--video').addClass('hidden');
			$('.video-overlay').addClass('hidden');
			$('.popin--video').removeClass('paused');
			$('video').get(0).pause();
			
			$('body').click(null);
		},

		closeAllPopins: function() {
			$('.popin--pays__offre').removeClass('selected');
			$('.popin').addClass('hidden');
			$('video').get(0).pause();
			$('.popin--video').removeClass('paused');
			$('.map__pays').addClass('hidden');
			$('.map').removeClass('map-1');
			$('.map').removeClass('map-2');
			$('.map').removeClass('map-3');
			$('.map').removeClass('map-4');
			$('.map').removeClass('map-5');
			$('.map').removeClass('map-6');
			$('.map').removeClass('map-7');
			$('.map').removeClass('map-8');
			$('.map__overlay').addClass('hidden');
			$('.map__cloud').removeClass('hidden');
		},

		closePopin: function(e) {
			$('.popin--pays__offre').removeClass('selected');
			$(this).parent().parent().addClass('hidden');
		},

		updateInfo: function(type, info) {
			var d = new Date();
			var month = d.getMonth()+1;
			var day = d.getDate();
			if (type == 'pays') {
				self.curPays = info;
				if (localStorage.getItem(day+'_'+month+'_'+info)) {
					numClick = localStorage.getItem(day+'_'+month+'_'+info);
				}else{
					numClick = 0;
				}
				numClick++;
				localStorage.setItem(day+'_'+month+'_'+info, numClick);
			}else{
				if (localStorage.getItem(day+'_'+month+'_'+self.curPays+'_'+info)) {
					numClick = localStorage.getItem(day+'_'+month+'_'+self.curPays+'_'+info);
				}else{
					numClick = 0;
				}
				numClick++;
				localStorage.setItem(day+'_'+month+'_'+self.curPays+'_'+info, numClick);
			}
			
		},

		saveInfos: function() {
			var textFile = new Blob([JSON.stringify(localStorage)], {
			   type: 'text/plain'
			});
			invokeSaveAsDialog(textFile, 'tracking.txt');
		}
	};

	var self = APP;
})();