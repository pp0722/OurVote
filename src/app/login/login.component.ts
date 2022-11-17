import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RpcService } from '../rpc.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  @Input() name: string = ''
  @Input() key: string = ''
  @Input() gmail: string = ''

  @Output() sendUUID: EventEmitter<string> = new EventEmitter()
  
  uuid?: string
  constructor(private rpcService: RpcService) { }

  ngOnInit(): void {
    this.rpcService.getBlockCount().subscribe(console.log)
  }

  login (): void {
    this.uuid = crypto.randomUUID()
    this.sendUUID.emit(this.uuid)
  }

}
