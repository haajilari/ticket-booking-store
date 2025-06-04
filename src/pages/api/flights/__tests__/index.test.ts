// src/pages/api/flights/__tests__/index.test.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import flightsHandler from '../index'; // Path to the API handler file
import { FlightTicket } from '@/types/ticket';

// Mock req and res
const mockRequest = (method: string, query?: any, body?: any): Partial<NextApiRequest> => ({
  method,
  query: query || {},
  body: body || {},
  headers: {},
});

// A simple mock for res
const mockResponse = (): {
  status: jest.Mock;
  json: jest.Mock;
  setHeader: jest.Mock;
  end: jest.Mock;
  send: jest.Mock; // Added send for better compatibility
} => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res); // For chaining (res.status().json())
  res.json = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('/api/flights API Route', () => {
  it('should return a list of flights for GET requests', async () => {
    const req = mockRequest('GET') as NextApiRequest;
    const res = mockResponse() as unknown as NextApiResponse; // unknown for better type safety

    await flightsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    const responseJson = (res.json as jest.Mock).mock.calls[0][0]; // Get the first argument passed to res.json
    expect(Array.isArray(responseJson)).toBe(true);
    // You can perform additional checks on the returned data structure
    if (responseJson.length > 0) {
      expect(responseJson[0]).toHaveProperty('id');
      expect(responseJson[0]).toHaveProperty('flightNumber');
    }
  });

  it('should return 405 if method is not GET', async () => {
    const req = mockRequest('POST') as NextApiRequest; // Invalid method
    const res = mockResponse() as unknown as NextApiResponse;

    await flightsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Method POST Not Allowed',
    }));
  });
});