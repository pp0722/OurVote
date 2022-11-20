import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

interface rpcResult {
  result: any
  error: any
  id: any
}
interface rpcRequestBody {
  method: string
  params?: string[]
  id?: string
}

@Injectable({
  providedIn: 'root'
})
export class RpcService {
  constructor(
    private http: HttpClient
  ) { }

    private handleError (error: HttpErrorResponse) {
      console.error(`status: ${error.status}, error: ${error.error}`)
      return throwError(() => new Error('Error.'))
    }

  rpc (method: string, params: string[] = []): Observable<rpcResult> {
    const body: rpcRequestBody = {
      method,
      params
    }
    
    const auth = `${environment.rpcuser}:${environment.rpcpass}`
    const basicAuth = `Basic ${btoa(auth)}`
    const header = new HttpHeaders()
      .set('Authorization', basicAuth)
    const url = `/rpc`
    return this.http.post(url, body, { headers: header }).pipe(
      timeout<any>(3000),
      catchError(this.handleError)
    )
  }

  deploycontract (contractPath: string, args: string[] = []): Observable<rpcResult> {
    args.unshift(contractPath)
    return this.rpc('deploycontract', args)
  }
  callcontract (address: string, args: string[] = []): Observable<rpcResult> {
    args.unshift(address)
    return this.rpc('callcontract', args)
  }
  dumpcontractmessage (address: string, args: string[] = []): Observable<rpcResult> {
    args.unshift(address)
    return this.rpc('dumpcontractmessage', args)    
  }
  getBlockCount () {
    return this.rpc('getblockcount')
  }
}
