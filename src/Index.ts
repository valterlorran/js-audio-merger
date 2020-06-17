import Track from './Track';
export default class JsAudioMerger {
    private tracks: Track[] = [];

    /**
     * An audio-processing graph built from audio modules linked together, each represented
     * by an AudioNode.
     *
     * @type {AudioContext}
     * @memberof JsAudioMerger
     */
    private audioCtx: AudioContext;

    /**
     * Creates an instance of JsAudioMerger.
     * @memberof JsAudioMerger
     */
    constructor()
    {
        this.audioCtx = new AudioContext();
    }

    /**
     * Gets the audio context
     *
     * @returns {AudioContext}
     * @memberof JsAudioMerger
     */
    getAudioContext(): AudioContext
    {
        return this.audioCtx;
    }

    /**
     * Add a source from a stream
     *
     * @param {MediaStream} stream
     * @returns {Track}
     * @memberof JsAudioMerger
     */
    addFromStream(stream: MediaStream): Track
    {
        if (!stream.getAudioTracks().length) {
            throw new Error('The stream does not have any audio tracks');
        }
        const track:Track = new Track(this.audioCtx);
        track.createFromStream(stream);
        return track;
    }

    /**
     * Add a source from a media element
     *
     * @param {HTMLMediaElement} mediaElement
     * @returns {Track}
     * @memberof JsAudioMerger
     */
    addFromElement(mediaElement: HTMLMediaElement): Track
    {
        const track: Track = new Track(this.audioCtx);
        track.createFromElement(mediaElement);


        return track;
    }

    /**
     * Removes a track 
     *
     * @param {Track} track
     * @memberof JsAudioMerger
     */
    removeTrack(track: Track): void
    {
        const trackIndex = this.tracks.findIndex((_track: Track) => _track === track);

        if (trackIndex > -1) {
            throw new Error('Track not found');
        }

        this.tracks.splice(trackIndex, 1);

        track.flush();        
    }
    
    /**
     * Clear all resources
     *
     * @memberof JsAudioMerger
     */
    flush(): void
    {
        this.tracks.forEach((track: Track) => this.removeTrack(track));
        this.audioCtx.close();
    }
}