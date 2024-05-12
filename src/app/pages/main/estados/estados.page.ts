import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject, Inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { orderBy } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';

//PDF
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

//Grafica
import { ChartDataset, ChartOptions } from 'chart.js';
import { formatDate } from '@angular/common';
type Label = string | string[];

@Component({
  selector: 'app-estados',
  templateUrl: './estados.page.html',
  styleUrls: ['./estados.page.scss'],
})
export class EstadosPage implements OnInit, OnDestroy {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  alertController = inject(AlertController);
  constancias: Product[] = [];
  filteredConstancias: Product[] = [];
  loading: boolean = false;
  page: number = 1;
  private subscription: Subscription;

  //GRAFICA
  cd = inject(ChangeDetectorRef);
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset[] = [
    { data: [], label: 'Constancias por Mes de 2023' }
  ];

  ngOnInit() {
    this.subscription = this.getProducts();
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  getProducts() {
    let path = `constancias`;
    this.loading = true;
    let query = orderBy('name', 'asc');

    return this.firebaseSvc.getCollectionData(path, query).subscribe({
      next: (res: any) => {
        this.constancias = res;
        this.filteredConstancias = this.constancias; // Asignamos todos los productos a filteredConstancs inicialmente
        this.loading = false;
        this.filterByState('Activo'); // Por defecto muestra datos del estado "Activo"
      }
    });
  }

  filterByState(estado: string) {
    if (this.constancias && this.constancias.length > 0) {
      this.filteredConstancias = this.constancias.filter(c => c.estado === estado);
      this.updateBarChartData(estado); // Actualizamos el gráfico con el estado seleccionado
    } else {
      this.filteredConstancias = [];
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateBarChartData(estado: string) {
    const monthlyCounts = Array(12).fill(0);

    // Filtramos los productos basados en el estado proporcionado
    const filteredProducts = this.constancias.filter(product => product.estado === estado);

    filteredProducts.forEach(product => {
      if (product.fechaCreacion && product.fechaCreacion.toDate) {
        const month = product.fechaCreacion.toDate().getMonth();
        monthlyCounts[month]++;
      }
    });

    // Crear una nueva instancia para barChartData
    this.barChartData = [
      { data: monthlyCounts, label: `Constancias por Mes de 2023 (${estado})` } // Hemos añadido el estado al label del gráfico
    ];

    // Forzar la detección de cambios
    this.cd.detectChanges();
  }

  //========= PDF =============
generatePDF() {
  let header = ['UID', 'Nombre', 'Email', 'Teléfono', 'Descripción', 'Cantidad', 'Tipo', 'Fecha Creación', 'Estado'];
  let data = [];

  // Cambia this.constancs por this.filteredConstancs
  this.filteredConstancias.forEach(product => {
      let rowData = [
          product.id,
          product.name,
          product.email,
          product.telefono,
          product.descripcion,
          product.cantidad,
          product.tipo,
          product.fechaCreacion ? formatDate(product.fechaCreacion.toDate(), 'dd/MM/yyyy', 'en-US') : '',
          product.estado
      ];
      data.push(rowData);
  });

  // Combine the header array with the data array
  let content = [header, ...data];
  let docDefinition = {
    content: [
        { text: `Lista de Constancias (${this.filteredConstancias[0]?.estado || 'Sin estado'})`, style: 'header', alignment: 'center' }, // Agregando el estado al título del PDF
        {
            layout: 'lightHorizontalLines',
            table: {
                headerRows: 1,
                body: content
            }
        }
    ],
    styles: {
        header: {
            fontSize: 22,
            bold: true,
            margin: [0, 0, 0, 10]
        }
    },
    pageOrientation: 'landscape'
  };

  pdfMake.createPdf(docDefinition).open();
}

  
}
