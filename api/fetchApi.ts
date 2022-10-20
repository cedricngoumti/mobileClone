export default function fetchApi(endpoint?: string) {
  const apiHost = "http://lacleanikauto.com/smobil/public";

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return {
    get: async (params?: any) => {
      const data = await fetch(`${apiHost}/${endpoint}${params ?? ""}`, {
        method: "GET",
      });

      return data.json();
    },
    post: async (params?: any) => {
      const data = await fetch(`${apiHost}/${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(params),
      });

      return data.json();
    },
    login: async (params?: any) => {
      const data = await fetch(
        `${apiHost}/login?email=${params.email}&password=${params.password}`,
        {
          method: "POST",
        }
      );

      return data.json();
    },
    register: async (params?: any) => {
      const data = await fetch(
        `${apiHost}/register?email=${params.email}&password=${params.password}&confirm_password=${params.confirm_password}`,
        {
          method: "POST",
          body: JSON.stringify(params),
        }
      );

      return data.json();
    },
  };
}
