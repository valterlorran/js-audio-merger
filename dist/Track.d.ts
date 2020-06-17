/**
 * Represents a track that is to be merged with other audios
 */
export default class Track {
    /**
     * A type of AudioNode which operates as an audio source whose media is received
     * from a MediaStream obtained using the WebRTC or Media Capture and Streams APIs
     *
     * @type {(MediaStreamAudioSourceNode | MediaElementAudioSourceNode | null)}
     * @memberof Track
     */
    source: MediaStreamAudioSourceNode | MediaElementAudioSourceNode | null;
    /**
     * An audio-processing graph built from audio modules linked together, each represented
     * by an AudioNode.
     *
     * @type {AudioContext}
     * @memberof Track
     */
    audioCtx: AudioContext;
    /**
     * Creates an instance of Track.
     * @param {AudioContext} audioCtx
     * @memberof Track
     */
    constructor(audioCtx: AudioContext);
    /**
     * Creates a source from a stream and merges it in the audio context
     *
     * @param {MediaStream} stream
     * @memberof Track
     */
    createFromStream(stream: MediaStream): void;
    /**
     * Creates a source from a media element and merges it in the audio context
     *
     * @param {HTMLMediaElement} mediaElement
     * @memberof Track
     */
    createFromElement(mediaElement: HTMLMediaElement): void;
    /**
     * Pauses the audio
     *
     * @memberof Track
     */
    pause(): void;
    /**
     * Plays the audio
     *
     * @memberof Track
     */
    play(): void;
    /**
     * Disconnects the context destination, releasing resources
     *
     * @memberof Track
     */
    flush(): void;
    /**
     * Create an audio element to start play the stream
     * @param {MediaStream} stream
     * @memberof Track
     */
    private quickPlayStreamFix;
}
