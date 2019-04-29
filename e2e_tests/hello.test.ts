import { req } from 'request-promise-lite';

const BASE_URL = process.env.BASE_URL;

describe('Hello class', () => {
  it('GET has to return msg with id', () => {
    expect.assertions(1);

    return req.get(BASE_URL + '/api/hello/45', { json: true}).then(data => expect(data.msg).toBe('Hello from 45'));
  });
});
