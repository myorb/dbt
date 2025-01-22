const request = require('supertest');
const app = require('../src/app');

describe('Contracts Endpoints', () => {
  it('should return 401 if profile_id header is not set', async () => {
    const res = await request(app).get('/contracts/1');
    expect(res.statusCode).toEqual(401);
  });

  it('should return a contract by id', async () => {
    const res = await request(app).get('/contracts/1').set('profile_id', 1);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('ClientId');
  });

  it('should return 404', async () => {
    const res = await request(app)
      .get('/contracts/123131')
      .set('profile_id', 1);
    expect(res.statusCode).toEqual(404);
  });

  it('should return 401', async () => {
    const res = await request(app)
      .get('/contracts/sdasdasdad')
      .set('profile_id', 1);
    expect(res.statusCode).toEqual(404);
  });

  it('should return a list of contracts', async () => {
    const res = await request(app).get('/contracts').set('profile_id', 1);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});

describe('Jobs Endpoints', () => {
  it('should return a list of unpaid jobs', async () => {
    const res = await request(app).get('/jobs/unpaid').set('profile_id', 1);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].Contract.status).toBe('in_progress');
  });

  it('should deposit money into the balance of a client', async () => {
    const res = await request(app)
      .post('/balances/deposit/1')
      .set('profile_id', 1)
      .send({ amount: 50 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.balance).toBe(1200);
  });

  it('should not deposit money into the balance of a client', async () => {
    const res = await request(app)
      .post('/balances/deposit/1')
      .set('profile_id', 1)
      .send({ amount: 1150 });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe(
      'Cannot deposit more than 25% your total of jobs to pay'
    );
  });

  it('should pay for a job', async () => {
    const res = await request(app).post('/jobs/1/pay').set('profile_id', 1);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Payment sucessfull');
  });

  it('should not found job', async () => {
    const res = await request(app).post('/jobs/2213/pay').set('profile_id', 2);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('No unpaid job found');
  });
});

describe('Admin Endpoints', () => {
  it('should return the best profession', async () => {
    const res = await request(app)
      .get(
        '/admin/best-profession?start=2020-08-14T23:11:26.737Z&end=2050-01-13'
      )
      .set('profile_id', 'admin');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.bestProfession).toBe('Programmer');
    expect(res.body.data.total).toBe(2683);
  });

  it('should return the best clients', async () => {
    const res = await request(app)
      .get(
        '/admin/best-clients?start=2020-08-14T23:11:26.737Z&end=2050-01-13&limit=2'
      )
      .set('profile_id', 'admin');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.length).toBe(2);
    expect(res.body.data[0].fullName).toBe('Ash Kethcum');
    expect(res.body.data[0].paid).toBe(2020);
  });

  it('not admin', async () => {
    const res = await request(app)
      .get(
        '/admin/best-clients?start=2020-08-14T23:11:26.737Z&end=2050-01-13&limit=2'
      )
      .set('profile_id', 'not admin');
    expect(res.statusCode).toEqual(401);
  });
});
