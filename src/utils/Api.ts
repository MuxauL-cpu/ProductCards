class Api {
  private _url: string;

  constructor(url: string) {
    this._url = url;
  }

  getProducts() {
    return fetch(`${this._url}`).then((res) => this._getResponse(res));
  }

  getCurrentProduct(id: number) {
    return fetch(`${this._url}/${id}`, {
      method: "GET",
    }).then((res) => this._getResponse(res));
  }

  private _getResponse(res: Response): Promise<any> {
    if (!res.ok) {
      return res.json().then((errorData) => {
        return Promise.reject({
          status: res.status,
          statusText: res.statusText,
          error: errorData,
        });
      });
    }
    return res.json();
  }
}

const api = new Api("https://fakestoreapi.com/products");

export default api;
