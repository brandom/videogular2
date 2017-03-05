import { ElementRef, OnInit } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { VgControlsHidden } from './../../core/services/vg-controls-hidden';
export declare class VgScrubBar implements OnInit {
    API: VgAPI;
    hideScrubBar: boolean;
    vgFor: string;
    elem: HTMLElement;
    target: any;
    constructor(ref: ElementRef, API: VgAPI, vgControlsHiddenState: VgControlsHidden);
    ngOnInit(): void;
    onPlayerReady(): void;
    onMouseDownScrubBar($event: any): void;
    onHideScrubBar(hide: boolean): void;
}
