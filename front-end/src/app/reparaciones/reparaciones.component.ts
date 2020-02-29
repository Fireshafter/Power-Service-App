import { Component, OnInit } from '@angular/core';
import { ReparacionService } from './reparacion.service';
import { Reparacion } from './clases/reparacion';
import { Cliente } from './clases/cliente';
import { Dispositivo } from './clases/dispositivo';
import { Servicio } from './clases/servicio';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrls: ['./reparaciones.component.scss']
})
export class ReparacionesComponent implements OnInit {
  constructor(private _reparacionService: ReparacionService) { }
  
  resguardos: Reparacion[] = [
    new Reparacion(0, 34567, 'Pendiente de revisión', new Date("2020-02-27"), new Date('2020-02-28'), 'Power Service', new Cliente('Emilio', 'Sansano Romero', 'Tenerias', 7, 12001, 'Castellón', 'España', '651244681', 'emilio.sansano@agilcentros.es'), new Dispositivo('iPhone 7 Plus', 'Apple', ['Abierto/Usado', 'Rallado', 'Agrietado']), 'Reparación pantalla original', 'Viene con la pantalla rota, cambiar por original', [new Servicio('Pantalla iPhone 7 Plus original', 79.99)], []),
    // new Reparacion(1, 34566, new Date("2020-02-27"), new Date('2020-02-28'), 'iPad Air 3', 'Reparación táctil compatible', 'Viene con la pantalla rota, cambiar por compatible'),
    // new Reparacion(2, 34565, new Date("2020-02-27"), new Date('2020-02-28'), 'Dell XPS 13', 'Instalación M.2. 1TB', 'Sustituir disco M.2. de serie por nuevo de 1TB'),
    // new Reparacion(3, 34564, new Date("2020-02-23"), new Date('2020-02-28'), 'HP ProDesk 4010', 'Revisión dispositivo', 'Hay que averiguar que mierda le pasa a esta basura'),
    // new Reparacion(4, 34562, new Date("2020-02-18"), new Date('2020-02-28'), 'Mac Mini 2014', 'Instalacion SSD 480', 'Instalar disco duro SSD 480 y reinstalar macOS'),
    // new Reparacion(5, 34552, new Date("2020-02-15"), new Date('2020-02-28'), 'Thinkpad X1 Carbon 2', 'Revision dispositivo', 'Enciende pero no muestra imagem, revisar y presupuestar en laboratorio')
  ];

  ngOnInit() {
  }

  crearReparacion(reparacion: Reparacion){
    this.resguardos.push(reparacion);
  }

  // getResguardos() {
  //   this._reparacionService.listar()
  //     .then(resguardos => this.resguados = <Reparacion[]>resguardos)
  // }

}
