sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("app.splitappb12.controller.detailView", {
        onInit:function(){
			var oModel=new sap.ui.model.json.JSONModel();
			oModel.loadData("models/mockData/supplier.json");
			this.getView().setModel(oModel);
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
					name:"capgemini_ui5training.batch12.fragments.popUp",
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
		},
		
	onPressToView1:function(){
			var oApp=this.getView().getParent();
			oApp.to("idList");
		}
    });
});