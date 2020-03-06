import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { loadModules, setDefaultOptions } from "esri-loader";
import * as alertify from "alertifyjs";
@Component({
  selector: "app-esri-map",
  templateUrl: "./mapa.component.html",
  styleUrls: ["./mapa.component.css"]
})

export class MapaComponent implements OnInit, OnDestroy {
  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;
    view: any;
    public table:any[] = [];

  constructor() {}

  async initializeMap() {
    try {
      setDefaultOptions({ css: true });
      // Load the modules for the ArcGIS API for JavaScript
      const [Map, MapView, FeatureLayer, Button, Dialog] = await loadModules(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer","dijit/form/Button","dijit/Dialog", "dojo/domReady!","esri/layers/support/LabelClass"]);

      // Configure the Map
      const mapProperties = {
        basemap: "streets"
      };
      let popupTrailheads = {
        "title": "{DPTO_CNMBRE}",
        "content": "<b>Año:</b> {DPTO_NANO_CREACION}<br><b>Codigo:</b> {DPTO_CCDGO}<br><b>Area Oficial:</b> {DPTO_NAREA} ft"
      }
    //visualizar los departamentos
      let nomColLabel = {
        symbol : {
          type: "text",
          color: "white",
          haloColor: "black",
          haloSize: "1px",
          font: {
            size: "13px",
            family: "Noto Sans",
            style : "italic",
            weight: "normal"
          }
        },
        labelPlacement: "above-center",
        labelExpressionInfo : {
          expression : "$feature.DPTO_CNMBRE"
        }
      }
      let trailheadsLayer = new FeatureLayer({
        url: "https://ags.esri.co/server/rest/services/DA_DANE/departamento_mgn2016/MapServer",
        outFields: ["*"],
        popupTemplate: popupTrailheads ,
        opacity: .3,
        renderer: {
          type: "simple",
          symbol : {
            type: "simple-fill",
            color: "blue",
            style: "solid",
            outline : {
              color: "black",
              width : 1
            }
          }
        },
        labelingInfo : [nomColLabel]
      });
      let verPopup = {
        "title": "Información de {NOMBRE_VER}",
        "content": [
            {
                "type": "fields",
                "fieldInfos": [
                    {
                        "fieldName": "OBJECTID",
                        "label": "Id",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": null,
                        "stringFieldOption": "text-box"
                    },
                    {
                        "fieldName": "DPTOMPIO",
                        "label": "DPTOMPIO",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": null,
                        "stringFieldOption": "text-box"
                    },
                    {
                        "fieldName": "CODIGO_VER",
                        "label": "CODIGO_VER",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": null,
                        "stringFieldOption": "text-box"
                    },
                    {
                        "fieldName": "NOM_DEP",
                        "label": "NOM_DEP",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": null,
                        "stringFieldOption": "text-box"
                    },
                    {
                        "fieldName": "NOMB_MPIO",
                        "label": "NOMB_MPIO",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": null,
                        "stringFieldOption": "text-box"
                    },
                    {
                        "fieldName": "NOMBRE_VER",
                        "label": "NOMBRE_VER ",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": null,
                        "stringFieldOption": "text-box"
                    },
                    {
                        "fieldName": "VIGENCIA",
                        "label": "VIGENCIA",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": null,
                        "stringFieldOption": "text-box"
                    },
                    {
                        "fieldName": "FUENTE",
                        "label": "FUENTE",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": null,
                        "stringFieldOption": "text-box"
                    },
                    {
                        "fieldName": "DESCRIPCIO",
                        "label": "DESCRIPCIO",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": null,
                        "stringFieldOption": "text-box"
                    },
                    {
                        "fieldName": "SEUDONIMOS",
                        "label": "SEUDONIMOS",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": null,
                        "stringFieldOption": "text-box"
                    },
                    {
                        "fieldName": "AREA_HA",
                        "label": "AREA_HA",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": null,
                        "stringFieldOption": "text-box"
                    },
                    {
                        "fieldName": "COD_DPTO",
                        "label": "COD_DPTO",
                        "isEditable": true,
                        "tooltip": "",
                        "visible": true,
                        "format": null,
                        "stringFieldOption": "text-box"
                    }
                ]
            }]
      };
      
      const map = new Map(mapProperties);
      map.add(trailheadsLayer);
      // Initialize the MapView
      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: [-74.2973328, 4.570868],
        zoom: 6,
        map: map
      };
      
      // var featureLayer = new FeatureLayer("http://services3.arcgis.com/gzPLi0vbk0c1QVGb/arcgis/rest/services/Gasolinerasshape/FeatureServer/0");
      // map.addLayer(featureLayer);

      this.view = new MapView(mapViewProperties);
      let verMapaVeredas = function () {
        var nomColLabel = {
            symbol: {
                type: "text",
                color: "white",
                haloColor: "black",
                haloSize: "1px",
                font: {
                    size: "12px",
                    family: "Noto Sans",
                    style: "italic",
                    weight: "normal"
                }
            },
            labelPlacement: "above-center",
            labelExpressionInfo: {
                expression: "$feature.NOMBRE_VER"
            }
        };

        let verColLayer = new FeatureLayer({
            url: "https://ags.esri.co/server/rest/services/DA_DatosAbiertos/VeredasColombia/MapServer/0",
            outFields: ["*"],//["OBJECTID","DPTOMPIO", "NOMBRE_VER", "FUENTE", "NOMB_MPIO", "NOM_DEP", "COD_DPTO"],
            opacity: .4,
            labelingInfo: [nomColLabel],
            //definitionExpression: "NOM_DEP = 'Cesar'",
            popupTemplate: verPopup,
        });


        const query = { // autocasts as Query
            where: "1=1",
            returnGeometry: false,
            outFields: ["*"],//["OBJECTID","DPTOMPIO", "NOMBRE_VER", "FUENTE", "NOMB_MPIO", "NOM_DEP", "COD_DPTO"],

        };
        verColLayer.queryFeatures(query).then(function (results) {
          console.log(results);
            if (this.table.length === 0) {
                results.features.forEach(x => {
                    this.table.push({
                        "OBJECTID": x.attributes.OBJECTID,
                        "DPTOMPIO": x.attributes.DPTOMPIO,
                        "NOMBRE_VER": x.attributes.NOMBRE_VER,
                        "FUENTE": x.attributes.FUENTE,
                        "NOMB_MPIO": x.attributes.NOMB_MPIO,
                        "NOM_DEP": x.attributes.NOM_DEP,
                        "COD_DPTO ": x.attributes.COD_DPTO,
                        "ShapeArea": x.attributes["Shape.STArea()"],
                        "ShapeLength": x.attributes["Shape.STLength()"]
                    });
                });
            }
            this.view.extent = results.features[0].geometry.extent;
            // $.notify("Veredas cargadas");
        });
        // map.add(verColLayer);
    };
    //visualizar las veredas
    let verVeredas = ()=> {
      let table = this.table;
      //deptDialog.show();
      let nomColLabel = {
          symbol: {
              type: "text",
              color: "white",
              haloColor: "black",
              haloSize: "1px",
              font: {
                  size: "12px",
                  family: "Noto Sans",
                  style: "italic",
                  weight: "normal"
              }
          },
          labelPlacement: "above-center",
          labelExpressionInfo: {
              expression: "$feature.NOMBRE_VER"
          }
      };

      let verColLayer = new FeatureLayer({
          url: "https://ags.esri.co/server/rest/services/DA_DatosAbiertos/VeredasColombia/MapServer/0",
          outFields: ["*"],//["OBJECTID","DPTOMPIO", "NOMBRE_VER", "FUENTE", "NOMB_MPIO", "NOM_DEP", "COD_DPTO"],
          opacity: .4,
          labelingInfo: [nomColLabel],
          //definitionExpression: "NOM_DEP = 'Cesar'",
          popupTemplate: verPopup,
      });
      const query = { // autocasts as Query
        where: "1=1",
        // returnGeometry: false,
        outFields: ["*"],//["OBJECTID","DPTOMPIO", "NOMBRE_VER", "FUENTE", "NOMB_MPIO", "NOM_DEP", "COD_DPTO"],

      };
        verColLayer.queryFeatures(query).then(function (results) {
          if (table.length === 0) {
            for (let index = 0; index < 20; index++) {
              // const element = array[index];
              console.log(results.features[index]);
              table.push({
                "OBJECTID": results.features[index].attributes.OBJECTID,
                "DPTOMPIO": results.features[index].attributes.DPTOMPIO,
                "NOMBRE_VER": results.features[index].attributes.NOMBRE_VER,
                "FUENTE": results.features[index].attributes.FUENTE,
                "NOMB_MPIO": results.features[index].attributes.NOMB_MPIO,
                "NOM_DEP": results.features[index].attributes.NOM_DEP,
                "COD_DPTO ": results.features[index].attributes.COD_DPTO,
                "ShapeArea": results.features[index].attributes["Shape.STArea()"],
                "ShapeLength": results.features[index].attributes["Shape.STLength()"]
              });
            }
              // results.features.forEach(x => {
              //     table.push({
              //         "OBJECTID": x.attributes.OBJECTID,
              //         "DPTOMPIO": x.attributes.DPTOMPIO,
              //         "NOMBRE_VER": x.attributes.NOMBRE_VER,
              //         "FUENTE": x.attributes.FUENTE,
              //         "NOMB_MPIO": x.attributes.NOMB_MPIO,
              //         "NOM_DEP": x.attributes.NOM_DEP,
              //         "COD_DPTO ": x.attributes.COD_DPTO,
              //         "ShapeArea": x.attributes["Shape.STArea()"],
              //         "ShapeLength": x.attributes["Shape.STLength()"]
              //     });
              // });
          }
          console.log(table);
          this.view.extent = results.features[0].geometry.extent;
          // $.notify("Veredas cargadas");
      });
      this.table = table;
      //map.add(verColLayer);
    }
    let deptDialog = new Dialog({
      title: "Veredas",
      style: "width: 100%;height:100%; position:center;background-color: white",
      content: "<div  id='tablaVeredas'>Cargando...</div>",

    });
    let verificarVer = () => {
      console.log(this.table.length);
      if (this.table.length == 0) {
          alert("cargando las veredas");
      } else {
        //  console.log(ListaVeredas);
          consultarVeredas(this.table.slice(0, 10), 1);
      }
      deptDialog.show();
  };
  
    var verDeptList = new Button({
        label: "Ver Listado de Veredas ....",
        onClick: function () {
          // consultarVeredas(table.length,1);
          verificarVer();
      }
        //style: "position: absolute; top: 10px; right: 20px;"
    }, "btnList").startup();
    var btnVeredas = Button({
      label: "Cargar Veredas ...",
      onClick: function () {
        alertify.success('Cargando veredas ...');
        verVeredas();

      } //style: "position: absolute; top: 10px; right: 220px;"
  },"btnVereda").startup();
  
  let consultarVeredas = (veredas, page)=>{
    let tabla = '';
    if (veredas.length > 0) {
      // alertify.success("cargando ...");
      tabla += "<table class=\"table\" id=\"VeredasTable\" class=\"table table-striped table-bordered table-sm\" cellspacing=\"0\" width=\"100%\">" +
    "        <thead>\n" +
    "        <tr>\n" +
    "            <th scope=\"id\">#</th>\n" +
                "            <th>Vereda</th>\n" +
                "            <th>Departamento</th>\n" +
                "            <th>Municipio</th>\n" +
                "            <th>Shape.STArea</th>\n" +
                "            <th>Shape.STLength</th>\n" +
                "            <th>Acciones</th>\n" +
    "        </tr>\n" +
    "        </thead>\n";
      let d = '';
    tabla += `<tbody>`;
        // document.getElementById("VeredasTable").innerHTML="";
        for (let index = 0; index < (veredas.length < 10?veredas.length:10); index++) {
          d += `
          <tr>
              <td>${veredas[index].OBJECTID}</td>
              <td>${veredas[index].NOMBRE_VER}</td>
              <td>${veredas[index].NOM_DEP}</td>
              <td>${veredas[index].NOMB_MPIO}</td>
              <td>${veredas[index].ShapeArea}</td>
              <td>${veredas[index].ShapeLength}</td>
              <td><a class="btn" id="showVereda" onclick="verVereda('${veredas[index].NOMBRE_VER}')">🔍</a></td>
          </tr>`
        }
        tabla += d;
        tabla += `</tbody></table>
        <ul class="pagination justify-content-center">
        <li class="page-item ${page === 1 ? "disabled" : ""}">
            <a class="btn btn-primary btn-lg active" id="back">Anterior</a>
        </li>
        <li class="page-item ${Math.ceil(veredas / 10) === page ? "disabled" : ""}">
            <a class="btn btn-primary btn-lg active" id="next">Siguiente</a>
        </li>
        </ul>
        `;
        $("#tablaVeredas").html(tabla);
        $("#next").click(()=>{
          consultarVeredas(this.table.slice(page * 10, page * 10 + 10), page + 1);
        })
        $("#back").click(()=>{
          consultarVeredas(this.table.slice((page -2)*10, (page - 2) * 10 + 10), page - 1);
        });
        $("#showVereda").click(()=>{
          
          consultarVeredas(this.table.slice((page -2)*10, (page - 2) * 10 + 10), page - 1);
        })
      }
    };
      return this.view;
    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }

  ngOnInit() {
    this.table = [];
    this.initializeMap();
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }
  

}
