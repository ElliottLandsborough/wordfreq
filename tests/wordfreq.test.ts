import { wordFreq } from '../src/wordfreq';

it('empty', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await wordFreq('text/empty.txt');
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toHaveBeenLastCalledWith('No words found.')
    consoleSpy.mockClear();
});

it('file1', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await wordFreq('text/file1.txt');
    expect(console.log).toBeCalledTimes(7);
    expect(consoleSpy.mock.calls).toEqual([
        ["is:", 2],
        ["dummy:", 1],
        ["ipsum:", 1],
        ["it:", 1],
        ["lorem:", 1],
        ["simply:", 1],
        ["text:", 1],
    ]);
    consoleSpy.mockClear();
});

it('file2', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await wordFreq('text/file2.txt');
    expect(console.log).toBeCalledTimes(7);
    expect(consoleSpy.mock.calls).toEqual([
        ["is:", 2],
        ["dummy:", 1],
        ["ipsum:", 1],
        ["it:", 1],
        ["lorem:", 1],
        ["simply:", 1],
        ["text:", 1],
    ]);
    consoleSpy.mockClear();
});

it('small text', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await wordFreq('text/hello.small.txt');
    expect(console.log).toBeCalledTimes(2);
    expect(consoleSpy.mock.calls).toEqual([
        ["hello:", 5],
        ["world:", 2]
    ]);
    consoleSpy.mockClear();
});

it('medium text', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await wordFreq('text/lipsum.medium.txt');
    expect(console.log).toBeCalledTimes(186);
    consoleSpy.mockClear();
});