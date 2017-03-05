import { ElementRef, OnInit } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
export declare class VgVolume implements OnInit {
    API: VgAPI;
    vgFor: string;
    volumeBarRef: ElementRef;
    elem: HTMLElement;
    target: any;
    isDragging: boolean;
    mouseDownPosX: number;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onPlayerReady(): void;
    onClick(event: {
        clientX: number;
    }): void;
    onMouseDown(event: {
        clientX: number;
    }): void;
    onDrag(event: {
        clientX: number;
    }): void;
    onStopDrag(event: {
        clientX: number;
    }): void;
    calculateVolume(mousePosX: number): number;
    setVolume(vol: number): void;
    getVolume(): number;
}
