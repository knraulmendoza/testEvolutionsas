import { HttpClient } from "@angular/common/http";


export default class ApiBasa {
    public baseUrl = 'https://localhost:5001/api/';
    public config = {
        headers: { Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9hdXRoXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE1ODI1MjMxNzcsImV4cCI6MTU4MjUyNjc3NywibmJmIjoxNTgyNTIzMTc3LCJqdGkiOiJuSzFic0lrZERKUTZ0UXJRIiwic3ViIjozOSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.4cWkwB22I_bLY_4bJriARz9EQ1BPREfWFaNjiR-nc2w` },
    };

    constructor(private http: HttpClient) { }
    async get(url: string) {
        let responseJson;
        try {
            const response = await this.http.get(this.baseUrl + url, this.config).toPromise();
            responseJson = this.returnResponse(response);
        } catch (e) {
            return 'error';
        }
        return responseJson;
    }

    async post(url: string, body: any) {
        const response = await this.http.post(this.baseUrl + url, body, this.config).toPromise().then((data) => {
            return data;
        }).catch((error) => {
           console.log(error.response);
           return error.response;
        });
        return this.returnResponse(response);
    }
    async put(url: string, body: any) {
        const response = await this.http.put(this.baseUrl + url, body, this.config).toPromise().then((data) => {
            return data;
        }).catch((error) => {
            return error.response.data;
        })
        return this.returnResponse(response);
    }

    async delete(url: string) {
        const response = await this.http.delete(this.baseUrl + url, this.config).toPromise().then((data) => {
            return data;
        }).catch((error) => {
            return error.response;
        })
        return this.returnResponse(response);
    }

    public returnResponse(response: any) {

        switch (response.status) {
            case 200:
                return response.data;
            case 401:
                console.log(response.data);
                return response
            case 422:
                return response.data.errors
            case 500:
                return response
            default:
                break;
        }
    }
}
