import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Moment } from 'src/app/Moment';
import { MomentService } from './../../../services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {
  btnText = "Compartilhar!";

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  async createHandler(moment: Moment) {
    const formData = new FormData();
    formData.append("title", moment.title);
    formData.append("description", moment.description);

    if(moment.image) {
      formData.append("image", moment.image);
    }

    // enviar para o servico
    await this.momentService.createMoment(formData).subscribe();

    // exibir msg
    this.messagesService.add("Momento adicionado com sucesso!");

    // redirect
    this.router.navigate(['/']);

  }

}
