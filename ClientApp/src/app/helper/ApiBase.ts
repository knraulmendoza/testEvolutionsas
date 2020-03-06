import { HttpClient } from "@angular/common/http";


export default class ApiBase {
    public baseUrl = 'https://localhost:5001/api/';
    public config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token') != undefined ?localStorage.getItem('token'):''}` },
    };

    constructor(private http: HttpClient) { }
    async get(url: string) {
        let responseJson;
        try {
            return await this.http.get(this.baseUrl + url, this.config).toPromise();
            // responseJson = this.returnResponse(response);
        } catch (e) {
            return false;
        }
        return responseJson;
    }

    async post(url: string, body: any) {
        return await this.http.post(this.baseUrl + url, body, this.config).toPromise().then((data) => {
            return data;
        }).catch((error) => {
           console.log(error.response);
           return error.response;
        });
        // return this.returnResponse(response);
    }
    async put(url: string, body: any) {
        return await this.http.put(this.baseUrl + url, body, this.config).toPromise().then((data) => {
            return data;
        }).catch((error) => {
            return error.response.data;
        })
        // return this.returnResponse(response);
    }

    async delete(url: string) {
        const response = await this.http.delete(this.baseUrl + url, this.config).toPromise().then((data) => {
            return data;
        }).catch((error) => {
            console.log(error);
            return error.response;
        })
        return this.returnResponse(response);
    }

    public returnResponse(response: any) {
        console.log(response);
        switch (response.status) {
            case 200:
                return response.data;
            case 400:
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
