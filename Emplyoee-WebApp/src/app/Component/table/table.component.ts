import { Component, EventEmitter, Input,Output } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-table',
  imports: [MatTableModule,MatCardModule,MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
 @Input() data: any[] = [];
 @Input() displayedColumns : any [] = [];
 @Output() onedit = new EventEmitter<any>();
 @Output() ondelete = new EventEmitter<any>();

edit (rowData:any){
this.onedit.emit(rowData);
 }
  
 delete(rowData:any){
 this.ondelete.emit(rowData);
 }
}
