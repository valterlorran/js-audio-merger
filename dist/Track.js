"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a track that is to be merged with other audios
 */
var Track = /** @class */ (function () {
    /**
     * Creates an instance of Track.
     * @param {AudioContext} audioCtx
     * @memberof Track
     */
    function Track(audioCtx) {
        /**
         * A type of AudioNode which operates as an audio source whose media is received
         * from a MediaStream obtained using the WebRTC or Media Capture and Streams APIs
         *
         * @type {(MediaStreamAudioSourceNode | MediaElementAudioSourceNode | null)}
         * @memberof Track
         */
        this.source = null;
        this.audioCtx = audioCtx;
    }
    /**
     * Creates a source from a stream and merges it in the audio context
     *
     * @param {MediaStream} stream
     * @memberof Track
     */
    Track.prototype.createFromStream = function (stream) {
        this.source = this.audioCtx.createMediaStreamSource(stream);
        this.source.connect(this.audioCtx.destination);
        this.quickPlayStreamFix(stream);
    };
    /**
     * Creates a source from a media element and merges it in the audio context
     *
     * @param {HTMLMediaElement} mediaElement
     * @memberof Track
     */
    Track.prototype.createFromElement = function (mediaElement) {
        this.source = this.audioCtx.createMediaElementSource(mediaElement);
        this.source.connect(this.audioCtx.destination);
    };
    /**
     * Pauses the audio
     *
     * @memberof Track
     */
    Track.prototype.pause = function () {
        this.audioCtx.suspend();
    };
    /**
     * Plays the audio
     *
     * @memberof Track
     */
    Track.prototype.play = function () {
        this.audioCtx.resume();
    };
    /**
     * Disconnects the context destination, releasing resources
     *
     * @memberof Track
     */
    Track.prototype.flush = function () {
        var _a;
        (_a = this.source) === null || _a === void 0 ? void 0 : _a.disconnect(this.audioCtx.destination);
    };
    /**
     * Create an audio element to start play the stream
     * @param {MediaStream} stream
     * @memberof Track
     */
    Track.prototype.quickPlayStreamFix = function (stream) {
        var sound = document.createElement('audio');
        sound.controls = false;
        sound.muted = true;
        sound.srcObject = stream;
        sound.onloadeddata = function () {
            sound.play();
            setTimeout(function () {
                sound.remove();
            }, 2000);
        };
    };
    return Track;
}());
exports.default = Track;
