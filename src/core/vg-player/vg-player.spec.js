"use strict";
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var vg_player_1 = require("./vg-player");
var vg_api_1 = require("../services/vg-api");
var vg_fullscreen_api_1 = require("../services/vg-fullscreen-api");
describe('Videogular Player', function () {
    var player;
    var ref;
    var api;
    var fsAPI;
    beforeEach(function () {
        ref = {
            nativeElement: {
                querySelectorAll: function () {
                    return [{}];
                }
            }
        };
        api = new vg_api_1.VgAPI();
        fsAPI = new vg_fullscreen_api_1.VgFullscreenAPI();
        player = new vg_player_1.VgPlayer(ref, api, fsAPI);
    });
    it('Should handle native fullscreen', function () {
        fsAPI.nativeFullscreen = true;
        player.onChangeFullscreen(true);
        expect(player.isFullscreen).toBeFalsy();
    });
    it('Should handle emulated fullscreen enabled', function () {
        fsAPI.nativeFullscreen = false;
        player.onChangeFullscreen(true);
        expect(player.isFullscreen).toBeTruthy();
        expect(player.zIndex).toBe('1');
    });
    it('Should handle emulated fullscreen enabled', function () {
        fsAPI.nativeFullscreen = false;
        player.onChangeFullscreen(false);
        expect(player.isFullscreen).toBeFalsy();
        expect(player.zIndex).toBe('auto');
    });
});
describe('Videogular Player', function () {
    var builder;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [VgPlayerTest, vg_player_1.VgPlayer]
        });
    });
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.compileComponents();
    }));
    it('Should create a VgPlayer component', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(VgPlayerTest);
        fixture.detectChanges();
        var compiled = fixture.debugElement.nativeElement;
        var video = compiled.querySelector('video');
        expect(video.controls).toBe(true);
    }));
});
var VgPlayerTest = (function () {
    function VgPlayerTest() {
    }
    VgPlayerTest.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n        <vg-player>\n            <video vg-media id=\"singleVideo\" preload=\"auto\" controls>\n                <source src=\"http://static.videogular.com/assets/videos/videogular.mp4\" type=\"video/mp4\">\n                <source src=\"http://static.videogular.com/assets/videos/videogular.ogg\" type=\"video/ogg\">\n                <source src=\"http://static.videogular.com/assets/videos/videogular.webm\" type=\"video/webm\">\n            </video>\n        </vg-player>\n    ",
                    providers: [vg_api_1.VgAPI]
                },] },
    ];
    /** @nocollapse */
    VgPlayerTest.ctorParameters = [];
    return VgPlayerTest;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctcGxheWVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy1wbGF5ZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsd0JBQXFDLHVCQUF1QixDQUFDLENBQUE7QUFDN0QscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLDBCQUF1QixhQUFhLENBQUMsQ0FBQTtBQUVyQyx1QkFBb0Isb0JBQW9CLENBQUMsQ0FBQTtBQUN6QyxrQ0FBOEIsK0JBQStCLENBQUMsQ0FBQTtBQUc5RCxRQUFRLENBQUMsbUJBQW1CLEVBQUU7SUFDMUIsSUFBSSxNQUFlLENBQUM7SUFDcEIsSUFBSSxHQUFjLENBQUM7SUFDbkIsSUFBSSxHQUFTLENBQUM7SUFDZCxJQUFJLEtBQXFCLENBQUM7SUFFMUIsVUFBVSxDQUFDO1FBQ1AsR0FBRyxHQUFHO1lBQ0YsYUFBYSxFQUFFO2dCQUNYLGdCQUFnQixFQUFFO29CQUNkLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoQixDQUFDO2FBQ0o7U0FDSixDQUFDO1FBRUYsR0FBRyxHQUFHLElBQUksY0FBSyxFQUFFLENBQUM7UUFDbEIsS0FBSyxHQUFHLElBQUksbUNBQWUsRUFBRSxDQUFDO1FBQzlCLE1BQU0sR0FBRyxJQUFJLG9CQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtRQUNsQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBRTlCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDJDQUEyQyxFQUFFO1FBQzVDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFFL0IsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMkNBQTJDLEVBQUU7UUFDNUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUUvQixNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFakMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLG1CQUFtQixFQUFFO0lBQzFCLElBQUksT0FBTyxDQUFDO0lBRVosVUFBVSxDQUFDO1FBQ1AsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUMzQixZQUFZLEVBQUUsQ0FBQyxZQUFZLEVBQUUsb0JBQVEsQ0FBQztTQUN6QyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxlQUFLLENBQUM7UUFDYixpQkFBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDaEMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLEVBQUUsQ0FBQyxvQ0FBb0MsRUFDbkMsZUFBSyxDQUFDO1FBQ0YsSUFBSSxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEQsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3hCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBQ2xELElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFNUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQ0wsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDO0FBR0g7SUFBQTtJQWlCQSxDQUFDO0lBakIwQix1QkFBVSxHQUEwQjtRQUMvRCxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsbWVBUVQ7b0JBQ0QsU0FBUyxFQUFFLENBQUMsY0FBSyxDQUFDO2lCQUNyQixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsMkJBQWMsR0FBNkQsRUFDakYsQ0FBQztJQUNGLG1CQUFDO0FBQUQsQ0FBQyxBQWpCRCxJQWlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXN5bmMsIGluamVjdCwgVGVzdEJlZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmUvdGVzdGluZ1wiO1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1ZnUGxheWVyfSBmcm9tIFwiLi92Zy1wbGF5ZXJcIjtcbmltcG9ydCB7VmdNZWRpYX0gZnJvbSBcIi4uL3ZnLW1lZGlhL3ZnLW1lZGlhXCI7XG5pbXBvcnQge1ZnQVBJfSBmcm9tIFwiLi4vc2VydmljZXMvdmctYXBpXCI7XG5pbXBvcnQge1ZnRnVsbHNjcmVlbkFQSX0gZnJvbSBcIi4uL3NlcnZpY2VzL3ZnLWZ1bGxzY3JlZW4tYXBpXCI7XG5pbXBvcnQge0VsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmRlc2NyaWJlKCdWaWRlb2d1bGFyIFBsYXllcicsICgpID0+IHtcbiAgICBsZXQgcGxheWVyOlZnUGxheWVyO1xuICAgIGxldCByZWY6RWxlbWVudFJlZjtcbiAgICBsZXQgYXBpOlZnQVBJO1xuICAgIGxldCBmc0FQSTpWZ0Z1bGxzY3JlZW5BUEk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgcmVmID0ge1xuICAgICAgICAgICAgbmF0aXZlRWxlbWVudDoge1xuICAgICAgICAgICAgICAgIHF1ZXJ5U2VsZWN0b3JBbGw6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFt7fV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGFwaSA9IG5ldyBWZ0FQSSgpO1xuICAgICAgICBmc0FQSSA9IG5ldyBWZ0Z1bGxzY3JlZW5BUEkoKTtcbiAgICAgICAgcGxheWVyID0gbmV3IFZnUGxheWVyKHJlZiwgYXBpLCBmc0FQSSk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGhhbmRsZSBuYXRpdmUgZnVsbHNjcmVlbicsICgpID0+IHtcbiAgICAgICAgZnNBUEkubmF0aXZlRnVsbHNjcmVlbiA9IHRydWU7XG5cbiAgICAgICAgcGxheWVyLm9uQ2hhbmdlRnVsbHNjcmVlbih0cnVlKTtcblxuICAgICAgICBleHBlY3QocGxheWVyLmlzRnVsbHNjcmVlbikudG9CZUZhbHN5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGhhbmRsZSBlbXVsYXRlZCBmdWxsc2NyZWVuIGVuYWJsZWQnLCAoKSA9PiB7XG4gICAgICAgIGZzQVBJLm5hdGl2ZUZ1bGxzY3JlZW4gPSBmYWxzZTtcblxuICAgICAgICBwbGF5ZXIub25DaGFuZ2VGdWxsc2NyZWVuKHRydWUpO1xuXG4gICAgICAgIGV4cGVjdChwbGF5ZXIuaXNGdWxsc2NyZWVuKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChwbGF5ZXIuekluZGV4KS50b0JlKCcxJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGhhbmRsZSBlbXVsYXRlZCBmdWxsc2NyZWVuIGVuYWJsZWQnLCAoKSA9PiB7XG4gICAgICAgIGZzQVBJLm5hdGl2ZUZ1bGxzY3JlZW4gPSBmYWxzZTtcblxuICAgICAgICBwbGF5ZXIub25DaGFuZ2VGdWxsc2NyZWVuKGZhbHNlKTtcblxuICAgICAgICBleHBlY3QocGxheWVyLmlzRnVsbHNjcmVlbikudG9CZUZhbHN5KCk7XG4gICAgICAgIGV4cGVjdChwbGF5ZXIuekluZGV4KS50b0JlKCdhdXRvJyk7XG4gICAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ1ZpZGVvZ3VsYXIgUGxheWVyJywgKCkgPT4ge1xuICAgIGxldCBidWlsZGVyO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIFRlc3RCZWQuY29uZmlndXJlVGVzdGluZ01vZHVsZSh7XG4gICAgICAgICAgICBkZWNsYXJhdGlvbnM6IFtWZ1BsYXllclRlc3QsIFZnUGxheWVyXVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGJlZm9yZUVhY2goYXN5bmMoKCkgPT4ge1xuICAgICAgICBUZXN0QmVkLmNvbXBpbGVDb21wb25lbnRzKCk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ1Nob3VsZCBjcmVhdGUgYSBWZ1BsYXllciBjb21wb25lbnQnLFxuICAgICAgICBhc3luYygoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZml4dHVyZSA9IFRlc3RCZWQuY3JlYXRlQ29tcG9uZW50KFZnUGxheWVyVGVzdCk7XG4gICAgICAgICAgICBmaXh0dXJlLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIGxldCBjb21waWxlZCA9IGZpeHR1cmUuZGVidWdFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICBsZXQgdmlkZW8gPSBjb21waWxlZC5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xuXG4gICAgICAgICAgICBleHBlY3QodmlkZW8uY29udHJvbHMpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pXG4gICAgKTtcbn0pO1xuXG5cbmNsYXNzIFZnUGxheWVyVGVzdCB7c3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogQ29tcG9uZW50LCBhcmdzOiBbe1xuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx2Zy1wbGF5ZXI+XG4gICAgICAgICAgICA8dmlkZW8gdmctbWVkaWEgaWQ9XCJzaW5nbGVWaWRlb1wiIHByZWxvYWQ9XCJhdXRvXCIgY29udHJvbHM+XG4gICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCJodHRwOi8vc3RhdGljLnZpZGVvZ3VsYXIuY29tL2Fzc2V0cy92aWRlb3MvdmlkZW9ndWxhci5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCI+XG4gICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCJodHRwOi8vc3RhdGljLnZpZGVvZ3VsYXIuY29tL2Fzc2V0cy92aWRlb3MvdmlkZW9ndWxhci5vZ2dcIiB0eXBlPVwidmlkZW8vb2dnXCI+XG4gICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCJodHRwOi8vc3RhdGljLnZpZGVvZ3VsYXIuY29tL2Fzc2V0cy92aWRlb3MvdmlkZW9ndWxhci53ZWJtXCIgdHlwZT1cInZpZGVvL3dlYm1cIj5cbiAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgIDwvdmctcGxheWVyPlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbVmdBUEldXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gW1xuXTtcbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19