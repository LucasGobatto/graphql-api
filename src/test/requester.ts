import axios, { AxiosResponse } from "axios";
import request from "supertest";

export type HttpMethods = "GET" | "POST" | "DELETE" | "PATCH";

interface GraphqlResponse<T> {
  data: T;
  error: any;
}

export class Requester {
  private baseUrl: string;
  private headers: any = {};
  private token: string;

  constructor() {
    this.baseUrl = `http://localhost:${process.env.PORT}`;
  }

  async makeGraphQLRequest<T>(
    query: string,
    variables?: any
  ): Promise<GraphqlResponse<T>> {
    const requester = request(this.baseUrl).post("/graphql");

    requester.set("Content-Type", "application/json");
    this.token && requester.set("Authorization", this.token);

    const response = await requester.send({ query, variables });

    return { data: response.body?.data, error: response.body?.error };
  }

  async makeRestRequest<T>(
    method: HttpMethods,
    path: string,
    data?: any
  ): Promise<AxiosResponse<T, any>> {
    const response = await axios({
      baseURL: this.baseUrl,
      url: path,
      method,
      headers: this.headers,
      data,
    });

    const token = response.data?.token;
    token && this.setToken(token);

    return response;
  }

  setBaseUrlPort(port: number) {
    this.baseUrl = `http://localhost:${port}`;
    return this;
  }

  setToken(token: string) {
    this.token = token;
    return this;
  }

  setHeaders(headers: any) {
    this.headers = { ...headers, authorization: this.token };
    return this;
  }
}
