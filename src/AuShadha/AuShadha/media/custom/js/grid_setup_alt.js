
function setupPatientSummary(DivId, url){
  require(["dojox/grid/DataGrid",
           "dojo/store/JsonRest",
           "dojo/data/ObjectStore",
           "dijit/registry",
           "dojox/layout/ContentPane",
          "dojo/request/xhr", "dojo/dom","dojo/dom-style","dojo/json"
  ],
  function(DataGrid, JsonRest, ObjectStore,
           registry,ContentPane, xhr, dom, domStyle, JSON
           ){

    console.log("Filling DOM: " + DivId + " with URL: " + url);
    registry.byId(DivId).set('href',url);

    //registry.byId("patientSidebarDiv_contact").set('href',url);

    /*
    xhr(url,{
         handleAs: "text",
         method  : "GET",
    }).then(
       function(json){
          var jsondata = JSON.parse(json)
          console.log(jsondata);
          if(jsondata.success == true){
            registry.byId("patientSummaryTab").set('href',url)        
          }
       },
       function(json){
            var jsondata = JSON.parse(json);
            errorDialog.set("title", "ERROR");
            errorDialog.set("content", jsondata.error_message);
            errorDialog.show();
       },
       function(evt){console.log("Adding Data Finished Successfully...")}
    );
    console.log("Finished creating Patient Summary");
  });
  */
  });
}


function setupContactGrid(url){
  require(["dojox/grid/DataGrid",
           "dojo/store/JsonRest",
           "dojo/data/ObjectStore",
           "dijit/registry",
           "dojox/layout/ContentPane"
  ],
  function(DataGrid, JsonRest, ObjectStore, registry,ContentPane){
    var Cstore   = new JsonRest({target:url});
    console.log(Cstore);
    console.log("Creating the Contact Grid")
    var contactGrid = new DataGrid({
                  store         : dataStore = ObjectStore({
                                             objectStore: Cstore
                                  }),
                  selectionMode : "single",
                  rowSelector   : "20px",
                  structure     : GRID_STRUCTURES.PATIENT_CONTACT_GRID_STRUCTURE,
                  noDataMessage : "<span class='dojoxGridNoData'>No Contact Information in Store..</span>"
                },
                "contact_list"
    );

    contactGrid.onRowDblClick = function(e){
    //  {% if perms.patient.change_patientcontact or perms.patient.delete_patientcontact %}
                      onPatientSubMenuRowClick(e,
                                               contactGrid,
                                               "Edit Contact"
                                              );
    //  {%endif%}
                      return false;
    };
    contactGrid.startup();
    console.log("Finished creating Contact Grid");
  });
}

function setupPopUpGrid(url, gridStr, divId){
  require(["dojox/grid/DataGrid",
           "dojo/store/JsonRest",
           "dojo/data/ObjectStore",
           "dijit/registry",
           "dojox/layout/ContentPane",
  ],
  function(DataGrid, JsonRest, ObjectStore, registry,ContentPane){
    var Cstore   = new JsonRest({target:url});
    console.log(Cstore);
    console.log("Creating the Popup Grid")

    if( registry.byId(divId) ){
      registry.byId(divId).destroyRecursive(true);
    }

    var popUpGrid = new DataGrid({
                  store         : dataStore = ObjectStore({
                                             objectStore: Cstore
                                  }),
                  selectionMode : "single",
                  rowSelector   : "20px",
                  structure     : gridStr,
                  noDataMessage : "<span class='dojoxGridNoData'>No Information in Store..</span>",
                  style         : "height: 600px; width: 600px; overflow:auto; "
                },
                divId
    );

    popUpGrid.onRowDblClick = function(e){
    //  {% if perms.patient.change_patientcontact or perms.patient.delete_patientcontact %}
                      onPatientSubMenuRowClick(e,
                                               popUpGrid,
                                               "Edit"
                                              );
    //  {%endif%}
                      return false;
    };
    popUpGrid.startup();
    console.log("Finished creating Pop-up Grid");
  });
}


