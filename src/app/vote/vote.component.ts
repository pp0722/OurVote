import { Component, Input, OnInit } from '@angular/core';
import { RpcService } from '../rpc.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.sass']
})
export class VoteComponent implements OnInit {
  @Input() uuid?: string
  address?: string
  candidates?: string[]
  constructor(private rpcService: RpcService) { }

  ngOnInit(): void {
  }

  voteShow (address?: string) {
    if (address == null) return
    this.rpcService.dumpcontractmessage(address)
      .subscribe(obj => {
        console.log('voteShow', obj)
        try {
          this.candidates = obj.result.split('\n').splice(-1)
        } catch (e) {
        }
      })

  }
  vote (voteFor: string) {
    if (this.address == null) return
    if (this.uuid == null) return
    const userSignature = ''
    const args = ['vote', this.uuid, userSignature, voteFor]
    this.rpcService.callcontract(this.address, args)
      .subscribe(obj => {
        console.log('vote', obj)
      })
  }
}
