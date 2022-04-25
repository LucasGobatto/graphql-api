import axios from "axios";

export class Requester {
  private baseUrl = `http:localhost:${process.env.PORT}/graphql`;
  private headers: any = {};
  private variables: any;
  private query: string;

  async makeRequest() {
    if (!this.query) {
      throw new Error("Must set a query before make the request");
    }

    const response = await axios({
      url: this.baseUrl,
      method: "post",
      headers: this.headers,
      data: { query: this.query, variables: this.variables },
    });

    return response;
  }

  setVariables(variables: any) {
    this.variables = variables;
    return this;
  }

  setHeaders(headers: any) {
    this.headers = headers;
    return this;
  }

  setQuery(query: string) {
    this.query = query;
    return this;
  }
}