function setupContactGridForPortlet(url){
  require(["dojox/grid/DataGrid",
           "dojo/store/JsonRest",
           "dojo/data/ObjectStore",
           "dijit/registry",
           "dojox/layout/ContentPane"
  ],
  function(DataGrid, JsonRest, ObjectStore, registry,ContentPane){
    var Cstore   = new JsonRest({target:url});
    console.log(Cstore);
    console.log("Creating the Contact Grid for patient summary")
    var contactAltGrid = new DataGrid({
                  store         : dataStore = ObjectStore({
                                             objectStore: Cstore
                                  }),
                  selectionMode : "single",
                  rowSelector   : "20px",
                  structure     : GRID_STRUCTURES.PATIENT_CONTACT_GRID_STRUCTURE_SMALL,
                  noDataMessage : "<span class='dojoxGridNoData'>No Contact Information in Store..</span>"
                },
                "contact_grid_alt"
    );

    contactAltGrid.onRowDblClick = function(e){
    //  {% if perms.patient.change_patientcontact or perms.patient.delete_patientcontact %}
                      onPatientSubMenuRowClick(e,
                                               contactAltGrid,
                                               "Edit Contact"
                                              );
    //  {%endif%}
                      return false;
    };

    contactAltGrid.startup();
    console.log(contactAltGrid);
    console.log("Finished creating summary contact grid.")
  });
}



function setupPhoneGrid(url, /*divId of Grid*/grid_id, grid_str /* grid structure */){
  require(["dojox/grid/DataGrid", "dojo/store/JsonRest","dojo/data/ObjectStore"],
  function(DataGrid, JsonRest, ObjectStore){
    var store   = new JsonRest({target:url});
    var phoneGrid = new DataGrid({
                    store         : dataStore = ObjectStore({
                                               objectStore: store
                                    }),
                    selectionMode : "single",
                    rowSelector   : "20px",
                    structure     : grid_str,
                  noDataMessage   : "<span class='dojoxGridNoData'>No Phone Numbers in Store..</span>"
              },
              grid_id
      );

      phoneGrid.onRowDblClick = function(e){
      // {% if perms.patient.change_patientphone or perms.patient.delete_patientphone %}
                                onPatientSubMenuRowClick(e,phoneGrid, "Edit Phone");
                                return false;
      // {% endif %}
      };
    phoneGrid.startup();
});
}

function setupGuardianGrid(url){
  require(["dojox/grid/DataGrid", "dojo/store/JsonRest","dojo/data/ObjectStore"],
  function(DataGrid, JsonRest, ObjectStore){
    var store   = new JsonRest({target:url});
      var guardianGrid = new DataGrid({
                              store         : dataStore = ObjectStore({
                                                       objectStore: store
                                              }),
                              selectionMode : "single",
                              rowSelector   : "20px",
                              structure     : GRID_STRUCTURES.PATIENT_GUARDIAN_GRID_STRUCTURE,
                              noDataMessage : "<span class='dojoxGridNoData'>No Guardian Information in Store..</span>"
                            },
                          "guardian_list"
      );

      guardianGrid.onRowDblClick = function(e){
      // {% if perms.patient.change_patientguardian or perms.patient.delete_patientguardian %}
                                      onPatientSubMenuRowClick(e,guardianGrid, "Edit Guardian");
                                      return false;
      // {% endif %}
      };
    guardianGrid.startup();
    console.log("Guardian Grid Started up...")
})
}


function setupAllergiesGrid(url){
  require(["dojox/grid/DataGrid", "dojo/store/JsonRest","dojo/data/ObjectStore"],
  function(DataGrid, JsonRest, ObjectStore){
     console.log("Setting up Allergy Grid with URL: " + url)
     var store   = new JsonRest({target:url});
     var allergiesGrid = new DataGrid({
                    store           : dataStore = ObjectStore({
                                               objectStore: store
                                      }),
                    selectionMode   : "single",
                    rowSelector     : "20px",
                    structure       : GRID_STRUCTURES.PATIENT_ALLERGIES_GRID_STRUCTURE_SMALL,
                    noDataMessage   : "<span class='dojoxGridNoData'>No Allergies in Store..</span>"
              },
              "allergy_list"
      );

    console.log(allergiesGrid);

    allergiesGrid.onRowDblClick = function(e){
    // {% if perms.patient.change_patientallergies or perms.patient.delete_patientallergies %}
                              onPatientSubMenuRowClick(e,allergiesGrid, "Edit Allergy");
                              return false;
    // {% endif %}
    };

    allergiesGrid.startup();

  });
}

