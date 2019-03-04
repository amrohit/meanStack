import { NgModule } from "@angular/core";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialog,
  MatDialogModule
} from "@angular/material";

@NgModule({
  // imports: [
  //   MatInputModule,
  //   MatCardModule,
  //   MatButtonModule,
  //   MatToolbarModule,
  //   MatExpansionModule,
  //   MatProgressSpinnerModule,
  //   MatPaginatorModule,
  //   MatDialogModule
  // ], importing will be auto done by angular
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class AngularMaterialModule {}
