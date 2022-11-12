import { Component, Input, OnInit } from '@angular/core';
import { RpcService } from '../rpc.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  @Input() uuid?: string
  @Input() address?: string
  signedAdresses: string[] = []
  constructor(private rpcService: RpcService) { }

  ngOnInit(): void {
  }

  signup (address?: string) {
    if (address == null) return
    if (this.uuid == null) return
    const uuid = this.uuid
    const pubkey = ''
    const hash = ''
    const args = ['sign_up', uuid, pubkey, hash]
    this.rpcService.callcontract(address, args)
      .subscribe(res => {
        console.log('sign_up', res)
      })
  }
}