function setupMedicationListGrid(url){
  require(["dojox/grid/DataGrid", "dojo/store/JsonRest","dojo/data/ObjectStore"],
  function(DataGrid, JsonRest, ObjectStore){
    var store   = new JsonRest({target:url});
     var medicationListGrid = new DataGrid({
                    store         : dataStore = ObjectStore({
                                               objectStore: store
                                    }),
                    selectionMode : "single",
                    rowSelector   : "20px",
                    structure     : GRID_STRUCTURES.PATIENT_MEDICATION_LIST_GRID_STRUCTURE,
                  noDataMessage   : "<span class='dojoxGridNoData'>No Medications  Recorded..</span>"
              },
              "medication_list"
      );

      medicationListGrid.onRowDblClick = function(e){
      // {% if perms.patient.change_patientmedicationlist or perms.patient.delete_patientmedicationlist %}
                                onPatientSubMenuRowClick(e,medicationListGrid, "Edit Medication List");
                                return false;
      // {% endif %}
      };
    medicationListGrid.startup();

})
}

function setupFamilyHistoryGrid(url){
  require(["dojox/grid/DataGrid", "dojo/store/JsonRest","dojo/data/ObjectStore"],
  function(DataGrid, JsonRest, ObjectStore){
    var store   = new JsonRest({target:url});
     var familyHistoryGrid = new DataGrid({
                    store         : dataStore = ObjectStore({
                                               objectStore: store
                                    }),
                    selectionMode : "single",
                    rowSelector   : "20px",
                    structure     : GRID_STRUCTURES.PATIENT_FAMILY_HISTORY_GRID_STRUCTURE,
                  noDataMessage   : "<span class='dojoxGridNoData'>No Family History Recorded..</span>"
              },
              "family_history_list"
      );

      familyHistoryGrid.onRowDblClick = function(e){
      // {% if perms.patient.change_patientfamilyhistory or perms.patient.delete_patientfamilyhistory %}
                                onPatientSubMenuRowClick(e,familyHistoryGrid, "Edit Family History");
                                return false;
      // {% endif %}
      };

    familyHistoryGrid.startup();
})
}

function setupMedicalHistoryGrid(url){
  require(["dojox/grid/DataGrid", "dojo/store/JsonRest","dojo/data/ObjectStore"],
  function(DataGrid, JsonRest, ObjectStore){
   var store   = new JsonRest({target:url});
   var medicalHistoryGrid = new DataGrid({
                  store         : dataStore = ObjectStore({
                                             objectStore: store
                                  }),
                  selectionMode : "single",
                  rowSelector   : "20px",
                  structure     : GRID_STRUCTURES.PATIENT_MEDICAL_HISTORY_GRID_STRUCTURE,
                noDataMessage   : "<span class='dojoxGridNoData'>No Medical History Recorded..</span>"
            },
            "medical_history_list"
    );

    medicalHistoryGrid.onRowDblClick = function(e){
    // {% if perms.patient.change_patientmedicalhistory or perms.patient.delete_patientmedicalhistory %}
                              onPatientSubMenuRowClick(e,medicalHistoryGrid, "Edit Medical History");
                              return false;
    // {% endif %}
    };
    medicalHistoryGrid.startup();
    console.log("Medical History Grid Started up...")
})
}

