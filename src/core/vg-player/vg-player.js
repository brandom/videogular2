"use strict";
var core_1 = require('@angular/core');
var vg_api_1 = require('../services/vg-api');
var vg_fullscreen_api_1 = require('../services/vg-fullscreen-api');
var vg_utils_1 = require('../services/vg-utils');
var vg_media_1 = require('../vg-media/vg-media');
var VgPlayer = (function () {
    function VgPlayer(ref, api, fsAPI) {
        this.api = api;
        this.fsAPI = fsAPI;
        this.isFullscreen = false;
        this.onPlayerReady = new core_1.EventEmitter();
        this.onMediaReady = new core_1.EventEmitter();
        this.elem = ref.nativeElement;
        this.api.registerElement(this.elem);
    }
    VgPlayer.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.medias.toArray().forEach(function (media) {
            _this.api.registerMedia(media);
        });
        this.fsAPI.init(this.elem, this.medias);
        this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this));
        this.api.onPlayerReady(this.fsAPI);
        this.onPlayerReady.next(this.api);
    };
    VgPlayer.prototype.onChangeFullscreen = function (fsState) {
        if (!this.fsAPI.nativeFullscreen) {
            this.isFullscreen = fsState;
            this.zIndex = fsState ? vg_utils_1.VgUtils.getZIndex().toString() : 'auto';
        }
    };
    VgPlayer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-player',
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: "<ng-content></ng-content>",
                    styles: ["\n        vg-player {\n            font-family: 'videogular';\n            position: relative;\n            display: flex;\n            width: 100%;\n            height: 100%;\n            overflow: hidden;\n            background-color: black;\n        }\n\n        vg-player.fullscreen {\n            position: fixed;\n            left: 0;\n            top: 0;\n        }\n    "],
                    providers: [vg_api_1.VgAPI, vg_fullscreen_api_1.VgFullscreenAPI]
                },] },
    ];
    /** @nocollapse */
    VgPlayer.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
        { type: vg_fullscreen_api_1.VgFullscreenAPI, },
    ];
    VgPlayer.propDecorators = {
        'isFullscreen': [{ type: core_1.HostBinding, args: ['class.fullscreen',] },],
        'zIndex': [{ type: core_1.HostBinding, args: ['style.z-index',] },],
        'onPlayerReady': [{ type: core_1.Output },],
        'onMediaReady': [{ type: core_1.Output },],
        'medias': [{ type: core_1.ContentChildren, args: [vg_media_1.VgMedia,] },],
    };
    return VgPlayer;
}());
exports.VgPlayer = VgPlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctcGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctcGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFTTyxlQUFlLENBQUMsQ0FBQTtBQUN2Qix1QkFBc0Isb0JBQW9CLENBQUMsQ0FBQTtBQUMzQyxrQ0FBZ0MsK0JBQStCLENBQUMsQ0FBQTtBQUNoRSx5QkFBd0Isc0JBQXNCLENBQUMsQ0FBQTtBQUMvQyx5QkFBd0Isc0JBQXNCLENBQUMsQ0FBQTtBQUcvQztJQWVJLGtCQUFZLEdBQWUsRUFBUyxHQUFVLEVBQVMsS0FBc0I7UUFBekMsUUFBRyxHQUFILEdBQUcsQ0FBTztRQUFTLFVBQUssR0FBTCxLQUFLLENBQWlCO1FBWjVFLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBSS9CLGtCQUFhLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBR3RELGlCQUFZLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBTWpELElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUU5QixJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELHFDQUFrQixHQUFsQjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO1lBQ2hDLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTVFLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELHFDQUFrQixHQUFsQixVQUFtQixPQUFnQjtRQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxHQUFHLGtCQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBQ3BFLENBQUM7SUFDTCxDQUFDO0lBQ0UsbUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxNQUFNLEVBQUUsQ0FBRSw2WEFnQlQsQ0FBRTtvQkFDSCxTQUFTLEVBQUUsQ0FBRSxjQUFLLEVBQUUsbUNBQWUsQ0FBRTtpQkFDeEMsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHVCQUFjLEdBQTZEO1FBQ2xGLEVBQUMsSUFBSSxFQUFFLGlCQUFVLEdBQUc7UUFDcEIsRUFBQyxJQUFJLEVBQUUsY0FBSyxHQUFHO1FBQ2YsRUFBQyxJQUFJLEVBQUUsbUNBQWUsR0FBRztLQUN4QixDQUFDO0lBQ0ssdUJBQWMsR0FBMkM7UUFDaEUsY0FBYyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRyxFQUFFLEVBQUU7UUFDdEUsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUcsRUFBRSxFQUFFO1FBQzdELGVBQWUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxFQUFFO1FBQ3BDLGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxFQUFFO1FBQ25DLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLHNCQUFlLEVBQUUsSUFBSSxFQUFFLENBQUMsa0JBQU8sRUFBRyxFQUFFLEVBQUU7S0FDeEQsQ0FBQztJQUNGLGVBQUM7QUFBRCxDQUFDLEFBN0VELElBNkVDO0FBN0VZLGdCQUFRLFdBNkVwQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBPdXRwdXQsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBFbGVtZW50UmVmLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENvbnRlbnRDaGlsZHJlbiwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWZ0FQSSB9IGZyb20gJy4uL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQgeyBWZ0Z1bGxzY3JlZW5BUEkgfSBmcm9tICcuLi9zZXJ2aWNlcy92Zy1mdWxsc2NyZWVuLWFwaSc7XG5pbXBvcnQgeyBWZ1V0aWxzIH0gZnJvbSAnLi4vc2VydmljZXMvdmctdXRpbHMnO1xuaW1wb3J0IHsgVmdNZWRpYSB9IGZyb20gJy4uL3ZnLW1lZGlhL3ZnLW1lZGlhJztcblxuXG5leHBvcnQgY2xhc3MgVmdQbGF5ZXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICBlbGVtOiBIVE1MRWxlbWVudDtcblxuICAgICBpc0Z1bGxzY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgekluZGV4OiBzdHJpbmc7XG5cbiAgICBcbiAgICBvblBsYXllclJlYWR5OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIFxuICAgIG9uTWVkaWFSZWFkeTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBcbiAgICBtZWRpYXM6IFF1ZXJ5TGlzdDxWZ01lZGlhPjtcblxuICAgIGNvbnN0cnVjdG9yKHJlZjogRWxlbWVudFJlZiwgcHVibGljIGFwaTogVmdBUEksIHB1YmxpYyBmc0FQSTogVmdGdWxsc2NyZWVuQVBJKSB7XG4gICAgICAgIHRoaXMuZWxlbSA9IHJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHRoaXMuYXBpLnJlZ2lzdGVyRWxlbWVudCh0aGlzLmVsZW0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5tZWRpYXMudG9BcnJheSgpLmZvckVhY2goKG1lZGlhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFwaS5yZWdpc3Rlck1lZGlhKG1lZGlhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mc0FQSS5pbml0KHRoaXMuZWxlbSwgdGhpcy5tZWRpYXMpO1xuICAgICAgICB0aGlzLmZzQVBJLm9uQ2hhbmdlRnVsbHNjcmVlbi5zdWJzY3JpYmUodGhpcy5vbkNoYW5nZUZ1bGxzY3JlZW4uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5hcGkub25QbGF5ZXJSZWFkeSh0aGlzLmZzQVBJKTtcbiAgICAgICAgdGhpcy5vblBsYXllclJlYWR5Lm5leHQodGhpcy5hcGkpO1xuICAgIH1cblxuICAgIG9uQ2hhbmdlRnVsbHNjcmVlbihmc1N0YXRlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICghdGhpcy5mc0FQSS5uYXRpdmVGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLmlzRnVsbHNjcmVlbiA9IGZzU3RhdGU7XG4gICAgICAgICAgICB0aGlzLnpJbmRleCA9IGZzU3RhdGUgPyBWZ1V0aWxzLmdldFpJbmRleCgpLnRvU3RyaW5nKCkgOiAnYXV0byc7XG4gICAgICAgIH1cbiAgICB9XG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBDb21wb25lbnQsIGFyZ3M6IFt7XG4gICAgc2VsZWN0b3I6ICd2Zy1wbGF5ZXInLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgICBzdHlsZXM6IFsgYFxuICAgICAgICB2Zy1wbGF5ZXIge1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6ICd2aWRlb2d1bGFyJztcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZnLXBsYXllci5mdWxsc2NyZWVuIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgIH1cbiAgICBgIF0sXG4gICAgcHJvdmlkZXJzOiBbIFZnQVBJLCBWZ0Z1bGxzY3JlZW5BUEkgXVxufSwgXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9IFtcbnt0eXBlOiBFbGVtZW50UmVmLCB9LFxue3R5cGU6IFZnQVBJLCB9LFxue3R5cGU6IFZnRnVsbHNjcmVlbkFQSSwgfSxcbl07XG5zdGF0aWMgcHJvcERlY29yYXRvcnM6IHtba2V5OiBzdHJpbmddOiBEZWNvcmF0b3JJbnZvY2F0aW9uW119ID0ge1xuJ2lzRnVsbHNjcmVlbic6IFt7IHR5cGU6IEhvc3RCaW5kaW5nLCBhcmdzOiBbJ2NsYXNzLmZ1bGxzY3JlZW4nLCBdIH0sXSxcbid6SW5kZXgnOiBbeyB0eXBlOiBIb3N0QmluZGluZywgYXJnczogWydzdHlsZS56LWluZGV4JywgXSB9LF0sXG4nb25QbGF5ZXJSZWFkeSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25NZWRpYVJlYWR5JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbidtZWRpYXMnOiBbeyB0eXBlOiBDb250ZW50Q2hpbGRyZW4sIGFyZ3M6IFtWZ01lZGlhLCBdIH0sXSxcbn07XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==