import { Component, Input, OnInit } from '@angular/core';
import { RpcService } from '../rpc.service';

@Component({
  selector: 'app-freeze',
  templateUrl: './freeze.component.html',
  styleUrls: ['./freeze.component.sass']
})
export class FreezeComponent implements OnInit {
  @Input() uuid?: string
  address?: string
  constructor(private rpcService: RpcService) { }

  ngOnInit(): void {
  }

  freeze (address?: string) {
    if (address == null) return
    if (this.uuid == null) return

    const admin_uuid = this.uuid
    const admin_signature = ''
    const args = ['freeze', admin_uuid, admin_signature]
    this.rpcService.callcontract(address, args)
      .subscribe(obj => {
        console.log('freeze', obj)
      })
  }
}
