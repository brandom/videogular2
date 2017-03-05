"use strict";
var vg_api_1 = require("./vg-api");
var vg_states_1 = require("../states/vg-states");
describe('Videogular Player', function () {
    var api;
    beforeEach(function () {
        api = new vg_api_1.VgAPI();
    });
    it('Should get the default media', function () {
        api.medias = {
            main: { id: 'main' },
            secondary: { id: 'secondary' }
        };
        expect(api.getDefaultMedia()).toEqual({ id: 'main' });
    });
    describe('getMasterMedia', function () {
        it('Should get the master media', function () {
            api.medias = {
                main: { id: 'main' },
                secondary: { id: 'secondary', vgMedia: true }
            };
            expect(api.getMasterMedia()).toEqual({ id: 'secondary', vgMedia: true });
        });
        it('Should get the default media when no master is defined', function () {
            api.medias = {
                main: { id: 'main' },
                secondary: { id: 'secondary' }
            };
            expect(api.getMasterMedia()).toEqual(api.getDefaultMedia());
        });
    });
    it('Should get the api if we do not pass an id', function () {
        api.medias = {
            main: { id: 'main' },
            secondary: { id: 'secondary' }
        };
        expect(api.getMediaById()).toEqual(api);
    });
    it('Should get the api if we pass an *', function () {
        api.medias = {
            main: { id: 'main' },
            secondary: { id: 'secondary' }
        };
        expect(api.getMediaById('*')).toEqual(api);
    });
    it('Should get a media object if we pass an id', function () {
        api.medias = {
            main: { id: 'main' },
            secondary: { id: 'secondary' }
        };
        expect(api.getMediaById('main')).toEqual({ id: 'main' });
    });
    it('Should play all medias', function () {
        api.medias = {
            main: { id: 'main', play: function () { } },
            secondary: { id: 'secondary', play: function () { } }
        };
        spyOn(api.medias.main, 'play').and.callThrough();
        spyOn(api.medias.secondary, 'play').and.callThrough();
        api.play();
        expect(api.medias.main.play).toHaveBeenCalled();
        expect(api.medias.secondary.play).toHaveBeenCalled();
    });
    it('Should pause all medias', function () {
        api.medias = {
            main: { id: 'main', pause: function () { } },
            secondary: { id: 'secondary', pause: function () { } }
        };
        spyOn(api.medias.main, 'pause').and.callThrough();
        spyOn(api.medias.secondary, 'pause').and.callThrough();
        api.pause();
        expect(api.medias.main.pause).toHaveBeenCalled();
        expect(api.medias.secondary.pause).toHaveBeenCalled();
    });
    it('Should get duration', function () {
        spyOn(api, '$$getAllProperties').and.callFake(function () { });
        var duration = api.duration;
        expect(api.$$getAllProperties).toHaveBeenCalledWith('duration');
    });
    it('Should set a state', function () {
        spyOn(api, '$$setAllProperties').and.callFake(function () { });
        api.state = 'pause';
        expect(api.$$setAllProperties).toHaveBeenCalledWith('state', 'pause');
    });
    it('Should get state', function () {
        spyOn(api, '$$getAllProperties').and.callFake(function () { });
        var state = api.state;
        expect(api.$$getAllProperties).toHaveBeenCalledWith('state');
    });
    it('Should set a currentTime', function () {
        spyOn(api, '$$setAllProperties').and.callFake(function () { });
        api.currentTime = 50;
        expect(api.$$setAllProperties).toHaveBeenCalledWith('currentTime', 50);
    });
    it('Should get currentTime', function () {
        spyOn(api, '$$getAllProperties').and.callFake(function () { });
        var currentTime = api.currentTime;
        expect(api.$$getAllProperties).toHaveBeenCalledWith('currentTime');
    });
    it('Should set a volume', function () {
        spyOn(api, '$$setAllProperties').and.callFake(function () { });
        api.volume = 0.5;
        expect(api.$$setAllProperties).toHaveBeenCalledWith('volume', 0.5);
    });
    it('Should get volume', function () {
        spyOn(api, '$$getAllProperties').and.callFake(function () { });
        var volume = api.volume;
        expect(api.$$getAllProperties).toHaveBeenCalledWith('volume');
    });
    it('Should set a playback rate', function () {
        spyOn(api, '$$setAllProperties').and.callFake(function () { });
        api.playbackRate = 0.5;
        expect(api.$$setAllProperties).toHaveBeenCalledWith('playbackRate', 0.5);
    });
    it('Should get playbackRate', function () {
        spyOn(api, '$$getAllProperties').and.callFake(function () { });
        var playbackRate = api.playbackRate;
        expect(api.$$getAllProperties).toHaveBeenCalledWith('playbackRate');
    });
    it('Should get canPlay', function () {
        spyOn(api, '$$getAllProperties').and.callFake(function () { });
        var canPlay = api.canPlay;
        expect(api.$$getAllProperties).toHaveBeenCalledWith('canPlay');
    });
    it('Should get canPlayThrough', function () {
        spyOn(api, '$$getAllProperties').and.callFake(function () { });
        var canPlayThrough = api.canPlayThrough;
        expect(api.$$getAllProperties).toHaveBeenCalledWith('canPlayThrough');
    });
    it('Should get isMetadataLoaded', function () {
        spyOn(api, '$$getAllProperties').and.callFake(function () { });
        var isMetadataLoaded = api.isMetadataLoaded;
        expect(api.$$getAllProperties).toHaveBeenCalledWith('isMetadataLoaded');
    });
    it('Should get isWaiting', function () {
        spyOn(api, '$$getAllProperties').and.callFake(function () { });
        var isWaiting = api.isWaiting;
        expect(api.$$getAllProperties).toHaveBeenCalledWith('isWaiting');
    });
    it('Should get isCompleted', function () {
        spyOn(api, '$$getAllProperties').and.callFake(function () { });
        var isCompleted = api.isCompleted;
        expect(api.$$getAllProperties).toHaveBeenCalledWith('isCompleted');
    });
    it('Should get time', function () {
        spyOn(api, '$$getAllProperties').and.callFake(function () { });
        var time = api.time;
        expect(api.$$getAllProperties).toHaveBeenCalledWith('time');
    });
    it('Should get buffer', function () {
        spyOn(api, '$$getAllProperties').and.callFake(function () { });
        var time = api.buffer;
        expect(api.$$getAllProperties).toHaveBeenCalledWith('buffer');
    });
    it('Should get buffered', function () {
        spyOn(api, '$$getAllProperties').and.callFake(function () { });
        var buffered = api.buffered;
        expect(api.$$getAllProperties).toHaveBeenCalledWith('buffered');
    });
    it('Should get subscriptions', function () {
        spyOn(api, '$$getAllProperties').and.callFake(function () { });
        var subscriptions = api.subscriptions;
        expect(api.$$getAllProperties).toHaveBeenCalledWith('subscriptions');
    });
    it('Should seek to a specified time by second', function () {
        api.medias = {
            main: { id: 'main' },
            secondary: { id: 'secondary' }
        };
        spyOn(api, '$$seek').and.callFake(function () { });
        api.seekTime(10);
        expect(api.$$seek).toHaveBeenCalledWith({ id: 'main' }, 10, false);
        expect(api.$$seek).toHaveBeenCalledWith({ id: 'secondary' }, 10, false);
    });
    it('Should seek to a specified time by percentage', function () {
        api.medias = {
            main: { id: 'main' },
            secondary: { id: 'secondary' }
        };
        spyOn(api, '$$seek').and.callFake(function () { });
        api.seekTime(10, true);
        expect(api.$$seek).toHaveBeenCalledWith({ id: 'main' }, 10, true);
        expect(api.$$seek).toHaveBeenCalledWith({ id: 'secondary' }, 10, true);
    });
    it('Should seek media files to a specified time by second', function () {
        var media = {
            currentTime: 0
        };
        api.$$seek(media, 10);
        expect(media.currentTime).toBe(10);
    });
    it('Should seek media files to a specified time by percentage', function () {
        var media = {
            duration: 200,
            currentTime: 0,
            subscriptions: {}
        };
        api.$$seek(media, 10, true);
        expect(media.currentTime).toBe(20);
    });
    it('Should get a property from all media objects and return an object', function () {
        api.medias = {
            main: { id: 'main', state: vg_states_1.VgStates.VG_PLAYING },
            secondary: { id: 'secondary', state: vg_states_1.VgStates.VG_PAUSED }
        };
        var states = api.$$getAllProperties('state');
        expect(states).toEqual(vg_states_1.VgStates.VG_PLAYING);
    });
    it('Should get a property from all media objects and return a plain value if there is only one media object', function () {
        api.medias = {
            main: { id: 'main', state: vg_states_1.VgStates.VG_PLAYING }
        };
        var states = api.$$getAllProperties('state');
        expect(states).toEqual(vg_states_1.VgStates.VG_PLAYING);
    });
    it('Should set a property to all media objects', function () {
        api.medias = {
            main: { id: 'main', state: 'stop' },
            secondary: { id: 'secondary', state: 'stop' }
        };
        api.$$setAllProperties('state', vg_states_1.VgStates.VG_PLAYING);
        expect(api.medias.main.state).toBe(vg_states_1.VgStates.VG_PLAYING);
        expect(api.medias.secondary.state).toBe(vg_states_1.VgStates.VG_PLAYING);
    });
    it('Should register a new media object', function () {
        var media = { id: 'main' };
        api.registerMedia(media);
        expect(api.medias['main']).toBe(media);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctYXBpLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy1hcGkuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdUJBQW9CLFVBQVUsQ0FBQyxDQUFBO0FBRS9CLDBCQUF1QixxQkFBcUIsQ0FBQyxDQUFBO0FBRTdDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtJQUMxQixJQUFJLEdBQVMsQ0FBQztJQUVkLFVBQVUsQ0FBQztRQUNQLEdBQUcsR0FBRyxJQUFJLGNBQUssRUFBRSxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDhCQUE4QixFQUFFO1FBQy9CLEdBQUcsQ0FBQyxNQUFNLEdBQUc7WUFDVCxJQUFJLEVBQUUsRUFBQyxFQUFFLEVBQUUsTUFBTSxFQUFDO1lBQ2xCLFNBQVMsRUFBRSxFQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUM7U0FDL0IsQ0FBQztRQUVGLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxFQUFFLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUN2QixFQUFFLENBQUMsNkJBQTZCLEVBQUU7WUFDOUIsR0FBRyxDQUFDLE1BQU0sR0FBRztnQkFDVCxJQUFJLEVBQUUsRUFBQyxFQUFFLEVBQUUsTUFBTSxFQUFDO2dCQUNsQixTQUFTLEVBQUUsRUFBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUM7YUFDOUMsQ0FBQztZQUVGLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQzNFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHdEQUF3RCxFQUFFO1lBQ3pELEdB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TSxDQUFPLEdBQUcsQ0FBQyxNQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hFLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG9DQUFvQyxFQUFFO1FBQ3JDLElBQUksS0FBSyxHQUFHLEVBQUMsRUFBRSxFQUFFLE1BQU0sRUFBQyxDQUFDO1FBRXpCLEdBQUcsQ0FBQyxhQUFhLENBQVksS0FBSyxDQUFDLENBQUM7UUFFcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VmdBUEl9IGZyb20gXCIuL3ZnLWFwaVwiO1xuaW1wb3J0IHtJUGxheWFibGV9IGZyb20gXCIuLi92Zy1tZWRpYS9pLXBsYXlhYmxlXCI7XG5pbXBvcnQge1ZnU3RhdGVzfSBmcm9tIFwiLi4vc3RhdGVzL3ZnLXN0YXRlc1wiO1xuXG5kZXNjcmliZSgnVmlkZW9ndWxhciBQbGF5ZXInLCAoKSA9PiB7XG4gICAgbGV0IGFwaTpWZ0FQSTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBhcGkgPSBuZXcgVmdBUEkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgZ2V0IHRoZSBkZWZhdWx0IG1lZGlhJywgKCkgPT4ge1xuICAgICAgICBhcGkubWVkaWFzID0ge1xuICAgICAgICAgICAgbWFpbjoge2lkOiAnbWFpbid9LFxuICAgICAgICAgICAgc2Vjb25kYXJ5OiB7aWQ6ICdzZWNvbmRhcnknfVxuICAgICAgICB9O1xuXG4gICAgICAgIGV4cGVjdChhcGkuZ2V0RGVmYXVsdE1lZGlhKCkpLnRvRXF1YWwoe2lkOiAnbWFpbid9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRNYXN0ZXJNZWRpYScsICgpID0+IHtcbiAgICAgICAgaXQoJ1Nob3VsZCBnZXQgdGhlIG1hc3RlciBtZWRpYScsICgpID0+IHtcbiAgICAgICAgICAgIGFwaS5tZWRpYXMgPSB7XG4gICAgICAgICAgICAgICAgbWFpbjoge2lkOiAnbWFpbid9LFxuICAgICAgICAgICAgICAgIHNlY29uZGFyeToge2lkOiAnc2Vjb25kYXJ5JywgdmdNZWRpYTogdHJ1ZX1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV4cGVjdChhcGkuZ2V0TWFzdGVyTWVkaWEoKSkudG9FcXVhbCh7aWQ6ICdzZWNvbmRhcnknLCB2Z01lZGlhOiB0cnVlfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnU2hvdWxkIGdldCB0aGUgZGVmYXVsdCBtZWRpYSB3aGVuIG5vIG1hc3RlciBpcyBkZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgYXBpLm1lZGlhcyA9IHtcbiAgICAgICAgICAgICAgICBtYWluOiB7aWQ6ICdtYWluJ30sXG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5OiB7aWQ6ICdzZWNvbmRhcnknfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZXhwZWN0KGFwaS5nZXRNYXN0ZXJNZWRpYSgpKS50b0VxdWFsKGFwaS5nZXREZWZhdWx0TWVkaWEoKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBnZXQgdGhlIGFwaSBpZiB3ZSBkbyBub3QgcGFzcyBhbiBpZCcsICgpID0+IHtcbiAgICAgICAgYXBpLm1lZGlhcyA9IHtcbiAgICAgICAgICAgIG1haW46IHtpZDogJ21haW4nfSxcbiAgICAgICAgICAgIHNlY29uZGFyeToge2lkOiAnc2Vjb25kYXJ5J31cbiAgICAgICAgfTtcblxuICAgICAgICBleHBlY3QoYXBpLmdldE1lZGlhQnlJZCgpKS50b0VxdWFsKGFwaSk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGdldCB0aGUgYXBpIGlmIHdlIHBhc3MgYW4gKicsICgpID0+IHtcbiAgICAgICAgYXBpLm1lZGlhcyA9IHtcbiAgICAgICAgICAgIG1haW46IHtpZDogJ21haW4nfSxcbiAgICAgICAgICAgIHNlY29uZGFyeToge2lkOiAnc2Vjb25kYXJ5J31cbiAgICAgICAgfTtcblxuICAgICAgICBleHBlY3QoYXBpLmdldE1lZGlhQnlJZCgnKicpKS50b0VxdWFsKGFwaSk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGdldCBhIG1lZGlhIG9iamVjdCBpZiB3ZSBwYXNzIGFuIGlkJywgKCkgPT4ge1xuICAgICAgICBhcGkubWVkaWFzID0ge1xuICAgICAgICAgICAgbWFpbjoge2lkOiAnbWFpbid9LFxuICAgICAgICAgICAgc2Vjb25kYXJ5OiB7aWQ6ICdzZWNvbmRhcnknfVxuICAgICAgICB9O1xuXG4gICAgICAgIGV4cGVjdChhcGkuZ2V0TWVkaWFCeUlkKCdtYWluJykpLnRvRXF1YWwoe2lkOiAnbWFpbid9KTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgcGxheSBhbGwgbWVkaWFzJywgKCkgPT4ge1xuICAgICAgICBhcGkubWVkaWFzID0ge1xuICAgICAgICAgICAgbWFpbjoge2lkOiAnbWFpbicsIHBsYXk6ICgpID0+IHt9fSxcbiAgICAgICAgICAgIHNlY29uZGFyeToge2lkOiAnc2Vjb25kYXJ5JywgcGxheTogKCkgPT4ge319XG4gICAgICAgIH07XG5cbiAgICAgICAgc3B5T24oKDxhbnk+YXBpLm1lZGlhcykubWFpbiwgJ3BsYXknKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgc3B5T24oKDxhbnk+YXBpLm1lZGlhcykuc2Vjb25kYXJ5LCAncGxheScpLmFuZC5jYWxsVGhyb3VnaCgpO1xuXG4gICAgICAgIGFwaS5wbGF5KCk7XG5cbiAgICAgICAgZXhwZWN0KCg8YW55PmFwaS5tZWRpYXMpLm1haW4ucGxheSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QoKDxhbnk+YXBpLm1lZGlhcykuc2Vjb25kYXJ5LnBsYXkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgcGF1c2UgYWxsIG1lZGlhcycsICgpID0+IHtcbiAgICAgICAgYXBpLm1lZGlhcyA9IHtcbiAgICAgICAgICAgIG1haW46IHtpZDogJ21haW4nLCBwYXVzZTogKCkgPT4ge319LFxuICAgICAgICAgICAgc2Vjb25kYXJ5OiB7aWQ6ICdzZWNvbmRhcnknLCBwYXVzZTogKCkgPT4ge319XG4gICAgICAgIH07XG5cbiAgICAgICAgc3B5T24oKDxhbnk+YXBpLm1lZGlhcykubWFpbiwgJ3BhdXNlJykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgICAgIHNweU9uKCg8YW55PmFwaS5tZWRpYXMpLnNlY29uZGFyeSwgJ3BhdXNlJykuYW5kLmNhbGxUaHJvdWdoKCk7XG5cbiAgICAgICAgYXBpLnBhdXNlKCk7XG5cbiAgICAgICAgZXhwZWN0KCg8YW55PmFwaS5tZWRpYXMpLm1haW4ucGF1c2UpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgZXhwZWN0KCg8YW55PmFwaS5tZWRpYXMpLnNlY29uZGFyeS5wYXVzZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBnZXQgZHVyYXRpb24nLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGFwaSwgJyQkZ2V0QWxsUHJvcGVydGllcycpLmFuZC5jYWxsRmFrZSgoKSA9PiB7fSk7XG5cbiAgICAgICAgbGV0IGR1cmF0aW9uID0gYXBpLmR1cmF0aW9uO1xuXG4gICAgICAgIGV4cGVjdChhcGkuJCRnZXRBbGxQcm9wZXJ0aWVzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnZHVyYXRpb24nKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgc2V0IGEgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGFwaSwgJyQkc2V0QWxsUHJvcGVydGllcycpLmFuZC5jYWxsRmFrZSgoKSA9PiB7fSk7XG5cbiAgICAgICAgYXBpLnN0YXRlID0gJ3BhdXNlJztcblxuICAgICAgICBleHBlY3QoYXBpLiQkc2V0QWxsUHJvcGVydGllcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ3N0YXRlJywgJ3BhdXNlJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGdldCBzdGF0ZScsICgpID0+IHtcbiAgICAgICAgc3B5T24oYXBpLCAnJCRnZXRBbGxQcm9wZXJ0aWVzJykuYW5kLmNhbGxGYWtlKCgpID0+IHt9KTtcblxuICAgICAgICBsZXQgc3RhdGUgPSBhcGkuc3RhdGU7XG5cbiAgICAgICAgZXhwZWN0KGFwaS4kJGdldEFsbFByb3BlcnRpZXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdzdGF0ZScpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBzZXQgYSBjdXJyZW50VGltZScsICgpID0+IHtcbiAgICAgICAgc3B5T24oYXBpLCAnJCRzZXRBbGxQcm9wZXJ0aWVzJykuYW5kLmNhbGxGYWtlKCgpID0+IHt9KTtcblxuICAgICAgICBhcGkuY3VycmVudFRpbWUgPSA1MDtcblxuICAgICAgICBleHBlY3QoYXBpLiQkc2V0QWxsUHJvcGVydGllcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2N1cnJlbnRUaW1lJywgNTApO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBnZXQgY3VycmVudFRpbWUnLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGFwaSwgJyQkZ2V0QWxsUHJvcGVydGllcycpLmFuZC5jYWxsRmFrZSgoKSA9PiB7fSk7XG5cbiAgICAgICAgbGV0IGN1cnJlbnRUaW1lID0gYXBpLmN1cnJlbnRUaW1lO1xuXG4gICAgICAgIGV4cGVjdChhcGkuJCRnZXRBbGxQcm9wZXJ0aWVzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnY3VycmVudFRpbWUnKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgc2V0IGEgdm9sdW1lJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihhcGksICckJHNldEFsbFByb3BlcnRpZXMnKS5hbmQuY2FsbEZha2UoKCkgPT4ge30pO1xuXG4gICAgICAgIGFwaS52b2x1bWUgPSAwLjU7XG5cbiAgICAgICAgZXhwZWN0KGFwaS4kJHNldEFsbFByb3BlcnRpZXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCd2b2x1bWUnLCAwLjUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBnZXQgdm9sdW1lJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihhcGksICckJGdldEFsbFByb3BlcnRpZXMnKS5hbmQuY2FsbEZha2UoKCkgPT4ge30pO1xuXG4gICAgICAgIGxldCB2b2x1bWUgPSBhcGkudm9sdW1lO1xuXG4gICAgICAgIGV4cGVjdChhcGkuJCRnZXRBbGxQcm9wZXJ0aWVzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgndm9sdW1lJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIHNldCBhIHBsYXliYWNrIHJhdGUnLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGFwaSwgJyQkc2V0QWxsUHJvcGVydGllcycpLmFuZC5jYWxsRmFrZSgoKSA9PiB7fSk7XG5cbiAgICAgICAgYXBpLnBsYXliYWNrUmF0ZSA9IDAuNTtcblxuICAgICAgICBleHBlY3QoYXBpLiQkc2V0QWxsUHJvcGVydGllcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ3BsYXliYWNrUmF0ZScsIDAuNSk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGdldCBwbGF5YmFja1JhdGUnLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGFwaSwgJyQkZ2V0QWxsUHJvcGVydGllcycpLmFuZC5jYWxsRmFrZSgoKSA9PiB7fSk7XG5cbiAgICAgICAgbGV0IHBsYXliYWNrUmF0ZSA9IGFwaS5wbGF5YmFja1JhdGU7XG5cbiAgICAgICAgZXhwZWN0KGFwaS4kJGdldEFsbFByb3BlcnRpZXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdwbGF5YmFja1JhdGUnKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgZ2V0IGNhblBsYXknLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGFwaSwgJyQkZ2V0QWxsUHJvcGVydGllcycpLmFuZC5jYWxsRmFrZSgoKSA9PiB7fSk7XG5cbiAgICAgICAgbGV0IGNhblBsYXkgPSBhcGkuY2FuUGxheTtcblxuICAgICAgICBleHBlY3QoYXBpLiQkZ2V0QWxsUHJvcGVydGllcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2NhblBsYXknKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgZ2V0IGNhblBsYXlUaHJvdWdoJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihhcGksICckJGdldEFsbFByb3BlcnRpZXMnKS5hbmQuY2FsbEZha2UoKCkgPT4ge30pO1xuXG4gICAgICAgIGxldCBjYW5QbGF5VGhyb3VnaCA9IGFwaS5jYW5QbGF5VGhyb3VnaDtcblxuICAgICAgICBleHBlY3QoYXBpLiQkZ2V0QWxsUHJvcGVydGllcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2NhblBsYXlUaHJvdWdoJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGdldCBpc01ldGFkYXRhTG9hZGVkJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihhcGksICckJGdldEFsbFByb3BlcnRpZXMnKS5hbmQuY2FsbEZha2UoKCkgPT4ge30pO1xuXG4gICAgICAgIGxldCBpc01ldGFkYXRhTG9hZGVkID0gYXBpLmlzTWV0YWRhdGFMb2FkZWQ7XG5cbiAgICAgICAgZXhwZWN0KGFwaS4kJGdldEFsbFByb3BlcnRpZXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdpc01ldGFkYXRhTG9hZGVkJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGdldCBpc1dhaXRpbmcnLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGFwaSwgJyQkZ2V0QWxsUHJvcGVydGllcycpLmFuZC5jYWxsRmFrZSgoKSA9PiB7fSk7XG5cbiAgICAgICAgbGV0IGlzV2FpdGluZyA9IGFwaS5pc1dhaXRpbmc7XG5cbiAgICAgICAgZXhwZWN0KGFwaS4kJGdldEFsbFByb3BlcnRpZXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdpc1dhaXRpbmcnKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgZ2V0IGlzQ29tcGxldGVkJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihhcGksICckJGdldEFsbFByb3BlcnRpZXMnKS5hbmQuY2FsbEZha2UoKCkgPT4ge30pO1xuXG4gICAgICAgIGxldCBpc0NvbXBsZXRlZCA9IGFwaS5pc0NvbXBsZXRlZDtcblxuICAgICAgICBleHBlY3QoYXBpLiQkZ2V0QWxsUHJvcGVydGllcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2lzQ29tcGxldGVkJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGdldCB0aW1lJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihhcGksICckJGdldEFsbFByb3BlcnRpZXMnKS5hbmQuY2FsbEZha2UoKCkgPT4ge30pO1xuXG4gICAgICAgIGxldCB0aW1lID0gYXBpLnRpbWU7XG5cbiAgICAgICAgZXhwZWN0KGFwaS4kJGdldEFsbFByb3BlcnRpZXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCd0aW1lJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGdldCBidWZmZXInLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGFwaSwgJyQkZ2V0QWxsUHJvcGVydGllcycpLmFuZC5jYWxsRmFrZSgoKSA9PiB7fSk7XG5cbiAgICAgICAgbGV0IHRpbWUgPSBhcGkuYnVmZmVyO1xuXG4gICAgICAgIGV4cGVjdChhcGkuJCRnZXRBbGxQcm9wZXJ0aWVzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnYnVmZmVyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGdldCBidWZmZXJlZCcsICgpID0+IHtcbiAgICAgICAgc3B5T24oYXBpLCAnJCRnZXRBbGxQcm9wZXJ0aWVzJykuYW5kLmNhbGxGYWtlKCgpID0+IHt9KTtcblxuICAgICAgICBsZXQgYnVmZmVyZWQgPSBhcGkuYnVmZmVyZWQ7XG5cbiAgICAgICAgZXhwZWN0KGFwaS4kJGdldEFsbFByb3BlcnRpZXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdidWZmZXJlZCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBnZXQgc3Vic2NyaXB0aW9ucycsICgpID0+IHtcbiAgICAgICAgc3B5T24oYXBpLCAnJCRnZXRBbGxQcm9wZXJ0aWVzJykuYW5kLmNhbGxGYWtlKCgpID0+IHt9KTtcblxuICAgICAgICBsZXQgc3Vic2NyaXB0aW9ucyA9IGFwaS5zdWJzY3JpcHRpb25zO1xuXG4gICAgICAgIGV4cGVjdChhcGkuJCRnZXRBbGxQcm9wZXJ0aWVzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnc3Vic2NyaXB0aW9ucycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBzZWVrIHRvIGEgc3BlY2lmaWVkIHRpbWUgYnkgc2Vjb25kJywgKCkgPT4ge1xuICAgICAgICBhcGkubWVkaWFzID0ge1xuICAgICAgICAgICAgbWFpbjoge2lkOiAnbWFpbid9LFxuICAgICAgICAgICAgc2Vjb25kYXJ5OiB7aWQ6ICdzZWNvbmRhcnknfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNweU9uKGFwaSwgJyQkc2VlaycpLmFuZC5jYWxsRmFrZSgoKSA9PiB7fSk7XG5cbiAgICAgICAgYXBpLnNlZWtUaW1lKDEwKTtcblxuICAgICAgICBleHBlY3QoYXBpLiQkc2VlaykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe2lkOiAnbWFpbid9LCAxMCwgZmFsc2UpO1xuICAgICAgICBleHBlY3QoYXBpLiQkc2VlaykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe2lkOiAnc2Vjb25kYXJ5J30sIDEwLCBmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIHNlZWsgdG8gYSBzcGVjaWZpZWQgdGltZSBieSBwZXJjZW50YWdlJywgKCkgPT4ge1xuICAgICAgICBhcGkubWVkaWFzID0ge1xuICAgICAgICAgICAgbWFpbjoge2lkOiAnbWFpbid9LFxuICAgICAgICAgICAgc2Vjb25kYXJ5OiB7aWQ6ICdzZWNvbmRhcnknfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNweU9uKGFwaSwgJyQkc2VlaycpLmFuZC5jYWxsRmFrZSgoKSA9PiB7fSk7XG5cbiAgICAgICAgYXBpLnNlZWtUaW1lKDEwLCB0cnVlKTtcblxuICAgICAgICBleHBlY3QoYXBpLiQkc2VlaykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe2lkOiAnbWFpbid9LCAxMCwgdHJ1ZSk7XG4gICAgICAgIGV4cGVjdChhcGkuJCRzZWVrKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7aWQ6ICdzZWNvbmRhcnknfSwgMTAsIHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBzZWVrIG1lZGlhIGZpbGVzIHRvIGEgc3BlY2lmaWVkIHRpbWUgYnkgc2Vjb25kJywgKCkgPT4ge1xuICAgICAgICBsZXQgbWVkaWEgPSB7XG4gICAgICAgICAgICBjdXJyZW50VGltZTogMFxuICAgICAgICB9O1xuXG4gICAgICAgIGFwaS4kJHNlZWsoPElQbGF5YWJsZT5tZWRpYSwgMTApO1xuXG4gICAgICAgIGV4cGVjdChtZWRpYS5jdXJyZW50VGltZSkudG9CZSgxMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIHNlZWsgbWVkaWEgZmlsZXMgdG8gYSBzcGVjaWZpZWQgdGltZSBieSBwZXJjZW50YWdlJywgKCkgPT4ge1xuICAgICAgICBsZXQgbWVkaWEgPSB7XG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICAgICAgY3VycmVudFRpbWU6IDAsXG4gICAgICAgICAgICBzdWJzY3JpcHRpb25zOiB7fVxuICAgICAgICB9O1xuXG4gICAgICAgIGFwaS4kJHNlZWsoPGFueT5tZWRpYSwgMTAsIHRydWUpO1xuXG4gICAgICAgIGV4cGVjdChtZWRpYS5jdXJyZW50VGltZSkudG9CZSgyMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGdldCBhIHByb3BlcnR5IGZyb20gYWxsIG1lZGlhIG9iamVjdHMgYW5kIHJldHVybiBhbiBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgIGFwaS5tZWRpYXMgPSB7XG4gICAgICAgICAgICBtYWluOiB7aWQ6ICdtYWluJywgc3RhdGU6IFZnU3RhdGVzLlZHX1BMQVlJTkd9LFxuICAgICAgICAgICAgc2Vjb25kYXJ5OiB7aWQ6ICdzZWNvbmRhcnknLCBzdGF0ZTogVmdTdGF0ZXMuVkdfUEFVU0VEfVxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBzdGF0ZXMgPSBhcGkuJCRnZXRBbGxQcm9wZXJ0aWVzKCdzdGF0ZScpO1xuXG4gICAgICAgIGV4cGVjdChzdGF0ZXMpLnRvRXF1YWwoVmdTdGF0ZXMuVkdfUExBWUlORyk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGdldCBhIHByb3BlcnR5IGZyb20gYWxsIG1lZGlhIG9iamVjdHMgYW5kIHJldHVybiBhIHBsYWluIHZhbHVlIGlmIHRoZXJlIGlzIG9ubHkgb25lIG1lZGlhIG9iamVjdCcsICgpID0+IHtcbiAgICAgICAgYXBpLm1lZGlhcyA9IHtcbiAgICAgICAgICAgIG1haW46IHtpZDogJ21haW4nLCBzdGF0ZTogVmdTdGF0ZXMuVkdfUExBWUlOR31cbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgc3RhdGVzID0gYXBpLiQkZ2V0QWxsUHJvcGVydGllcygnc3RhdGUnKTtcblxuICAgICAgICBleHBlY3Qoc3RhdGVzKS50b0VxdWFsKFZnU3RhdGVzLlZHX1BMQVlJTkcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBzZXQgYSBwcm9wZXJ0eSB0byBhbGwgbWVkaWEgb2JqZWN0cycsICgpID0+IHtcbiAgICAgICAgYXBpLm1lZGlhcyA9IHtcbiAgICAgICAgICAgIG1haW46IHtpZDogJ21haW4nLCBzdGF0ZTogJ3N0b3AnfSxcbiAgICAgICAgICAgIHNlY29uZGFyeToge2lkOiAnc2Vjb25kYXJ5Jywgc3RhdGU6ICdzdG9wJ31cbiAgICAgICAgfTtcblxuICAgICAgICBhcGkuJCRzZXRBbGxQcm9wZXJ0aWVzKCdzdGF0ZScsIFZnU3RhdGVzLlZHX1BMQVlJTkcpO1xuXG4gICAgICAgIGV4cGVjdCgoPGFueT5hcGkubWVkaWFzKS5tYWluLnN0YXRlKS50b0JlKFZnU3RhdGVzLlZHX1BMQVlJTkcpO1xuICAgICAgICBleHBlY3QoKDxhbnk+YXBpLm1lZGlhcykuc2Vjb25kYXJ5LnN0YXRlKS50b0JlKFZnU3RhdGVzLlZHX1BMQVlJTkcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCByZWdpc3RlciBhIG5ldyBtZWRpYSBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgIGxldCBtZWRpYSA9IHtpZDogJ21haW4nfTtcblxuICAgICAgICBhcGkucmVnaXN0ZXJNZWRpYSg8SVBsYXlhYmxlPm1lZGlhKTtcblxuICAgICAgICBleHBlY3QoYXBpLm1lZGlhc1snbWFpbiddKS50b0JlKG1lZGlhKTtcbiAgICB9KTtcbn0pO1xuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=