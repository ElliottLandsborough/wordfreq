import { wordFreq } from '../src/wordfreq';

it('small text', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await wordFreq('books/hello.small.txt');
    expect(console.log).toBeCalledTimes(2);
    expect(consoleSpy.mock.calls).toEqual([
        ["hello:", 5],
        ["world:", 2]
      ]);
    consoleSpy.mockRestore();
});

it('medium text', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await wordFreq('books/lipsum.medium.txt');
    expect(console.log).toBeCalledTimes(186);
});