"use strict";
///<reference path='./google.ima.ts'/>
var core_1 = require('@angular/core');
var vg_api_1 = require('../core/services/vg-api');
var vg_events_1 = require('../core/events/vg-events');
var vg_fullscreen_api_1 = require('../core/services/vg-fullscreen-api');
var VgImaAds = (function () {
    function VgImaAds(ref, API, fsAPI) {
        var _this = this;
        this.API = API;
        this.fsAPI = fsAPI;
        this.subscriptions = {};
        this.isFullscreen = false;
        this.displayState = 'none';
        this.elem = ref.nativeElement;
        this.onContentEnded = this.onContentEnded.bind(this);
        this.API.playerReadyEvent.subscribe(function (api) { return _this.onPlayerReady(); });
    }
    VgImaAds.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); });
        }
    };
    VgImaAds.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
        this.initializations();
        this.target.subscriptions.ended.subscribe(this.onContentEnded.bind(this));
        this.target.subscriptions.play.subscribe(this.onUpdateState.bind(this));
        this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this));
        this.ima.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded.bind(this), false);
        this.ima.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this), false);
        this.loadAds();
    };
    VgImaAds.prototype.initializations = function () {
        var _this = this;
        this.ima = new Ima(this.elem);
        this.skipButton = document.querySelector(this.vgSkipButton);
        this.skipButton.style.display = 'none';
        this.skipButton.addEventListener('click', this.onClickSkip.bind(this));
        this.elem.insertBefore(this.skipButton, this.elem.firstChild);
        window.addEventListener('resize', function () {
            var w = _this.API.videogularElement.offsetWidth;
            var h = _this.API.videogularElement.offsetHeight;
            if (_this.ima.adsManager) {
                if (_this.isFullscreen) {
                    _this.ima.adsManager.resize(w, h, google.ima.ViewMode.FULLSCREEN);
                }
                else {
                    _this.ima.adsManager.resize(w, h, google.ima.ViewMode.NORMAL);
                }
            }
        });
    };
    VgImaAds.prototype.loadAds = function () {
        var _this = this;
        if (this.vgCompanion) {
            googletag.cmd.push(function () {
                var adUnitPath = '/' + _this.vgNetwork + '/' + _this.vgUnitPath;
                var slot = googletag.defineSlot(adUnitPath, _this.vgCompanionSize, _this.vgCompanion);
                if (slot) {
                    slot.addService(googletag.companionAds());
                    slot.addService(googletag.pubads());
                    googletag
                        .companionAds()
                        .setRefreshUnfilledSlots(true);
                    googletag
                        .pubads()
                        .enableVideoAds();
                    googletag.enableServices();
                }
            });
        }
    };
    VgImaAds.prototype.onUpdateState = function (event) {
        switch (event.type) {
            case vg_events_1.VgEvents.VG_PLAY:
                if (!this.ima.adsLoaded) {
                    this.API.pause();
                    this.ima.adDisplayContainer.initialize();
                    this.requestAds(this.vgAdTagUrl);
                    this.ima.adsLoaded = true;
                }
                break;
        }
    };
    VgImaAds.prototype.requestAds = function (adTagUrl) {
        // Show only to get computed style in pixels
        this.show();
        var adsRequest = new google.ima.AdsRequest();
        var computedStyle = window.getComputedStyle(this.elem);
        adsRequest.adTagUrl = adTagUrl;
        adsRequest.linearAdSlotWidth = parseInt(computedStyle.width, 10);
        adsRequest.linearAdSlotHeight = parseInt(computedStyle.height, 10);
        adsRequest.nonLinearAdSlotWidth = parseInt(computedStyle.width, 10);
        adsRequest.nonLinearAdSlotHeight = parseInt(computedStyle.height, 10);
        this.ima.adsLoader.requestAds(adsRequest);
    };
    VgImaAds.prototype.onAdsManagerLoaded = function (evt) {
        this.show();
        this.ima.adsManager = evt.getAdsManager(this.target);
        this.processAdsManager(this.ima.adsManager);
    };
    VgImaAds.prototype.processAdsManager = function (adsManager) {
        var w = this.API.videogularElement.offsetWidth;
        var h = this.API.videogularElement.offsetHeight;
        // Attach the pause/resume events.
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.onContentPauseRequested.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.onContentResumeRequested.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, this.onSkippableStateChanged.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.onAllAdsComplete.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, this.onAdComplete.bind(this), false);
        this.ima.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this), false);
        this.ima.adsManager.init(w, h, google.ima.ViewMode.NORMAL);
        this.ima.adsManager.start();
    };
    VgImaAds.prototype.onSkippableStateChanged = function () {
        var isSkippable = this.ima.adsManager.getAdSkippableState();
        if (isSkippable) {
            this.skipButton.style.display = 'block';
        }
        else {
            this.skipButton.style.display = 'none';
        }
    };
    VgImaAds.prototype.onClickSkip = function () {
        this.ima.adsManager.skip();
    };
    VgImaAds.prototype.onContentPauseRequested = function () {
        this.show();
        this.API.pause();
    };
    VgImaAds.prototype.onContentResumeRequested = function () {
        this.API.play();
        this.hide();
    };
    VgImaAds.prototype.onAdError = function (evt) {
        if (this.ima.adsManager) {
            this.ima.adsManager.destroy();
        }
        this.hide();
        this.API.play();
    };
    VgImaAds.prototype.onAllAdsComplete = function () {
        this.hide();
        // The last ad was a post-roll
        if (this.ima.adsManager.getCuePoints().join().indexOf('-1') >= 0) {
            this.API.pause(); // it was stop() in Videogular v1
        }
    };
    VgImaAds.prototype.onAdComplete = function () {
        // TODO: Update view with current ad count
        this.ima.currentAd++;
    };
    VgImaAds.prototype.show = function () {
        window.dispatchEvent(new CustomEvent(vg_events_1.VgEvents.VG_START_ADS));
        this.displayState = 'block';
    };
    VgImaAds.prototype.hide = function () {
        window.dispatchEvent(new CustomEvent(vg_events_1.VgEvents.VG_END_ADS));
        this.displayState = 'none';
    };
    VgImaAds.prototype.onContentEnded = function () {
        this.ima.adsLoader.contentComplete();
    };
    VgImaAds.prototype.onChangeFullscreen = function (fsState) {
        if (!this.fsAPI.nativeFullscreen) {
            this.isFullscreen = fsState;
        }
    };
    VgImaAds.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-ima-ads',
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: "<div class=\"vg-ima-ads\"></div>",
                    styles: ["\n        vg-ima-ads {\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            z-index: 300;\n        }\n        vg-ima-ads .vg-ima-ads {\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            pointer-events: none;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    VgImaAds.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
        { type: vg_fullscreen_api_1.VgFullscreenAPI, },
    ];
    VgImaAds.propDecorators = {
        'vgFor': [{ type: core_1.Input },],
        'vgNetwork': [{ type: core_1.Input },],
        'vgUnitPath': [{ type: core_1.Input },],
        'vgCompanion': [{ type: core_1.Input },],
        'vgCompanionSize': [{ type: core_1.Input },],
        'vgAdTagUrl': [{ type: core_1.Input },],
        'vgSkipButton': [{ type: core_1.Input },],
        'displayState': [{ type: core_1.HostBinding, args: ['style.display',] },],
    };
    return VgImaAds;
}());
exports.VgImaAds = VgImaAds;
var Ima = (function () {
    function Ima(imaAdsElement) {
        this.adDisplayContainer = new google.ima.AdDisplayContainer(imaAdsElement);
        this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
        this.adsManager = null;
        this.adsLoaded = false;
        this.currentAd = 0;
    }
    return Ima;
}());
exports.Ima = Ima;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctaW1hLWFkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZnLWltYS1hZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFzQztBQUN0QyxxQkFBNkUsZUFBZSxDQUFDLENBQUE7QUFFN0YsdUJBQXNCLHlCQUF5QixDQUFDLENBQUE7QUFDaEQsMEJBQXlCLDBCQUEwQixDQUFDLENBQUE7QUFDcEQsa0NBQWdDLG9DQUFvQyxDQUFDLENBQUE7QUFHckU7SUFrQkksa0JBQVksR0FBZSxFQUFTLEdBQVUsRUFBUyxLQUFzQjtRQWxCakYsaUJBMFJDO1FBeFF1QyxRQUFHLEdBQUgsR0FBRyxDQUFPO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFON0Usa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFDeEIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFHN0IsaUJBQVksR0FBVyxNQUFNLENBQUM7UUFHM0IsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsMkJBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBRSxFQUFwQixDQUFv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LFlBQUssRUFBRSxFQUFFO1FBQ2pDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7UUFDckMsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7UUFDaEMsY0FBYyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7UUFDbEMsY0FBYyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUcsRUFBRSxFQUFFO0tBQ2xFLENBQUM7SUFDRixlQUFDO0FBQUQsQ0FBQyxBQTFSRCxJQTBSQztBQTFSWSxnQkFBUSxXQTBScEIsQ0FBQTtBQUdEO0lBT0ksYUFBWSxhQUEwQjtRQUNsQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVuRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0wsVUFBQztBQUFELENBQUMsQUFmRCxJQWVDO0FBZlksV0FBRyxNQWVmLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9Jy4vZ29vZ2xlLmltYS50cycvPlxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgSG9zdEJpbmRpbmcsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJUGxheWFibGUgfSBmcm9tICcuLi9jb3JlL3ZnLW1lZGlhL2ktcGxheWFibGUnO1xuaW1wb3J0IHsgVmdBUEkgfSBmcm9tICcuLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQgeyBWZ0V2ZW50cyB9IGZyb20gJy4uL2NvcmUvZXZlbnRzL3ZnLWV2ZW50cyc7XG5pbXBvcnQgeyBWZ0Z1bGxzY3JlZW5BUEkgfSBmcm9tICcuLi9jb3JlL3NlcnZpY2VzL3ZnLWZ1bGxzY3JlZW4tYXBpJztcblxuXG5leHBvcnQgY2xhc3MgVmdJbWFBZHMge1xuICAgICB2Z0Zvcjogc3RyaW5nO1xuICAgICB2Z05ldHdvcms6IHN0cmluZztcbiAgICAgdmdVbml0UGF0aDogc3RyaW5nO1xuICAgICB2Z0NvbXBhbmlvbjogc3RyaW5nO1xuICAgICB2Z0NvbXBhbmlvblNpemU6IEFycmF5PE51bWJlcj47XG4gICAgIHZnQWRUYWdVcmw6IHN0cmluZztcbiAgICAgdmdTa2lwQnV0dG9uOiBzdHJpbmc7XG5cbiAgICBlbGVtOiBIVE1MRWxlbWVudDtcbiAgICB0YXJnZXQ6IElQbGF5YWJsZTtcbiAgICBpbWE6IEltYTtcbiAgICBzdWJzY3JpcHRpb25zOiBhbnkgPSB7fTtcbiAgICBpc0Z1bGxzY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBza2lwQnV0dG9uOiBIVE1MRWxlbWVudDtcblxuICAgICBkaXNwbGF5U3RhdGU6IHN0cmluZyA9ICdub25lJztcblxuICAgIGNvbnN0cnVjdG9yKHJlZjogRWxlbWVudFJlZiwgcHVibGljIEFQSTogVmdBUEksIHB1YmxpYyBmc0FQSTogVmdGdWxsc2NyZWVuQVBJKSB7XG4gICAgICAgIHRoaXMuZWxlbSA9IHJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLm9uQ29udGVudEVuZGVkID0gdGhpcy5vbkNvbnRlbnRFbmRlZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLkFQSS5wbGF5ZXJSZWFkeUV2ZW50LnN1YnNjcmliZSgoYXBpKSA9PiB0aGlzLm9uUGxheWVyUmVhZHkoKSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLkFQSS5pc1BsYXllclJlYWR5KSB7XG4gICAgICAgICAgICB0aGlzLm9uUGxheWVyUmVhZHkoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuQVBJLnBsYXllclJlYWR5RXZlbnQuc3Vic2NyaWJlKCgpID0+IHRoaXMub25QbGF5ZXJSZWFkeSgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUGxheWVyUmVhZHkoKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5BUEkuZ2V0TWVkaWFCeUlkKHRoaXMudmdGb3IpO1xuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6YXRpb25zKCk7XG5cbiAgICAgICAgdGhpcy50YXJnZXQuc3Vic2NyaXB0aW9ucy5lbmRlZC5zdWJzY3JpYmUodGhpcy5vbkNvbnRlbnRFbmRlZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy50YXJnZXQuc3Vic2NyaXB0aW9ucy5wbGF5LnN1YnNjcmliZSh0aGlzLm9uVXBkYXRlU3RhdGUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5mc0FQSS5vbkNoYW5nZUZ1bGxzY3JlZW4uc3Vic2NyaWJlKHRoaXMub25DaGFuZ2VGdWxsc2NyZWVuLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuaW1hLmFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgZ29vZ2xlLmltYS5BZHNNYW5hZ2VyTG9hZGVkRXZlbnQuVHlwZS5BRFNfTUFOQUdFUl9MT0FERUQsXG4gICAgICAgICAgICB0aGlzLm9uQWRzTWFuYWdlckxvYWRlZC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pbWEuYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SLFxuICAgICAgICAgICAgdGhpcy5vbkFkRXJyb3IuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5sb2FkQWRzKCk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6YXRpb25zKCkge1xuICAgICAgICB0aGlzLmltYSA9IG5ldyBJbWEodGhpcy5lbGVtKTtcblxuICAgICAgICB0aGlzLnNraXBCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMudmdTa2lwQnV0dG9uKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgdGhpcy5za2lwQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuc2tpcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGlja1NraXAuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuZWxlbS5pbnNlcnRCZWZvcmUodGhpcy5za2lwQnV0dG9uLCB0aGlzLmVsZW0uZmlyc3RDaGlsZCk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHcgPSB0aGlzLkFQSS52aWRlb2d1bGFyRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGggPSB0aGlzLkFQSS52aWRlb2d1bGFyRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmltYS5hZHNNYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hLmFkc01hbmFnZXIucmVzaXplKHcsIGgsIGdvb2dsZS5pbWEuVmlld01vZGUuRlVMTFNDUkVFTik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYS5hZHNNYW5hZ2VyLnJlc2l6ZSh3LCBoLCBnb29nbGUuaW1hLlZpZXdNb2RlLk5PUk1BTCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkQWRzKCkge1xuICAgICAgICBpZiAodGhpcy52Z0NvbXBhbmlvbikge1xuICAgICAgICAgICAgZ29vZ2xldGFnLmNtZC5wdXNoKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRVbml0UGF0aDogc3RyaW5nID0gJy8nICsgdGhpcy52Z05ldHdvcmsgKyAnLycgKyB0aGlzLnZnVW5pdFBhdGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsb3Q6IGdvb2dsZXRhZy5TbG90ID0gZ29vZ2xldGFnLmRlZmluZVNsb3QoYWRVbml0UGF0aCwgdGhpcy52Z0NvbXBhbmlvblNpemUsIHRoaXMudmdDb21wYW5pb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzbG90KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90LmFkZFNlcnZpY2UoZ29vZ2xldGFnLmNvbXBhbmlvbkFkcygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsb3QuYWRkU2VydmljZShnb29nbGV0YWcucHViYWRzKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBnb29nbGV0YWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29tcGFuaW9uQWRzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0UmVmcmVzaFVuZmlsbGVkU2xvdHModHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGdvb2dsZXRhZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wdWJhZHMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lbmFibGVWaWRlb0FkcygpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBnb29nbGV0YWcuZW5hYmxlU2VydmljZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblVwZGF0ZVN0YXRlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFZnRXZlbnRzLlZHX1BMQVk6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmltYS5hZHNMb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BUEkucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWEuYWREaXNwbGF5Q29udGFpbmVyLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0QWRzKHRoaXMudmdBZFRhZ1VybCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hLmFkc0xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVxdWVzdEFkcyhhZFRhZ1VybDogc3RyaW5nKSB7XG4gICAgICAgIC8vIFNob3cgb25seSB0byBnZXQgY29tcHV0ZWQgc3R5bGUgaW4gcGl4ZWxzXG4gICAgICAgIHRoaXMuc2hvdygpO1xuXG4gICAgICAgIGNvbnN0IGFkc1JlcXVlc3QgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZXF1ZXN0KCk7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW0pO1xuICAgICAgICBhZHNSZXF1ZXN0LmFkVGFnVXJsID0gYWRUYWdVcmw7XG5cbiAgICAgICAgYWRzUmVxdWVzdC5saW5lYXJBZFNsb3RXaWR0aCA9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUud2lkdGgsIDEwKTtcbiAgICAgICAgYWRzUmVxdWVzdC5saW5lYXJBZFNsb3RIZWlnaHQgPSBwYXJzZUludChjb21wdXRlZFN0eWxlLmhlaWdodCwgMTApO1xuICAgICAgICBhZHNSZXF1ZXN0Lm5vbkxpbmVhckFkU2xvdFdpZHRoID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS53aWR0aCwgMTApO1xuICAgICAgICBhZHNSZXF1ZXN0Lm5vbkxpbmVhckFkU2xvdEhlaWdodCA9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUuaGVpZ2h0LCAxMCk7XG5cbiAgICAgICAgdGhpcy5pbWEuYWRzTG9hZGVyLnJlcXVlc3RBZHMoYWRzUmVxdWVzdCk7XG4gICAgfVxuXG4gICAgb25BZHNNYW5hZ2VyTG9hZGVkKGV2dDogZ29vZ2xlLmltYS5BZHNNYW5hZ2VyTG9hZGVkRXZlbnQpIHtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIHRoaXMuaW1hLmFkc01hbmFnZXIgPSBldnQuZ2V0QWRzTWFuYWdlcih0aGlzLnRhcmdldCk7XG4gICAgICAgIHRoaXMucHJvY2Vzc0Fkc01hbmFnZXIodGhpcy5pbWEuYWRzTWFuYWdlcik7XG4gICAgfVxuXG4gICAgcHJvY2Vzc0Fkc01hbmFnZXIoYWRzTWFuYWdlcjogZ29vZ2xlLmltYS5BZHNNYW5hZ2VyKSB7XG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLkFQSS52aWRlb2d1bGFyRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgY29uc3QgaCA9IHRoaXMuQVBJLnZpZGVvZ3VsYXJFbGVtZW50Lm9mZnNldEhlaWdodDtcblxuICAgICAgICAvLyBBdHRhY2ggdGhlIHBhdXNlL3Jlc3VtZSBldmVudHMuXG4gICAgICAgIHRoaXMuaW1hLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUEFVU0VfUkVRVUVTVEVELFxuICAgICAgICAgICAgdGhpcy5vbkNvbnRlbnRQYXVzZVJlcXVlc3RlZC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pbWEuYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVELFxuICAgICAgICAgICAgdGhpcy5vbkNvbnRlbnRSZXN1bWVSZXF1ZXN0ZWQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaW1hLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNLSVBQQUJMRV9TVEFURV9DSEFOR0VELFxuICAgICAgICAgICAgdGhpcy5vblNraXBwYWJsZVN0YXRlQ2hhbmdlZC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pbWEuYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQsXG4gICAgICAgICAgICB0aGlzLm9uQWxsQWRzQ29tcGxldGUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaW1hLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTVBMRVRFLFxuICAgICAgICAgICAgdGhpcy5vbkFkQ29tcGxldGUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaW1hLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgIGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1IsXG4gICAgICAgICAgICB0aGlzLm9uQWRFcnJvci5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmltYS5hZHNNYW5hZ2VyLmluaXQodywgaCwgZ29vZ2xlLmltYS5WaWV3TW9kZS5OT1JNQUwpO1xuICAgICAgICB0aGlzLmltYS5hZHNNYW5hZ2VyLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgb25Ta2lwcGFibGVTdGF0ZUNoYW5nZWQoKSB7XG4gICAgICAgIGNvbnN0IGlzU2tpcHBhYmxlID0gdGhpcy5pbWEuYWRzTWFuYWdlci5nZXRBZFNraXBwYWJsZVN0YXRlKCk7XG5cbiAgICAgICAgaWYgKGlzU2tpcHBhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnNraXBCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNraXBCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xpY2tTa2lwKCkge1xuICAgICAgICB0aGlzLmltYS5hZHNNYW5hZ2VyLnNraXAoKTtcbiAgICB9XG5cbiAgICBvbkNvbnRlbnRQYXVzZVJlcXVlc3RlZCgpIHtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIHRoaXMuQVBJLnBhdXNlKCk7XG4gICAgfVxuXG4gICAgb25Db250ZW50UmVzdW1lUmVxdWVzdGVkKCkge1xuICAgICAgICB0aGlzLkFQSS5wbGF5KCk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIG9uQWRFcnJvcihldnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaW1hLmFkc01hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaW1hLmFkc01hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB0aGlzLkFQSS5wbGF5KCk7XG4gICAgfVxuXG4gICAgb25BbGxBZHNDb21wbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIC8vIFRoZSBsYXN0IGFkIHdhcyBhIHBvc3Qtcm9sbFxuICAgICAgICBpZiAodGhpcy5pbWEuYWRzTWFuYWdlci5nZXRDdWVQb2ludHMoKS5qb2luKCkuaW5kZXhPZignLTEnKSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLkFQSS5wYXVzZSgpOyAvLyBpdCB3YXMgc3RvcCgpIGluIFZpZGVvZ3VsYXIgdjFcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQWRDb21wbGV0ZSgpIHtcbiAgICAgICAgLy8gVE9ETzogVXBkYXRlIHZpZXcgd2l0aCBjdXJyZW50IGFkIGNvdW50XG4gICAgICAgIHRoaXMuaW1hLmN1cnJlbnRBZCsrO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChWZ0V2ZW50cy5WR19TVEFSVF9BRFMpKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5U3RhdGUgPSAnYmxvY2snO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChWZ0V2ZW50cy5WR19FTkRfQURTKSk7XG4gICAgICAgIHRoaXMuZGlzcGxheVN0YXRlID0gJ25vbmUnO1xuICAgIH1cblxuICAgIG9uQ29udGVudEVuZGVkKCkge1xuICAgICAgICB0aGlzLmltYS5hZHNMb2FkZXIuY29udGVudENvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgb25DaGFuZ2VGdWxsc2NyZWVuKGZzU3RhdGU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLmZzQVBJLm5hdGl2ZUZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuaXNGdWxsc2NyZWVuID0gZnNTdGF0ZTtcbiAgICAgICAgfVxuICAgIH1cbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcbiAgICBzZWxlY3RvcjogJ3ZnLWltYS1hZHMnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidmctaW1hLWFkc1wiPjwvZGl2PmAsXG4gICAgc3R5bGVzOiBbIGBcbiAgICAgICAgdmctaW1hLWFkcyB7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIHotaW5kZXg6IDMwMDtcbiAgICAgICAgfVxuICAgICAgICB2Zy1pbWEtYWRzIC52Zy1pbWEtYWRzIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIH1cbiAgICBgIF1cbn0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSBbXG57dHlwZTogRWxlbWVudFJlZiwgfSxcbnt0eXBlOiBWZ0FQSSwgfSxcbnt0eXBlOiBWZ0Z1bGxzY3JlZW5BUEksIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbid2Z0Zvcic6IFt7IHR5cGU6IElucHV0IH0sXSxcbid2Z05ldHdvcmsnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4ndmdVbml0UGF0aCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbid2Z0NvbXBhbmlvbic6IFt7IHR5cGU6IElucHV0IH0sXSxcbid2Z0NvbXBhbmlvblNpemUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4ndmdBZFRhZ1VybCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbid2Z1NraXBCdXR0b24nOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4nZGlzcGxheVN0YXRlJzogW3sgdHlwZTogSG9zdEJpbmRpbmcsIGFyZ3M6IFsnc3R5bGUuZGlzcGxheScsIF0gfSxdLFxufTtcbn1cblxuXG5leHBvcnQgY2xhc3MgSW1hIHtcbiAgICBhZERpc3BsYXlDb250YWluZXI6IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyO1xuICAgIGFkc0xvYWRlcjogZ29vZ2xlLmltYS5BZHNMb2FkZXI7XG4gICAgYWRzTWFuYWdlcjogZ29vZ2xlLmltYS5BZHNNYW5hZ2VyO1xuICAgIGFkc0xvYWRlZDogYm9vbGVhbjtcbiAgICBjdXJyZW50QWQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGltYUFkc0VsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuYWREaXNwbGF5Q29udGFpbmVyID0gbmV3IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyKGltYUFkc0VsZW1lbnQpO1xuICAgICAgICB0aGlzLmFkc0xvYWRlciA9IG5ldyBnb29nbGUuaW1hLkFkc0xvYWRlcih0aGlzLmFkRGlzcGxheUNvbnRhaW5lcik7XG5cbiAgICAgICAgdGhpcy5hZHNNYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgdGhpcy5hZHNMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jdXJyZW50QWQgPSAwO1xuICAgIH1cbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19