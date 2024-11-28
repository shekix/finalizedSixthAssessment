import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule,AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  
  loader:Subject<boolean>;

  constructor( loaderService: LoaderService) {
    this.loader = loaderService.isLoading
    
  }

   
}
