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
    public source: MediaStreamAudioSourceNode | MediaElementAudioSourceNode | null = null;

    /**
     * An audio-processing graph built from audio modules linked together, each represented 
     * by an AudioNode.
     *
     * @type {AudioContext}
     * @memberof Track
     */
    public audioCtx: AudioContext;
    
    /**
     * Creates an instance of Track.
     * @param {AudioContext} audioCtx
     * @memberof Track
     */
    constructor(audioCtx: AudioContext)
    {
        this.audioCtx = audioCtx;
    }

    /**
     * Creates a source from a stream and merges it in the audio context
     * 
     * @param {MediaStream} stream
     * @memberof Track
     */
    public createFromStream(stream: MediaStream): void
    {
        this.source = this.audioCtx.createMediaStreamSource(stream);
        this.source.connect(this.audioCtx.destination);

        this.quickPlayStreamFix(stream);
    }

    /**
     * Creates a source from a media element and merges it in the audio context
     * 
     * @param {HTMLMediaElement} mediaElement
     * @memberof Track
     */
    public createFromElement(mediaElement: HTMLMediaElement): void
    {
        this.source = this.audioCtx.createMediaElementSource(mediaElement);
        this.source.connect(this.audioCtx.destination);
    }

    /**
     * Pauses the audio
     *
     * @memberof Track
     */
    public pause()
    {
        this.audioCtx.suspend();
    }

    /**
     * Plays the audio
     *
     * @memberof Track
     */
    public play()
    {
        this.audioCtx.resume();
    }

    /**
     * Disconnects the context destination, releasing resources
     * 
     * @memberof Track
     */
    public flush(): void
    {
        this.source?.disconnect(this.audioCtx.destination);
    }

    /**
     * Create an audio element to start play the stream
     * @param {MediaStream} stream
     * @memberof Track
     */
    private quickPlayStreamFix(stream: MediaStream): void
    {
        const sound: HTMLMediaElement = document.createElement('audio');
        sound.controls = false;
        sound.muted = true;
        sound.srcObject = stream;
        sound.onloadeddata = () => {
            sound.play();
            setTimeout(() => {
                sound.remove();
            }, 2000);
        }
    }
}