import Track from './Track';
export default class JsAudioMerger {
    private tracks;
    /**
     * An audio-processing graph built from audio modules linked together, each represented
     * by an AudioNode.
     *
     * @type {AudioContext}
     * @memberof JsAudioMerger
     */
    private audioCtx;
    /**
     * Creates an instance of JsAudioMerger.
     * @memberof JsAudioMerger
     */
    constructor();
    /**
     * Gets the audio context
     *
     * @returns {AudioContext}
     * @memberof JsAudioMerger
     */
    getAudioContext(): AudioContext;
    /**
     * Add a source from a stream
     *
     * @param {MediaStream} stream
     * @returns {Track}
     * @memberof JsAudioMerger
     */
    addFromStream(stream: MediaStream): Track;
    /**
     * Add a source from a media element
     *
     * @param {HTMLMediaElement} mediaElement
     * @returns {Track}
     * @memberof JsAudioMerger
     */
    addFromElement(mediaElement: HTMLMediaElement): Track;
    /**
     * Removes a track
     *
     * @param {Track} track
     * @memberof JsAudioMerger
     */
    removeTrack(track: Track): void;
    /**
     * Clear all resources
     *
     * @memberof JsAudioMerger
     */
    flush(): void;
}
