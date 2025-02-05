sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment"
], (Controller,Fragment) => {
    "use strict";

    return Controller.extend("app.splitappb12.controller.detailView", {
        // onInit:function(){
		//	var oModel=new sap.ui.model.json.JSONModel();
		// 	oModel.loadData("/model/mockData/supplier.json");
		// 	this.getView().setModel(oModel);
		// },

        onInit(){
			var oModel=new sap.ui.model.json.JSONModel();
		 	oModel.loadData("/model/mockData/supplier.json");
		 	this.getView().setModel(oModel);

			let oRouter=this.getOwnerComponent().getRouter();
			oRouter.attachRoutePatternMatched(this._onRouteMatched,this)

		},
		_onRouteMatched:function(oEvent){
			let sIndex=oEvent.getParameter("arguments").ind
			let sPath="toolModel>/toolsData/"+sIndex
			let oDetailView=this.getView();
			oDetailView.bindElement(sPath)
		},

		onConfirm:function(oEvent){
       	var oItem=oEvent.getParameter("selectedItem");
       	  var sItem=  oItem.mProperties.title;
       	  //var sItem=oItem.getProperty("title")
       	  var oInpt=sap.ui.getCore().byId(this.sId);
       	  oInpt.setValue(sItem);
       },
		
		f4Help:function(oEvent){
			this.sId=oEvent.getSource().getId();
			var oView=this.getView();
			var oModel=oView.getModel();
			var oData=JSON.parse(JSON.stringify(oModel.getProperty("/supplierTab")));
			var oTempModel= new sap.ui.model.json.JSONModel({
				supplierTab:oData
			});
			
			// var that=this;
			if(!this.dialog){
				this.dialog=Fragment.load({
					name:"app.splitappb12.fragments.popUp",
					controller:this
					
				}).then(function(oDialog){
					this.dialog=oDialog;
					oView.addDependent(this.dialog);
					this.dialog.setModel(oTempModel, "fragmentModel");
					this.dialog.open();
				}.bind(this));
				
			}else{
				this.dialog.open();
			}
		}
		
	// onPressToView1:function(){
	// 		var oApp=this.getView().getParent();
	// 		oApp.to("idList");
		//}
    });
});