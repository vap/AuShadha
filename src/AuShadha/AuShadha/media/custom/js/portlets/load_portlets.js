function loadPortlets(){
  require(
    ["dijit/registry",
    "dojo/parser",

    "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dojox/layout/ContentPane",
    "dojox/layout/GridContainer",
    "dojox/widget/Portlet",
    "dojox/widget/FeedPortlet",
    //"dojox/widget/ExpandableFeedPortlet",
    "dojox/widget/PortletSettings",
    "dojox/widget/Calendar",
    "dijit/dijit",

    "dijit/Editor",
    "dijit/form/Button",

    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/ready",
    "dojo/_base/array"
    ],
    function(registry,
             parser,

             BorderContainer,
             TabContainer,
             ContentPane,
             GridContainer,
             Portlet,
             PortletSettings,
             Calendar,
             dijit,

             Editor,
             Button,
             dom,
             domConstruct,
             domStyle,
             ready,
             array
    ){
    ready( function(){
          if (registry.byId("patientContextContainer")){
            console.log("Context Container already set up.. ")
            return;
          }
          else{
            alert("Script loaded...")
          }
    });

  });

}