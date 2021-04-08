import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-no-result',
  templateUrl: './no-result.component.html',
  styleUrls: ['./no-result.component.scss']
})
export class NoResultComponent {
  // HTML Inputs
  template = {
    title: 'Pas de résultat',
    content: 'Nous n\'avons pas trouvé d\'équipement correspondant à ta recherche',
    button: {
      label: 'Retour'
    },
  };

  @Output() noResultEvent = new EventEmitter<any>();

  constructor() { }

  handleClick(): void {
    this.noResultEvent.emit();
  }
}
