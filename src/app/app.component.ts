import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app',
  template: `
    <h1>{{title}}</h1>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'boilerplate works!';
}
