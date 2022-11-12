import { Component, OnInit } from '@angular/core';
import { RpcService } from '../rpc.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {
  address?: string
  constructor(private rpcService: RpcService) { }

  ngOnInit(): void {
  }

  result (address?: string) {
    if (address == null) return
    this.rpcService.dumpcontractmessage(address)
      .subscribe(obj => {
        console.log('result', obj)
      })
  }
}
