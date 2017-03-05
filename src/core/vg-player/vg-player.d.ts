import { EventEmitter, ElementRef, QueryList, AfterContentInit } from '@angular/core';
import { VgAPI } from '../services/vg-api';
import { VgFullscreenAPI } from '../services/vg-fullscreen-api';
import { VgMedia } from '../vg-media/vg-media';
export declare class VgPlayer implements AfterContentInit {
    api: VgAPI;
    fsAPI: VgFullscreenAPI;
    elem: HTMLElement;
    isFullscreen: boolean;
    zIndex: string;
    onPlayerReady: EventEmitter<any>;
    onMediaReady: EventEmitter<any>;
    medias: QueryList<VgMedia>;
    constructor(ref: ElementRef, api: VgAPI, fsAPI: VgFullscreenAPI);
    ngAfterContentInit(): void;
    onChangeFullscreen(fsState: boolean): void;
}
