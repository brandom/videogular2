/// <reference types="core-js" />
import { ElementRef, OnInit } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { VgFullscreenAPI } from '../../core/services/vg-fullscreen-api';
export declare class VgFullscreen implements OnInit {
    API: VgAPI;
    fsAPI: VgFullscreenAPI;
    elem: HTMLElement;
    vgFor: string;
    target: Object;
    isFullscreen: boolean;
    constructor(ref: ElementRef, API: VgAPI, fsAPI: VgFullscreenAPI);
    ngOnInit(): void;
    onPlayerReady(): void;
    onChangeFullscreen(fsState: boolean): void;
    onClick(): void;
}
