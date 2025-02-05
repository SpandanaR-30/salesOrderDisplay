sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("app.splitappb12.controller.App", {
      onInit() {
         var oModle=new sap.ui.model.json.JSONModel();
			oModle.loadData("/model/mockData/toolsData.json");
				this.getView().setModel(oModle,"toolModel");
      }
  });
});