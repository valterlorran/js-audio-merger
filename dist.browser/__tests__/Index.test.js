// import { Greeter } from '../index';
// test('My Greeter', () => {
//     expect(Greeter('Carl')).toBe('Hello Carl');
// });
import JsAudioMerger from '../Index';
test('Add By Stream', function () {
    var jsAudioMerger = new JsAudioMerger();
    var stream = new MediaStream();
    expect(jsAudioMerger.addFromStream(stream)).toThrowError('The stream does not have any audio tracks');
});