function setupSurgicalHistoryGrid(url){
  require(["dojox/grid/DataGrid", "dojo/store/JsonRest","dojo/data/ObjectStore"],
  function(DataGrid, JsonRest, ObjectStore){
   var store   = new JsonRest({target:url});
   var surgicalHistoryGrid = new DataGrid({
                  store         : dataStore = ObjectStore({
                                             objectStore: store
                                  }),
                  selectionMode : "single",
                  rowSelector   : "20px",
                  structure     : GRID_STRUCTURES.PATIENT_SURGICAL_HISTORY_GRID_STRUCTURE,
                noDataMessage   : "<span class='dojoxGridNoData'>No Surgical History Recorded..</span>"
            },
            "surgical_history_list"
    );

    surgicalHistoryGrid.onRowDblClick = function(e){
    // {% if perms.patient.change_patientsurgicalhistory or perms.patient.delete_patientsurgicalhistory %}
                              onPatientSubMenuRowClick(e,surgicalHistoryGrid, "Edit Surgical History");
                              return false;
    // {% endif %}
    };
    surgicalHistoryGrid.startup();
    console.log("Surgical History Grid Started up...");
})
}

function setupImmunisationGrid(url){
  require(["dojox/grid/DataGrid", "dojo/store/JsonRest","dojo/data/ObjectStore"],
  function(DataGrid, JsonRest, ObjectStore){
   var store   = new JsonRest({target:url});
   var immunisationGrid = new DataGrid({
                  store         : dataStore = ObjectStore({
                                             objectStore: store
                                  }),
                  selectionMode : "single",
                  rowSelector   : "20px",
                  structure     : GRID_STRUCTURES.PATIENT_IMMUNIZATION_GRID_STRUCTURE,
                noDataMessage   : "<span class='dojoxGridNoData'>No Immunisations Recorded..</span>"
            },
            "immunisation_list"
    );

    immunisationGrid.onRowDblClick = function(e){
    // {% if perms.patient.change_patientimmunisation or perms.patient.delete_patientimmunisation %}
                              onPatientSubMenuRowClick(e,immunisationGrid, "Edit Immunisation");
                              return false;
    // {% endif %}
    };
    immunisationGrid.startup();
})
}



function setupAdmissionGrid(url){
  require(["dojox/grid/DataGrid", "dojo/store/JsonRest","dojo/data/ObjectStore"],
  function(DataGrid, JsonRest, ObjectStore){
    var store   = new JsonRest({target:url});
    console.log("Printing Admission Store");
    console.log(store);
    var admissionGrid = new DataGrid({
                            store         : dataStore = ObjectStore({
                                                         objectStore: store
                                            }),
                            selectionMode : "single",
                            rowSelector   : "20px",
                            clientSort    : false,
                            headerStyle   : ['text-align:center;'],
                            structure     : GRID_STRUCTURES.PATIENT_ADMISSION_GRID_SRUCTURE,
                            noDataMessage : "<span class='dojoxGridNoData'>No Admission Information in Store..</span>",
                        },
                        "admission_list"
      );

      admissionGrid.onRowDblClick = function(e){
       //  {% if perms.admission.change_admissiondetail or perms.admission.delete_admissiondetail %}
                                      onPatientSubMenuRowClick(e,
                                                               admissionGrid,
                                                               "Edit Admission"
                                                              );
                                      return false;
      // {% endif %}
      };

      admissionGrid.onRowClick   = function(e){
        //  {% if perms.admission %}
                                    var topContentPane = registry.byId('centerTopTabPane');
                                    var newTabPane     = registry.byId("admissionHomeContentPane");
                                    console.log(newTabPane)
                                    var item           = admissionGrid.getItem(e.rowIndex);
                                    var homeUrl        = admissionGrid.store.getValue(item,'home')
                                    console.log(homeUrl)
                                    xhr.get({
                                         url    : homeUrl,
                                         load   : function(content){
                                                    newTabPane.set('content', content)
                                                    topContentPane.selectChild(newTabPane);
                                                  }
                                    });
                                    return false;
        //  {% endif %}
      };
    admissionGrid.startup();
})
}



