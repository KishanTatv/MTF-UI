import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CompanyService } from '../../service/company-service';
import { ITenant } from '../../interface/company.interface';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-company',
  imports: [MatTableModule],
  templateUrl: './company.html',
  styleUrl: './company.scss',
})
export class Company implements OnInit {
  displayedColumns: string[] = ['tenantName', 'contactEmail'];
  companyData: WritableSignal<ITenant[]> = signal([]);
  private companyService = inject(CompanyService);

  ngOnInit(): void {
    this.getTenantData();
  }

  getTenantData() {
    this.companyService.GetTenantList().subscribe({
      next: (res) => {
        if (res) {
          this.companyData.set(res.data);
        }
      },
      error: (err) => {},
    });
  }
}
