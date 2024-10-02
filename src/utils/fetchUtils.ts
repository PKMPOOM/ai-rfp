import { useQuery } from "@tanstack/react-query";

export class AppAPI {
  basePath: string;
  constructor(path: `/${string}`) {
    this.basePath = `/api${path}`;
  }

  get = async (extraPath: string) => {
    const fetcher = () =>
      fetch(`${this.basePath}${extraPath}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    return useQuery({
      queryKey: [extraPath],
      queryFn: fetcher,
    });
  };

  post = (extraPath: string, data: any) => {
    return fetch(`${this.basePath}${extraPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
}
