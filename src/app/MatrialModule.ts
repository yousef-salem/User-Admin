import { NgModule } from '@angular/core';

// Angular Material modules and imports

// MatAutocompleteModule
import { MatAutocompleteModule } from '@angular/material/autocomplete';

// MatButtonModule
import { MatButtonModule } from '@angular/material/button';

// MatButtonToggleModule
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// MatCardModule
import { MatCardModule } from '@angular/material/card';

// MatCheckboxModule
import { MatCheckboxModule } from '@angular/material/checkbox';

// MatChipsModule
import { MatChipsModule } from '@angular/material/chips';

// MatDatepickerModule
import { MatDatepickerModule } from '@angular/material/datepicker';

// MatDialogModule
import { MatDialogModule } from '@angular/material/dialog';

// MatExpansionModule
import { MatExpansionModule } from '@angular/material/expansion';

// MatFormFieldModule
import { MatFormFieldModule } from '@angular/material/form-field';

// MatGridListModule
import { MatGridListModule } from '@angular/material/grid-list';

// MatIconModule
import { MatIconModule } from '@angular/material/icon';

// MatInputModule
import { MatInputModule } from '@angular/material/input';

// MatListModule
import { MatListModule } from '@angular/material/list';

// MatMenuModule
import { MatMenuModule } from '@angular/material/menu';

// MatNativeDateModule
import { MatNativeDateModule } from '@angular/material/core';

// MatPaginatorModule
import { MatPaginatorModule } from '@angular/material/paginator';

// MatProgressBarModule
import { MatProgressBarModule } from '@angular/material/progress-bar';

// MatRadioModule
import { MatRadioModule } from '@angular/material/radio';

// MatSelectModule
import { MatSelectModule } from '@angular/material/select';

// MatSidenavModule
import { MatSidenavModule } from '@angular/material/sidenav';

// MatSlideToggleModule
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// MatSliderModule
import { MatSliderModule } from '@angular/material/slider';

// MatSnackBarModule
import { MatSnackBarModule } from '@angular/material/snack-bar';

// MatSortModule
import { MatSortModule } from '@angular/material/sort';

// MatStepperModule
import { MatStepperModule } from '@angular/material/stepper';

// MatTableModule
import { MatTableModule } from '@angular/material/table';

// MatToolbarModule
import { MatToolbarModule } from '@angular/material/toolbar';

// MatTooltipModule
import { MatTooltipModule } from '@angular/material/tooltip';


const materials: any = [
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
];
    @NgModule({
imports:[materials],
exports:[materials]
    })
  export  class MaterialModule{}