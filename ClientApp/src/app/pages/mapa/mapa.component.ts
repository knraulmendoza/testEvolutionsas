import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { loadModules, setDefaultOptions } from "esri-loader";
import * as alertify from "alertifyjs";
import * as $ from 'jquery';
import { PersonService } from "src/app/services/person.service";
import { IPerson } from "src/app/interfaces/interface";
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
  public tabla = '';
  public nameVereda = '';
  persons:IPerson[] =[];
  constructor(private personSer: PersonService) {}
  public ver = function(){
    console.log('bueno al parecer funciona');
  }
  async initializeMap() {
    try {
      setDefaultOptions({ css: true });
      // Load the modules for the ArcGIS API for JavaScript
      const [Map, MapView, FeatureLayer, Button, Dialog, Sketch, SketchViewModel, Home, GraphicsLayer] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "dijit/form/Button",
        "dijit/Dialog",
        // "dojo/domReady!",
        "esri/widgets/Sketch",
        "esri/widgets/Sketch/SketchViewModel",
        "esri/widgets/Home",
        "esri/layers/GraphicsLayer"]);

        const graphicsLayer = new GraphicsLayer();
      // Configure the Map
      const mapProperties = {
        basemap: "streets",
        layers: [graphicsLayer]
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
      let featureDepartament = new FeatureLayer({
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
            outline: {
              color: "black",
              width: 1
            }
          }
        },
        labelingInfo : [nomColLabel]
      });
      
      const map = new Map(mapProperties);
      map.add(featureDepartament);
      
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
      // Initialize the MapView
      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: [-74.2973328, 4.570868],
        zoom: 6,
        map: map
      };
      this.view = new MapView(mapViewProperties);

      
      var sketchVM = new SketchViewModel({
        layer: graphicsLayer,
        view: this.view,  
        polygonSymbol: {
            type: "simple-fill",
            style: "none",
            outline: {
                color: "black",
                width: 1
            }
        }
      });
      var _DepartamentoFeature = new FeatureLayer({
        url: "https://ags.esri.co/server/rest/services/DA_DANE/departamento_mgn2016/MapServer",
        outFields: ["*"],
        opacity: 0,
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-fill",
                color: "blue",
                style: "solid",
                outline: {
                    color: "black",
                    width: 1
                }
            }
        }
    });
    var renderizado = {
      type: "simple",
      symbol: {
          type: "simple-fill",
          color: "cyan",
          style: "solid",
          outline: {
              color: "cyan",
              width: 0
          }
      }
  }
  

      var PopupVereda = {
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
    }
    //cargar veredas
    var featureVereda = new FeatureLayer({
        url: "https://ags.esri.co/server/rest/services/DA_DatosAbiertos/VeredasColombia/MapServer/0",
        outFields: ["*"],
        opacity: 0,
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-fill",
                color: "red",
                style: "solid",
                outline: {
                    color: "black",
                    width: 1
                }
            }
        },
        popupTemplate: PopupVereda
    });
    map.add(featureVereda);
    let popupDepartment = (response)=>{
      let stateMap = true;
      this.view.extent = response.features[0].geometry.extent;
      this.view.popup.title = response.features[0].attributes.DPTO_CNMBRE;
      this.view.popup.open({
          location: {
              latitude: response.features[0].geometry.centroid.latitude,
              longitude: response.features[0].geometry.centroid.longitude
          },
          title: "Información de " + response.features[0].attributes.DPTO_CNMBRE,
          content: `
                      OBJECTID: ${response.features[0].attributes.OBJECTID} <br> 
                      Código DANE departamento: ${response.features[0].attributes.DPTO_CCDGO} <br> 
                      Año de creación del departamento: ${response.features[0].attributes.DPTO_NANO_CREACION} <br> 
                      Nombre del departamento: ${response.features[0].attributes.DPTO_CNMBRE} <br> 
                      Acto administrativo de creación del departamento: ${response.features[0].attributes.DPTO_CACTO_ADMNSTRTVO} <br> 
                      Área oficial del departamento en Km2: ${response.features[0].attributes.DPTO_NAREA} <br> 
                      Año vigencia de información municipal (Fuente DANE): ${response.features[0].attributes.DPTO_NANO} <br> 
                    `
      });
      featureVereda.definitionExpression = `COD_DPTO=${response.features[0].attributes.DPTO_CCDGO}`;
      featureVereda.opacity = .75;
      featureVereda.renderer = renderizado;
      this.view.goTo(response.features[0].geometry.extent.expand(1));
    };
      let showDepartment = (response)=>{
        this.view.when(function () {
          console.log(response.features);
          popupDepartment(response);
        });
      }
      sketchVM.on(["create"], function (event) {
        if (event.state === "complete") {
          map.remove(map.layers.find(x => x.type === "graphics"));
          if (featureDepartament) {
            var query = featureDepartament.createQuery();
              query.geometry = event.graphic.geometry;
              query.distance = 2;
              query.units = "miles";
              query.spatialRelationship = "intersects";  // this is the default
              query.returnGeometry = true;
              query.outFields = ["*"];
              featureDepartament.queryFeatures(query)
                  .then(function (response) {
                    showDepartment(response);
                  });
          }
        //   // use the graphic.geometry to query features that intersect it
        //   selectFeatures(event.graphic.geometry);
        }
    });
    sketchVM.on('delete', (event)=>{
      console.log('msg delete '+event);
      featureVereda.definitionExpression = '1=0';
      featureVereda.opacity = 0;
    })
    var sketch = new Sketch({
      view: this.view,
      viewModel: sketchVM,
      layer: graphicsLayer,
      creationMode: "update"
    });
  
      this.view.ui.add(sketch, "top-right");
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
        var popupVeredaa = {
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
      }
        let verColLayer = new FeatureLayer({
            url: "https://ags.esri.co/server/rest/services/DA_DatosAbiertos/VeredasColombia/MapServer/0",
            outFields: ["*"],//["OBJECTID","DPTOMPIO", "NOMBRE_VER", "FUENTE", "NOMB_MPIO", "NOM_DEP", "COD_DPTO"],
            opacity: .4,
            renderer: {
              type: "simple",
              symbol: {
                  type: "simple-fill",
                  color: "red",
                  style: "solid",
                  outline: {
                      color: "black",
                      width: 1
                  }
              }
          },
            labelingInfo: [nomColLabel],
            //definitionExpression: "NOM_DEP = 'Cesar'",
            popupTemplate: popupVeredaa,
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
        map.add(verColLayer);
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
          popupTemplate: PopupVereda,
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
      // map.add(verColLayer);
    }
    let deptDialog = new Dialog({
      title: "Veredas",
      style: "width: 100%;height:100%; position:center;background-color: white",
      content: "<div  id='tablaVeredas' [innerHtml]='this.tabla'>Cargando...</div>",
    });
    let consultarVeredas = (veredas, page)=>{
      this.tabla = '';
      if (veredas.length > 0) {
        // alertify.success("cargando ...");
        this.tabla += "<table class=\"table\" id=\"VeredasTable\" class=\"table table-striped table-bordered table-sm\" cellspacing=\"0\" width=\"100%\">" +
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
      this.tabla += `<tbody>`;
          // document.getElementById("VeredasTable").innerHTML="";
          for (let index = 0; index < (veredas.length < 10?veredas.length:10); index++) {
            //veredas[index].OBJECTID
            d += `
            <tr>
                <td>${veredas[index].OBJECTID}</td>
                <td>${veredas[index].NOMBRE_VER}</td>
                <td>${veredas[index].NOM_DEP}</td>
                <td>${veredas[index].NOMB_MPIO}</td>
                <td>${veredas[index].ShapeArea}</td>
                <td>${veredas[index].ShapeLength}</td>
                <td><button class="showVereda" id="${index}" type="button" value="${index}" >🔍</button></td>
            </tr>`
          }
          //onclick="console.log('${veredas[index].NOMBRE_VER}');this.nameVereda = '${veredas[index].NOMBRE_VER}'; console.log(this.nameVereda)"
          this.tabla += d;
          this.tabla += `</tbody></table>
          <ul class="pagination justify-content-center">
          <li class="page-item ${page === 1 ? "disabled" : ""}">
              <a class="btn btn-primary btn-lg active" id="back">Anterior</a>
          </li>
          <button onclick="console.log('oe llave')">ok</button>
          <dynamic-button></dynamic-button>'
          <li class="page-item ${Math.ceil(veredas / 10) === page ? "disabled" : ""}">
              <a class="btn btn-primary btn-lg active" id="next">Siguiente</a>
          </li>
          </ul>
          `;
          $("#tablaVeredas").html(this.tabla);
          $("#next").click(()=>{
            consultarVeredas(this.table.slice(page * 10, page * 10 + 10), page + 1);
          })
          $("#back").click(()=>{
            consultarVeredas(this.table.slice((page -2)*10, (page - 2) * 10 + 10), page - 1);
          });
          $(".showVereda").on('click',(e)=>{
            verVereda(veredas[e.target.id].NOMBRE_VER);
          })
        }
      }
    let verificarVer = () => {
      if (this.table.length == 0) {
          alert("cargando las veredas");
      } else {
        //  console.log(ListaVeredas);
          consultarVeredas(this.table.slice(0, 10), 1);
      }
      deptDialog.show();
  };

  let popupVered = (results)=>{
    this.view.popup.title = results.features[0].attributes.NOMBRE_VER;
        console.log('paso');
        this.view.popup.open({
            location: {
                latitude: results.features[0].geometry.centroid.latitude,
                longitude: results.features[0].geometry.centroid.longitude
            },
            title: "Información de " + results.features[0].attributes.NOMBRE_VER,
            content: `
                        OBJECTID: ${results.features[0].attributes.OBJECTID} <br> 
                        Código DANE departamento: ${results.features[0].attributes.COD_DPTO} <br> 
                        Nombre del departamento: ${results.features[0].attributes.NOM_DEP} <br> 
                        Descripción del departamento: ${results.features[0].attributes.DESCRIPCIO} <br> 
                        Área oficial del departamento en Km2: ${results.features[0].attributes.AREA_HA} <br> 
                        Año vigencia de información municipal (Fuente DANE): ${results.features[0].attributes.DPTO_NANO} <br> 
                        `
    });
    this.view.extent = results.features[0].geometry.extent.expand(1.3);
  }
  
  let verVereda = function (nameVereda: string) {
    featureVereda.definitionExpression = `NOMBRE_VER='${nameVereda.toUpperCase()}'`;
    deptDialog.hide();
    featureVereda.queryFeatures({
        where: `NOMBRE_VER='${nameVereda.toUpperCase()}'`,
        returnGeometry: true,
        outFields: ["*"]
    }).then(function (results) {
        console.log(results);
        popupVered(results);
        featureVereda.opacity = .75;
      });
    };
  
    var verDeptList = new Button({
        label: "Ver Listado de Veredas ....",
        onClick: function () {
          // consultarVeredas(table.length,1);
          verificarVer();
      },
       // style: "position: absolute; top: 10px; right: 20px;"
    }, "btnList").startup();
    var btnVeredas = Button({
      onClick: function () {
        alertify.success('Cargando veredas ...');
        verVeredas();

      }, style: "backgraund-color: blue"
    },"btnVereda").startup();


    //mostrar usuarios
    let showUsers = (users, page)=>{
      console.log(this.persons);
      if (page==1)users = this.persons.slice(0, 10);
      let tabla = '';
      if (users.length > 0) {
        console.log(users);
        // alertify.success("cargando ...");
        tabla += "<table class=\"table\" id=\"usersTable\" class=\"table table-striped table-bordered table-sm\" cellspacing=\"0\" width=\"100%\">" +
      "        <thead>\n" +
      "        <tr>\n" +
      "            <th scope=\"id\">#</th>\n" +
                  "            <th>Nombres</th>\n" +
                  "            <th>Apellidos</th>\n" +
                  "            <th>Estado</th>\n" +
                  "            <th>Acciones</th>\n" +
      "        </tr>\n" +
      "        </thead>\n";
        let body = '';
      tabla += `<tbody>`;
          users.forEach((user, index) => {
            body += `
            <tr>
                <td>${index}</td>
                <td>${user.firstName} ${user.secondName}</td>
                <td>${user.firstLastName} ${user.secondLastName}</td>
                <td>${user.state==1?'Activo':'Inactivo'}</td>
            </tr>`
          });
          //onclick="console.log('${veredas[index].NOMBRE_VER}');this.nameVereda = '${veredas[index].NOMBRE_VER}'; console.log(this.nameVereda)"
          tabla += body;
          tabla += `</tbody></table>
          <ul class="pagination justify-content-center">
          <li class="page-item ${page === 1 ? "disabled" : ""}">
              <a class="btn btn-primary btn-lg active" id="back">Anterior</a>
          </li>
          <li class="page-item ${Math.ceil(users / 10) === page ? "disabled" : ""}">
              <a class="btn btn-primary btn-lg active" id="next">Siguiente</a>
          </li>
          </ul>
          `;
          $("#tablaUsers").html(tabla);
          $("#next").click(()=>{
            consultarVeredas(this.persons.slice(page * 10, page * 10 + 10), page + 1);
          })
          $("#back").click(()=>{
            consultarVeredas(this.persons.slice((page -2)*10, (page - 2) * 10 + 10), page - 1);
          });
          dialogUsers.show();
      }else{
        alertify.error('no se han cargado los usuarios');
      }
    }
    
    let dialogUsers = Dialog(
      {
        title: "Usuarios",
        style: "width: 100%;height:100%; position:center;background-color: white",
        content: "<div  id='tablaUsers'>Cargando...</div>",
      }
    )
    var btnPersonas = Button({
      onClick: function () {
        alertify.success('Cargando Usuarios ...');
        showUsers([],1);
      }, style: "backgraund-color: blue"
    },"getPersons").startup();
  
      return this.view;
    } catch (error) {
      console.log("EsriLoader: ", error);
    };
  }

  async getPersons(){
    let persons = await this.personSer.getAll();
    this.persons = (persons == null || persons == [])? []: persons;
  }

  ngOnInit() {
    this.table = [];
    this.getPersons();
    this.initializeMap();
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }
  

}
