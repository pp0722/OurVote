import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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

  rpc (method: string, params: string[] = []): Observable<any> {
    const body: rpcRequestBody = {
      method,
      // ↓ maybe need to remove "[]"
      params
      // ↓ maybe need this
      // id: '1'
    }
    const auth = `${environment.rpcuser}:${environment.rpcpass}`
    
    const url = `http://${auth}@${environment.rpchost}:${environment.rpcport}`
    return this.http.post(url, body).pipe(
      /*
      timeout(3000),
      catchError(err => of({
        result: null,
        error: `Request timed out.`,
        id: body.id ?? null
      }))
      */
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
  dumpcontractmessage (address: string, args: string[] = []): Observable<string> {
    args.unshift(address)
    return this.rpc('dumpcontractmessage', args)    
  }
}
