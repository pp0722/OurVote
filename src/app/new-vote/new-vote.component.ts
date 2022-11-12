import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { RpcService } from '../rpc.service';

@Component({
  selector: 'app-new-vote',
  templateUrl: './new-vote.component.html',
  styleUrls: ['./new-vote.component.sass']
})
export class NewVoteComponent implements OnInit {
  @Input() uuid?: string
  result?: {
    txid: string
    address: string
  }
  constructor(private rpcService: RpcService) { }

  ngOnInit(): void {
  }
  newVote (): void {
    this.rpcService.deploycontract(environment.votePath)
      .subscribe(res => {
        if (res.result != null) {
          this.result = {
            txid: res.result.txid,
            address: res.result['contract address']
          }
        } else {
          console.log('error:', res.error, '\nuse dummy instead')
          const result = this.dummyNewVote()
          this.result = {
            txid: result.txid,
            address: result['contract address']
          }
        }
      })
  }

  dummyNewVote () {
    return {
      txid: this.randomHex(64),
      'contract address': this.randomHex(64),
      id: 1
    }
  }

  randomHex (amount: number) {
    let out = ''
    while (amount-- > 0) {
      out += (Math.random() * 16).toString(16).substring(0, 1)
    }
    return out
  }
}
