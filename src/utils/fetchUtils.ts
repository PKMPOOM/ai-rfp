import { useQuery } from "@tanstack/react-query";

export class AppAPI {
  basePath: string;
  constructor(path: `/${string}`) {
    this.basePath = `/api${path}`;
  }

  get = <T = any>(
    extraPath: string,
    options?: {
      queryKey?: any;
      shouldFetch?: boolean;
    },
  ) => {
    return useQuery<T>({
      queryKey: [
        options?.queryKey ? options?.queryKey : `${this.basePath}${extraPath}`,
      ],
      queryFn: async () => {
        const res = await fetch(`${this.basePath}${extraPath}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        return res.json();
      },
      enabled: options?.shouldFetch,
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

  put = (extraPath: string, data: any) => {
    return fetch(`${this.basePath}${extraPath}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  delete = (extraPath: string) => {
    return fetch(`${this.basePath}${extraPath}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  patch = (extraPath: string, data: any) => {
    return fetch(`${this.basePath}${extraPath}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  options = (extraPath: string) => {
    return fetch(`${this.basePath}${extraPath}`, {
      method: "OPTIONS",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}
