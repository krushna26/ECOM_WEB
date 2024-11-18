import { Component, Input ,OnChanges,SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-summery',
  templateUrl: './summery.component.html',
  styleUrls: ['./summery.component.css']
})
export class SummeryComponent {
  @Input() selectedItems: any[] = [];
  
  

  constructor() { }

  



}