function setupVisitGrid(url){
  require(["dojox/grid/DataGrid", "dojo/store/JsonRest","dojo/data/ObjectStore"],
  function(DataGrid, JsonRest, ObjectStore){
    var store   = new JsonRest({target:url});
    console.log("Printing Visit Store");
    console.log(store);
    var visitGrid = new DataGrid({
                              store         : dataStore = ObjectStore({objectStore: store
                                              }),
                              selectionMode : "single",
                              rowSelector   : "20px",
                              structure     : GRID_STRUCTURES.PATIENT_VISIT_GRID_STRUCTURE,
                              noDataMessage : "<span class='dojoxGridNoData'>No Visit Information in Store..</span>"
                              },
                              "visit_list"
    );

    visitGrid.onRowDblClick = function(e){
    //{% if perms.visit.change_visitdetail or perms.visit.delete_visitdetail %}
                                   onPatientSubMenuRowClick(e,visitGrid, "Edit Visit");
    //{% endif %}
                                   return false;
    };
})
}


 function onPatientSubMenuRowClick(e, gridToUse, titleToUse){
      require(["dijit/registry","dijit/Dialog","dojox/grid/DataGrid","dojo/_base/xhr"],
      function(registry, Dialog, DataGrid, xhr){
        var idx = e.rowIndex,
            item = gridToUse.getItem(idx);
        var id        = gridToUse.store.getValue(item, "id");
        var edit      = gridToUse.store.getValue(item, "edit");
        var del       = gridToUse.store.getValue(item, "del");
        gridToUse.selection.clear();
        gridToUse.selection.setSelected(item, true);
        xhr.get({
            url  : edit,
            load : function(html, idx){
            var myDialog = dijit.byId("editPatientDialog");
            if(myDialog == undefined || myDialog == null){
              myDialog = new dijit.Dialog({
                                title    : titleToUse,
                                content  : html,
                                style    : "width: 500px; height:500px;"
                               },
                               "editPatientDialog"
                        );
              myDialog.startup();
            }
            else{
              myDialog.set('content', html);
              myDialog.set('title', titleToUse);
            }
            myDialog.show();
            }
        });
    return false;
    });
 };

function reInitBottomPanels(){
  require(["dijit/registry",
           "dojo/dom",
           "dojo/dom-construct",
           "dojo/dom-style",
           "dojo/_base/array",

            "dijit/layout/BorderContainer",
            "dojox/layout/ContentPane",
            "dijit/layout/TabContainer",
          ],
  function(registry, 
           dom, 
           domConstruct, 
           domStyle, 
           array,
           BorderContainer,
           ContentPane,
           TabContainer
          ){

    console.log("Running reInitBottomPanels at grid_setup_alt.js");

    console.log("PATIENT_PANE variable is");
    console.log(PATIENT_PANE);
    
    PATIENT_PANE.constructor();

    registry.byId('admissionHomeContentPane').set('disabled',false);
    buildAdmissionTree();
    
    registry.byId('visitHomeContentPane').set('disabled',false);
    buildVisitTree();

    registry.byId("centerMainPane").resize();  
  });
}


function cleanUpAdmissionPane(){
  var center_top_pane = dijit.byId('centerTopTabPane');
//      var admission_pane  = dijit.findWidgets("admissionHomeContentPane")
  center_top_pane.selectChild(patientHomeContentPane);
  dojo.forEach(admissionHomeContentPane, function(e){e.destroyRecursive(true)})
  admissionHomeContentPane.domNode.innerHTML =
      "Please select an admission to display details here."
}

function cleanUpVisitPane(){
  var center_top_pane = dijit.byId('centerTopTabPane');
//      var visit_pane  = dijit.findWidgets("centerBottomPaneTab3")
  center_top_pane.selectChild(patientHomeContentPane);
  dojo.forEach(visitHomeContentPane, function(e){e.destroyRecursive(true)})
  visitHomeContentPane.domNode.innerHTML =
       "Please select a visit to display details here."
}


doPostDelCleanup = function (){
  //TODO
  /* This should update all the grid when a patient is deleted */
  cleanUpAdmissionPane();
  cleanUpVisitPane();
  reInitBottomPanels();
}

