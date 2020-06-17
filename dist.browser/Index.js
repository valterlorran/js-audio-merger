import Track from './Track';
var JsAudioMerger = /** @class */ (function () {
    /**
     * Creates an instance of JsAudioMerger.
     * @memberof JsAudioMerger
     */
    function JsAudioMerger() {
        this.tracks = [];
        this.audioCtx = new AudioContext();
    }
    /**
     * Gets the audio context
     *
     * @returns {AudioContext}
     * @memberof JsAudioMerger
     */
    JsAudioMerger.prototype.getAudioContext = function () {
        return this.audioCtx;
    };
    /**
     * Add a source from a stream
     *
     * @param {MediaStream} stream
     * @returns {Track}
     * @memberof JsAudioMerger
     */
    JsAudioMerger.prototype.addFromStream = function (stream) {
        if (!stream.getAudioTracks().length) {
            throw new Error('The stream does not have any audio tracks');
        }
        var track = new Track(this.audioCtx);
        track.createFromStream(stream);
        return track;
    };
    /**
     * Add a source from a media element
     *
     * @param {HTMLMediaElement} mediaElement
     * @returns {Track}
     * @memberof JsAudioMerger
     */
    JsAudioMerger.prototype.addFromElement = function (mediaElement) {
        var track = new Track(this.audioCtx);
        track.createFromElement(mediaElement);
        return track;
    };
    /**
     * Removes a track
     *
     * @param {Track} track
     * @memberof JsAudioMerger
     */
    JsAudioMerger.prototype.removeTrack = function (track) {
        var trackIndex = this.tracks.findIndex(function (_track) { return _track === track; });
        if (trackIndex > -1) {
            throw new Error('Track not found');
        }
        this.tracks.splice(trackIndex, 1);
        track.flush();
    };
    /**
     * Clear all resources
     *
     * @memberof JsAudioMerger
     */
    JsAudioMerger.prototype.flush = function () {
        var _this = this;
        this.tracks.forEach(function (track) { return _this.removeTrack(track); });
        this.audioCtx.close();
    };
    return JsAudioMerger;
}());
export default JsAudioMerger;
