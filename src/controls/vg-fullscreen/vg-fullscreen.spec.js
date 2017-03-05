"use strict";
var vg_fullscreen_1 = require("./vg-fullscreen");
var vg_api_1 = require("../../core/services/vg-api");
var vg_fullscreen_api_1 = require("../../core/services/vg-fullscreen-api");
describe('Videogular Player', function () {
    var fullscreen;
    var ref;
    var api;
    var fsAPI;
    beforeEach(function () {
        ref = {
            nativeElement: {
                getAttribute: function (name) {
                    return name;
                }
            }
        };
        api = new vg_api_1.VgAPI();
        fsAPI = new vg_fullscreen_api_1.VgFullscreenAPI();
        fullscreen = new vg_fullscreen_1.VgFullscreen(ref, api, fsAPI);
    });
    it('Should get media by id on init', function () {
        spyOn(api, 'getMediaById').and.callFake(function () { });
        fullscreen.vgFor = 'test';
        fullscreen.onPlayerReady();
        expect(api.getMediaById).toHaveBeenCalledWith('test');
    });
    describe('onClick', function () {
        beforeEach(function () {
            spyOn(fsAPI, 'toggleFullscreen');
        });
        it('Should call toggleFullscreen with null param if target is API', function () {
            fullscreen.target = api;
            fullscreen.onClick();
            expect(fsAPI.toggleFullscreen).toHaveBeenCalledWith(null);
        });
        it('Should call toggleFullscreen with target param if target', function () {
            fullscreen.target = 'test';
            fullscreen.onClick();
            expect(fsAPI.toggleFullscreen).toHaveBeenCalledWith('test');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctZnVsbHNjcmVlbi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctZnVsbHNjcmVlbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4QkFBMkIsaUJBQWlCLENBQUMsQ0FBQTtBQUM3Qyx1QkFBb0IsNEJBQTRCLENBQUMsQ0FBQTtBQUVqRCxrQ0FBOEIsdUNBQXVDLENBQUMsQ0FBQTtBQUV0RSxRQUFRLENBQUMsbUJBQW1CLEVBQUU7SUFDMUIsSUFBSSxVQUF3QixDQUFDO0lBQzdCLElBQUksR0FBYyxDQUFDO0lBQ25CLElBQUksR0FBUyxDQUFDO0lBQ2QsSUFBSSxLQUFxQixDQUFDO0lBRTFCLFVBQVUsQ0FBQztRQUNQLEdBQUcsR0FBRztZQUNGLGFBQWEsRUFBRTtnQkFDWCxZQUFZLEVBQUUsVUFBQyxJQUFJO29CQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7YUFDSjtTQUNKLENBQUM7UUFFRixHQUFHLEdBQUcsSUFBSSxjQUFLLEVBQUUsQ0FBQztRQUNsQixLQUFLLEdBQUcsSUFBSSxtQ0FBZSxFQUFFLENBQUM7UUFDOUIsVUFBVSxHQUFHLElBQUksNEJBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO1FBQ2pDLEtBQUssQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFRLENBQUMsQ0FBQyxDQUFDO1FBRW5ELFVBQVUsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQzFCLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUUzQixNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFELENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFNBQVMsRUFBRTtRQUNoQixVQUFVLENBQUM7WUFDUCxLQUFLLENBQUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsK0RBQStELEVBQUU7WUFDaEUsVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFFeEIsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXJCLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywwREFBMEQsRUFBRTtZQUMzRCxVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUUzQixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFckIsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VmdGdWxsc2NyZWVufSBmcm9tIFwiLi92Zy1mdWxsc2NyZWVuXCI7XG5pbXBvcnQge1ZnQVBJfSBmcm9tIFwiLi4vLi4vY29yZS9zZXJ2aWNlcy92Zy1hcGlcIjtcbmltcG9ydCB7RWxlbWVudFJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7VmdGdWxsc2NyZWVuQVBJfSBmcm9tIFwiLi4vLi4vY29yZS9zZXJ2aWNlcy92Zy1mdWxsc2NyZWVuLWFwaVwiO1xuXG5kZXNjcmliZSgnVmlkZW9ndWxhciBQbGF5ZXInLCAoKSA9PiB7XG4gICAgbGV0IGZ1bGxzY3JlZW46IFZnRnVsbHNjcmVlbjtcbiAgICBsZXQgcmVmOkVsZW1lbnRSZWY7XG4gICAgbGV0IGFwaTpWZ0FQSTtcbiAgICBsZXQgZnNBUEk6VmdGdWxsc2NyZWVuQVBJO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHJlZiA9IHtcbiAgICAgICAgICAgIG5hdGl2ZUVsZW1lbnQ6IHtcbiAgICAgICAgICAgICAgICBnZXRBdHRyaWJ1dGU6IChuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBhcGkgPSBuZXcgVmdBUEkoKTtcbiAgICAgICAgZnNBUEkgPSBuZXcgVmdGdWxsc2NyZWVuQVBJKCk7XG4gICAgICAgIGZ1bGxzY3JlZW4gPSBuZXcgVmdGdWxsc2NyZWVuKHJlZiwgYXBpLCBmc0FQSSk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGdldCBtZWRpYSBieSBpZCBvbiBpbml0JywgKCkgPT4ge1xuICAgICAgICBzcHlPbihhcGksICdnZXRNZWRpYUJ5SWQnKS5hbmQuY2FsbEZha2UoKCkgPT4geyB9KTtcblxuICAgICAgICBmdWxsc2NyZWVuLnZnRm9yID0gJ3Rlc3QnO1xuICAgICAgICBmdWxsc2NyZWVuLm9uUGxheWVyUmVhZHkoKTtcblxuICAgICAgICBleHBlY3QoYXBpLmdldE1lZGlhQnlJZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ3Rlc3QnKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbkNsaWNrJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGZzQVBJLCAndG9nZ2xlRnVsbHNjcmVlbicpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnU2hvdWxkIGNhbGwgdG9nZ2xlRnVsbHNjcmVlbiB3aXRoIG51bGwgcGFyYW0gaWYgdGFyZ2V0IGlzIEFQSScsICgpID0+IHtcbiAgICAgICAgICAgIGZ1bGxzY3JlZW4udGFyZ2V0ID0gYXBpO1xuXG4gICAgICAgICAgICBmdWxsc2NyZWVuLm9uQ2xpY2soKTtcblxuICAgICAgICAgICAgZXhwZWN0KGZzQVBJLnRvZ2dsZUZ1bGxzY3JlZW4pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG51bGwpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnU2hvdWxkIGNhbGwgdG9nZ2xlRnVsbHNjcmVlbiB3aXRoIHRhcmdldCBwYXJhbSBpZiB0YXJnZXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBmdWxsc2NyZWVuLnRhcmdldCA9ICd0ZXN0JztcblxuICAgICAgICAgICAgZnVsbHNjcmVlbi5vbkNsaWNrKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChmc0FQSS50b2dnbGVGdWxsc2NyZWVuKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgndGVzdCcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=