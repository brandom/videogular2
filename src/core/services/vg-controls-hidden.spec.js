"use strict";
var Observable_1 = require('rxjs/Observable');
var vg_controls_hidden_1 = require('./vg-controls-hidden');
describe('VgControlsHidden Service', function () {
    var controlsHidden;
    beforeEach(function () {
        controlsHidden = new vg_controls_hidden_1.VgControlsHidden();
    });
    it('Should provide an Observable', function () {
        expect(controlsHidden.isHidden).toEqual(jasmine.any(Observable_1.Observable));
    });
    it('Should set state to true', function () {
        controlsHidden.isHidden.subscribe(function (state) {
            expect(state).toBe(true);
        });
        controlsHidden.state(true);
    });
    it('Should set state to false', function () {
        controlsHidden.isHidden.subscribe(function (state) {
            expect(state).toBe(false);
        });
        controlsHidden.state(false);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctY29udHJvbHMtaGlkZGVuLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy1jb250cm9scy1oaWRkZW4uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBQTJCLGlCQUFpQixDQUFDLENBQUE7QUFDN0MsbUNBQWlDLHNCQUFzQixDQUFDLENBQUE7QUFFeEQsUUFBUSxDQUFDLDBCQUEwQixFQUFFO0lBQ2pDLElBQUksY0FBZ0MsQ0FBQztJQUVyQyxVQUFVLENBQUM7UUFDUCxjQUFjLEdBQUcsSUFBSSxxQ0FBZ0IsRUFBRSxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDhCQUE4QixFQUFFO1FBQy9CLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQVUsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMEJBQTBCLEVBQUU7UUFDM0IsY0FBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDJCQUEyQixFQUFFO1FBQzVCLGNBQWMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBRUgsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBWZ0NvbnRyb2xzSGlkZGVuIH0gZnJvbSAnLi92Zy1jb250cm9scy1oaWRkZW4nO1xuXG5kZXNjcmliZSgnVmdDb250cm9sc0hpZGRlbiBTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBjb250cm9sc0hpZGRlbjogVmdDb250cm9sc0hpZGRlbjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjb250cm9sc0hpZGRlbiA9IG5ldyBWZ0NvbnRyb2xzSGlkZGVuKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIHByb3ZpZGUgYW4gT2JzZXJ2YWJsZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbnRyb2xzSGlkZGVuLmlzSGlkZGVuKS50b0VxdWFsKGphc21pbmUuYW55KE9ic2VydmFibGUpKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgc2V0IHN0YXRlIHRvIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnRyb2xzSGlkZGVuLmlzSGlkZGVuLnN1YnNjcmliZShzdGF0ZSA9PiB7XG4gICAgICAgICAgICBleHBlY3Qoc3RhdGUpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnRyb2xzSGlkZGVuLnN0YXRlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBzZXQgc3RhdGUgdG8gZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbnRyb2xzSGlkZGVuLmlzSGlkZGVuLnN1YnNjcmliZShzdGF0ZSA9PiB7XG4gICAgICAgICAgICBleHBlY3Qoc3RhdGUpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb250cm9sc0hpZGRlbi5zdGF0ZShmYWxzZSk7XG4gICAgfSk7XG59KTtcblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19